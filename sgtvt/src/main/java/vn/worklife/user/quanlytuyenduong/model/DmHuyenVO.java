package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

@Alias("DmHuyenVO")
public class DmHuyenVO {
    private int idHuyen;
    private String maHuyen;
    private String tenHuyen;
    private int loai;
    private int idTinh;
    private boolean selected;

    public int getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(int idHuyen) {
        this.idHuyen = idHuyen;
    }

    public String getMaHuyen() {
        return maHuyen;
    }

    public void setMaHuyen(String maHuyen) {
        this.maHuyen = maHuyen;
    }

    public String getTenHuyen() {
        return tenHuyen;
    }

    public void setTenHuyen(String tenHuyen) {
        this.tenHuyen = tenHuyen;
    }

    public int getLoai() {
        return loai;
    }

    public void setLoai(int loai) {
        this.loai = loai;
    }

    public int getIdTinh() {
        return idTinh;
    }

    public void setIdTinh(int idTinh) {
        this.idTinh = idTinh;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }
}
