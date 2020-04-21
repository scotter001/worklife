package vn.worklife.user.quanlytuyenduong.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.user.quanlytuyenduong.model.QLBaoCaoTTCDVO;
import vn.worklife.user.quanlytuyenduong.service.impl.DmQLBaoCaoTTCauDuongImpl;


import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class DmQLBaoCaoTTCauDuongController {

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    DmQLBaoCaoTTCauDuongImpl dmQLBaoCaoTTCauDuongImpl;


    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmqlbaocaotinhtrangcauduong.do")
    public String index(Model model){
        return "worklife/user/QuanLyTuyenDuong/dmqlbaocaotinhtrangcauduong";
    }



    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getlistbaocaottcau.do", method = RequestMethod.POST)
    public @ResponseBody
    DatatableResponseCriteriasVO<Element> getListBaoCaoCau(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List <QLBaoCaoTTCDVO> dataList = null;
        try{
            dataList = this.dmQLBaoCaoTTCauDuongImpl.selectListBaoCaoTTCau(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), dataList);
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getlistbaocaottduong.do", method = RequestMethod.POST)
    public @ResponseBody
    DatatableResponseCriteriasVO<Element> getListBaoCaoDuong(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List <QLBaoCaoTTCDVO> dataList = null;
        try{
            dataList = this.dmQLBaoCaoTTCauDuongImpl.selectListBaoCaoTTDuong(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), dataList);
    }





//    @RequestMapping(value = "/worklife/user/quanlytuyenduong/getlistbaocaottcau.do", method = RequestMethod.POST)
//    public @ResponseBody
//    List<QLBaoCaoTTCDVO> selectShowBaoCaoTTCau(HttpServletRequest request) {
//        int quy = Integer.parseInt(request.getParameter("selQuy"));
//        int nam = Integer.parseInt(request.getParameter("selNam"));
//        int tinhTrang = Integer.parseInt(request.getParameter("tinhTrang"));
//
//        List<QLBaoCaoTTCDVO> dataList = new ArrayList<>();
//        try {
//            dataList = this.dmQLBaoCaoTTCauDuongImpl.selectListBaoCaoTTCau(quy,nam,tinhTrang);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return dataList;
//    }



}
