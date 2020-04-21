package vn.worklife.user.baocaotinhtrangduong.model;

import org.apache.ibatis.type.Alias;

import java.util.List;

@Alias("BaoCaoReportVO")
public class BaoCaoReportVO {
    private int iddh;
    private String tenDuong;
    private String diaDanh_DiemDau;
    private String diaDanh_DiemCuoi;
    List<LyTrinhReportVO> lyTrinhReportVOS;

    public int getIddh() {
        return iddh;
    }

    public void setIddh(int iddh) {
        this.iddh = iddh;
    }

    public String getTenDuong() {
        return tenDuong;
    }

    public void setTenDuong(String tenDuong) {
        this.tenDuong = tenDuong;
    }

    public String getDiaDanh_DiemDau() {
        return diaDanh_DiemDau;
    }

    public void setDiaDanh_DiemDau(String diaDanh_DiemDau) {
        this.diaDanh_DiemDau = diaDanh_DiemDau;
    }

    public String getDiaDanh_DiemCuoi() {
        return diaDanh_DiemCuoi;
    }

    public void setDiaDanh_DiemCuoi(String diaDanh_DiemCuoi) {
        this.diaDanh_DiemCuoi = diaDanh_DiemCuoi;
    }

    public List<LyTrinhReportVO> getLyTrinhReportVOS() {
        return lyTrinhReportVOS;
    }

    public void setLyTrinhReportVOS(List<LyTrinhReportVO> lyTrinhReportVOS) {
        this.lyTrinhReportVOS = lyTrinhReportVOS;
    }
}
