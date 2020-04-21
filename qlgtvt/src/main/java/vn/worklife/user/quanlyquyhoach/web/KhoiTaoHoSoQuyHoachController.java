package vn.worklife.user.quanlyquyhoach.web;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.quanlyquyhoach.model.*;
import vn.worklife.user.quanlyquyhoach.service.impl.KhoiTaoHoSoQuyHoachImpl;
import vn.worklife.user.util.UploadFileUtil;
import vn.worklife.user.util.file.service.impl.FileUploadServiceImpl;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.mail.internet.MimeUtility;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Controller
public class KhoiTaoHoSoQuyHoachController {
    private Logger logger = Logger.getLogger(this.getClass());

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    KhoiTaoHoSoQuyHoachImpl khoiTaoHoSoQuyHoachImpl;

    @Autowired
    private UploadFileUtil uploadFileUtil;

    @Resource(name="FileUploadServiceImpl")
    public FileUploadServiceImpl fileUploadServiceImpl;

    @RequestMapping(value = "/worklife/user/quanlyquyhoach/kthsqh.do")
    public String index(Model model){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("group_Id", worklifeUserVO.getGroupId());
            model.addAttribute("cap", (worklifeUserVO.getGroup().getMaHuyen()==null)||(worklifeUserVO.getGroup().getMaHuyen().equals(""))?1:2);
            model.addAttribute("maHuyen", worklifeUserVO.getGroup().getMaHuyen());
            return "worklife/user/QuanLyQuyHoach/kthsquyhoach";
        }
    }
    @RequestMapping(value = "/worklife/user/qlquyhoach/json/loaddonvituvanso.do", method = RequestMethod.POST)
    public @ResponseBody
    List<DmDonViTuVanQHVO> getList(HttpServletRequest request){
        int cap = Integer.parseInt(request.getParameter("cap"));
        List<DmDonViTuVanQHVO> listData = new ArrayList<>();
        try{
            listData = this.khoiTaoHoSoQuyHoachImpl.selectListDmDonViQH(cap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/qlquyhoach/json/loadcoquanthamdinhso.do", method = RequestMethod.POST)
    public @ResponseBody List<DmThamDinhVO> getListThamDinh(){
        List<DmThamDinhVO> listData = new ArrayList<>();
        try{
            listData = this.khoiTaoHoSoQuyHoachImpl.selectListDmThamDinh();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/qlquyhoach/json/loadcoquanduyet.do", method = RequestMethod.POST)
    public @ResponseBody List<DmCQDuyetVO> getListCQDuyet(HttpServletRequest request){
        int cap = Integer.parseInt(request.getParameter("cap"));
        List<DmCQDuyetVO> listData = new ArrayList<>();
        try{
            listData = this.khoiTaoHoSoQuyHoachImpl.selectListCQDuyet(cap);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value="/worklife/user/doccumentfile/file/json/delete.do", method=RequestMethod.POST)
    public @ResponseBody boolean deletefileupload(@RequestParam("idBanVe_QH") int idBanVe_QH){
        try {
            if(idBanVe_QH != 0){
                this.khoiTaoHoSoQuyHoachImpl.updateFileUploadVO(idBanVe_QH);
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }
    @RequestMapping(value="/worklife/user/doccumentfile/filetailieu/json/delete.do", method=RequestMethod.POST)
    public @ResponseBody boolean deletefiletailieuupload(@RequestParam("idTaiLieu_QH") int idTaiLieu_QH){
        try {
            if(idTaiLieu_QH != 0){
                this.khoiTaoHoSoQuyHoachImpl.updateFileTaiLieu(idTaiLieu_QH);
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }
    @RequestMapping(value = "/worklife/user/quanlyquyhoach/getlisthsqh.do", method = RequestMethod.POST)
    public @ResponseBody
    DatatableResponseCriteriasVO<Element> getListHSQH(@RequestBody final DatatableRequestCriteriasVO criteriasVO){
        List<HoSoQuyHoachVO> listData = null;
        try{
            listData = this.khoiTaoHoSoQuyHoachImpl.selectListHSQH(criteriasVO);
        }catch (Exception e){
            e.printStackTrace();
        }
        return new DatatableResponseCriteriasVO(criteriasVO.getDraw(), listData);
    }
    @RequestMapping(value = "/worklife/user/quanlyquyhoach/kthsquyhoach/saveForm.do", method = RequestMethod.POST)
    public String saveForm(@ModelAttribute("hoSoQuyHoachVO") HoSoQuyHoachVO hoSoQuyHoachVO, RedirectAttributes rm){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            if (hoSoQuyHoachVO.getIdHoSo_QH() == -1){
                this.khoiTaoHoSoQuyHoachImpl.insertHSQH(hoSoQuyHoachVO);
                this.khoiTaoHoSoQuyHoachImpl.updateIdParent(hoSoQuyHoachVO.getIdHoSo_QH());
            }
            else {
                if (hoSoQuyHoachVO.getDieuChinh().equals("0")){
                    this.khoiTaoHoSoQuyHoachImpl.updateHSQH(hoSoQuyHoachVO);
                }
                else {
                    this.khoiTaoHoSoQuyHoachImpl.insertHSQH(hoSoQuyHoachVO);
                }
            }
            List<BanVeQuyHoachVO> listBanVe;
            listBanVe = hoSoQuyHoachVO.getBanVeQuyHoachVOS();
            if (listBanVe != null && listBanVe.size() > 0){
                for (BanVeQuyHoachVO banVeQuyHoachVO: listBanVe){
                    banVeQuyHoachVO.setIdHoSo_QH(hoSoQuyHoachVO.getIdHoSo_QH());
                    if (hoSoQuyHoachVO.getDieuChinh().equals("0")){
                        if (banVeQuyHoachVO.getIdBanVe_QH() == 0){
                            this.khoiTaoHoSoQuyHoachImpl.insertBanVeQuyHoach(banVeQuyHoachVO);
                        }
                        else {
                            this.khoiTaoHoSoQuyHoachImpl.updateBanVeQuyHoach(banVeQuyHoachVO);
                        }
                        if (banVeQuyHoachVO.getFile() != null && !banVeQuyHoachVO.getFile().isEmpty()) {
                            this.uploadFileUtil.updateFileBanVeQH(banVeQuyHoachVO, banVeQuyHoachVO.getFile(), true);
                        }
                    }
                    else {
                        this.khoiTaoHoSoQuyHoachImpl.insertBanVeQuyHoach(banVeQuyHoachVO);
                        if ((banVeQuyHoachVO.getFile() == null || banVeQuyHoachVO.getFile().isEmpty()) && banVeQuyHoachVO.getId() != 0){
                            BanVeQuyHoachVO file;
                            try{
                                file = this.khoiTaoHoSoQuyHoachImpl.selectFileBanVe(banVeQuyHoachVO.getId());
                                file.setIdBanVe_QH(banVeQuyHoachVO.getIdBanVe_QH());
                                this.fileUploadServiceImpl.updateFileBanVeQuyHoach(file);
                             }catch (Exception e){
                                e.printStackTrace();
                            }
                        }
                        if (banVeQuyHoachVO.getFile() != null && !banVeQuyHoachVO.getFile().isEmpty()){
                            this.uploadFileUtil.updateFileBanVeQH(banVeQuyHoachVO, banVeQuyHoachVO.getFile(), true);
                        }
                    }
                }
            }
            List<TaiLieuQuyHoachVO> listTaiLieu;
            listTaiLieu = hoSoQuyHoachVO.getTaiLieuQuyHoachVOS();
            if (listTaiLieu != null && listTaiLieu.size() > 0){
                for (TaiLieuQuyHoachVO taiLieuQuyHoachVO: listTaiLieu){
                    taiLieuQuyHoachVO.setIdHoSo_QH(hoSoQuyHoachVO.getIdHoSo_QH());
                    if (hoSoQuyHoachVO.getDieuChinh().equals("0")) {
                        if (taiLieuQuyHoachVO.getIdTaiLieu_QH() == 0){
                            this.khoiTaoHoSoQuyHoachImpl.insertTaiLieuQuyHoach(taiLieuQuyHoachVO);
                        }
                        else {
                            this.khoiTaoHoSoQuyHoachImpl.updateTaiLieuQuyHoach(taiLieuQuyHoachVO);
                        }
                        if (taiLieuQuyHoachVO.getFile() != null && !taiLieuQuyHoachVO.getFile().isEmpty()) {
                            this.uploadFileUtil.updateTaiLieuQH(taiLieuQuyHoachVO, taiLieuQuyHoachVO.getFile(), true);
                        }
                    }
                    else {
                        this.khoiTaoHoSoQuyHoachImpl.insertTaiLieuQuyHoach(taiLieuQuyHoachVO);
                        if ((taiLieuQuyHoachVO.getFile() == null || taiLieuQuyHoachVO.getFile().isEmpty()) && taiLieuQuyHoachVO.getId() != 0){
                            TaiLieuQuyHoachVO file;
                            try{
                                file = this.khoiTaoHoSoQuyHoachImpl.selectFileTaiLieu(taiLieuQuyHoachVO.getId());
                                file.setIdTaiLieu_QH(taiLieuQuyHoachVO.getIdTaiLieu_QH());
                                this.fileUploadServiceImpl.updateFileTaiLieuQuyHoach(file);
                            }catch (Exception e){
                                e.printStackTrace();
                            }
                        }
                        if (taiLieuQuyHoachVO.getFile() != null && !taiLieuQuyHoachVO.getFile().isEmpty()){
                            this.uploadFileUtil.updateTaiLieuQH(taiLieuQuyHoachVO, taiLieuQuyHoachVO.getFile(), true);
                        }
                    }
                }
            }
            transactionManager.commit(status);
            int position;
            try {
                position = this.khoiTaoHoSoQuyHoachImpl.getPosition(hoSoQuyHoachVO.getIdHoSo_QH());
            } catch (Exception e) {
                position = 0;
                e.printStackTrace();
            }
            rm.addFlashAttribute("startAt", ((position - 1) / 10 * 10));
            rm.addFlashAttribute("idHoSo_QH", hoSoQuyHoachVO.getIdHoSo_QH());
            rm.addFlashAttribute("message",1);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            rm.addFlashAttribute("message",3);
        }
        return "redirect:/worklife/user/quanlyquyhoach/kthsqh.do";
    }
    @RequestMapping(value = "/worklife/user/quanlyquyhoach/kthsquyhoach/getinfodata.do", method = RequestMethod.POST)
    public @ResponseBody HoSoQuyHoachVO getInfo(HttpServletRequest request){
        int idHoSo_QH = Integer.parseInt(request.getParameter("idHoSo_QH"));
        HoSoQuyHoachVO hoSoQuyHoachVO = new HoSoQuyHoachVO();
        try{
            hoSoQuyHoachVO = this.khoiTaoHoSoQuyHoachImpl.selectDataHSQHByIdHoSoQH(idHoSo_QH);
            hoSoQuyHoachVO.setBanVeQuyHoachVOS(this.khoiTaoHoSoQuyHoachImpl.selectListBanVeQuyHoach(hoSoQuyHoachVO.getIdHoSo_QH()));
            hoSoQuyHoachVO.setTaiLieuQuyHoachVOS(this.khoiTaoHoSoQuyHoachImpl.selectListTaiLieuQuyHoach(hoSoQuyHoachVO.getIdHoSo_QH()));
        }catch (Exception e){
            e.printStackTrace();
        }
        return hoSoQuyHoachVO;
    }
    @RequestMapping(value = "/worklife/user/file/json/downloadfilebanve.do")
    public void downloadFileBanVe(@RequestParam("idBanVe_QH") int idBanVe_QH, HttpServletRequest request, HttpServletResponse response){
        try{
            BanVeQuyHoachVO file = this.khoiTaoHoSoQuyHoachImpl.selectFileBanVe(idBanVe_QH);
            String mimetype = "application/x-msdownload";
            response.setContentType(mimetype);
            String user_agent = request.getHeader("user-agent");
            boolean isInternetExplorer = (user_agent.indexOf("MSIE") > -1);
            if (isInternetExplorer) {
                response.setHeader("Content-disposition", "attachment; filename=\"" + URLEncoder.encode(file.getTen().trim(), "utf-8") + "\"");
            } else {
                response.addHeader("Content-disposition","attachment; filename=\"" + MimeUtility.encodeWord(file.getTen().trim(),"UTF-8","B")  + "\"");
            }
            response.setContentLength(file.getDoDai());
            ServletOutputStream out = response.getOutputStream();
            logger.info("Before decompress : "+file.getNoiDung().length);
            byte[] decompress = UploadFileUtil.decompress(file.getNoiDung(),file.getDoDai());
            logger.info("After decompress : "+decompress.length);
            out.write(decompress);
            out.flush();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    @RequestMapping(value = "/worklife/user/file/json/downloadfiletailieu.do")
    public void downloadFileTaiLieu(@RequestParam("idTaiLieu_QH") int idTaiLieu_QH, HttpServletRequest request, HttpServletResponse response){
        try{
            TaiLieuQuyHoachVO file = this.khoiTaoHoSoQuyHoachImpl.selectFileTaiLieu(idTaiLieu_QH);
            String mimetype = "application/x-msdownload";
            response.setContentType(mimetype);
            String user_agent = request.getHeader("user-agent");
            boolean isInternetExplorer = (user_agent.indexOf("MSIE") > -1);
            if (isInternetExplorer) {
                response.setHeader("Content-disposition", "attachment; filename=\"" + URLEncoder.encode(file.getTen().trim(), "utf-8") + "\"");
            } else {
                response.addHeader("Content-disposition","attachment; filename=\"" + MimeUtility.encodeWord(file.getTen().trim(),"UTF-8","B")  + "\"");
            }
            response.setContentLength(file.getDoDai());
            ServletOutputStream out = response.getOutputStream();
            logger.info("Before decompress : "+file.getNoiDung().length);
            byte[] decompress = UploadFileUtil.decompress(file.getNoiDung(),file.getDoDai());
            logger.info("After decompress : "+decompress.length);
            out.write(decompress);
            out.flush();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
    @RequestMapping(value = "/worklife/user/quanlyquhoach/kthsquyhoach/deletebanveqh.do", method = RequestMethod.POST)
    public @ResponseBody boolean deletebanve(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idBanVe_QH = 0;
                try {
                    idBanVe_QH = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idBanVe_QH = 0;
                    e.printStackTrace();
                }
                this.khoiTaoHoSoQuyHoachImpl.deleteBanVeQH(idBanVe_QH);
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
    @RequestMapping(value = "/worklife/user/quanlyquhoach/kthsquyhoach/deletetailieuqh.do", method = RequestMethod.POST)
    public @ResponseBody boolean deletetailieu(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idTaiLieu_QH = 0;
                try {
                    idTaiLieu_QH = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idTaiLieu_QH = 0;
                    e.printStackTrace();
                }
                this.khoiTaoHoSoQuyHoachImpl.deleteTaiLieuQH(idTaiLieu_QH);
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
