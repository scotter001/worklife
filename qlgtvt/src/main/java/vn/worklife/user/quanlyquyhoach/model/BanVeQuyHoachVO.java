package vn.worklife.user.quanlyquyhoach.model;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;

@Alias("BanVeQuyHoachVO")
public class BanVeQuyHoachVO {
    private int idBanVe_QH;
    private int idHoSo_QH;
    private String tenBanVe;
    private String maBanVe;
    private String tyLe;
    private String soTo;
    private String ten;
    private int doDai;
    private byte[] noiDung;
    MultipartFile file;
    private int id;

    public int getIdBanVe_QH() {
        return idBanVe_QH;
    }

    public void setIdBanVe_QH(int idBanVe_QH) {
        this.idBanVe_QH = idBanVe_QH;
    }

    public int getIdHoSo_QH() {
        return idHoSo_QH;
    }

    public void setIdHoSo_QH(int idHoSo_QH) {
        this.idHoSo_QH = idHoSo_QH;
    }

    public String getTenBanVe() {
        return tenBanVe;
    }

    public void setTenBanVe(String tenBanVe) {
        this.tenBanVe = tenBanVe;
    }

    public String getMaBanVe() {
        return maBanVe;
    }

    public void setMaBanVe(String maBanVe) {
        this.maBanVe = maBanVe;
    }

    public String getTyLe() {
        return tyLe;
    }

    public void setTyLe(String tyLe) {
        this.tyLe = tyLe;
    }

    public String getSoTo() {
        return soTo;
    }

    public void setSoTo(String soTo) {
        this.soTo = soTo;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public int getDoDai() {
        return doDai;
    }

    public void setDoDai(int doDai) {
        this.doDai = doDai;
    }

    public byte[] getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(byte[] noiDung) {
        this.noiDung = noiDung;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
