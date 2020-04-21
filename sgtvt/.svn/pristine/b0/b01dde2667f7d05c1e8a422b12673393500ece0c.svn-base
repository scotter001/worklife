package vn.worklife.user.quanlytuyenduong.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.TuyenDuongVO;
import vn.worklife.user.quanlytuyenduong.model.*;
import vn.worklife.user.quanlytuyenduong.service.DmTuyenDuongThuocTinhService;

import java.util.List;

@Service
public class DmTuyenDuongThuocTinhImpl implements DmTuyenDuongThuocTinhService {
    @Autowired
    DmTuyenDuongThuocTinhService dmTuyenDuongThuocTinhService;

    @Override
    public List<TuyenThuocTinhVO> selectListTuyenDuongThuocTinh(int idLoaiDuong, String tenDuong){
        return this.dmTuyenDuongThuocTinhService.selectListTuyenDuongThuocTinh(idLoaiDuong,tenDuong);
    }

    @Override
    public List<TuyenThuocTinhVO> selectTuyenDuongById(int idTuyenDuong){
        return this.dmTuyenDuongThuocTinhService.selectTuyenDuongById(idTuyenDuong);
    }
    @Override
    public void insertTuyenDuong(TuyenThuocTinhVO TuyenThuocTinhVO){
        this.dmTuyenDuongThuocTinhService.insertTuyenDuong(TuyenThuocTinhVO);
    }
    @Override
    public void updateTuyenDuong(TuyenThuocTinhVO TuyenThuocTinhVO){
        this.dmTuyenDuongThuocTinhService.updateTuyenDuong(TuyenThuocTinhVO);
    }

    @Override
    public boolean deleteTuyenDuong(int idTuyenDuong){
        return this.dmTuyenDuongThuocTinhService.deleteTuyenDuong(idTuyenDuong);
    }

}
