package vn.worklife.user.quanlycau.model;

import org.apache.ibatis.type.Alias;

@Alias("DmKetCauVO")
public class DmKetCauVO {
    private int id;
    private String ten;

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
}
