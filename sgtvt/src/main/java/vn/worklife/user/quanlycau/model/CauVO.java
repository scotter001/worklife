package vn.worklife.user.quanlycau.model;

import org.apache.ibatis.type.Alias;

@Alias("CauVO")
public class CauVO {
    private int idCau;
    private int idTuyenDuong;
    private int loaiCau;
    private String tenCau;
    private String lyTrinhKm;
    private String toaDoLong;
    private String toaDoLat;
    private int idHuyen;
    private String tenSongVuot;
    private int idGroup;
    private String namXD;
    private String namKT;
    private int donViQL;
    private String chieuDai;
    private String chieuRong;
    private String beRong_XeChay;
    private String tinhKhong;
    private String taiTrong_TK;
    private String taiTrong_KT;
    private String soNhip;
    private String soDoNhip;
    private String daiNhip;
    private int dangCau;
    private String tenDangCau;
    private int kCMo_Mong;
    private int kCMo_Than;
    private int kCTru_Mong;
    private int kCTru_Than;
    private int recordTotals;

    private String tenDuong;
    private String tenHatQL;
    private String tenHuyen;
    private int tinhTrang;
    private String tenTinhTrang;
    private int id;

    private String ghiChu;
    private String tenDonViQL;
    private String tenKCMo_Mong;
    private String tenKCMo_Than;
    private String tenKCTru_Mong;
    private String tenKCTru_Than;
    private int quy;
    private int nam;

    public int getIdCau() {
        return idCau;
    }

    public void setIdCau(int idCau) {
        this.idCau = idCau;
    }

    public int getIdTuyenDuong() {
        return idTuyenDuong;
    }

    public void setIdTuyenDuong(int idTuyenDuong) {
        this.idTuyenDuong = idTuyenDuong;
    }

    public int getLoaiCau() {
        return loaiCau;
    }

    public void setLoaiCau(int loaiCau) {
        this.loaiCau = loaiCau;
    }

    public String getTenCau() {
        return tenCau;
    }

    public void setTenCau(String tenCau) {
        this.tenCau = tenCau;
    }

    public String getLyTrinhKm() {
        return lyTrinhKm;
    }

    public void setLyTrinhKm(String lyTrinhKm) {
        this.lyTrinhKm = lyTrinhKm;
    }

    public String getToaDoLong() {
        return toaDoLong;
    }

    public void setToaDoLong(String toaDoLong) {
        this.toaDoLong = toaDoLong;
    }

    public String getToaDoLat() {
        return toaDoLat;
    }

    public void setToaDoLat(String toaDoLat) {
        this.toaDoLat = toaDoLat;
    }

    public int getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(int idHuyen) {
        this.idHuyen = idHuyen;
    }

    public String getTenSongVuot() {
        return tenSongVuot;
    }

    public void setTenSongVuot(String tenSongVuot) {
        this.tenSongVuot = tenSongVuot;
    }

    public int getIdGroup() {
        return idGroup;
    }

    public void setIdGroup(int idGroup) {
        this.idGroup = idGroup;
    }

    public String getNamXD() {
        return namXD;
    }

    public void setNamXD(String namXD) {
        this.namXD = namXD;
    }

    public String getNamKT() {
        return namKT;
    }

    public void setNamKT(String namKT) {
        this.namKT = namKT;
    }

    public int getDonViQL() {
        return donViQL;
    }

    public void setDonViQL(int donViQL) {
        this.donViQL = donViQL;
    }

    public String getChieuDai() {
        return chieuDai;
    }

    public void setChieuDai(String chieuDai) {
        this.chieuDai = chieuDai;
    }

    public String getChieuRong() {
        return chieuRong;
    }

    public void setChieuRong(String chieuRong) {
        this.chieuRong = chieuRong;
    }

    public String getBeRong_XeChay() {
        return beRong_XeChay;
    }

    public void setBeRong_XeChay(String beRong_XeChay) {
        this.beRong_XeChay = beRong_XeChay;
    }

    public String getTinhKhong() {
        return tinhKhong;
    }

    public void setTinhKhong(String tinhKhong) {
        this.tinhKhong = tinhKhong;
    }

    public String getTaiTrong_TK() {
        return taiTrong_TK;
    }

    public void setTaiTrong_TK(String taiTrong_TK) {
        this.taiTrong_TK = taiTrong_TK;
    }

    public String getTaiTrong_KT() {
        return taiTrong_KT;
    }

    public void setTaiTrong_KT(String taiTrong_KT) {
        this.taiTrong_KT = taiTrong_KT;
    }

    public String getSoNhip() {
        return soNhip;
    }

    public void setSoNhip(String soNhip) {
        this.soNhip = soNhip;
    }

    public String getSoDoNhip() {
        return soDoNhip;
    }

    public void setSoDoNhip(String soDoNhip) {
        this.soDoNhip = soDoNhip;
    }

    public String getDaiNhip() {
        return daiNhip;
    }

    public void setDaiNhip(String daiNhip) {
        this.daiNhip = daiNhip;
    }

    public int getDangCau() {
        return dangCau;
    }

    public void setDangCau(int dangCau) {
        this.dangCau = dangCau;
    }

    public String getTenDangCau() {
        return tenDangCau;
    }

    public void setTenDangCau(String tenDangCau) {
        this.tenDangCau = tenDangCau;
    }

    public int getkCMo_Mong() {
        return kCMo_Mong;
    }

    public void setkCMo_Mong(int kCMo_Mong) {
        this.kCMo_Mong = kCMo_Mong;
    }

    public int getkCMo_Than() {
        return kCMo_Than;
    }

    public void setkCMo_Than(int kCMo_Than) {
        this.kCMo_Than = kCMo_Than;
    }

    public int getkCTru_Mong() {
        return kCTru_Mong;
    }

    public void setkCTru_Mong(int kCTru_Mong) {
        this.kCTru_Mong = kCTru_Mong;
    }

    public int getkCTru_Than() {
        return kCTru_Than;
    }

    public void setkCTru_Than(int kCTru_Than) {
        this.kCTru_Than = kCTru_Than;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }

    public String getTenDuong() {
        return tenDuong;
    }

    public void setTenDuong(String tenDuong) {
        this.tenDuong = tenDuong;
    }

    public String getTenHatQL() {
        return tenHatQL;
    }

    public void setTenHatQL(String tenHatQL) {
        this.tenHatQL = tenHatQL;
    }

    public String getTenHuyen() {
        return tenHuyen;
    }

    public void setTenHuyen(String tenHuyen) {
        this.tenHuyen = tenHuyen;
    }

    public int getTinhTrang() {
        return tinhTrang;
    }

    public void setTinhTrang(int tinhTrang) {
        this.tinhTrang = tinhTrang;
    }

    public String getTenTinhTrang() {
        return tenTinhTrang;
    }

    public void setTenTinhTrang(String tenTinhTrang) {
        this.tenTinhTrang = tenTinhTrang;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public String getTenDonViQL() {
        return tenDonViQL;
    }

    public void setTenDonViQL(String tenDonViQL) {
        this.tenDonViQL = tenDonViQL;
    }

    public String getTenKCMo_Mong() {
        return tenKCMo_Mong;
    }

    public void setTenKCMo_Mong(String tenKCMo_Mong) {
        this.tenKCMo_Mong = tenKCMo_Mong;
    }

    public String getTenKCMo_Than() {
        return tenKCMo_Than;
    }

    public void setTenKCMo_Than(String tenKCMo_Than) {
        this.tenKCMo_Than = tenKCMo_Than;
    }

    public String getTenKCTru_Mong() {
        return tenKCTru_Mong;
    }

    public void setTenKCTru_Mong(String tenKCTru_Mong) {
        this.tenKCTru_Mong = tenKCTru_Mong;
    }

    public String getTenKCTru_Than() {
        return tenKCTru_Than;
    }

    public void setTenKCTru_Than(String tenKCTru_Than) {
        this.tenKCTru_Than = tenKCTru_Than;
    }

    public int getQuy() {
        return quy;
    }

    public void setQuy(int quy) {
        this.quy = quy;
    }

    public int getNam() {
        return nam;
    }

    public void setNam(int nam) {
        this.nam = nam;
    }
}
