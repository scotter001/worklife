package vn.worklife.user.quanlytuyenduong.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.user.quanlytuyenduong.model.*;

import java.util.List;

public interface TTChiTietTuyenDuongTheoHatService {
    List<DmKetCauMatDuongVO> selectListKetCauMD();
    List<DmCapQLVO> selectListCapQL();
    List<DmTinhTrangDuongVO> selectListTTDuong();
    void updateChiTietDuong(DuongHatVO duongHatVO);
    void insertLyTrinh(LyTrinhVO lyTrinhVO);
    void updateLyTrinh(LyTrinhVO lyTrinhVO);
    void insertTTDuong(TinhTrangDuongVO tinhTrangDuongVO);
    void updateTTDuong(TinhTrangDuongVO tinhTrangDuongVO);
    List<LyTrinhVO> selectListLyTrinhByIddh(@Param("iddh") int iddh);
    TinhTrangDuongVO selectTTDuong(@Param("idLyTrinh") int idLyTrinh);
    boolean deleteLyTrinh(@Param("idLyTrinh") int idLyTrinh);
    boolean deleteTTDuong(@Param("idLyTrinh") int idLyTrinh);
}
