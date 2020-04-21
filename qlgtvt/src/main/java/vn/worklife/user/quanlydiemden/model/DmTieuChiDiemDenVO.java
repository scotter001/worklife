package vn.worklife.user.quanlydiemden.model;

import org.apache.ibatis.type.Alias;

@Alias("DmTieuChiDiemDenVO")
public class DmTieuChiDiemDenVO {
    private int id;
    private String ten;
    private String phanLoai;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getPhanLoai() {
        return phanLoai;
    }

    public void setPhanLoai(String phanLoai) {
        this.phanLoai = phanLoai;
    }
}
