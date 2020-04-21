package vn.worklife.user.settupcategoryupdate.model;

import org.apache.ibatis.type.Alias;

@Alias("SettupCategoryUpdateVO")
public class SettupCategoryUpdateVO {
	private int idSuCo;
	private String tenDuong;
	private String viTri;
	private String ngaySuCo;
	private String tinhTrang;
	private int recordsTotal;
	private String khoiLuong;
	private String kinhPhiDuToan;
	private String noiDungCongViec;
	private int idDMSCTX;
	private String dvt;
	private String kinhPhiDuyet;
	
	

	public String getDvt() {
		return dvt;
	}
	public void setDvt(String dvt) {
		this.dvt = dvt;
	}
	public String getKinhPhiDuyet() {
		return kinhPhiDuyet;
	}
	public void setKinhPhiDuyet(String kinhPhiDuyet) {
		this.kinhPhiDuyet = kinhPhiDuyet;
	}
	public int getIdDMSCTX() {
		return idDMSCTX;
	}
	public void setIdDMSCTX(int idDMSCTX) {
		this.idDMSCTX = idDMSCTX;
	}
	public String getNoiDungCongViec() {
		return noiDungCongViec;
	}
	public void setNoiDungCongViec(String noiDungCongViec) {
		this.noiDungCongViec = noiDungCongViec;
	}
	public int getIdSuCo() {
		return idSuCo;
	}
	public void setIdSuCo(int idSuCo) {
		this.idSuCo = idSuCo;
	}
	public String getTenDuong() {
		return tenDuong;
	}
	public void setTenDuong(String tenDuong) {
		this.tenDuong = tenDuong;
	}
	public String getViTri() {
		return viTri;
	}
	public void setViTri(String viTri) {
		this.viTri = viTri;
	}
	public String getNgaySuCo() {
		return ngaySuCo;
	}
	public void setNgaySuCo(String ngaySuCo) {
		this.ngaySuCo = ngaySuCo;
	}
	public String getTinhTrang() {
		return tinhTrang;
	}
	public void setTinhTrang(String tinhTrang) {
		this.tinhTrang = tinhTrang;
	}
	public int getRecordsTotal() {
		return recordsTotal;
	}
	public void setRecordsTotal(int recordsTotal) {
		this.recordsTotal = recordsTotal;
	}
	public String getKhoiLuong() {
		return khoiLuong;
	}
	public void setKhoiLuong(String khoiLuong) {
		this.khoiLuong = khoiLuong;
	}
	public String getKinhPhiDuToan() {
		return kinhPhiDuToan;
	}
	public void setKinhPhiDuToan(String kinhPhiDuToan) {
		this.kinhPhiDuToan = kinhPhiDuToan;
	}
	
	
	
	
}
