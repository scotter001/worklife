package vn.worklife.qlctgt.user.xulycpctthietyeu.model;

import org.apache.ibatis.type.Alias;

@Alias("DmLoaiCongTrinhVO")
public class DmLoaiCongTrinhVO {
    private int id;
    private String ten;
    private int idLoaiHS;
    private int thoiHan;
    private int loai;

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

    public int getIdLoaiHS() {
        return idLoaiHS;
    }

    public void setIdLoaiHS(int idLoaiHS) {
        this.idLoaiHS = idLoaiHS;
    }

    public int getThoiHan() {
        return thoiHan;
    }

    public void setThoiHan(int thoiHan) {
        this.thoiHan = thoiHan;
    }

    public int getLoai() {
        return loai;
    }

    public void setLoai(int loai) {
        this.loai = loai;
    }
}
