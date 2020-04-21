package vn.worklife.qlctgt.user.xulycpctdaunoiduong.sevice.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.DmLoaiCTVO;
import vn.worklife.qlctgt.user.danhsachhoso.model.HoSoVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.*;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.sevice.XLCPCTDauNoiDuongService;

import java.util.List;

@Service
public class XLCPCTDauNoiDuongImpl implements XLCPCTDauNoiDuongService {
    @Autowired
    private XLCPCTDauNoiDuongService xlcpctDauNoiDuongService;

    @Override
    public HoSoVO selectDataHoSo(int idHoSo){
        return this.xlcpctDauNoiDuongService.selectDataHoSo(idHoSo);
    }
    @Override
    public CongTrinhVO selectDataCongTrinh(int idHoSo){
        return this.xlcpctDauNoiDuongService.selectDataCongTrinh(idHoSo);
    }
    @Override
    public GiayPhepChapThuanVO selectThoiHan(int idHoSo){
        return this.xlcpctDauNoiDuongService.selectThoiHan(idHoSo);
    }
    @Override
    public boolean updateTaiLieuCT(int idTL){
        return this.xlcpctDauNoiDuongService.updateTaiLieuCT(idTL);
    }
    @Override
    public void insertDoanhNghiep(CongTrinhVO congTrinhVO){
        this.xlcpctDauNoiDuongService.insertDoanhNghiep(congTrinhVO);
    }
    @Override
    public void updateDoanhNghiep(CongTrinhVO congTrinhVO){
        this.xlcpctDauNoiDuongService.updateDoanhNghiep(congTrinhVO);
    }
    @Override
    public void insertCongTrinh(CongTrinhVO congTrinhVO){
        this.xlcpctDauNoiDuongService.insertCongTrinh(congTrinhVO);
    }
    @Override
    public void updateIdParentCT(int idCongTrinh){
        this.xlcpctDauNoiDuongService.updateIdParentCT(idCongTrinh);
    }
    @Override
    public void updateCongTrinh(CongTrinhVO congTrinhVO){
        this.xlcpctDauNoiDuongService.updateCongTrinh(congTrinhVO);
    }
    @Override
    public void insertGiayPhep(CongTrinhVO congTrinhVO){
        this.xlcpctDauNoiDuongService.insertGiayPhep(congTrinhVO);
    }
    @Override
    public void updateIdParentGP(int idgp){
        this.xlcpctDauNoiDuongService.updateIdParentGP(idgp);
    }
    @Override
    public void updateGiayPhep(CongTrinhVO congTrinhVO){
        this.xlcpctDauNoiDuongService.updateGiayPhep(congTrinhVO);
    }
    @Override
    public void insertDiaChiHuyen(CongTrinhVO congTrinhVO){
        this.xlcpctDauNoiDuongService.insertDiaChiHuyen(congTrinhVO);
    }
    @Override
    public void updateDiaChiHuyen(CongTrinhVO congTrinhVO){
        this.xlcpctDauNoiDuongService.updateDiaChiHuyen(congTrinhVO);
    }
    @Override
    public void updateHoSo(CongTrinhVO congTrinhVO){
        this.xlcpctDauNoiDuongService.updateHoSo(congTrinhVO);
    }
    @Override
    public void insertTaiLieu(TaiLieuCongTrinhVO taiLieuCongTrinhVO){
        this.xlcpctDauNoiDuongService.insertTaiLieu(taiLieuCongTrinhVO);
    }
    @Override
    public void updateTaiLieu(TaiLieuCongTrinhVO taiLieuCongTrinhVO){
        this.xlcpctDauNoiDuongService.updateTaiLieu(taiLieuCongTrinhVO);
    }
    @Override
    public List<TaiLieuCongTrinhVO> selectListTaiLieu(int idCongTrinh){
        return this.xlcpctDauNoiDuongService.selectListTaiLieu(idCongTrinh);
    }
    @Override
    public boolean deleteTaiLieuCT(int idTL){
        return this.xlcpctDauNoiDuongService.deleteTaiLieuCT(idTL);
    }
    @Override
    public CongTrinhVO selectThongTinCT(int idCongTrinh, int idLoaiHoSo){
        return this.xlcpctDauNoiDuongService.selectThongTinCT(idCongTrinh, idLoaiHoSo);
    }
    @Override
    public VanBanChapThuanVO selectVanBanChapThuan(int idCongTrinh){
        return this.xlcpctDauNoiDuongService.selectVanBanChapThuan(idCongTrinh);
    }
    @Override
    public GiayPhepChapThuanVO selectGiayPhep(int idCongTrinh){
        return this.xlcpctDauNoiDuongService.selectGiayPhep(idCongTrinh);
    }
    @Override
    public DmCanCuPhapLyVO selectCanCuPL(int suDung, int loaiGiay){
        return this.xlcpctDauNoiDuongService.selectCanCuPL(suDung, loaiGiay);
    }
    @Override
    public List<ThietLapNguoiKyVO> selectListNguoiKy(int loaiGiay, int macDinh){
        return this.xlcpctDauNoiDuongService.selectListNguoiKy(loaiGiay, macDinh);
    }
    @Override
    public void insertVanBanChapThuan(VanBanChapThuanVO vanBanChapThuanVO){
        this.xlcpctDauNoiDuongService.insertVanBanChapThuan(vanBanChapThuanVO);
    }
    @Override
    public void updateVanBanChapThuan(VanBanChapThuanVO vanBanChapThuanVO){
        this.xlcpctDauNoiDuongService.updateVanBanChapThuan(vanBanChapThuanVO);
    }
    @Override
    public TaiLieuCongTrinhVO selectListTaiLieuByid(int idTL){
        return this.xlcpctDauNoiDuongService.selectListTaiLieuByid(idTL);
    }
    @Override
    public void insertGiayPhepChapThuan(GiayPhepChapThuanVO giayPhepChapThuanVO){
        this.xlcpctDauNoiDuongService.insertGiayPhepChapThuan(giayPhepChapThuanVO);
    }
    @Override
    public void updateGiayPhepChapThuan(GiayPhepChapThuanVO giayPhepChapThuanVO){
        this.xlcpctDauNoiDuongService.updateGiayPhepChapThuan(giayPhepChapThuanVO);
    }
    @Override
    public CongTrinhVO selectDmLoaiCT(int idHoSo){
        return this.xlcpctDauNoiDuongService.selectDmLoaiCT(idHoSo);
    }
    @Override
    public void updateDmLoaiCT(CongTrinhVO congTrinhVO){
        this.xlcpctDauNoiDuongService.updateDmLoaiCT(congTrinhVO);
    }
    @Override
    public CongTrinhVO selectNhieuHuyen(int idHoSo){
        return this.xlcpctDauNoiDuongService.selectNhieuHuyen(idHoSo);
    }
    @Override
    public boolean deleteDiaChiCTHuyen(int idCongTrinh){
        return this.xlcpctDauNoiDuongService.deleteDiaChiCTHuyen(idCongTrinh);
    }
    @Override
    public void insertDiaChiCTHuyen(int idCongTrinh, int idHuyen){
        this.xlcpctDauNoiDuongService.insertDiaChiCTHuyen(idCongTrinh, idHuyen);
    }
    @Override
    public TaiLieuCongTrinhVO selectFileTaiLieuCT(int idTL){
        return this.xlcpctDauNoiDuongService.selectFileTaiLieuCT(idTL);
    }
}
