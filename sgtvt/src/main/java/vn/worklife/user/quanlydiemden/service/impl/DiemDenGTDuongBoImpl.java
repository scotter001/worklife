package vn.worklife.user.quanlydiemden.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlydiemden.model.DiemDenVO;
import vn.worklife.user.quanlydiemden.service.DiemDenGTDuongBoService;

import java.util.List;

@Service
public class DiemDenGTDuongBoImpl implements DiemDenGTDuongBoService {
    @Autowired
    DiemDenGTDuongBoService diemDenGTDuongBoService;

    @Override
    public List<DiemDenVO> selectListDiemDenDB(DatatableRequestCriteriasVO criteriasVO){
        return this.diemDenGTDuongBoService.selectListDiemDenDB(criteriasVO);
    }
    @Override
    public void insertDiemDenDuongBo(DiemDenVO diemDenVO){
        this.diemDenGTDuongBoService.insertDiemDenDuongBo(diemDenVO);
    }
    @Override
    public void updateDiemDenDuongBo(DiemDenVO diemDenVO){
        this.diemDenGTDuongBoService.updateDiemDenDuongBo(diemDenVO);
    }
    @Override
    public int getPosition(int idDiemDen){
        return this.diemDenGTDuongBoService.getPosition(idDiemDen);
    }
    @Override
    public void insertDiemDenHuyen(int idDiemDen, int idHuyen){
        this.diemDenGTDuongBoService.insertDiemDenHuyen(idDiemDen, idHuyen);
    }
    @Override
    public void deleteDiemDenById(int idDiemDen){
        this.diemDenGTDuongBoService.deleteDiemDenById(idDiemDen);
    }
}
