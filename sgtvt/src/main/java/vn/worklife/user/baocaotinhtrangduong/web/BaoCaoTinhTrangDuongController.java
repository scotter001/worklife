package vn.worklife.user.baocaotinhtrangduong.web;

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
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.baocaotinhtrangduong.model.BCTTDuongVO;
import vn.worklife.user.baocaotinhtrangduong.model.BaoCaoReportVO;
import vn.worklife.user.baocaotinhtrangduong.service.impl.BaoCaoTinhTrangDuongImpl;
import vn.worklife.user.quanlytuyenduong.model.LyTrinhVO;
import vn.worklife.user.quanlytuyenduong.model.TinhTrangDuongVO;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Controller
public class BaoCaoTinhTrangDuongController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    BaoCaoTinhTrangDuongImpl baoCaoTinhTrangDuongImpl;

    @RequestMapping(value = "/worklife/user/baocaotinhtrangduong/bctinhtrangduong.do")
    public String index(Model model){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("group_Id", worklifeUserVO.getGroupId());
            return "worklife/user/QuanLyTuyenDuong/bctinhtrangduong";
        }
    }
    @RequestMapping(value = "/worklife/user/baocaotinhtrangduong/getlisttinhtrangduong.do", method = RequestMethod.POST)
    public @ResponseBody
    List<LyTrinhVO> getListData(HttpServletRequest request){
        int idGroup = Integer.parseInt(request.getParameter("idGroup"));
        int quy = Integer.parseInt(request.getParameter("quy"));
        int nam = Integer.parseInt(request.getParameter("nam"));
        List<LyTrinhVO> listData = new ArrayList<>();
        try{
            listData = this.baoCaoTinhTrangDuongImpl.selectListDataDf(idGroup, quy, nam);
            if (listData.size() == 0){
                listData = this.baoCaoTinhTrangDuongImpl.selectListDataDf(idGroup, -1, -1);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/baocaotinhtrangduong/saveForm.do", method = RequestMethod.POST)
    public @ResponseBody
    BCTTDuongVO saveForm(@ModelAttribute("bcttDuongVO") BCTTDuongVO bcttDuongVO){
        //Transaction
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            for (TinhTrangDuongVO tinhTrangDuongVO: bcttDuongVO.getTinhTrangDuongVOS()){
                if (tinhTrangDuongVO.getNam() == 0 && tinhTrangDuongVO.getQuy() == 0){
                    tinhTrangDuongVO.setNam(bcttDuongVO.getNam());
                    tinhTrangDuongVO.setQuy(bcttDuongVO.getQuy());
                    this.baoCaoTinhTrangDuongImpl.insertBCTTDuong(tinhTrangDuongVO);
                }
                else {
                    this.baoCaoTinhTrangDuongImpl.updateBCTTDuong(tinhTrangDuongVO);
                }
            }
            transactionManager.commit(status);
        }catch (Exception e){
            e.printStackTrace();
            transactionManager.rollback(status);
        }finally {
            if (!status.isCompleted())
                transactionManager.rollback(status);
        }
        return bcttDuongVO;
    }
    @RequestMapping(value = "/worklife/user/baocaotinhtrangduong/getngaybaocao.do", method = RequestMethod.POST)
    public @ResponseBody BCTTDuongVO getNgayBC(HttpServletRequest request){
        BCTTDuongVO bcttDuongVO = new BCTTDuongVO();
        int quy = Integer.parseInt(request.getParameter("quy"));
        int nam = Integer.parseInt(request.getParameter("nam"));
        int idGroup = Integer.parseInt(request.getParameter("idGroup"));
        try{
            bcttDuongVO = this.baoCaoTinhTrangDuongImpl.getNgayBaoCao(quy, nam, idGroup);
        }catch (Exception e){
            e.printStackTrace();
        }
        return  bcttDuongVO;
    }
    @RequestMapping(value = "/worklife/user/baocaotinhtrangduong/report.do")
    public @ResponseBody void report(HttpServletRequest request, HttpServletResponse response, @RequestParam("quy") int quy, @RequestParam("nam") int nam, @RequestParam("idGroup") int idGroup) throws URISyntaxException, IOException {
        List<BaoCaoReportVO> listData = new ArrayList<>();
        try{
            listData = this.baoCaoTinhTrangDuongImpl.selectListLTReport(quy, nam, idGroup);
            for (BaoCaoReportVO baoCaoReportVO: listData){
                baoCaoReportVO.setLyTrinhReportVOS(this.baoCaoTinhTrangDuongImpl.selectListLyTrinh(baoCaoReportVO.getIddh()));
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        //CREATE REPORT
        FileInputStream fileInputStream;
        String fileNameMain = "BaoCaoTinhTrangDuong" + ".xlsx";
        String fileNameServer = "/worklife/reports/BaoCaoTinhTrangDuong.xlsx";
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

        int numRow = 7;
        int rowMer = 7;

        xssfCellStyle.setAlignment(HorizontalAlignment.CENTER);
        xssfCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        for(int i = 0 ; i < listData.size(); i++) {
            for (int j = 0; j < listData.get(i).getLyTrinhReportVOS().size(); j++){
                Row dataRow = sheet.createRow(numRow);

                if(i+1 < listData.size()) {
                    dataRow.createCell(1).setCellValue(i+1);
                    dataRow.getCell(1).setCellStyle(stylePublic);
                }
                dataRow.createCell(0).setCellValue(i+1);
                dataRow.getCell(0).setCellStyle(xssfCellStyle);

                dataRow.createCell(1).setCellValue(listData.get(i).getTenDuong());
                dataRow.getCell(1).setCellStyle(xssfCellStyle);

                dataRow.createCell(2).setCellValue("Khánh Hòa");
                dataRow.getCell(2).setCellStyle(xssfCellStyle);

                dataRow.createCell(4).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getDiemDau_Tu());
                dataRow.getCell(4).setCellStyle(xssfCellStyle);

                dataRow.createCell(5).setCellValue("+");
                dataRow.getCell(5).setCellStyle(xssfCellStyle);

                dataRow.createCell(6).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getDiemDau_Den());
                dataRow.getCell(6).setCellStyle(xssfCellStyle);

                dataRow.createCell(7).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getDiemCuoi_Tu());
                dataRow.getCell(7).setCellStyle(xssfCellStyle);

                dataRow.createCell(8).setCellValue("+");
                dataRow.getCell(8).setCellStyle(xssfCellStyle);

                dataRow.createCell(9).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getDiemCuoi_Den());
                dataRow.getCell(9).setCellStyle(xssfCellStyle);

                dataRow.createCell(10).setCellValue(listData.get(i).getDiaDanh_DiemDau());
                dataRow.getCell(10).setCellStyle(xssfCellStyle);

                dataRow.createCell(11).setCellValue(listData.get(i).getDiaDanh_DiemCuoi());
                dataRow.getCell(11).setCellStyle(xssfCellStyle);

                String chieuDai = listData.get(i).getLyTrinhReportVOS().get(j).getChieuDai();
                dataRow.createCell(12).setCellValue(String.format("%.3f",Float.parseFloat(chieuDai)).replace(".",","));
                dataRow.getCell(12).setCellStyle(xssfCellStyle);

                dataRow.createCell(13).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getRongNen());
                dataRow.getCell(13).setCellStyle(xssfCellStyle);

                dataRow.createCell(14).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getRongMat());
                dataRow.getCell(14).setCellStyle(xssfCellStyle);

                dataRow.createCell(15).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getTenKetCau());
                dataRow.getCell(15).setCellStyle(stylePublic);

                dataRow.createCell(16).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getDiaHinh()==1?"X":"");
                dataRow.getCell(16).setCellStyle(xssfCellStyle);

                dataRow.createCell(17).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getDiaHinh()==2?"X":"");
                dataRow.getCell(17).setCellStyle(xssfCellStyle);

                dataRow.createCell(18).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getTenCapQL());
                dataRow.getCell(18).setCellStyle(stylePublic);

                dataRow.createCell(19).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getTinhTrang());
                dataRow.getCell(19).setCellStyle(stylePublic);

                dataRow.createCell(20).setCellValue(listData.get(i).getLyTrinhReportVOS().get(j).getGhiChu());
                dataRow.getCell(20).setCellStyle(stylePublic);
                numRow++;
            }
            if (listData.get(i).getLyTrinhReportVOS().size() > 1){
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getLyTrinhReportVOS().size() - 1,0,0));
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getLyTrinhReportVOS().size() - 1,1,1));
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getLyTrinhReportVOS().size() - 1,2,2));
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getLyTrinhReportVOS().size() - 1,10,10));
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getLyTrinhReportVOS().size() - 1,11,11));
            }
            rowMer = listData.get(i).getLyTrinhReportVOS().size() + rowMer;
        }

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
    }
}
