package vn.worklife.manager.security.web;

import vn.worklife.basicinformation.model.JSon;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.manager.security.model.WorklifeJsonVO;
import vn.worklife.manager.security.model.WorklifeListPermissionVO;
import vn.worklife.manager.security.model.WorklifePermissionVO;
import vn.worklife.manager.security.service.impl.WorklifePermissionServiceImpl;
import vn.worklife.manager.security.service.impl.WorklifePermissionGroupServiceImpl;
import vn.worklife.manager.security.service.impl.WorklifeRoleServiceImpl;
import vn.worklife.security.util.WorklifeMultiLanguageController;

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
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Controller
public class WorklifePermissionController {
    private Logger logger = Logger.getLogger(this.getClass());

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;
    
    @Resource(name = "WorklifeGroupServiceImpl")
    private WorklifeGroupServiceImpl worklifeGroupService;

    @Resource(name = "WorklifePermissionServiceImpl")
    private WorklifePermissionServiceImpl worklifePermissionServiceImpl;

    @Resource(name = "WorklifePermissionGroupServiceImpl")
    private WorklifePermissionGroupServiceImpl worklifePermissionGroupServiceImpl;

    @Resource(name = "worklifeLanguageSource")
    private WorklifeMultiLanguageController worklifeMultiLanguageController;

	@Resource(name = "WorklifeRoleServiceImpl")
	private WorklifeRoleServiceImpl worklifeRoleServiceImpl;
	
    @RequestMapping("/worklife/manager/permission/redirectToPermissionPage.do")
    public String redirectToPermissionPage(HttpServletRequest request, HttpServletResponse reponse, Model model) throws Exception {
        return "worklife/admin/permission/manager_permission";
    }

    @RequestMapping("/worklife/manager/permission/create/newPermission.do")
    public String newGroup(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        try {
            //Get list role group name
            ArrayList<WorklifeListPermissionVO> arrWorklifePermissionGroup = worklifePermissionServiceImpl.selectListPermissionGroupName();
            model.addAttribute("listPermissionGroupName", arrWorklifePermissionGroup);
        } catch (Exception ex) {
            logger.error(ex);
        }

        model.addAttribute("title", "insert");
        return "worklife/admin/permission/create_permission";
    }

    @RequestMapping(value = "/worklife/manager/permission/create/insertPermission.do")
    public String insertPermission(@ModelAttribute("worklifePermissionVO") WorklifePermissionVO worklifePermissionVO, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        try {
            worklifePermissionVO.setCreateAt(new Date());
            worklifePermissionVO.setUpdateAt(new Date());
            worklifePermissionServiceImpl.insertPermission(worklifePermissionVO);
            model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.permission.insert"));
            return "forward:/worklife/manager/permission/redirectToPermissionPage.do";
        } catch (Exception ex) {
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
            model.addAttribute("permission", worklifePermissionVO);
            model.addAttribute("title", "insert");
            return "worklife/admin/permission/create_permission";
        }
    }

    @RequestMapping("/worklife/manager/permission/modify/modifyPermission.do")
    public String modifyPermission(HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        String roleId = request.getParameter("permissionId");
        if (roleId == null || roleId.equals("")) {
            model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.permission.findpermissionid"));
            return "forward:/worklife/manager/permission/redirectToPermissionPage.do";
        }

        try {
            //Get list role group name
            ArrayList<WorklifeListPermissionVO> arrWorklifePermissionGroup = worklifePermissionServiceImpl.selectListPermissionGroupName();
            model.addAttribute("listPermissionGroupName", arrWorklifePermissionGroup);
        } catch (Exception ex) {
            logger.error(ex);
        }

        try {
            //Get modify role
            WorklifePermissionVO permission = new WorklifePermissionVO();
            permission.setPermissionId(Integer.parseInt(roleId));
            permission = worklifePermissionServiceImpl.selectPermissionByPermissionId(permission);
            model.addAttribute("permission", permission);
        } catch (Exception ex) {
            logger.error(ex);
        }
        
        model.addAttribute("title", "update");
        return "worklife/admin/permission/create_permission";
    }

    @RequestMapping(value = "/worklife/manager/permission/create/updatePermission.do", method = RequestMethod.POST)
    public String updatePermission(@ModelAttribute("worklifePermissionVO") WorklifePermissionVO worklifePermissionVO, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        try {
            worklifePermissionVO.setUpdateAt(new Date());
            worklifePermissionServiceImpl.updatePermission(worklifePermissionVO);
            model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.permission.update"));
            return "forward:/worklife/manager/permission/redirectToPermissionPage.do";
        } catch (Exception ex) {
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
            model.addAttribute("permission", worklifePermissionVO);
            model.addAttribute("title", "update");
            return "forward:/worklife/manager/permission/modify/modifyPermission.do?permissionId=" + Integer.toString(worklifePermissionVO.getPermissionId());
        }
    }

    @RequestMapping(value = "/worklife/manager/permission/create/deletePermission.do", method = RequestMethod.POST)
    public String deletePermission(@ModelAttribute("worklifePermissionVO") WorklifePermissionVO worklifePermissionVO, HttpServletRequest request, HttpServletResponse response, Model model) throws Exception {
        if (worklifePermissionVO == null || worklifePermissionVO.getPermissionId() <= 0) {
            model.addAttribute("error", worklifeMultiLanguageController.getMessage("error.permission.findpermissionid"));
            return "forward:/worklife/manager/permission/redirectToPermissionPage.do";
        }
        
        try {
            /** TRANSACTION */
            DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
            td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
            TransactionStatus status = transactionManager.getTransaction(td);
            try {
            	worklifeRoleServiceImpl.deleteRoleGroupByPermissionId(worklifePermissionVO.getPermissionId());
            	worklifePermissionGroupServiceImpl.deleteSinglePermissionGroupByPermissionId(worklifePermissionVO.getPermissionId());
                worklifePermissionServiceImpl.deleteSinglePermissionByPermissionId(worklifePermissionVO);
                transactionManager.commit(status);
            } catch (Exception ex) {
                transactionManager.rollback(status);
                logger.error(ex);
                model.addAttribute("error", ex.getCause());
                model.addAttribute("permission", worklifePermissionVO);
                model.addAttribute("title", "update");
                return "forward:/worklife/manager/permission/modify/modifyPermission.do?permissionId=" + Integer.toString(worklifePermissionVO.getPermissionId());
            } finally {
                if (!status.isCompleted())
                    transactionManager.rollback(status);
            }
            model.addAttribute("success", worklifeMultiLanguageController.getMessage("success.permission.delete"));
            return "forward:/worklife/manager/permission/redirectToPermissionPage.do";
        } catch (Exception ex) {
            logger.error(ex);
            model.addAttribute("error", ex.getCause());
            model.addAttribute("permission", worklifePermissionVO);
            model.addAttribute("title", "update");
            return "forward:/worklife/manager/permission/modify/modifyPermission.do?permissionId=" + Integer.toString(worklifePermissionVO.getPermissionId());
        }
    }

    @RequestMapping("/worklife/manager/permission/getListPermission.do")
    public @ResponseBody WorklifeJsonVO getListPermission(HttpServletRequest request) throws Exception {
        WorklifeJsonVO worklifeJsonVO = new WorklifeJsonVO();
        try {
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

            WorklifePermissionVO worklifePermissionVO = new WorklifePermissionVO();
            worklifePermissionVO.setColumnName(columnName);
            worklifePermissionVO.setTypeOrder(sortType);
            worklifePermissionVO.setFirstIndex(Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage));
            worklifePermissionVO.setRecordCountPerPage(Integer.parseInt(rowPerPage));
            worklifePermissionVO.setSearch(search);

            ArrayList<WorklifePermissionVO> listWorklifePermissionVO = worklifePermissionServiceImpl.selectMultiPermission(worklifePermissionVO);
            int total	=	worklifePermissionServiceImpl.countMultiPermission(worklifePermissionVO);
            int number = Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage) + 1;

            if (listWorklifePermissionVO != null && !listWorklifePermissionVO.isEmpty()) {
                worklifeJsonVO.setRecordsTotal(total);
                worklifeJsonVO.setRecordsFiltered(total);
                List<Object> listData = new ArrayList<Object>();
                for (WorklifePermissionVO role : listWorklifePermissionVO) {
                    String permissionId = Integer.toString(role.getPermissionId());
                    String permissionName = role.getPermissionName() == null ? "" : role.getPermissionName();
                    String permissionPattern = role.getPermissionPattern() == null ? "" : role.getPermissionPattern();
                    String permissionGroupName = role.getListPermissionName() == null ? "" : role.getListPermissionName();
                    String permissionGroupNo = Integer.toString(role.getListPermissionNo());
                    String permissionDescription = role.getPermissionDescription() == null ? "" : role.getPermissionDescription();
                    String[] obj = new String[]{
                            permissionId,
                            Integer.toString(number),
                            permissionName,
                            permissionPattern,
                            permissionGroupName,
                            permissionGroupNo,
                            permissionDescription
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
    
    @RequestMapping("/worklife/manager/permission/findPermissionNo.do")
    public @ResponseBody JSon findPermissionNo(HttpServletRequest request) throws Exception {
    	JSon jSon = new JSon();
    	List<WorklifePermissionVO> listPermissionVOs = new ArrayList<WorklifePermissionVO>();
    	try {
    		listPermissionVOs = worklifePermissionServiceImpl.selectPermissionNo();
		} catch (Exception e) {
			 logger.error(e);
		}
    	
    	List<Integer> listInt = new ArrayList<Integer>();
    	if (listPermissionVOs != null) {
    		for (WorklifePermissionVO worklifePermissionVO : listPermissionVOs) {
    			if (worklifePermissionVO != null) {
    				int no = worklifePermissionVO.getListPermissionNo();
    				listInt.add(no);
    			}
    		}
    	}
    	int so = 0;
    	if (listInt.size() > 0) {
			so = Collections.max(listInt) + 1;
		} else {
			so = 0;
		}
    	
    	jSon.setMessage(Integer.toString(so));
    	return jSon;
    }
}
