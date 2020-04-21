package vn.worklife.user.quanlyquyhoach.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.quanlyquyhoach.model.*;
import vn.worklife.user.quanlyquyhoach.service.KhoiTaoHoSoQuyHoachService;

import java.util.List;

@Service
public class KhoiTaoHoSoQuyHoachImpl implements KhoiTaoHoSoQuyHoachService {
    @Autowired
    KhoiTaoHoSoQuyHoachService khoiTaoHoSoQuyHoachService;

    @Override
    public List<DmDonViTuVanQHVO> selectListDmDonViQH(int cap){
        return this.khoiTaoHoSoQuyHoachService.selectListDmDonViQH(cap);
    }
    @Override
    public List<DmThamDinhVO> selectListDmThamDinh(){
        return this.khoiTaoHoSoQuyHoachService.selectListDmThamDinh();
    }
    @Override
    public List<DmCQDuyetVO> selectListCQDuyet(int cap){
        return this.khoiTaoHoSoQuyHoachService.selectListCQDuyet(cap);
    }
    @Override
    public void updateFileUploadVO(int idBanVe_QH){
        this.khoiTaoHoSoQuyHoachService.updateFileUploadVO(idBanVe_QH);
    }
    @Override
    public void updateFileTaiLieu(int idTaiLieu_QH){
        this.khoiTaoHoSoQuyHoachService.updateFileTaiLieu(idTaiLieu_QH);
    }
    @Override
    public List<HoSoQuyHoachVO> selectListHSQH(DatatableRequestCriteriasVO criteriasVO){
        return this.khoiTaoHoSoQuyHoachService.selectListHSQH(criteriasVO);
    }
    @Override
    public void insertHSQH(HoSoQuyHoachVO hoSoQuyHoachVO){
        this.khoiTaoHoSoQuyHoachService.insertHSQH(hoSoQuyHoachVO);
    }
    @Override
    public void updateIdParent(int idHoSo_QH){
        this.khoiTaoHoSoQuyHoachService.updateIdParent(idHoSo_QH);
    }
    @Override
    public void updateHSQH(HoSoQuyHoachVO hoSoQuyHoachVO){
        this.khoiTaoHoSoQuyHoachService.updateHSQH(hoSoQuyHoachVO);
    }
    @Override
    public int getPosition(int idHoSo_QH){
        return this.khoiTaoHoSoQuyHoachService.getPosition(idHoSo_QH);
    }
    @Override
    public HoSoQuyHoachVO selectDataHSQHByIdHoSoQH(int idHoSo_QH){
        return this.khoiTaoHoSoQuyHoachService.selectDataHSQHByIdHoSoQH(idHoSo_QH);
    }
    @Override
    public List<BanVeQuyHoachVO> selectListBanVeQuyHoach(int idHoSo_QH){
        return this.khoiTaoHoSoQuyHoachService.selectListBanVeQuyHoach(idHoSo_QH);
    }
    @Override
    public List<TaiLieuQuyHoachVO> selectListTaiLieuQuyHoach(int idHoSo_QH){
        return this.khoiTaoHoSoQuyHoachService.selectListTaiLieuQuyHoach(idHoSo_QH);
    }
    @Override
    public BanVeQuyHoachVO selectFileBanVe(int id){
        return this.khoiTaoHoSoQuyHoachService.selectFileBanVe(id);
    }
    @Override
    public TaiLieuQuyHoachVO selectFileTaiLieu(int id){
        return this.khoiTaoHoSoQuyHoachService.selectFileTaiLieu(id);
    }
    @Override
    public void insertBanVeQuyHoach(BanVeQuyHoachVO banVeQuyHoachVO){
        this.khoiTaoHoSoQuyHoachService.insertBanVeQuyHoach(banVeQuyHoachVO);
    }
    @Override
    public void updateBanVeQuyHoach(BanVeQuyHoachVO banVeQuyHoachVO){
        this.khoiTaoHoSoQuyHoachService.updateBanVeQuyHoach(banVeQuyHoachVO);
    }
    @Override
    public void insertTaiLieuQuyHoach(TaiLieuQuyHoachVO taiLieuQuyHoachVO){
        this.khoiTaoHoSoQuyHoachService.insertTaiLieuQuyHoach(taiLieuQuyHoachVO);
    }
    @Override
    public void updateTaiLieuQuyHoach(TaiLieuQuyHoachVO taiLieuQuyHoachVO){
        this.khoiTaoHoSoQuyHoachService.updateTaiLieuQuyHoach(taiLieuQuyHoachVO);
    }
    @Override
    public boolean deleteBanVeQH(int idBanVe_QH){
        return this.khoiTaoHoSoQuyHoachService.deleteBanVeQH(idBanVe_QH);
    }
    @Override
    public boolean deleteTaiLieuQH(int idTaiLieu_QH){
        return this.khoiTaoHoSoQuyHoachService.deleteTaiLieuQH(idTaiLieu_QH);
    }
}
