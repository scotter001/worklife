package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;

@Alias("LichSuSCDKVO")
public class LichSuSCDKVO {
    private int idDmscdk;
    private int idScdk;
    private int giaTrungThau;
    private int idTuyenDuong;
    private int recordTotals;
    private String thoiGianSuaChua;
    private String thoiGianHoanThanh;
    private String congViecChinh;
    private String thiCong;
    private String nguonVon;
    private String tuVanThietKe;
    private String tuVanGiamSat;
    private List<DanhSachSuCoSCDKVO> danhSachSuCoSCDKVO;

    public int getIdDmscdk() {
        return idDmscdk;
    }

    public void setIdDmscdk(int idDmscdk) {
        this.idDmscdk = idDmscdk;
    }

    public int getIdScdk() {
        return idScdk;
    }

    public void setIdScdk(int idScdk) {
        this.idScdk = idScdk;
    }

    public int getGiaTrungThau() {
        return giaTrungThau;
    }

    public void setGiaTrungThau(int giaTrungThau) {
        this.giaTrungThau = giaTrungThau;
    }

    public int getIdTuyenDuong() {
        return idTuyenDuong;
    }

    public void setIdTuyenDuong(int idTuyenDuong) {
        this.idTuyenDuong = idTuyenDuong;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }

    public String getThoiGianSuaChua() {
        return thoiGianSuaChua;
    }

    public void setThoiGianSuaChua(String thoiGianSuaChua) {
        this.thoiGianSuaChua = thoiGianSuaChua;
    }

    public String getThoiGianHoanThanh() {
        return thoiGianHoanThanh;
    }

    public void setThoiGianHoanThanh(String thoiGianHoanThanh) {
        this.thoiGianHoanThanh = thoiGianHoanThanh;
    }

    public String getCongViecChinh() {
        return congViecChinh;
    }

    public void setCongViecChinh(String congViecChinh) {
        this.congViecChinh = congViecChinh;
    }

    public String getThiCong() {
        return thiCong;
    }

    public void setThiCong(String thiCong) {
        this.thiCong = thiCong;
    }

    public String getNguonVon() {
        return nguonVon;
    }

    public void setNguonVon(String nguonVon) {
        this.nguonVon = nguonVon;
    }

    public String getTuVanThietKe() {
        return tuVanThietKe;
    }

    public void setTuVanThietKe(String tuVanThietKe) {
        this.tuVanThietKe = tuVanThietKe;
    }

    public String getTuVanGiamSat() {
        return tuVanGiamSat;
    }

    public void setTuVanGiamSat(String tuVanGiamSat) {
        this.tuVanGiamSat = tuVanGiamSat;
    }

    public List<DanhSachSuCoSCDKVO> getDanhSachSuCoSCDKVO() {
        return danhSachSuCoSCDKVO;
    }

    public void setDanhSachSuCoSCDKVO(List<DanhSachSuCoSCDKVO> danhSachSuCoSCDKVO) {
        this.danhSachSuCoSCDKVO = danhSachSuCoSCDKVO;
    }

    /* @Config Vị Trí */
    public String getViTri(DanhSachSuCoSCDKVO danhSachSuCoSCDKVO) {
        NumberFormat numberFormatter = new DecimalFormat("#,###,###");
        if (danhSachSuCoSCDKVO.getLoaiSuCo() == 1) {
            return "Km " + numberFormatter.format(danhSachSuCoSCDKVO.getLyTrinhKmDiemDau())
                    + " + " + numberFormatter.format(danhSachSuCoSCDKVO.getLyTrinhMDiemDau())
                    + " - " + numberFormatter.format(danhSachSuCoSCDKVO.getLyTrinhKmDiemCuoi())
                    + " + " + numberFormatter.format(danhSachSuCoSCDKVO.getLyTrinhMDiemCuoi());
        } else {
            return "Km " + numberFormatter.format(danhSachSuCoSCDKVO.getLyTrinhKmDiemDau())
                    + " + " + numberFormatter.format(danhSachSuCoSCDKVO.getLyTrinhMDiemDau());
        }
    }

    /* @Config Lý Trình */
    public String getDanhSachLyTrinh() {
        String danhSachLyTrinh = "";
        if (danhSachSuCoSCDKVO == null) {
            return "";
        }
        for (DanhSachSuCoSCDKVO danhSachSuCoSCDKVO : danhSachSuCoSCDKVO) {
            if (danhSachSuCoSCDKVO.getTraiPhai() == 1) {
                danhSachLyTrinh += " ; " + getViTri(danhSachSuCoSCDKVO) + " (T)";
            } else if (danhSachSuCoSCDKVO.getTraiPhai() == 2) {
                danhSachLyTrinh += " ; " + getViTri(danhSachSuCoSCDKVO) + " (P)";
            } else {
                danhSachLyTrinh += " ; " + getViTri(danhSachSuCoSCDKVO) + " (T+P)";
            }
        }
        return danhSachLyTrinh.replaceFirst(" ; ", "");
    }

    /* @Config Địa Điểm */
    public String getDiaDiem() {
        String danhSachDiaDiem = "";
        if (danhSachSuCoSCDKVO == null) {
            return "";
        }
        for (DanhSachSuCoSCDKVO danhSachSuCoSCDKVO : danhSachSuCoSCDKVO) {
            danhSachDiaDiem += " ; " + "Huyện " + danhSachSuCoSCDKVO.getTenHuyen() + " & Thị xã " + danhSachSuCoSCDKVO.getTenXa();
        }
        return danhSachDiaDiem.replaceFirst(" ; ", "");
    }
}
