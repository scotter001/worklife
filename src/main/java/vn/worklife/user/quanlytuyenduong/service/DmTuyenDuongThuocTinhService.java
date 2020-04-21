package vn.worklife.user.quanlytuyenduong.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlytuyenduong.model.*;

import java.util.List;


public  interface DmTuyenDuongThuocTinhService {

    List<TuyenThuocTinhVO> selectListTuyenDuongThuocTinh(@Param("idLoaiDuong") int idTuyenDuong ,@Param("tenDuong") String tenDuong);

    List<TuyenThuocTinhVO> selectTuyenDuongById(@Param("idTuyenDuong") int idTuyenDuong);


    void insertTuyenDuong(TuyenThuocTinhVO TuyenThuocTinhVO);

    void updateTuyenDuong(TuyenThuocTinhVO TuyenThuocTinhVO);

    boolean deleteTuyenDuong(@Param("idTuyenDuong") int idTuyenDuong);

}
