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
import vn.worklife.manager.category.service.impl.CategoryServiceImpl;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.mockup.model.BienBaoVO;
import vn.worklife.user.mockup.model.SuCoVO;
import vn.worklife.user.mockup.service.impl.BaoCaoSuCoServiceImpl;
import vn.worklife.user.mockup.service.impl.BienBaoImpl;
import vn.worklife.user.mockup.service.impl.FileAttachmentServiceImpl;
import vn.worklife.user.mockup.service.impl.SuCoServiceImpl;
import vn.worklife.user.util.UploadFileUtil;

import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@Controller
public class SuCoDuongController {
    @Autowired
    SuCoServiceImpl suCoService;
    @Autowired
    BaoCaoSuCoServiceImpl baoCaoSuCoService;
    @Autowired
    CategoryServiceImpl categoryService;
    @Autowired
    UploadFileUtil uploadFileUtil;
    @Autowired
    FileAttachmentServiceImpl fileAttachmentService;
    @Autowired
    PlatformTransactionManager transactionManager;
    @Autowired
    BienBaoImpl bienBaoImpl;

    @RequestMapping(value = "/worklife/user/SuCoDuong/SuCoDuong.do")
    public String indexQld(Model model) {
        /*m.addAttribute("tuyenduong", categoryService.selectAllCategory("tuyenduong"));*/
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("group_Id", worklifeUserVO.getGroupId());
            return "worklife/user/SuCoDuong/SuCoDuong";
        }
    }

    @RequestMapping(value = "/worklife/user/SuCoDuong/sucoduongsearch.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> getSCDTheoTuanNam(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<SuCoVO> dataList = null;
        try {
            dataList = this.suCoService.selectAllSuCoByWY(criterias);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }

    @RequestMapping(value = "/worklife/user/SuCoDuong/getscdtheoid.do", method = RequestMethod.POST)
    @ResponseBody
    public SuCoVO getSCDTheoId(@RequestParam("idSuCo") final int idSuCo) {
        SuCoVO suCoVO = null;
        try {
            suCoVO = this.suCoService.selectSuCoById(idSuCo);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return suCoVO;
    }

    @RequestMapping(value = "/worklife/user/SuCoDuong/luu.do", method = RequestMethod.POST)
    public String luuSuCoDuong(@ModelAttribute("suCoVo") SuCoVO suCoVo, RedirectAttributes rm) {
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            WorklifeUserVO user = WorklifeUserManager.getLoginUser();
            suCoVo.setIdGroup(user.getGroupId());
            if(suCoVo.getIdSuCo()>0){
                this.suCoService.updateSuCo(suCoVo);
            }else{
                this.suCoService.insertSuCo(suCoVo);
            }
            rm.addFlashAttribute("message", 1);
            transactionManager.commit(status);
            int position = 0;
            try {
                position = this.suCoService.getPosition(suCoVo.getIdSuCo());
            } catch (Exception e) {
                position = 0;
                e.printStackTrace();
            }
            rm.addFlashAttribute("startAt", ((position - 1) / 10 * 10));
            rm.addFlashAttribute("idSuCo", suCoVo.getIdSuCo());
        } catch (Exception e) {
            e.printStackTrace();
            rm.addFlashAttribute("message", 3);
            transactionManager.rollback(status);
        }
        return "redirect:/worklife/user/SuCoDuong/SuCoDuong.do";
    }
    @RequestMapping(value = "/worklife/user/SuCoDuong/listBienBao.do")
    public @ResponseBody List<BienBaoVO> listBienBao(HttpServletRequest request){
        List<BienBaoVO> listdata = new ArrayList<>();
        int idbbdth = Integer.parseInt(request.getParameter("idTuyenDuong"));
        try{
            listdata = this.bienBaoImpl.selectBienBaoByIdDuong(idbbdth);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listdata;
    }
}
