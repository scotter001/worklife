package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

@Alias("DmUTSCTXVO")
public class DmUTSCTXVO {
    private int id;
    private String ten;


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


}
