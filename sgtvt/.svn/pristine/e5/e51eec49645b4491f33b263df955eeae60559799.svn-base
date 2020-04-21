package vn.worklife.user.baocaotinhtrangcau.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.baocaotinhtrangcau.model.BCTinhTrangCauVO;
import vn.worklife.user.baocaotinhtrangcau.model.BaoCaoReportCauVO;
import vn.worklife.user.quanlycau.model.CauVO;
import vn.worklife.user.quanlycau.model.TinhTrangCauVO;

import java.util.List;

public interface BCTinhTrangCauService {
    List<CauVO> selectListBaoCaoCau(@Param("idGroup") int idGroup,@Param("quy") int quy,@Param("nam") int nam);
    List<CauVO> selectListBaoCaoCauDf(@Param("idGroup") int idGroup,@Param("quy") int quy,@Param("nam") int nam);
    BCTinhTrangCauVO getNgayBaoCao(@Param("quy") int quy, @Param("nam") int nam, @Param("idGroup") int idGroup);
    void insertBCTTCau(TinhTrangCauVO tinhTrangCauVO);
    void updateBCTTCau(TinhTrangCauVO tinhTrangCauVO);
    List<BaoCaoReportCauVO> selectListBaoCaoReport(@Param("quy") int quy, @Param("nam") int nam, @Param("idGroup") int idGroup);
    List<CauVO> selectListCau(@Param("quy") int quy, @Param("nam") int nam, @Param("tenCau") String tenCau, @Param("idTuyenDuong") int idTuyenDuong, @Param("idHuyen") int idHuyen, @Param("donViQL") int donViQL);
}
