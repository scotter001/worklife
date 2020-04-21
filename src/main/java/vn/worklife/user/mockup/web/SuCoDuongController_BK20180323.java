///*
// * Copyright (c) 2018.
// * Author : Phat Thinh
// */
//
//package vn.worklife.user.mockup.web;
//
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.transaction.PlatformTransactionManager;
//import org.springframework.transaction.TransactionDefinition;
//import org.springframework.transaction.TransactionStatus;
//import org.springframework.transaction.support.DefaultTransactionDefinition;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.servlet.mvc.support.RedirectAttributes;
//import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
//import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
//import vn.worklife.manager.category.service.impl.CategoryServiceImpl;
//import vn.worklife.manager.user.model.WorklifeUserVO;
//import vn.worklife.security.util.WorklifeUserManager;
//import vn.worklife.user.mockup.model.BaoCaoSuCoVO;
//import vn.worklife.user.mockup.model.FileAttachVO;
//import vn.worklife.user.mockup.model.SuCoVO;
//import vn.worklife.user.mockup.model.TiepDinhKemVO;
//import vn.worklife.user.mockup.service.impl.BaoCaoSuCoServiceImpl;
//import vn.worklife.user.mockup.service.impl.FileAttachmentServiceImpl;
//import vn.worklife.user.mockup.service.impl.SuCoServiceImpl;
//import vn.worklife.user.util.FileType;
//import vn.worklife.user.util.UploadFileUtil;
//
//import javax.lang.model.element.Element;
//import java.util.List;
//
////@DmQLThietBiBienBaoController
//public class SuCoDuongController_BK20180323 {
//    @Autowired
//    SuCoServiceImpl suCoService;
//    @Autowired
//    BaoCaoSuCoServiceImpl baoCaoSuCoService;
//    @Autowired
//    CategoryServiceImpl categoryService;
//    @Autowired
//    UploadFileUtil uploadFileUtil;
//    @Autowired
//    FileAttachmentServiceImpl fileAttachmentService;
//    @Autowired
//    PlatformTransactionManager transactionManager;
//
//
//    @RequestMapping(value = "/worklife/user/SuCoDuong/SuCoDuong.do")
//    public String indexQld(Model m) {
//        m.addAttribute("dmtuyenduong", categoryService.selectAllCategory("dmloaiduong"));
//        return "worklife/user/SuCoDuong/SuCoDuong";
//    }
//
//    @RequestMapping(value = "/worklife/user/SuCoDuong/sucoduongsearch.do", method = RequestMethod.POST)
//    @ResponseBody
//    public DatatableResponseCriteriasVO<Element> getSCDTheoTuanNam(@RequestBody final DatatableRequestCriteriasVO criterias) {
//        List<SuCoVO> dataList = null;
//        try {
//            dataList = this.suCoService.selectAllSuCoByWY(criterias);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
//    }
//
//    @RequestMapping(value = "/worklife/user/SuCoDuong/getscdtheoid.do", method = RequestMethod.POST)
//    @ResponseBody
//    public SuCoVO getSCDTheoId(@RequestParam("idSuCo") final int idSuCo) {
//        SuCoVO suCoVO = null;
//        try {
//            suCoVO = this.suCoService.selectSuCoById(idSuCo);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return suCoVO;
//    }
//
//    @RequestMapping(value = "/worklife/user/SuCoDuong/luu.do", method = RequestMethod.POST)
//    public String luuSuCoDuong(@ModelAttribute final SuCoVO suCoVo, RedirectAttributes rm) {
//        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
//        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
//        TransactionStatus status = transactionManager.getTransaction(td);
//        try {
//            WorklifeUserVO user = WorklifeUserManager.getLoginUser();
//            suCoVo.setIdGroup(user.getGroupId());
//            this.suCoService.insertSuCo(suCoVo);
//            rm.addFlashAttribute("message", 1);
//            transactionManager.commit(status);
//        } catch (Exception e) {
//            e.printStackTrace();
//            rm.addFlashAttribute("message", 3);
//            transactionManager.rollback(status);
//        }
//        return "redirect:/worklife/user/SuCoDuong/SuCoDuong.do";
//    }
//
//    ///////////////////////////////////////BAO CAO TINH HINH GIAO THONG////////////////////////
//    @RequestMapping(value = "/worklife/user/SuCoDuong/baocaothgt.do")
//    public String indexBaoCaoThgt() {
//
//        return "worklife/user/SuCoDuong/BaoCaoSuCoDuongBienBao";
//    }
//
//    @RequestMapping(value = "/worklife/user/SuCoDuong/getbaocaothgt.do", method = RequestMethod.POST)
//    @ResponseBody
//    public DatatableResponseCriteriasVO<Element> getBaoCaoThgt(@RequestBody final DatatableRequestCriteriasVO criterias) {
//        List<SuCoVO> dataList = null;
//        try {
//            WorklifeUserVO user = WorklifeUserManager.getLoginUser();
//            criterias.getOptional().put("idgroup", user.getGroupId().toString());
//            dataList = this.suCoService.selectAllSuCoByWYReport(criterias);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
//    }
//
//
//    @RequestMapping(value = "/worklife/user/SuCoDuong/luufiledinhkem.do", method = RequestMethod.POST)
//    public String luuFileDinhKem(@ModelAttribute final BaoCaoSuCoVO baoCaoSuCoVO, RedirectAttributes rm) {
//        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
//        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
//        TransactionStatus status = transactionManager.getTransaction(td);
//        Integer idBaoCaoSuCo;
//        try {
//            WorklifeUserVO user = WorklifeUserManager.getLoginUser();
//            baoCaoSuCoVO.setIdGroup(user.getGroupId());
//            idBaoCaoSuCo = baoCaoSuCoService.selectIdBaoCaoSuCo(baoCaoSuCoVO);
//            if(idBaoCaoSuCo == null){
//                baoCaoSuCoService.insertBaoCaoSuCo(baoCaoSuCoVO);
//                idBaoCaoSuCo = baoCaoSuCoVO.getIdBaoCao();
//            }
//           for(FileAttachVO fileAttachVO:baoCaoSuCoVO.getFiles()) {
//                if (fileAttachVO.getFile() != null && fileAttachVO.getFile().getSize() > 0) {
//                    this.uploadFileUtil.insertUpdateFile(idBaoCaoSuCo, FileType.suco_tuyenduong.getIdLoaiHoSo(), fileAttachVO.getFile());
//                }
//            }
//            transactionManager.commit(status);
//        } catch (Exception e) {
//            e.printStackTrace();
//            transactionManager.rollback(status);
//        }
//        rm.addFlashAttribute("tuan", baoCaoSuCoVO.getTuan());
//        rm.addFlashAttribute("nam", baoCaoSuCoVO.getNam());
//        return "redirect:/worklife/user/SuCoDuong/baocaothgt.do";
//    }
//    @ResponseBody
//    @RequestMapping(value = "/worklife/user/SuCoDuong/taifiledinhkem.do", method = RequestMethod.POST)
//    public TiepDinhKemVO taiFileDinhKem(@RequestParam("week") int week , @RequestParam("year") int year) {
//        TiepDinhKemVO tiepDinhKemVO=null;
//        try {
//            WorklifeUserVO user = WorklifeUserManager.getLoginUser();
//            tiepDinhKemVO = fileAttachmentService.selectAttachedFileByWYG(week,year,user.getGroupId());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return tiepDinhKemVO;
//    }
//    //////////// TRA CUU SU CO DUONG BIEN BAO ///////////////////
//    @RequestMapping(value = "/worklife/user/SuCoDuong/tracuuscdbb.do")
//    public String indexTraCuuScdbb() {
//        return "worklife/user/SuCoDuong/TraCuuSuCoDuongBienBao";
//    }
//
//    @RequestMapping(value = "/worklife/user/SuCoDuong/taitracuuscdbb.do", method = RequestMethod.POST)
//    @ResponseBody
//    public DatatableResponseCriteriasVO<Element> taiTraCuuScdbb(@RequestBody final DatatableRequestCriteriasVO criterias) {
//        List<SuCoVO> dataList = null;
//        try {
//            dataList = this.suCoService.selectAllSuCoByWYHQL(criterias);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
//    }
//}
