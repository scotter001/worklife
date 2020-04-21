/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.web;


import org.springframework.beans.factory.annotation.Autowired;
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
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.mockup.model.SctxThucHienVO;
import vn.worklife.user.mockup.service.impl.DanhMucSCTXServiceImpl;
import vn.worklife.user.mockup.service.impl.SctxThucHienServiceImpl;

import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class LapKeHoachSCTXController {
    @Autowired
    DanhMucSCTXServiceImpl danhMucSCTXService;
    @Autowired
    SctxThucHienServiceImpl sctxThucHienService;
    @Autowired
    PlatformTransactionManager transactionManager;

    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/lapkehoachsuachuathuongxuyen.do", method = RequestMethod.GET)
    public String LapKeHoachSuaChuaThuongXuyen(Model model){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("group_Id", worklifeUserVO.getGroupId());
            return "/worklife/user/SuaChuaThuongXuyen/LapKeHoachSuaChuaThuongXuyen";
        }
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/lapkehoachthuchien/getlist.do", method = RequestMethod.POST)
    public @ResponseBody DanhMucSCTXVO getListData(HttpServletRequest request){
        DanhMucSCTXVO danhMucSCTXVO = new DanhMucSCTXVO();
        int quy = Integer.parseInt(request.getParameter("quy"));
        int nam = Integer.parseInt(request.getParameter("nam"));
        int idGroup = Integer.parseInt(request.getParameter("idGroup"));
        try{
            danhMucSCTXVO.setDanhMucSCTXVOS(this.sctxThucHienService.selectListLapKeHoach(quy, nam, idGroup));
        }catch (Exception e){
            e.printStackTrace();
        }
        return danhMucSCTXVO;
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/lapkehoachsuachuathuongxuyen/saveForm.do", method = RequestMethod.POST)
    public String saveSctxTh(@ModelAttribute("danhMucSCTXVO") DanhMucSCTXVO danhMucSCTXVO, RedirectAttributes rm) {
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (DanhMucSCTXVO danhMucSCTXVo: danhMucSCTXVO.getDanhMucSCTXVOS()){
                if (danhMucSCTXVo.getIdSctx() == 0){
                    sctxThucHienService.insertSctxTh(danhMucSCTXVo);
                }
                else {
                    sctxThucHienService.updateSctxTh(danhMucSCTXVo);
                }
            }
            rm.addFlashAttribute("message", 1);
            transactionManager.commit(status);
        } catch (Exception e) {
            e.printStackTrace();
            rm.addFlashAttribute("message", 3);
            transactionManager.rollback(status);
        }
        return "redirect:/worklife/user/suachuathuongxuyen/lapkehoachsuachuathuongxuyen.do";
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/exportdmsctxforplanningtoexcel.do", method = RequestMethod.GET)
    public void exportDanhMucSctxToExcel(@RequestParam final Map<String, String> optional, HttpServletRequest request, HttpServletResponse response) {
        danhMucSCTXService.exportDanhMucSctxForPlanningToExcel(optional,"LapKeHoachDanhMucSctxTemp.xlsx","LapKeHoachDanhMucSctx.xlsx",request,response);
    }
}