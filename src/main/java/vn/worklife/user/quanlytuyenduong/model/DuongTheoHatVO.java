package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

@Alias("DuongTheoHatVO")
public class DuongTheoHatVO {
    private int iddh;
    private String group_Name;
    private String ten;
    private String tenDuong;
    private String chieuDai;
    private String tenHuyen;
    private int recordTotals;

    public int getIddh() {
        return iddh;
    }

    public void setIddh(int iddh) {
        this.iddh = iddh;
    }

    public String getGroup_Name() {
        return group_Name;
    }

    public void setGroup_Name(String group_Name) {
        this.group_Name = group_Name;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getTenDuong() {
        return tenDuong;
    }

    public void setTenDuong(String tenDuong) {
        this.tenDuong = tenDuong;
    }

    public String getChieuDai() {
        return chieuDai;
    }

    public void setChieuDai(String chieuDai) {
        this.chieuDai = chieuDai;
    }

    public String getTenHuyen() {
        return tenHuyen;
    }

    public void setTenHuyen(String tenHuyen) {
        this.tenHuyen = tenHuyen;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }
}
