package vn.worklife.user.quanlycau.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlycau.model.*;
import vn.worklife.user.quanlycau.service.QuanLyCauService;

import java.util.List;

@Service
public class QuanLyCauImpl implements QuanLyCauService {
    @Autowired
    QuanLyCauService quanLyCauService;

    @Override
    public List<DmKetCauVO> selectListDmKetCau(){
        return this.quanLyCauService.selectListDmKetCau();
    }
    @Override
    public List<DmDangCauVO> selectListDangCau(){
        return this.quanLyCauService.selectListDangCau();
    }
    @Override
    public List<DmDonViQLVO> selectListDonViQL(){
        return this.quanLyCauService.selectListDonViQL();
    }
    @Override
    public List<CauVO> selectListCau(DatatableRequestCriteriasVO criteriasVO){
        return this.quanLyCauService.selectListCau(criteriasVO);
    }
    @Override
    public void insertCau(CauVO cauVO){
        this.quanLyCauService.insertCau(cauVO);
    }
    @Override
    public void updateCau(CauVO cauVO){
        this.quanLyCauService.updateCau(cauVO);
    }
    @Override
    public void insertTinhTrangCau(int idCau, int tinhTrang){
        this.quanLyCauService.insertTinhTrangCau(idCau, tinhTrang);
    }
    @Override
    public void updateTinhTrangCau(int idCau, int tinhTrang){
        this.quanLyCauService.updateTinhTrangCau(idCau, tinhTrang);
    }
    @Override
    public int getPosition(int idCau){
        return this.quanLyCauService.getPosition(idCau);
    }
}
