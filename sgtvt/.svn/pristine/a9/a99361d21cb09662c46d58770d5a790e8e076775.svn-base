package vn.worklife.user.quanlycau.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlycau.model.*;

import java.util.List;

public interface QuanLyCauService {
    List<DmKetCauVO> selectListDmKetCau();
    List<DmDangCauVO> selectListDangCau();
    List<DmDonViQLVO> selectListDonViQL();
    List<CauVO> selectListCau(DatatableRequestCriteriasVO criteriasVO);
    void insertCau(CauVO cauVO);
    void updateCau(CauVO cauVO);
    void insertTinhTrangCau(@Param("idCau") int idCau, @Param("tinhTrang") int tinhTrang);
    void updateTinhTrangCau(@Param("idCau") int idCau, @Param("tinhTrang") int tinhTrang);
    int getPosition(@Param("idCau") int idCau);
}
