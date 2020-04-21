package vn.worklife.user.mockup.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.user.mockup.model.DanhSachSuCoSCDKVO;
import vn.worklife.user.mockup.model.DmTuVanVO;
import vn.worklife.user.mockup.model.NhapThongTinSCDKVO;
import vn.worklife.user.mockup.service.NhapThongTinSCDKService;

import java.util.List;

@Service("NhapThongTinSCDKImpl")
public class NhapThongTinSCDKImpl implements NhapThongTinSCDKService {

    @Autowired
    NhapThongTinSCDKService nhapThongTinSCDKService;

    @Override
    public List<NhapThongTinSCDKVO> selectDanhMucSCDK(int nam) {
        return this.nhapThongTinSCDKService.selectDanhMucSCDK(nam);
    }
    @Override
    public List<DanhSachSuCoSCDKVO> selectDanhMucSuCoSCDK(int idDmscdk) {
        return nhapThongTinSCDKService.selectDanhMucSuCoSCDK(idDmscdk);
    }
    @Override
    public List<DmTuVanVO> selectListTC(){
        return this.nhapThongTinSCDKService.selectListTC();
    }
    @Override
    public List<DmTuVanVO> selectListTK(){
        return this.nhapThongTinSCDKService.selectListTK();
    }
    @Override
    public List<DmTuVanVO> selectListGS(){
        return this.nhapThongTinSCDKService.selectListGS();
    }
    @Override
    public void insertSCDK(NhapThongTinSCDKVO nhapThongTinSCDKVO){
        this.nhapThongTinSCDKService.insertSCDK(nhapThongTinSCDKVO);
    }
    @Override
    public void updateSCDK(NhapThongTinSCDKVO nhapThongTinSCDKVO){
        this.nhapThongTinSCDKService.updateSCDK(nhapThongTinSCDKVO);
    }
    @Override
    public boolean deleteSCDK(int idScdk){
        return this.nhapThongTinSCDKService.deleteSCDK(idScdk);
    }
    @Override
    public List<NhapThongTinSCDKVO> selectExcelDanhMucSCDK(int nam){
        return this.nhapThongTinSCDKService.selectExcelDanhMucSCDK(nam);
    }
}
