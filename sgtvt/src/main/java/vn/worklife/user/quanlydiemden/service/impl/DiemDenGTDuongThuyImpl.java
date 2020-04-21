package vn.worklife.user.quanlydiemden.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlydiemden.model.DiemDenVO;
import vn.worklife.user.quanlydiemden.model.DmTieuChiDiemDenVO;
import vn.worklife.user.quanlydiemden.service.DiemDenGTDuongThuyService;

import java.util.List;

@Service
public class DiemDenGTDuongThuyImpl implements DiemDenGTDuongThuyService {
    @Autowired
    DiemDenGTDuongThuyService diemDenGTDuongThuyService;

    @Override
    public List<DmTieuChiDiemDenVO> selectListTieuChi(int phanLoai){
        return this.diemDenGTDuongThuyService.selectListTieuChi(phanLoai);
    }
    @Override
    public void insertDiemDenDuongThuy(DiemDenVO diemDenVO){
        this.diemDenGTDuongThuyService.insertDiemDenDuongThuy(diemDenVO);
    }
    @Override
    public void updateDiemDenDuongThuy(DiemDenVO diemDenVO){
        this.diemDenGTDuongThuyService.updateDiemDenDuongThuy(diemDenVO);
    }
    @Override
    public List<DiemDenVO> selectListDiemDenDT(DatatableRequestCriteriasVO criteriasVO){
        return this.diemDenGTDuongThuyService.selectListDiemDenDT(criteriasVO);
    }
}
