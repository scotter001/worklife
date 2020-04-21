package vn.worklife.user.quanlyquyhoach.model;

import org.apache.ibatis.type.Alias;

@Alias("DmThamDinhVO")
public class DmThamDinhVO {
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
