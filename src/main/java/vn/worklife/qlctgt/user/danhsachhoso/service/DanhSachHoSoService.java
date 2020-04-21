package vn.worklife.qlctgt.user.danhsachhoso.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.qlctgt.user.danhsachhoso.model.*;

import java.util.List;

public interface DanhSachHoSoService {
    List<DmLoaiHoSoVO> selectListLoaiHS();
    List<DmDoanhNghiepVO> selectListDoanhNghiep(@Param("tenDoanhNghiep") String tenDoanhNghiep);
    void insertDoanhNhiep(DmDoanhNghiepVO dmDoanhNghiepVO);
    void updateDoanhNghiep(DmDoanhNghiepVO dmDoanhNghiepVO);
    boolean deleteSDN(@Param("idDMDN") int idDMDN);
    boolean selectReceptionNumber(@Param("soBienNhan") String soBienNhan);
    void insertHoSo(HoSoVO hoSoVO);
    void insertDanhSachHoSo(HoSoVO hoSoVO);
    List<DmTrangThaiVO> selectListTrangThai();
    List<DoanhNghiepVO> selectListHSBuoc1(DatatableRequestCriteriasVO criteriasVO);
    List<HoSoVO> selectListHoSo(DatatableRequestCriteriasVO criteriasVO);
    void insertDSHoSoChuyen(DanhSachHoSoVO danhSachHoSoVO);
    void updateDSHoSoParent(DanhSachHoSoVO danhSachHoSoVO);
}
