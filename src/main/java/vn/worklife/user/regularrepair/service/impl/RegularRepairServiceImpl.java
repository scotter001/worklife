/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.regularrepair.service.impl;

import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.regularrepair.model.RegularRepairVO;
import vn.worklife.user.regularrepair.service.RegularRepairService;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

@Service
public class RegularRepairServiceImpl implements RegularRepairService{

    @Resource
    private RegularRepairService regularRepairService;


    @Override
    public List<DanhMucSCTXVO> selectTable(int quy, int nam, int tinhTrang, int idGroup) {
        return this.regularRepairService.selectTable(quy, nam, tinhTrang, idGroup);
    }

    @Override
    public RegularRepairVO select(int idsctx) {
        return this.regularRepairService.select(idsctx);
    }

    @Override
    public int insert(DanhMucSCTXVO danhMucSCTXVO) {
        return this.regularRepairService.insert(danhMucSCTXVO);
    }

    @Override
    public int update(DanhMucSCTXVO danhMucSCTXVO) {
        return this.regularRepairService.update(danhMucSCTXVO);
    }
}
