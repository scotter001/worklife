package vn.worklife.user.mockup.model;

import org.apache.ibatis.type.Alias;

import java.util.List;

@Alias("HuyenSCDKVO")
public class HuyenSCDKVO {
    private int idScdkHuyen;
    private int idDmScdk;
    private int idHuyen;
    private List<HuyenSCDKVO> huyenSCDKVOs;

    public List<HuyenSCDKVO> getHuyenSCDKVOs() {
        return huyenSCDKVOs;
    }

    public void setHuyenSCDKVOs(List<HuyenSCDKVO> huyenSCDKVOs) {
        this.huyenSCDKVOs = huyenSCDKVOs;
    }

    public int getIdScdkHuyen() {
        return idScdkHuyen;
    }

    public void setIdScdkHuyen(int idScdkHuyen) {
        this.idScdkHuyen = idScdkHuyen;
    }

    public int getIdDmScdk() {
        return idDmScdk;
    }

    public void setIdDmScdk(int idDmScdk) {
        this.idDmScdk = idDmScdk;
    }

    public int getIdHuyen() {
        return idHuyen;
    }

    public void setIdHuyen(int idHuyen) {
        this.idHuyen = idHuyen;
    }
}
