package vn.worklife.qlctgt.user.capphepcaitaoviahe.web;

import org.apache.poi.xwpf.usermodel.*;
import org.apache.log4j.Logger;
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
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.CongTrinhVOF;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.DmLoaiCTVO;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.GiayPhepVO;
import vn.worklife.qlctgt.user.danhsachhoso.model.HoSoVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.*;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.sevice.impl.XLCPCTDauNoiDuongImpl;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.service.Impl.CapPhepCaiTaoViaHeImpl;
import vn.worklife.qlctgt.user.xulycpctdaunoihttnuocthai.service.Impl.XLCPCTDauNoiDuongHTTNuocThaiImpl;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.util.DateUtils;
import vn.worklife.user.util.ReportUtils;
import vn.worklife.user.util.UploadFileUtil;

import javax.annotation.Resource;
import javax.mail.internet.MimeUtility;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Controller
public class CapPhepCaiTaoViaHeController {
    private Logger logger = Logger.getLogger(this.getClass());

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    XLCPCTDauNoiDuongImpl xlcpctDauNoiDuongImpl;

    @Autowired
    CapPhepCaiTaoViaHeImpl capPhepCaiTaoViaHeImpl;

    @Autowired
    XLCPCTDauNoiDuongHTTNuocThaiImpl xLCPCTDauNoiDuongHTTNuocThaiImpl;

    @Autowired
    private UploadFileUtil uploadFileUtil;

    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhs/xulyhoso/cpcaitaoviahe.do")
    public String index(Model model, @RequestParam("idHoSo") int idHoSo){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        CongTrinhVO congTrinhVO = new CongTrinhVO();
        CongTrinhVO congTrinhVO1 = new CongTrinhVO();
        CongTrinhVO congTrinhVO2 = new CongTrinhVO();
        HoSoVO hoSoVO = new HoSoVO();
        try{
            congTrinhVO1 = this.xlcpctDauNoiDuongImpl.selectDmLoaiCT(idHoSo);
            congTrinhVO2 = this.xlcpctDauNoiDuongImpl.selectNhieuHuyen(idHoSo);
            hoSoVO = this.xlcpctDauNoiDuongImpl.selectDataHoSo(idHoSo);
            congTrinhVO = this.xlcpctDauNoiDuongImpl.selectDataCongTrinh(idHoSo);
        }catch (Exception e){
            e.printStackTrace();
        }
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("idHoSo", idHoSo);
            model.addAttribute("idLoaiHoSo", hoSoVO.getIdLoaiHoSo());
            model.addAttribute("user_Nhan", worklifeUserVO.getUserId());
            model.addAttribute("idCongTrinh", congTrinhVO == null?-1:congTrinhVO.getIdCongTrinh());
            model.addAttribute("idDoanhNghiep", congTrinhVO == null?-1:congTrinhVO.getIdDoanhNghiep());
            model.addAttribute("idgp", congTrinhVO == null?-1:congTrinhVO.getIdgp());
            model.addAttribute("idct_Huyen", congTrinhVO == null?-1:congTrinhVO.getIdct_Huyen());
            model.addAttribute("idHuyen", congTrinhVO == null?-1:congTrinhVO.getIdHuyen());
            model.addAttribute("hoSoVO", hoSoVO);
            model.addAttribute("congTrinhVO", congTrinhVO);
            model.addAttribute("congTrinhVO1", congTrinhVO1);
            model.addAttribute("congTrinhVO2", congTrinhVO2);
            return "worklife/qlctgt/user/XuLyHoSo/HSCPCaiTaoViaHe/hscpcaitaoviahe";
        }
    }

    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/hscpcaitaoviahe/saveForm.do", method = RequestMethod.POST)
    public String saveFormCT(@ModelAttribute("congTrinhVO") CongTrinhVO congTrinhVO, RedirectAttributes rm,@RequestParam(value = "nhieuHuyen",required = false) String[] idHuyenList){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            if (congTrinhVO.getIdCongTrinh() == -1) {
                this.xlcpctDauNoiDuongImpl.insertCongTrinh(congTrinhVO);
                this.xlcpctDauNoiDuongImpl.updateIdParentCT(congTrinhVO.getIdCongTrinh());
            }
            else {
                this.xlcpctDauNoiDuongImpl.updateCongTrinh(congTrinhVO);
            }

            if (congTrinhVO.getIdDoanhNghiep() == -1)
                this.xlcpctDauNoiDuongImpl.insertDoanhNghiep(congTrinhVO);
            else
                this.xlcpctDauNoiDuongImpl.updateDoanhNghiep(congTrinhVO);

            if (congTrinhVO.getIdgp() == -1||congTrinhVO.getIdgp() ==0) {
                this.xlcpctDauNoiDuongImpl.insertGiayPhep(congTrinhVO);
                this.xlcpctDauNoiDuongImpl.updateIdParentGP(congTrinhVO.getIdgp());
            }
            else {
                this.xlcpctDauNoiDuongImpl.updateGiayPhep(congTrinhVO);
            }
            this.xlcpctDauNoiDuongImpl.updateHoSo(congTrinhVO);
            if (idHuyenList != null){
                this.xlcpctDauNoiDuongImpl.deleteDiaChiCTHuyen(congTrinhVO.getIdCongTrinh());
                for (String idHuyen1 : idHuyenList) {
                    int idHuyen = Integer.parseInt(idHuyen1);
                    if (idHuyen != -1){
                        this.xlcpctDauNoiDuongImpl.insertDiaChiCTHuyen(congTrinhVO.getIdCongTrinh(),idHuyen);
                    }
                }
            }
            List<TaiLieuCongTrinhVO> listTaiLieu = congTrinhVO.getTaiLieuCongTrinhVOS();
            if (listTaiLieu != null && listTaiLieu.size() > 0){
                for (TaiLieuCongTrinhVO taiLieuCongTrinhVO: listTaiLieu){
                    taiLieuCongTrinhVO.setIdCongTrinh(congTrinhVO.getIdCongTrinh());
                    if (taiLieuCongTrinhVO.getIdTL() == -1)
                        this.xlcpctDauNoiDuongImpl.insertTaiLieu(taiLieuCongTrinhVO);
                    else {
                        this.xlcpctDauNoiDuongImpl.updateTaiLieu(taiLieuCongTrinhVO);
                    }
                    if (taiLieuCongTrinhVO.getFile() != null && !taiLieuCongTrinhVO.getFile().isEmpty()){
                        this.uploadFileUtil.updateTaiLieuCongTrinh(taiLieuCongTrinhVO, taiLieuCongTrinhVO.getFile(), true);
                    }
                }
            }
            transactionManager.commit(status);
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            rm.addFlashAttribute("message", 3);
        }
        return "redirect:/worklife/qlctgt/user/danhsachhs/xulyhoso/cpcaitaoviahe.do?idHoSo=" + congTrinhVO.getIdHoSo();
    }
    @RequestMapping(value = "/worklife/user/file/json/downloadfilecongtrinh.do")
    public void downloadFileCongTring(@RequestParam("idTL") int idTL, HttpServletRequest request, HttpServletResponse response){
        try{
            TaiLieuCongTrinhVO file = this.xlcpctDauNoiDuongImpl.selectListTaiLieuByid(idTL);

            String mimetype = "application/x-msdownload";
            response.setContentType(mimetype);
            String user_agent = request.getHeader("user-agent");
            boolean isInternetExplorer = (user_agent.indexOf("MSIE") > -1);
            if (isInternetExplorer) {
                response.setHeader("Content-disposition", "attachment; filename=\"" + URLEncoder.encode(file.getTenFile().trim(), "utf-8") + "\"");
            } else {
                response.addHeader("Content-disposition","attachment; filename=\"" + MimeUtility.encodeWord(file.getTenFile().trim(),"UTF-8","B")  + "\"");
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
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpcaitaoviahe/getgiayphep.do", method = RequestMethod.POST)
    public @ResponseBody CongTrinhVOF getGiayPhep(Model model, @RequestParam("idHoSo") int idHoSo, @RequestParam("idCongTrinh") int idCongTrinh, @RequestParam("idLoaiHoSo") int idLoaiHoSo){
        CongTrinhVOF congTrinhVOF = new CongTrinhVOF();
        try {
            congTrinhVOF.setCongTrinhVO(this.xlcpctDauNoiDuongImpl.selectThongTinCT(idCongTrinh, idLoaiHoSo));
            congTrinhVOF.setHoSoVO(this.xlcpctDauNoiDuongImpl.selectDataHoSo(idHoSo));
            congTrinhVOF.setGiayPhepChapThuanVO(this.xlcpctDauNoiDuongImpl.selectGiayPhep(idCongTrinh));
            congTrinhVOF.setDmCanCuPhapLyVO(this.xlcpctDauNoiDuongImpl.selectCanCuPL(1,1));
            congTrinhVOF.setDmLoaiCTVO(this.capPhepCaiTaoViaHeImpl.selectDmLoaiCT(idHoSo));
            congTrinhVOF.setNhieuHuyenVO(this.capPhepCaiTaoViaHeImpl.selectNhieuHuyen1(idHoSo));
            congTrinhVOF.setCongTrinhChiTietVO(this.xLCPCTDauNoiDuongHTTNuocThaiImpl.selectListChiTietCTNT(idCongTrinh));
            if(congTrinhVOF.getCongTrinhVO() != null){
                model.addAttribute("idgp", congTrinhVOF.getCongTrinhVO().getIdgp());
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return congTrinhVOF;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpcaitaoviahe/selectnhieuhuyen.do", method = RequestMethod.POST)
    public @ResponseBody CongTrinhVO getlisthuyen(@RequestParam("idHoSo") int idHoSo){
        CongTrinhVO listData = new CongTrinhVO();
        try {
            listData = this.xlcpctDauNoiDuongImpl.selectNhieuHuyen(idHoSo);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpcaitaoviahe/getnguoiky.do", method = RequestMethod.POST)
    public @ResponseBody List<ThietLapNguoiKyVO> getListNK(){
        List<ThietLapNguoiKyVO> listData = new ArrayList<>();
        try {
            listData = this.xlcpctDauNoiDuongImpl.selectListNguoiKy(1, 1);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpcaitaoviahe/saveFormGP.do", method = RequestMethod.POST)
    public @ResponseBody
    GiayPhepChapThuanVO saveFormGP(@ModelAttribute("giayPhepChapThuanVO") GiayPhepChapThuanVO giayPhepChapThuanVO){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            if (giayPhepChapThuanVO.getIdgp() == -1 || giayPhepChapThuanVO.getIdgp() == 0) {
                this.xlcpctDauNoiDuongImpl.insertGiayPhepChapThuan(giayPhepChapThuanVO);
                this.xlcpctDauNoiDuongImpl.updateIdParentGP(giayPhepChapThuanVO.getIdgp());
            }
            else {
                this.xlcpctDauNoiDuongImpl.updateGiayPhepChapThuan(giayPhepChapThuanVO);
            }
            transactionManager.commit(status);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
        }
        return giayPhepChapThuanVO;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpcaitaoviahe/reportgiayphep.do")
    public @ResponseBody void reportGiayPhep(HttpServletResponse response, HttpServletRequest request, @RequestParam("idCongTrinh") int idCongTrinh) throws Exception{
        GiayPhepChapThuanVO giayPhepChapThuanVO = new GiayPhepChapThuanVO();
        /*
         ************* BEGIN: ADD TO WORD REPORT
         * **********************************************
         */
        FileInputStream fileInputStream;
        FileOutputStream fileOutputStream;
            String fileNameMain = "GiayPhepCapPhepCaiTaoViaHe" + ".docx";
            String fileNameServer = "/worklife/reports/GiayPhepCapPhepCaiTaoViaHe.docx";
        URL url = getClass().getResource(fileNameServer);
        File fileServer = new File(url.toURI());
        fileInputStream = new FileInputStream(fileServer);
        XWPFDocument doc = new XWPFDocument(fileInputStream);

        try {
            try {
                giayPhepChapThuanVO = this.xlcpctDauNoiDuongImpl.selectGiayPhep(idCongTrinh);
            }catch (Exception e){
                e.printStackTrace();
            }
            for (XWPFTable tbl : doc.getTables()) {
                for (XWPFTableRow row : tbl.getRows()) {
                    for (XWPFTableCell cell : row.getTableCells()) {
                        for (XWPFParagraph p : cell.getParagraphs()) {
                            for (XWPFRun r : p.getRuns()) {
                                String text = r.getText(0);
                                if (text != null) {
                                    if (text.contains("(1)")) {
                                        if (giayPhepChapThuanVO.getGp_So() == null || giayPhepChapThuanVO.getGp_So().equals("")) {
                                            text = text.replace("(1)", "         / SGTVT-QLKCHTGT");
                                        } else {
                                            text = text.replace("(1)", giayPhepChapThuanVO.getGp_So());
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(2)")) {
                                        if (giayPhepChapThuanVO.getGp_Ngay() == null || giayPhepChapThuanVO.getGp_Ngay().equals("")) {
                                            text = text.replace("(2)", "      ");
                                        } else {
                                            text = text.replace("(2)", giayPhepChapThuanVO.getGp_Ngay().split("/")[0]);
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(3)")) {
                                        if (giayPhepChapThuanVO.getGp_Ngay() == null || giayPhepChapThuanVO.getGp_Ngay().equals("")) {
                                            text = text.replace("(3)", "      ");
                                        } else {
                                            text = text.replace("(3)", giayPhepChapThuanVO.getGp_Ngay().split("/")[1]);
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(4)")) {
                                        if (giayPhepChapThuanVO.getGp_Ngay() == null || giayPhepChapThuanVO.getGp_Ngay().equals("")) {
                                            text = text.replace("(4)", "" + DateUtils.getCurrentYear());
                                        } else {
                                            text = text.replace("(4)", giayPhepChapThuanVO.getGp_Ngay().split("/")[2]);
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(9)")) {
                                        if (giayPhepChapThuanVO.getNoiNhanGP() == null || giayPhepChapThuanVO.getNoiNhanGP().equals("")) {
                                            text = text.replace("(9)", "");
                                        } else {
                                            text = text.replace("(9)", giayPhepChapThuanVO.getNoiNhanGP());
                                            if(!text.equals("")){
                                                if (text.contains("\r\n")) {
                                                    String[] lines = text.split("\r\n");
                                                    // set first line into XWPFRun
                                                    r.setText("",0);
                                                    for(int i=0;i<lines.length;i++){
                                                        // add break and insert new text
                                                        r.setText("- "+lines[i].replace("-", "").trim());
                                                        r.addBreak();
                                                    }
                                                } else {
                                                    r.setText(text, 0);
                                                }
                                            }else{
                                                r.setText(text, 0);
                                            }
                                        }
                                        /*r.setText(text, 0);*/
                                    }
                                    if (text.contains("(10)")) {
                                        if (giayPhepChapThuanVO.getUyQuyenGP() == null || giayPhepChapThuanVO.getUyQuyenGP().equals("")) {
                                            text = text.replace("(10)", "");
                                        } else {
                                            text = text.replace("(10)", giayPhepChapThuanVO.getUyQuyenGP());
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(11)")) {
                                        if (giayPhepChapThuanVO.getChucVuGP() == null || giayPhepChapThuanVO.getChucVuGP().equals("")) {
                                            text = text.replace("(11)", "");
                                        } else {
                                            text = text.replace("(11)", giayPhepChapThuanVO.getChucVuGP());
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(12)")) {
                                        if (giayPhepChapThuanVO.getNguoiKyGP() == null || giayPhepChapThuanVO.getNguoiKyGP().equals("")) {
                                            text = text.replace("(12)", "");
                                        } else {
                                            text = text.replace("(12)", giayPhepChapThuanVO.getNguoiKyGP());
                                        }
                                        r.setText(text, 0);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            int pNumber = doc.getParagraphs().size() - 1;
            while (pNumber >= 0) {
                XWPFParagraph p = doc.getParagraphs().get(pNumber);
                if (p.getParagraphText().contains("(5)")){
                    ReportUtils.toMultiline(p, (giayPhepChapThuanVO.getTieuDe().replaceAll("\t","")).replaceAll(":", ":" + "\t"));
                }
                else if (p.getParagraphText().contains("(7)")){
                    ReportUtils.toMultiline(p, giayPhepChapThuanVO.getCanCu().replaceAll("\t",""));
                }
                else if (p.getParagraphText().contains("(8)")){
                    ReportUtils.toMultiline(p, giayPhepChapThuanVO.getNoiDungGP().replaceAll("\t",""));
                }
                pNumber--;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        String mimetype = "application/x-msdownload";
        response.setContentType(mimetype);
        String user_agent = request.getHeader("user-agent");
        boolean isInternetExplorer = (user_agent.indexOf("MSIE") > -1);
        if (isInternetExplorer) {
            response.setHeader("Content-disposition", "attachment; filename=\"" + URLEncoder.encode(fileNameMain, "utf-8") + "\"");
        } else {
            response.addHeader("Content-disposition", "attachment; filename=\"" + MimeUtility.encodeWord(fileNameMain) + "\"");
        }
        doc.write(response.getOutputStream());
        doc.close();
    }
}
