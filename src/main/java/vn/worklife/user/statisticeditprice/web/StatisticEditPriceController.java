package vn.worklife.user.statisticeditprice.web;

import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;

import vn.worklife.basicinformation.model.datatable.DatatableJSonVO;
import vn.worklife.user.settupcategoryupdate.model.SettupCategoryUpdateVO;
import vn.worklife.user.statisticeditprice.service.impl.StatisticEditPriceServiceImpl;

@Controller
public class StatisticEditPriceController {
	@Autowired StatisticEditPriceServiceImpl statisticEditPriceServiceImpl;
	@RequestMapping(value = "/worklife/user/thongkesctx/thongkekinhphisctx.do", method = RequestMethod.GET)
	public String ThongKeKinhPhiSCTX(){
		return "/worklife/user/ThongKeSCTX/ThongKeKinhPhiSCTX";
	}
	@RequestMapping(value = "/worklife/user/thongkesctx/getlistquy.do", method = RequestMethod.POST)
	public @ResponseBody String getListQuarter(Locale locale, RedirectAttributes rm, HttpServletRequest request,@RequestParam("nam") int nam) {
		String objectJS = null;
		try {
			List<HashMap<Object, Object>> list;
			list = this.statisticEditPriceServiceImpl.selecteListQuarter(nam);
			ObjectMapper mapJson = new ObjectMapper();
			DatatableJSonVO<HashMap<Object, Object>> dt = new DatatableJSonVO<>();
			dt.setData(list);
			objectJS = mapJson.writeValueAsString(dt);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return objectJS;
	}
	@RequestMapping(value = "/worklife/user/thongkesctx/getlistnam.do", method = RequestMethod.POST)
	public @ResponseBody String getcListFiveYear(Locale locale, RedirectAttributes rm, HttpServletRequest request,@RequestParam("nam") int nam) {
		String objectJS = null;
		List<Integer> years= new ArrayList<>();
		try {
			List<HashMap<Object, Object>> list;
			for(int i=nam;i>(nam-5);i--)
			{  
				years.add(Integer.valueOf(i));
				
			}
			list = this.statisticEditPriceServiceImpl.selecteListFiveYear(nam);
			ObjectMapper mapJson = new ObjectMapper();
			DatatableJSonVO<HashMap<Object, Object>> dt = new DatatableJSonVO<HashMap<Object, Object>>();
			dt.setData(list);
			objectJS = mapJson.writeValueAsString(dt);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return objectJS;
	}
	@RequestMapping(value = "/worklife/user/thongkesctx/reportExcelToYear.do")
	public @ResponseBody void reportExcelToYear(HttpServletRequest request, HttpServletResponse response,@RequestParam("toYear") int toYear){
		List<Integer> years= new ArrayList<>();
		try {
			List<HashMap<Object, Object>> list;
			for (int i = toYear; i > (toYear - 5); i--) {
				years.add(Integer.valueOf(i));
			}
			list = this.statisticEditPriceServiceImpl.selecteListFiveYear(toYear);

			//CREATE REPORT
			FileInputStream fileInputStream;
			String fileNameMain = "ThongKeKinhPhiSuaChuaTheoNam" + ".xlsx";
			String fileNameServer = "/worklife/reports/ThongKeKinhPhiSuaChuaTheoNam.xlsx";
			URL url = getClass().getResource(fileNameServer);
			File fileServer = new File(url.toURI());
			fileInputStream = new FileInputStream(fileServer);

			XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream); //or new HSSFWorkbook();
			XSSFSheet sheet = workbook.getSheet("Sheet1");

			XSSFCellStyle stylePublic = workbook.createCellStyle();

			XSSFCellStyle xssfCellStyle = workbook.createCellStyle();

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
			Row rowHeader= sheet.getRow(1);
			Cell cellHeader = rowHeader.getCell(0);
			String val = cellHeader.getStringCellValue();

			val = cellHeader.getStringCellValue();
			val = val.replaceFirst("@year",Integer.toString(toYear));
			cellHeader.setCellValue(val);

			int numHeader = 3;
			int rowNumber = 4;
			int stt = 1;
			for (int i = 0; i < list.size(); i++) {
				Row dataRow = sheet.createRow(numHeader);

				dataRow.createCell(0).setCellValue("TT");
				dataRow.getCell(0).setCellStyle(stylePublic);

				dataRow.createCell(1).setCellValue("Tên hạt quản lý giao thông");
				dataRow.getCell(1).setCellStyle(stylePublic);

				dataRow.createCell(2).setCellValue("Năm " + (toYear - 4));
				dataRow.getCell(2).setCellStyle(stylePublic);

				dataRow.createCell(3).setCellValue("Năm " + (toYear - 3));
				dataRow.getCell(3).setCellStyle(stylePublic);

				dataRow.createCell(4).setCellValue("Năm " + (toYear - 2));
				dataRow.getCell(4).setCellStyle(stylePublic);

				dataRow.createCell(5).setCellValue("Năm " + (toYear - 1));
				dataRow.getCell(5).setCellStyle(stylePublic);

				dataRow.createCell(6).setCellValue("Năm " + (toYear));
				dataRow.getCell(6).setCellStyle(stylePublic);

				Row dtRow = sheet.createRow(rowNumber);

				dtRow.createCell(0).setCellValue(i + 1);
				dtRow.getCell(0).setCellStyle(xssfCellStyle);

				dtRow.createCell(1).setCellValue(""+list.get(i).get("ten"));
				dtRow.getCell(1).setCellStyle(xssfCellStyle);

				String nam4;
				if (list.get(i).get("nam4").equals(""))
					nam4 = "";
				else
					nam4 = String.format("%,3f",Float.parseFloat(""+list.get(i).get("nam4"))).split("\\.")[0];
				dtRow.createCell(2).setCellValue(nam4);
				dtRow.getCell(2).setCellStyle(xssfCellStyle);

				String nam3;
				if (list.get(i).get("nam3").equals(""))
					nam3 = "";
				else
					nam3 = String.format("%,3f",Float.parseFloat(""+list.get(i).get("nam3"))).split("\\.")[0];
				dtRow.createCell(3).setCellValue(nam3);
				dtRow.getCell(3).setCellStyle(xssfCellStyle);

				String nam2;
				if (list.get(i).get("nam2").equals(""))
					nam2 = "";
				else
					nam2 = String.format("%,3f",Float.parseFloat(""+list.get(i).get("nam2"))).split("\\.")[0];
				dtRow.createCell(4).setCellValue(nam2);
				dtRow.getCell(4).setCellStyle(xssfCellStyle);

				String nam1;
				if (list.get(i).get("nam1").equals(""))
					nam1 = "";
				else
					nam1 = String.format("%,3f",Float.parseFloat(""+list.get(i).get("nam1"))).split("\\.")[0];
				dtRow.createCell(5).setCellValue(nam1);
				dtRow.getCell(5).setCellStyle(xssfCellStyle);

				String nam0;
				if (list.get(i).get("nam0").equals(""))
					nam0 = "";
				else
					nam0 = String.format("%,3f",Float.parseFloat(""+list.get(i).get("nam0"))).split("\\.")[0];
				dtRow.createCell(6).setCellValue(nam0);
				dtRow.getCell(6).setCellStyle(xssfCellStyle);

				rowNumber++;
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
	@RequestMapping(value = "/worklife/user/thongkesctx/reportExcelQuy.do")
	public @ResponseBody void reportExportQuy(HttpServletRequest request, HttpServletResponse response,@RequestParam("nam") int nam){
		try{
			List<HashMap<Object, Object>> list;
			list = this.statisticEditPriceServiceImpl.selecteListQuarter(nam);

			//CREATE REPORT
			FileInputStream fileInputStream;
			String fileNameMain = "ThongKeKinhPhiSuaChuaTheoQuy" + ".xlsx";
			String fileNameServer = "/worklife/reports/ThongKeKinhPhiSuaChuaTheoQuy.xlsx";
			URL url = getClass().getResource(fileNameServer);
			File fileServer = new File(url.toURI());
			fileInputStream = new FileInputStream(fileServer);

			XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream); //or new HSSFWorkbook();
			XSSFSheet sheet = workbook.getSheet("Sheet1");

			XSSFCellStyle stylePublic = workbook.createCellStyle();

			XSSFCellStyle xssfCellStyle = workbook.createCellStyle();

			// Thêm dữ liệu vào header
			Row rowHeader= sheet.getRow(1);
			Cell cellHeader = rowHeader.getCell(0);
			String val = cellHeader.getStringCellValue();

			val = cellHeader.getStringCellValue();
			val = val.replaceFirst("@year",Integer.toString(nam));
			cellHeader.setCellValue(val);

			xssfCellStyle.setAlignment(HorizontalAlignment.CENTER);
			xssfCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

			int rowNumber = 3;
			for (int i = 0; i < list.size(); i++) {
				Row dtRow = sheet.createRow(rowNumber);

				dtRow.createCell(0).setCellValue(i + 1);
				dtRow.getCell(0).setCellStyle(xssfCellStyle);

				dtRow.createCell(1).setCellValue(""+list.get(i).get("ten"));
				dtRow.getCell(1).setCellStyle(xssfCellStyle);

				String quy1;
				if (list.get(i).get("quy1").equals(""))
					quy1 = "";
				else
					quy1 = String.format("%,3f",Float.parseFloat(""+list.get(i).get("quy1"))).split("\\.")[0];
				dtRow.createCell(2).setCellValue(quy1);
				dtRow.getCell(2).setCellStyle(xssfCellStyle);

				String quy2;
				if (list.get(i).get("quy2").equals(""))
					quy2 = "";
				else
					quy2 = String.format("%,3f",Float.parseFloat(""+list.get(i).get("quy2"))).split("\\.")[0];
				dtRow.createCell(3).setCellValue(quy2);
				dtRow.getCell(3).setCellStyle(xssfCellStyle);

				String quy3;
				if (list.get(i).get("quy3").equals(""))
					quy3 = "";
				else
					quy3 = String.format("%,3f",Float.parseFloat(""+list.get(i).get("quy3"))).split("\\.")[0];
				dtRow.createCell(4).setCellValue(quy3);
				dtRow.getCell(4).setCellStyle(xssfCellStyle);

				String quy4;
				if (list.get(i).get("quy4").equals(""))
					quy4 = "";
				else
					quy4 = String.format("%,3f",Float.parseFloat(""+list.get(i).get("quy4"))).split("\\.")[0];
				dtRow.createCell(5).setCellValue(quy4);
				dtRow.getCell(5).setCellStyle(xssfCellStyle);

				rowNumber++;
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
		}catch (Exception e){
			e.printStackTrace();
		}
	}
}
