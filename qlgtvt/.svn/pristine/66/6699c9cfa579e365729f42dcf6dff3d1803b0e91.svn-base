package vn.worklife.manager.security.web;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import vn.worklife.basicinformation.model.JSon;
import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.manager.security.model.*;
import vn.worklife.manager.security.service.impl.WorklifePermissionServiceImpl;
import vn.worklife.manager.security.service.impl.WorklifeRoleServiceImpl;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeGroupManager;
import vn.worklife.security.util.WorklifeMultiLanguageController;
import vn.worklife.security.util.WorklifePropertiesGetter;
import vn.worklife.security.util.WorklifeUserManager;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

@Controller
public class WorklifeRoleController {
	private Logger logger = Logger.getLogger(this.getClass());

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;
	
	@Resource(name = "WorklifeRoleServiceImpl")
	private WorklifeRoleServiceImpl worklifeRoleServiceImpl;

    @Resource(name = "WorklifeGroupServiceImpl")
    private WorklifeGroupServiceImpl worklifeGroupService;
    
	@Resource(name = "WorklifePermissionServiceImpl")
	private WorklifePermissionServiceImpl worklifePermissionServiceImpl;

    @Resource(name = "worklifeLanguageSource")
    private WorklifeMultiLanguageController worklifeMultiLanguageController;
    
	@RequestMapping(value = "/worklife/manager/role/redirectToRolePage.do")
	public String redirectToRolePage(Model model) throws Exception {
		try {
			//Get GlobalAdminGroup_id
        	Integer idGroupGlobalAd = Integer.parseInt(WorklifePropertiesGetter.getProperty("Globals.idsuadgroup", "globals.properties"));   
        	 //Get Current User
            WorklifeUserVO currUserLogin = new WorklifeUserVO();
            currUserLogin = WorklifeUserManager.getLoginUser();
            
            //Get list group
            WorklifeGroupVO group = new WorklifeGroupVO();
            group.setParentId(-1);
            group.setIdSuperAdminGroup(idGroupGlobalAd);
            group.setIdGroupUserLogin(currUserLogin.getGroupId());
            
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
		
		return "worklife/admin/role_group/manager_role_group";
	}

	@RequestMapping(value = "/worklife/manager/role/create/newRole.do")
	public String newRole(@RequestParam("groupId") String groupId, Model model, HttpServletRequest request) throws Exception {
    	model.addAttribute("groupId", groupId);
    	model.addAttribute("groupName", request.getParameter("groupName"));
    	model.addAttribute("title", "insert");
    	
		if (groupId == null || groupId.equals("") || Integer.parseInt(groupId) <= 0) {
			model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.group.findgroupid"));
			return "forward:/worklife/manager/role/redirectToRolePage.do";
		}
		
		try {
			model.addAttribute("group", worklifeGroupService.selectGroupByGroupId(Integer.parseInt(groupId)));
		} catch(Exception ex) {
			logger.error(ex);
		}

		try {
			WorklifeRoleGroupVO worklifeRoleGroupVO = new WorklifeRoleGroupVO();
			worklifeRoleGroupVO.setGroupId(Integer.parseInt(groupId));
			worklifeRoleGroupVO.setRoleId(-1);
			ArrayList<WorklifePermissionVO> listPermissionVO = worklifePermissionServiceImpl.selectListPermissionForRole(worklifeRoleGroupVO);
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
		
		return "worklife/admin/role_group/create_role_group";
	}
	
    @RequestMapping(value = "/worklife/manager/role/create/insertRoleGroup.do", method = RequestMethod.POST)
    public String insertPermissionGroup(@RequestParam("groupId") String groupId,
    									@ModelAttribute("worklifeRoleVO") WorklifeRoleVO worklifeRoleVO,
    									@RequestParam("permissionId") String groupPermissionId, 
    									HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
    	model.addAttribute("groupId", groupId);
    	model.addAttribute("groupName", request.getParameter("groupName"));
        try {
            if (groupId == null || groupId.equals("") || Integer.parseInt(groupId) <= 0) {
                model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.group.findgroupid"));
                return "forward:/worklife/manager/role/redirectToRolePage.do";
            }

          
            /** TRANSACTION */
            DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
            td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
            TransactionStatus status = transactionManager.getTransaction(td);
            try {
                if (worklifeRoleVO.getRoleId() <= 0) {
                	worklifeRoleServiceImpl.insertRole(worklifeRoleVO);
                } else {
                	worklifeRoleServiceImpl.updateRole(worklifeRoleVO);
                }

                //Delete all role's permissions before insert new role's permissions
                worklifeRoleServiceImpl.deleteRoleGroupByRoleId(worklifeRoleVO.getRoleId());
                String[] arrPermissionId = groupPermissionId.split(",");

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
                
                transactionManager.commit(status);
                model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.role.insertgroup"));
            } catch (Exception ex) {
                transactionManager.rollback(status);
                logger.error(ex);
                model.addAttribute("error", ex.getCause());
            } finally {
                if (!status.isCompleted())
                    transactionManager.rollback(status);
            }
        } catch (Exception ex) {
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
        }
        return "forward:/worklife/manager/role/redirectToRolePage.do";
    }
    
    @RequestMapping(value = "/worklife/manager/role/json/checkExistRole.do")
    public @ResponseBody JSon checkExistRole(HttpServletRequest request) throws Exception {
    	JSon jSon = new JSon();
    	String roleCode = request.getParameter("roleCode");
    	WorklifeRoleVO worklifeRoleVO = new WorklifeRoleVO();
    	try {
			worklifeRoleVO.setRoleCode(roleCode);
			worklifeRoleVO = worklifeRoleServiceImpl.checkRoleExsit(worklifeRoleVO);
			
			if (worklifeRoleVO != null) {
				int id = worklifeRoleVO.getRoleId();
				if (id > 0) {
					jSon.setOk(true);
					jSon.setMessage(worklifeMultiLanguageController.getMessage("validate.rolegroup.code.exsit"));
				} else {
					jSon.setOk(false);
					jSon.setMessage("");
				}
			} else {
				jSon.setOk(false);
				jSon.setMessage("");
			}
		} catch (Exception e) {
			logger.error(e);
		}
    	
    	return jSon;
    }
    
    @RequestMapping(value = "/worklife/manager/role/json/deleteRole.do")
    public @ResponseBody JSon deleteRole(HttpServletRequest request) throws Exception {
    	JSon jSon = new JSon();
    	String role = request.getParameter("idrole");
    	int roleId = -1;
    	if (role != null && !role.trim().equalsIgnoreCase("")) roleId = Integer.parseInt(role);
    	
    	try {
    		/*worklifeRoleServiceImpl.deleteRoleGroupByRoleId(roleId);*/
			worklifeRoleServiceImpl.deleteSingleRoleByRoleId(roleId);
			jSon.setOk(true);
			jSon.setMessage(worklifeMultiLanguageController.getMessage("delete.rolegroup.deleteok"));
		} catch (Exception e) {
			logger.error(e);
			jSon.setOk(false);
			jSon.setMessage(worklifeMultiLanguageController.getMessage("delete.rolegroup.deletefalse"));
		}
    	
    	return jSon;
    }
    
    @RequestMapping(value = "/worklife/manager/role/json/checkroleusing.do")
    public @ResponseBody JSon checkRoleUsing(HttpServletRequest request) throws Exception {
    	JSon jSon = new JSon();
    	String role = request.getParameter("idrole");
    	int roleId = -1;
    	if (role != null && !role.trim().equalsIgnoreCase("")) roleId = Integer.parseInt(role);
    	
    	try {
    		int count = worklifeRoleServiceImpl.checkRoleUsedOrNotUsed(roleId);
			if (count >0){
				jSon.setOk(true);
				jSon.setMessage(worklifeMultiLanguageController.getMessage("check.rolegroup.used"));
			}else{
				jSon.setOk(false);
				jSon.setMessage(worklifeMultiLanguageController.getMessage("check.rolegroup.notused"));
			}
			
		} catch (Exception e) {
			logger.error(e);
		}
    	
    	return jSon;
    }

	@RequestMapping(value = "/worklife/manager/role/modify/modifyRole.do")
	public String modifyRole(@RequestParam("groupId") String groupId, 
							 @RequestParam("roleId") String roleId,
							 Model model, HttpServletRequest request) throws Exception {
    	model.addAttribute("groupId", groupId);
    	model.addAttribute("groupName", request.getParameter("groupName"));
    	model.addAttribute("title", "update");
    	
		if (groupId == null || groupId.equals("") || Integer.parseInt(groupId) <= 0) {
			model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.group.findgroupid"));
			return "forward:/worklife/manager/role/redirectToRolePage.do";
		}
		if (roleId == null || roleId.equals("") || Integer.parseInt(roleId) <= 0) {
			model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.role.findroleid"));
			return "forward:/worklife/manager/role/redirectToRolePage.do";
		}
		
		try {
			model.addAttribute("role", worklifeRoleServiceImpl.selectRoleByRoleId(Integer.parseInt(roleId)));
		} catch(Exception ex) {
			logger.error(ex);
		}
		
		try {
			model.addAttribute("group", worklifeGroupService.selectGroupByGroupId(Integer.parseInt(groupId)));
		} catch(Exception ex) {
			logger.error(ex);
		}
		
		try {
			WorklifeRoleGroupVO worklifeRoleGroupVO = new WorklifeRoleGroupVO();
			worklifeRoleGroupVO.setGroupId(Integer.parseInt(groupId));
			worklifeRoleGroupVO.setRoleId(Integer.parseInt(roleId));
			ArrayList<WorklifePermissionVO> listPermissionVO = worklifePermissionServiceImpl.selectListPermissionForRole(worklifeRoleGroupVO);
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

		return "worklife/admin/role_group/create_role_group";
	}

    @RequestMapping("/worklife/manager/role/getListGroupRole.do")
    public @ResponseBody WorklifeJsonVO getListGroupRole(@RequestParam("groupId") String groupId, HttpServletRequest request) throws Exception {
        WorklifeJsonVO worklifeJsonVO = new WorklifeJsonVO();
		
		
        try {
        	//Get IdGroupSuperAdmin
        	Integer idGroupSuperAdmin = Integer.parseInt(WorklifePropertiesGetter.getProperty("Globals.idsuadgroup", "globals.properties"));  
        	 //Get Current User
            WorklifeUserVO currUserLogin = new WorklifeUserVO();
            currUserLogin = WorklifeUserManager.getLoginUser();
            
        	if ((groupId == null || groupId.equals("")) && (currUserLogin.getGroupId() == idGroupSuperAdmin)) {
    			groupId = "-1";
    		}else if((groupId == null || groupId.equals("")) && (currUserLogin.getGroupId() != idGroupSuperAdmin))
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
            
            WorklifeRoleVO worklifeRoleVO = new WorklifeRoleVO();
            worklifeRoleVO.setColumnName(columnName);
            worklifeRoleVO.setTypeOrder(sortType);
            worklifeRoleVO.setFirstIndex(Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage));
            worklifeRoleVO.setRecordCountPerPage(Integer.parseInt(rowPerPage));
            worklifeRoleVO.setSearch(search);
            worklifeRoleVO.setGroupId(Integer.parseInt(groupId));
            worklifeRoleVO.setIdGroupUserLogin(currUserLogin.getGroupId());
            worklifeRoleVO.setIdSuperAdminGroup(idGroupSuperAdmin);

            ArrayList<WorklifeRoleVO> listWorklifeRoleVO = worklifeRoleServiceImpl.selectListRoleByGroupId(worklifeRoleVO);
            int number = Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage) + 1;

            if (listWorklifeRoleVO != null && !listWorklifeRoleVO.isEmpty()) {
                worklifeJsonVO.setRecordsTotal(worklifeRoleServiceImpl.countListRoleByGroupId(worklifeRoleVO));
                worklifeJsonVO.setRecordsFiltered(worklifeJsonVO.getRecordsTotal());
                List<Object> listData = new ArrayList<Object>();
                for (WorklifeRoleVO role : listWorklifeRoleVO) {
                    String roleId = Integer.toString(role.getRoleId());
                    String roleCode = role.getRoleCode() == null ? "" : role.getRoleCode();
                    String roleName = role.getRoleName() == null ? "" : role.getRoleName();
                    String roleDescription = role.getRoleDescription() == null ? "" : role.getRoleDescription();
                    if (role.getGroup() != null)
                    	groupId = Integer.toString(role.getGroup().getGroupId());
                    String[] obj = new String[]{
                    		groupId,
                    		roleId,
                            Integer.toString(number),
                            roleCode,
                            roleName,
                            roleDescription,
                            (role.getGroup() == null || role.getGroup().getGroupName() == null ? "" : role.getGroup().getGroupName())
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