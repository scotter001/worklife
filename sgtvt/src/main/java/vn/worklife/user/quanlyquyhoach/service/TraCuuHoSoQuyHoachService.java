package vn.worklife.user.quanlyquyhoach.service;

import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlyquyhoach.model.HoSoQuyHoachVO;

import java.util.List;

public interface TraCuuHoSoQuyHoachService {
    List<HoSoQuyHoachVO> selectListTraCuuHSQH(DatatableRequestCriteriasVO criteriasVO);
}
