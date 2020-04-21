package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

@Alias("DmKetCauMatDuongVO")
public class DmKetCauMatDuongVO {
    private int idKetCauMat;
    private String ten;

    public int getIdKetCauMat() {
        return idKetCauMat;
    }

    public void setIdKetCauMat(int idKetCauMat) {
        this.idKetCauMat = idKetCauMat;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }
}
