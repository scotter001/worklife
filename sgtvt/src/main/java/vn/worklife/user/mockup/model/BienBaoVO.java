package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

import java.io.Serializable;

@Alias("BienBaoVO")
public class BienBaoVO implements Serializable {

    private int idBbdth;
    private int lyTrinhKmBbdth;
    private int lyTrinhMBbdth;
    private int idTuyenDuongBbdth;
    private int namHoatDong;
    private int thoiGianBaoTri;
    private int recordTotals;
    private float kinhDoBbdth;
    private float viDoBbdth;
    private String tenDuongBbdth;
    private String ngayBaoTri;
    private String tenBbdth;
    private String maHuyenBbdth;
    private String maXaBbdth;
    private String moTaBbdth;

    public int getIdBbdth() {
        return idBbdth;
    }

    public void setIdBbdth(int idBbdth) {
        this.idBbdth = idBbdth;
    }

    public int getLyTrinhKmBbdth() {
        return lyTrinhKmBbdth;
    }

    public void setLyTrinhKmBbdth(int lyTrinhKmBbdth) {
        this.lyTrinhKmBbdth = lyTrinhKmBbdth;
    }

    public int getLyTrinhMBbdth() {
        return lyTrinhMBbdth;
    }

    public void setLyTrinhMBbdth(int lyTrinhMBbdth) {
        this.lyTrinhMBbdth = lyTrinhMBbdth;
    }

    public int getIdTuyenDuongBbdth() {
        return idTuyenDuongBbdth;
    }

    public void setIdTuyenDuongBbdth(int idTuyenDuongBbdth) {
        this.idTuyenDuongBbdth = idTuyenDuongBbdth;
    }

    public int getNamHoatDong() {
        return namHoatDong;
    }

    public void setNamHoatDong(int namHoatDong) {
        this.namHoatDong = namHoatDong;
    }

    public int getThoiGianBaoTri() {
        return thoiGianBaoTri;
    }

    public void setThoiGianBaoTri(int thoiGianBaoTri) {
        this.thoiGianBaoTri = thoiGianBaoTri;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }

    public float getKinhDoBbdth() {
        return kinhDoBbdth;
    }

    public void setKinhDoBbdth(float kinhDoBbdth) {
        this.kinhDoBbdth = kinhDoBbdth;
    }

    public float getViDoBbdth() {
        return viDoBbdth;
    }

    public void setViDoBbdth(float viDoBbdth) {
        this.viDoBbdth = viDoBbdth;
    }

    public String getTenDuongBbdth() {
        return tenDuongBbdth;
    }

    public void setTenDuongBbdth(String tenDuongBbdth) {
        this.tenDuongBbdth = tenDuongBbdth;
    }

    public String getNgayBaoTri() {
        return ngayBaoTri;
    }

    public void setNgayBaoTri(String ngayBaoTri) {
        this.ngayBaoTri = ngayBaoTri;
    }

    public String getTenBbdth() {
        return tenBbdth;
    }

    public void setTenBbdth(String tenBbdth) {
        this.tenBbdth = tenBbdth;
    }

    public String getMaHuyenBbdth() {
        return maHuyenBbdth;
    }

    public void setMaHuyenBbdth(String maHuyenBbdth) {
        this.maHuyenBbdth = maHuyenBbdth;
    }

    public String getMaXaBbdth() {
        return maXaBbdth;
    }

    public void setMaXaBbdth(String maXaBbdth) {
        this.maXaBbdth = maXaBbdth;
    }

    public String getMoTaBbdth() {
        return moTaBbdth;
    }

    public void setMoTaBbdth(String moTaBbdth) {
        this.moTaBbdth = moTaBbdth;
    }
}
