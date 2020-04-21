/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.util.file.web;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import vn.worklife.user.util.UploadFileUtil;
import vn.worklife.user.util.file.model.FileUploadVO;
import vn.worklife.user.util.file.service.impl.FileUploadServiceImpl;

import javax.annotation.Resource;
import javax.mail.internet.MimeUtility;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.List;

@Controller
public class FileUploadController {
	private Logger logger = Logger.getLogger(this.getClass());

	@Resource(name = "transactionManager")
	private PlatformTransactionManager transactionManager;
	
	@Resource(name="FileUploadServiceImpl")
	private FileUploadServiceImpl fileUploadServiceImpl;
	
	@RequestMapping(value = "/worklife/user/file/json/downloadfile.do")
	public void downLoadFile(@RequestParam("idParent") int idParent,@RequestParam("idLoaiTaiLieu") int idLoaiTaiLieu,HttpServletRequest request,HttpServletResponse response) throws Exception {
		List<FileUploadVO> listfile = null ;
		try {
			listfile = fileUploadServiceImpl.selectDataDownloadFileByIdParentAndLoaiTaiLieu(idParent, idLoaiTaiLieu);
		} catch (Exception e) {
			logger.info("Error download:  "+e.getMessage());
		}
		if(listfile != null){
			FileUploadVO file = listfile.get(0);
			String mimetype = "application/x-msdownload";
			response.setContentType(mimetype);
			String user_agent = request.getHeader("user-agent");
			boolean isInternetExplorer = (user_agent.indexOf("MSIE") > -1);
			if (isInternetExplorer) {
			    response.setHeader("Content-disposition", "attachment; filename=\"" + URLEncoder.encode(file.getTen().trim(), "utf-8") + "\"");
			} else {
		        response.addHeader("Content-disposition","attachment; filename=\"" + MimeUtility.encodeWord(file.getTen().trim(),"UTF-8","B")  + "\"");
			}
	        response.setContentLength(file.getDoDai());
	        ServletOutputStream out = response.getOutputStream();
	        logger.info("Before decompress : "+file.getNoiDung().length);
	        byte[] decompress = UploadFileUtil.decompress(file.getNoiDung(),file.getDoDai());
	        logger.info("After decompress : "+decompress.length);
	        out.write(decompress);
	        out.flush();
		}
	}
	@RequestMapping(value = "/worklife/user/file/json/deleteFile.do")
	public @ResponseBody boolean deleteFile(@RequestParam("idParent") int idParent,@RequestParam("idLoaiTaiLieu") int idLoaiTaiLieu) {
		try {
		    if(idParent != 0){
				List<FileUploadVO> listFile = fileUploadServiceImpl.selectDataFileByIdParentAndLoaiTaiLieu(idParent, idLoaiTaiLieu);
				if(listFile != null && listFile.size() > 0 && listFile.get(0).getId() != 0){
					this.fileUploadServiceImpl.deleteFileUploadVO(listFile.get(0));
				}
			}
		} catch (Exception e) {
			logger.info("Error delete file: "+ e.getMessage());
			return false;
		}
		return true;
	}
	@RequestMapping(value = "/worklife/user/file/downloadfile.do")
	public void downLoadFile(@RequestParam("idFile") int idFile,HttpServletRequest request,HttpServletResponse response) throws Exception {
	
		FileUploadVO file = new FileUploadVO();
		try {
			file = fileUploadServiceImpl.selectFileAttachByID(idFile);
		} catch (Exception e) {
			logger.info("Error download:  "+e.getMessage());
		}
		
		String mimetype = "application/x-msdownload";
		response.setContentType(mimetype);
		String user_agent = request.getHeader("user-agent");
		boolean isInternetExplorer = (user_agent.indexOf("MSIE") > -1);
		if (isInternetExplorer) {
		    response.setHeader("Content-disposition", "attachment; filename=\"" + URLEncoder.encode(file.getTen().trim(), "utf-8") + "\"");
		}
		else {
	        response.addHeader("Content-disposition","attachment; filename=\"" + MimeUtility.encodeWord(file.getTen().trim())  + "\"");
		}
        logger.info(file.getTen());
        response.setContentLength(file.getDoDai());
        ServletOutputStream out = response.getOutputStream();
        logger.info("Before decompress : "+file.getNoiDung().length);
        byte[] decompress = UploadFileUtil.decompress(file.getNoiDung(),file.getDoDai());
        logger.info("After decompress : "+decompress.length);
        out.write(decompress);
        out.flush();
		
	}
	@RequestMapping(value = "/worklife/user/file/json/deletefilebyid.do")
	public @ResponseBody boolean deleteFileById(@RequestParam("id") int id) {
		try {
			FileUploadVO condition = new FileUploadVO();
			condition.setId(id);
			this.fileUploadServiceImpl.deleteFileUploadVO(condition);
		} catch (Exception e) {
			logger.info("Error delete file: "+ e.getMessage());
			return false;
		}
		return true;
	}
}
