package vn.worklife.user.quanlyquyhoach.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.quanlyquyhoach.model.HoSoQuyHoachVO;
import vn.worklife.user.quanlyquyhoach.service.impl.TraCuuHoSoQuyHoachImpl;

import javax.lang.model.element.Element;
import java.util.List;

@Controller
public class TraCuuHoSoQuyHoachController {
    @Autowired
    TraCuuHoSoQuyHoachImpl traCuuHoSoQuyHoachImpl;

    @RequestMapping(value = "/worklife/user/quanlyquyhoach/tchsqh.do")
    public String index(Model model){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("group_Id", worklifeUserVO.getGroupId());
            model.addAttribute("cap", (worklifeUserVO.getGroup().getMaHuyen() == null) || (worklifeUserVO.getGroup().getMaHuyen().equals("")) ? 1 : 2);
            model.addAttribute("maHuyen", (worklifeUserVO.getGroup().getMaHuyen() == null) || (worklifeUserVO.getGroup().getMaHuyen().equals("")) ? -1 : worklifeUserVO.getGroup().getMaHuyen());
            return "worklife/user/QuanLyQuyHoach/tchsquyhoach";
        }
    }
    @RequestMapping(value = "/worklife/user/quanlyquyhoach/getlisttracuuhsqh.do", method = RequestMethod.POST)
    public @ResponseBody
    DatatableResponseCriteriasVO<Element> getListHSQH(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List<HoSoQuyHoachVO> listData = null;
        try{
            listData = this.traCuuHoSoQuyHoachImpl.selectListTraCuuHSQH(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), listData);
    }
}
