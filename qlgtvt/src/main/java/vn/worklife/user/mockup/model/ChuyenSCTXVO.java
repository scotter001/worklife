package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

@Alias("ChuyenSCTXVO")
public class ChuyenSCTXVO {
    private int idSuCo;
    private int chuyenSCTX;

    public int getIdSuCo() {
        return idSuCo;
    }

    public void setIdSuCo(int idSuCo) {
        this.idSuCo = idSuCo;
    }

    public int getChuyenSCTX() {
        return chuyenSCTX;
    }

    public void setChuyenSCTX(int chuyenSCTX) {
        this.chuyenSCTX = chuyenSCTX;
    }
}
