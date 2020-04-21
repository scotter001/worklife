/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.ChuyenSCTXVO;
import vn.worklife.user.mockup.model.SuCoVO;
import vn.worklife.user.mockup.service.SuCoService;

import java.util.List;
import java.util.Map;

@Service
public class SuCoServiceImpl implements SuCoService {
    @Autowired
    SuCoService suCoService;

    @Override
    public void insertSuCo(SuCoVO suCoVO) {
        suCoService.insertSuCo(suCoVO);
    }

    @Override
    public void updateSuCo(SuCoVO suCoVO) {
        suCoService.updateSuCo(suCoVO);
    }

    @Override
    public List<SuCoVO> selectAllSuCoByWY(DatatableRequestCriteriasVO criterias) {
        return suCoService.selectAllSuCoByWY(criterias);
    }

    @Override
    public List<SuCoVO> selectAllSuCoByWYReport(DatatableRequestCriteriasVO criterias) {
        return suCoService.selectAllSuCoByWYReport(criterias);
    }

    @Override
    public List<SuCoVO> selectAllSuCoByWYHQL(DatatableRequestCriteriasVO criterias) {
        return suCoService.selectAllSuCoByWYHQL(criterias);
    }
    @Override
    public List<SuCoVO> selectAllSuCoNotPaging(Map<String,String> params) {
        return suCoService.selectAllSuCoNotPaging(params);
    }

    @Override
    public SuCoVO selectSuCoById(int suCoId) {
        return suCoService.selectSuCoById(suCoId);
    }

    @Override
    public int getPosition(int idSuCo){
        return this.suCoService.getPosition(idSuCo);
    }

    @Override
    public void updateChuyenSCTX(ChuyenSCTXVO chuyenSCTXVO){
        this.suCoService.updateChuyenSCTX(chuyenSCTXVO);
    }
}
