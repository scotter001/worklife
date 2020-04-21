/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.regularrepair.web;

import org.apache.ibatis.annotations.Param;
import org.apache.log4j.Logger;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.regularrepair.model.RegularRepairVO;
import vn.worklife.user.regularrepair.service.impl.RegularRepairServiceImpl;
import vn.worklife.user.util.DateUtils;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.time.LocalDate;
import java.time.temporal.IsoFields;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Controller
public class RegularRepairController {
    private static final Logger logger = Logger.getLogger(RegularRepairController.class);

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    RegularRepairServiceImpl regularRepairService;

    @RequestMapping("/worklife/user/repair/regular/index.do")
    public String index(Model m){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            m.addAttribute("group_Id", worklifeUserVO.getGroupId());
            m.addAttribute("year", DateUtils.getCurrentYear());
            m.addAttribute("quarter", LocalDate.now().get(IsoFields.QUARTER_OF_YEAR));
            return "/worklife/user/SuaChuaThuongXuyen/NhapKetQuaSuaChuaThuongXuyen";
        }
    }

    @RequestMapping(value = "/worklife/user/repair/regular/get-list.do",method = RequestMethod.POST)
    @ResponseBody
    public DanhMucSCTXVO getList(HttpServletRequest request){
        int quy = Integer.parseInt(request.getParameter("quy"));
        int nam = Integer.parseInt(request.getParameter("nam"));
        int tinhTrang = Integer.parseInt(request.getParameter("tinhTrang"));
        int idGroup = Integer.parseInt(request.getParameter("idGroup"));
        DanhMucSCTXVO danhMucSCTXVO = new DanhMucSCTXVO();
        try {
            danhMucSCTXVO.setDanhMucSCTXVOS(this.regularRepairService.selectTable(quy, nam, tinhTrang, idGroup));
        }catch(Exception e){
            logger.error(e.getMessage());
        }
        return danhMucSCTXVO;
    }

    @RequestMapping(value = "/worklife/user/repair/regular/get.do",method = RequestMethod.POST)
    @ResponseBody
    public RegularRepairVO get(@Param("idsctx") int idsctx){
        return this.regularRepairService.select(idsctx);
    }

    @RequestMapping(value = "/worklife/user/repair/regular/save.do",method = RequestMethod.POST)
    public String save(@ModelAttribute("danhMucSCTXVO") DanhMucSCTXVO danhMucSCTXVO, RedirectAttributes ra){
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            /*regularRepairVO.setNgaykiemtra(DateUtils.getCurrentDateDefault());*/
            for (DanhMucSCTXVO danhMucSCTXVo: danhMucSCTXVO.getDanhMucSCTXVOS()) {
                if (danhMucSCTXVo.getIdSctx() == 0) {
                    this.regularRepairService.insert(danhMucSCTXVo);
                } else {
                    this.regularRepairService.update(danhMucSCTXVo);
                }
            }
            ra.addFlashAttribute("message",1);
            transactionManager.commit(status);
        }catch(Exception e){
            logger.error(e.getMessage());
            transactionManager.rollback(status);
            ra.addFlashAttribute("message",3);
        }
        return "redirect:/worklife/user/repair/regular/index.do";
    }
    @RequestMapping(value = "/worklife/user/repair/regular/reportExcel.do", method = {RequestMethod.GET,RequestMethod.POST})
    public void reportExcel(@RequestParam("quy") int quy, @RequestParam("nam") int nam, @RequestParam("tinhTrang") int tinhTrang, @RequestParam("idGroup") int idGroup,HttpServletRequest request, HttpServletResponse response){
        List<DanhMucSCTXVO> listData;
        String groupName;
        try{
            listData = this.regularRepairService.selectTable(quy, nam, tinhTrang, idGroup);
            if (idGroup == -1)
                groupName = "Sở giao thông vận tải";
            else
                groupName = listData.get(0).getTenHatQL();

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
            for (DanhMucSCTXVO danhMucSCTXVO : listData) {
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
                cellBody.setCellValue(danhMucSCTXVO.getKeHoach_TH());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(6);
                cellBody.setCellValue(danhMucSCTXVO.getThoiGian_TH());
                cellBody.setCellStyle(xssfCellStyle);

                cellBody = rowBody.createCell(7);
                cellBody.setCellValue(danhMucSCTXVO.getGhiChu_TH());
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
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
