package vn.worklife.user.baocaotinhtrangduong.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.baocaotinhtrangduong.model.BCTTDuongVO;
import vn.worklife.user.baocaotinhtrangduong.model.BaoCaoReportVO;
import vn.worklife.user.baocaotinhtrangduong.model.LyTrinhReportVO;
import vn.worklife.user.quanlytuyenduong.model.LyTrinhVO;
import vn.worklife.user.quanlytuyenduong.model.TinhTrangDuongVO;

import java.util.List;

public interface BaoCaoTinhTrangDuongService {
    List<LyTrinhVO> selectListData(@Param("idGroup") int idGroup, @Param("quy") int quy, @Param("nam") int nam);
    List<LyTrinhVO> selectListDataDf(@Param("idGroup") int idGroup, @Param("quy") int quy, @Param("nam") int nam);
    void insertBCTTDuong(TinhTrangDuongVO tinhTrangDuongVO);
    void updateBCTTDuong(TinhTrangDuongVO tinhTrangDuongVO);
    BCTTDuongVO getNgayBaoCao(@Param("quy") int quy, @Param("nam") int nam, @Param("idGroup") int idGroup);
    List<BaoCaoReportVO> selectListLTReport(@Param("quy") int quy, @Param("nam") int nam, @Param("idGroup") int idGroup);
    List<LyTrinhReportVO> selectListLyTrinh(@Param("iddh") int iddh);
}
