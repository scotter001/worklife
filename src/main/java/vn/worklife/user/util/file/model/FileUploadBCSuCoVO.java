package vn.worklife.user.util.file.model;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;

@Alias("FileUploadBCSuCoVO")
public class FileUploadBCSuCoVO {
    private int idbcht;
    private int idGroup;
    private int tuan;
    private int nam;
    private String ten;
    private int doDai;
    private byte[] noiDung;
    private String ngayBC;
    private MultipartFile file;

    public int getIdbcht() {
        return idbcht;
    }

    public void setIdbcht(int idbcht) {
        this.idbcht = idbcht;
    }

    public int getIdGroup() {
        return idGroup;
    }

    public void setIdGroup(int idGroup) {
        this.idGroup = idGroup;
    }

    public int getTuan() {
        return tuan;
    }

    public void setTuan(int tuan) {
        this.tuan = tuan;
    }

    public int getNam() {
        return nam;
    }

    public void setNam(int nam) {
        this.nam = nam;
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

    public String getNgayBC() {
        return ngayBC;
    }

    public void setNgayBC(String ngayBC) {
        this.ngayBC = ngayBC;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
