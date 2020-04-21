package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.List;

@Alias("BridgeVO")
public class BridgeVO implements Serializable {

    private int idCau;
    private int idTuyenDuongCau;
    private int loaiCau;
    private int lyTrinhKm;
    private int lyTrinhM;
    private int doiTuongVuot;
    private int chayChungVoi;
    private int ketCauNhip;
    private int vatLieuNhipChinh;
    private int bienHanChe;
    private int taiTrong;
    private int xeThanLien;
    private int xeSoMiRoMooc;
    private int xeKeoRoMooc;
    private int chongVaXo;
    private int bClav;
    private int bClcrit;
    private int recordTotals;
    private float kinhDo;
    private float viDo;
    private String tenDuongCau;
    private String tenCau;
    private String maHuyenCau;
    private String maXaCau;
    private List<ThongSoKtVO> details;

    public int getIdCau() {
        return idCau;
    }

    public void setIdCau(int idCau) {
        this.idCau = idCau;
    }

    public int getIdTuyenDuongCau() {
        return idTuyenDuongCau;
    }

    public void setIdTuyenDuongCau(int idTuyenDuongCau) {
        this.idTuyenDuongCau = idTuyenDuongCau;
    }

    public int getLoaiCau() {
        return loaiCau;
    }

    public void setLoaiCau(int loaiCau) {
        this.loaiCau = loaiCau;
    }

    public int getLyTrinhKm() {
        return lyTrinhKm;
    }

    public void setLyTrinhKm(int lyTrinhKm) {
        this.lyTrinhKm = lyTrinhKm;
    }

    public int getLyTrinhM() {
        return lyTrinhM;
    }

    public void setLyTrinhM(int lyTrinhM) {
        this.lyTrinhM = lyTrinhM;
    }

    public int getDoiTuongVuot() {
        return doiTuongVuot;
    }

    public void setDoiTuongVuot(int doiTuongVuot) {
        this.doiTuongVuot = doiTuongVuot;
    }

    public int getChayChungVoi() {
        return chayChungVoi;
    }

    public void setChayChungVoi(int chayChungVoi) {
        this.chayChungVoi = chayChungVoi;
    }

    public int getKetCauNhip() {
        return ketCauNhip;
    }

    public void setKetCauNhip(int ketCauNhip) {
        this.ketCauNhip = ketCauNhip;
    }

    public int getVatLieuNhipChinh() {
        return vatLieuNhipChinh;
    }

    public void setVatLieuNhipChinh(int vatLieuNhipChinh) {
        this.vatLieuNhipChinh = vatLieuNhipChinh;
    }

    public int getBienHanChe() {
        return bienHanChe;
    }

    public void setBienHanChe(int bienHanChe) {
        this.bienHanChe = bienHanChe;
    }

    public int getTaiTrong() {
        return taiTrong;
    }

    public void setTaiTrong(int taiTrong) {
        this.taiTrong = taiTrong;
    }

    public int getXeThanLien() {
        return xeThanLien;
    }

    public void setXeThanLien(int xeThanLien) {
        this.xeThanLien = xeThanLien;
    }

    public int getXeSoMiRoMooc() {
        return xeSoMiRoMooc;
    }

    public void setXeSoMiRoMooc(int xeSoMiRoMooc) {
        this.xeSoMiRoMooc = xeSoMiRoMooc;
    }

    public int getXeKeoRoMooc() {
        return xeKeoRoMooc;
    }

    public void setXeKeoRoMooc(int xeKeoRoMooc) {
        this.xeKeoRoMooc = xeKeoRoMooc;
    }

    public int getChongVaXo() {
        return chongVaXo;
    }

    public void setChongVaXo(int chongVaXo) {
        this.chongVaXo = chongVaXo;
    }

    public int getbClav() {
        return bClav;
    }

    public void setbClav(int bClav) {
        this.bClav = bClav;
    }

    public int getbClcrit() {
        return bClcrit;
    }

    public void setbClcrit(int bClcrit) {
        this.bClcrit = bClcrit;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }

    public float getKinhDo() {
        return kinhDo;
    }

    public void setKinhDo(float kinhDo) {
        this.kinhDo = kinhDo;
    }

    public float getViDo() {
        return viDo;
    }

    public void setViDo(float viDo) {
        this.viDo = viDo;
    }

    public String getTenDuongCau() {
        return tenDuongCau;
    }

    public void setTenDuongCau(String tenDuongCau) {
        this.tenDuongCau = tenDuongCau;
    }

    public String getTenCau() {
        return tenCau;
    }

    public void setTenCau(String tenCau) {
        this.tenCau = tenCau;
    }

    public String getMaHuyenCau() {
        return maHuyenCau;
    }

    public void setMaHuyenCau(String maHuyenCau) {
        this.maHuyenCau = maHuyenCau;
    }

    public String getMaXaCau() {
        return maXaCau;
    }

    public void setMaXaCau(String maXaCau) {
        this.maXaCau = maXaCau;
    }

    public List<ThongSoKtVO> getDetails() {
        return details;
    }

    public void setDetails(List<ThongSoKtVO> details) {
        this.details = details;
    }
}
