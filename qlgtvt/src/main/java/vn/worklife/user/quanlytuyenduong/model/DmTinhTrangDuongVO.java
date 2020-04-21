package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

@Alias("DmTinhTrangDuongVO")
public class DmTinhTrangDuongVO {
    private int idTinhTrang;
    private String ten;

    public int getIdTinhTrang() {
        return idTinhTrang;
    }

    public void setIdTinhTrang(int idTinhTrang) {
        this.idTinhTrang = idTinhTrang;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }
}
