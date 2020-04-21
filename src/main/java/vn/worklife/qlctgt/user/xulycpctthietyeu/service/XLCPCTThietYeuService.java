package vn.worklife.qlctgt.user.xulycpctthietyeu.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.*;

import java.util.List;

public interface XLCPCTThietYeuService {
    List<DmLoaiCongTrinhVO> selectLoaiHinh();
    void deleteCongTrinhChiTiet(@Param("idCongTrinh") int idCongTrinh);
    void insertCongTrinhChiTiet(CongTrinhChiTietVO congTrinhChiTietVO);
    List<CongTrinhChiTietVO> selectListChiTietCT(@Param("idCongTrinh") int idCongTrinh);
    boolean deleteChiTietTD(@Param("idctct") int idctct);
    boolean deleteCongThuc(@Param("id") int id);
    DmDonGiaCPVO selectDonGia(@Param("idLoaiHoSo") int idLoaiHoSo, @Param("suDung") int suDung);
    ThuPhiCongTrinhVO selectThuPhiCongTrinh(@Param("idHoSo") int idHoSo);
    List<ThuPhiCongThucVO> selectListCongThuc(@Param("idPhi") int idPhi);
}
