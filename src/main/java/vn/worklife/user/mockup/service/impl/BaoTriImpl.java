package vn.worklife.user.mockup.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.BaoTriVO;
import vn.worklife.user.mockup.service.BaoTriService;

import java.util.ArrayList;

@Service("BaoTriImpl")
public class BaoTriImpl implements BaoTriService {

    @Autowired
    BaoTriService baoTriService;

    @Override
    public ArrayList<BaoTriVO> selectShowLoaiBaoTriDuong(DatatableRequestCriteriasVO criterias) {
        return baoTriService.selectShowLoaiBaoTriDuong(criterias);
    }

    @Override
    public ArrayList<BaoTriVO> selectShowLoaiBaoTriCau(DatatableRequestCriteriasVO criterias) {
        return baoTriService.selectShowLoaiBaoTriCau(criterias);
    }

    @Override
    public BaoTriVO selectShowLoaiBaoTriDuongById(int idBaoTri) {
        return baoTriService.selectShowLoaiBaoTriDuongById(idBaoTri);
    }

    @Override
    public BaoTriVO selectShowLoaiBaoTriCauById(int idBaoTri) {
        return baoTriService.selectShowLoaiBaoTriCauById(idBaoTri);
    }

    @Override
    public ArrayList<BaoTriVO> selectShowLoaiBaoTriThietBi(DatatableRequestCriteriasVO criterias) {
        return baoTriService.selectShowLoaiBaoTriThietBi(criterias);
    }

    @Override
    public BaoTriVO selectShowLoaiBaoTriThietBiById(int idBaoTri) {
        return baoTriService.selectShowLoaiBaoTriThietBiById(idBaoTri);
    }

    @Override
    public void insertLoaiBaoTriDuong(BaoTriVO baoTriVO) {
        baoTriService.insertLoaiBaoTriDuong(baoTriVO);
    }

    @Override
    public void updateBaoTri(BaoTriVO baoTriVO) {
        baoTriService.updateBaoTri(baoTriVO);
    }
}
