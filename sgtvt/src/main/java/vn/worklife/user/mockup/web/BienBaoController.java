package vn.worklife.user.mockup.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.category.service.impl.CategoryServiceImpl;
import vn.worklife.user.mockup.model.BienBaoVO;
import vn.worklife.user.mockup.service.impl.BienBaoImpl;

import javax.lang.model.element.Element;
import java.util.List;

@Controller
public class BienBaoController {

    @Autowired
    BienBaoImpl bienBaoImpl;

    @Autowired
    CategoryServiceImpl categoryService;

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getDataBienBao.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> selectShowBienBao(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<BienBaoVO> dataList = null;
        try {
            dataList = this.bienBaoImpl.selectShowBienBao(criterias);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getBienBaoById.do", method = RequestMethod.POST)
    @ResponseBody
    public BienBaoVO selectBridgeById(@RequestParam("idBbdth") int idBbdth) {
        try {
            return bienBaoImpl.selectBienBaoById(idBbdth);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/insertBienBao.do", method = RequestMethod.POST)
    public String insertBridge(@ModelAttribute final BienBaoVO bienBaoVO, RedirectAttributes rm) {
        try {
            if (bienBaoVO.getIdBbdth() == -1) {
                this.bienBaoImpl.insertBienBao(bienBaoVO);
            } else {
                this.bienBaoImpl.updateBienBao(bienBaoVO);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "redirect:/worklife/user/quanlyduong/quanlyduong.do";
    }
}
