/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */
package vn.worklife.user.mockup.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.user.mockup.model.BaoCaoSuCoVO;
import vn.worklife.user.mockup.model.TiepDinhKemVO;
import vn.worklife.user.util.file.model.FileUploadBCSuCoVO;

public interface FileAttachmentService {

    //TiepDinhKemVO selectAttachedFileByWYG(@Param("week") int week,@Param("year") int year,@Param("idGroup") int idGroup);

    TiepDinhKemVO selectAttachedFileNameByWYG(@Param("baoCaoSuCoVO") BaoCaoSuCoVO baoCaoSuCoVO,@Param("loaiTaiLieu") int loaiTaiLieu);
    FileUploadBCSuCoVO selectAttachedFileNameByTuanAndNam(@Param("tuan") int tuan, @Param("nam") int nam, @Param("idGroup") int idGroup);
}
