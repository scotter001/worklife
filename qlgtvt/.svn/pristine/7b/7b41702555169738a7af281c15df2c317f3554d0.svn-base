package vn.worklife.user.quanlytuyenduong.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlytuyenduong.model.*;
import vn.worklife.user.quanlytuyenduong.service.DmQLBaoCaoTTCauDuongService;

import javax.lang.model.element.Element;
import java.util.List;


@Service
public class DmQLBaoCaoTTCauDuongImpl implements DmQLBaoCaoTTCauDuongService {

    @Autowired
    DmQLBaoCaoTTCauDuongService dmQLBaoCaoTTCauDuongService;

    //
//    @Override
//    public List<QLBaoCaoTTCDVO> selectListBaoCaoTTCau(int nam, int quy, int tinhTrang){
//        return this.dmQLBaoCaoTTCauDuongService.selectListBaoCaoTTCau(nam,quy,tinhTrang);
//    }
//    @Override
//    public List<QLBaoCaoTTCDVO> selectListBaoCaoTTDuong(int nam, int quy, int tinhTrang){
//        return this.dmQLBaoCaoTTCauDuongService.selectListBaoCaoTTDuong(nam,quy,tinhTrang);
//    }
    @Override
    public List<QLBaoCaoTTCDVO> selectListBaoCaoTTCau(DatatableRequestCriteriasVO criteriasVO) {
        return this.dmQLBaoCaoTTCauDuongService.selectListBaoCaoTTCau(criteriasVO);
    }

    @Override
    public List<QLBaoCaoTTCDVO> selectListBaoCaoTTDuong(DatatableRequestCriteriasVO criteriasVO) {
        return this.dmQLBaoCaoTTCauDuongService.selectListBaoCaoTTDuong(criteriasVO);
    }

}



