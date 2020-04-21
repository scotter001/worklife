package vn.worklife.basicinformation.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.type.Alias;
/**
 * @author Nga
 *
 */
@Alias("FilePaperVO")
public class FilePaperVO implements Serializable {
	private static final long serialVersionUID = 1L;
	private int idHosoGiayto;
	private int idHoso;
	private String tengiay;
	private String so;
	private Date ngay;
	private String coQuancap;
	private String gcnQsddTemp;	
	private boolean gcnQsdd;
	private int banchinh;
	private int bansao;
	private String tenFile;
	private String duongdan;	
	private int idHosoTemp;
	private String breakflag;
	
	public int getIdHosoTemp() {
		return idHosoTemp;
	}
	public void setIdHosoTemp(int idHosoTemp) {
		this.idHosoTemp = idHosoTemp;
	}	
	public boolean isGcnQsdd() {
		return gcnQsdd;
	}
	public void setGcnQsdd(boolean gcnQsdd) {
		this.gcnQsdd = gcnQsdd;
	}
	public String getBreakflag() {
		return breakflag;
	}
	public void setBreakflag(String breakflag) {
		this.breakflag = breakflag;
	}
	public int getIdHosoGiayto() {
		return idHosoGiayto;
	}
	public void setIdHosoGiayto(int idHosoGiayto) {
		this.idHosoGiayto = idHosoGiayto;
	}
	public int getIdHoso() {
		return idHoso;
	}
	public void setIdHoso(int idHoso) {
		this.idHoso = idHoso;
	}
	public String getTengiay() {
		return tengiay;
	}
	public void setTengiay(String tengiay) {
		this.tengiay = tengiay;
	}
	public String getSo() {
		return so;
	}
	public void setSo(String so) {
		this.so = so;
	}
	public Date getNgay() {
		return ngay;
	}
	public void setNgay(Date ngay) {
		this.ngay = ngay;
	}
	public String getCoQuancap() {
		return coQuancap;
	}
	public void setCoQuancap(String coQuancap) {
		this.coQuancap = coQuancap;
	}
	public String getGcnQsddTemp() {
		return gcnQsddTemp;
	}
	public void setGcnQsddTemp(String gcnQsddTemp) {
		this.gcnQsddTemp = gcnQsddTemp;
	}
	public int getBanchinh() {
		return banchinh;
	}
	public void setBanchinh(int banchinh) {
		this.banchinh = banchinh;
	}
	public int getBansao() {
		return bansao;
	}
	public void setBansao(int bansao) {
		this.bansao = bansao;
	}
	public String getTenFile() {
		return tenFile;
	}
	public void setTenFile(String tenFile) {
		this.tenFile = tenFile;
	}
	public String getDuongdan() {
		return duongdan;
	}
	public void setDuongdan(String duongdan) {
		this.duongdan = duongdan;
	}	
}