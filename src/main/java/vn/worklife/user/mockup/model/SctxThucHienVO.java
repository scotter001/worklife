/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

import java.io.Serializable;

@Alias("SctxThucHienVO")
public class SctxThucHienVO implements Serializable {
    private static final long serialVersionUID = 3240462664816863518L;
    private int idSctx;
    private int idDmSctx;
    private String tuNgayKh;
    private String denNgayKh;
    private String ghiChuKh;
    private String tuNgayTh;
    private String denNgayTh;
    private String ghiChuTh;
    private String ngayKiemTra;
    private int thucHien;
    private String danhGia;
    private String keHoach_TH;
    private String thoiGian_TH;
    private String ngayKT;
    private String nguoiKT;

    public int getIdSctx() {
        return idSctx;
    }

    public void setIdSctx(int idSctx) {
        this.idSctx = idSctx;
    }

    public int getIdDmSctx() {
        return idDmSctx;
    }

    public void setIdDmSctx(int idDmSctx) {
        this.idDmSctx = idDmSctx;
    }

    public String getTuNgayKh() {
        return tuNgayKh;
    }

    public void setTuNgayKh(String tuNgayKh) {
        this.tuNgayKh = tuNgayKh;
    }

    public String getDenNgayKh() {
        return denNgayKh;
    }

    public void setDenNgayKh(String denNgayKh) {
        this.denNgayKh = denNgayKh;
    }

    public String getGhiChuKh() {
        return ghiChuKh;
    }

    public void setGhiChuKh(String ghiChuKh) {
        this.ghiChuKh = ghiChuKh;
    }

    public String getTuNgayTh() {
        return tuNgayTh;
    }

    public void setTuNgayTh(String tuNgayTh) {
        this.tuNgayTh = tuNgayTh;
    }

    public String getDenNgayTh() {
        return denNgayTh;
    }

    public void setDenNgayTh(String denNgayTh) {
        this.denNgayTh = denNgayTh;
    }

    public String getGhiChuTh() {
        return ghiChuTh;
    }

    public void setGhiChuTh(String ghiChuTh) {
        this.ghiChuTh = ghiChuTh;
    }

    public String getNgayKiemTra() {
        return ngayKiemTra;
    }

    public void setNgayKiemTra(String ngayKiemTra) {
        this.ngayKiemTra = ngayKiemTra;
    }

    public int getThucHien() {
        return thucHien;
    }

    public void setThucHien(int thucHien) {
        this.thucHien = thucHien;
    }

    public String getDanhGia() {
        return danhGia;
    }

    public void setDanhGia(String danhGia) {
        this.danhGia = danhGia;
    }

    public String getKeHoach_TH() {
        return keHoach_TH;
    }

    public void setKeHoach_TH(String keHoach_TH) {
        this.keHoach_TH = keHoach_TH;
    }

    public String getThoiGian_TH() {
        return thoiGian_TH;
    }

    public void setThoiGian_TH(String thoiGian_TH) {
        this.thoiGian_TH = thoiGian_TH;
    }

    public String getNgayKT() {
        return ngayKT;
    }

    public void setNgayKT(String ngayKT) {
        this.ngayKT = ngayKT;
    }

    public String getNguoiKT() {
        return nguoiKT;
    }

    public void setNguoiKT(String nguoiKT) {
        this.nguoiKT = nguoiKT;
    }

    public String getKeHoachThucHien(){
        String returnVal="";
        if (tuNgayKh != null) {
            returnVal = tuNgayKh;
            if (denNgayKh != null) {
                returnVal = returnVal + " - " + denNgayKh;
            }
        }
        return returnVal;
    }
    public String getThoiGianThucHien(){
        String returnVal="";
        if (tuNgayTh != null) {
            returnVal = tuNgayTh;
            if (denNgayTh != null) {
                returnVal = returnVal + " - " + denNgayTh;
            }
        }
        return returnVal;
    }
    public String getKetQua(){
        if(thucHien ==1){
            return "Đã thực hiện";
        }else{
            return "Chưa thực hiện";
        }
    }
}
