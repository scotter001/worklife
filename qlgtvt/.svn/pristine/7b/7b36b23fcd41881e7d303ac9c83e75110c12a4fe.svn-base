package vn.worklife.user.quanlydiemden.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlydiemden.model.DiemDenVO;
import vn.worklife.user.quanlydiemden.model.DmTieuChiDiemDenVO;

import java.util.List;

public interface DiemDenGTDuongThuyService {
    List<DmTieuChiDiemDenVO> selectListTieuChi(@Param("phanLoai") int phanLoai);
    void insertDiemDenDuongThuy(DiemDenVO diemDenVO);
    void updateDiemDenDuongThuy(DiemDenVO diemDenVO);
    List<DiemDenVO> selectListDiemDenDT(DatatableRequestCriteriasVO criteriasVO);
}
