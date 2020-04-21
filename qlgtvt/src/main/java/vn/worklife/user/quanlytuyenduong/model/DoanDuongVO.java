package vn.worklife.user.quanlytuyenduong.model;

import org.apache.ibatis.type.Alias;

@Alias("DoanDuongVO")
public class DoanDuongVO {
    private int idDoan;
    private int iddh;
    private String lyTrinh_Tu;
    private String lyTrinh_Den;
    private String chieuDai;
    private int idUser;
    private int idHuyen;
    private String telephone;

    public int getIdDoan() {
        return idDoan;
    }

    public void setIdDoan(int idDoan) {
        this.idDoan = idDoan;
    }

    public int getIddh() {
        return iddh;
    }

    public void setIddh(int iddh) {
        this.iddh = iddh;
    }

    public String getLyTrinh_Tu() {
        return lyTrinh_Tu;
    }

    public void setLyTrinh_Tu(String lyTrinh_Tu) {
        this.lyTrinh_Tu = lyTrinh_Tu;
    }

    public String getLyTrinh_Den() {
        return lyTrinh_Den;
    }

    public void setLyTrinh_Den(String lyTrinh_Den) {
        this.lyTrinh_Den = lyTrinh_Den;
    }

    public String getChieuDai() {
        return chieuDai;
    }

    public void setChieuDai(String chieuDai) {
        this.chieuDai = chieuDai;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public int getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(int idHuyen) {
        this.idHuyen = idHuyen;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }
}
