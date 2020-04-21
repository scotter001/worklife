package vn.worklife.user.quanlytuyenduong.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlytuyenduong.model.*;
import vn.worklife.user.quanlytuyenduong.service.DmQLThietBiBienBaoService;

import java.util.List;

@Service
public class DmQLThietBiBienBaoImpl implements DmQLThietBiBienBaoService {
    @Autowired
    DmQLThietBiBienBaoService dmQLThietBiBienBaoService;


    @Override
    public List<ThietBiVO> selectListThietBiBienBao(DatatableRequestCriteriasVO criteriasVO){
        return this.dmQLThietBiBienBaoService.selectListThietBiBienBao(criteriasVO);
    }
    @Override
    public  List<LoaiTBVO> selectListLoaiThietBi() {
        return  this.dmQLThietBiBienBaoService.selectListLoaiThietBi();
    }
    @Override
    public  List<QLThietBiVO> selectListThietBi() {
        return  this.dmQLThietBiBienBaoService.selectListThietBi();
    }
    @Override
    public QLThietBiVO selectListThietBiByid(int idtb){
        return this.dmQLThietBiBienBaoService.selectListThietBiByid(idtb);
    }
    @Override
    public List<DmXaVO> selectDmXaByIdHuyen(int idHuyen){
        return this.dmQLThietBiBienBaoService.selectDmXaByIdHuyen(idHuyen);
    }
    @Override
    public void insertThietBi(ThietBiVO thietBiVO){
        this.dmQLThietBiBienBaoService.insertThietBi(thietBiVO);
    }
    @Override
    public void updateThietBi(ThietBiVO thietBiVO){
        this.dmQLThietBiBienBaoService.updateThietBi(thietBiVO);
    }
    @Override
    public int getPositionSeaShoe(int idtb){
        return this.dmQLThietBiBienBaoService.getPositionSeaShoe(idtb);
    }
}
