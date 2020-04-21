package vn.worklife.user.util.file.model;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;

@Alias("FileUploadVO")
public class FileUploadVO {
	private int id;
	private int parentId;
	private int loaiTaiLieu;
	private String moTa;
	private String tenDayDu;
	private String ten;
	private String tenFile;
	private int doDai;
	private byte[] noiDung;
	private MultipartFile file;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getParentId() {
		return parentId;
	}
	public void setParentId(int parentId) {
		this.parentId = parentId;
	}
	public int getLoaiTaiLieu() {
		return loaiTaiLieu;
	}
	public void setLoaiTaiLieu(int loaiTaiLieu) {
		this.loaiTaiLieu = loaiTaiLieu;
	}
	public String getTenDayDu() {
		return tenDayDu;
	}
	public void setTenDayDu(String tenDayDu) {
		this.tenDayDu = tenDayDu;
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

	public String getMoTa() {
		return moTa;
	}

	public void setMoTa(String moTa) {
		this.moTa = moTa;
	}

	public String getTenFile() {
		return tenFile;
	}

	public void setTenFile(String tenFile) {
		this.tenFile = tenFile;
	}
}
