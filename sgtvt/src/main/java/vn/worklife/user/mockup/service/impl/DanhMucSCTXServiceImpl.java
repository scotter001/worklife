/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service.impl;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.mockup.model.DmDVTVO;
import vn.worklife.user.mockup.model.SuCoVO;
import vn.worklife.user.mockup.service.DanhMucSCTXService;
import vn.worklife.user.util.ReportUtils;

import javax.mail.internet.MimeUtility;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;
import java.util.Map;

@Service("DanhMucSCTXServiceImpl")
public class DanhMucSCTXServiceImpl implements DanhMucSCTXService {

    @Autowired
    DanhMucSCTXService danhMucSCTXService;

    @Autowired
    SctxThucHienServiceImpl sctxThucHienService;

    @Override
    public List<DanhMucSCTXVO> selectAllDmSctxByQY(int quy, int nam, int idGroup) {
        return danhMucSCTXService.selectAllDmSctxByQY(quy, nam, idGroup);
    }
    @Override
    public void insertDmSCTX(DanhMucSCTXVO danhMucSCTXVO){
        this.danhMucSCTXService.insertDmSCTX(danhMucSCTXVO);
    }
    @Override
    public void updateDmSCTX(DanhMucSCTXVO danhMucSCTXVO){
        this.danhMucSCTXService.updateDmSCTX(danhMucSCTXVO);
    }
    @Override
    public List<DmDVTVO> selectListDVT(){
        return this.danhMucSCTXService.selectListDVT();
    }
    @Override
    public boolean deleteSCTX(int idDmSctx){
        return this.danhMucSCTXService.deleteSCTX(idDmSctx);
    }
    @Override
    public List<DanhMucSCTXVO> selectAllDmSctxByQYNotPaging(Map<String,String> optional){
        return danhMucSCTXService.selectAllDmSctxByQYNotPaging(optional);
    }

    @Override
    public List<DanhMucSCTXVO> selectAllDmSctxForPlanningNotPaging(Map<String,String> optional) {
        return danhMucSCTXService.selectAllDmSctxForPlanningNotPaging(optional);
    }

    @Override
    public List<DanhMucSCTXVO> selectAllDmSctxTraCuu(DatatableRequestCriteriasVO criterias) {
        return danhMucSCTXService.selectAllDmSctxTraCuu(criterias);
    }

    @Override
    public List<DanhMucSCTXVO> selectAllDmSctxTraCuuExport(Map<String, String> optional) {
        return danhMucSCTXService.selectAllDmSctxTraCuuExport(optional);
    }

    public void exportDanhMucSctxToExcel(Map<String,String> optional, String templateName, String fileName, HttpServletRequest request, HttpServletResponse response){
        try {
            int quy = Integer.parseInt(optional.get("thuocQuy"));
            int nam = Integer.parseInt(optional.get("nam"));
            int idGroup = Integer.parseInt(optional.get("groupId"));
            /*List<DanhMucSCTXVO> danhMucSCTXVOList =  selectAllDmSctxByQYNotPaging(optional);*/
            List<DanhMucSCTXVO> danhMucSCTXVOList = this.danhMucSCTXService.selectAllDmSctxByQY(quy, nam, idGroup);
            /*String thuocQuy = optional.get("thuocQuy");
            String nam = optional.get("nam");*/
            //CREATE REPORT
            FileInputStream fileInputStream;
            String fileNameMain = "DanhMucSctxTemp" + ".xlsx";
            String fileNameServer = "/worklife/reports/DanhMucSctxTemp.xlsx";
            URL url = getClass().getResource(fileNameServer);
            File fileServer = new File(url.toURI());
            fileInputStream = new FileInputStream(fileServer);

            XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream); //or new HSSFWorkbook();
            XSSFSheet sheet = workbook.getSheet("Sheet1");

            XSSFCellStyle stylePublic = workbook.createCellStyle();

            XSSFCellStyle xssfCellStyle = workbook.createCellStyle();


            stylePublic.setBorderBottom(BorderStyle.NONE);
            stylePublic.setBorderTop(BorderStyle.NONE);
            stylePublic.setBorderRight(BorderStyle.NONE);
            stylePublic.setBorderLeft(BorderStyle.NONE);
            String groupName = optional.get("groupName");
            /*FileInputStream file = ReportUtils.fileFromServer(templateName);
            //Tạo workbook từ file template
            XSSFWorkbook workbook = new XSSFWorkbook (file);
            XSSFSheet sheet = workbook.getSheetAt(0);*/
            // Thêm dữ liệu vào header
            Row rowHeader= sheet.getRow(1);
            Cell cellHeader = rowHeader.getCell(0);
            String val = cellHeader.getStringCellValue();
            val = val.replaceFirst("@quarter",Integer.toString(quy).equals("-1")?"":Integer.toString(quy));
            val = val.replaceFirst("@year",Integer.toString(nam).equals("-1")?"":Integer.toString(nam));
            cellHeader.setCellValue(val);

            rowHeader= sheet.getRow(2);
            cellHeader = rowHeader.getCell(0);
            val = cellHeader.getStringCellValue();
            val = val.replaceFirst("@group_name",groupName);
            cellHeader.setCellValue(val);

            // Thêm dữ liệu cho các dòng và style
           int rownum = 6;
            int stt = 1;
            Row rowBody = null;
            Cell cellBody = null;
            //Set font & style
            XSSFCellStyle styleCenter = getCellStyle(workbook,1);// 1: Style center
            XSSFCellStyle styleLeft = getCellStyle(workbook,2);// 2: Style left
            XSSFCellStyle styleRight = getCellStyle(workbook,3);// 3: Style right
            XSSFCellStyle styleNumber = getCellStyle(workbook,4);// 3: Style number: Right + Format
            NumberFormat numberFormatter = new DecimalFormat("#,###,###.00");
            for (DanhMucSCTXVO danhMucSCTXVO : danhMucSCTXVOList) {
                rowBody = sheet.createRow(rownum++);

                cellBody = rowBody.createCell(0);
                cellBody.setCellValue(stt++);
                cellBody.setCellStyle(stylePublic);

                SuCoVO suCoVO =  danhMucSCTXVO.getSuCoVo();
                cellBody = rowBody.createCell(1);
                cellBody.setCellValue(danhMucSCTXVO.getTenDuong());
                cellBody.setCellStyle(stylePublic);

                cellBody = rowBody.createCell(2);
                cellBody.setCellValue(danhMucSCTXVO.getLyTrinh());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(3);
                cellBody.setCellValue(danhMucSCTXVO.getNoiDungSuaChua());
                cellBody.setCellStyle(stylePublic);

                cellBody = rowBody.createCell(4);
                cellBody.setCellValue(danhMucSCTXVO.getTenDVT());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(5);
                cellBody.setCellValue(danhMucSCTXVO.getCongThucLap());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(6);
                cellBody.setCellValue("=");
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(7);
                cellBody.setCellValue(danhMucSCTXVO.getKlLap_CT());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(8);
                cellBody.setCellValue(danhMucSCTXVO.getKlLap_Tong());
                cellBody.setCellStyle(xssfCellStyle);
            }
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
            /*file.close();
            // Tạo Chuyển File về server
            writeExcelFileToClient(workbook, fileName, request, response);*/
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void exportDanhMucSctxForPlanningToExcel(Map<String,String> optional, String templateName, String fileName, HttpServletRequest request, HttpServletResponse response){
        int quy = Integer.parseInt(optional.get("thuocQuy"));
        int nam = Integer.parseInt(optional.get("nam"));
        int idGroup = Integer.parseInt(optional.get("groupId"));
        String groupName;
        try {
            List<DanhMucSCTXVO> danhMucSCTXVOList = this.sctxThucHienService.selectListLapKeHoach(quy, nam, idGroup);
            /*String thuocQuy = optional.get("thuocQuy");
            String nam = optional.get("nam");*/
            if (idGroup == 1)
                groupName = "Sở giao thông vận tải";
            else
                groupName = danhMucSCTXVOList.get(0).getTenHatQL();

            //CREATE REPORT
            FileInputStream fileInputStream;
            String fileNameMain = "LapKeHoachDanhMucSctxTemp" + ".xlsx";
            String fileNameServer = "/worklife/reports/LapKeHoachDanhMucSctxTemp.xlsx";
            URL url = getClass().getResource(fileNameServer);
            File fileServer = new File(url.toURI());
            fileInputStream = new FileInputStream(fileServer);

            XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream); //or new HSSFWorkbook();
            XSSFSheet sheet = workbook.getSheet("Sheet1");

            XSSFCellStyle stylePublic = workbook.createCellStyle();

            XSSFCellStyle xssfCellStyle = workbook.createCellStyle();


            stylePublic.setBorderBottom(BorderStyle.NONE);
            stylePublic.setBorderTop(BorderStyle.NONE);
            stylePublic.setBorderRight(BorderStyle.NONE);
            stylePublic.setBorderLeft(BorderStyle.NONE);

            // Thêm dữ liệu vào header
            Row rowHeader= sheet.getRow(1);
            Cell cellHeader = rowHeader.getCell(0);
            String val = cellHeader.getStringCellValue();
            val = val.replaceFirst("@quarter",Integer.toString(quy).equals("-1")?"":Integer.toString(quy));
            val = val.replaceFirst("@year",Integer.toString(nam).equals("-1")?"":Integer.toString(nam));
            cellHeader.setCellValue(val);

            rowHeader= sheet.getRow(2);
            cellHeader = rowHeader.getCell(0);
            val = cellHeader.getStringCellValue();
            val = val.replaceFirst("@group_name",groupName);
            cellHeader.setCellValue(val);

            // Thêm dữ liệu cho các dòng và style
            int rownum = 5;
            int stt = 1;
            Row rowBody;
            Cell cellBody;
            for (DanhMucSCTXVO danhMucSCTXVO : danhMucSCTXVOList) {
                rowBody = sheet.createRow(rownum++);

                cellBody = rowBody.createCell(0);
                cellBody.setCellValue(stt++);
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(1);
                cellBody.setCellValue(danhMucSCTXVO.getTenDuong());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(2);
                cellBody.setCellStyle(xssfCellStyle);
                cellBody.setCellValue(danhMucSCTXVO.getLyTrinh());

                cellBody = rowBody.createCell(3);
                cellBody.setCellStyle(xssfCellStyle);
                cellBody.setCellValue(danhMucSCTXVO.getNoiDungSuaChua());

                cellBody = rowBody.createCell(4);
                cellBody.setCellValue(danhMucSCTXVO.getKlDuyet_Tong() + " " + danhMucSCTXVO.getTenDVT());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(5);
                cellBody.setCellValue(danhMucSCTXVO.getKinhPhi());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(6);
                cellBody.setCellValue(danhMucSCTXVO.getKeHoach_TH());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(7);
                cellBody.setCellValue(danhMucSCTXVO.getGhiChu_KH());
                cellBody.setCellStyle(xssfCellStyle);
            }
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
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void exportDanhMucSctxTraCuuToExcel(Map<String,String> optional, String templateName, String fileName, HttpServletRequest request, HttpServletResponse response){
        try {
            List<DanhMucSCTXVO> danhMucSCTXVOList =  selectAllDmSctxTraCuuExport(optional);
            String thuocQuy = optional.get("thuocQuy");
            String nam = optional.get("nam");
            String groupName = optional.get("groupName");
            FileInputStream file = ReportUtils.fileFromServer(templateName);
            //Tạo workbook từ file template
            XSSFWorkbook workbook = new XSSFWorkbook (file);
            XSSFSheet sheet = workbook.getSheetAt(0);
            // Thêm dữ liệu vào header
            Row rowHeader= sheet.getRow(1);
            Cell cellHeader = rowHeader.getCell(0);
            String val = cellHeader.getStringCellValue();
            val = val.replaceFirst("@quarter",thuocQuy);
            val = val.replaceFirst("@year",nam);
            cellHeader.setCellValue(val);

            rowHeader= sheet.getRow(2);
            cellHeader = rowHeader.getCell(0);
            val = cellHeader.getStringCellValue();
            val = val.replaceFirst("@group_name",groupName);
            cellHeader.setCellValue(val);

            // Thêm dữ liệu cho các dòng và style
            int rownum = 5;
            int stt = 1;
            Row rowBody = null;
            Cell cellBody = null;
            //Set font & style
            XSSFCellStyle styleCenter = getCellStyle(workbook,1);// 1: Style center
            XSSFCellStyle styleLeft = getCellStyle(workbook,2);// 2: Style left
           // XSSFCellStyle styleRight = getCellStyle(workbook,3);// 3: Style right
           // XSSFCellStyle styleNumber = getCellStyle(workbook,4);// 3: Style number: Right + Format
            for (DanhMucSCTXVO danhMucSCTXVO : danhMucSCTXVOList) {
                rowBody = sheet.createRow(rownum++);

                cellBody = rowBody.createCell(0);
                cellBody.setCellValue(stt++);
                cellBody.setCellStyle(styleCenter);

                cellBody = rowBody.createCell(1);
                cellBody.setCellValue(danhMucSCTXVO.getTenDuong());
                cellBody.setCellStyle(styleCenter);

                cellBody = rowBody.createCell(2);
                cellBody.setCellValue(danhMucSCTXVO.getLyTrinh());
                cellBody.setCellStyle(styleCenter);

                cellBody = rowBody.createCell(3);
                cellBody.setCellValue(danhMucSCTXVO.getNoiDungSuaChua());
                cellBody.setCellStyle(styleLeft);

                cellBody = rowBody.createCell(4);
                cellBody.setCellValue(danhMucSCTXVO.getKlDuyet_Tong());
                cellBody.setCellStyle(styleCenter);

                cellBody = rowBody.createCell(5);
                cellBody.setCellValue(danhMucSCTXVO.getThoiGian_TH());
                cellBody.setCellStyle(styleCenter);

                cellBody = rowBody.createCell(6);
                cellBody.setCellValue(danhMucSCTXVO.getNgayKT());
                cellBody.setCellStyle(styleCenter);
            }
            file.close();
            // Tạo Chuyển File về server
            writeExcelFileToClient(workbook, fileName, request, response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private XSSFCellStyle getCellStyle(XSSFWorkbook workbook, int type){
        XSSFFont font = workbook.createFont();
        font.setFontHeightInPoints((short) 13);
        font.setFontName("Times New Roman");
        //Set font into style
        XSSFCellStyle style = workbook.createCellStyle();
        XSSFDataFormat format = workbook.createDataFormat();
        style.setFont(font);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        switch(type){
            case 1:
                style.setAlignment(HorizontalAlignment.CENTER);
                break;
            case 2:
                style.setAlignment(HorizontalAlignment.LEFT);
                break;
            case 3:
                style.setAlignment(HorizontalAlignment.RIGHT);
                break;
            case 4:
                style.setAlignment(HorizontalAlignment.RIGHT);
                style.setDataFormat(format.getFormat("#,###,###"));
                break;
        }
        return style;
    }

    private void writeExcelFileToClient(XSSFWorkbook workbook, String fileName, HttpServletRequest request, HttpServletResponse response) throws Exception{
        String mimetype = "application/x-msdownload";
        response.setContentType(mimetype);
        String user_agent = request.getHeader("user-agent");
        boolean isInternetExplorer = (user_agent.indexOf("MSIE") > -1);
        if (isInternetExplorer) {
            response.setHeader("Content-disposition", "attachment; filename=\"" + URLEncoder.encode(fileName, "utf-8") + "\"");
        }
        else {
            response.addHeader("Content-disposition","attachment; filename=\"" + MimeUtility.encodeWord(fileName)  + "\"");
        }
        // file.close();
        ServletOutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
    }


}
