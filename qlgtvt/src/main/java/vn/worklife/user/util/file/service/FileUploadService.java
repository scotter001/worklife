/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.util.file.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.FilePaperVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.TaiLieuCongTrinhVO;
import vn.worklife.user.mockup.model.PhapLySCDKVO;
import vn.worklife.user.quanlyquyhoach.model.BanVeQuyHoachVO;
import vn.worklife.user.quanlyquyhoach.model.TaiLieuQuyHoachVO;
import vn.worklife.user.util.file.model.FileUploadBCSuCoVO;
import vn.worklife.user.util.file.model.FileUploadVO;

import java.util.List;

public interface FileUploadService {
	List<FileUploadVO> selectDataFileByIdParentAndLoaiTaiLieu(@Param("parentId") int parentId, @Param("loaiTaiLieu") int loaiTaiLieu);
	List<FileUploadVO> selectDataDownloadFileByIdParentAndLoaiTaiLieu(@Param("parentId") int parentId, @Param("loaiTaiLieu") int loaiTaiLieu);
	FileUploadVO selectFileAttachByID(int id);
	
	void insertFileUploadVO(FileUploadVO file);
	void updateFileUploadVO(FileUploadVO file);
	void deleteFileUploadVO(FileUploadVO file);
	void deleteFileUploadByList(List<FilePaperVO> list);
	List<FileUploadBCSuCoVO> selectDataFileByTuanAndNam(@Param("tuan") int tuan, @Param("nam") int nam, @Param("idGroup") int idGroup);
	void insertFileUploadBaoCaoVO(FileUploadBCSuCoVO file);
	void updateFileUploadBaoCaoVO(FileUploadBCSuCoVO file);
	void updateFileBanVeQuyHoach(BanVeQuyHoachVO file);
	void updateFilePhapLy(PhapLySCDKVO file);
	void updateFileTaiLieuQuyHoach(TaiLieuQuyHoachVO file);
	void updateFileTaiLieuCongTrinh(TaiLieuCongTrinhVO file);
}
