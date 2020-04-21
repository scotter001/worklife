package vn.worklife.user.quanlytuyenduong.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlytuyenduong.model.*;

import java.util.List;

public interface DmTuyenDuongTheoHatService {
    List<GroupVO> selectListHatQL();
    List<DmLoaiDuongVO> selectListLoaiDuong();
    List<TuyenDuongHatVO> selectListTuyenDuong();
    List<DmHuyenVO> selectHuyen();
    List<UsersVO> selectListUsers(@Param("idGroup") int idGroup);
    List<DuongTheoHatVO> selectListDuongHat(DatatableRequestCriteriasVO criteriasVO);
    DuongHatVO selectDataByIddh(@Param("iddh") int iddh);
    List<DoanDuongVO> selectListDoanDuong(@Param("iddh") int iddh);
    UsersVO selectTelePhoneByIdUser(@Param("idUser") int idUser);
    void insertDuongHat(DuongHatVO duongHatVO);
    void updateDuongHat(DuongHatVO duongHatVO);
    void insertDoanDuong(DoanDuongVO doanDuongVO);
    void updateDoanDuong(DoanDuongVO doanDuongVO);
    int getPositionSeaShoe(@Param("id") int id);
    boolean deleteDoanDuong(@Param("idDoan") int idDoan);
}
