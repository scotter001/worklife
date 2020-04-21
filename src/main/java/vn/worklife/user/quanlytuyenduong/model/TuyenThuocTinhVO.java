package vn.worklife.user.quanlytuyenduong.model;


import org.apache.ibatis.type.Alias;

import java.util.List;

@Alias("TuyenThuocTinhVO")
public class TuyenThuocTinhVO {
    private int idTuyenDuong;
    private int idLoaiDuong;
    private String ten;
    private String tenDuong;
    private String chieuDai;
    List<TuyenThuocTinhVO> tuyenDuongVOs;


    public int getIdTuyenDuong() {
        return idTuyenDuong;
    }

    public void setIdTuyenDuong(int idTuyenDuong) {
        this.idTuyenDuong = idTuyenDuong;
    }

    public int getIdLoaiDuong() {
        return idLoaiDuong;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
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

    public List<TuyenThuocTinhVO> getTuyenDuongVOs() {
        return tuyenDuongVOs;
    }

    public void setTuyenDuongVOs(List<TuyenThuocTinhVO> tuyenDuongVOs) {
        this.tuyenDuongVOs = tuyenDuongVOs;
    }
}

