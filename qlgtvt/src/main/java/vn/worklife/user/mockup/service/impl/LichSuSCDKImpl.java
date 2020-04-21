package vn.worklife.user.mockup.service.impl;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.*;
import vn.worklife.user.mockup.service.LichSuSCDKService;
import vn.worklife.user.quanlycau.model.CauVO;
import vn.worklife.user.quanlytuyenduong.model.QLThietBiVO;
import vn.worklife.user.quanlytuyenduong.model.TuyenDuongHatVO;
import vn.worklife.user.util.ReportUtils;

import javax.mail.internet.MimeUtility;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Service("LichSuSCDKImpl")
public class LichSuSCDKImpl implements LichSuSCDKService {
    @Autowired
    LichSuSCDKService lichSuSCDKService;

    @Override
    public List<TuyenDuongHatVO> selectListTD(){
        return this.lichSuSCDKService.selectListTD();
    }
    @Override
    public List<CauVO> selectListCau(){
        return this.lichSuSCDKService.selectListCau();
    }
    @Override
    public List<QLThietBiVO> selectListTB(){
        return this.lichSuSCDKService.selectListTB();
    }
    @Override
    public List<LapDanhMucSCDKVO> selectListCT(){
        return this.lichSuSCDKService.selectListCT();
    }
    @Override
    public List<NhapThongTinSCDKVO> selectTableLichSuDMSCDK(DatatableRequestCriteriasVO criterias) {
        return lichSuSCDKService.selectTableLichSuDMSCDK(criterias);
    }
    @Override
    public List<DanhSachSuCoSCDKVO> selectDanhSachSCDK(int idDmscdk) {
        return lichSuSCDKService.selectDanhSachSCDK(idDmscdk);
    }
    @Override
    public List<LichSuSCDKVO> selectAllTableNotPaging(Map<String, String> params) {
        return lichSuSCDKService.selectAllTableNotPaging(params);
    }
    public void exportExcel(Map<String,String> params, String templateName, String fileName, HttpServletRequest request, HttpServletResponse response){
        try {
            List<LichSuSCDKVO> dsLichSuSCDK = selectAllTableNotPaging(params);
            for(LichSuSCDKVO lichSuSCDKVO : dsLichSuSCDK) {
                lichSuSCDKVO.setDanhSachSuCoSCDKVO(lichSuSCDKService.selectDanhSachSCDK(lichSuSCDKVO.getIdDmscdk()));
            }
            FileInputStream file = ReportUtils.fileFromServer(templateName);
            //Tạo workbook từ file template
            XSSFWorkbook workbook = new XSSFWorkbook (file);
            XSSFSheet sheet = workbook.getSheetAt(0);
            // Thêm dữ liệu vào header
            Row rowHeader= sheet.getRow(1);
            Cell cellHeader = rowHeader.getCell(0);
            String val = cellHeader.getStringCellValue();
            //int i=0;
            String tuNam = params.get("tuNam");
            String denNam = params.get("denNam");
            String tenDuong = params.get("tenDuong");
            val = val.replaceFirst("@from_year",tuNam).replaceFirst("@to_year",denNam);
            cellHeader.setCellValue(val);
            rowHeader = sheet.getRow(2);
            cellHeader = rowHeader.getCell(0);
            val = cellHeader.getStringCellValue();
            val = val.replaceFirst("@ten",tenDuong);
            cellHeader.setCellValue(val);
            // Thêm dữ liệu cho các dòng và style
            int rownum = 5;
            int stt = 1;
            Row rowBody = null;
            Cell cellBody = null;
            //Set font & style
            XSSFCellStyle styleCenter = getCellStyle(workbook,1);// 1: Style nhu cột STT
            XSSFCellStyle styleLeft = getCellStyle(workbook,2);// 1: Style nhu cột Tai Nạn
            for (LichSuSCDKVO lichSuSCDKVO : dsLichSuSCDK) {
                rowBody = sheet.createRow(rownum++);
                // Cột số thứ tự
                cellBody = rowBody.createCell(0);
                cellBody.setCellValue(stt++);
                cellBody.setCellStyle(styleCenter);
                // Cột lý trình
                cellBody = rowBody.createCell(1);
                cellBody.setCellStyle(styleLeft);
                cellBody.setCellValue(lichSuSCDKVO.getDanhSachLyTrinh());
                // Cột địa điểm
                cellBody = rowBody.createCell(2);
                cellBody.setCellStyle(styleLeft);
                cellBody.setCellValue(lichSuSCDKVO.getDiaDiem());
                // Cột thời gian thực hiện
                cellBody = rowBody.createCell(3);
                cellBody.setCellValue(lichSuSCDKVO.getThoiGianSuaChua());
                cellBody.setCellStyle(styleCenter);
                // Cột ngày hoàn thành
                cellBody = rowBody.createCell(4);
                cellBody.setCellStyle(styleCenter);
                cellBody.setCellValue(lichSuSCDKVO.getThoiGianHoanThanh());
                // Cột hạn mục công việc
                cellBody = rowBody.createCell(5);
                cellBody.setCellStyle(styleLeft);
                cellBody.setCellValue(lichSuSCDKVO.getCongViecChinh());
                // Cột kinh phí thực hiện
                cellBody = rowBody.createCell(6);
                cellBody.setCellStyle(styleCenter);
                cellBody.setCellValue(lichSuSCDKVO.getGiaTrungThau());
                // Cột nguồn vốn
                cellBody = rowBody.createCell(7);
                cellBody.setCellStyle(styleLeft);
                cellBody.setCellValue(lichSuSCDKVO.getNguonVon());
                // Cột nhà thầu thi công
                cellBody = rowBody.createCell(8);
                cellBody.setCellStyle(styleLeft);
                cellBody.setCellValue(lichSuSCDKVO.getThiCong());
                // Cột tư vấn thiết kế
                cellBody = rowBody.createCell(9);
                cellBody.setCellStyle(styleLeft);
                cellBody.setCellValue(lichSuSCDKVO.getTuVanThietKe());
                // Cột tư vấn giám sát
                cellBody = rowBody.createCell(10);
                cellBody.setCellStyle(styleLeft);
                cellBody.setCellValue(lichSuSCDKVO.getTuVanGiamSat());
            }
            file.close();
            // Tạo Chuyển File về server
            writeExcelFileToClient(workbook, fileName, request, response);
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
