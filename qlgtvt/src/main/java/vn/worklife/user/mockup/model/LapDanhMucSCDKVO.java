/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.List;

@Alias("LapDanhMucSCDKVO")
public class LapDanhMucSCDKVO implements Serializable {
    private int idDmScdk;
    private int idDmhmScdk;
    private int idTuyenDuong;
    private int idCau;
    private int idThietBi;
    private String viTri;
    private String hienTrang;
    private String giaiPhap;
    private int idUuTien;
    private String kinhPhiDuyet;
    private int idDmNguonVon;
    private int nam;
    private int idHuyen;
    private String tenCongTrinh;
    private int recordTotals;
    private int idNguonVon;
    private String tenNguonVon;
    private String ten;
    private String tenCau;
    private String tenDuong;
    private String tenTB;
    private String thuoc;
    private String nhieuHuyen;
    private String tenHM;
    private String listIdHuyen;
    private List<LapDanhMucSCDKVO> lapDanhMucSCDKVOs;

    public String getNhieuHuyen() {
        return nhieuHuyen;
    }

    public void setNhieuHuyen(String nhieuHuyen) {
        this.nhieuHuyen = nhieuHuyen;
    }

    public String getTenHM() {
        return tenHM;
    }

    public void setTenHM(String tenHM) {
        this.tenHM = tenHM;
    }

    public List<LapDanhMucSCDKVO> getLapDanhMucSCDKVOs() {
        return lapDanhMucSCDKVOs;
    }

    public void setLapDanhMucSCDKVOs(List<LapDanhMucSCDKVO> lapDanhMucSCDKVOs) {
        this.lapDanhMucSCDKVOs = lapDanhMucSCDKVOs;
    }

    public String getListIdHuyen() {
        return listIdHuyen;
    }

    public int getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(int idHuyen) {
        this.idHuyen = idHuyen;
    }

    public void setListIdHuyen(String listIdHuyen) {
        this.listIdHuyen = listIdHuyen;
    }

    public String getThuoc() {
        return thuoc;
    }

    public void setThuoc(String thuoc) {
        this.thuoc = thuoc;
    }

    public String getTenCau() {
        return tenCau;
    }

    public void setTenCau(String tenCau) {
        this.tenCau = tenCau;
    }

    public String getTenDuong() {
        return tenDuong;
    }

    public void setTenDuong(String tenDuong) {
        this.tenDuong = tenDuong;
    }

    public String getTenTB() {
        return tenTB;
    }

    public void setTenTB(String tenTB) {
        this.tenTB = tenTB;
    }

    public int getIdNguonVon() {
        return idNguonVon;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public void setIdNguonVon(int idNguonVon) {
        this.idNguonVon = idNguonVon;
    }

    public String getTenNguonVon() {
        return tenNguonVon;
    }

    public void setTenNguonVon(String tenNguonVon) {
        this.tenNguonVon = tenNguonVon;
    }

    public int getIdDmScdk() {
        return idDmScdk;
    }

    public void setIdDmScdk(int idDmScdk) {
        this.idDmScdk = idDmScdk;
    }

    public int getIdDmhmScdk() {
        return idDmhmScdk;
    }

    public void setIdDmhmScdk(int idDmhmScdk) {
        this.idDmhmScdk = idDmhmScdk;
    }

    public int getIdTuyenDuong() {
        return idTuyenDuong;
    }

    public void setIdTuyenDuong(int idTuyenDuong) {
        this.idTuyenDuong = idTuyenDuong;
    }

    public int getIdCau() {
        return idCau;
    }

    public void setIdCau(int idCau) {
        this.idCau = idCau;
    }
    public int getIdThietBi() {
        return idThietBi;
    }

    public void setIdThietBi(int idThietBi) {
        this.idThietBi = idThietBi;
    }


    public String getHienTrang() {
        return hienTrang;
    }

    public void setHienTrang(String hienTrang) {
        this.hienTrang = hienTrang;
    }

    public String getGiaiPhap() {
        return giaiPhap;
    }

    public void setGiaiPhap(String giaiPhap) {
        this.giaiPhap = giaiPhap;
    }

    public int getIdUuTien() {
        return idUuTien;
    }

    public void setIdUuTien(int idUuTien) {
        this.idUuTien = idUuTien;
    }


    public String getViTri() {
        return viTri;
    }

    public void setViTri(String viTri) {
        this.viTri = viTri;
    }

    public String getKinhPhiDuyet() {

        return kinhPhiDuyet;
    }

    public void setKinhPhiDuyet(String kinhPhiDuyet) {
        this.kinhPhiDuyet = kinhPhiDuyet;
    }

    public int getIdDmNguonVon() {
        return idDmNguonVon;
    }

    public void setIdDmNguonVon(int idDmNguonVon) {
        this.idDmNguonVon = idDmNguonVon;
    }

    public int getNam() {
        return nam;
    }

    public void setNam(int nam) {
        this.nam = nam;
    }

    public String getTenCongTrinh() {
        return tenCongTrinh;
    }

    public void setTenCongTrinh(String tenCongTrinh) {
        this.tenCongTrinh = tenCongTrinh;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }
}
