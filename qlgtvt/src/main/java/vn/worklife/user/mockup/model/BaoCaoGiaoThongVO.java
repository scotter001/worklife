/**
 * Copyright (c) 2018
 * Author : Nhut Nguyen
 * */
package vn.worklife.user.mockup.model;

import java.io.Serializable;

public class BaoCaoGiaoThongVO implements Serializable {
    private int idBaoCaoGt;
    private int idTuyenDuong;
    private int idLoai;

    public int getIdBaoCaoGt() {
        return idBaoCaoGt;
    }

    public void setIdBaoCaoGt(int idBaoCaoGt) {
        this.idBaoCaoGt = idBaoCaoGt;
    }

    public int getIdTuyenDuong() {
        return idTuyenDuong;
    }

    public void setIdTuyenDuong(int idTuyenDuong) {
        this.idTuyenDuong = idTuyenDuong;
    }

    public int getIdLoai() {
        return idLoai;
    }

    public void setIdLoai(int idLoai) {
        this.idLoai = idLoai;
    }
}
