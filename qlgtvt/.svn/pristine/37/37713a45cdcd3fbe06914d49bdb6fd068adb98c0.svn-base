package vn.worklife.user.mockup.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.mockup.model.NhapKiemTraSCTXVO;

import java.util.List;
import java.util.Map;

public interface NhapKiemTraSCTXService {
    List<DanhMucSCTXVO> selectNhapKiemTraSCTX(@Param("quy") int quy, @Param("nam") int nam, @Param("tinhTrang") int tinhTrang, @Param("idGroup") int idGroup);
    void insertNhapKiemTraSCTX(DanhMucSCTXVO danhMucSCTXVO);
    void updateNhapKiemTraSCTX(DanhMucSCTXVO danhMucSCTXVO);
    List<NhapKiemTraSCTXVO> selectAllTableNotPaging(Map<String, String> params);
}
