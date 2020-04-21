package vn.worklife.qlctgt.user.xulycpctthietyeu.model;

import org.apache.ibatis.type.Alias;

@Alias("CongTrinhChiTietVO")
public class CongTrinhChiTietVO {
    private int idctct;
    private int idCongTrinh;
    private int idHuyen;
    private int idXa;
    private String tenDuong;
    private String lyTrinh;
    private String ranhDao_Dai;
    private String ranhDao_Rong;
    private String ranhDao_Sau;
    private String dienTich;
    private String dienGiai;
    private String ghiChu;
    private String nhieuDuong;

    private String tenHuyen;
    private String tenXa;


    public int getIdctct() {
        return idctct;
    }

    public void setIdctct(int idctct) {
        this.idctct = idctct;
    }

    public int getIdCongTrinh() {
        return idCongTrinh;
    }

    public void setIdCongTrinh(int idCongTrinh) {
        this.idCongTrinh = idCongTrinh;
    }

    public int getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(int idHuyen) {
        this.idHuyen = idHuyen;
    }

    public int getIdXa() {
        return idXa;
    }

    public void setIdXa(int idXa) {
        this.idXa = idXa;
    }

    public String getTenDuong() {
        return tenDuong;
    }

    public void setTenDuong(String tenDuong) {
        this.tenDuong = tenDuong;
    }

    public String getLyTrinh() {
        return lyTrinh;
    }

    public void setLyTrinh(String lyTrinh) {
        this.lyTrinh = lyTrinh;
    }

    public String getRanhDao_Dai() {
        return ranhDao_Dai;
    }

    public void setRanhDao_Dai(String ranhDao_Dai) {
        this.ranhDao_Dai = ranhDao_Dai;
    }

    public String getRanhDao_Rong() {
        return ranhDao_Rong;
    }

    public void setRanhDao_Rong(String ranhDao_Rong) {
        this.ranhDao_Rong = ranhDao_Rong;
    }

    public String getRanhDao_Sau() {
        return ranhDao_Sau;
    }

    public void setRanhDao_Sau(String ranhDao_Sau) {
        this.ranhDao_Sau = ranhDao_Sau;
    }

    public String getDienTich() {
        return dienTich;
    }

    public void setDienTich(String dienTich) {
        this.dienTich = dienTich;
    }

    public String getDienGiai() {
        return dienGiai;
    }

    public void setDienGiai(String dienGiai) {
        this.dienGiai = dienGiai;
    }

    public String getGhiChu() {
        return ghiChu;
    }

    public void setGhiChu(String ghiChu) {
        this.ghiChu = ghiChu;
    }

    public String getNhieuDuong() {
        return nhieuDuong;
    }

    public void setNhieuDuong(String nhieuDuong) {
        this.nhieuDuong = nhieuDuong;
    }

    public String getTenHuyen() {
        return tenHuyen;
    }

    public void setTenHuyen(String tenHuyen) {
        this.tenHuyen = tenHuyen;
    }

    public String getTenXa() {
        return tenXa;
    }

    public void setTenXa(String tenXa) {
        this.tenXa = tenXa;
    }
}
