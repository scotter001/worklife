package vn.worklife.qlctgt.user.capphepcaitaoviahe.model;

import org.apache.ibatis.type.Alias;

@Alias("DmLoaiCTVO")
public class DmLoaiCTVO {
    private int id;
    private String ten;
    private int idLoaiHS;
    private int idHoSo;

    public int getIdHoSo() {
        return idHoSo;
    }

    public void setIdHoSo(int idHoSo) {
        this.idHoSo = idHoSo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public int getIdLoaiHS() {
        return idLoaiHS;
    }

    public void setIdLoaiHS(int idLoaiHS) {
        this.idLoaiHS = idLoaiHS;
    }
}
