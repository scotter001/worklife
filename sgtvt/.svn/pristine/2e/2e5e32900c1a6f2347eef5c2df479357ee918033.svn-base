package vn.worklife.security.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class WorklifeFileManager {
	public static String getAvatarDir(WorklifeMultiLanguageController worklifeMultiLanguageController, String imageName) {
		return worklifeMultiLanguageController.getMessage("location.register.avatar") + File.separator + imageName;
	}
	
	public static String uploadAvatar(WorklifeMultiLanguageController worklifeMultiLanguageController, Logger logger, String dataURLcheme, String imageName, String username) throws Exception{
		String encodingPrefix = "base64,";
		int contentStartIndex = dataURLcheme.indexOf(encodingPrefix) + encodingPrefix.length();
		byte[] imageData = Base64.decodeBase64(dataURLcheme.substring(contentStartIndex));
		if (username.equals(""))
			username = "tmpAvatar";
		
		// Creating the directory to store file
		File dir = new File(worklifeMultiLanguageController.getMessage("location.register.avatar") + File.separator  + username);
		if (!dir.exists())
			dir.mkdirs();
			
		try {
			// Create the file on server
			File serverFile = new File(dir.getAbsolutePath() + File.separator + imageName);
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
			stream.write(imageData);
			stream.close();
			return imageName;
		} catch (Exception e) {
			logger.error(e);
			return "";
		}
	}

	public static void viewAvatar(String dirImage, HttpServletRequest request, HttpServletResponse response, Logger logger) throws Exception {
		File file = null;
		FileInputStream fis = null;

		BufferedInputStream in = null;
		ByteArrayOutputStream bStream = null;

		try {
		    file = new File(dirImage);
		    fis = new FileInputStream(file);

		    in = new BufferedInputStream(fis);
		    bStream = new ByteArrayOutputStream();

		    int imgByte;
		    while ((imgByte = in.read()) != -1) {
		    	bStream.write(imgByte);
		    }

			String type = "";
			String[] imageType = dirImage.split("\\.");
			if (imageType[imageType.length - 1] != null && !"".equals(imageType[imageType.length - 1])) {
			    if ("jpg".equals(imageType[imageType.length - 1].toLowerCase())) {
			    	type = "image/jpeg";
			    } else {
			    	type = "image/" + imageType[imageType.length - 1].toLowerCase();
			    }
			    
			    type = "image/" +imageType[imageType.length - 1].toLowerCase();

			} else {
				logger.debug("Image file type is null.");
			}

			response.setHeader("Content-Type", type);
			response.setContentLength(bStream.size());

			bStream.writeTo(response.getOutputStream());

			response.getOutputStream().flush();
			response.getOutputStream().close();

		} finally {
			if (bStream != null) {
				try {
					bStream.close();
				} catch (Exception ignore) {
				    logger.error("IGNORE: " + ignore);
				}
		    }
		    if (in != null) {
				try {
					in.close();
				} catch (Exception ignore) {
				    logger.error("IGNORE: " + ignore);
				}
		    }
		}
	}
	
	@RequestMapping("/worklife/manager/user/downloadFile.do")
	public void downloadFileFromServer(HttpServletRequest request, HttpServletResponse response, @RequestParam("folderName") String folderName) throws Exception {
		/*String pathFile = request.getParameter("pathFile");
		File fileDown = new File(pathFile + request.getParameter("fileName"));*/
		String uploadDir = WorklifePropertiesGetter.getProperty("Globals.fileStorePath", "globals.properties");
		File fileDown = new File(uploadDir +  folderName + "/" + request.getParameter("fileName"));
		String filename = request.getParameter("fileName");
		if (fileDown != null) {
			String mimetype = "application/x-msdownload";
			response.setContentType(mimetype);
			response.setHeader("Content-Disposition", "inline; filename=" + filename);
			response.setContentLength((int) fileDown.length());
			BufferedInputStream in = null;
			BufferedOutputStream out = null;
			try {
				in = new BufferedInputStream(new FileInputStream(fileDown));
				out = new BufferedOutputStream(response.getOutputStream());

				FileCopyUtils.copy(in, out);
				out.flush();
			} catch (Exception ex) {
				throw ex;
			} finally {
				if (in != null) {
					try {
						in.close();
					} catch (Exception ignore) {
						throw ignore;
					}
				}
				if (out != null) {
					try {
						out.close();
					} catch (Exception ignore) {
						throw ignore;
					}
				}
			}
		}
	}
	
}
