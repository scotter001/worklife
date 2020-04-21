package vn.worklife.user.baocaotinhtrangcau.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.baocaotinhtrangcau.model.BCTinhTrangCauVO;
import vn.worklife.user.baocaotinhtrangcau.model.BaoCaoReportCauVO;
import vn.worklife.user.baocaotinhtrangcau.service.BCTinhTrangCauService;
import vn.worklife.user.quanlycau.model.CauVO;
import vn.worklife.user.quanlycau.model.TinhTrangCauVO;

import java.util.List;

@Service
public class BCTinhTrangCauImpl implements BCTinhTrangCauService {
    @Autowired
    BCTinhTrangCauService bcTinhTrangCauService;

    @Override
    public List<CauVO> selectListBaoCaoCau(int idGroup, int quy, int nam){
        return this.bcTinhTrangCauService.selectListBaoCaoCau(idGroup, quy, nam);
    }
    @Override
    public List<CauVO> selectListBaoCaoCauDf(int idGroup, int quy, int nam){
        return this.bcTinhTrangCauService.selectListBaoCaoCauDf(idGroup, quy, nam);
    }
    @Override
    public BCTinhTrangCauVO getNgayBaoCao(int quy, int nam, int idGroup){
        return this.bcTinhTrangCauService.getNgayBaoCao(quy, nam, idGroup);
    }
    @Override
    public void insertBCTTCau(TinhTrangCauVO tinhTrangCauVO){
        this.bcTinhTrangCauService.insertBCTTCau(tinhTrangCauVO);
    }
    @Override
    public void updateBCTTCau(TinhTrangCauVO tinhTrangCauVO){
        this.bcTinhTrangCauService.updateBCTTCau(tinhTrangCauVO);
    }
    @Override
    public List<BaoCaoReportCauVO> selectListBaoCaoReport(int quy, int nam, int idGroup){
        return this.bcTinhTrangCauService.selectListBaoCaoReport(quy, nam, idGroup);
    }
    @Override
    public List<CauVO> selectListCau(int quy, int nam, String tenCau, int idTuyenDuong, int idHuyen, int donViQL){
        return this.bcTinhTrangCauService.selectListCau(quy, nam, tenCau, idTuyenDuong, idHuyen, donViQL);
    }
}
