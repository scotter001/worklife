package vn.worklife.qlctgt.user.danhsachhoso.model;

import org.apache.ibatis.type.Alias;

@Alias("HoSoVO")
public class HoSoVO {
    private int idHoSo;
    private int idLoaiHoSo;
    private int idDanhSach_HoSo;
    private int idHuyen;
    private String tenHuyen;
    private String tenLoaiHS;
    private String soBienNhan;
    private String ngayNhan;
    private String ngayHenTra;
    private String tenDoanhNghiep;
    private String diaChi_DN;
    private int idHoSo_Old;
    private int user_Nhan;
    private int idHoSo_Buoc1;
    private int idDMDN;
    private int idCongTrinh;
    private String user_FullName;
    private String ngayChuyenDen;
    private int trangThai;
    private String tenTrangThai;
    private String daiDien;
    private String chucVu;
    private String dienThoai;
    private int thoiHan;
    private int thoiHanTY;
    private int recordTotals;

    public int getIdHoSo() {
        return idHoSo;
    }

    public void setIdHoSo(int idHoSo) {
        this.idHoSo = idHoSo;
    }

    public int getIdLoaiHoSo() {
        return idLoaiHoSo;
    }

    public void setIdLoaiHoSo(int idLoaiHoSo) {
        this.idLoaiHoSo = idLoaiHoSo;
    }

    public int getIdDanhSach_HoSo() {
        return idDanhSach_HoSo;
    }

    public void setIdDanhSach_HoSo(int idDanhSach_HoSo) {
        this.idDanhSach_HoSo = idDanhSach_HoSo;
    }

    public int getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(int idHuyen) {
        this.idHuyen = idHuyen;
    }

    public String getTenHuyen() {
        return tenHuyen;
    }

    public void setTenHuyen(String tenHuyen) {
        this.tenHuyen = tenHuyen;
    }

    public String getTenLoaiHS() {
        return tenLoaiHS;
    }

    public void setTenLoaiHS(String tenLoaiHS) {
        this.tenLoaiHS = tenLoaiHS;
    }

    public String getSoBienNhan() {
        return soBienNhan;
    }

    public void setSoBienNhan(String soBienNhan) {
        this.soBienNhan = soBienNhan;
    }

    public String getNgayNhan() {
        return ngayNhan;
    }

    public void setNgayNhan(String ngayNhan) {
        this.ngayNhan = ngayNhan;
    }

    public String getNgayHenTra() {
        return ngayHenTra;
    }

    public void setNgayHenTra(String ngayHenTra) {
        this.ngayHenTra = ngayHenTra;
    }

    public String getTenDoanhNghiep() {
        return tenDoanhNghiep;
    }

    public void setTenDoanhNghiep(String tenDoanhNghiep) {
        this.tenDoanhNghiep = tenDoanhNghiep;
    }

    public String getDiaChi_DN() {
        return diaChi_DN;
    }

    public void setDiaChi_DN(String diaChi_DN) {
        this.diaChi_DN = diaChi_DN;
    }

    public int getIdHoSo_Old() {
        return idHoSo_Old;
    }

    public void setIdHoSo_Old(int idHoSo_Old) {
        this.idHoSo_Old = idHoSo_Old;
    }

    public int getUser_Nhan() {
        return user_Nhan;
    }

    public void setUser_Nhan(int user_Nhan) {
        this.user_Nhan = user_Nhan;
    }

    public int getIdHoSo_Buoc1() {
        return idHoSo_Buoc1;
    }

    public void setIdHoSo_Buoc1(int idHoSo_Buoc1) {
        this.idHoSo_Buoc1 = idHoSo_Buoc1;
    }

    public int getIdDMDN() {
        return idDMDN;
    }

    public void setIdDMDN(int idDMDN) {
        this.idDMDN = idDMDN;
    }

    public int getIdCongTrinh() {
        return idCongTrinh;
    }

    public void setIdCongTrinh(int idCongTrinh) {
        this.idCongTrinh = idCongTrinh;
    }

    public String getUser_FullName() {
        return user_FullName;
    }

    public void setUser_FullName(String user_FullName) {
        this.user_FullName = user_FullName;
    }

    public String getNgayChuyenDen() {
        return ngayChuyenDen;
    }

    public void setNgayChuyenDen(String ngayChuyenDen) {
        this.ngayChuyenDen = ngayChuyenDen;
    }

    public int getTrangThai() {
        return trangThai;
    }

    public void setTrangThai(int trangThai) {
        this.trangThai = trangThai;
    }

    public String getTenTrangThai() {
        return tenTrangThai;
    }

    public void setTenTrangThai(String tenTrangThai) {
        this.tenTrangThai = tenTrangThai;
    }

    public String getDaiDien() {
        return daiDien;
    }

    public void setDaiDien(String daiDien) {
        this.daiDien = daiDien;
    }

    public String getChucVu() {
        return chucVu;
    }

    public void setChucVu(String chucVu) {
        this.chucVu = chucVu;
    }

    public String getDienThoai() {
        return dienThoai;
    }

    public void setDienThoai(String dienThoai) {
        this.dienThoai = dienThoai;
    }

    public int getThoiHan() {
        return thoiHan;
    }

    public void setThoiHan(int thoiHan) {
        this.thoiHan = thoiHan;
    }

    public int getThoiHanTY() {
        return thoiHanTY;
    }

    public void setThoiHanTY(int thoiHanTY) {
        this.thoiHanTY = thoiHanTY;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }
}
