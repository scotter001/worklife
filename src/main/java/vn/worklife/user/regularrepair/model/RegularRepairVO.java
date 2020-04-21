/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.regularrepair.model;

import org.apache.ibatis.type.Alias;

@Alias("RegularRepairVO")
public class RegularRepairVO {
    private int idsctx;
    private int iddmsctx;
    private String tungay_kh;
    private String denngay_kh;
    private String chichu_kh;
    private String tungay_th;
    private String denngay_th;
    private String ghichu_th;
    private String ngaykiemtra;
    private int thuchien;
    private String danhgia;

    public int getIdsctx() {
        return idsctx;
    }

    public void setIdsctx(int idsctx) {
        this.idsctx = idsctx;
    }

    public int getIddmsctx() {
        return iddmsctx;
    }

    public void setIddmsctx(int iddmsctx) {
        this.iddmsctx = iddmsctx;
    }

    public String getTungay_kh() {
        return tungay_kh;
    }


    public void setTungay_kh(String tungay_kh) {
        this.tungay_kh = tungay_kh;
    }

    public String getDenngay_kh() {
        return denngay_kh;
    }

    public void setDenngay_kh(String denngay_kh) {
        this.denngay_kh = denngay_kh;
    }

    public String getChichu_kh() {
        return chichu_kh;
    }

    public void setChichu_kh(String chichu_kh) {
        this.chichu_kh = chichu_kh;
    }

    public String getTungay_th() {
        return tungay_th;
    }

    public void setTungay_th(String tungay_th) {
        this.tungay_th = tungay_th;
    }

    public String getDenngay_th() {
        return denngay_th;
    }

    public void setDenngay_th(String denngay_th) {
        this.denngay_th = denngay_th;
    }

    public String getGhichu_th() {
        return ghichu_th;
    }

    public void setGhichu_th(String ghichu_th) {
        this.ghichu_th = ghichu_th;
    }

    public String getNgaykiemtra() {
        return ngaykiemtra;
    }

    public void setNgaykiemtra(String ngaykiemtra) {
        this.ngaykiemtra = ngaykiemtra;
    }

    public String getDanhgia() {
        return danhgia;
    }

    public void setDanhgia(String danhgia) {
        this.danhgia = danhgia;
    }

    public int getThuchien() {
        return thuchien;
    }

    public void setThuchien(int thuchien) {
        this.thuchien = thuchien;
    }
}
