package vn.worklife.user.quanlytuyenduong.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.user.quanlytuyenduong.model.*;
import vn.worklife.user.quanlytuyenduong.service.TTChiTietTuyenDuongTheoHatService;

import java.util.List;

@Service
public class TTChiTietTuyenDuongTheoHatImpl implements TTChiTietTuyenDuongTheoHatService {
    @Autowired
    TTChiTietTuyenDuongTheoHatService ttChiTietTuyenDuongTheoHatService;

    @Override
    public List<DmKetCauMatDuongVO> selectListKetCauMD(){
        return this.ttChiTietTuyenDuongTheoHatService.selectListKetCauMD();
    }
    @Override
    public List<DmCapQLVO> selectListCapQL(){
        return this.ttChiTietTuyenDuongTheoHatService.selectListCapQL();
    }
    @Override
    public List<DmTinhTrangDuongVO> selectListTTDuong(){
        return this.ttChiTietTuyenDuongTheoHatService.selectListTTDuong();
    }
    @Override
    public void updateChiTietDuong(DuongHatVO duongHatVO){
        this.ttChiTietTuyenDuongTheoHatService.updateChiTietDuong(duongHatVO);
    }
    @Override
    public void insertLyTrinh(LyTrinhVO lyTrinhVO){
        this.ttChiTietTuyenDuongTheoHatService.insertLyTrinh(lyTrinhVO);
    }
    @Override
    public void updateLyTrinh(LyTrinhVO lyTrinhVO){
        this.ttChiTietTuyenDuongTheoHatService.updateLyTrinh(lyTrinhVO);
    }
    @Override
    public void insertTTDuong(TinhTrangDuongVO tinhTrangDuongVO){
        this.ttChiTietTuyenDuongTheoHatService.insertTTDuong(tinhTrangDuongVO);
    }
    @Override
    public void updateTTDuong(TinhTrangDuongVO tinhTrangDuongVO){
        this.ttChiTietTuyenDuongTheoHatService.updateTTDuong(tinhTrangDuongVO);
    }
    @Override
    public List<LyTrinhVO> selectListLyTrinhByIddh(int iddh){
        return this.ttChiTietTuyenDuongTheoHatService.selectListLyTrinhByIddh(iddh);
    }
    @Override
    public TinhTrangDuongVO selectTTDuong(int idLyTrinh){
        return this.ttChiTietTuyenDuongTheoHatService.selectTTDuong(idLyTrinh);
    }
    @Override
    public boolean deleteLyTrinh(int idLyTrinh){
        return this.ttChiTietTuyenDuongTheoHatService.deleteLyTrinh(idLyTrinh);
    }
    @Override
    public boolean deleteTTDuong(int idLyTrinh){
        return this.ttChiTietTuyenDuongTheoHatService.deleteTTDuong(idLyTrinh);
    }
}
