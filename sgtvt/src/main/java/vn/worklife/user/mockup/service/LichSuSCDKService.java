package vn.worklife.user.mockup.service;

import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.DanhSachSuCoSCDKVO;
import vn.worklife.user.mockup.model.LapDanhMucSCDKVO;
import vn.worklife.user.mockup.model.LichSuSCDKVO;
import vn.worklife.user.mockup.model.NhapThongTinSCDKVO;
import vn.worklife.user.quanlycau.model.CauVO;
import vn.worklife.user.quanlytuyenduong.model.QLThietBiVO;
import vn.worklife.user.quanlytuyenduong.model.TuyenDuongHatVO;

import java.util.List;
import java.util.Map;

public interface LichSuSCDKService {
    List<TuyenDuongHatVO> selectListTD();
    List<CauVO> selectListCau();
    List<QLThietBiVO> selectListTB();
    List<LapDanhMucSCDKVO> selectListCT();
    List<NhapThongTinSCDKVO> selectTableLichSuDMSCDK(DatatableRequestCriteriasVO criterias);
    List<DanhSachSuCoSCDKVO> selectDanhSachSCDK(int idDmscdk);
    List<LichSuSCDKVO> selectAllTableNotPaging(Map<String, String> params);
}
