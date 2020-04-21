/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;

import java.util.List;

public interface SctxThucHienService {
    List<DanhMucSCTXVO> selectListLapKeHoach(@Param("quy") int quy, @Param("nam") int nam, @Param("idGroup") int idGroup);
    void insertSctxTh(DanhMucSCTXVO danhMucSCTXVO);
    void updateSctxTh(DanhMucSCTXVO danhMucSCTXVO);
}
