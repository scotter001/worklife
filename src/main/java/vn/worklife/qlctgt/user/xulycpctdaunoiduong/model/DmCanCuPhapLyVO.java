package vn.worklife.qlctgt.user.xulycpctdaunoiduong.model;

import org.apache.ibatis.type.Alias;

@Alias("DmCanCuPhapLyVO")
public class DmCanCuPhapLyVO {
    private int id;
    private String noiDung;
    private int idLoaiHS;
    private int suDung;
    private int loaiGiay;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public int getIdLoaiHS() {
        return idLoaiHS;
    }

    public void setIdLoaiHS(int idLoaiHS) {
        this.idLoaiHS = idLoaiHS;
    }

    public int getSuDung() {
        return suDung;
    }

    public void setSuDung(int suDung) {
        this.suDung = suDung;
    }

    public int getLoaiGiay() {
        return loaiGiay;
    }

    public void setLoaiGiay(int loaiGiay) {
        this.loaiGiay = loaiGiay;
    }
}
