package vn.worklife.user.mockup.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.category.service.impl.CategoryServiceImpl;
import vn.worklife.user.mockup.model.BridgeVO;
import vn.worklife.user.mockup.model.ThongSoKtVO;
import vn.worklife.user.mockup.service.impl.BridgeImpl;

import javax.lang.model.element.Element;
import java.util.List;

@Controller
public class BridgeController {

    @Autowired
    BridgeImpl bridgeImpl;

    @Autowired
    CategoryServiceImpl categoryService;

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getDataBridge.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> selectShowCau(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<BridgeVO> dataList = null;
        try {
            dataList = this.bridgeImpl.selectShowCau(criterias);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getBridgeById.do", method = RequestMethod.POST)
    @ResponseBody
    public BridgeVO selectBridgeById(@RequestParam("idCau") int idCau) {
        try {
            return bridgeImpl.selectBridgeById(idCau);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/insertBridge.do", method = RequestMethod.POST)
    public String insertBridge(@ModelAttribute final BridgeVO bridgeVO) {
        try {
            if (bridgeVO.getIdCau() == -1) {
                this.bridgeImpl.insertBridge(bridgeVO);
            } else {
                this.bridgeImpl.updateBridge(bridgeVO);
            }
            bridgeVO.getDetails().forEach(item -> {
                if (!StringUtils.isEmpty(item.getIdCauKt())) {
                    item.setIdCauKt(bridgeVO.getIdCau());
                    if (item.getIdThongSoKt() <= 0) {
                        this.bridgeImpl.insertInfoBridge(item);
                    } else {
                        this.bridgeImpl.updateInfoBridge(item);
                    }
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "redirect:/worklife/user/quanlyduong/quanlyduong.do";

    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/delThongTinCau.do", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteThongTinCau(@RequestBody int id[]) {
        try {
            for (int i : id) {
                this.bridgeImpl.deleteThongTinCau(i);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/selectDm.do", method = RequestMethod.POST)
    @ResponseBody
    public ThongSoKtVO selectDm(int idThongSoKt) {
        try {
            return bridgeImpl.selectDm(idThongSoKt);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
