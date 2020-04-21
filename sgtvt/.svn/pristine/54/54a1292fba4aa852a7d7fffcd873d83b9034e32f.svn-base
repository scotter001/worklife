package vn.worklife.qlctgt.user.xulycpctdaunoiduong.web;

import org.apache.log4j.Logger;
import org.apache.poi.xwpf.usermodel.*;
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
import vn.worklife.qlctgt.user.danhsachhoso.model.HoSoVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.*;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.sevice.impl.XLCPCTDauNoiDuongImpl;
import vn.worklife.qlctgt.user.xulycpctthietyeu.service.impl.XLCPCTThietYeuImpl;
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
public class XLCPCTDauNoiDuongController {
    private Logger logger = Logger.getLogger(this.getClass());
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    XLCPCTDauNoiDuongImpl xlcpctDauNoiDuongImpl;

    @Autowired
    private UploadFileUtil uploadFileUtil;

    @Autowired
    XLCPCTThietYeuImpl xlcpctThietYeuImpl;

    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhs/xulyhoso/hosocpctdnd.do")
    public String index(Model model, @RequestParam("idHoSo") int idHoSo){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        CongTrinhVO congTrinhVO = new CongTrinhVO();
        HoSoVO hoSoVO = new HoSoVO();
        GiayPhepChapThuanVO giayPhepChapThuanVO = new GiayPhepChapThuanVO();
        try{
            hoSoVO = this.xlcpctDauNoiDuongImpl.selectDataHoSo(idHoSo);
            congTrinhVO = this.xlcpctDauNoiDuongImpl.selectDataCongTrinh(idHoSo);
            giayPhepChapThuanVO = this.xlcpctDauNoiDuongImpl.selectThoiHan(idHoSo);
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
            model.addAttribute("idXa", congTrinhVO == null?-1:congTrinhVO.getIdXa());
            model.addAttribute("hoSoVO", hoSoVO);
            model.addAttribute("congTrinhVO", congTrinhVO);
            model.addAttribute("giayPhepChapThuanVO", giayPhepChapThuanVO);
            return "worklife/qlctgt/user/XuLyHoSo/HSCPCTDauNoiDuong/hscpctdaunoiduong";
        }
    }
    @RequestMapping(value = "/worklife/qlctgt/user/doccumentfile/file/json/delete.do", method = RequestMethod.POST)
    public @ResponseBody boolean updateTaiLieuCT(@RequestParam("idTL") int idTL){
        try {
            if (idTL != 0)
                this.xlcpctDauNoiDuongImpl.updateTaiLieuCT(idTL);
        }catch (Exception e){
            e.printStackTrace();
        }
        return true;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/saveForm.do", method = RequestMethod.POST)
    public String saveFormCT(@ModelAttribute("congTrinhVO") CongTrinhVO congTrinhVO, RedirectAttributes rm){
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

            if (congTrinhVO.getIdLoaiHoSo() == 4) {
                if (congTrinhVO.getIdgp() == -1 || congTrinhVO.getIdgp() == 0) {
                    this.xlcpctDauNoiDuongImpl.insertGiayPhep(congTrinhVO);
                    this.xlcpctDauNoiDuongImpl.updateIdParentGP(congTrinhVO.getIdgp());
                } else {
                    this.xlcpctDauNoiDuongImpl.updateGiayPhep(congTrinhVO);
                }
            }
            if (congTrinhVO.getIdct_Huyen() == -1 || congTrinhVO.getIdct_Huyen() == 0)
                this.xlcpctDauNoiDuongImpl.insertDiaChiHuyen(congTrinhVO);
            else
                this.xlcpctDauNoiDuongImpl.updateDiaChiHuyen(congTrinhVO);
            this.xlcpctDauNoiDuongImpl.updateHoSo(congTrinhVO);
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
        return "redirect:/worklife/qlctgt/user/danhsachhs/xulyhoso/hosocpctdnd.do?idHoSo=" + congTrinhVO.getIdHoSo();
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/loadtailieu.do", method = RequestMethod.POST)
    public @ResponseBody List<TaiLieuCongTrinhVO> getListHoSo(@RequestParam("idCongTrinh") int idCongTrinh){
        List<TaiLieuCongTrinhVO> listData = new ArrayList<>();
        try {
            listData = this.xlcpctDauNoiDuongImpl.selectListTaiLieu(idCongTrinh);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/deleteTLCT.do", method = RequestMethod.POST)
    public @ResponseBody boolean deleteTaiLieu(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idTL = 0;
                try {
                    idTL = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idTL = 0;
                    e.printStackTrace();
                }
                this.xlcpctDauNoiDuongImpl.deleteTaiLieuCT(idTL);
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
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/getvanbanchapthuan.do", method = RequestMethod.POST)
    public @ResponseBody
    CongTrinhVO getVanBan(@RequestParam("idCongTrinh") int idCongTrinh, @RequestParam("idLoaiHoSo") int idLoaiHoSo){
        CongTrinhVO congTrinhVO = new CongTrinhVO();
        try {
            congTrinhVO = this.xlcpctDauNoiDuongImpl.selectThongTinCT(idCongTrinh, idLoaiHoSo);
            congTrinhVO.setCongTrinhChiTietVOS(this.xlcpctThietYeuImpl.selectListChiTietCT(idCongTrinh));
            congTrinhVO.setVanBanChapThuanVO(this.xlcpctDauNoiDuongImpl.selectVanBanChapThuan(idCongTrinh));
        }catch (Exception e){
            e.printStackTrace();
        }
        return congTrinhVO;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/getgiayphep.do", method = RequestMethod.POST)
    public @ResponseBody CongTrinhVO getGiayPhep(Model model, @RequestParam("idHoSo") int idHoSo, @RequestParam("idCongTrinh") int idCongTrinh, @RequestParam("idLoaiHoSo") int idLoaiHoSo){
        CongTrinhVO congTrinhVO = new CongTrinhVO();
        try {
            congTrinhVO = this.xlcpctDauNoiDuongImpl.selectThongTinCT(idCongTrinh, idLoaiHoSo);
            congTrinhVO.setVanBanChapThuanVO(this.xlcpctDauNoiDuongImpl.selectVanBanChapThuan(idCongTrinh));
            congTrinhVO.setGiayPhepChapThuanVO(this.xlcpctDauNoiDuongImpl.selectGiayPhep(idCongTrinh));
            congTrinhVO.setDmCanCuPhapLyVO(this.xlcpctDauNoiDuongImpl.selectCanCuPL(1,1));
            congTrinhVO.setCongTrinhChiTietVOS(this.xlcpctThietYeuImpl.selectListChiTietCT(idCongTrinh));
            model.addAttribute("idgp", congTrinhVO.getIdgp());
        }catch (Exception e){
            e.printStackTrace();
        }
        return congTrinhVO;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/getnguoiky.do", method = RequestMethod.POST)
    public @ResponseBody List<ThietLapNguoiKyVO> getListNK(){
        List<ThietLapNguoiKyVO> listData = new ArrayList<>();
        try {
            listData = this.xlcpctDauNoiDuongImpl.selectListNguoiKy(2, 1);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/getnguoikygp.do", method = RequestMethod.POST)
    public @ResponseBody List<ThietLapNguoiKyVO> getListNKGP(){
        List<ThietLapNguoiKyVO> listData = new ArrayList<>();
        try {
            listData = this.xlcpctDauNoiDuongImpl.selectListNguoiKy(1, 1);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/saveFormVBCT.do", method = RequestMethod.POST)
    public @ResponseBody VanBanChapThuanVO saveFormVBCT(@ModelAttribute("vanBanChapThuanVO") VanBanChapThuanVO vanBanChapThuanVO){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            if (vanBanChapThuanVO.getIdVB() == -1)
                this.xlcpctDauNoiDuongImpl.insertVanBanChapThuan(vanBanChapThuanVO);
            else
                this.xlcpctDauNoiDuongImpl.updateVanBanChapThuan(vanBanChapThuanVO);
            transactionManager.commit(status);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
        }
        return vanBanChapThuanVO;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/reportexport.do")
    public @ResponseBody void reportExport(HttpServletResponse response, HttpServletRequest request, @RequestParam("idCongTrinh") int idCongTrinh, @RequestParam("idLoaiHoSo") int idLoaiHoSo) throws Exception{
        /*
         ************* BEGIN: ADD TO WORD REPORT
         * **********************************************
         */
        FileInputStream fileInputStream;
        FileOutputStream fileOutputStream;
        String fileNameMain = "VanBanCapPhepDauNoiDuong" + ".docx";
        String fileNameServer = "/worklife/reports/VanBanCapPhepDauNoiDuong.docx";
        URL url = getClass().getResource(fileNameServer);
        File fileServer = new File(url.toURI());
        fileInputStream = new FileInputStream(fileServer);
        XWPFDocument doc = new XWPFDocument(fileInputStream);
        try {
            CongTrinhVO congTrinhVO = new CongTrinhVO();
            try {
                congTrinhVO = this.xlcpctDauNoiDuongImpl.selectThongTinCT(idCongTrinh, idLoaiHoSo);
                congTrinhVO.setVanBanChapThuanVO(this.xlcpctDauNoiDuongImpl.selectVanBanChapThuan(idCongTrinh));
            }catch (Exception e){
                e.printStackTrace();
            }
            List<XWPFParagraph> remPars = new ArrayList<>();
            boolean prevP = false;
            for (XWPFTable tbl : doc.getTables()) {
                for (XWPFTableRow row : tbl.getRows()) {
                    for (XWPFTableCell cell : row.getTableCells()) {
                        for (XWPFParagraph p : cell.getParagraphs()) {
                            for (XWPFRun r : p.getRuns()) {
                                String text = r.getText(0);
                                if (text != null) {
                                    if (text.contains("(1)")){
                                        if (congTrinhVO.getVanBanChapThuanVO().getVb_So() == null || congTrinhVO.getVanBanChapThuanVO().getVb_So().equals("")){
                                            text = text.replace("(1)", "         / SGTVT-QLCL&ATGT");
                                        }
                                        else {
                                            text = text.replace("(1)", congTrinhVO.getVanBanChapThuanVO().getVb_So());
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(2)")){
                                        if (congTrinhVO.getVanBanChapThuanVO().getVb_Ngay() == null || congTrinhVO.getVanBanChapThuanVO().getVb_Ngay().equals("")){
                                            text = text.replace("(2)", "      ");
                                        }
                                        else {
                                            text = text.replace("(2)", congTrinhVO.getVanBanChapThuanVO().getVb_Ngay().split("/")[0]);
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(3)")){
                                        if (congTrinhVO.getVanBanChapThuanVO().getVb_Ngay() == null || congTrinhVO.getVanBanChapThuanVO().getVb_Ngay().equals("")){
                                            text = text.replace("(3)", "      ");
                                        }
                                        else {
                                            text = text.replace("(3)", congTrinhVO.getVanBanChapThuanVO().getVb_Ngay().split("/")[1]);
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(4)")){
                                        if (congTrinhVO.getVanBanChapThuanVO().getVb_Ngay() == null || congTrinhVO.getVanBanChapThuanVO().getVb_Ngay().equals("")){
                                            text = text.replace("(4)", "" + DateUtils.getCurrentYear());
                                        }
                                        else {
                                            text = text.replace("(4)", congTrinhVO.getVanBanChapThuanVO().getVb_Ngay().split("/")[2]);
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(5)")){
                                        if (congTrinhVO.getVanBanChapThuanVO().getVeViec() == null || congTrinhVO.getVanBanChapThuanVO().getVeViec().equals("")){
                                            text = text.replace("(5)", "");
                                        }
                                        else {
                                            text = text.replace("(5)", congTrinhVO.getVanBanChapThuanVO().getVeViec());
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(9)")){
                                        if (congTrinhVO.getVanBanChapThuanVO().getNoiNhan() == null || congTrinhVO.getVanBanChapThuanVO().getNoiNhan().equals("")){
                                            text = text.replace("(9)", "");
                                        }
                                        else {
                                            text = text.replace("(9)", congTrinhVO.getVanBanChapThuanVO().getNoiNhan());
                                        }
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
                                        /*r.setText(text, 0);*/
                                    }
                                    if (text.contains("(10)")){
                                        if (congTrinhVO.getVanBanChapThuanVO().getUyQuyen() == null || congTrinhVO.getVanBanChapThuanVO().getUyQuyen().equals("")){
                                            text = text.replace("(10)", congTrinhVO.getVanBanChapThuanVO().getChucVu() == null?"":congTrinhVO.getVanBanChapThuanVO().getChucVu());
                                            prevP = true;
                                        }
                                        else {
                                            text = text.replace("(10)", congTrinhVO.getVanBanChapThuanVO().getUyQuyen());
                                        }
                                        r.setText(text, 0);
                                    }
                                    if (text.contains("(11)")){
                                        if(prevP){
                                            text = text.replace("(11)", "");
                                            remPars.add(p);
                                            prevP = false;
                                        }else {
                                            if (congTrinhVO.getVanBanChapThuanVO().getChucVu() == null || congTrinhVO.getVanBanChapThuanVO().getChucVu().equals("")) {
                                                text = text.replace("(11)", "");
                                            } else {
                                                text = text.replace("(11)", congTrinhVO.getVanBanChapThuanVO().getChucVu());
                                            }
                                            r.setText(text, 0);
                                        }
                                    }
                                    if (text.contains("(12)")){
                                        if (congTrinhVO.getVanBanChapThuanVO().getNguoiKy() == null || congTrinhVO.getVanBanChapThuanVO().getNguoiKy().equals("")){
                                            text = text.replace("(12)", "");
                                        }
                                        else {
                                            text = text.replace("(12)", congTrinhVO.getVanBanChapThuanVO().getNguoiKy());
                                        }
                                        r.setText(text, 0);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            boolean remRes;
            for(XWPFParagraph paragraph:remPars){
                for(int i= paragraph.getRuns().size()-1;i>=0;i--)
                    paragraph.removeRun(i);
                remRes = doc.removeBodyElement(doc.getPosOfParagraph(paragraph));
            }
            int pNumber = doc.getParagraphs().size() - 1;
            while (pNumber >= 0) {
                XWPFParagraph p = doc.getParagraphs().get(pNumber);
                if (p.getParagraphText().contains("(6)")){
                    ReportUtils.toMultiline(p, "Kính gửi: " + congTrinhVO.getTenDoanhNghiep());
                }
                else if (p.getParagraphText().contains("(7)")){
                    ReportUtils.toMultiline(p, congTrinhVO.getVanBanChapThuanVO().getNoiDung().replaceAll("\t",""));
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
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/saveFormGP.do", method = RequestMethod.POST)
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
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/reportgiayphep.do")
    public @ResponseBody void reportGiayPhep(HttpServletResponse response, HttpServletRequest request, @RequestParam("idCongTrinh") int idCongTrinh) throws Exception{
        GiayPhepChapThuanVO giayPhepChapThuanVO = new GiayPhepChapThuanVO();
        /*
         ************* BEGIN: ADD TO WORD REPORT
         * **********************************************
         */
        FileInputStream fileInputStream;
        FileOutputStream fileOutputStream;
        String fileNameMain = "GiayPhepCapPhepDauNoiDuong" + ".docx";
        String fileNameServer = "/worklife/reports/GiayPhepCapPhepDauNoiDuong.docx";
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
    @RequestMapping(value = "/worklife/qlctgt/user/file/json/downloadfiletailieu.do")
    public void downloadFileTaiLieu(@RequestParam("idTL") int idTL, HttpServletRequest request, HttpServletResponse response){
        try{
            TaiLieuCongTrinhVO file = this.xlcpctDauNoiDuongImpl.selectFileTaiLieuCT(idTL);
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
}
