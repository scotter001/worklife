package vn.worklife.qlctgt.user.capphepcaitaoviahe.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.DmLoaiCTVO;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.NhieuHuyenVO;
import vn.worklife.qlctgt.user.danhsachhoso.model.HoSoVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.CongTrinhVO;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.model.GiayPhepVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.ThietLapNguoiKyVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.model.VanBanChapThuanVO;
import vn.worklife.qlctgt.user.xulycpctdaunoiduong.sevice.XLCPCTDauNoiDuongService;
import vn.worklife.qlctgt.user.capphepcaitaoviahe.service.CapPhepCaiTaoViaHeService;

import java.util.List;

@Service
public class CapPhepCaiTaoViaHeImpl implements CapPhepCaiTaoViaHeService {
    @Autowired
    private CapPhepCaiTaoViaHeService CapPhepCaiTaoViaHeService;

    @Override
    public void insertGiayPhep(GiayPhepVO giayPhepVO){
        this.CapPhepCaiTaoViaHeService.insertGiayPhep(giayPhepVO);
    }
    @Override
    public void updateGiayPhep(int idHoSo){
        this.CapPhepCaiTaoViaHeService.updateGiayPhep(idHoSo);
    }
    @Override
    public List<GiayPhepVO> selectGiayPhepAll(){
        return this.CapPhepCaiTaoViaHeService.selectGiayPhepAll();
    }
    public List<ThietLapNguoiKyVO> selectlistNguoiKyGP(){
        return this.CapPhepCaiTaoViaHeService.selectlistNguoiKyGP();
    }
    @Override
    public GiayPhepVO selectGiayPhepByidHS(int idHoSo ){
        return this.CapPhepCaiTaoViaHeService.selectGiayPhepByidHS(idHoSo);
    }
    @Override
    public DmLoaiCTVO selectDmLoaiCT(int idHoSo){
        return this.CapPhepCaiTaoViaHeService.selectDmLoaiCT(idHoSo);
    }
    @Override
    public NhieuHuyenVO selectNhieuHuyen1(int idHoSo){
        return this.CapPhepCaiTaoViaHeService.selectNhieuHuyen1(idHoSo);
    }


}
