/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.user.mockup.model.BaoCaoSuCoVO;
import vn.worklife.user.mockup.model.TiepDinhKemVO;
import vn.worklife.user.mockup.service.FileAttachmentService;
import vn.worklife.user.util.file.model.FileUploadBCSuCoVO;

@Service
public class FileAttachmentServiceImpl implements FileAttachmentService {

    @Autowired
    FileAttachmentService fileAttachmentService;

    @Override
    public TiepDinhKemVO selectAttachedFileNameByWYG(BaoCaoSuCoVO baoCaoSuCoVO, int loaiTaiLieu) {
        return fileAttachmentService.selectAttachedFileNameByWYG(baoCaoSuCoVO,loaiTaiLieu);
    }

    @Override
    public FileUploadBCSuCoVO selectAttachedFileNameByTuanAndNam(int tuan, int nam, int idGroup){
        return this.fileAttachmentService.selectAttachedFileNameByTuanAndNam(tuan, nam, idGroup);
    }

    /*@Override
    public TiepDinhKemVO selectAttachedFileByWYG(int week, int year,int idGroup) {
        return fileAttachmentService.selectAttachedFileByWYG(week, year,idGroup);
    }*/
}
