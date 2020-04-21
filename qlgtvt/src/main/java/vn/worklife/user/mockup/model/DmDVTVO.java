package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

@Alias("DmDVTVO")
public class DmDVTVO {
    private int iddvt;
    private String ten;

    public int getIddvt() {
        return iddvt;
    }

    public void setIddvt(int iddvt) {
        this.iddvt = iddvt;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }
}
