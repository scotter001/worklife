/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.List;

@Alias("DanhMucSCTXVO")
public class DanhMucSCTXVO implements Serializable {
    // private static final long serialVersionUID = 3223266432363518L;
    //private static final long serialVersionUID = 3240462664816863518L;
    private int idDmSctx;
    private int idSuCo;
    private int idSctx;
    private String noiDungSuaChua;
    private Float khoiLuong;
    private int iddvt;
    private String tenDVT;
    private String congThucLap;
    private String klLap_CT;
    private String klLap_Tong;
    private int kinhPhiDuToan;
    private int kinhPhiDuyet;
    private int thuocQuy;
    private int nam;
    private String congThucDuyet;
    private String kinhPhi;
    private String klDuyet_CT;
    private String klDuyet_Tong;
    private String huHong;
    private String ngay;
    private int idTuyenDuong;
    private String tenDuong;
    private String lyTrinh;
    private String tenHatQL;
    private String keHoach_TH;
    private String ghiChu_KH;
    private String thoiGian_TH;
    private String ghiChu_TH;
    private String ngayKT;
    private String thucHien;
    private String danhGia;
    private String nguoiKT;
    private int recordTotals;
    // Has One
    SuCoVO suCoVo;
    SctxThucHienVO sctxThucHienVO;
    List<DanhMucSCTXVO> danhMucSCTXVOS;

    public int getIdDmSctx() {
        return idDmSctx;
    }

    public void setIdDmSctx(int idDmSctx) {
        this.idDmSctx = idDmSctx;
    }

    public int getIdSuCo() {
        return idSuCo;
    }

    public void setIdSuCo(int idSuCo) {
        this.idSuCo = idSuCo;
    }

    public int getIdSctx() {
        return idSctx;
    }

    public void setIdSctx(int idSctx) {
        this.idSctx = idSctx;
    }

    public String getNoiDungSuaChua() {
        return noiDungSuaChua;
    }

    public void setNoiDungSuaChua(String noiDungSuaChua) {
        this.noiDungSuaChua = noiDungSuaChua;
    }

    public Float getKhoiLuong() {
        return khoiLuong;
    }

    public void setKhoiLuong(Float khoiLuong) {
        this.khoiLuong = khoiLuong;
    }

    public int getIddvt() {
        return iddvt;
    }

    public void setIddvt(int iddvt) {
        this.iddvt = iddvt;
    }

    public String getTenDVT() {
        return tenDVT;
    }

    public void setTenDVT(String tenDVT) {
        this.tenDVT = tenDVT;
    }

    public String getCongThucLap() {
        return congThucLap;
    }

    public void setCongThucLap(String congThucLap) {
        this.congThucLap = congThucLap;
    }

    public String getKlLap_CT() {
        return klLap_CT;
    }

    public void setKlLap_CT(String klLap_CT) {
        this.klLap_CT = klLap_CT.replaceAll(",","");
    }

    public String getKlLap_Tong() {
        return klLap_Tong;
    }

    public void setKlLap_Tong(String klLap_Tong) {
        this.klLap_Tong = klLap_Tong.replaceAll(",","");
    }

    public int getKinhPhiDuToan() {
        return kinhPhiDuToan;
    }

    public void setKinhPhiDuToan(int kinhPhiDuToan) {
        this.kinhPhiDuToan = kinhPhiDuToan;
    }

    public int getKinhPhiDuyet() {
        return kinhPhiDuyet;
    }

    public void setKinhPhiDuyet(int kinhPhiDuyet) {
        this.kinhPhiDuyet = kinhPhiDuyet;
    }

    public int getThuocQuy() {
        return thuocQuy;
    }

    public void setThuocQuy(int thuocQuy) {
        this.thuocQuy = thuocQuy;
    }

    public int getNam() {
        return nam;
    }

    public void setNam(int nam) {
        this.nam = nam;
    }

    public String getCongThucDuyet() {
        return congThucDuyet;
    }

    public void setCongThucDuyet(String congThucDuyet) {
        this.congThucDuyet = congThucDuyet;
    }

    public String getKinhPhi() {
        return kinhPhi;
    }

    public void setKinhPhi(String kinhPhi) {
        this.kinhPhi = kinhPhi.replaceAll(",","");
    }

    public String getKlDuyet_CT() {
        return klDuyet_CT;
    }

    public void setKlDuyet_CT(String klDuyet_CT) {
        this.klDuyet_CT = klDuyet_CT.replaceAll(",","");
    }

    public String getKlDuyet_Tong() {
        return klDuyet_Tong;
    }

    public void setKlDuyet_Tong(String klDuyet_Tong) {
        this.klDuyet_Tong = klDuyet_Tong.replaceAll(",","");
    }

    public String getHuHong() {
        return huHong;
    }

    public void setHuHong(String huHong) {
        this.huHong = huHong;
    }

    public String getNgay() {
        return ngay;
    }

    public void setNgay(String ngay) {
        this.ngay = ngay;
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

    public String getLyTrinh() {
        return lyTrinh;
    }

    public void setLyTrinh(String lyTrinh) {
        this.lyTrinh = lyTrinh;
    }

    public String getTenHatQL() {
        return tenHatQL;
    }

    public void setTenHatQL(String tenHatQL) {
        this.tenHatQL = tenHatQL;
    }

    public String getKeHoach_TH() {
        return keHoach_TH;
    }

    public void setKeHoach_TH(String keHoach_TH) {
        this.keHoach_TH = keHoach_TH;
    }

    public String getGhiChu_KH() {
        return ghiChu_KH;
    }

    public void setGhiChu_KH(String ghiChu_KH) {
        this.ghiChu_KH = ghiChu_KH;
    }

    public String getThoiGian_TH() {
        return thoiGian_TH;
    }

    public void setThoiGian_TH(String thoiGian_TH) {
        this.thoiGian_TH = thoiGian_TH;
    }

    public String getGhiChu_TH() {
        return ghiChu_TH;
    }

    public void setGhiChu_TH(String ghiChu_TH) {
        this.ghiChu_TH = ghiChu_TH;
    }

    public String getNgayKT() {
        return ngayKT;
    }

    public void setNgayKT(String ngayKT) {
        this.ngayKT = ngayKT;
    }

    public String getThucHien() {
        return thucHien;
    }

    public void setThucHien(String thucHien) {
        this.thucHien = thucHien;
    }

    public String getDanhGia() {
        return danhGia;
    }

    public void setDanhGia(String danhGia) {
        this.danhGia = danhGia;
    }

    public String getNguoiKT() {
        return nguoiKT;
    }

    public void setNguoiKT(String nguoiKT) {
        this.nguoiKT = nguoiKT;
    }

    public SuCoVO getSuCoVo() {
        return suCoVo;
    }

    public void setSuCoVo(SuCoVO suCoVo) {
        this.suCoVo = suCoVo;
    }

    public SctxThucHienVO getSctxThucHienVO() {
        return sctxThucHienVO;
    }

    public void setSctxThucHienVO(SctxThucHienVO sctxThucHienVO) {
        this.sctxThucHienVO = sctxThucHienVO;
    }

    public List<DanhMucSCTXVO> getDanhMucSCTXVOS() {
        return danhMucSCTXVOS;
    }

    public void setDanhMucSCTXVOS(List<DanhMucSCTXVO> danhMucSCTXVOS) {
        this.danhMucSCTXVOS = danhMucSCTXVOS;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }
    public String getKhoiLuongDvt(){
        if(khoiLuong==null){
            return "";
        }else {
            DecimalFormat df = new DecimalFormat("#,###,###,##0.00");
            return df.format(khoiLuong) + " " + iddvt;
        }
    }
}
