package vn.worklife.manager.security.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WorklifeErrorController {
	@RequestMapping(value = "/Error404.do", method = RequestMethod.GET)
	public String Error404() {
		return "/error/code404";
	}
	
	@RequestMapping(value = "/Error401.do", method = RequestMethod.GET)
	public String Error401() {
		return "/error/code401";
	}
	
	@RequestMapping(value = "/Error500.do", method = RequestMethod.GET)
	public String Error500() {
		return "/error/code500";
	}
}
