package vn.worklife.user.mockup.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.BienBaoVO;
import vn.worklife.user.mockup.service.BienBaoService;

import java.util.ArrayList;
import java.util.List;

@Service("BienBaoService")
public class BienBaoImpl implements BienBaoService {

    @Autowired
    BienBaoService bienBaoService;

    @Override
    public ArrayList<BienBaoVO> selectShowBienBao(DatatableRequestCriteriasVO criterias) {
        return bienBaoService.selectShowBienBao(criterias);
    }

    @Override
    public BienBaoVO selectBienBaoById(int idBbdth) {
        return bienBaoService.selectBienBaoById(idBbdth);
    }

    @Override
    public void insertBienBao(BienBaoVO bienBaoVO) {
        bienBaoService.insertBienBao(bienBaoVO);
    }

    @Override
    public void updateBienBao(BienBaoVO bienBaoVO) {
        bienBaoService.updateBienBao(bienBaoVO);
    }

    @Override
    public List<BienBaoVO> selectBienBaoByIdDuong(int idbbdth){
        return this.bienBaoService.selectBienBaoByIdDuong(idbbdth);
    }
}
