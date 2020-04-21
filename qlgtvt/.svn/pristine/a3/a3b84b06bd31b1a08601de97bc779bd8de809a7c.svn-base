package vn.worklife.qlctgt.user.capphepcaitaoviahe.service;

import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestParam;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.DmLoaiCTVO;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.NhieuHuyenVO;
import vn.worklife.qlctgt.user.danhsachhoso.model.HoSoVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.CongTrinhVO;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.GiayPhepVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.ThietLapNguoiKyVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.VanBanChapThuanVO;

import java.util.List;

public interface CapPhepCaiTaoViaHeService {

    void insertGiayPhep(GiayPhepVO giayPhepVO);
    void updateGiayPhep(@Param("idHoSo_QH") int idHoSo_QH);
    GiayPhepVO selectGiayPhepByidHS(@Param("idHoSo") int idHoSo);
    List<GiayPhepVO> selectGiayPhepAll();
    List<ThietLapNguoiKyVO> selectlistNguoiKyGP();
    DmLoaiCTVO selectDmLoaiCT(@Param("idHoSo") int idHoSo);
    NhieuHuyenVO selectNhieuHuyen1(@Param("idHoSo") int idHoSo);




}
