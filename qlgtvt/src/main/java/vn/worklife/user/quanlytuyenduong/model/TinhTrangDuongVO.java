package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

@Alias("TinhTrangDuongVO")
public class TinhTrangDuongVO {
    private int id;
    private int idLyTrinh;
    private int nam;
    private int quy;
    private int tinhTrang;
    private String ghiChu;
    private String ngayBC;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdLyTrinh() {
        return idLyTrinh;
    }

    public void setIdLyTrinh(int idLyTrinh) {
        this.idLyTrinh = idLyTrinh;
    }

    public int getNam() {
        return nam;
    }

    public void setNam(int nam) {
        this.nam = nam;
    }

    public int getQuy() {
        return quy;
    }

    public void setQuy(int quy) {
        this.quy = quy;
    }

    public int getTinhTrang() {
        return tinhTrang;
    }

    public void setTinhTrang(int tinhTrang) {
        this.tinhTrang = tinhTrang;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public String getNgayBC() {
        return ngayBC;
    }

    public void setNgayBC(String ngayBC) {
        this.ngayBC = ngayBC;
    }
}
