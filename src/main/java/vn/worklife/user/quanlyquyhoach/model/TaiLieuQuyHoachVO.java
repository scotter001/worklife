package vn.worklife.user.quanlyquyhoach.model;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;

@Alias("TaiLieuQuyHoachVO")
public class TaiLieuQuyHoachVO {
    private int idTaiLieu_QH;
    private int idHoSo_QH;
    private String tenTaiLieu;
    private String tyLe;
    private String ten;
    private int doDai;
    private byte[] noiDung;
    MultipartFile file;
    private int id;

    public int getIdTaiLieu_QH() {
        return idTaiLieu_QH;
    }

    public void setIdTaiLieu_QH(int idTaiLieu_QH) {
        this.idTaiLieu_QH = idTaiLieu_QH;
    }

    public int getIdHoSo_QH() {
        return idHoSo_QH;
    }

    public void setIdHoSo_QH(int idHoSo_QH) {
        this.idHoSo_QH = idHoSo_QH;
    }

    public String getTenTaiLieu() {
        return tenTaiLieu;
    }

    public void setTenTaiLieu(String tenTaiLieu) {
        this.tenTaiLieu = tenTaiLieu;
    }

    public String getTyLe() {
        return tyLe;
    }

    public void setTyLe(String tyLe) {
        this.tyLe = tyLe;
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
