package vn.worklife.user.baocaotinhtrangcau.web;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
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
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.basicinformation.model.datatable.DatatableResponseCriteriasVO;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.baocaotinhtrangcau.model.BCTinhTrangCauVO;
import vn.worklife.user.baocaotinhtrangcau.model.BaoCaoReportCauVO;
import vn.worklife.user.baocaotinhtrangcau.service.impl.BCTinhTrangCauImpl;
import vn.worklife.user.quanlycau.model.CauVO;
import vn.worklife.user.quanlycau.model.TinhTrangCauVO;

import javax.annotation.Resource;
import javax.lang.model.element.Element;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Controller
public class BCTinhTrangCauController {
    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Autowired
    BCTinhTrangCauImpl bcTinhTrangCauImpl;

    @RequestMapping(value = "/worklife/user/baocaotinhtrangcau/bctinhtrangcau.do")
    public String index(Model model){
        WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
        if (worklifeUserVO == null){
            return "redirect:/login.do";
        }
        else {
            model.addAttribute("group_Id", worklifeUserVO.getGroupId());
            return "worklife/user/QuanLyTuyenDuong/bctinhtrangcau";
        }
    }
    @RequestMapping(value = "/worklife/user/baocaotinhtrangcau/getlisttinhtrangcau.do", method = RequestMethod.POST)
    public @ResponseBody
    List<CauVO> getListBaoCaoCau(HttpServletRequest request){
        int idGroup = Integer.parseInt(request.getParameter("idGroup"));
        int quy = Integer.parseInt(request.getParameter("quy"));
        int nam = Integer.parseInt(request.getParameter("nam"));
        List<CauVO> listData = new ArrayList<>();
        try{
            listData = this.bcTinhTrangCauImpl.selectListBaoCaoCauDf(idGroup, quy, nam);
            if (listData.size() == 0){
                listData = this.bcTinhTrangCauImpl.selectListBaoCaoCauDf(idGroup, -1, -1);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return listData;
    }
    @RequestMapping(value = "/worklife/user/baocaotinhtrangcau/getngaybaocao.do", method = RequestMethod.POST)
    public @ResponseBody
    BCTinhTrangCauVO getNgayBaoCao(HttpServletRequest request){
        BCTinhTrangCauVO bcTinhTrangCauVO = new BCTinhTrangCauVO();
        int quy = Integer.parseInt(request.getParameter("quy"));
        int nam = Integer.parseInt(request.getParameter("nam"));
        int idGroup = Integer.parseInt(request.getParameter("idGroup"));
        try{
            bcTinhTrangCauVO = this.bcTinhTrangCauImpl.getNgayBaoCao(quy, nam, idGroup);
        }catch (Exception e){
            e.printStackTrace();
        }
        return  bcTinhTrangCauVO;
    }
    @RequestMapping(value = "/worklife/user/baocaotinhtrangcau/saveForm.do", method = RequestMethod.POST)
    public @ResponseBody
    BCTinhTrangCauVO saveForm(@ModelAttribute("bcTinhTrangCauVO") BCTinhTrangCauVO bcTinhTrangCauVO){
        //Transaction
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try{
            for (TinhTrangCauVO tinhTrangCauVO: bcTinhTrangCauVO.getTinhTrangCauVOS()){
                if (tinhTrangCauVO.getNam() == 0 && tinhTrangCauVO.getQuy() == 0){
                    tinhTrangCauVO.setNam(bcTinhTrangCauVO.getNam());
                    tinhTrangCauVO.setQuy(bcTinhTrangCauVO.getQuy());
                    this.bcTinhTrangCauImpl.insertBCTTCau(tinhTrangCauVO);
                }
                else {
                    this.bcTinhTrangCauImpl.updateBCTTCau(tinhTrangCauVO);
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
        return bcTinhTrangCauVO;
    }
    @RequestMapping(value = "/worklife/user/baocaotinhtrangcau/report.do")
    public @ResponseBody void reportExcel(HttpServletRequest request, HttpServletResponse response, @RequestParam("quy") int quy, @RequestParam("nam") int nam, @RequestParam("idGroup") int idGroup) throws URISyntaxException, IOException {
        List<BaoCaoReportCauVO> listData = new ArrayList<>();
        try{
            listData = this.bcTinhTrangCauImpl.selectListBaoCaoReport(quy, nam, idGroup);
            for (BaoCaoReportCauVO baoCaoReportCauVO: listData){
                baoCaoReportCauVO.setCauVOS(this.bcTinhTrangCauImpl.selectListCau(quy, nam, baoCaoReportCauVO.getTenCau(), baoCaoReportCauVO.getIdTuyenDuong(), baoCaoReportCauVO.getIdHuyen(), baoCaoReportCauVO.getDonViQL()));
            }
        }catch (Exception e){
            e.printStackTrace();
        }

        //CREATE REPORT
        FileInputStream fileInputStream;
        String fileNameMain = "BaoCaoTinhTrangCau" + ".xlsx";
        String fileNameServer = "/worklife/reports/BaoCaoTinhTrangCau.xlsx";
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

        for(int i = 0 ; i < listData.size(); i++) {
            for (int j = 0; j < listData.get(i).getCauVOS().size(); j++) {
                Row dataRow = sheet.createRow(numRow);

                if (i + 1 < listData.size()) {
                    dataRow.createCell(1).setCellValue(i + 1);
                    dataRow.getCell(1).setCellStyle(stylePublic);
                }
                dataRow.createCell(0).setCellValue(i + 1);
                dataRow.getCell(0).setCellStyle(xssfCellStyle);

                dataRow.createCell(1).setCellValue(listData.get(i).getTenCau());
                dataRow.getCell(1).setCellStyle(xssfCellStyle);

                dataRow.createCell(2).setCellValue(listData.get(i).getTenDuong());
                dataRow.getCell(2).setCellStyle(xssfCellStyle);

                dataRow.createCell(3).setCellValue(listData.get(i).getCauVOS().get(j).getTenSongVuot());
                dataRow.getCell(3).setCellStyle(xssfCellStyle);

                dataRow.createCell(4).setCellValue(listData.get(i).getTenHuyen());
                dataRow.getCell(4).setCellStyle(xssfCellStyle);

                dataRow.createCell(5).setCellValue("Tỉnh Khánh Hòa");
                dataRow.getCell(5).setCellStyle(xssfCellStyle);

                dataRow.createCell(6).setCellValue(listData.get(i).getTenDonViQL());
                dataRow.getCell(6).setCellStyle(xssfCellStyle);

                dataRow.createCell(7).setCellValue(listData.get(i).getCauVOS().get(j).getLyTrinhKm());
                dataRow.getCell(7).setCellStyle(xssfCellStyle);

                dataRow.createCell(8).setCellValue(listData.get(i).getCauVOS().get(j).getChieuDai());
                dataRow.getCell(8).setCellStyle(xssfCellStyle);

                dataRow.createCell(9).setCellValue(listData.get(i).getCauVOS().get(j).getChieuRong());
                dataRow.getCell(9).setCellStyle(xssfCellStyle);

                dataRow.createCell(10).setCellValue(listData.get(i).getCauVOS().get(j).getBeRong_XeChay());
                dataRow.getCell(10).setCellStyle(xssfCellStyle);

                dataRow.createCell(11).setCellValue(listData.get(i).getCauVOS().get(j).getTinhKhong());
                dataRow.getCell(11).setCellStyle(xssfCellStyle);

                dataRow.createCell(12).setCellValue(listData.get(i).getCauVOS().get(j).getSoNhip());
                dataRow.getCell(12).setCellStyle(xssfCellStyle);

                dataRow.createCell(13).setCellValue(listData.get(i).getCauVOS().get(j).getSoDoNhip());
                dataRow.getCell(13).setCellStyle(xssfCellStyle);

                dataRow.createCell(14).setCellValue(listData.get(i).getCauVOS().get(j).getDaiNhip());
                dataRow.getCell(14).setCellStyle(xssfCellStyle);

                dataRow.createCell(15).setCellValue(listData.get(i).getCauVOS().get(j).getDangCau()==1?"X":"");
                dataRow.getCell(15).setCellStyle(xssfCellStyle);

                dataRow.createCell(16).setCellValue(listData.get(i).getCauVOS().get(j).getDangCau()==2?"X":"");
                dataRow.getCell(16).setCellStyle(xssfCellStyle);

                dataRow.createCell(17).setCellValue(listData.get(i).getCauVOS().get(j).getDangCau()==3?"X":"");
                dataRow.getCell(17).setCellStyle(xssfCellStyle);

                dataRow.createCell(18).setCellValue(listData.get(i).getCauVOS().get(j).getDangCau()==4?"X":"");
                dataRow.getCell(18).setCellStyle(xssfCellStyle);

                dataRow.createCell(19).setCellValue(listData.get(i).getCauVOS().get(j).getDangCau()==5?"X":"");
                dataRow.getCell(19).setCellStyle(xssfCellStyle);

                dataRow.createCell(20).setCellValue(listData.get(i).getCauVOS().get(j).getDangCau()==6?"X":"");
                dataRow.getCell(20).setCellStyle(xssfCellStyle);

                dataRow.createCell(22).setCellValue(listData.get(i).getCauVOS().get(j).getTenKCMo_Mong());
                dataRow.getCell(22).setCellStyle(xssfCellStyle);

                dataRow.createCell(23).setCellValue(listData.get(i).getCauVOS().get(j).getTenKCMo_Than());
                dataRow.getCell(23).setCellStyle(xssfCellStyle);

                dataRow.createCell(25).setCellValue(listData.get(i).getCauVOS().get(j).getTenKCTru_Mong());
                dataRow.getCell(25).setCellStyle(xssfCellStyle);

                dataRow.createCell(26).setCellValue(listData.get(i).getCauVOS().get(j).getTenKCTru_Than());
                dataRow.getCell(26).setCellStyle(xssfCellStyle);

                dataRow.createCell(27).setCellValue(listData.get(i).getCauVOS().get(j).getTaiTrong_TK());
                dataRow.getCell(27).setCellStyle(xssfCellStyle);

                dataRow.createCell(28).setCellValue(listData.get(i).getCauVOS().get(j).getTaiTrong_KT());
                dataRow.getCell(28).setCellStyle(xssfCellStyle);

                dataRow.createCell(29).setCellValue(listData.get(i).getCauVOS().get(j).getNamXD());
                dataRow.getCell(29).setCellStyle(xssfCellStyle);

                dataRow.createCell(30).setCellValue(listData.get(i).getCauVOS().get(j).getNamKT());
                dataRow.getCell(30).setCellStyle(xssfCellStyle);

                dataRow.createCell(31).setCellValue(listData.get(i).getCauVOS().get(j).getTenTinhTrang());
                dataRow.getCell(31).setCellStyle(xssfCellStyle);

                numRow++;
            }
            if (listData.get(i).getCauVOS().size() > 1){
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getCauVOS().size() - 1,0,0));
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getCauVOS().size() - 1,1,1));
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getCauVOS().size() - 1,2,2));
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getCauVOS().size() - 1,4,4));
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getCauVOS().size() - 1,5,5));
                sheet.addMergedRegion(new CellRangeAddress(rowMer,rowMer + listData.get(i).getCauVOS().size() - 1,6,6));
            }
            rowMer = listData.get(i).getCauVOS().size() + rowMer;
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
    }
}
