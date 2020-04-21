/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.mockup.model.DmDVTVO;

import java.util.List;
import java.util.Map;

public interface DanhMucSCTXService {

	List<DanhMucSCTXVO> selectAllDmSctxByQY(@Param("quy") int quy, @Param("nam") int nam, @Param("idGroup") int idGroup);
    void insertDmSCTX(DanhMucSCTXVO danhMucSCTXVO);
    void updateDmSCTX(DanhMucSCTXVO danhMucSCTXVO);
    List<DmDVTVO> selectListDVT();
    boolean deleteSCTX(@Param("idDmSctx") int idDmSctx);
    List<DanhMucSCTXVO> selectAllDmSctxByQYNotPaging(Map<String,String> optional);
    List<DanhMucSCTXVO> selectAllDmSctxForPlanningNotPaging(Map<String,String> optional);
    List<DanhMucSCTXVO> selectAllDmSctxTraCuu(DatatableRequestCriteriasVO criterias);
    List<DanhMucSCTXVO> selectAllDmSctxTraCuuExport(Map<String,String> optional);
}
