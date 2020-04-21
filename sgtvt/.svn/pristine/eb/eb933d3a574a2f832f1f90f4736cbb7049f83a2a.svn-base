package vn.worklife.user.quanlyquyhoach.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlyquyhoach.model.HoSoQuyHoachVO;
import vn.worklife.user.quanlyquyhoach.service.TraCuuHoSoQuyHoachService;

import java.util.List;

@Service
public class TraCuuHoSoQuyHoachImpl implements TraCuuHoSoQuyHoachService {
    @Autowired
    TraCuuHoSoQuyHoachService traCuuHoSoQuyHoachService;

    @Override
    public List<HoSoQuyHoachVO> selectListTraCuuHSQH(DatatableRequestCriteriasVO criteriasVO){
        return this.traCuuHoSoQuyHoachService.selectListTraCuuHSQH(criteriasVO);
    }
}
