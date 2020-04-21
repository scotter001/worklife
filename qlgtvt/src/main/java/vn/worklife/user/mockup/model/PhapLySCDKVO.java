/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.List;

@Alias("PhapLySCDKVO")
public class PhapLySCDKVO {
    private int idPL;
    private int nam;
    private String tenVanBan;
    private String soVB;
    private String ngayVB;
    private String tenFile;
    private int doDai;
    private byte[] noiDung;
    private MultipartFile file;
    private int recordTotals;
    private List<PhapLySCDKVO> phapLySCDKVOs;


    public byte[] getNoiDung() {
        return noiDung;
    }

    public String getTenFile() {
        return tenFile;
    }

    public void setTenFile(String tenFile) {
        this.tenFile = tenFile;
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

    public List<PhapLySCDKVO> getPhapLySCDKVOs() {
        return phapLySCDKVOs;
    }

    public void setPhapLySCDKVOs(List<PhapLySCDKVO> phapLySCDKVOs) {
        this.phapLySCDKVOs = phapLySCDKVOs;
    }

    public int getIdPL() {
        return idPL;
    }

    public void setIdPL(int idPL) {
        this.idPL = idPL;
    }

    public int getNam() {
        return nam;
    }

    public void setNam(int nam) {
        this.nam = nam;
    }

    public String getTenVanBan() {
        return tenVanBan;
    }

    public void setTenVanBan(String tenVanBan) {
        this.tenVanBan = tenVanBan;
    }

    public String getSoVB() {
        return soVB;
    }

    public void setSoVB(String soVB) {
        this.soVB = soVB;
    }

    public String getNgayVB() {
        return ngayVB;
    }

    public void setNgayVB(String ngayVB) {
        this.ngayVB = ngayVB;
    }

    public int getDoDai() {
        return doDai;
    }

    public void setDoDai(int doDai) {
        this.doDai = doDai;
    }

    public int getRecordTotals() {
        return recordTotals;
    }

    public void setRecordTotals(int recordTotals) {
        this.recordTotals = recordTotals;
    }
}
