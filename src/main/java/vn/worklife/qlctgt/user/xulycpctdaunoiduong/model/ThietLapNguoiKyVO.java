package vn.worklife.qlctgt.user.xulycpctdaunoiduong.model;

import org.apache.ibatis.type.Alias;

@Alias("ThietLapNguoiKyVO")
public class ThietLapNguoiKyVO {
    private int id;
    private String nguoiKy;
    private String chucVu;
    private int uyQuyen;
    private int loaiGiay;
    private String tenGiay;
    private int macDinh;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNguoiKy() {
        return nguoiKy;
    }

    public void setNguoiKy(String nguoiKy) {
        this.nguoiKy = nguoiKy;
    }

    public String getChucVu() {
        return chucVu;
    }

    public void setChucVu(String chucVu) {
        this.chucVu = chucVu;
    }

    public int getUyQuyen() {
        return uyQuyen;
    }

    public void setUyQuyen(int uyQuyen) {
        this.uyQuyen = uyQuyen;
    }

    public int getLoaiGiay() {
        return loaiGiay;
    }

    public void setLoaiGiay(int loaiGiay) {
        this.loaiGiay = loaiGiay;
    }

    public String getTenGiay() {
        return tenGiay;
    }

    public void setTenGiay(String tenGiay) {
        this.tenGiay = tenGiay;
    }

    public int getMacDinh() {
        return macDinh;
    }

    public void setMacDinh(int macDinh) {
        this.macDinh = macDinh;
    }
}
