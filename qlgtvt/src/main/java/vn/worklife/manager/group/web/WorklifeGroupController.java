package vn.worklife.manager.group.web;

import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.manager.security.model.WorklifeJsonVO;
import vn.worklife.manager.security.service.impl.WorklifePermissionGroupServiceImpl;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeGroupManager;
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
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
public class WorklifeGroupController {
    private Logger logger = Logger.getLogger(this.getClass());

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Resource(name = "WorklifeGroupServiceImpl")
    private WorklifeGroupServiceImpl worklifeGroupService;

    @Resource(name = "WorklifePermissionGroupServiceImpl")
    private WorklifePermissionGroupServiceImpl worklifeRoleRelateService;

    @Resource(name = "worklifeLanguageSource")
    private WorklifeMultiLanguageController worklifeMultiLanguageController;

    @RequestMapping("/worklife/manager/group/redirectToGroupPage.do")
    public String redirectToGroupPage(HttpServletRequest request, HttpServletResponse reponse, Model model) throws Exception {
        return "worklife/admin/group/manager_group";
    }

    @RequestMapping("/worklife/manager/group/create/newGroup.do")
    public String newGroup(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
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
            model.addAttribute("group", group);
        } catch (Exception ex) {
            logger.error(ex);
        }
        model.addAttribute("title", "insert");
       
        return "worklife/admin/group/create_group";
    }

    @RequestMapping(value = "/worklife/manager/group/create/insertGroup.do")
    public String insertGroup(@ModelAttribute("worklifeGroupVO") WorklifeGroupVO worklifeGroupVO, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        try {
            worklifeGroupVO.setCreateAt(new Date());
            worklifeGroupVO.setUpdateAt(new Date());
            worklifeGroupService.insertGroup(worklifeGroupVO);
            model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.group.insert"));
            model.addAttribute("group", worklifeGroupVO);
            model.addAttribute("title", "insert");
            //return "forward:/worklife/manager/group/modify/modifyGroup.do?groupId=" + Integer.toString(worklifeGroupVO.getGroupId());
            return "forward:/worklife/manager/group/redirectToGroupPage.do";
        } catch (Exception ex) {
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
            model.addAttribute("group", worklifeGroupVO);
            model.addAttribute("title", "insert");
            try {
                //Get list group
                WorklifeGroupVO group = new WorklifeGroupVO();
                group.setParentId(-1);
                List<WorklifeGroupVO> listGroupParent = worklifeGroupService.selectMultiGroupByParentIdForDropdownlist(group);
                if (listGroupParent != null && !listGroupParent.isEmpty()) {
                    for (WorklifeGroupVO groupChild : listGroupParent) {
                        groupChild.setListChildGroup(WorklifeGroupManager.getFullChildGroup(groupChild, -2, worklifeGroupService, logger));
                    }
                }
                model.addAttribute("listGroup", listGroupParent);
            } catch (Exception exx) {
                logger.error(exx);
            }
            return "worklife/admin/group/create_group";
        }
    }

    @RequestMapping("/worklife/manager/group/modify/modifyGroup.do")
    public String modifyGroup(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        String groupId = request.getParameter("groupId");
        if (groupId == null || groupId.equals("")) {
            model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.group.findgroupid"));
            return "forward:/worklife/manager/group/redirectToGroupPage.do";
        }

        try {
        	//Get GlobalAdminGroup_id
        	Integer idGroupGlobalAd = Integer.parseInt(WorklifePropertiesGetter.getProperty("Globals.idsuadgroup", "globals.properties"));
    		//Get Current User
            WorklifeUserVO currUserLogin = new WorklifeUserVO();
            currUserLogin = WorklifeUserManager.getLoginUser();
            
            //Get list group
            WorklifeGroupVO group = new WorklifeGroupVO();
            group.setGroupId(Integer.parseInt(groupId));
            group.setParentId(-1);
            group.setIdGroupUserLogin(currUserLogin.getGroupId());
            group.setIdSuperAdminGroup(idGroupGlobalAd);
            
            List<WorklifeGroupVO> listGroupParent = worklifeGroupService.selectMultiGroupByParentIdForDropdownlist(group);
            if (listGroupParent != null && !listGroupParent.isEmpty()) {
                for (WorklifeGroupVO groupChild : listGroupParent) {
                    groupChild.setListChildGroup(WorklifeGroupManager.getFullChildGroup(groupChild, Integer.parseInt(groupId), worklifeGroupService, logger));
                }
            }
            model.addAttribute("listGroup", listGroupParent);
        } catch (Exception ex) {
            logger.error(ex);
        }

        try {
            //Get modify group
            WorklifeGroupVO group = worklifeGroupService.selectGroupByGroupId(Integer.parseInt(groupId));
            if (group != null && group.getListIdOfParent() != null && !group.getListIdOfParent().equals("")) {
                String[] strArrParentId = group.getListIdOfParent().split("\\*");
                ArrayList<String> arrParentId = new ArrayList<String>();
                if (strArrParentId != null && strArrParentId.length > 0) {
                    for (String parentId : strArrParentId)
                        arrParentId.add(parentId);
                }
                model.addAttribute("listParentId", arrParentId);
            }
            model.addAttribute("group", group);
        } catch (Exception ex) {
            logger.error(ex);
        }
        model.addAttribute("title", "update");
        return "worklife/admin/group/create_group";
    }

    @RequestMapping(value = "/worklife/manager/group/create/updateGroup.do", method = RequestMethod.POST)
    public String updateGroup(@ModelAttribute("worklifeGroupVO") WorklifeGroupVO worklifeGroupVO, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        try {
            worklifeGroupVO.setUpdateAt(new Date());
            worklifeGroupService.updateGroup(worklifeGroupVO);
            model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.group.update"));
            model.addAttribute("group", worklifeGroupVO);
            model.addAttribute("title", "update");
            //return "forward:/worklife/manager/group/modify/modifyGroup.do?groupId=" + Integer.toString(worklifeGroupVO.getGroupId());
            return "forward:/worklife/manager/group/redirectToGroupPage.do";
        } catch (Exception ex) {
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
            model.addAttribute("group", worklifeGroupVO);
            model.addAttribute("title", "update");
            return "forward:/worklife/manager/group/modify/modifyGroup.do?groupId=" + Integer.toString(worklifeGroupVO.getGroupId());
        }
    }

    /**
     * Delete group and subgroups with checking group or subgroups have user or not
     */
    @RequestMapping(value = "/worklife/manager/group/create/deleteGroup.do", method = RequestMethod.POST)
    public String deleteGroup(@ModelAttribute("worklifeGroupVO") WorklifeGroupVO worklifeGroupVO, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        try {
            ArrayList<Integer> listChildId = new ArrayList<Integer>();
            listChildId.add(worklifeGroupVO.getGroupId());
            listChildId = getAllChildofGroup(listChildId, worklifeGroupVO.getGroupId());
            //Check list group has user or not
            Boolean bCheck = false;
            for (int id : listChildId) {
                if (worklifeGroupService.checkGroupHasUser(id)) {
                    bCheck = true;
                    break;
                }
            }
            if (bCheck) {
                model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.group.hasusergroup"));
                model.addAttribute("group", worklifeGroupVO);
                model.addAttribute("title", "update");
                return "forward:/worklife/manager/group/modify/modifyGroup.do?groupId=" + Integer.toString(worklifeGroupVO.getGroupId());
            }
            //Check list group has permission or not?
            Boolean pCheck = false;
            for (int id : listChildId) {
                if (worklifeGroupService.countPermissionInGroup(worklifeGroupVO.getGroupId()) >=1 ) {
                	pCheck = true;
                    break;
                }
            }
            if (pCheck) {
                model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.group.haspermission"));
                model.addAttribute("group", worklifeGroupVO);
                model.addAttribute("title", "update");
                return "forward:/worklife/manager/group/modify/modifyGroup.do?groupId=" + Integer.toString(worklifeGroupVO.getGroupId());
            }
            
            /** TRANSACTION */
            DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
            td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
            TransactionStatus status = transactionManager.getTransaction(td);
            try {
                for (int id : listChildId) {
                    //Delete groups
                    worklifeGroupService.deleteSingleGroupByGroupId(id);
                    //Delete role of this group
                    worklifeRoleRelateService.deleteSinglePermissionGroupByGroupId(id);
                }
                transactionManager.commit(status);
            } catch (Exception ex) {
                transactionManager.rollback(status);
                logger.error(ex);
                model.addAttribute("error", ex.getCause());
                model.addAttribute("group", worklifeGroupVO);
                model.addAttribute("title", "update");
                return "forward:/worklife/manager/group/modify/modifyGroup.do?groupId=" + Integer.toString(worklifeGroupVO.getGroupId());
            } finally {
                if (!status.isCompleted())
                    transactionManager.rollback(status);
            }
            model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.group.delete"));
            return "forward:/worklife/manager/group/redirectToGroupPage.do";
        } catch (Exception ex) {
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
            model.addAttribute("group", worklifeGroupVO);
            model.addAttribute("title", "update");
            return "forward:/worklife/manager/group/modify/modifyGroup.do?groupId=" + Integer.toString(worklifeGroupVO.getGroupId());
        }
    }

    private ArrayList<Integer> getAllChildofGroup(ArrayList<Integer> listChild, int id) {
        WorklifeGroupVO group = new WorklifeGroupVO();
        group.setParentId(id);
        ArrayList<Integer> listChildSecond = worklifeGroupService.getListChildrenId(group);
        if (listChildSecond != null && listChildSecond.size() > 0) {
            for (int childId : listChildSecond) {
                if (listChild.contains(childId)) {
                    continue;
                }
                listChild.add(childId);
                listChild = getAllChildofGroup(listChild, childId);
            }
        }
        return listChild;
    }

    @RequestMapping("/worklife/manager/group/getListGroup.do")
    public @ResponseBody WorklifeJsonVO getListGroup(HttpServletRequest request) throws Exception {
        WorklifeJsonVO worklifeJsonVO = new WorklifeJsonVO();
        try {
        	//Get GlobalAdminGroup_id
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
            
            if (rowPerPage == null || rowPerPage.equals("") ) {//!search.equals("")
                rowPerPage = "10";
            }
            
            if (pageNumber == null || pageNumber.equals("") ) {//!search.equals("")
                pageNumber = "0";
            }

            //Get Current User
            WorklifeUserVO currUserLogin = new WorklifeUserVO();
            currUserLogin = WorklifeUserManager.getLoginUser();
            
            WorklifeGroupVO worklifeGroupVO = new WorklifeGroupVO();
            worklifeGroupVO.setColumnName(columnName);
            worklifeGroupVO.setTypeOrder(sortType);
            worklifeGroupVO.setFirstIndex(Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage));
            worklifeGroupVO.setRecordCountPerPage(Integer.parseInt(rowPerPage));
            worklifeGroupVO.setSearch(search);
            worklifeGroupVO.setIdGroupUserLogin(currUserLogin.getGroupId());
            worklifeGroupVO.setIdSuperAdminGroup(idGroupGlobalAd);

            ArrayList<WorklifeGroupVO> listWorklifeGroupVO = worklifeGroupService.selectMultiGroupWithFullPathNameByParentId(worklifeGroupVO);
            int number = Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage) + 1;

            if (listWorklifeGroupVO != null && !listWorklifeGroupVO.isEmpty()) {
                worklifeJsonVO.setRecordsTotal(worklifeGroupService.countMultiGroupByGroupId(worklifeGroupVO));
                worklifeJsonVO.setRecordsFiltered(worklifeJsonVO.getRecordsTotal());
                List<Object> listData = new ArrayList<Object>();
                for (WorklifeGroupVO group : listWorklifeGroupVO) {
                    String groupId = Integer.toString(group.getGroupId());
                    String groupName = group.getGroupName() == null ? "" : group.getGroupName();
                    String abbreviation= group.getAbbreviation() == null ? "" : group.getAbbreviation();
                    String groupDescription = group.getGroupDescription() == null ? "" : group.getGroupDescription();
                    String groupFullPathParentName = group.getListNameOfParent() == null ? "" : group.getListNameOfParent();
                    String[] obj = new String[]{
                            groupId,
                            Integer.toString(number),
                            groupName,
                            abbreviation,
                            groupDescription,
                            groupFullPathParentName
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
