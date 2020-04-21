package vn.worklife.user.baocaotinhtrangduong.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.baocaotinhtrangduong.model.BCTTDuongVO;
import vn.worklife.user.baocaotinhtrangduong.model.BaoCaoReportVO;
import vn.worklife.user.baocaotinhtrangduong.model.LyTrinhReportVO;
import vn.worklife.user.baocaotinhtrangduong.service.BaoCaoTinhTrangDuongService;
import vn.worklife.user.quanlytuyenduong.model.LyTrinhVO;
import vn.worklife.user.quanlytuyenduong.model.TinhTrangDuongVO;

import java.util.List;

@Service
public class BaoCaoTinhTrangDuongImpl implements BaoCaoTinhTrangDuongService {
    @Autowired
    BaoCaoTinhTrangDuongService baoCaoTinhTrangDuongService;

    @Override
    public List<LyTrinhVO> selectListData(int idGroup, int quy, int nam){
        return this.baoCaoTinhTrangDuongService.selectListData(idGroup, quy, nam);
    }
    @Override
    public List<LyTrinhVO> selectListDataDf(int idGroup, int quy, int nam){
        return this.baoCaoTinhTrangDuongService.selectListDataDf(idGroup, quy, nam);
    }
    @Override
    public void insertBCTTDuong(TinhTrangDuongVO tinhTrangDuongVO){
        this.baoCaoTinhTrangDuongService.insertBCTTDuong(tinhTrangDuongVO);
    }
    @Override
    public void updateBCTTDuong(TinhTrangDuongVO tinhTrangDuongVO){
        this.baoCaoTinhTrangDuongService.updateBCTTDuong(tinhTrangDuongVO);
    }
    @Override
    public BCTTDuongVO getNgayBaoCao(int quy, int nam, int idGroup){
        return this.baoCaoTinhTrangDuongService.getNgayBaoCao(quy, nam, idGroup);
    }
    @Override
    public List<BaoCaoReportVO> selectListLTReport(int quy, int nam, int idGroup){
        return this.baoCaoTinhTrangDuongService.selectListLTReport(quy, nam, idGroup);
    }
    @Override
    public List<LyTrinhReportVO> selectListLyTrinh(int iddh){
        return this.baoCaoTinhTrangDuongService.selectListLyTrinh(iddh);
    }
}
