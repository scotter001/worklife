package vn.worklife.qlctgt.user.xulycpctdaunoiduong.model;

import org.apache.ibatis.type.Alias;

@Alias("DiaChiCTHuyenVO")
public class DiaChiCTHuyenVO {
    private int idCT_Huyen;
    private int idCongTrinh;
    private int idHuyen;
    private int idXa;

    public int getIdCT_Huyen() {
        return idCT_Huyen;
    }

    public void setIdCT_Huyen(int idCT_Huyen) {
        this.idCT_Huyen = idCT_Huyen;
    }

    public int getIdCongTrinh() {
        return idCongTrinh;
    }

    public void setIdCongTrinh(int idCongTrinh) {
        this.idCongTrinh = idCongTrinh;
    }

    public int getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(int idHuyen) {
        this.idHuyen = idHuyen;
    }

    public int getIdXa() {
        return idXa;
    }

    public void setIdXa(int idXa) {
        this.idXa = idXa;
    }
}
