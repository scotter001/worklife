package vn.worklife.user.baocaotinhtrangduong.model;

import org.apache.ibatis.type.Alias;

@Alias("LyTrinhReportVO")
public class LyTrinhReportVO {
    private String diemDau_Tu;
    private String diemDau_Den;
    private String diemCuoi_Tu;
    private String diemCuoi_Den;
    private String chieuDai;
    private String rongNen;
    private String rongMat;
    private int diaHinh;
    /*private int capQL;*/
    private String tinhTrang;
    private String ghiChu;
    private String tenCapQL;
    private String tenKetCau;

    public String getDiemDau_Tu() {
        return diemDau_Tu;
    }

    public void setDiemDau_Tu(String diemDau_Tu) {
        this.diemDau_Tu = diemDau_Tu;
    }

    public String getDiemDau_Den() {
        return diemDau_Den;
    }

    public void setDiemDau_Den(String diemDau_Den) {
        this.diemDau_Den = diemDau_Den;
    }

    public String getDiemCuoi_Tu() {
        return diemCuoi_Tu;
    }

    public void setDiemCuoi_Tu(String diemCuoi_Tu) {
        this.diemCuoi_Tu = diemCuoi_Tu;
    }

    public String getDiemCuoi_Den() {
        return diemCuoi_Den;
    }

    public void setDiemCuoi_Den(String diemCuoi_Den) {
        this.diemCuoi_Den = diemCuoi_Den;
    }

    public String getChieuDai() {
        return chieuDai;
    }

    public void setChieuDai(String chieuDai) {
        this.chieuDai = chieuDai;
    }

    public String getRongNen() {
        return rongNen;
    }

    public void setRongNen(String rongNen) {
        this.rongNen = rongNen;
    }

    public String getRongMat() {
        return rongMat;
    }

    public void setRongMat(String rongMat) {
        this.rongMat = rongMat;
    }

    public int getDiaHinh() {
        return diaHinh;
    }

    public void setDiaHinh(int diaHinh) {
        this.diaHinh = diaHinh;
    }

    /*public int getCapQL() {
        return capQL;
    }

    public void setCapQL(int capQL) {
        this.capQL = capQL;
    }*/

    public String getTinhTrang() {
        return tinhTrang;
    }

    public void setTinhTrang(String tinhTrang) {
        this.tinhTrang = tinhTrang;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public String getTenCapQL() {
        return tenCapQL;
    }

    public void setTenCapQL(String tenCapQL) {
        this.tenCapQL = tenCapQL;
    }

    public String getTenKetCau() {
        return tenKetCau;
    }

    public void setTenKetCau(String tenKetCau) {
        this.tenKetCau = tenKetCau;
    }
}
