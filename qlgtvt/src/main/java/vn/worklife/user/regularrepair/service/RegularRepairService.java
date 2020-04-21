/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.regularrepair.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.regularrepair.model.RegularRepairVO;

import java.util.HashMap;
import java.util.List;

public interface RegularRepairService {
    List<DanhMucSCTXVO> selectTable(@Param("quy") int quy, @Param("nam") int nam, @Param("tinhTrang") int tinhTrang, @Param("idGroup") int idGroup);
    RegularRepairVO select(@Param("idsctx") int idsctx);

    int insert(DanhMucSCTXVO danhMucSCTXVO);

    int update(DanhMucSCTXVO danhMucSCTXVO);
}
