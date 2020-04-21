/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.util;


import net.jpountz.lz4.LZ4Compressor;
import net.jpountz.lz4.LZ4Factory;
import net.jpountz.lz4.LZ4FastDecompressor;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.web.multipart.MultipartFile;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.TaiLieuCongTrinhVO;
import vn.worklife.security.util.WorklifePropertiesGetter;
import vn.worklife.user.mockup.model.PhapLySCDKVO;
import vn.worklife.user.quanlyquyhoach.model.BanVeQuyHoachVO;
import vn.worklife.user.quanlyquyhoach.model.TaiLieuQuyHoachVO;
import vn.worklife.user.util.file.model.FileUploadBCSuCoVO;
import vn.worklife.user.util.file.model.FileUploadVO;
import vn.worklife.user.util.file.service.impl.FileUploadServiceImpl;

import javax.annotation.Resource;
import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
public class UploadFileUtil {
	@Resource(name = "transactionManager")
	private PlatformTransactionManager transactionManager;
	
	@Resource(name="FileUploadServiceImpl")
	public FileUploadServiceImpl fileUploadServiceImpl;
	
	Logger logger = Logger.getLogger(UploadFileUtil.class);
	
	//Upload file server

	public boolean uploadFile(MultipartFile file, String subdir){
		String uploadDir = WorklifePropertiesGetter.getProperty("Globals.fileStorePath", "globals.properties");
		File dir = new File(uploadDir + subdir);
		if (!dir.exists())
			dir.mkdirs();
		InputStream inputStream = null;
		try {
			if (file != null) {
				if (!file.getOriginalFilename().equalsIgnoreCase("")) {
					inputStream = file.getInputStream();
					File serverFile = new File(dir.getAbsolutePath() + File.separator + file.getOriginalFilename());
					OutputStream os = null;
					try {
						os = new FileOutputStream(serverFile);
						byte[] buf = new byte[1024];
						int c = 0;
						while ((c = inputStream.read(buf)) != -1) {
							os.write(buf, 0, c);
						}
						os.flush();
						os.close();
					} catch (Exception e) {
						logger.error(e);
					} finally {
						if (os != null) {
							os.close();
						}
					}
				}
			}
		} catch (Exception e) {
			logger.error("error upload file" + e.getMessage());
			return false;
		}
		return true;
	}
	

	//Compress and decompress file
	private static int decompressedLength;
	private static LZ4Factory factory = LZ4Factory.fastestInstance();
	private static LZ4Compressor compressor = factory.fastCompressor();
	//Compress file before upload
	public static byte[] compress(byte[] src, int srcLen) {
	    decompressedLength = srcLen;
	    int maxCompressedLength = compressor.maxCompressedLength(decompressedLength);
	    byte[] compressed = new byte[maxCompressedLength];
	    int compressLen = compressor.compress(src, 0, decompressedLength, compressed, 0, maxCompressedLength);
	    byte[] finalCompressedArray = Arrays.copyOf(compressed, compressLen);
	    return finalCompressedArray;
	}
	
	private static LZ4FastDecompressor decompressor = factory.fastDecompressor();
	//Decompress file before download
	public static byte[] decompress(byte[] finalCompressedArray, int decompressedLength) {
	    byte[] restored = new byte[decompressedLength];
	    restored = decompressor.decompress(finalCompressedArray, decompressedLength);
	    return restored;
	}
	public void insertUpdateFile(int idGiayTo,int idLoaiHoSo,MultipartFile fileReport){
		insertUpdateFile(idGiayTo,idLoaiHoSo,fileReport,true);
	}
	public void insertUpdateFileBaoCao(int idGroup,int tuan, int nam,MultipartFile fileReport,String ngayBaoCao){
		insertUpdateFileBaoCao(idGroup,tuan,nam,fileReport,ngayBaoCao,true);
	}
	public void insertUpdateFile(int idGiayTo, int idLoaiHoSo, MultipartFile fileReport, boolean isCompressed){
		try {
			FileUploadVO file = new FileUploadVO();
			byte[] afterCompress;
			if(isCompressed){
				logger.info("Before compress : "+fileReport.getBytes().length);
				afterCompress = UploadFileUtil.compress(fileReport.getBytes(), fileReport.getBytes().length);
				logger.info("After compress : "+afterCompress.length);
			}else{
				afterCompress = fileReport.getBytes();
			}
			file.setNoiDung(afterCompress);
			file.setParentId(idGiayTo);
			file.setLoaiTaiLieu(idLoaiHoSo);
			file.setTenDayDu(fileReport.getName());
			file.setTen(fileReport.getOriginalFilename());
			file.setDoDai(fileReport.getBytes().length);
			//CHECK IF IT"S IN DATABASE OR NOT
			//Using list for future experience, because NOW we only have 1 file per report
			List<FileUploadVO> listFile;
			listFile = this.fileUploadServiceImpl.selectDataFileByIdParentAndLoaiTaiLieu(idGiayTo, idLoaiHoSo);
			if(listFile == null || listFile.size() == 0){
				this.fileUploadServiceImpl.insertFileUploadVO(file);
			}else{
				file.setId(listFile.get(0).getId());
				this.fileUploadServiceImpl.updateFileUploadVO(file);
			}
		} catch (IOException e) {	
			logger.error("Error insert/update File"+e.getMessage());
		}
	}

	public void insertUpdateFileBaoCao(int idGroup,int tuan,int nam,MultipartFile fileReport,String ngayBaoCao,boolean isCompressed){
		try {
			FileUploadBCSuCoVO file = new FileUploadBCSuCoVO();
			byte[] afterCompress;
			if(isCompressed){
				logger.info("Before compress : "+fileReport.getBytes().length);
				afterCompress = UploadFileUtil.compress(fileReport.getBytes(), fileReport.getBytes().length);
				logger.info("After compress : "+afterCompress.length);
			}else{
				afterCompress = fileReport.getBytes();
			}
			file.setIdGroup(idGroup);
			file.setTuan(tuan);
			file.setNam(nam);
			file.setNgayBC(ngayBaoCao);
			file.setNoiDung(afterCompress);
			file.setTen(fileReport.getOriginalFilename());
			file.setDoDai(fileReport.getBytes().length);
			//CHECK IF IT"S IN DATABASE OR NOT
			//Using list for future experience, because NOW we only have 1 file per report
			List<FileUploadBCSuCoVO> listFile;
			listFile = this.fileUploadServiceImpl.selectDataFileByTuanAndNam(tuan, nam, idGroup);
			if(listFile == null || listFile.size() == 0){
				this.fileUploadServiceImpl.insertFileUploadBaoCaoVO(file);
			}else{
				file.setIdbcht(listFile.get(0).getIdbcht());
				this.fileUploadServiceImpl.updateFileUploadBaoCaoVO(file);
			}
		} catch (IOException e) {
			logger.error("Error insert/update File"+e.getMessage());
		}
	}
	public void updateFileBanVeQH(BanVeQuyHoachVO banVeQuyHoachVO,MultipartFile fileReport,boolean isCompressed){
		try{
			BanVeQuyHoachVO file = new BanVeQuyHoachVO();
			byte[] afterCompress;
			if(isCompressed){
				logger.info("Before compress : "+fileReport.getBytes().length);
				afterCompress = UploadFileUtil.compress(fileReport.getBytes(), fileReport.getBytes().length);
				logger.info("After compress : "+afterCompress.length);
			}else{
				afterCompress = fileReport.getBytes();
			}
			file.setIdBanVe_QH(banVeQuyHoachVO.getIdBanVe_QH());
			file.setNoiDung(afterCompress);
			file.setTen(fileReport.getOriginalFilename());
			file.setDoDai(fileReport.getBytes().length);
			this.fileUploadServiceImpl.updateFileBanVeQuyHoach(file);
		}catch (Exception e){
			e.printStackTrace();
		}
	}
	public void updateFilePhapLy(PhapLySCDKVO phapLySCDKVO, MultipartFile fileReport, boolean isCompressed){
		try{
			PhapLySCDKVO file = new PhapLySCDKVO();
			byte[] afterCompress;
			if(isCompressed){
				logger.info("Before compress : "+fileReport.getBytes().length);
				afterCompress = UploadFileUtil.compress(fileReport.getBytes(), fileReport.getBytes().length);
				logger.info("After compress : "+afterCompress.length);
			}else{
				afterCompress = fileReport.getBytes();
			}
			file.setIdPL(phapLySCDKVO.getIdPL());
			file.setNoiDung(afterCompress);
			file.setTenFile(fileReport.getOriginalFilename());
			file.setDoDai(fileReport.getBytes().length);
			this.fileUploadServiceImpl.updateFilePhapLy(file);
		}catch (Exception e){
			e.printStackTrace();
		}
	}
	public void updateTaiLieuQH(TaiLieuQuyHoachVO taiLieuQuyHoachVO,MultipartFile fileReport,boolean isCompressed){
		try{
			TaiLieuQuyHoachVO file = new TaiLieuQuyHoachVO();
			byte[] afterCompress;
			if(isCompressed){
				logger.info("Before compress : "+fileReport.getBytes().length);
				afterCompress = UploadFileUtil.compress(fileReport.getBytes(), fileReport.getBytes().length);
				logger.info("After compress : "+afterCompress.length);
			}else{
				afterCompress = fileReport.getBytes();
			}
			file.setIdTaiLieu_QH(taiLieuQuyHoachVO.getIdTaiLieu_QH());
			file.setNoiDung(afterCompress);
			file.setTen(fileReport.getOriginalFilename());
			file.setDoDai(fileReport.getBytes().length);
			this.fileUploadServiceImpl.updateFileTaiLieuQuyHoach(file);
		}catch (Exception e){
			e.printStackTrace();
		}
	}
	public void updateTaiLieuCongTrinh(TaiLieuCongTrinhVO taiLieuCongTrinhVO, MultipartFile fileReport, boolean isCompressed){
		try {
			TaiLieuCongTrinhVO file = new TaiLieuCongTrinhVO();
			byte[] afterCompress;
			if(isCompressed){
				logger.info("Before compress : "+fileReport.getBytes().length);
				afterCompress = UploadFileUtil.compress(fileReport.getBytes(), fileReport.getBytes().length);
				logger.info("After compress : "+afterCompress.length);
			}else{
				afterCompress = fileReport.getBytes();
			}
			file.setIdTL(taiLieuCongTrinhVO.getIdTL());
			file.setTenFile(fileReport.getOriginalFilename());
			file.setDoDai(fileReport.getBytes().length);
			file.setNoiDung(afterCompress);
			this.fileUploadServiceImpl.updateFileTaiLieuCongTrinh(file);
		}catch (Exception e){
			e.printStackTrace();
		}
	}
}
