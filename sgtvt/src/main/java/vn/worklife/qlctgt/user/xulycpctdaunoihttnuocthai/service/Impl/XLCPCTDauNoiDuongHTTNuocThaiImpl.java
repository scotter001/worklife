package vn.worklife.qlctgt.user.xulycpctdaunoihttnuocthai.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.DmLoaiCTVO;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.GiayPhepVO;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.NhieuHuyenVO;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.service.CapPhepCaiTaoViaHeService;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.ThietLapNguoiKyVO;
import vn.worklife.qlctgt.user.xulycpctdaunoihttnuocthai.service.XLCPCTDauNoiDuongHTTNuocThaiService;
import vn.worklife.qlctgt.user.xulycpctdaunoihttnuocthai.web.XLCPCTDauNoiDuongHTTNuocThaiController;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.CongTrinhChiTietVO;
import vn.worklife.qlctgt.user.xulycpctthietyeu.service.XLCPCTThietYeuService;

import java.util.List;

@Service
public class XLCPCTDauNoiDuongHTTNuocThaiImpl implements XLCPCTDauNoiDuongHTTNuocThaiService {

    @Autowired
    private XLCPCTDauNoiDuongHTTNuocThaiService xLCPCTDauNoiDuongHTTNuocThaiService;


    @Override
    public CongTrinhChiTietVO selectListChiTietCTNT(int idCongTrinh){
        return this.xLCPCTDauNoiDuongHTTNuocThaiService.selectListChiTietCTNT(idCongTrinh);
    }

    @Override
    public void insertCongTrinhChiTietNT(CongTrinhChiTietVO congTrinhChiTietVO){
        this.xLCPCTDauNoiDuongHTTNuocThaiService.insertCongTrinhChiTietNT(congTrinhChiTietVO);
    }

}
