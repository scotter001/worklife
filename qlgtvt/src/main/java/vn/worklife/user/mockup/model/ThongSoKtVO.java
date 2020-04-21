package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

@Alias("ThongSoKtVO")
public class ThongSoKtVO {

    private int idThongSoKt;
    private int idCauKt;
    private int noiDung;
    private String dvtThongSoKt;
    private int recordTotals;
    private String soLieuKt;
    private String tenDm;
    private int loai;
    private int loaiDuLieu;

    public int getLoai() {
        return loai;
    }

    public void setLoai(int loai) {
        this.loai = loai;
    }

    public int getLoaiDuLieu() {
        return loaiDuLieu;
    }

    public void setLoaiDuLieu(int loaiDuLieu) {
        this.loaiDuLieu = loaiDuLieu;
    }

    public String getTenDm() {
        return tenDm;
    }

    public void setTenDm(String tenDm) {
        this.tenDm = tenDm;
    }

    public String getSoLieuKt() {
        return soLieuKt;
    }

    public void setSoLieuKt(String soLieuKt) {
        this.soLieuKt = soLieuKt;
    }

    public int getIdCauKt() {
        return idCauKt;
    }

    public void setIdCauKt(int idCauKt) {
        this.idCauKt = idCauKt;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }

    public int getIdThongSoKt() {
        return idThongSoKt;
    }

    public void setIdThongSoKt(int idThongSoKt) {
        this.idThongSoKt = idThongSoKt;
    }

    public String getDvtThongSoKt() {
        return dvtThongSoKt;
    }

    public void setDvtThongSoKt(String dvtThongSoKt) {
        this.dvtThongSoKt = dvtThongSoKt;
    }

    public int getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(int noiDung) {
        this.noiDung = noiDung;
    }
}
