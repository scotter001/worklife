package vn.worklife.qlctgt.user.xulycpctdaunoiduong.sevice;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.DmLoaiCTVO;
import vn.worklife.qlctgt.user.danhsachhoso.model.HoSoVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.*;

import java.util.List;

public interface XLCPCTDauNoiDuongService {
    HoSoVO selectDataHoSo(@Param("idHoSo") int idHoSo);
    CongTrinhVO selectDataCongTrinh(@Param("idHoSo") int idHoSo);
    GiayPhepChapThuanVO selectThoiHan(@Param("idHoSo") int idHoSo);
    boolean updateTaiLieuCT(@Param("idTL") int idTL);
    void insertDoanhNghiep(CongTrinhVO congTrinhVO);
    void updateDoanhNghiep(CongTrinhVO congTrinhVO);
    void insertCongTrinh(CongTrinhVO congTrinhVO);
    void updateIdParentCT(@Param("idCongTrinh") int idCongTrinh);
    void updateCongTrinh(CongTrinhVO congTrinhVO);
    void insertGiayPhep(CongTrinhVO congTrinhVO);
    void updateIdParentGP(@Param("idgp") int idgp);
    void updateGiayPhep(CongTrinhVO congTrinhVO);
    void insertDiaChiHuyen(CongTrinhVO congTrinhVO);
    void updateDiaChiHuyen(CongTrinhVO congTrinhVO);
    void updateHoSo(CongTrinhVO congTrinhVO);
    void insertTaiLieu(TaiLieuCongTrinhVO taiLieuCongTrinhVO);
    void updateTaiLieu(TaiLieuCongTrinhVO taiLieuCongTrinhVO);
    List<TaiLieuCongTrinhVO> selectListTaiLieu(@Param("idCongTrinh") int idCongTrinh);
    boolean deleteTaiLieuCT(@Param("idTL") int idTL);
    CongTrinhVO selectThongTinCT(@Param("idCongTrinh") int idCongTrinh, @Param("idLoaiHoSo") int idLoaiHoSo);
    VanBanChapThuanVO selectVanBanChapThuan(@Param("idCongTrinh") int idCongTrinh);
    GiayPhepChapThuanVO selectGiayPhep(@Param("idCongTrinh") int idCongTrinh);
    DmCanCuPhapLyVO selectCanCuPL(@Param("suDung") int suDung, @Param("loaiGiay") int loaiGiay);
    List<ThietLapNguoiKyVO> selectListNguoiKy(@Param("loaiGiay") int loaiGiay, @Param("macDinh") int macDinh);
    void insertVanBanChapThuan(VanBanChapThuanVO vanBanChapThuanVO);
    void updateVanBanChapThuan(VanBanChapThuanVO vanBanChapThuanVO);
    TaiLieuCongTrinhVO selectListTaiLieuByid(@Param("idTL") int idTL);
    void insertGiayPhepChapThuan(GiayPhepChapThuanVO giayPhepChapThuanVO);
    void updateGiayPhepChapThuan(GiayPhepChapThuanVO giayPhepChapThuanVO);
    CongTrinhVO selectDmLoaiCT(@Param("idHoSo") int idHoSo);
    void updateDmLoaiCT(CongTrinhVO congTrinhVO);

    void insertDiaChiCTHuyen(@Param("idCongTrinh") int idCongTrinh,@Param("idHuyen") int idHuyen);
    CongTrinhVO selectNhieuHuyen(@Param("idHoSo") int idHoSo);
    boolean deleteDiaChiCTHuyen(@Param("idCongTrinh") int idCongTrinh);

    TaiLieuCongTrinhVO selectFileTaiLieuCT(@Param("idTL") int idTL);
}
