package vn.worklife.qlctgt.user.capphepcaitaoviahe.model;

import org.apache.ibatis.type.Alias;

@Alias("GiayPhepVO")
public class GiayPhepVO {
    private int idHoSo;
    private String nguoiKy;
    private String thoiHan;
    private int idGP;
    private String canCu;
    private String tuNgay;
    private String noiDung;
    private String gp_So;
    private int idParent;
    private String gp_Ngay;
    private String chucVu;
    private String tieuDe;
    private int giaHan;
    private String donGiaHan;
    private String ghiChuThoiHan;
    private String denNgay;
    private String noiNhan;
    private String uyQuyen;

    GiayPhepVO giayPhepVOa;


    public GiayPhepVO getGiayPhepVOa() {
        return giayPhepVOa;
    }

    public void setGiayPhepVOa(GiayPhepVO giayPhepVOa) {
        this.giayPhepVOa = giayPhepVOa;
    }

    public int getIdHoSo() {
        return idHoSo;
    }

    public void setIdHoSo(int idHoSo) {
        this.idHoSo = idHoSo;
    }

    public String getNguoiKy() {
        return nguoiKy;
    }

    public void setNguoiKy(String nguoiKy) {
        this.nguoiKy = nguoiKy;
    }

    public String getThoiHan() {
        return thoiHan;
    }

    public void setThoiHan(String thoiHan) {
        this.thoiHan = thoiHan;
    }

    public int getIdGP() {
        return idGP;
    }

    public void setIdGP(int idGP) {
        this.idGP = idGP;
    }

    public String getCanCu() {
        return canCu;
    }

    public void setCanCu(String canCu) {
        this.canCu = canCu;
    }

    public String getTuNgay() {
        return tuNgay;
    }

    public void setTuNgay(String tuNgay) {
        this.tuNgay = tuNgay;
    }

    public String getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(String noiDung) {
        this.noiDung = noiDung;
    }

    public String getGp_So() {
        return gp_So;
    }

    public void setGp_So(String gp_So) {
        this.gp_So = gp_So;
    }

    public String getGp_Ngay() {
        return gp_Ngay;
    }

    public void setGp_Ngay(String gp_Ngay) {
        this.gp_Ngay = gp_Ngay;
    }

    public int getIdParent() {
        return idParent;
    }

    public void setIdParent(int idParent) {
        this.idParent = idParent;
    }



    public String getChucVu() {
        return chucVu;
    }

    public void setChucVu(String chucVu) {
        this.chucVu = chucVu;
    }

    public String getTieuDe() {
        return tieuDe;
    }

    public void setTieuDe(String tieuDe) {
        this.tieuDe = tieuDe;
    }

    public int getGiaHan() {
        return giaHan;
    }

    public void setGiaHan(int giaHan) {
        this.giaHan = giaHan;
    }

    public String getDonGiaHan() {
        return donGiaHan;
    }

    public void setDonGiaHan(String donGiaHan) {
        this.donGiaHan = donGiaHan;
    }

    public String getGhiChuThoiHan() {
        return ghiChuThoiHan;
    }

    public void setGhiChuThoiHan(String ghiChuThoiHan) {
        this.ghiChuThoiHan = ghiChuThoiHan;
    }

    public String getDenNgay() {
        return denNgay;
    }

    public void setDenNgay(String denNgay) {
        this.denNgay = denNgay;
    }

    public String getNoiNhan() {
        return noiNhan;
    }

    public void setNoiNhan(String noiNhan) {
        this.noiNhan = noiNhan;
    }

    public String getUyQuyen() {
        return uyQuyen;
    }

    public void setUyQuyen(String uyQuyen) {
        this.uyQuyen = uyQuyen;
    }
}
