package vn.worklife.user.quanlyquyhoach.model;

import org.apache.ibatis.type.Alias;

@Alias("DmCQDuyetVO")
public class DmCQDuyetVO {
    private int id;
    private String ten;
    private int cap;

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

    public int getCap() {
        return cap;
    }

    public void setCap(int cap) {
        this.cap = cap;
    }
}
