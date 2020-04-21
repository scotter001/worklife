
package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;
import java.io.Serializable;

@Alias("TiepDinhKemVO")
public class TiepDinhKemVO implements Serializable {
    private int idTiepDinhKem;
    private int idParent;
    private int loaiTaiLieu;
    private String moTa;
    private String tenTiep;
    private int doDai;
    private byte noiDung;
    private String tenDayDu;

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getTenDayDu() {
        return tenDayDu;
    }

    public void setTenDayDu(String tenDayDu) {
        this.tenDayDu = tenDayDu;
    }

    public int getIdTiepDinhKem() {
        return idTiepDinhKem;
    }

    public void setIdTiepDinhKem(int idTiepDinhKem) {
        this.idTiepDinhKem = idTiepDinhKem;
    }

    public int getIdParent() {
        return idParent;
    }

    public void setIdParent(int idParent) {
        this.idParent = idParent;
    }

    public int getLoaiTaiLieu() {
        return loaiTaiLieu;
    }

    public void setLoaiTaiLieu(int loaiTaiLieu) {
        this.loaiTaiLieu = loaiTaiLieu;
    }

    public String getTenTiep() {
        return tenTiep;
    }

    public void setTenTiep(String tenTiep) {
        this.tenTiep = tenTiep;
    }

    public int getDoDai() {
        return doDai;
    }

    public void setDoDai(int doDai) {
        this.doDai = doDai;
    }

    public byte getNoiDung() {
        return noiDung;
    }

    public void setNoiDung(byte noiDung) {
        this.noiDung = noiDung;
    }
}
