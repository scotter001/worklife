package vn.worklife.qlctgt.user.xulycpctthietyeu.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;
import vn.worklife.qlctgt.user.xulycpctthietyeu.model.*;
import vn.worklife.qlctgt.user.xulycpctthietyeu.service.XLCPCTThietYeuService;

import java.util.List;

@Service
public class XLCPCTThietYeuImpl implements XLCPCTThietYeuService {
    @Autowired
    XLCPCTThietYeuService xlcpctThietYeuService;

    @Override
    public List<DmLoaiCongTrinhVO> selectLoaiHinh(){
        return this.xlcpctThietYeuService.selectLoaiHinh();
    }
    @Override
    public void deleteCongTrinhChiTiet(int idCongTrinh){
        this.xlcpctThietYeuService.deleteCongTrinhChiTiet(idCongTrinh);
    }
    @Override
    public void insertCongTrinhChiTiet(CongTrinhChiTietVO congTrinhChiTietVO){
        this.xlcpctThietYeuService.insertCongTrinhChiTiet(congTrinhChiTietVO);
    }
    @Override
    public List<CongTrinhChiTietVO> selectListChiTietCT(int idCongTrinh){
        return this.xlcpctThietYeuService.selectListChiTietCT(idCongTrinh);
    }
    @Override
    public boolean deleteChiTietTD(int idctct){
        return this.xlcpctThietYeuService.deleteChiTietTD(idctct);
    }
    @Override
    public boolean deleteCongThuc(int id){return this.xlcpctThietYeuService.deleteCongThuc(id);}
    @Override
    public DmDonGiaCPVO selectDonGia(int idLoaiHoSo, int suDung){return this.xlcpctThietYeuService.selectDonGia(idLoaiHoSo, suDung);}
    @Override
    public ThuPhiCongTrinhVO selectThuPhiCongTrinh(int idHoSo){return this.xlcpctThietYeuService.selectThuPhiCongTrinh(idHoSo);}
    @Override
    public List<ThuPhiCongThucVO> selectListCongThuc(int idPhi){return this.xlcpctThietYeuService.selectListCongThuc(idPhi);}
}
