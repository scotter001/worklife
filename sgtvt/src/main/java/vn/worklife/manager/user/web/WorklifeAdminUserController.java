/**
 * 
 */
package vn.worklife.manager.user.web;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.jws.WebParam.Mode;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.junit.runners.Parameterized.Parameters;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.manager.security.model.WorklifePermissionGroupVO;
import vn.worklife.manager.security.model.WorklifePermissionVO;
import vn.worklife.manager.security.model.WorklifeRoleGroupVO;
import vn.worklife.manager.security.model.WorklifeRoleUserVO;
import vn.worklife.manager.security.model.WorklifeRoleVO;
import vn.worklife.manager.security.service.impl.WorklifePermissionGroupServiceImpl;
import vn.worklife.manager.security.service.impl.WorklifePermissionServiceImpl;
import vn.worklife.manager.security.service.impl.WorklifeRoleServiceImpl;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.manager.user.service.impl.WorklifeUserServiceImpl;
import vn.worklife.security.util.WorklifeMultiLanguageController;

/**
 * @author ZhaoYun
 *
 */
@Controller
public class WorklifeAdminUserController {
	private Logger logger = Logger.getLogger(this.getClass());
	
	@Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;
	
	@Resource(name = "WorklifePermissionServiceImpl")
    private WorklifePermissionServiceImpl worklifePermissionServiceImpl;
	
	@Resource(name = "WorklifeGroupServiceImpl")
	private WorklifeGroupServiceImpl worklifeGroupService;
	
	@Resource(name="WorklifeUserServiceImpl")
    private WorklifeUserServiceImpl worklifeUserServiceImpl;
	
	@Resource(name="worklifeLanguageSource")
	private WorklifeMultiLanguageController worklifeMultiLanguageController;
	
	@Resource(name = "WorklifeRoleServiceImpl")
    private WorklifeRoleServiceImpl worklifeRoleServiceImpl;
	
	@Resource(name = "WorklifePermissionGroupServiceImpl")
    private WorklifePermissionGroupServiceImpl worklifePermissionGroupService;
	
	@RequestMapping("/worklife/manager/adminUser/create/createAdminUser.do")
	public String createAdminUser(HttpServletRequest request, Model model)throws Exception{
		// Get list Parent Group
		try {
			WorklifeGroupVO group = new WorklifeGroupVO();
			List<WorklifeGroupVO> listGroupParent = worklifeGroupService.selectAllParentGroup(group);
			model.addAttribute("listGroup", listGroupParent);
		} catch (Exception ex) {
			logger.error(ex);
		}
		
		//Get List Permissions
		try {
            ArrayList<WorklifePermissionVO> listPermissionVO = worklifePermissionServiceImpl.selectMutiPermissionSystem();
            ArrayList<WorklifePermissionGroupVO> listResult = new ArrayList<WorklifePermissionGroupVO>();
            if (listPermissionVO != null && listPermissionVO.size() > 0) {
                for (WorklifePermissionVO roleInfo : listPermissionVO) {
                    if (listResult.size() == 0) {
                        WorklifePermissionGroupVO roleRelate = new WorklifePermissionGroupVO();
                        roleRelate.setListPermissionName(roleInfo.getListPermissionName());
                        roleRelate.setListPermissionNo(roleInfo.getListPermissionNo());
                        ArrayList<WorklifePermissionVO> arrWorklifePermission = new ArrayList<WorklifePermissionVO>();
                        arrWorklifePermission.add(roleInfo);
                        roleRelate.setArrWorklifePermission(arrWorklifePermission);

                        listResult.add(roleRelate);
                    } else {
                        Boolean bCheck = false;
                        for (WorklifePermissionGroupVO roleInfoCheck : listResult) {
                            if (roleInfoCheck.getListPermissionName().equals(roleInfo.getListPermissionName())) {
                                ArrayList<WorklifePermissionVO> arrWorklifePermission = roleInfoCheck.getArrWorklifePermission();
                                arrWorklifePermission.add(roleInfo);
                                roleInfoCheck.setArrWorklifePermission(arrWorklifePermission);
                                bCheck = true;
                                break;
                            }
                        }

                        if (!bCheck) {
                            WorklifePermissionGroupVO roleRelate = new WorklifePermissionGroupVO();
                            roleRelate.setListPermissionName(roleInfo.getListPermissionName());
                            roleRelate.setListPermissionNo(roleInfo.getListPermissionNo());
                            ArrayList<WorklifePermissionVO> arrWorklifePermission = new ArrayList<WorklifePermissionVO>();
                            arrWorklifePermission.add(roleInfo);
                            roleRelate.setArrWorklifePermission(arrWorklifePermission);

                            listResult.add(roleRelate);
                        }
                    }
                }
            }
            model.addAttribute("listResult", listResult);
        } catch (Exception ex) {
            logger.error(ex);
        }
		
		model.addAttribute("worklifeUserVO", null);
		return "/worklife/admin/user/create_admin_user";
	}
	
	@RequestMapping(value="/worklife/manager/adminUser/create/insertAdminUser.do", method= RequestMethod.POST)
	public String insertAdminUser(@ModelAttribute("worklifeUserVO") WorklifeUserVO worklifeUserVO, 
			HttpServletRequest request, Model model, @RequestParam("permissionId") String groupPermissionId,
			@RequestParam("groupId") String groupId)throws Exception{
		
		DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
	    td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
	    TransactionStatus status = transactionManager.getTransaction(td);
	    transactionManager.commit(status);
	    try {
			//Create AdminUser
			worklifeUserVO.setIsAdmin(1);//1: is admin
			worklifeUserServiceImpl.insertUser(worklifeUserVO);
			
		} catch(Exception ex) {
			logger.error(ex);
			transactionManager.rollback(status);
			model.addAttribute("error", ex.getMessage());
			return "forward:/worklife/manager/user/view/redirectToUserPage.do";
		} finally {
			if (!status.isCompleted()) {
				transactionManager.rollback(status);
			}
		}
	    
	    /*
		 * ADD PERMISSION_SYSTEM TO GROUP
		 */
	    String[] arrPermissionId = groupPermissionId.split(",");
        try {

        	ArrayList<Integer> listOldPermissionId = worklifePermissionGroupService.selectListSystemPermissionIdByGroupId(Integer.parseInt(groupId));
        	ArrayList<Integer> listAddPermissionId = new ArrayList<Integer>();
        	ArrayList<Integer> listDeletePermissionId = new ArrayList<Integer>();
        	
        	if (listOldPermissionId != null && listOldPermissionId.size() > 0) {
            	ArrayList<Integer> listNewPermissionId = new ArrayList<Integer>();
            	
            	
                for (String permissionId : arrPermissionId) {
                    if (permissionId.equals(""))
                        continue;
                    listNewPermissionId.add(Integer.parseInt(permissionId));
                }
                
                listAddPermissionId = (ArrayList<Integer>) listNewPermissionId.clone();
                listDeletePermissionId = (ArrayList<Integer>) listOldPermissionId.clone();
                
                listAddPermissionId.removeAll(listOldPermissionId); //Find added permission id
                listDeletePermissionId.removeAll(listNewPermissionId); //Find deleted permission id
                
        	} else {
        		for (String permissionId : arrPermissionId) {
                    if (permissionId.equals(""))
                        continue;
                    listAddPermissionId.add(Integer.parseInt(permissionId));
                }
        	}
        	
            for (int permissionId : listAddPermissionId) {
                WorklifePermissionGroupVO worklifePermissionGroup = new WorklifePermissionGroupVO();
                worklifePermissionGroup.setGroupId(Integer.parseInt(groupId));
                worklifePermissionGroup.setPermissionId(permissionId);
                worklifePermissionGroupService.insertPermissionGroup(worklifePermissionGroup);
            }
        	
            for (int permissionId : listDeletePermissionId) {
                WorklifePermissionGroupVO worklifePermissionGroup = new WorklifePermissionGroupVO();
                worklifePermissionGroup.setGroupId(Integer.parseInt(groupId));
                worklifePermissionGroup.setPermissionId(permissionId);
                
                worklifeRoleServiceImpl.deleteRoleGroupByGroupIdAndPermissionId(worklifePermissionGroup); //Remove permission id from role_group first
                worklifePermissionGroupService.deleteSinglePermissionGroup(worklifePermissionGroup); //Remove permission id from permission_group after
            }
            
            model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.rolerelate.insert"));
        } catch (Exception ex) {
            transactionManager.rollback(status);
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
        } finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
		
        /*
         * CREATE ADMIN_UNIT_ROLE TO GROUP
         */
        String roleName = request.getParameter("roleName");
        String roleCode =  request.getParameter("roleCode");
        String roleDescription = request.getParameter("roleDescription");
        WorklifeRoleVO worklifeRoleVO =  new WorklifeRoleVO();
        worklifeRoleVO.setRoleName(roleName);
        worklifeRoleVO.setRoleCode(roleCode);
        worklifeRoleVO.setRoleDescription(roleDescription);
        worklifeRoleVO.setGroupId(Integer.parseInt(groupId));
        try {
            worklifeRoleServiceImpl.insertRole(worklifeRoleVO);

            if (arrPermissionId != null && arrPermissionId.length > 0) {
                for (String permissionId : arrPermissionId) {
                    if (permissionId.equals(""))
                        continue;
                    WorklifeRoleGroupVO worklifeRoleGroupVO = new WorklifeRoleGroupVO();
                    worklifeRoleGroupVO.setGroupId(Integer.parseInt(groupId));
                    worklifeRoleGroupVO.setPermissionId(Integer.parseInt(permissionId));
                    worklifeRoleGroupVO.setRoleId(worklifeRoleVO.getRoleId());
                    worklifeRoleServiceImpl.intertNewPermission4Role(worklifeRoleGroupVO);
                }
            }
            
            model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.role.insertgroup"));
        } catch (Exception ex) {
            transactionManager.rollback(status);
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
        } finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        
        
         /* ADD ROLE TO USER
         *
         */
        try {
            WorklifeRoleUserVO worklifeRoleUserVO = new WorklifeRoleUserVO();
            worklifeRoleUserVO.setUserId(worklifeUserVO.getUserId());
            worklifeRoleUserVO.setRoleId(worklifeRoleVO.getRoleId());
            worklifeRoleServiceImpl.insertRoleUser(worklifeRoleUserVO);
            
            model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.roleuser.insert"));
        } catch (Exception ex) {
            transactionManager.rollback(status);
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
        } finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
	    
        
	    model.addAttribute("success", worklifeMultiLanguageController.getMessage("alert.register.success"));
		return "forward:/worklife/manager/user/view/redirectToUserPage.do";
	}

}
