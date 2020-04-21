package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

@Alias("TuyenDuongHatVO")
public class TuyenDuongHatVO {
    private int idTuyenDuong;
    private int idLoaiDuong;
    private String tenDuong;
    private String chieuDai;

    public int getIdTuyenDuong() {
        return idTuyenDuong;
    }

    public void setIdTuyenDuong(int idTuyenDuong) {
        this.idTuyenDuong = idTuyenDuong;
    }

    public int getIdLoaiDuong() {
        return idLoaiDuong;
    }

    public void setIdLoaiDuong(int idLoaiDuong) {
        this.idLoaiDuong = idLoaiDuong;
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
}
