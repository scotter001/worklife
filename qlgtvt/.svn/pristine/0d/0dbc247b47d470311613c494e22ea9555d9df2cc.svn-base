package vn.worklife.user.comfirmcategoryupdate.web;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.worklife.basicinformation.model.datatable.DatatableJSonVO;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.security.util.WorklifeUserManager;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.mockup.model.SuCoVO;
import vn.worklife.user.settupcategoryupdate.model.SettupCategoryUpdateVO;
import vn.worklife.user.settupcategoryupdate.service.SettupCategoryUpdateService;
import vn.worklife.user.settupcategoryupdate.service.impl.SettupCategoryUpdateServiceImpl;

/**
 * Copyright (c) 2018. Author : TienSinh
 */
@Controller
public class SettupCategoryUpdateController {
	@Autowired
	PlatformTransactionManager transactionManager;

	@Autowired
	SettupCategoryUpdateServiceImpl settupCategoryUpdateServiceImpl;

	@RequestMapping(value = "/worklife/user/suachuathuongxuyen/duyetdanhmucsuachuathuongxuyen.do", method = RequestMethod.GET)
	public String DuyetDanhMucSuaChuaThuongXuyen(Model model){
		WorklifeUserVO worklifeUserVO =  WorklifeUserManager.getLoginUser();
		if (worklifeUserVO == null){
			return "redirect:/login.do";
		}
		else {
			model.addAttribute("group_Id", worklifeUserVO.getGroupId());
			Date date = new Date();
			Calendar cal = Calendar.getInstance();
			cal.setTime(date);
			int month = cal.get(Calendar.MONTH) + 1;
			int year = cal.get(Calendar.YEAR);
			model.addAttribute("month", month);
			model.addAttribute("year", year);
			return "/worklife/user/SuaChuaThuongXuyen/DuyetDanhMucSuaChuaThuongXuyen";
		}
	}
	@RequestMapping(value = "/worklife/user/comfirmcategoryupdate/getlist.do", method = RequestMethod.POST)
	public @ResponseBody DanhMucSCTXVO getList(Locale locale, RedirectAttributes rm, HttpServletRequest request, @RequestParam("nam") int nam, @RequestParam("quy") int quy, @RequestParam("idGroup") int idGroup) {
		DanhMucSCTXVO danhMucSCTXVO = new DanhMucSCTXVO();
		try {
			danhMucSCTXVO.setDanhMucSCTXVOS(this.settupCategoryUpdateServiceImpl.selectListDuyetSCTX(nam, quy, idGroup));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return danhMucSCTXVO;
	}
	@RequestMapping(value = "/worklife/user/comfirmcategoryupdate/saveForm.do", method = RequestMethod.POST)
	public String saveForm(@ModelAttribute("danhMucSCTXVO") DanhMucSCTXVO danhMucSCTXVO, RedirectAttributes rm){
		DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
		td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
		TransactionStatus status = transactionManager.getTransaction(td);
		try{
			for (DanhMucSCTXVO danhMucSCTXVo: danhMucSCTXVO.getDanhMucSCTXVOS()){
				this.settupCategoryUpdateServiceImpl.updateDuyetSCTX(danhMucSCTXVo);
			}
			transactionManager.commit(status);
			rm.addFlashAttribute("message", 1);
		}catch (Exception e){
			e.printStackTrace();
			transactionManager.rollback(status);
			rm.addFlashAttribute("message", 3);
		}
		return "redirect:/worklife/user/suachuathuongxuyen/duyetdanhmucsuachuathuongxuyen.do";
	}
	@RequestMapping(value = "/worklife/user/comfirmcategoryupdate/reportExcel.do")
	public @ResponseBody void reportExcel(HttpServletRequest request, HttpServletResponse response, @RequestParam("quy") int quy, @RequestParam("nam") int nam, @RequestParam("idGroup") int idGroup) throws URISyntaxException, IOException {
		String groupName = "";
		List<DanhMucSCTXVO> danhMucSCTXVOList = new ArrayList<>();
		try{
			danhMucSCTXVOList = this.settupCategoryUpdateServiceImpl.selectListDuyetSCTX(nam, quy, idGroup);
		}catch (Exception e){
			e.printStackTrace();
		}
		if (idGroup == -1)
			groupName = "Sở giao thông vận tải";
		else
			groupName = danhMucSCTXVOList.get(0).getTenHatQL();

		//CREATE REPORT
		FileInputStream fileInputStream;
		String fileNameMain = "DuyetDanhMucSCTX" + ".xlsx";
		String fileNameServer = "/worklife/reports/DuyetDanhMucSCTX.xlsx";
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

		int rownum = 6;
		int stt = 1;
		Row rowBody;
		Cell cellBody;
		DecimalFormat numberFormatter = new DecimalFormat("#,###,###");

		for (DanhMucSCTXVO danhMucSCTXVO : danhMucSCTXVOList) {
			rowBody = sheet.createRow(rownum++);

			cellBody = rowBody.createCell(0);
			cellBody.setCellValue(stt++);
			cellBody.setCellStyle(stylePublic);
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

			cellBody = rowBody.createCell(9);
			cellBody.setCellValue(danhMucSCTXVO.getCongThucDuyet());
			cellBody.setCellStyle(xssfCellStyle);

			cellBody = rowBody.createCell(10);
			cellBody.setCellValue("=");
			cellBody.setCellStyle(xssfCellStyle);

			cellBody = rowBody.createCell(11);
			cellBody.setCellValue(danhMucSCTXVO.getKlDuyet_CT());
			cellBody.setCellStyle(xssfCellStyle);

			cellBody = rowBody.createCell(12);
			cellBody.setCellValue(danhMucSCTXVO.getKlDuyet_Tong());
			cellBody.setCellStyle(xssfCellStyle);

			cellBody = rowBody.createCell(13);
			cellBody.setCellValue(numberFormatter.format(Integer.parseInt(danhMucSCTXVO.getKinhPhi().split("\\.")[0])));
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
	}
}
