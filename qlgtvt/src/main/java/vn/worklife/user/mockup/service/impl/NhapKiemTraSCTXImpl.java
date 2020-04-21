package vn.worklife.user.mockup.service.impl;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.mockup.model.NhapKiemTraSCTXVO;
import vn.worklife.user.mockup.service.NhapKiemTraSCTXService;
import vn.worklife.user.util.ReportUtils;

import javax.mail.internet.MimeUtility;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Service("NhapKiemTraSCTXImpl")
public class NhapKiemTraSCTXImpl implements NhapKiemTraSCTXService {

    @Autowired
    NhapKiemTraSCTXService nhapKiemTraSCTXService;

    @Autowired
    NhapKiemTraSCTXImpl nhapKiemTraSCTXImpl;

    @Override
    public List<DanhMucSCTXVO> selectNhapKiemTraSCTX(int quy, int nam, int tinhTrang, int idGroup) {
        return nhapKiemTraSCTXService.selectNhapKiemTraSCTX(quy, nam, tinhTrang, idGroup);
    }
    @Override
    public void insertNhapKiemTraSCTX(DanhMucSCTXVO danhMucSCTXVO){
        this.nhapKiemTraSCTXService.insertNhapKiemTraSCTX(danhMucSCTXVO);
    }
    @Override
    public void updateNhapKiemTraSCTX(DanhMucSCTXVO danhMucSCTXVO){
        this.nhapKiemTraSCTXService.updateNhapKiemTraSCTX(danhMucSCTXVO);
    }
    @Override
    public List<NhapKiemTraSCTXVO> selectAllTableNotPaging(Map<String, String> params) {
        return nhapKiemTraSCTXService.selectAllTableNotPaging(params);
    }

    public void exportExcel(Map<String,String> params, String templateName, String fileName, HttpServletRequest request, HttpServletResponse response){
        try {
            int quy = Integer.parseInt(params.get("quy"));
            int nam = Integer.parseInt(params.get("nam"));
            int idGroup = Integer.parseInt(params.get("idGroup"));
            int tinhTrang = Integer.parseInt(params.get("tinhTrang"));
            String groupName;

            List<DanhMucSCTXVO> dsNhapKiemTra = this.nhapKiemTraSCTXImpl.selectNhapKiemTraSCTX(quy, nam, tinhTrang, idGroup);
            if (idGroup == 1)
                groupName = "Sở giao thông vận tải";
            else
                groupName = dsNhapKiemTra.get(0).getTenHatQL();

            //CREATE REPORT
            FileInputStream fileInputStream;
            String fileNameMain = "KiemTraSuaChuaThuongXuyenTemp" + ".xlsx";
            String fileNameServer = "/worklife/reports/KiemTraSuaChuaThuongXuyenTemp.xlsx";
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

            val = val.replaceFirst("@quy",Integer.toString(quy).equals("-1")?"":Integer.toString(quy));
            val = val.replaceFirst("@year",Integer.toString(nam).equals("-1")?"":Integer.toString(nam));
            cellHeader.setCellValue(val);

            rowHeader = sheet.getRow(2);
            cellHeader = rowHeader.getCell(0);
            val = cellHeader.getStringCellValue();
            val = val.replaceFirst("@ten",groupName);
            cellHeader.setCellValue(val);

            // Thêm dữ liệu cho các dòng và style
            int rownum = 5;
            int stt = 1;
            Row rowBody = null;
            Cell cellBody = null;
            //Set font & style
            /*XSSFCellStyle styleSTT = getCellStyle(workbook,1);// 1: Style nhu cột STT
            XSSFCellStyle styleTN = getCellStyle(workbook,2);// 1: Style nhu cột Tai Nạn*/
            for (DanhMucSCTXVO nhapKiemTraSCTXVO : dsNhapKiemTra) {
                rowBody = sheet.createRow(rownum++);
                // Cột số thứ tự
                cellBody = rowBody.createCell(0);
                cellBody.setCellValue(stt++);
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(1);
                cellBody.setCellValue(nhapKiemTraSCTXVO.getTenDuong());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(2);
                cellBody.setCellValue(nhapKiemTraSCTXVO.getLyTrinh());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(3);
                cellBody.setCellValue(nhapKiemTraSCTXVO.getNoiDungSuaChua());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(4);
                cellBody.setCellValue(nhapKiemTraSCTXVO.getKlDuyet_Tong() + " " + nhapKiemTraSCTXVO.getTenDVT());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(5);
                cellBody.setCellValue(nhapKiemTraSCTXVO.getThoiGian_TH());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(6);
                cellBody.setCellValue(nhapKiemTraSCTXVO.getGhiChu_TH());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(7);
                cellBody.setCellValue(nhapKiemTraSCTXVO.getNgayKT());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(8);
                String thucHien = "";
                if (nhapKiemTraSCTXVO.getThucHien().equals("0") || nhapKiemTraSCTXVO.getThucHien() == null)
                    thucHien = "Chưa thực hiện";
                else if (nhapKiemTraSCTXVO.getThucHien().equals("1"))
                    thucHien = "Đã thực hiên";
                cellBody.setCellValue(thucHien);
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(9);
                cellBody.setCellValue(nhapKiemTraSCTXVO.getDanhGia());
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

    private XSSFCellStyle getCellStyle(XSSFWorkbook workbook, int type){
        XSSFFont font = workbook.createFont();
        font.setFontHeightInPoints((short) 13);
        font.setFontName("Times New Roman");

        //Set font into style
        XSSFCellStyle style = workbook.createCellStyle();
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
        }
        return style;
    }

    private String[] getSDateEdateFromWeekNo(int tuan, int nam){

        String[] dateRange=new String[2];
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        try {
            cal.setTime(sdf.parse("01/01/"+ nam));
        } catch (ParseException e) {

        }
        cal.set(Calendar.WEEK_OF_YEAR, tuan);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        dateRange[0] = sdf.format(cal.getTime());
        cal.add(Calendar.DATE, 6);
        dateRange[1] = sdf.format(cal.getTime());
        return dateRange;
    }
}
