package vn.worklife.user.mockup.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.category.service.impl.CategoryServiceImpl;
import vn.worklife.user.mockup.model.BaoTriVO;
import vn.worklife.user.mockup.model.BienBaoVO;
import vn.worklife.user.mockup.service.impl.BaoTriImpl;
import vn.worklife.user.mockup.service.impl.BienBaoImpl;

import javax.lang.model.element.Element;
import java.util.List;

@Controller
public class BaoTriController {

    @Autowired
    BaoTriImpl baoTriImpl;

    @Autowired
    CategoryServiceImpl categoryService;

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getDataBaoTriDuong.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> selectShowLoaiBaoTriDuong(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<BaoTriVO> dataList = null;
        try {
            dataList = this.baoTriImpl.selectShowLoaiBaoTriDuong(criterias);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getDataBaoTriCau.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> selectShowLoaiBaoTriCau(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<BaoTriVO> dataList = null;
        try {
            dataList = this.baoTriImpl.selectShowLoaiBaoTriCau(criterias);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getDataBaoTriThietBi.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> selectShowLoaiBaoTriThietBi(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<BaoTriVO> dataList = null;
        try {
            dataList = this.baoTriImpl.selectShowLoaiBaoTriThietBi(criterias);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getBaoTriThietBiById.do", method = RequestMethod.POST)
    @ResponseBody
    public BaoTriVO selectShowLoaiBaoTriThietBiById(@RequestParam("idBaoTri") int idBaoTri) {
        try {
            return baoTriImpl.selectShowLoaiBaoTriThietBiById(idBaoTri);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getBaoTriById.do", method = RequestMethod.POST)
    @ResponseBody
    public BaoTriVO selectShowLoaiBaoTriDuongById(@RequestParam("idBaoTri") int idBaoTri) {
        try {
            return baoTriImpl.selectShowLoaiBaoTriDuongById(idBaoTri);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getBaoTriCauById.do", method = RequestMethod.POST)
    @ResponseBody
    public BaoTriVO selectShowLoaiBaoTriCauById(@RequestParam("idBaoTri") int idBaoTri) {
        try {
            return baoTriImpl.selectShowLoaiBaoTriCauById(idBaoTri);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/insertBaoTriDuong.do", method = RequestMethod.POST)
    public String insertLoaiBaoTriDuong(@ModelAttribute final BaoTriVO baoTriVO) {
        try {
            if (baoTriVO.getIdBaoTri() == -1) {
                this.baoTriImpl.insertLoaiBaoTriDuong(baoTriVO);
            } else {
                this.baoTriImpl.updateBaoTri(baoTriVO);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "redirect:/worklife/user/quanlyduong/quanlyduong.do";
    }
}
