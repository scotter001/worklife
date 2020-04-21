package vn.worklife.user.quanlytuyenduong.model;


import org.apache.ibatis.type.Alias;

import java.util.List;

@Alias("QLBaoCaoTTCDVO")
public class QLBaoCaoTTCDVO {
    private int idLyTrinh;
    private int group_Id;
    private int idgroup;
    private int iddh;
    private int nam;
    private int quy;
    private int idcau;
    private int tinhTrang;
    private String group_name;
    private String ngayBC;

    public int getIdgroup() {
        return idgroup;
    }

    public void setIdgroup(int idgroup) {
        this.idgroup = idgroup;
    }

    public int getIdLyTrinh() {
        return idLyTrinh;
    }

    public void setIdLyTrinh(int idLyTrinh) {
        this.idLyTrinh = idLyTrinh;
    }

    public int getGroup_id() {
        return group_Id;
    }

    public void setGroup_id(int group_id) {
        this.group_Id = group_id;
    }

    public int getIddh() {
        return iddh;
    }

    public void setIddh(int iddh) {
        this.iddh = iddh;
    }

    public int getNam() {
        return nam;
    }

    public void setNam(int nam) {
        this.nam = nam;
    }

    public int getQuy() {
        return quy;
    }

    public void setQuy(int quy) {
        this.quy = quy;
    }

    public int getIdcau() {
        return idcau;
    }

    public void setIdcau(int idcau) {
        this.idcau = idcau;
    }

    public int getTinhTrang() {
        return tinhTrang;
    }

    public void setTinhTrang(int tinhTrang) {
        this.tinhTrang = tinhTrang;
    }

    public String getGroup_name() {
        return group_name;
    }

    public void setGroup_name(String group_name) {
        this.group_name = group_name;
    }

    public String getNgayBC() {
        return ngayBC;
    }

    public void setNgayBC(String ngayBC) {
        this.ngayBC = ngayBC;
    }
};

