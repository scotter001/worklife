package vn.worklife.user.mockup.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.BienBaoVO;

import java.util.ArrayList;
import java.util.List;

public interface BienBaoService {

    ArrayList<BienBaoVO> selectShowBienBao(DatatableRequestCriteriasVO criterias);

    BienBaoVO selectBienBaoById(int idBbdth);

    void insertBienBao(BienBaoVO bienBaoVO);

    void updateBienBao(BienBaoVO bienBaoVO);

    List<BienBaoVO> selectBienBaoByIdDuong(@Param("idbbdth") int idbbdth);
}
