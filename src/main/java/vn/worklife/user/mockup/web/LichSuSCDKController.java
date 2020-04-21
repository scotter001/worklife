package vn.worklife.user.mockup.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.user.mockup.model.LapDanhMucSCDKVO;
import vn.worklife.user.mockup.model.LichSuSCDKVO;
import vn.worklife.user.mockup.model.NhapThongTinSCDKVO;
import vn.worklife.user.mockup.model.TuyenDuongVO;
import vn.worklife.user.mockup.service.impl.LichSuSCDKImpl;
import vn.worklife.user.quanlycau.model.CauVO;
import vn.worklife.user.quanlytuyenduong.model.QLThietBiVO;
import vn.worklife.user.quanlytuyenduong.model.TuyenDuongHatVO;

import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class LichSuSCDKController {
    @Autowired
    LichSuSCDKImpl lichSuSCDKImpl;

    @RequestMapping(value = "/worklife/user/suachuadinhky/lichsusuachuadinhky.do")
    public String indexLsScdk() {
        try {
            return "worklife/user/SuaChuaDinhKy/LichSuSCDK";
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/login.do";
        }
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/gettuyenduong.do", method = RequestMethod.POST)
    public @ResponseBody List<TuyenDuongHatVO> getListTD(){
        List<TuyenDuongHatVO> listData = new ArrayList<>();
        try{
            listData = this.lichSuSCDKImpl.selectListTD();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/getcau.do", method = RequestMethod.POST)
    public @ResponseBody List<CauVO> getListCau(){
        List<CauVO> listData = new ArrayList<>();
        try{
            listData = this.lichSuSCDKImpl.selectListCau();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/getthietbi.do", method = RequestMethod.POST)
    public @ResponseBody List<QLThietBiVO> getListTB(){
        List<QLThietBiVO> listData = new ArrayList<>();
        try {
            listData = this.lichSuSCDKImpl.selectListTB();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/getcongtrinh.do", method = RequestMethod.POST)
    public @ResponseBody List<LapDanhMucSCDKVO> getListCT(){
        List<LapDanhMucSCDKVO> listData = new ArrayList<>();
        try {
            listData = this.lichSuSCDKImpl.selectListCT();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/selectlichsusuachuadinhky.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> selectTableLichSuDMSCDK(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<NhapThongTinSCDKVO> dataList = null;
        try {
            dataList = this.lichSuSCDKImpl.selectTableLichSuDMSCDK(criterias);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }

    @RequestMapping(value = "/worklife/user/suachuadinhky/exportexcel.do")
    public void exportExcel(@RequestParam Map<String,String> params, HttpServletRequest request, HttpServletResponse response) {
        try {
            lichSuSCDKImpl.exportExcel(params,"LichSuSuaChuaDinhKyTemp.xlsx","LichSuSuaChuaDinhKy.xlsx",request,response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
