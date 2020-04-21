package vn.worklife.user.quanlytuyenduong.web;



import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.user.mockup.model.TuyenDuongVO;
import vn.worklife.user.quanlytuyenduong.model.TuyenThuocTinhVO;
import vn.worklife.user.quanlytuyenduong.service.impl.DmTuyenDuongThuocTinhImpl;
import org.springframework.beans.factory.annotation.Autowired;


import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;

@Controller
public class DmTuyenDuongThuocTinhController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    DmTuyenDuongThuocTinhImpl dmTuyenDuongThuocTinhImpl;


    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtuyenduongthuoctinh.do")
    public String index(Model model) {
        return "worklife/user/QuanLyTuyenDuong/dmtuyenduongthuoctinh";
    }

    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdthuoctinh/gettuyenduong.do", method = RequestMethod.POST)
    public @ResponseBody List<TuyenThuocTinhVO> selectShowTuyenDuong(HttpServletRequest request) {
        int idLoaiDuong = Integer.parseInt(request.getParameter("idLoaiDuong"));
        String tenDuong =  request.getParameter("tenDuong");
        List<TuyenThuocTinhVO> dataList = new ArrayList<>();
        try {
            dataList = this.dmTuyenDuongThuocTinhImpl.selectListTuyenDuongThuocTinh(idLoaiDuong,tenDuong);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dataList;
    }
    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdtthuoctinh/saveForm.do", method = RequestMethod.POST)
    public String saveForm(@ModelAttribute("tuyenThuocTinhVO") TuyenThuocTinhVO tuyenThuocTinhVO, RedirectAttributes rm){
        /** TRANSACTION */
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            for(TuyenThuocTinhVO tuyenThuocTinhVO1: tuyenThuocTinhVO.getTuyenDuongVOs()){
                if (tuyenThuocTinhVO1.getIdTuyenDuong() == -1){
                    this.dmTuyenDuongThuocTinhImpl.insertTuyenDuong(tuyenThuocTinhVO1);
                }
                else {
                    this.dmTuyenDuongThuocTinhImpl.updateTuyenDuong(tuyenThuocTinhVO1);
                }
            }
            transactionManager.commit(status);
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            rm.addFlashAttribute("message", 3);
            transactionManager.rollback(status);
        }finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        return "redirect:/worklife/user/quanlytuyenduong/dmtuyenduongthuoctinh.do";
    }
//    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdthuoctinh/gettuyenduongid.do", method = {RequestMethod.POST,RequestMethod.GET})
//    public @ResponseBody List<TuyenThuocTinhVO> getListTuyenDuong(HttpServletRequest request){
//        int idTuyenDuong = Integer.parseInt(request.getParameter("idTuyenDuong"));
//        List<TuyenThuocTinhVO> dataList = new ArrayList<>();
//        try{
//            dataList = this.dmTuyenDuongThuocTinhImpl.selectTuyenDuongById(idTuyenDuong);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return dataList;
//    }


//    @RequestMapping(value = "/worklife/user/quanlytuyenduong/dmtdthuoctinh/gettuyenduongid.do", method = {RequestMethod.POST,RequestMethod.GET})
//    public @ResponseBody List<TuyenThuocTinhVO> getDataByIdtd(HttpServletRequest request){
//        List<TuyenThuocTinhVO> dataListTD = new ArrayList<>();
//        int idTuyenDuong = Integer.parseInt(request.getParameter("idTuyenDuong"));
//        try{
//            dataListTD = this.dmTuyenDuongThuocTinhImpl.selectTuyenDuongById(idTuyenDuong);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return dataListTD;
//    }


    @RequestMapping(value = "/worklife/user/quanlytuyenduong/delTuyebDuong.do", method = RequestMethod.POST)
    @ResponseBody
    public boolean deleteTuyebDuong(HttpServletRequest request ) {
        int idTuyenDuong = Integer.parseInt(request.getParameter("idTuyenDuong"));
        try {
                this.dmTuyenDuongThuocTinhImpl.deleteTuyenDuong(idTuyenDuong);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
