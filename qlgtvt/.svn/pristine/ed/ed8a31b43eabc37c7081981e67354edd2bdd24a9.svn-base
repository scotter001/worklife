package vn.worklife.map2.esri.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import vn.worklife.security.util.WorklifeUserManager;

import java.util.LinkedHashMap;

@Controller
public class MapManager {
    private final static LinkedHashMap<String, String> MAP_PAGE_CODEs;
    public  static LinkedHashMap<String, String> getPageCodes(){return  MAP_PAGE_CODEs;}
    static {
        MAP_PAGE_CODEs = new LinkedHashMap<>();
        MAP_PAGE_CODEs.put("csd", "Hệ Thống Cơ Sở Dược");
        MAP_PAGE_CODEs.put("cskcb", "Cơ Sở Khám Chữa Bệnh");
        MAP_PAGE_CODEs.put("vsattp", "Vệ Sinh An Toàn Thực Phẩm");
        MAP_PAGE_CODEs.put("nd", "Ngộ Độc");
        MAP_PAGE_CODEs.put("cb", "Ca Bệnh");
        MAP_PAGE_CODEs.put("nn", "Nguồn Nước");
        MAP_PAGE_CODEs.put("vsldcs", "Vệ Sinh Lao Động Cơ Sở ");
        MAP_PAGE_CODEs.put("tc", "Tiêm Chủng");
    }
    private String displayMapPage(Model model, String formName, String title) {
        model.addAttribute("FormName", formName);
        model.addAttribute("JsPath", String.format("/style/js/worklife/map/%s.Form.js", formName));
        model.addAttribute("PageTitle", title);
        return "/worklife/map/coreMapPage";
    }
    @RequestMapping("/worklife/map/{code}/display.do")
    private String displayMapPage(@PathVariable("code") String code, Model model) {
        if("".equals(WorklifeUserManager.checkLogged())) {
            if (MAP_PAGE_CODEs.containsKey(code))
                return displayMapPage(model, code, MAP_PAGE_CODEs.get(code));
            else
                return "/error/code404";
        }else{
            return WorklifeUserManager.checkLogged();
        }
    }
}