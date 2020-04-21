/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.mockup.model.SctxThucHienVO;
import vn.worklife.user.mockup.service.SctxThucHienService;

import java.util.List;

@Service("SctxThucHienServiceImpl")
public class SctxThucHienServiceImpl implements SctxThucHienService {

    @Autowired
    SctxThucHienService sctxThucHienService;

    @Override
    public List<DanhMucSCTXVO> selectListLapKeHoach(int quy, int nam, int idGroup){
        return this.sctxThucHienService.selectListLapKeHoach(quy, nam, idGroup);
    }
    @Override
    public void insertSctxTh(DanhMucSCTXVO danhMucSCTXVO) {
        sctxThucHienService.insertSctxTh(danhMucSCTXVO);
    }
    @Override
    public void updateSctxTh(DanhMucSCTXVO danhMucSCTXVO) {
        sctxThucHienService.updateSctxTh(danhMucSCTXVO);
    }
}
