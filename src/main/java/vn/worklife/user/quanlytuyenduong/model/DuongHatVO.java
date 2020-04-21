package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

import java.util.List;

@Alias("DuongHatVO")
public class DuongHatVO {
    private int iddh;
    private int idTuyenDuong;
    private int idGroup;
    private String diaDanh_DiemDau;
    private String diaDanh_DiemCuoi;
    private String chieuDai;
    private int position;
    List<DoanDuongVO> listDoanDuongVOs;
    //add 27/2/2020
    List<LyTrinhVO> lyTrinhVOS;
    private int idLoaiDuong;

    public int getIddh() {
        return iddh;
    }

    public void setIddh(int iddh) {
        this.iddh = iddh;
    }

    public int getIdTuyenDuong() {
        return idTuyenDuong;
    }

    public void setIdTuyenDuong(int idTuyenDuong) {
        this.idTuyenDuong = idTuyenDuong;
    }

    public int getIdGroup() {
        return idGroup;
    }

    public void setIdGroup(int idGroup) {
        this.idGroup = idGroup;
    }

    public String getDiaDanh_DiemDau() {
        return diaDanh_DiemDau;
    }

    public void setDiaDanh_DiemDau(String diaDanh_DiemDau) {
        this.diaDanh_DiemDau = diaDanh_DiemDau;
    }

    public String getDiaDanh_DiemCuoi() {
        return diaDanh_DiemCuoi;
    }

    public void setDiaDanh_DiemCuoi(String diaDanh_DiemCuoi) {
        this.diaDanh_DiemCuoi = diaDanh_DiemCuoi;
    }

    public String getChieuDai() {
        return chieuDai;
    }

    public void setChieuDai(String chieuDai) {
        this.chieuDai = chieuDai;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public List<DoanDuongVO> getListDoanDuongVOs() {
        return listDoanDuongVOs;
    }

    public void setListDoanDuongVOs(List<DoanDuongVO> listDoanDuongVOs) {
        this.listDoanDuongVOs = listDoanDuongVOs;
    }

    public int getIdLoaiDuong() {
        return idLoaiDuong;
    }

    public void setIdLoaiDuong(int idLoaiDuong) {
        this.idLoaiDuong = idLoaiDuong;
    }

    public List<LyTrinhVO> getLyTrinhVOS() {
        return lyTrinhVOS;
    }

    public void setLyTrinhVOS(List<LyTrinhVO> lyTrinhVOS) {
        this.lyTrinhVOS = lyTrinhVOS;
    }
}
