/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.web;

import org.apache.ibatis.annotations.Param;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.user.mockup.model.*;
import vn.worklife.user.mockup.service.impl.LapDmScdkServiceImpl;
import vn.worklife.user.quanlycau.model.CauVO;
import vn.worklife.user.util.ReportUtils;
import vn.worklife.user.util.UploadFileUtil;
import vn.worklife.user.util.file.service.impl.FileUploadServiceImpl;

import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.Resource;
import javax.mail.internet.MimeUtility;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;

/**
 * Handles requests for the application home page.
 */
@Controller
public class LapDmScdkController {
    private Logger logger = Logger.getLogger(this.getClass());

    @Autowired
    LapDmScdkServiceImpl lapDmScdkServiceImpl;

    @Autowired
    PlatformTransactionManager transactionManager;

    @Autowired
    private UploadFileUtil uploadFileUtil;

    @Resource(name="FileUploadServiceImpl")
    public FileUploadServiceImpl fileUploadServiceImpl;


    @RequestMapping(value = "/worklife/user/suachuadinhky/lapdmscdk.do")
    public String indexLapDmScdk() {
        return "worklife/user/SuaChuaDinhKy/LapDanhMucSuaChuaDinhKy";
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/lapdmscdk/dsdmscdks.do", method = RequestMethod.POST)
    public @ResponseBody LapDanhMucSCDKVO selectDSDanhMuc_Scdk(HttpServletRequest request) {
        int nam = Integer.parseInt(request.getParameter("nam"));
        LapDanhMucSCDKVO lapDanhMucSCDKVO = new LapDanhMucSCDKVO();
        try {
                    lapDanhMucSCDKVO.setLapDanhMucSCDKVOs(this.lapDmScdkServiceImpl.selectDSDanhMuc_Scdk(nam));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return lapDanhMucSCDKVO;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/lapdmscdk/getdsphaply.do", method = RequestMethod.POST)
    public @ResponseBody PhapLySCDKVO selectPhapLy_Scdk(HttpServletRequest request) {
        int nam = Integer.parseInt(request.getParameter("nam"));

        PhapLySCDKVO phapLySCDKVOs = new PhapLySCDKVO();
        try {
            phapLySCDKVOs.setPhapLySCDKVOs(this.lapDmScdkServiceImpl.selectDSPhapLy(nam));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return phapLySCDKVOs;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/lapdmscdk/getnguonvon.do", method = RequestMethod.POST)
    public @ResponseBody List<LapDanhMucSCDKVO> selecttnguonvon(){
        List<LapDanhMucSCDKVO> listData = new ArrayList<>();
        try{
            listData = this.lapDmScdkServiceImpl.selectlistnguonvon();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/lapdmscdk/gethangmuc.do", method = RequestMethod.POST)
    public @ResponseBody List<DmhmSCTXVO> selecthangmuc(){
        List<DmhmSCTXVO> listData = new ArrayList<>();
        try{
            listData = this.lapDmScdkServiceImpl.selectlisthangmuc();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/lapdmscdk/getlistcau.do", method = RequestMethod.POST)
    public @ResponseBody List<CauVO> seleccau(){
        List<CauVO> listData = new ArrayList<>();
        try{
            listData = this.lapDmScdkServiceImpl.selectListCau();
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/lapdmscdk/getdanhmucbyid.do", method = RequestMethod.POST)
    public @ResponseBody DmhmSCTXVO selectDanhMucById(HttpServletRequest request) {
        int idDmhmScdk = Integer.parseInt(request.getParameter("idDmhmScdk"));
        DmhmSCTXVO dmhmSCTXVO = new DmhmSCTXVO();
        try {
            dmhmSCTXVO = this.lapDmScdkServiceImpl.selectlisthangmucbyid(idDmhmScdk);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dmhmSCTXVO;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/lapdmscdk/saveForm.do", method = RequestMethod.POST)
    public String saveForm(@ModelAttribute("lapDanhMucSCDKVO") LapDanhMucSCDKVO lapDanhMucSCDKVO, /*@RequestParam(value = "listIdHuyen",required = false) String[] listIdHuyen,*/ BindingResult bindingResult, RedirectAttributes rm){
        /** TRANSACTION */
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            for(LapDanhMucSCDKVO lapDanhMucSCDKVO1: lapDanhMucSCDKVO.getLapDanhMucSCDKVOs()){
                if (lapDanhMucSCDKVO1.getIdDmScdk() == -1){
                    this.lapDmScdkServiceImpl.insertDanhMucSCDK(lapDanhMucSCDKVO1);
                }
                else {
                    this.lapDmScdkServiceImpl.updateDanhMucSCDK(lapDanhMucSCDKVO1);
                }
                if (lapDanhMucSCDKVO1.getListIdHuyen() != null){
                    this.lapDmScdkServiceImpl.deleteHuyenDmSCDK(lapDanhMucSCDKVO1.getIdDmScdk());
                    String str = new String(lapDanhMucSCDKVO1.getListIdHuyen());
                    String array1[] = str.split(",");
                    for (String idHuyen1 : array1) {
                        int idHuyen = Integer.parseInt(idHuyen1);
                        if (idHuyen != -1){
                            this.lapDmScdkServiceImpl.insertHuyenDmSCDK(lapDanhMucSCDKVO1.getIdDmScdk(), idHuyen);
                        }
                    }
                }
            }
            transactionManager.commit(status);
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            rm.addFlashAttribute("message", 3);
            transactionManager.rollback(status);
        }finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        return "redirect:/worklife/user/suachuadinhky/lapdmscdk.do";
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/lapdmscdk/saveForm2.do", method = {RequestMethod.GET,RequestMethod.POST})
    public String saveForm(@ModelAttribute("phapLySCDKVO") PhapLySCDKVO phapLySCDKVO,/* BindingResult bindingResult,*/ RedirectAttributes rm){
        /** TRANSACTION */
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            for(PhapLySCDKVO phapLySCDKVOs1: phapLySCDKVO.getPhapLySCDKVOs()){
                if (phapLySCDKVOs1.getIdPL() == -1){
                    this.lapDmScdkServiceImpl.insertPhapLySCDK(phapLySCDKVOs1);
                }
                else {
                    this.lapDmScdkServiceImpl.updatePhapLySCDK(phapLySCDKVOs1);
                }
                if (phapLySCDKVOs1.getFile() != null && !phapLySCDKVOs1.getFile().isEmpty()&&phapLySCDKVOs1.getIdPL()!=0) {
                    this.uploadFileUtil.updateFilePhapLy(phapLySCDKVOs1, phapLySCDKVOs1.getFile(), true);
                }
            }
            transactionManager.commit(status);
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            rm.addFlashAttribute("message", 3);
            transactionManager.rollback(status);
        }finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        return "redirect:/worklife/user/suachuadinhky/lapdmscdk.do";
    }
    @RequestMapping(value = "/worklife/user/file/json/downloadfilephaply.do")
    public void downloadFileBanVe(@RequestParam("idPL") int idPL, HttpServletRequest request, HttpServletResponse response){
        try{
            PhapLySCDKVO file = this.lapDmScdkServiceImpl.selectDSPhapLyById(idPL);
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
    @RequestMapping(value="/worklife/user/doccumentfile/filetailieuphaply/json/delete.do", method=RequestMethod.POST)
    public @ResponseBody boolean deletefiletailieuupload(@RequestParam("idPL") int idPL){
        try {
            if(idPL != 0){
                this.lapDmScdkServiceImpl.updateFileUploadVO(idPL);
            }
        } catch (Exception e) {
            return false;
        }
        return true;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/deletedsphaply.do", method = RequestMethod.POST)
    public @ResponseBody boolean deletephaply(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idPL = 0;
                try {
                    idPL = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idPL = 0;
                    e.printStackTrace();
                }
                this.lapDmScdkServiceImpl.deletePhapLySCDK(idPL);
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
    @RequestMapping(value = "/worklife/user/suachuadinhky/deleteDanhMucSCDK.do", method = RequestMethod.POST)
    public @ResponseBody boolean delete(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idDmhmScdk = 0;
                try {
                    idDmhmScdk = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idDmhmScdk = 0;
                    e.printStackTrace();
                }
                this.lapDmScdkServiceImpl.deleteDanhMucSCDK(idDmhmScdk);
                this.lapDmScdkServiceImpl.deleteHuyenDmSCDK(idDmhmScdk);
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
    @RequestMapping(value = "/worklife/user/suachuadinhky/reportExcelToYear.do")
    public @ResponseBody void reportExcelToYear(HttpServletRequest request, HttpServletResponse response/*,@RequestParam("nam") int nam*/){
        try {
            int nam = Integer.parseInt(request.getParameter("nam"));
            List<LapDanhMucSCDKVO> lapDanhMucSCDKVOList1 =  this.lapDmScdkServiceImpl.selectDSDanhMuc_ScdkorferUT1(nam);
            List<LapDanhMucSCDKVO> lapDanhMucSCDKVOList2 =  this.lapDmScdkServiceImpl.selectDSDanhMuc_ScdkorferUT2(nam);
            List<DmUTSCTXVO> listUT =  this.lapDmScdkServiceImpl.selectlistUutien();

            //CREATE REPORT
            FileInputStream fileInputStream;
            String fileNameMain = "LapDanhMucSuaChuaDinhKy" + ".xlsx";
            String fileNameServer = "/worklife/reports/LapDanhMucSuaChuaDinhKy.xlsx";
            URL url = getClass().getResource(fileNameServer);
            File fileServer = new File(url.toURI());
            fileInputStream = new FileInputStream(fileServer);

            XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream); //or new HSSFWorkbook();
            XSSFSheet sheet = workbook.getSheet("Sheet1");

            XSSFCellStyle stylePublic = workbook.createCellStyle();

            XSSFCellStyle xssfCellStyle = workbook.createCellStyle();

            xssfCellStyle.setBorderBottom(BorderStyle.THIN);
            xssfCellStyle.setBorderTop(BorderStyle.THIN);
            xssfCellStyle.setBorderRight(BorderStyle.THIN);
            xssfCellStyle.setBorderLeft(BorderStyle.THIN);

            stylePublic.setBorderBottom(BorderStyle.THIN);
            stylePublic.setBorderTop(BorderStyle.THIN);
            stylePublic.setBorderRight(BorderStyle.THIN);
            stylePublic.setBorderLeft(BorderStyle.THIN);

            XSSFFont font = workbook.createFont();
            font.setBold(true);
            stylePublic.setAlignment(HorizontalAlignment.CENTER);
            stylePublic.setVerticalAlignment(VerticalAlignment.CENTER);
            stylePublic.setFont(font);

            // Thêm dữ liệu vào header
            Row rowHeader= sheet.getRow(0);
            Cell cellHeader = rowHeader.getCell(0);
            String val = cellHeader.getStringCellValue();

            val = cellHeader.getStringCellValue();
            val = val.replaceFirst("@year",Integer.toString(nam));
            cellHeader.setCellValue(val);

            // Thêm dữ liệu cho các dòng và style
            int numHeader =2;
            int rownum = 3;
            int stt = 1;
            int stt1 = 1;
            int rowMer = 2;
            Row rowBody;
            Cell cellBody;
            for (DmUTSCTXVO listute : listUT) {

                Row dataRow = sheet.createRow(numHeader);
                dataRow.createCell(0).setCellValue("Ưu tiên 1");
                dataRow.getCell(0).setCellStyle(stylePublic);
                int abcd = 0;
                for (LapDanhMucSCDKVO abc : lapDanhMucSCDKVOList1) {
                    if(abc.getKinhPhiDuyet()!=null){
                        abcd += Float.parseFloat(abc.getKinhPhiDuyet().replace(".00", ""));
                    }
                   }
                int abcde = 0;
                for (LapDanhMucSCDKVO abc : lapDanhMucSCDKVOList2) {
                    if(abc.getKinhPhiDuyet()!=null){
                        abcde += Float.parseFloat(abc.getKinhPhiDuyet().replace(".00", ""));
                    }
                }
                if(listute.getTen().equals("Ưu tiên 1") ){

                    for (LapDanhMucSCDKVO list : lapDanhMucSCDKVOList1) {
                        rowBody = sheet.createRow(rownum++);


                        cellBody = rowBody.createCell(0);
                        cellBody.setCellValue(stt++);
                        cellBody.setCellStyle(xssfCellStyle);

                        if (list.getThuoc() ==null) {
                            cellBody = rowBody.createCell(1);
                            cellBody.setCellValue("Trống");
                           cellBody.setCellStyle(xssfCellStyle);
                        } else if (list.getThuoc().equals("1")) {
                            cellBody = rowBody.createCell(1);
                           cellBody.setCellValue((list.getTenHM()==null?"":list.getTenHM()) + " " + (list.getTenDuong()==null?"":list.getTenDuong()) + "; Lý trình: " + (list.getViTri()==null? "" :list.getViTri()) + "; Địa điểm: " + (list.getNhieuHuyen()==null? "" :list.getNhieuHuyen()) +"");
                            cellBody.setCellStyle(xssfCellStyle);
                        } else if (list.getThuoc().equals("2")) {
                            cellBody = rowBody.createCell(1);
                            cellBody.setCellValue((list.getTenHM()==null?"":list.getTenHM())  + " " + (list.getTenCau()==null?"":list.getTenCau()) + "; Lý trình: " + (list.getViTri()==null? "" :list.getViTri()) + "; Địa điểm: " + (list.getNhieuHuyen()==null? "" :list.getNhieuHuyen()) +"");
                            cellBody.setCellStyle(xssfCellStyle);
                        } else if (list.getThuoc().equals("3")) {
                            cellBody = rowBody.createCell(1);
                            cellBody.setCellValue((list.getTenHM()==null?"":list.getTenHM()) + " " + (list.getTenTB()==null?"":list.getTenTB()) + "; Lý trình: " + (list.getViTri()==null? "" :list.getViTri()) + "; Địa điểm: " + (list.getNhieuHuyen()==null? "" :list.getNhieuHuyen()) +"");
                            cellBody.setCellStyle(xssfCellStyle);
                        } else if (list.getThuoc().equals("4")) {
                            cellBody = rowBody.createCell(1);
                            cellBody.setCellValue((list.getTenHM()==null?"":list.getTenHM()) + " " + (list.getTenCongTrinh()==null?"":list.getTenCongTrinh()) + "; Lý trình: " + (list.getViTri()==null? "" :list.getViTri()) + "; Địa điểm: " + (list.getNhieuHuyen()==null? "" :list.getNhieuHuyen()) +"");
                            cellBody.setCellStyle(xssfCellStyle);
                        }

                        cellBody = rowBody.createCell(2);
                        int cde = 0;
                        String cdef = "";
                        String a = "";
                        if(list.getKinhPhiDuyet()==null){
                        }else {
                            cde += Float.parseFloat(list.getKinhPhiDuyet().replace(".00", ""));
                             a  =  String.valueOf(cde);
                        }
                        cellBody.setCellValue(list.getKinhPhiDuyet()==null?cdef:a);
                       cellBody.setCellStyle(xssfCellStyle);

                        cellBody = rowBody.createCell(3);
                        cellBody.setCellValue(list.getHienTrang()==null?"":list.getHienTrang());
                        cellBody.setCellStyle(xssfCellStyle);

                        cellBody = rowBody.createCell(4);
                        cellBody.setCellValue(list.getGiaiPhap()==null?"":list.getGiaiPhap());
                        cellBody.setCellStyle(xssfCellStyle);
                    }
                    rowBody = sheet.createRow(rownum++);
                    cellBody = rowBody.createCell(0);
                    cellBody.setCellValue("");
                    cellBody.setCellStyle(stylePublic);
                    cellBody = rowBody.createCell(1);
                    cellBody.setCellValue("Tổng cộng: ");
                    cellBody.setCellStyle(stylePublic);
                    cellBody = rowBody.createCell(2);
                    cellBody.setCellValue(abcd);
                    cellBody.setCellStyle(stylePublic);
                    cellBody = rowBody.createCell(3);
                    cellBody.setCellValue("");
                    cellBody.setCellStyle(stylePublic);
                    cellBody = rowBody.createCell(4);
                    cellBody.setCellValue("");
                    cellBody.setCellStyle(stylePublic);

                }
                Row dataRow1 = sheet.createRow(numHeader+lapDanhMucSCDKVOList1.size()+2);
                dataRow1.createCell(0).setCellValue("Ưu tiên 2");
                dataRow1.getCell(0).setCellStyle(stylePublic);
                if (listute.getId() == 2){

                    for (LapDanhMucSCDKVO list : lapDanhMucSCDKVOList2) {
                        rowBody = sheet.createRow(rownum+++1);

                        cellBody = rowBody.createCell(0);
                        cellBody.setCellValue(stt1++);
                        cellBody.setCellStyle(xssfCellStyle);

                        if (list.getThuoc() ==null) {
                            cellBody = rowBody.createCell(1);
                            cellBody.setCellValue("Trống");
                             cellBody.setCellStyle(xssfCellStyle);
                        } else
                        if (list.getThuoc().equals("")||list.getThuoc() ==null) {
                            cellBody = rowBody.createCell(1);
                            cellBody.setCellValue(" ");
                            cellBody.setCellStyle(xssfCellStyle);
                        } else if (list.getThuoc().equals("1")) {
                            cellBody = rowBody.createCell(1);
                            cellBody.setCellValue((list.getTenHM()==null?"":list.getTenHM()) + " " + (list.getTenDuong()==null?"":list.getTenDuong()) + "; Lý trình: " + (list.getViTri()==null? "" :list.getViTri()) + "; Địa điểm: " + (list.getNhieuHuyen()==null? "" :list.getNhieuHuyen()) +"");
                            cellBody.setCellStyle(xssfCellStyle);
                        } else if (list.getThuoc().equals("2")) {
                            cellBody = rowBody.createCell(1);
                            cellBody.setCellValue((list.getTenHM()==null?"":list.getTenHM())  + " " + (list.getTenCau()==null?"":list.getTenCau()) + "; Lý trình: " + (list.getViTri()==null? "" :list.getViTri()) + "; Địa điểm: " + (list.getNhieuHuyen()==null? "" :list.getNhieuHuyen()) +"");
                            cellBody.setCellStyle(xssfCellStyle);
                        } else if (list.getThuoc().equals("3")) {
                            cellBody = rowBody.createCell(1);
                            cellBody.setCellValue((list.getTenHM()==null?"":list.getTenHM()) + " " + (list.getTenTB()==null?"":list.getTenTB()) + "; Lý trình: " + (list.getViTri()==null? "" :list.getViTri()) + "; Địa điểm: " + (list.getNhieuHuyen()==null? "" :list.getNhieuHuyen()) +"");
                            cellBody.setCellStyle(xssfCellStyle);
                        } else if (list.getThuoc().equals("4")) {
                            cellBody = rowBody.createCell(1);
                            cellBody.setCellValue((list.getTenHM()==null?"":list.getTenHM()) + " " + (list.getTenCongTrinh()==null?"":list.getTenCongTrinh()) + " Lý trình: " + (list.getViTri()==null? "" :list.getViTri()) + "; Địa điểm: " + (list.getNhieuHuyen()==null? "" :list.getNhieuHuyen()) +"");
                             cellBody.setCellStyle(xssfCellStyle);
                        }
                        cellBody = rowBody.createCell(2);
                         cellBody.setCellValue(list.getKinhPhiDuyet()==null?0:Float.parseFloat(list.getKinhPhiDuyet().replace(".00", "")));
                        cellBody.setCellStyle(xssfCellStyle);

                        cellBody = rowBody.createCell(3);
                        cellBody.setCellValue(list.getHienTrang()==null?"":list.getHienTrang());
                        cellBody.setCellStyle(xssfCellStyle);

                        cellBody = rowBody.createCell(4);
                        cellBody.setCellValue(list.getGiaiPhap()==null?"":list.getGiaiPhap());
                        cellBody.setCellStyle(xssfCellStyle);
                    }
                    rowBody = sheet.createRow(rownum+++1);
                    cellBody = rowBody.createCell(0);
                    cellBody.setCellValue("");
                    cellBody.setCellStyle(stylePublic);
                    cellBody = rowBody.createCell(1);
                    cellBody.setCellValue("Tổng cộng");
                    cellBody.setCellStyle(stylePublic);
                    cellBody = rowBody.createCell(2);
                    cellBody.setCellValue(abcde);
                    cellBody.setCellStyle(stylePublic);
                    cellBody = rowBody.createCell(3);
                    cellBody.setCellValue("");
                    cellBody.setCellStyle(stylePublic);
                    cellBody = rowBody.createCell(4);
                    cellBody.setCellValue("");
                    cellBody.setCellStyle(stylePublic);
                }


                  /*  sheet.addMergedRegion(new CellRangeAddress(1,4,10,10));*/
                  /*  sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getCauVOS().size() - 1,1,1));*/
            }
            sheet.addMergedRegion(new CellRangeAddress(2,2,0,4));
            sheet.addMergedRegion(new CellRangeAddress(numHeader+lapDanhMucSCDKVOList1.size()+2,numHeader+lapDanhMucSCDKVOList1.size()+2,0,4));
           // file.close();
        xssfCellStyle.setAlignment(HorizontalAlignment.CENTER);
        xssfCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        String mimetype = "application/x-msdownload";
        response.setContentType(mimetype);
        String user_agent = request.getHeader("user-agent");
        boolean isInternetExplorer = (user_agent.indexOf("MSIE") > -1);
        if (isInternetExplorer) {
            response.setHeader("Content-disposition", "attachment; filename=\"" + URLEncoder.encode(fileNameMain, "utf-8") + "\"");
        }
        else {
            response.addHeader("Content-disposition","attachment; filename=\"" + MimeUtility.encodeWord(fileNameMain)  + "\"");
        }
        workbook.write(response.getOutputStream());
        workbook.close();
    }catch (Exception e){
            e.printStackTrace();
    }
    }
}
