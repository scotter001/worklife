package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

@Alias("DmhmSCTXVO")
public class DmhmSCTXVO {
    private int id;
    private String ten;
    private String thuoc;


    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getThuoc() {
        return thuoc;
    }

    public void setThuoc(String thuoc) {
        this.thuoc = thuoc;
    }
}
