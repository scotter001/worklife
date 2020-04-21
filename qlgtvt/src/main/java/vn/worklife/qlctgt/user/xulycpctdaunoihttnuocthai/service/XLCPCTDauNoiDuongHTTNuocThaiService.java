package vn.worklife.qlctgt.user.xulycpctdaunoihttnuocthai.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.DmLoaiCTVO;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.GiayPhepVO;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.NhieuHuyenVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.ThietLapNguoiKyVO;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.CongTrinhChiTietVO;

import java.util.List;

public interface XLCPCTDauNoiDuongHTTNuocThaiService {
    CongTrinhChiTietVO selectListChiTietCTNT(@Param("idCongTrinh") int idCongTrinh);
    void insertCongTrinhChiTietNT(CongTrinhChiTietVO congTrinhChiTietVO);
}
