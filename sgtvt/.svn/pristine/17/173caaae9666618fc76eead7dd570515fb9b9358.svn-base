/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.ChuyenSCTXVO;
import vn.worklife.user.mockup.model.SuCoVO;

import java.util.List;
import java.util.Map;

public interface SuCoService {
	void insertSuCo(SuCoVO suCoVO);
	void updateSuCo(SuCoVO suCoVO);
	List<SuCoVO> selectAllSuCoByWY(DatatableRequestCriteriasVO criterias);
    List<SuCoVO>  selectAllSuCoByWYReport(DatatableRequestCriteriasVO criterias);
    List<SuCoVO> selectAllSuCoByWYHQL(DatatableRequestCriteriasVO criterias);
    List<SuCoVO> selectAllSuCoNotPaging(Map<String,String> params);
	SuCoVO selectSuCoById(int suCoId);
    int getPosition(@Param("idSuCo") int idSuCo);
    void updateChuyenSCTX(ChuyenSCTXVO chuyenSCTXVO);
}
