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
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.mockup.model.DmDVTVO;
import vn.worklife.user.mockup.service.impl.DanhMucSCTXServiceImpl;
import vn.worklife.user.mockup.service.impl.SuCoServiceImpl;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class DanhMucSCTXController {

    @Autowired
    PlatformTransactionManager transactionManager;
    @Autowired
    SuCoServiceImpl suCoService;
    @Autowired
    DanhMucSCTXServiceImpl danhMucSCTXService;

    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/lapdanhmucsuachuathuongxuyen.do", method=RequestMethod.GET)
    public String indexSctx(Model model) {
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            return "/worklife/user/SuaChuaThuongXuyen/LapDanhMucSuaChuaThuongXuyen";
        }
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/getdmsctxtheoquynam.do", method = RequestMethod.POST)
    @ResponseBody
    public DanhMucSCTXVO getDanhMucSctxTheoQuyNam(HttpServletRequest request) {
        DanhMucSCTXVO danhMucSCTXVO = new DanhMucSCTXVO();
        int quy = Integer.parseInt(request.getParameter("quy"));
        int nam = Integer.parseInt(request.getParameter("nam"));
        int idGroup = Integer.parseInt(request.getParameter("idGroup"));
        try {
            danhMucSCTXVO.setDanhMucSCTXVOS(this.danhMucSCTXService.selectAllDmSctxByQY(quy, nam, idGroup));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return danhMucSCTXVO;
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/saveForm.do", method = RequestMethod.POST)
    public String saveForm(@ModelAttribute("danhMucSCTXVO") DanhMucSCTXVO danhMucSCTXVO, RedirectAttributes rm){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            for (DanhMucSCTXVO danhMucSCTXVo: danhMucSCTXVO.getDanhMucSCTXVOS()){
                if (danhMucSCTXVo.getIdDmSctx() == 0){
                    this.danhMucSCTXService.insertDmSCTX(danhMucSCTXVo);
                }
                else {
                    this.danhMucSCTXService.updateDmSCTX(danhMucSCTXVo);
                }
            }
            transactionManager.commit(status);
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            rm.addFlashAttribute("message", 3);
        }
        return "redirect:/worklife/user/suachuathuongxuyen/lapdanhmucsuachuathuongxuyen.do";
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/getiddvt.do", method = RequestMethod.POST)
    public @ResponseBody List<DmDVTVO> getListDVT(){
        List<DmDVTVO> listData = new ArrayList<>();
        try{
            listData = this.danhMucSCTXService.selectListDVT();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/exportdmsctxtoexcel.do")
    public void exportDanhMucSctxToExcel(@RequestParam final Map<String, String> optional, HttpServletRequest request, HttpServletResponse response) {
       danhMucSCTXService.exportDanhMucSctxToExcel(optional,"DanhMucSctxTemp.xlsx","DanhMucSctx.xlsx",request,response);
    }
    @RequestMapping(value = "/worklife/user/suachuathuongxuyen/deleteSCTX.do", method = RequestMethod.POST)
    public @ResponseBody boolean delete(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idDmSctx = 0;
                try {
                    idDmSctx = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idDmSctx = 0;
                    e.printStackTrace();
                }
                this.danhMucSCTXService.deleteSCTX(idDmSctx);
            }
            transactionManager.commit(status);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);

        } finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        return true;
    }
}