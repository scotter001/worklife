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
import vn.worklife.user.mockup.model.BaoCaoSuCoVO;
import vn.worklife.user.mockup.model.SuCoVO;
import vn.worklife.user.mockup.service.BaoCaoSuCoService;
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

@Service
public class BaoCaoSuCoServiceImpl implements BaoCaoSuCoService {
    @Autowired
    BaoCaoSuCoService baoCaoSuCoService;

    @Autowired
    SuCoServiceImpl suCoService;

    @Override
    public Integer selectIdBaoCaoSuCo(BaoCaoSuCoVO baoCaoSuCoVO) {
        return baoCaoSuCoService.selectIdBaoCaoSuCo(baoCaoSuCoVO);
    }

    @Override
    public void insertBaoCaoSuCo(BaoCaoSuCoVO baoCaoSuCoVO) {
        baoCaoSuCoService.insertBaoCaoSuCo(baoCaoSuCoVO);
    }

    @Override
    public void updateBaoCaoSuCo(BaoCaoSuCoVO baoCaoSuCoVO) {
        baoCaoSuCoService.updateBaoCaoSuCo(baoCaoSuCoVO);
    }

    @Override
    public void deleteBaoCaoSuCoById(int baoCaoSuCoId) {
        baoCaoSuCoService.deleteBaoCaoSuCoById(baoCaoSuCoId);
    }

    public void exportExcel(Map<String,String> params, String templateName, String fileName, HttpServletRequest request, HttpServletResponse response){
        try {
            List<SuCoVO> danhSachSuCo =  suCoService.selectAllSuCoNotPaging(params);
            FileInputStream file = ReportUtils.fileFromServer(templateName);
            //Tạo workbook từ file template
            XSSFWorkbook workbook = new XSSFWorkbook (file);
            XSSFSheet sheet = workbook.getSheetAt(0);
            // Thêm dữ liệu vào header
            Row rowHeader= sheet.getRow(1);
            Cell cellHeader = rowHeader.getCell(0);
            String val = cellHeader.getStringCellValue();
            String[] dateRange;
            //int i=0;
            String tuan = params.get("tuan");
            String nam = params.get("nam");
            String groupName = params.get("groupName");
            dateRange = getSDateEdateFromWeekNo(Integer.parseInt(tuan),Integer.parseInt(nam));

            val = val.replaceFirst("@week",tuan);
            val = val.replaceFirst("@year",nam);
            val = val.replaceFirst("@from_date",dateRange[0]);
            val = val.replaceFirst("@to_date",dateRange[1]);
            cellHeader.setCellValue(val);

            rowHeader = sheet.getRow(2);
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
            XSSFCellStyle styleSTT = getCellStyle(workbook,1);// 1: Style nhu cột STT
            XSSFCellStyle styleTN = getCellStyle(workbook,2);// 1: Style nhu cột Tai Nạn
            for (SuCoVO suCoVO : danhSachSuCo) {
                rowBody = sheet.createRow(rownum++);

                cellBody = rowBody.createCell(0);
                cellBody.setCellValue(stt++);
                cellBody.setCellStyle(styleSTT);

                cellBody = rowBody.createCell(1);
                cellBody.setCellValue(suCoVO.getTenDuong());
                cellBody.setCellStyle(styleSTT);

                cellBody = rowBody.createCell(2);
                cellBody.setCellStyle(styleTN);
                cellBody.setCellValue(suCoVO.getTaiNan());

                cellBody = rowBody.createCell(3);
                cellBody.setCellStyle(styleTN);
                cellBody.setCellValue(suCoVO.getHuHong());

                cellBody = rowBody.createCell(4);
                cellBody.setCellValue(suCoVO.getXuLy());
                cellBody.setCellStyle(styleTN);

                cellBody = rowBody.createCell(5);
                cellBody.setCellValue(suCoVO.getKhacPhuc());
                cellBody.setCellStyle(styleTN);
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
    private String[] getSDateEdateFromWeekNo(int tuan, int nam){

        String[] dateRange=new String[2];
        Calendar cal = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
        try {
            cal.setTime(sdf.parse("01/01/"+ nam));
        } catch (ParseException e) {

        }
        cal.set(Calendar.WEEK_OF_YEAR, tuan);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        dateRange[0] = sdf.format(cal.getTime());
        cal.add(Calendar.DATE, 6);
        dateRange[1] = sdf.format(cal.getTime());
        return dateRange;
    }
}
