package vn.worklife.user.baocaotinhtrangduong.model;

import org.apache.ibatis.type.Alias;
import vn.worklife.user.quanlytuyenduong.model.TinhTrangDuongVO;

import java.util.List;

@Alias("BCTTDuongVO")
public class BCTTDuongVO {
    private int quy;
    private int nam;
    private String ngayBaoCao;
    List<TinhTrangDuongVO> tinhTrangDuongVOS;

    public int getQuy() {
        return quy;
    }

    public void setQuy(int quy) {
        this.quy = quy;
    }

    public int getNam() {
        return nam;
    }

    public void setNam(int nam) {
        this.nam = nam;
    }

    public String getNgayBaoCao() {
        return ngayBaoCao;
    }

    public void setNgayBaoCao(String ngayBaoCao) {
        this.ngayBaoCao = ngayBaoCao;
    }

    public List<TinhTrangDuongVO> getTinhTrangDuongVOS() {
        return tinhTrangDuongVOS;
    }

    public void setTinhTrangDuongVOS(List<TinhTrangDuongVO> tinhTrangDuongVOS) {
        this.tinhTrangDuongVOS = tinhTrangDuongVOS;
    }
}
