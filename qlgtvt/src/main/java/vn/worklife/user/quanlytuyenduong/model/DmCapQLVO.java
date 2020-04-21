package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

@Alias("DmCapQLVO")
public class DmCapQLVO {
    private int idCapQL;
    private String ten;

    public int getIdCapQL() {
        return idCapQL;
    }

    public void setIdCapQL(int idCapQL) {
        this.idCapQL = idCapQL;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }
}
