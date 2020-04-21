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
import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.mockup.model.ChuyenSCTXVO;
import vn.worklife.user.mockup.model.SuCoVO;
import vn.worklife.user.mockup.service.impl.BaoCaoSuCoServiceImpl;
import vn.worklife.user.mockup.service.impl.SuCoServiceImpl;
import vn.worklife.user.util.UploadFileUtil;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class TraCuuSuCoDuongController {

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    SuCoServiceImpl suCoService;
    @Autowired
    BaoCaoSuCoServiceImpl baoCaoSuCoService;
    @Autowired
    UploadFileUtil uploadFileUtil;
    @Autowired
    WorklifeGroupServiceImpl worklifeGroupService;

    //////////// TRA CUU SU CO DUONG BIEN BAO ///////////////////
    @RequestMapping(value = "/worklife/user/SuCoDuong/tracuuscdbb.do")
    public String indexTraCuuScdbb(Model model) {
        WorklifeUserVO user = WorklifeUserManager.getLoginUser();
        List<WorklifeGroupVO> worklifeGroupVOList=null;
        if(user.getGroup().getMaHuyen().equals("")){
            worklifeGroupVOList = worklifeGroupService.selectAllGroupName();
        }else{
            worklifeGroupVOList = new ArrayList<WorklifeGroupVO>();
            worklifeGroupVOList.add(user.getGroup());
        }
        model.addAttribute("worklifeGroup",worklifeGroupVOList);
        model.addAttribute("group_Id", user.getGroupId());
        return "worklife/user/SuCoDuong/TraCuuSuCoDuongBienBao";
    }

    @RequestMapping(value = "/worklife/user/SuCoDuong/taitracuuscdbb.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> taiTraCuuScdbb(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<SuCoVO> dataList = null;
        try {
            dataList = this.suCoService.selectAllSuCoByWYHQL(criterias);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }
    @RequestMapping(value = "/worklife/user/SuCoDuong/tracuuscd/exportexcel.do")
    public void exportExcel(@RequestParam Map<String,String> params, HttpServletRequest request, HttpServletResponse response) {
        baoCaoSuCoService.exportExcel(params,"BaoCaoSuCoTemp.xlsx","TraCuuSuCo.xlsx",request,response);
    }
    @RequestMapping(value = "/worklife/user/TraCuuSuCoDuong/SaveForm.do", method = RequestMethod.POST)
    public String saveForm(@ModelAttribute("suCoVO") SuCoVO suCoVO, RedirectAttributes rm){
        /** TRANSACTION */
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);

        try{
            for (ChuyenSCTXVO chuyenSCTXVO: suCoVO.getChuyenSCTXVOS()){
                this.suCoService.updateChuyenSCTX(chuyenSCTXVO);
            }
            transactionManager.commit(status);
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            rm.addFlashAttribute("message", 3);
        }finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        return "redirect:/worklife/user/SuCoDuong/tracuuscdbb.do";
    }
}
