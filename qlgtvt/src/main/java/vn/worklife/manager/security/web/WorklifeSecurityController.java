package vn.worklife.manager.security.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import vn.worklife.manager.category.model.ListTableVO;
import vn.worklife.manager.category.web.ConfigurationCategory;

@Controller
public class WorklifeSecurityController {
	@RequestMapping(value = "/login.do", params = "error")
	public String loginError() {
		return "/login";
	}

	@RequestMapping(value = "/login.do")
	public String login(HttpServletRequest request) {
		String referrer = request.getHeader("Referer");
		request.getSession().setAttribute("url_prior_login", referrer);
		// some other stuff
		return "/login";
	}
	
	@RequestMapping(value="/logout.do", method = RequestMethod.GET)
    public String logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        
        return "redirect:/login.do?logout";
    }
	
	@RequestMapping("/worklife/manager/admin/redirectAdminPage.do")
	public String redirectAdminPage() {
		return "/worklife/admin/admin_page";
	}
	
	@RequestMapping("/worklife/manager/homepage/redirectHomePage.do")
	public String redirectHomePage() {
	    return "/HomePage";
	}
}
