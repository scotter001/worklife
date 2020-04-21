package vn.worklife.qlctgt.user.xulycpctthietyeu.web;

import org.apache.log4j.Logger;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.qlctgt.user.danhsachhoso.model.HoSoVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.CongTrinhVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.GiayPhepChapThuanVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.TaiLieuCongTrinhVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.sevice.impl.XLCPCTDauNoiDuongImpl;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.DmDonGiaCPVO;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.CongTrinhChiTietVO;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.DmLoaiCongTrinhVO;
import vn.worklife.qlctgt.user.xulycpctthietyeu.service.impl.XLCPCTThietYeuImpl;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.util.DateUtils;
import vn.worklife.user.util.ReportUtils;
import vn.worklife.user.util.UploadFileUtil;

import javax.annotation.Resource;
import javax.mail.internet.MimeUtility;
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
public class XLCPCTThietYeuController {
    private Logger logger = Logger.getLogger(this.getClass());
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    XLCPCTThietYeuImpl xlcpctThietYeuImpl;

    @Autowired
    XLCPCTDauNoiDuongImpl xlcpctDauNoiDuongImpl;

    @Autowired
    private UploadFileUtil uploadFileUtil;

    @RequestMapping(value = "/worklife/qlctgt/user/danhsachhs/xulyhoso/hosocpctthietyeu.do")
    public String index(Model model, @RequestParam("idHoSo") int idHoSo){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        HoSoVO hoSoVO = new HoSoVO();
        CongTrinhVO congTrinhVO = new CongTrinhVO();
        List<DmLoaiCongTrinhVO> listData = new ArrayList<>();
        List<CongTrinhChiTietVO> listDataCT = new ArrayList<>();
        GiayPhepChapThuanVO giayPhepChapThuanVO = new GiayPhepChapThuanVO();
        try {
            hoSoVO = this.xlcpctDauNoiDuongImpl.selectDataHoSo(idHoSo);
            congTrinhVO = this.xlcpctDauNoiDuongImpl.selectDataCongTrinh(idHoSo);
            giayPhepChapThuanVO = this.xlcpctDauNoiDuongImpl.selectThoiHan(idHoSo);
            listData = this.xlcpctThietYeuImpl.selectLoaiHinh();
            listDataCT = this.xlcpctThietYeuImpl.selectListChiTietCT(congTrinhVO.getIdCongTrinh());
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
            model.addAttribute("idHuyen", listDataCT.size() == 0?-1:listDataCT.get(0).getIdHuyen());
            model.addAttribute("idXa", listDataCT.size() == 0?-1:listDataCT.get(0).getIdXa());
            model.addAttribute("idLoaiCongTrinh", congTrinhVO == null?-1:congTrinhVO.getIdLoaiCongTrinh());
            model.addAttribute("hoSoVO", hoSoVO);
            model.addAttribute("congTrinhVO", congTrinhVO);
            model.addAttribute("giayPhepChapThuanVO", giayPhepChapThuanVO);
            model.addAttribute("listData", listData);
            return "worklife/qlctgt/user/XuLyHoSo/HSCPCTThietYeu/hscpctthietyeu";
        }
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/getloaihinh.do", method = RequestMethod.POST)
    public @ResponseBody
    List<DmLoaiCongTrinhVO> getListLoaiCT(){
        List<DmLoaiCongTrinhVO> listData = new ArrayList<>();
        try {
            listData = this.xlcpctThietYeuImpl.selectLoaiHinh();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/saveFormTTCT.do", method = {RequestMethod.POST,RequestMethod.GET})
    public String saveFormCTTY(@ModelAttribute("congTrinhVO") CongTrinhVO congTrinhVO, BindingResult bindingResult, RedirectAttributes rm){
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

            if (congTrinhVO.getIdLoaiHoSo() == 6) {
                if (congTrinhVO.getIdgp() == -1 || congTrinhVO.getIdgp() == 0) {
                    this.xlcpctDauNoiDuongImpl.insertGiayPhep(congTrinhVO);
                    this.xlcpctDauNoiDuongImpl.updateIdParentGP(congTrinhVO.getIdgp());
                } else {
                    this.xlcpctDauNoiDuongImpl.updateGiayPhep(congTrinhVO);
                }
            }
            if (congTrinhVO.getNhieuDuong().equals("1")){
                this.xlcpctThietYeuImpl.deleteCongTrinhChiTiet(congTrinhVO.getIdCongTrinh());
                for (CongTrinhChiTietVO congTrinhChiTietVO: congTrinhVO.getCongTrinhChiTietVOS()){
                    congTrinhChiTietVO.setIdCongTrinh(congTrinhVO.getIdCongTrinh());
                    this.xlcpctThietYeuImpl.insertCongTrinhChiTiet(congTrinhChiTietVO);
                }
            }
            else {
                this.xlcpctThietYeuImpl.deleteCongTrinhChiTiet(congTrinhVO.getIdCongTrinh());
                CongTrinhChiTietVO congTrinhChiTietVO = congTrinhVO.getCongTrinhChiTietVO();
                congTrinhChiTietVO.setIdCongTrinh(congTrinhVO.getIdCongTrinh());
                this.xlcpctThietYeuImpl.insertCongTrinhChiTiet(congTrinhChiTietVO);
            }
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
            rm.addFlashAttribute("message", 1);
            transactionManager.commit(status);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            rm.addFlashAttribute("message", 3);
        }
        return "redirect:/worklife/qlctgt/user/danhsachhs/xulyhoso/hosocpctthietyeu.do?idHoSo=" + congTrinhVO.getIdHoSo();
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/loadtuyenduong.do", method = RequestMethod.POST)
    public @ResponseBody List<CongTrinhChiTietVO> getListCTCT(@RequestParam("idCongTrinh") int idCongTrinh){
        List<CongTrinhChiTietVO> listData = new ArrayList<>();
        try {
            listData = this.xlcpctThietYeuImpl.selectListChiTietCT(idCongTrinh);
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/deleteTD.do", method = RequestMethod.POST)
    public @ResponseBody boolean deleteTD(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idctct = 0;
                try {
                    idctct = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idctct = 0;
                    e.printStackTrace();
                }
                this.xlcpctThietYeuImpl.deleteChiTietTD(idctct);
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
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/reportexport.do")
    public @ResponseBody void reportExport(HttpServletResponse response, HttpServletRequest request, @RequestParam("idCongTrinh") int idCongTrinh, @RequestParam("idLoaiHoSo") int idLoaiHoSo) throws Exception{
        /*
         ************* BEGIN: ADD TO WORD REPORT
         * **********************************************
         */
        FileInputStream fileInputStream;
        FileOutputStream fileOutputStream;
        String fileNameMain = "VanBanCapPhepCTThietYeu" + ".docx";
        String fileNameServer = "/worklife/reports/VanBanCapPhepCTThietYeu.docx";
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
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/reportgiayphep.do")
    public @ResponseBody void reportGiayPhep(HttpServletResponse response, HttpServletRequest request, @RequestParam("idCongTrinh") int idCongTrinh) throws Exception{
        GiayPhepChapThuanVO giayPhepChapThuanVO = new GiayPhepChapThuanVO();
        /*
         ************* BEGIN: ADD TO WORD REPORT
         * **********************************************
         */
        FileInputStream fileInputStream;
        FileOutputStream fileOutputStream;
        String fileNameMain = "GiayPhepCapPhepCTThietYeu" + ".docx";
        String fileNameServer = "/worklife/reports/GiayPhepCapPhepCTThietYeu.docx";
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
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/deleteCT.do", method = RequestMethod.POST)
    public @ResponseBody boolean deleteCT(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int id = 0;
                try {
                    id = Integer.parseInt(str_1);
                } catch (Exception e) {
                    id = 0;
                    e.printStackTrace();
                }
                this.xlcpctThietYeuImpl.deleteCongThuc(id);
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
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/dongia.do", method = RequestMethod.POST)
    public @ResponseBody
    DmDonGiaCPVO getDonGia(@RequestParam("idLoaiHoSo") int idLoaiHoSo){
        DmDonGiaCPVO dmDonGiaCPVO = new DmDonGiaCPVO();
        try {
            dmDonGiaCPVO = this.xlcpctThietYeuImpl.selectDonGia(idLoaiHoSo, 1);
        }catch (Exception e){
            e.printStackTrace();
        }
        return dmDonGiaCPVO;
    }
    @RequestMapping(value = "/worklife/qlctgt/user/xulyhoso/cpctthietyeu/getthongbao.do", method = RequestMethod.POST)
    public @ResponseBody CongTrinhVO getThongBao(Model model,@RequestParam("idHoSo") int idHoSo, @RequestParam("idCongTrinh") int idCongTrinh, @RequestParam("idLoaiHoSo") int idLoaiHoSo){
        CongTrinhVO congTrinhVO = new CongTrinhVO();
        try {
            congTrinhVO = this.xlcpctDauNoiDuongImpl.selectThongTinCT(idCongTrinh, idLoaiHoSo);
            congTrinhVO.setGiayPhepChapThuanVO(this.xlcpctDauNoiDuongImpl.selectGiayPhep(idCongTrinh));
            congTrinhVO.setDmCanCuPhapLyVO(this.xlcpctDauNoiDuongImpl.selectCanCuPL(1,2));
            congTrinhVO.setThuPhiCongTrinhVO(this.xlcpctThietYeuImpl.selectThuPhiCongTrinh(idHoSo));
            if (congTrinhVO.getThuPhiCongTrinhVO()!= null) {
                congTrinhVO.getThuPhiCongTrinhVO().setThuPhiCongThucVOS(this.xlcpctThietYeuImpl.selectListCongThuc(congTrinhVO.getThuPhiCongTrinhVO().getIdPhi()));
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return congTrinhVO;
    }
}
