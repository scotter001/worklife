/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.web;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.mockup.model.BaoCaoSuCoVO;
import vn.worklife.user.mockup.model.FileAttachVO;
import vn.worklife.user.mockup.model.SuCoVO;
import vn.worklife.user.mockup.model.TiepDinhKemVO;
import vn.worklife.user.mockup.service.impl.BaoCaoSuCoServiceImpl;
import vn.worklife.user.mockup.service.impl.FileAttachmentServiceImpl;
import vn.worklife.user.mockup.service.impl.SuCoServiceImpl;
import vn.worklife.user.util.FileType;
import vn.worklife.user.util.UploadFileUtil;
import vn.worklife.user.util.file.model.FileUploadBCSuCoVO;
import vn.worklife.user.util.file.service.impl.FileUploadServiceImpl;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.mail.internet.MimeUtility;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Controller
public class BaoCaoSuCoDuongController {
    private Logger logger = Logger.getLogger(this.getClass());

    @Resource(name="FileUploadServiceImpl")
    public FileUploadServiceImpl fileUploadServiceImpl;

    @Autowired
    SuCoServiceImpl suCoService;
    @Autowired
    BaoCaoSuCoServiceImpl baoCaoSuCoService;
    @Autowired
    UploadFileUtil uploadFileUtil;
    @Autowired
    FileAttachmentServiceImpl fileAttachmentService;
    @Autowired
    PlatformTransactionManager transactionManager;

    ///////////////////////////////////////BAO CAO TINH HINH GIAO THONG////////////////////////
    @RequestMapping(value = "/worklife/user/SuCoDuong/baocaothgt.do")
    public String indexBaoCaoThgt() {
        return "worklife/user/SuCoDuong/BaoCaoSuCoDuongBienBao";
    }

    @RequestMapping(value = "/worklife/user/SuCoDuong/getbaocaothgt.do", method = RequestMethod.POST)
    @ResponseBody
    public DatatableResponseCriteriasVO<Element> getBaoCaoThgt(@RequestBody final DatatableRequestCriteriasVO criterias) {
        List<SuCoVO> dataList = null;
        try {
            WorklifeUserVO user = WorklifeUserManager.getLoginUser();
            criterias.getOptional().put("idgroup", user.getGroupId().toString());
            dataList = this.suCoService.selectAllSuCoByWYReport(criterias);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criterias.getDraw(), dataList);
    }

    @RequestMapping(value = "/worklife/user/SuCoDuong/luufiledinhkem.do", method = RequestMethod.POST)
    public String luuFileDinhKem(@ModelAttribute final BaoCaoSuCoVO baoCaoSuCoVO, RedirectAttributes rm) {
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        Integer idBaoCaoSuCo;
        try {
            WorklifeUserVO user = WorklifeUserManager.getLoginUser();
            baoCaoSuCoVO.setIdGroup(user.getGroupId());
            idBaoCaoSuCo = baoCaoSuCoService.selectIdBaoCaoSuCo(baoCaoSuCoVO);
            if(idBaoCaoSuCo == null){
                baoCaoSuCoService.insertBaoCaoSuCo(baoCaoSuCoVO);
                idBaoCaoSuCo = baoCaoSuCoVO.getIdBaoCao();
            }
            Calendar cal = Calendar.getInstance();
            int date = cal.get(Calendar.DATE);
            int month = cal.get(Calendar.MONTH) +1;
            int year = cal.get(Calendar.YEAR);
            String ngayBaoCao = String.valueOf(date)+'/'+ String.valueOf(month)+'/'+ String.valueOf(year);
            for(FileAttachVO fileAttachVO:baoCaoSuCoVO.getFiles()) {
                if (fileAttachVO.getFile() != null && fileAttachVO.getFile().getSize() > 0) {
                    /*this.uploadFileUtil.insertUpdateFile(idBaoCaoSuCo, FileType.suco_tuyenduong.getIdLoaiHoSo(), fileAttachVO.getFile());*/
                    this.uploadFileUtil.insertUpdateFileBaoCao(baoCaoSuCoVO.getIdGroup(),baoCaoSuCoVO.getTuan(),baoCaoSuCoVO.getNam(), fileAttachVO.getFile(), ngayBaoCao);
                }
            }
            rm.addFlashAttribute("isInsertSuccessfully",1);
            transactionManager.commit(status);
        } catch (Exception e) {
            e.printStackTrace();
            rm.addFlashAttribute("isInsertSuccessfully",3);
            transactionManager.rollback(status);
        }
        rm.addFlashAttribute("tuan", baoCaoSuCoVO.getTuan());
        rm.addFlashAttribute("nam", baoCaoSuCoVO.getNam());
        return "redirect:/worklife/user/SuCoDuong/baocaothgt.do";
    }

    /*@ResponseBody
    @RequestMapping(value = "/worklife/user/SuCoDuong/taifiledinhkem.do", method = RequestMethod.POST)
    public TiepDinhKemVO taiFileDinhKem(@ModelAttribute BaoCaoSuCoVO baoCaoSuCoVO) {
        TiepDinhKemVO tiepDinhKemVO=null;
        try {
            tiepDinhKemVO = fileAttachmentService.selectAttachedFileNameByWYG(baoCaoSuCoVO, FileType.suco_tuyenduong.getIdLoaiHoSo());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tiepDinhKemVO;
    }*/
    @RequestMapping(value = "/worklife/user/SuCoDuong/taifiledinhkem.do", method = RequestMethod.POST)
    public @ResponseBody FileUploadBCSuCoVO taiFileDinhKem(@ModelAttribute BaoCaoSuCoVO baoCaoSuCoVO){
        FileUploadBCSuCoVO fileUploadBCSuCoVO = new FileUploadBCSuCoVO();
        try{
            fileUploadBCSuCoVO = fileAttachmentService.selectAttachedFileNameByTuanAndNam(baoCaoSuCoVO.getTuan(), baoCaoSuCoVO.getNam(), baoCaoSuCoVO.getIdGroup());
        }catch (Exception e){
            e.printStackTrace();
        }
        return fileUploadBCSuCoVO;
    }

    @RequestMapping(value = "/worklife/user/SuCoDuong/exportexcel.do")
    public void exportExcel(@RequestParam Map<String,String> params, HttpServletRequest request, HttpServletResponse response) {
        baoCaoSuCoService.exportExcel(params,"BaoCaoSuCoTemp.xlsx","BaoCaoSuCo.xlsx",request,response);
    }
    @RequestMapping(value = "/worklife/user/SuCoDuong/file/json/downloadfile.do")
    public void downLoadFile(@RequestParam("tuan") int tuan,@RequestParam("nam") int nam,@RequestParam("idGroup") int idGroup,HttpServletRequest request,HttpServletResponse response) throws Exception {
        List<FileUploadBCSuCoVO> listfile = new ArrayList<>();
        try {
            listfile = this.fileUploadServiceImpl.selectDataFileByTuanAndNam(tuan, nam, idGroup);
        } catch (Exception e) {
            e.printStackTrace();
        }
        if(listfile != null&&listfile.size()>0){
            FileUploadBCSuCoVO file = listfile.get(0);
            String mimetype = "application/x-msdownload";
            response.setContentType(mimetype);
            String user_agent = request.getHeader("user-agent");
            boolean isInternetExplorer = (user_agent.indexOf("MSIE") > -1);
            if (isInternetExplorer) {
                response.setHeader("Content-disposition", "attachment; filename=\"" + URLEncoder.encode(file.getTen().trim(), "utf-8") + "\"");
            }
            else {
                response.addHeader("Content-disposition","attachment; filename=\"" + MimeUtility.encodeWord(file.getTen().trim())  + "\"");
            }
            logger.info(file.getTen());
            response.setContentLength(file.getDoDai());
            ServletOutputStream out = response.getOutputStream();
            logger.info("Before decompress : "+file.getNoiDung().length);
            byte[] decompress = UploadFileUtil.decompress(file.getNoiDung(),file.getDoDai());
            logger.info("After decompress : "+decompress.length);
            out.write(decompress);
            out.flush();
        }
    }
}
