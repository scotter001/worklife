/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.util.file.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.worklife.basicinformation.model.FilePaperVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.TaiLieuCongTrinhVO;
import vn.worklife.user.mockup.model.PhapLySCDKVO;
import vn.worklife.user.quanlyquyhoach.model.BanVeQuyHoachVO;
import vn.worklife.user.quanlyquyhoach.model.TaiLieuQuyHoachVO;
import vn.worklife.user.util.file.model.FileUploadBCSuCoVO;
import vn.worklife.user.util.file.model.FileUploadVO;
import vn.worklife.user.util.file.service.FileUploadService;

import java.util.List;

@Service("FileUploadServiceImpl")
public class FileUploadServiceImpl implements FileUploadService {
	@Autowired
	public FileUploadService fileUploadService;

	@Transactional
	@Override
	public void insertFileUploadVO(FileUploadVO file) {
		this.fileUploadService.insertFileUploadVO(file);
	}
	
	@Transactional
	@Override
	public void updateFileUploadVO(FileUploadVO file) {
		this.fileUploadService.updateFileUploadVO(file);
	}
	
	@Transactional
	@Override
	public void deleteFileUploadVO(FileUploadVO file) {
		this.fileUploadService.deleteFileUploadVO(file);
	}

	@Override
	public List<FileUploadVO> selectDataFileByIdParentAndLoaiTaiLieu(int parentId, int loaiTaiLieu) {
		return this.fileUploadService.selectDataFileByIdParentAndLoaiTaiLieu(parentId, loaiTaiLieu);
	}

	@Override
	public List<FileUploadVO> selectDataDownloadFileByIdParentAndLoaiTaiLieu(int parentId, int loaiTaiLieu) {
		return this.fileUploadService.selectDataDownloadFileByIdParentAndLoaiTaiLieu(parentId, loaiTaiLieu);
	}

	@Override
	public void deleteFileUploadByList(List<FilePaperVO> list) {
		this.fileUploadService.deleteFileUploadByList(list);
		
	}

	@Override
	public FileUploadVO selectFileAttachByID(int id) {
		return this.fileUploadService.selectFileAttachByID(id);
	}

	@Override
	public List<FileUploadBCSuCoVO> selectDataFileByTuanAndNam(int tuan, int nam, int idGroup){
		return this.fileUploadService.selectDataFileByTuanAndNam(tuan, nam, idGroup);
	}

	@Transactional
	@Override
	public void insertFileUploadBaoCaoVO(FileUploadBCSuCoVO file){
		this.fileUploadService.insertFileUploadBaoCaoVO(file);
	}

	@Transactional
	@Override
	public void updateFileUploadBaoCaoVO(FileUploadBCSuCoVO file){
		this.fileUploadService.updateFileUploadBaoCaoVO(file);
	}

	@Transactional
	@Override
	public void updateFileBanVeQuyHoach(BanVeQuyHoachVO file){
		this.fileUploadService.updateFileBanVeQuyHoach(file);
	}

	@Transactional
	@Override
	public void updateFilePhapLy(PhapLySCDKVO file){
		this.fileUploadService.updateFilePhapLy(file);
	}

	@Transactional
	@Override
	public void updateFileTaiLieuQuyHoach(TaiLieuQuyHoachVO file){
		this.fileUploadService.updateFileTaiLieuQuyHoach(file);
	}

	@Transactional
	@Override
	public void updateFileTaiLieuCongTrinh(TaiLieuCongTrinhVO file){
		this.fileUploadService.updateFileTaiLieuCongTrinh(file);
	}
}
