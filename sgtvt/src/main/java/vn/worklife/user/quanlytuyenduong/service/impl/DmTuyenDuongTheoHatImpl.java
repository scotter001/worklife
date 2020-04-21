package vn.worklife.user.quanlytuyenduong.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlytuyenduong.model.*;
import vn.worklife.user.quanlytuyenduong.service.DmTuyenDuongTheoHatService;

import java.util.List;

@Service
public class DmTuyenDuongTheoHatImpl implements DmTuyenDuongTheoHatService {
    @Autowired
    DmTuyenDuongTheoHatService dmTuyenDuongTheoHatService;

    @Override
    public List<GroupVO> selectListHatQL(){
        return this.dmTuyenDuongTheoHatService.selectListHatQL();
    }
    @Override
    public List<DmLoaiDuongVO> selectListLoaiDuong(){
        return this.dmTuyenDuongTheoHatService.selectListLoaiDuong();
    }
    @Override
    public List<TuyenDuongHatVO> selectListTuyenDuong(){
        return this.dmTuyenDuongTheoHatService.selectListTuyenDuong();
    }
    @Override
    public List<DmHuyenVO> selectHuyen(){
        return this.dmTuyenDuongTheoHatService.selectHuyen();
    }
    @Override
    public List<UsersVO> selectListUsers(int idGroup){
        return this.dmTuyenDuongTheoHatService.selectListUsers(idGroup);
    }
    @Override
    public List<DuongTheoHatVO> selectListDuongHat(DatatableRequestCriteriasVO criteriasVO){
        return this.dmTuyenDuongTheoHatService.selectListDuongHat(criteriasVO);
    }
    @Override
    public DuongHatVO selectDataByIddh(int iddh){
        return this.dmTuyenDuongTheoHatService.selectDataByIddh(iddh);
    }
    @Override
    public List<DoanDuongVO> selectListDoanDuong(int iddh){
        return this.dmTuyenDuongTheoHatService.selectListDoanDuong(iddh);
    }
    @Override
    public UsersVO selectTelePhoneByIdUser(int idUser){
        return this.dmTuyenDuongTheoHatService.selectTelePhoneByIdUser(idUser);
    }
    @Override
    public void insertDuongHat(DuongHatVO duongHatVO){
        this.dmTuyenDuongTheoHatService.insertDuongHat(duongHatVO);
    }
    @Override
    public void updateDuongHat(DuongHatVO duongHatVO){
        this.dmTuyenDuongTheoHatService.updateDuongHat(duongHatVO);
    }
    @Override
    public void insertDoanDuong(DoanDuongVO doanDuongVO){
        this.dmTuyenDuongTheoHatService.insertDoanDuong(doanDuongVO);
    }
    @Override
    public void updateDoanDuong(DoanDuongVO doanDuongVO){
        this.dmTuyenDuongTheoHatService.updateDoanDuong(doanDuongVO);
    }
    @Override
    public int getPositionSeaShoe(int id){
        return this.dmTuyenDuongTheoHatService.getPositionSeaShoe(id);
    }
    @Override
    public boolean deleteDoanDuong(int idDoan){
        return this.dmTuyenDuongTheoHatService.deleteDoanDuong(idDoan);
    }
}
