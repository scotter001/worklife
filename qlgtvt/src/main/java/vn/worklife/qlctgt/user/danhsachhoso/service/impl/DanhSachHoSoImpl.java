package vn.worklife.qlctgt.user.danhsachhoso.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.qlctgt.user.danhsachhoso.model.*;
import vn.worklife.qlctgt.user.danhsachhoso.service.DanhSachHoSoService;

import java.util.List;

@Service
public class DanhSachHoSoImpl implements DanhSachHoSoService {
    @Autowired
    DanhSachHoSoService danhSachHoSoService;

    @Override
    public List<DmLoaiHoSoVO> selectListLoaiHS(){
        return this.danhSachHoSoService.selectListLoaiHS();
    }
    @Override
    public List<DmDoanhNghiepVO> selectListDoanhNghiep(String tenDoanhNghiep){
        return this.danhSachHoSoService.selectListDoanhNghiep(tenDoanhNghiep);
    }
    @Override
    public void insertDoanhNhiep(DmDoanhNghiepVO dmDoanhNghiepVO){
        this.danhSachHoSoService.insertDoanhNhiep(dmDoanhNghiepVO);
    }
    @Override
    public void updateDoanhNghiep(DmDoanhNghiepVO dmDoanhNghiepVO){
        this.danhSachHoSoService.updateDoanhNghiep(dmDoanhNghiepVO);
    }
    @Override
    public boolean deleteSDN(int idDMDN){
        return this.danhSachHoSoService.deleteSDN(idDMDN);
    }
    @Override
    public boolean selectReceptionNumber(String soBienNhan){
        return this.danhSachHoSoService.selectReceptionNumber(soBienNhan);
    }
    @Override
    public void insertHoSo(HoSoVO hoSoVO){
        this.danhSachHoSoService.insertHoSo(hoSoVO);
    }
    @Override
    public void insertDanhSachHoSo(HoSoVO hoSoVO){
        this.danhSachHoSoService.insertDanhSachHoSo(hoSoVO);
    }
    @Override
    public List<DmTrangThaiVO> selectListTrangThai(){
        return this.danhSachHoSoService.selectListTrangThai();
    }
    @Override
    public List<DoanhNghiepVO> selectListHSBuoc1(DatatableRequestCriteriasVO criteriasVO){
        return this.danhSachHoSoService.selectListHSBuoc1(criteriasVO);
    }
    @Override
    public List<HoSoVO> selectListHoSo(DatatableRequestCriteriasVO criteriasVO){
        return this.danhSachHoSoService.selectListHoSo(criteriasVO);
    }
    @Override
    public void insertDSHoSoChuyen(DanhSachHoSoVO danhSachHoSoVO){
        this.danhSachHoSoService.insertDSHoSoChuyen(danhSachHoSoVO);
    }
    @Override
    public void updateDSHoSoParent(DanhSachHoSoVO danhSachHoSoVO){
        this.danhSachHoSoService.updateDSHoSoParent(danhSachHoSoVO);
    }
}
