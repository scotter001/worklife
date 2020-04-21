package vn.worklife.manager.user.web;

import java.io.File;
import java.net.URLDecoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.aspectj.weaver.World;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import vn.worklife.basicinformation.model.JSon;
import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.manager.security.model.WorklifeJsonVO;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.manager.user.service.impl.WorklifeUserServiceImpl;
import vn.worklife.security.util.WorklifeFileManager;
import vn.worklife.security.util.WorklifeGroupManager;
import vn.worklife.security.util.WorklifeJSon;
import vn.worklife.security.util.WorklifeMultiLanguageController;
import vn.worklife.security.util.WorklifePropertiesGetter;
import vn.worklife.security.util.WorklifeUserManager;

@Controller
public class WorklifeUserController {
    private Logger logger = Logger.getLogger(this.getClass());

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;
    
    @Resource(name="WorklifeUserServiceImpl")
    private WorklifeUserServiceImpl worklifeUserServiceImpl;

	@Resource(name="worklifeLanguageSource")
	private WorklifeMultiLanguageController worklifeMultiLanguageController;
	
	@Resource(name = "WorklifeGroupServiceImpl")
	private WorklifeGroupServiceImpl worklifeGroupService;
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
	    SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
	    simpleDateFormat.setLenient(true);
	    binder.registerCustomEditor(Date.class, new CustomDateEditor(simpleDateFormat, true));
	}
 
	@RequestMapping("/worklife/manager/user/view/redirectToUserPage.do")
	public String redirectToUserPage() throws Exception {
		return "/worklife/admin/user/manager_user";
	}

	@RequestMapping("/worklife/manager/user/create/createUser.do")
	public String createUser(HttpServletRequest request, Model model) throws Exception {
		try {
			//Get GlobalAdminGroup_id
        	Integer idGroupGlobalAd = Integer.parseInt(WorklifePropertiesGetter.getProperty("Globals.idsuadgroup", "globals.properties"));
        	//Get Current User
            WorklifeUserVO currUserLogin = new WorklifeUserVO();
            currUserLogin = WorklifeUserManager.getLoginUser();
			
			// Get list group
			WorklifeGroupVO group = new WorklifeGroupVO();
			group.setIdGroupUserLogin(currUserLogin.getGroupId());
			group.setIdSuperAdminGroup(idGroupGlobalAd);
			group.setParentId(-1);
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
		
		model.addAttribute("worklifeUserVO", null);
		
		return "/worklife/admin/user/create_user";
	}
	
	@RequestMapping("/worklife/manager/user/modify/modifyUser.do")
	public String modifyUser(HttpServletRequest request, Model model) throws Exception {
		String userId = request.getParameter("userId");
		if (userId == null || userId.equalsIgnoreCase("") || Integer.parseInt(userId) <= 0) {
			model.addAttribute("error", worklifeMultiLanguageController.getMessage("alert.view.user.fail"));
			return "forward:/worklife/manager/user/view/redirectToUserPage.do";
		}
		
		try {
			//Get GlobalAdminGroup_id
        	Integer idGroupGlobalAd = Integer.parseInt(WorklifePropertiesGetter.getProperty("Globals.idsuadgroup", "globals.properties"));
        	//Get Current User
            WorklifeUserVO currUserLogin = new WorklifeUserVO();
            currUserLogin = WorklifeUserManager.getLoginUser();
            
			// Get list group
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
		
		try {
			WorklifeUserVO worklifeUserVO = new WorklifeUserVO();
			worklifeUserVO.setUserId(Integer.parseInt(userId));
			worklifeUserVO = worklifeUserServiceImpl.selectSingleActiveUser(worklifeUserVO);
			model.addAttribute("worklifeUserVO", worklifeUserVO);
		} catch(Exception ex) {
			logger.error(ex);
			model.addAttribute("error", ex.getMessage());
			return "forward:/worklife/manager/user/view/redirectToUserPage.do";
		}
		model.addAttribute("title", "update");
		return "/worklife/admin/user/create_user";
	}
	
	@RequestMapping(value = "/worklife/manager/user/create/insertUser.do", method = RequestMethod.POST)
	public String insertUser(@ModelAttribute("worklifeUserVO") WorklifeUserVO worklifeUserVO, HttpServletRequest request, Model model) throws Exception {
		Boolean isUpdate = false;
		if (worklifeUserVO.getUserId() > 0)
			isUpdate = true;
		
		String idDateStr = request.getParameter("IDDate");
		String idAgencyStr = request.getParameter("currIDAgency");
		DateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");
		Date idDate = (idDateStr.equals("") || idDateStr == null)? null : formatDate.parse(idDateStr);

		worklifeUserVO.setIDDate(idDate);
		worklifeUserVO.setIDAgency((idAgencyStr.equals("") || idAgencyStr == null)? "" :idAgencyStr);
		
		//Save avarta
		String dataURLcheme = request.getParameter("dataURLSheme");
		String nameImage = request.getParameter("nameImage");
		String fileDir = "";
		if (dataURLcheme != null && !dataURLcheme.equals("") && nameImage != null && !nameImage.equals(""))
			fileDir = WorklifeFileManager.uploadAvatar(worklifeMultiLanguageController, logger, dataURLcheme, nameImage, worklifeUserVO.getUsername());
		
		DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
	    td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
	    TransactionStatus status = transactionManager.getTransaction(td);
		try {
			if (!fileDir.equalsIgnoreCase(""))
				worklifeUserVO.setAvatar(fileDir);
			
			if (worklifeUserVO.getGroupId() <= 0)
				worklifeUserVO.setGroupId(null);
			
			if (worklifeUserVO.getUserId() > 0) {
				if (!worklifeUserVO.getAvatar().equalsIgnoreCase("")) {
					worklifeUserServiceImpl.updateUserAvatar(worklifeUserVO);
				}
				
				worklifeUserVO.setUpdateAt(new Date());
				worklifeUserServiceImpl.updateUser(worklifeUserVO);
			} else {
				worklifeUserServiceImpl.insertUser(worklifeUserVO);
			}
			
			transactionManager.commit(status);
		} catch(Exception ex) {
			logger.error(ex);
			transactionManager.rollback(status);
			
			if (!fileDir.equals("")) {
				File file = new File(fileDir);
				if (file.exists())
					file.delete();
			}
			model.addAttribute("error", ex.getMessage());
			return "forward:/worklife/manager/user/view/redirectToUserPage.do";
		} finally {
			if (!status.isCompleted()) {
				transactionManager.rollback(status);
			}
		}
		
		if (isUpdate)
			model.addAttribute("success", worklifeMultiLanguageController.getMessage("alert.register.update"));
		else
			model.addAttribute("success", worklifeMultiLanguageController.getMessage("alert.register.success"));
		return "forward:/worklife/manager/user/view/redirectToUserPage.do";
	}
	
	@RequestMapping(value = "/worklife/manager/user/check/checkExistsEmail.do", method = RequestMethod.POST)
	public @ResponseBody WorklifeJSon checkExistsEmail(@RequestParam("email") String email, HttpServletRequest request, Model model) throws Exception{
		WorklifeJSon json = new WorklifeJSon();
		
		if (email == null || email.equalsIgnoreCase("")) {
			json.setOk(false);
			json.setMessage(worklifeMultiLanguageController.getMessage("alert.register.email.exist"));
		}
		try {
			Boolean check =  worklifeUserServiceImpl.checkExistsEmail(email);
			if (check) {
				json.setOk(false);
				json.setMessage(worklifeMultiLanguageController.getMessage("alert.register.email.exist"));
			} else {
				json.setOk(true);
				json.setMessage(worklifeMultiLanguageController.getMessage("alert.register.email.notexist"));
			}
			
			return json;
		} catch (Exception e) {
			logger.error(e);
			json.setMessage(worklifeMultiLanguageController.getMessage("alert.regisrer.fail"));
			return json;
		}
	}
	
	@RequestMapping(value = "/worklife/manager/user/check/checkExistsUsername.do", method = RequestMethod.POST)
	public @ResponseBody WorklifeJSon checkExistsUsername(@RequestParam("username") String username, HttpServletRequest request, Model model) throws Exception{
		WorklifeJSon json = new WorklifeJSon();
		
		if (username == null || username.equalsIgnoreCase("")) {
			json.setOk(false);
			json.setMessage(worklifeMultiLanguageController.getMessage("alert.register.username.exist"));
		}
		try {
			Boolean check =  worklifeUserServiceImpl.checkExistsUserName(username);
			if (check) {
				json.setOk(false);
				json.setMessage(worklifeMultiLanguageController.getMessage("alert.register.username.exist"));
			} else {
				json.setOk(true);
				json.setMessage(worklifeMultiLanguageController.getMessage("alert.register.username.notexist"));
			}
			
			return json;
		} catch (Exception e) {
			logger.error(e);
			json.setMessage(worklifeMultiLanguageController.getMessage("alert.regisrer.fail"));
			return json;
		}
	}

    @RequestMapping("/worklife/manager/user/getListUser.do")
    public @ResponseBody WorklifeJsonVO getListUser(HttpServletRequest request) throws Exception {
        WorklifeJsonVO worklifeJsonVO = new WorklifeJsonVO();
        try {
        	//Get GlobalAdminGroup_id
        	Integer idGroupSuperAdmin = Integer.parseInt(WorklifePropertiesGetter.getProperty("Globals.idsuadgroup", "globals.properties"));
        	
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
            if (rowPerPage == null || rowPerPage.equals("")  ) {//!search.equals("")
                rowPerPage = "10";
            }
            if (pageNumber == null || pageNumber.equals("") ) { //!search.equals("")
                pageNumber = "0";
            }

            // Get current user login
            WorklifeUserVO currentUser = new WorklifeUserVO();
            currentUser = WorklifeUserManager.getLoginUser();
            
            WorklifeUserVO worklifeUserVO = new WorklifeUserVO();
            worklifeUserVO.setColumnName(columnName);
            worklifeUserVO.setTypeOrder(sortType);
            worklifeUserVO.setFirstIndex(Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage));
            worklifeUserVO.setRecordCountPerPage(Integer.parseInt(rowPerPage));
            worklifeUserVO.setSearch(search);
            worklifeUserVO.setIdGroupSuperAdmin(idGroupSuperAdmin);
            worklifeUserVO.setIdGroupUserLogin(currentUser.getGroupId());

            /*ArrayList<WorklifeUserVO> listWorklifeUserVO = new ArrayList<WorklifeUserVO>();
            if(currentUser.getGroupId() != Integer.parseInt(idGroupGlobalAd)){ // If User is not belongs SuperAdmin Group: Load User follow Tree
            	ArrayList<Integer> listAllChildGroup = worklifeUserServiceImpl.selectAllChildGroupFromCurrPosition(currentUser);
            	worklifeUserVO.setListIdAllChildGroup(listAllChildGroup);
            	listWorklifeUserVO = worklifeUserServiceImpl.selectAllUserByUserLogin(worklifeUserVO);
            }else{// User is belongs SuperAdmin Group : Load All User
            	listWorklifeUserVO = worklifeUserServiceImpl.selectMultiUser(worklifeUserVO);
            }*/
            
            ArrayList<WorklifeUserVO> listWorklifeUserVO = worklifeUserServiceImpl.selectMultiUser(worklifeUserVO);
            int number = Integer.parseInt(pageNumber) * Integer.parseInt(rowPerPage) + 1;
            int numberUser = worklifeUserServiceImpl.countMultiUser(worklifeUserVO);

            if (listWorklifeUserVO != null && !listWorklifeUserVO.isEmpty()) {
                worklifeJsonVO.setRecordsTotal(numberUser);
                worklifeJsonVO.setRecordsFiltered(worklifeJsonVO.getRecordsTotal());
                List<Object> listData = new ArrayList<Object>();
                for (WorklifeUserVO user : listWorklifeUserVO) {
                    String userId = Integer.toString(user.getUserId());
                    String userName = user.getUsername() == null ? "" : user.getUsername();
                    String email = user.getEmail() == null ? "" : user.getEmail();
                    String groupName = user.getGroup() == null || user.getGroup().getGroupName() == null ? "" : user.getGroup().getGroupName();
                    String isAdmin = user.getIsAdmin() == 0 || user.getIsAdmin() == null ? "0" : "1";
                    String[] obj = new String[] {
                    		userId,
                            Integer.toString(number),
                            userName,
                            email,
                            groupName,
                            isAdmin
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
    
    @RequestMapping("/worklife/avatar/viewAvatar.do")
    public void viewAvatar(@ModelAttribute("imageName") String imageName, @ModelAttribute("userName") String userName, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	if(imageName == null || imageName.equalsIgnoreCase(""))
    		return;
    	
    	if (userName == null || userName.equalsIgnoreCase(""))
    		userName = "tmpAvatar";
    	
    	WorklifeFileManager.viewAvatar(WorklifeFileManager.getAvatarDir(worklifeMultiLanguageController, userName + File.separator + imageName), request, response, logger);
    }
    
    @RequestMapping("/worklife/manager/user/json/deleteUser.do")
    public @ResponseBody JSon deleteUser(HttpServletRequest request) throws Exception {
    	JSon jSon = new JSon();
    	String user = request.getParameter("idUser");
    	int idUser = 0;
    	if (user != null && !user.equalsIgnoreCase("")) idUser = Integer.parseInt(user);
    	WorklifeUserVO worklifeUserVO = new WorklifeUserVO();
    	
    	try {
    		worklifeUserVO.setUserId(idUser);
    		worklifeUserServiceImpl.deleteSingleUserByUserId(worklifeUserVO);
    		
    		jSon.setOk(true);
    		jSon.setMessage(worklifeMultiLanguageController.getMessage("label.delete.ok"));
		} catch (Exception e) {
			logger.error(e);
			Integer checkUserUsedRole = worklifeUserServiceImpl.checkRoleUser(worklifeUserVO);
			if(checkUserUsedRole>0){
				jSon.setOk(false);
	    		jSon.setMessage(worklifeMultiLanguageController.getMessage("alert.delete.user.usedrole"));
			}else{
				jSon.setOk(false);
	    		jSon.setMessage(worklifeMultiLanguageController.getMessage("label.delete.false"));
			}
		}
    	
    	return jSon;
    }
}
