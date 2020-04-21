package vn.worklife.qlctgt.user.capphepcaitaoviahe.model;

import org.apache.ibatis.type.Alias;

@Alias("NhieuHuyenVO")
public class NhieuHuyenVO {
    //nhieuuyen
    private String nhieuHuyen;
    private String listIdHuyen;
    private int idHoSo;
    private String bphoneHuyen;

    public String getBphoneHuyen() {
        return bphoneHuyen;
    }

    public void setBphoneHuyen(String bphoneHuyen) {
        this.bphoneHuyen = bphoneHuyen;
    }

    public String getNhieuHuyen() {
        return nhieuHuyen;
    }

    public void setNhieuHuyen(String nhieuHuyen) {
        this.nhieuHuyen = nhieuHuyen;
    }

    public String getListIdHuyen() {
        return listIdHuyen;
    }

    public void setListIdHuyen(String listIdHuyen) {
        this.listIdHuyen = listIdHuyen;
    }

    public int getIdHoSo() {
        return idHoSo;
    }

    public void setIdHoSo(int idHoSo) {
        this.idHoSo = idHoSo;
    }
}
