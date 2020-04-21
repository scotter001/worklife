package vn.worklife.user.quanlydiemden.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlydiemden.model.DiemDenVO;

import java.util.List;

public interface DiemDenGTDuongBoService {
    List<DiemDenVO> selectListDiemDenDB(DatatableRequestCriteriasVO criteriasVO);
    void insertDiemDenDuongBo(DiemDenVO diemDenVO);
    void updateDiemDenDuongBo(DiemDenVO diemDenVO);
    int getPosition(@Param("idDiemDen") int idDiemDen);
    void insertDiemDenHuyen(@Param("idDiemDen") int idDiemDen, @Param("idHuyen") int idHuyen);
    void deleteDiemDenById(@Param("idDiemDen") int idDiemDen);
}
