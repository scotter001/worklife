package vn.worklife.user.quanlytuyenduong.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlytuyenduong.model.*;

import java.util.List;

public interface DmQLThietBiBienBaoService {

    List<ThietBiVO> selectListThietBiBienBao(DatatableRequestCriteriasVO criteriasVO);
    List<LoaiTBVO> selectListLoaiThietBi();
    List<QLThietBiVO> selectListThietBi();
    QLThietBiVO selectListThietBiByid(@Param("idtb") int idtb);
    List<DmXaVO> selectDmXaByIdHuyen(@Param("idHuyen") int idHuyen);
    void insertThietBi(ThietBiVO thietBiVO);
    void updateThietBi(ThietBiVO thietBiVO);
    int getPositionSeaShoe(@Param("idtb") int idtb);
}
