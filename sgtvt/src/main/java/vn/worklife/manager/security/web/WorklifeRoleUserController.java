package vn.worklife.manager.security.web;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.manager.security.model.WorklifeJsonVO;
import vn.worklife.manager.security.model.WorklifeRoleGroupVO;
import vn.worklife.manager.security.model.WorklifeRoleUserVO;
import vn.worklife.manager.security.model.WorklifeRoleVO;
import vn.worklife.manager.security.service.impl.WorklifeRoleServiceImpl;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.manager.user.service.impl.WorklifeUserServiceImpl;
import vn.worklife.security.util.WorklifeGroupManager;
import vn.worklife.security.util.WorklifeMultiLanguageController;
import vn.worklife.security.util.WorklifePropertiesGetter;
import vn.worklife.security.util.WorklifeUserManager;

@Controller
public class WorklifeRoleUserController {
    private Logger logger = Logger.getLogger(this.getClass());

    @Resource(name = "WorklifeGroupServiceImpl")
    private WorklifeGroupServiceImpl worklifeGroupService;
    
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

	@Resource(name = "WorklifeRoleServiceImpl")
	private WorklifeRoleServiceImpl worklifeRoleServiceImpl;
	
	@Resource(name="worklifeLanguageSource")
	private WorklifeMultiLanguageController worklifeMultiLanguageController;
	
    @Resource(name = "WorklifeUserServiceImpl")
    private WorklifeUserServiceImpl worklifeUserServiceImpl;

    @RequestMapping("/worklife/manager/roleuser/redirectToRoleUserPage.do")
    public String redirectToRoleUserPage(Model model) throws Exception {
    	try {
    		//Get GlobalAdminGroup_id
        	Integer idGroupGlobalAd = Integer.parseInt(WorklifePropertiesGetter.getProperty("Globals.idsuadgroup", "globals.properties"));   
        	 //Get Current User
            WorklifeUserVO currUserLogin = new WorklifeUserVO();
            currUserLogin = WorklifeUserManager.getLoginUser();
            
            //Get list group
            WorklifeGroupVO group = new WorklifeGroupVO();
            group.setParentId(-1);
            group.setIdGroupUserLogin(currUserLogin.getGroupId());
            group.setIdSuperAdminGroup(idGroupGlobalAd);
            
            List<WorklifeGroupVO> listGroupParent = worklifeGroupService.selectMultiGroupByParentIdForDropdownlist(group);
            if (listGroupParent != null && !listGroupParent.isEmpty()) {
                for (WorklifeGroupVO child : listGroupParent) {
                    child.setListChildGroup(WorklifeGroupManager.getFullChildGroup(child, -2, worklifeGroupService, logger));
                }
            }
            model.addAttribute("listGroup", listGroupParent);
        } catch (Exception ex) {
            logger.error(ex);
        }
    	
    	return "worklife/admin/role_user/manager_role_user";
    }
    
    @RequestMapping("/worklife/manager/roleuser/newRoleUser.do")
    public String newRoleUser(@RequestParam("userId") int userId, 
    						  Model model, HttpServletRequest request) throws Exception {
    	model.addAttribute("groupId", request.getParameter("groupId"));
    	model.addAttribute("groupName", request.getParameter("groupName"));
    	
		if (userId <= 0) {
			model.addAttribute("error", worklifeMultiLanguageController.getMessage("alert.view.user.fail"));
			return "redirect:/worklife/manager/roleuser/redirectToRoleUserPage.do";
		}
		
		WorklifeUserVO worklifeUserVO = new WorklifeUserVO();
		try {
			worklifeUserVO.setUserId(userId);
			worklifeUserVO = worklifeUserServiceImpl.selectSingleActiveUser(worklifeUserVO);
			model.addAttribute("worklifeUserVO", worklifeUserVO);
		} catch(Exception ex) {
			logger.error(ex);
			model.addAttribute("error", ex.getMessage());
			return "forward:/worklife/manager/roleuser/redirectToRoleUserPage.do";
		}
		
		if (worklifeUserVO.getGroup() != null && worklifeUserVO.getGroup().getGroupId() > 0) {
			try {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("userId", worklifeUserVO.getUserId());
				map.put("groupId", worklifeUserVO.getGroup().getGroupId());
				model.addAttribute("listRole", worklifeRoleServiceImpl.selectAllRoleByGroupId(map));
			} catch(Exception ex) {
				logger.error(ex);
				model.addAttribute("error", ex.getMessage());
				return "forward:/worklife/manager/roleuser/redirectToRoleUserPage.do";
			}
		}
		
    	return "worklife/admin/role_user/create_role_user";
    }
    
    @RequestMapping(value = "/worklife/manager/roleuser/insertRoleUser.do", method = RequestMethod.POST)
    public String insertRoleUser(@RequestParam("userId") int userId, 
    							 @RequestParam("listRoleId") String strRoleId, 
    							 Model model, HttpServletRequest request) throws Exception {
    	model.addAttribute("groupId", request.getParameter("groupId"));
    	model.addAttribute("groupName", request.getParameter("groupName"));
    	
    	if (userId <= 0) {
			model.addAttribute("error", worklifeMultiLanguageController.getMessage("alert.view.user.fail"));
			return "redirect:/worklife/manager/roleuser/redirectToRoleUserPage.do";
		}
    	
    	 /** TRANSACTION */
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            //Delete all user's roles before insert new user's roles
            worklifeRoleServiceImpl.deleteRoleUserByUserId(userId);
            String[] arrRoleId = strRoleId.split(",");

            if (arrRoleId != null && arrRoleId.length > 0) {
                for (String roleId : arrRoleId) {
                    if (roleId.equals(""))
                        continue;
                    WorklifeRoleUserVO worklifeRoleUserVO = new WorklifeRoleUserVO();
                    worklifeRoleUserVO.setUserId(userId);
                    worklifeRoleUserVO.setRoleId(Integer.parseInt(roleId));
                    worklifeRoleServiceImpl.insertRoleUser(worklifeRoleUserVO);
                }
            }
            
            transactionManager.commit(status);
            model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.roleuser.insert"));
        } catch (Exception ex) {
            transactionManager.rollback(status);
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
        } finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        
    	return "forward:/worklife/manager/roleuser/redirectToRoleUserPage.do";
    }

    @RequestMapping("/worklife/manager/roleuser/getListRoleUser.do")
    public @ResponseBody WorklifeJsonVO getListRoleUser(@RequestParam("groupId") String groupId, 
    													HttpServletRequest request) throws Exception {
        WorklifeJsonVO worklifeJsonVO = new WorklifeJsonVO();
		
		
        try {
        	//Get GlobalAdminGroup_id
        	Integer idGroupGlobalAd = Integer.parseInt(WorklifePropertiesGetter.getProperty("Globals.idsuadgroup", "globals.properties"));  
        	//Get Current User
            WorklifeUserVO currUserLogin = new WorklifeUserVO();
            currUserLogin = WorklifeUserManager.getLoginUser();
        	
        	if ((groupId == null || groupId.equals("")) && currUserLogin.getGroupId() == idGroupGlobalAd) {
    			groupId = "-1";
    		}else if((groupId == null || groupId.equals("")) && currUserLogin.getGroupId() != idGroupGlobalAd)
    			groupId = currUserLogin.getGroupId().toString();
    			
            //Get Sort value
            String columnName = request.getParameter("column");
            String sortType = request.getParameter("sortType");

            //Get Search value
            String search = request.getParameter("search");
            if (search == null)
                search = "";
            else
                search = URLDecoder.decode(search, "UTF-8"); //Decode unicode text when submit to web using ajax

            String pageNumber = request.getParameter("pageNumber");
            String rowPerPage = request.getParameter("recordPerPage");
            
            if (rowPerPage == null || rowPerPage.equals("") ) {//!search.equals("")
                rowPerPage = "10";
            }
            
            if (pageNumber == null || pageNumber.equals("") ) {//!search.equals("")
                pageNumber = "0";
            }

            WorklifeUserVO worklifeUserVO = new WorklifeUserVO();
            worklifeUserVO.setColumnName(columnName);
            worklifeUserVO.setTypeOrder(sortType);
            worklifeUserVO.setFirstIndex(Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage));
            worklifeUserVO.setRecordCountPerPage(Integer.parseInt(rowPerPage));
            worklifeUserVO.setSearch(search);
            worklifeUserVO.setGroupId(Integer.parseInt(groupId));
            worklifeUserVO.setActiveFlag(1);
            worklifeUserVO.setIdGroupUserLogin(currUserLogin.getGroupId());
            worklifeUserVO.setIdGroupSuperAdmin(idGroupGlobalAd);

            ArrayList<WorklifeUserVO> listWorklifeUserVO = worklifeUserServiceImpl.selectMultiRoleUser(worklifeUserVO);
            int number = Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage) + 1;

            if (listWorklifeUserVO != null && !listWorklifeUserVO.isEmpty()) {
                worklifeJsonVO.setRecordsTotal(worklifeUserServiceImpl.countListUser(worklifeUserVO));
                worklifeJsonVO.setRecordsFiltered(worklifeJsonVO.getRecordsTotal());
                List<Object> listData = new ArrayList<Object>();
                for (WorklifeUserVO user : listWorklifeUserVO) {
                	groupId = user.getGroup() == null ? "" : Integer.toString(user.getGroup().getGroupId()); 
                    String userId = Integer.toString(user.getUserId());
                    String groupName = user.getGroup() == null || user.getGroup().getGroupName() == null ? "" : user.getGroup().getGroupName();
                    String roleName = user.getListRoleName() == null ? "" : user.getListRoleName();
                    String[] obj = new String[]{
                    		groupId,
                    		userId,
                            Integer.toString(number),
                            user.getUsername(),
                            groupName,
                            roleName,
                            ""
                    };
                    listData.add(obj);
                    number++;
                }
                worklifeJsonVO.setData(listData);
            } else {
                worklifeJsonVO.setData(new ArrayList<Object>());
                worklifeJsonVO.setRecordsFiltered(0);
                worklifeJsonVO.setRecordsTotal(0);
            }
        } catch (Exception ex) {
            logger.error(ex);
            worklifeJsonVO.setData(new ArrayList<Object>());
            worklifeJsonVO.setRecordsFiltered(0);
            worklifeJsonVO.setRecordsTotal(0);
        }

        return worklifeJsonVO;
    }
}
