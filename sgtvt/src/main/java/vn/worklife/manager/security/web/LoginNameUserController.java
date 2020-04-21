/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.security.web;

import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.manager.user.service.WorklifeUserService;
import vn.worklife.security.util.WorklifeDecryptEncryptObject;
import vn.worklife.security.util.WorklifeUserManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class LoginNameUserController {
	private Logger logger = Logger.getLogger(LoginNameUserController.class);

	private final WorklifeUserService worklifeUserService;

	@Autowired
	public LoginNameUserController(WorklifeUserService worklifeUserService) {
		this.worklifeUserService = worklifeUserService;
	}

	@RequestMapping(value = "/worklife/basicinfomation/login/json/getUserLogin.do")
	public @ResponseBody
    WorklifeUserVO getUserLogin() {
		WorklifeUserVO curUser =  WorklifeUserManager.getLoginUser();
		WorklifeUserVO returnObj = new WorklifeUserVO();
		if(curUser != null){
			returnObj.setUsername(curUser.getUsername());
			returnObj.setRealName(curUser.getRealName());
		}
		return returnObj;
	}

	@RequestMapping(value = "/worklife/user/changepassword.do",method = RequestMethod.POST)
	public @ResponseBody int changePassword(@RequestBody WorklifeUserVO worklifeUserVO,HttpServletRequest request, HttpServletResponse response){
		WorklifeUserVO curUser =  WorklifeUserManager.getLoginUser();
		if(curUser == null){
			return 2;
		}
		if (!WorklifeDecryptEncryptObject.comparePassword(worklifeUserVO.getPassword(), curUser.getPassword())){
			return 1;
		}
		try {
			worklifeUserVO.setUserId(curUser.getUserId());
			worklifeUserVO.setPassword(WorklifeDecryptEncryptObject.encryptPassword(worklifeUserVO.getNewPassword()));
			this.worklifeUserService.updateUserPasswordd(worklifeUserVO);

			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			if (auth != null) {
				new SecurityContextLogoutHandler().logout(request, response, auth);
			}
		}catch (Exception e){
			logger.error(e.getMessage());
			return 2;
		}
		return 0;
	}

	@RequestMapping(value = "/worklife/user/resetPassword.do",method = RequestMethod.POST)
	public @ResponseBody int resetPassword(@RequestBody WorklifeUserVO worklifeUserVO){
		try {
			worklifeUserVO.setPassword(WorklifeDecryptEncryptObject.encryptPassword(worklifeUserVO.getPassword()));
			this.worklifeUserService.updateUserPasswordd(worklifeUserVO);
		}catch (Exception e){
			logger.error(e.getMessage());
			return 2;
		}
		return 0;
	}
}
