package vn.worklife.user.baocaotinhtrangcau.model;

import org.apache.ibatis.type.Alias;
import vn.worklife.user.quanlycau.model.CauVO;

import java.util.List;

@Alias("BaoCaoReportCauVO")
public class BaoCaoReportCauVO {
    private int idHuyen;
    private int donViQL;
    private int idTuyenDuong;
    private String tenDuong;
    private String tenHuyen;
    private String tenDonViQL;
    private String tenCau;
    List<CauVO> cauVOS;

    public int getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(int idHuyen) {
        this.idHuyen = idHuyen;
    }

    public int getDonViQL() {
        return donViQL;
    }

    public void setDonViQL(int donViQL) {
        this.donViQL = donViQL;
    }

    public int getIdTuyenDuong() {
        return idTuyenDuong;
    }

    public void setIdTuyenDuong(int idTuyenDuong) {
        this.idTuyenDuong = idTuyenDuong;
    }

    public String getTenDuong() {
        return tenDuong;
    }

    public void setTenDuong(String tenDuong) {
        this.tenDuong = tenDuong;
    }

    public String getTenHuyen() {
        return tenHuyen;
    }

    public void setTenHuyen(String tenHuyen) {
        this.tenHuyen = tenHuyen;
    }

    public String getTenDonViQL() {
        return tenDonViQL;
    }

    public void setTenDonViQL(String tenDonViQL) {
        this.tenDonViQL = tenDonViQL;
    }

    public String getTenCau() {
        return tenCau;
    }

    public void setTenCau(String tenCau) {
        this.tenCau = tenCau;
    }

    public List<CauVO> getCauVOS() {
        return cauVOS;
    }

    public void setCauVOS(List<CauVO> cauVOS) {
        this.cauVOS = cauVOS;
    }
}
