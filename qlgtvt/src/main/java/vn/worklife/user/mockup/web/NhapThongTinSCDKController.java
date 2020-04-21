package vn.worklife.user.mockup.web;

import org.apache.poi.ss.usermodel.*;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.user.mockup.model.LapDanhMucSCDKVO;
import vn.worklife.user.mockup.model.NhapThongTinSCDKVO;
import vn.worklife.user.mockup.service.impl.NhapThongTinSCDKImpl;

import javax.annotation.Resource;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

@Controller
public class NhapThongTinSCDKController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    NhapThongTinSCDKImpl nhapThongTinSCDK;

    @RequestMapping(value = "/worklife/user/suachuadinhky/nhapthongtinsuachuadinhky.do")
    public String indexDmScdk() {
        try {
            return "worklife/user/SuaChuaDinhKy/NhapThongTinSCDK";
        } catch (Exception e) {
            e.printStackTrace();
            return "redirect:/login.do";
        }
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/selectdmscdk.do", method = RequestMethod.POST)
    @ResponseBody
    public NhapThongTinSCDKVO selectDanhMucSCDK(HttpServletRequest request) {
        int nam = Integer.parseInt(request.getParameter("nam"));
        NhapThongTinSCDKVO nhapThongTinSCDKVO = new NhapThongTinSCDKVO();
        try {
            nhapThongTinSCDKVO.setNhapThongTinSCDKVOS(this.nhapThongTinSCDK.selectDanhMucSCDK(nam));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return nhapThongTinSCDKVO;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/nhapthongtinscdk/saveForm.do", method = RequestMethod.POST)
    public @ResponseBody NhapThongTinSCDKVO saveForm(@ModelAttribute("nhapThongTinSCDKVO") NhapThongTinSCDKVO nhapThongTinSCDKVO, RedirectAttributes rm){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            for (NhapThongTinSCDKVO nhapThongTinSCDKVo: nhapThongTinSCDKVO.getNhapThongTinSCDKVOS()){
                if (nhapThongTinSCDKVo.getIdScdk() == 0)
                    this.nhapThongTinSCDK.insertSCDK(nhapThongTinSCDKVo);
                else
                    this.nhapThongTinSCDK.updateSCDK(nhapThongTinSCDKVo);
            }
            transactionManager.commit(status);
            rm.addFlashAttribute("message", 1);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
            rm.addFlashAttribute("message", 3);
        }
        return nhapThongTinSCDKVO;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/nhapthongtinscdk/deleteSCDK.do", method = RequestMethod.POST)
    public @ResponseBody boolean deleteSCDK(@RequestBody() String[] lstId){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            for (String str_1 : lstId) {
                int idScdk = 0;
                try {
                    idScdk = Integer.parseInt(str_1);
                } catch (Exception e) {
                    idScdk = 0;
                    e.printStackTrace();
                }
                this.nhapThongTinSCDK.deleteSCDK(idScdk);
            }
            transactionManager.commit(status);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
        }
        return true;
    }
    @RequestMapping(value = "/worklife/user/suachuadinhky/nhapthongtinscdk/reportExcel.do")
    public @ResponseBody void reportExcel(HttpServletRequest request, HttpServletResponse response, @RequestParam("nam") int nam){
        try{
            List<NhapThongTinSCDKVO> listData = this.nhapThongTinSCDK.selectExcelDanhMucSCDK(nam);

            //CREATE REPORT
            FileInputStream fileInputStream;
            String fileNameMain = "NhapThongTinSCDK" + ".xlsx";
            String fileNameServer = "/worklife/reports/NhapThongTinSCDK.xlsx";
            URL url = getClass().getResource(fileNameServer);
            File fileServer = new File(url.toURI());
            fileInputStream = new FileInputStream(fileServer);

            XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream); //or new HSSFWorkbook();
            XSSFSheet sheet = workbook.getSheet("Sheet1");

            XSSFCellStyle stylePublic = workbook.createCellStyle();

            XSSFCellStyle stylePublic1 = workbook.createCellStyle();

            XSSFCellStyle xssfCellStyle = workbook.createCellStyle();

            stylePublic.setBorderBottom(BorderStyle.NONE);
            stylePublic.setBorderTop(BorderStyle.NONE);
            stylePublic.setBorderRight(BorderStyle.NONE);

            XSSFFont font = workbook.createFont();
            font.setBold(true);
            stylePublic1.setAlignment(HorizontalAlignment.CENTER);
            stylePublic1.setVerticalAlignment(VerticalAlignment.CENTER);
            stylePublic1.setFont(font);

            // Thêm dữ liệu vào header
            Row rowHeader= sheet.getRow(0);
            Cell cellHeader = rowHeader.getCell(0);
            String val = cellHeader.getStringCellValue();

            val = cellHeader.getStringCellValue();
            val = val.replaceAll("@nam",Integer.toString(nam));
            cellHeader.setCellValue(val);

            int rowNumber = 3;
            DecimalFormat numberFormatter = new DecimalFormat("#,###,###");
            for (int i = 0; i < listData.size(); i++){
                Row data = sheet.createRow(rowNumber);

                data.createCell(0).setCellValue(i + 1);
                data.getCell(0).setCellStyle(xssfCellStyle);

                String tenDuongCau = "";
                if (!listData.get(i).getTenDuongCau().equals(""))
                    tenDuongCau = "(" + listData.get(i).getTenDuongCau() + ")";
                String lyTrinh = "";
                if (!listData.get(i).getViTri().equals(""))
                    lyTrinh = "Lý trình: " + listData.get(i).getViTri();
                String diaDiem = "";
                if (!listData.get(i).getDiaDiem().equals(""))
                    diaDiem = "Địa điểm:" + listData.get(i).getDiaDiem();
                data.createCell(1).setCellValue("Công trình: "+listData.get(i).getTenHangMuc() + " " + listData.get(i).getTenCongTrinh() + tenDuongCau + ", "
                + lyTrinh + ", " + diaDiem);
                data.getCell(1).setCellStyle(stylePublic);
                String giaTrungThau = "";
                if (!listData.get(i).getGiaTrungThau().split("\\.")[0].equals(""))
                    giaTrungThau = numberFormatter.format(Integer.parseInt(listData.get(i).getGiaTrungThau().split("\\.")[0]));
                data.createCell(2).setCellValue(giaTrungThau);
                data.getCell(2).setCellStyle(stylePublic1);
                int length = listData.get(i).getIdDMTV_TC().split("\\,").length;
                String idDMTV_TC = "";
                if (length <= 1){
                    idDMTV_TC = listData.get(i).getIdDMTV_TC();
                }
                else if (length == 2){
                    idDMTV_TC = "LD " + listData.get(i).getIdDMTV_TC().split("\\,")[0] + " và " + listData.get(i).getIdDMTV_TC().split("\\,")[1];
                }
                else {
                    for (int j = 0; j < length; j++){
                        if (j < length - 2)
                            idDMTV_TC = "LD " + listData.get(i).getIdDMTV_TC().split("\\,")[j] + ", ";
                        else if (j == length - 2)
                            idDMTV_TC += listData.get(i).getIdDMTV_TC().split("\\,")[j] + " và ";
                        else
                            idDMTV_TC += listData.get(i).getIdDMTV_TC().split("\\,")[j];
                    }
                }
                data.createCell(3).setCellValue(idDMTV_TC);
                data.getCell(3).setCellStyle(xssfCellStyle);

                data.createCell(4).setCellValue(listData.get(i).getTenTVTK() == null?"":listData.get(i).getTenTVTK());
                data.getCell(4).setCellStyle(xssfCellStyle);

                data.createCell(5).setCellValue(listData.get(i).getTenTVGS() == null?"":listData.get(i).getTenTVGS());
                data.getCell(5).setCellStyle(xssfCellStyle);

                rowNumber ++;
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
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
