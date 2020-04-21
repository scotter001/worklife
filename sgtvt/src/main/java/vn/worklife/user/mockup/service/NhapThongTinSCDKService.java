package vn.worklife.user.mockup.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.user.mockup.model.DanhSachSuCoSCDKVO;
import vn.worklife.user.mockup.model.DmTuVanVO;
import vn.worklife.user.mockup.model.NhapThongTinSCDKVO;

import java.util.List;

public interface NhapThongTinSCDKService {
    List<NhapThongTinSCDKVO> selectDanhMucSCDK(@Param("nam") int nam);
    List<DanhSachSuCoSCDKVO> selectDanhMucSuCoSCDK(int idDmscdk);
    List<DmTuVanVO> selectListTC();
    List<DmTuVanVO> selectListTK();
    List<DmTuVanVO> selectListGS();
    void insertSCDK(NhapThongTinSCDKVO nhapThongTinSCDKVO);
    void updateSCDK(NhapThongTinSCDKVO nhapThongTinSCDKVO);
    boolean deleteSCDK(@Param("idScdk") int idScdk);
    List<NhapThongTinSCDKVO> selectExcelDanhMucSCDK(@Param("nam") int nam);
}
