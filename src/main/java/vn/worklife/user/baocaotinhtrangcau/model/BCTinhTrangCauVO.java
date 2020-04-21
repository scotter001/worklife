package vn.worklife.user.baocaotinhtrangcau.model;

import org.apache.ibatis.type.Alias;
import vn.worklife.user.quanlycau.model.TinhTrangCauVO;

import java.util.List;

@Alias("BCTinhTrangCauVO")
public class BCTinhTrangCauVO {
    private int quy;
    private int nam;
    private String ngayBaoCao;
    List<TinhTrangCauVO> tinhTrangCauVOS;

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

    public List<TinhTrangCauVO> getTinhTrangCauVOS() {
        return tinhTrangCauVOS;
    }

    public void setTinhTrangCauVOS(List<TinhTrangCauVO> tinhTrangCauVOS) {
        this.tinhTrangCauVOS = tinhTrangCauVOS;
    }
}
