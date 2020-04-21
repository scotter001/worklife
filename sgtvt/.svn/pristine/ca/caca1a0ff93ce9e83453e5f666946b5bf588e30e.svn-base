package vn.worklife.user.quanlyquyhoach.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlyquyhoach.model.*;

import java.util.List;

public interface KhoiTaoHoSoQuyHoachService {
    List<DmDonViTuVanQHVO> selectListDmDonViQH(@Param("cap") int cap);
    List<DmThamDinhVO> selectListDmThamDinh();
    List<DmCQDuyetVO> selectListCQDuyet(@Param("cap") int cap);
    void updateFileUploadVO(@Param("idBanVe_QH") int idBanVe_QH);
    void updateFileTaiLieu(@Param("idTaiLieu_QH") int idTaiLieu_QH);
    List<HoSoQuyHoachVO> selectListHSQH(DatatableRequestCriteriasVO criteriasVO);
    void insertHSQH(HoSoQuyHoachVO hoSoQuyHoachVO);
    void updateIdParent(@Param("idHoSo_QH") int idHoSo_QH);
    void updateHSQH(HoSoQuyHoachVO hoSoQuyHoachVO);
    int getPosition(@Param("idHoSo_QH") int idHoSo_QH);
    HoSoQuyHoachVO selectDataHSQHByIdHoSoQH(@Param("idHoSo_QH") int idHoSo_QH);
    List<BanVeQuyHoachVO> selectListBanVeQuyHoach(@Param("idHoSo_QH") int idHoSo_QH);
    List<TaiLieuQuyHoachVO> selectListTaiLieuQuyHoach(@Param("idHoSo_QH") int idHoSo_QH);
    BanVeQuyHoachVO selectFileBanVe(@Param("id") int id);
    TaiLieuQuyHoachVO selectFileTaiLieu(@Param("id") int id);
    void insertBanVeQuyHoach(BanVeQuyHoachVO banVeQuyHoachVO);
    void updateBanVeQuyHoach(BanVeQuyHoachVO banVeQuyHoachVO);
    void insertTaiLieuQuyHoach(TaiLieuQuyHoachVO taiLieuQuyHoachVO);
    void updateTaiLieuQuyHoach(TaiLieuQuyHoachVO taiLieuQuyHoachVO);
    boolean deleteBanVeQH(@Param("idBanVe_QH") int idBanVe_QH);
    boolean deleteTaiLieuQH(@Param("idTaiLieu_QH") int idTaiLieu_QH);
}
