/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.user.mockup.model.DanhSachDmScdkVO;
import vn.worklife.user.mockup.service.DanhSachDmScdkService;

import java.util.List;

@Service("DanhSachDmScdkServiceImpl")
public class DanhSachDmScdkServiceImpl implements DanhSachDmScdkService {


    @Autowired
    DanhSachDmScdkService danhSachDmScdkService;


    @Override
    public void insertDsDmScdk(DanhSachDmScdkVO danhSachDmScdkVO) {
        danhSachDmScdkService.insertDsDmScdk(danhSachDmScdkVO);
    }

    @Override
    public void deleteDsDmScdkByDmScdkId(int idDmScdk) {
        danhSachDmScdkService.deleteDsDmScdkByDmScdkId(idDmScdk);
    }

    @Override
    public void deleteDsDmScdkByDmScdkIdList(int[] idDmScdk) {
        danhSachDmScdkService.deleteDsDmScdkByDmScdkIdList(idDmScdk);
    }

    @Override
    public List<DanhSachDmScdkVO> selectDsDmScdkTheoDmScdk(int idDmScdk) {
        return danhSachDmScdkService.selectDsDmScdkTheoDmScdk(idDmScdk);
    }
}
