package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;
import vn.worklife.user.util.file.model.FileUploadVO;

@Alias("FileAttachVO")
public class FileAttachVO {

    private int idTaiLieu;
    private int idTuyenDuongFile;
    private String tenTaiLieu;
    private FileUploadVO fileData;
    private MultipartFile file;

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public int getIdTuyenDuongFile() {
        return idTuyenDuongFile;
    }

    public void setIdTuyenDuongFile(int idTuyenDuongFile) {
        this.idTuyenDuongFile = idTuyenDuongFile;
    }

    public int getIdTaiLieu() {
        return idTaiLieu;
    }

    public void setIdTaiLieu(int idTaiLieu) {
        this.idTaiLieu = idTaiLieu;
    }

    public String getTenTaiLieu() {
        return tenTaiLieu;
    }

    public void setTenTaiLieu(String tenTaiLieu) {
        this.tenTaiLieu = tenTaiLieu;
    }

    public FileUploadVO getFileData() {
        return fileData;
    }

    public void setFileData(FileUploadVO fileData) {
        this.fileData = fileData;
    }
}
