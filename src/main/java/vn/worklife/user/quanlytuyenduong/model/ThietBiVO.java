package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

@Alias("ThietBiVO")
public class ThietBiVO {

    public int idtb;
    public int idTuyenDuong;
    public int idgroup;
    public int idLoaiTB;
    public String tenTB;
    public String lyTrinhkm;
    public String lyTrinhm;
    public int idhuyen;
    public int idxa;
    public String moTa;
    public String namHoatDong;
    public String thoiHanBaoTri;
    public String ngaybtsc_cuoi;

    public int getIdtb() {
        return idtb;
    }

    public void setIdtb(int idtb) {
        this.idtb = idtb;
    }

    public int getIdTuyenDuong() {
        return idTuyenDuong;
    }

    public void setIdTuyenDuong(int idTuyenDuong) {
        this.idTuyenDuong = idTuyenDuong;
    }

    public int getIdgroup() {
        return idgroup;
    }

    public void setIdgroup(int idgroup) {
        this.idgroup = idgroup;
    }

    public int getIdLoaiTB() {
        return idLoaiTB;
    }

    public void setIdLoaiTB(int idLoaiTB) {
        this.idLoaiTB = idLoaiTB;
    }

    public String getTenTB() {
        return tenTB;
    }

    public void setTenTB(String tenTB) {
        this.tenTB = tenTB;
    }

    public String getLyTrinhkm() {
        return lyTrinhkm;
    }

    public void setLyTrinhkm(String lyTrinhkm) {
        this.lyTrinhkm = lyTrinhkm;
    }

    public String getLyTrinhm() {
        return lyTrinhm;
    }

    public void setLyTrinhm(String lyTrinhm) {
        this.lyTrinhm = lyTrinhm;
    }

    public int getIdhuyen() {
        return idhuyen;
    }

    public void setIdhuyen(int idhuyen) {
        this.idhuyen = idhuyen;
    }

    public int getIdxa() {
        return idxa;
    }

    public void setIdxa(int idxa) {
        this.idxa = idxa;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getNamHoatDong() {
        return namHoatDong;
    }

    public void setNamHoatDong(String namHoatDong) {
        this.namHoatDong = namHoatDong;
    }

    public String getThoiHanBaoTri() {
        return thoiHanBaoTri;
    }

    public void setThoiHanBaoTri(String thoiHanBaoTri) {
        this.thoiHanBaoTri = thoiHanBaoTri;
    }

    public String getNgaybtsc_cuoi() {
        return ngaybtsc_cuoi;
    }

    public void setNgaybtsc_cuoi(String ngaybtsc_cuoi) {
        this.ngaybtsc_cuoi = ngaybtsc_cuoi;
    }
}
