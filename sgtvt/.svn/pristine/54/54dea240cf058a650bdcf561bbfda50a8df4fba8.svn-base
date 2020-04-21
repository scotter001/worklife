/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.List;

@Alias("LapDmScdkVO")
public class LapDmScdkVO implements Serializable {
    private int idDmScdk;
    private String hangMuc;
    private float kinhPhiDuToan;
    private int nguonVon;
    private String tenNguonVon;
    private int tuVanKsldt;
    private String tenTuVanKsldt;
    private int nam;
    private List<DanhSachDmScdkVO> danhSachDmScdk;
    private int recordTotals;

    public int getIdDmScdk() {
        return idDmScdk;
    }

    public void setIdDmScdk(int idDmScdk) {
        this.idDmScdk = idDmScdk;
    }

    public String getHangMuc() {
        return hangMuc;
    }

    public void setHangMuc(String hangMuc) {
        this.hangMuc = hangMuc;
    }

    public float getKinhPhiDuToan() {
        return kinhPhiDuToan;
    }

    public void setKinhPhiDuToan(float kinhPhiDuToan) {
        this.kinhPhiDuToan = kinhPhiDuToan;
    }

    public int getNguonVon() {
        return nguonVon;
    }

    public void setNguonVon(int nguonVon) {
        this.nguonVon = nguonVon;
    }

    public String getTenNguonVon() {
        return tenNguonVon;
    }

    public void setTenNguonVon(String tenNguonVon) {
        this.tenNguonVon = tenNguonVon;
    }

    public int getTuVanKsldt() {
        return tuVanKsldt;
    }

    public void setTuVanKsldt(int tuVanKsldt) {
        this.tuVanKsldt = tuVanKsldt;
    }

    public String getTenTuVanKsldt() {
        return tenTuVanKsldt;
    }

    public void setTenTuVanKsldt(String tenTuVanKsldt) {
        this.tenTuVanKsldt = tenTuVanKsldt;
    }

    public int getNam() {
        return nam;
    }

    public void setNam(int nam) {
        this.nam = nam;
    }

    public List<DanhSachDmScdkVO> getDanhSachDmScdk() {
        return danhSachDmScdk;
    }

    public void setDanhSachDmScdk(List<DanhSachDmScdkVO> danhSachDmScdk) {
        this.danhSachDmScdk = danhSachDmScdk;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }

    public String getDanhSachLyTrinh(){
        String danhSachLyTrinh = "";
        for(DanhSachDmScdkVO dsDmDcdk : danhSachDmScdk ){
           /* if(dsDmDcdk.getTraiPhai() ==1){
                danhSachLyTrinh += ";"+dsDmDcdk.getSuCoVo().getViTri()+" (T)";
            }else if(dsDmDcdk.getTraiPhai() ==2){
                danhSachLyTrinh += ";"+dsDmDcdk.getSuCoVo().getViTri()+" (P)";
            }else {
                danhSachLyTrinh += ";"+dsDmDcdk.getSuCoVo().getViTri()+" (T+P)";
            }*/
        }

        return danhSachLyTrinh.replaceFirst(";","");
    }
    public String getDiaDiem(){
        String danhSachDiaDiem = "";
        /*for(DanhSachDmScdkVO dsDmDcdk : danhSachDmScdk ){
            danhSachDiaDiem += ";" + "Huyện "+dsDmDcdk.getSuCoVo().getTenHuyen()+"& Thị xã "+dsDmDcdk.getSuCoVo().getTenXa();
        }*/
        return danhSachDiaDiem.replaceFirst(";","");
    }
}
