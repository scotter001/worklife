package vn.worklife.qlctgt.user.xulycpctthietyeu.model;

import org.apache.ibatis.type.Alias;

@Alias("ThuPhiCongThucVO")
public class ThuPhiCongThucVO {
    private int id;
    private int idPhi;
    private String congThuc;
    private String dienTich;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdPhi() {
        return idPhi;
    }

    public void setIdPhi(int idPhi) {
        this.idPhi = idPhi;
    }

    public String getCongThuc() {
        return congThuc;
    }

    public void setCongThuc(String congThuc) {
        this.congThuc = congThuc;
    }

    public String getDienTich() {
        return dienTich;
    }

    public void setDienTich(String dienTich) {
        this.dienTich = dienTich;
    }
}
