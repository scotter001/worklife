package vn.worklife.manager.user.web;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;

import javax.servlet.http.HttpServletRequest;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	private Logger logger = Logger.getLogger(this.getClass());
	@RequestMapping(value = "/index.do")
	public String indexBoi(HttpServletRequest request){
		WorklifeUserVO curUser = WorklifeUserManager.getLoginUser();
		String url = request.getRequestURI();
		if(null == curUser){
			return "redirect:/login.do";
		}
		if (url.equals("/qlgtvt/"))
		    return "/HomePage";
		else
		    return "HomePage_QLCTGT";
	}

	@RequestMapping(value = "/worklife/user/SuCoDuong/prototype/lichsusuachuadinhky.do")
	public String indext() {
		return "/worklife/user/prototype/LichSuSCDK";
	}

	@RequestMapping(value = "/worklife/user/SuCoDuong/prototype/nhapthongtinsuachuadinhky.do")
	public String indexBaoCaoThgt() {
		return "worklife/user/prototype/NhapThongTinSCDK";
	}

	@RequestMapping(value = "/worklife/user/BaoCaoTinhHinhGiaoThong/prototype/lapdmscdk.do")
	public String indexLapDmScdk() {
		return "worklife/user/prototype/LapDanhMucSuaChuaDinhKy";
	}
}
