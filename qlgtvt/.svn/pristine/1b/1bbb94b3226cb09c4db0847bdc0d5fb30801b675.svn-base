package vn.worklife.manager.security.web;

import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.manager.security.model.WorklifeJsonVO;
import vn.worklife.manager.security.model.WorklifePermissionVO;
import vn.worklife.manager.security.model.WorklifePermissionGroupVO;
import vn.worklife.manager.security.service.impl.WorklifePermissionServiceImpl;
import vn.worklife.manager.security.service.impl.WorklifePermissionGroupServiceImpl;
import vn.worklife.manager.security.service.impl.WorklifeRoleServiceImpl;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeMultiLanguageController;
import vn.worklife.security.util.WorklifePropertiesGetter;
import vn.worklife.security.util.WorklifeUserManager;

import org.apache.log4j.Logger;
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

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;

@Controller
public class WorklifePermissionGroupController {
    private Logger logger = Logger.getLogger(this.getClass());

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;
    
    @Resource(name = "WorklifeGroupServiceImpl")
    private WorklifeGroupServiceImpl worklifeGroupService;

    @Resource(name = "WorklifeRoleServiceImpl")
    private WorklifeRoleServiceImpl worklifeRoleServiceImpl;
    
    @Resource(name = "WorklifePermissionServiceImpl")
    private WorklifePermissionServiceImpl worklifePermissionServiceImpl;

    @Resource(name = "WorklifePermissionGroupServiceImpl")
    private WorklifePermissionGroupServiceImpl worklifePermissionGroupService;

    @Resource(name = "worklifeLanguageSource")
    private WorklifeMultiLanguageController worklifeMultiLanguageController;

    @RequestMapping("/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do")
    public String redirectToPermissionGroupPage(HttpServletRequest request, HttpServletResponse reponse, Model model) throws Exception {
        return "worklife/admin/permission_group/manager_permission_group";
    }

    @RequestMapping("/worklife/manager/permissiongroup/create/newPermissionGroup.do")
    public String newPermission(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        try {
            ArrayList<WorklifePermissionVO> listPermissionVO = worklifePermissionServiceImpl.selectListPermissionForRegister(-1);
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

        return "worklife/admin/permission_group/create_permission_group";
    }

    @SuppressWarnings("unchecked")
	@RequestMapping(value = "/worklife/manager/permissiongroup/create/insertPermissionGroup.do", method = RequestMethod.POST)
    public String insertPermissionGroup(@RequestParam("groupId") String groupId, @RequestParam("permissionId") String groupPermissionId, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        try {
            if (groupId == null || groupId.equals("")) {
                model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.group.findgroupid"));
                return "forward:/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do";
            }

            String[] arrPermissionId = groupPermissionId.split(",");

            /** TRANSACTION */
            DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
            td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
            TransactionStatus status = transactionManager.getTransaction(td);
            try {

            	ArrayList<Integer> listOldPermissionId = worklifePermissionGroupService.selectListPermissionIdByGroupId(Integer.parseInt(groupId));
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
                
                transactionManager.commit(status);
                model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.rolerelate.insert"));
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
        return "forward:/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do";
    }

    @RequestMapping(value = "/worklife/manager/permissiongroup/modify/modifyPermissionGroup.do")
    public String modifyPermissionGroup(@RequestParam("groupId") String groupId, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        if (groupId == null || groupId.equals("")) {
            model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.group.findgroupid"));
            return "forward:/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do";
        }

        try {
            //Get modify group
            WorklifeGroupVO worklifeGroupVO = worklifeGroupService.selectGroupByGroupId(Integer.parseInt(groupId));
            model.addAttribute("group", worklifeGroupVO);
        } catch (Exception ex) {
            logger.error(ex);
        }

        try {
            ArrayList<WorklifePermissionVO> listPermissionVO = worklifePermissionServiceImpl.selectListPermissionForRegister(Integer.parseInt(groupId));
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

        return "worklife/admin/permission_group/create_permission_group";
    }

    @RequestMapping("/worklife/manager/permissiongroup/getListPermissionGroup.do")
    public
    @ResponseBody
    WorklifeJsonVO getListPermissionGroup(HttpServletRequest request) throws Exception {
        WorklifeJsonVO worklifeJsonVO = new WorklifeJsonVO();
        try {
        	//Get IdGroupSuperAdmin
        	Integer idGroupGlobalAd = Integer.parseInt(WorklifePropertiesGetter.getProperty("Globals.idsuadgroup", "globals.properties"));        	
        	
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
            if (rowPerPage == null || rowPerPage.equals("")) { //!search.equals("")
                rowPerPage = "10";
            }
            if (pageNumber == null || pageNumber.equals("") ) { //!search.equals("")
                pageNumber = "0";
            }

            //Get Current User
            WorklifeUserVO currUserLogin = new WorklifeUserVO();
            currUserLogin = WorklifeUserManager.getLoginUser();
            
            WorklifePermissionGroupVO worklifePermissionGroupVO = new WorklifePermissionGroupVO();
            worklifePermissionGroupVO.setColumnName(columnName);
            worklifePermissionGroupVO.setTypeOrder(sortType);
            worklifePermissionGroupVO.setFirstIndex(Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage));
            worklifePermissionGroupVO.setRecordCountPerPage(Integer.parseInt(rowPerPage));
            worklifePermissionGroupVO.setSearch(search);
            worklifePermissionGroupVO.setIdGroupSuperAdmin(idGroupGlobalAd);
            worklifePermissionGroupVO.setIdGroupUserLogin(currUserLogin.getGroupId());

            ArrayList<WorklifePermissionGroupVO> listWorklifePermissionGroupVO = worklifePermissionGroupService.selectListPermissionGroup(worklifePermissionGroupVO);
            int number = Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage) + 1;
            int numbers = worklifePermissionGroupService.countListPermissionGroup(worklifePermissionGroupVO);

            if (listWorklifePermissionGroupVO != null && !listWorklifePermissionGroupVO.isEmpty()) {
                worklifeJsonVO.setRecordsTotal(numbers);
                worklifeJsonVO.setRecordsFiltered(worklifeJsonVO.getRecordsTotal());
                List<Object> listData = new ArrayList<Object>();
                for (WorklifePermissionGroupVO roleRelate : listWorklifePermissionGroupVO) {
                    String groupId = Integer.toString(roleRelate.getGroupId());
                    String groupName = roleRelate.getWorklifeGroup() == null || roleRelate.getWorklifeGroup().getGroupName() == null ? "" : roleRelate.getWorklifeGroup().getGroupName();
                    String groupParent = roleRelate.getWorklifeGroup() == null || roleRelate.getWorklifeGroup().getListNameOfParent() == null ? "" : roleRelate.getWorklifeGroup().getListNameOfParent();
                    String roleOfGroup = roleRelate.getListPermissionOfGroup() == null ? "" : roleRelate.getListPermissionOfGroup();
                    String[] obj = new String[]{
                            groupId,
                            Integer.toString(number),
                            groupName,
                            groupParent,
                            roleOfGroup
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
