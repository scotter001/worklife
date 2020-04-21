/**
 * Copyright (c) 2018
 * Author : Nhut Nguyen
 * */
package vn.worklife.user.mockup.model;

import java.io.Serializable;

public class ThongSoKiemTraCauVO implements Serializable {
    private int idThongSoKiemTra;
    private int idCau;
    private int noiDung;
    private String dvt;
    private String soLieu;

    public int getIdThongSoKiemTra() {
        return idThongSoKiemTra;
    }

    public void setIdThongSoKiemTra(int idThongSoKiemTra) {
        this.idThongSoKiemTra = idThongSoKiemTra;
    }

    public int getIdCau() {
        return idCau;
    }

    public void setIdCau(int idCau) {
        this.idCau = idCau;
    }

    public int getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(int noiDung) {
        this.noiDung = noiDung;
    }

    public String getDvt() {
        return dvt;
    }

    public void setDvt(String dvt) {
        this.dvt = dvt;
    }

    public String getSoLieu() {
        return soLieu;
    }

    public void setSoLieu(String soLieu) {
        this.soLieu = soLieu;
    }
}
