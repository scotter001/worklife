package vn.worklife.user.mockup.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.FileAttachVO;
import vn.worklife.user.mockup.model.TuyenDuongVO;
import vn.worklife.user.mockup.service.TuyenDuongService;

import java.util.ArrayList;

@Service("TuyenDuongImpl")
public class TuyenDuongImpl implements TuyenDuongService {

    @Autowired
    TuyenDuongService tuyenDuongService;

    @Override
    public void insertTuyenDuong(TuyenDuongVO tuyenDuongVO) {
        tuyenDuongService.insertTuyenDuong(tuyenDuongVO);
    }

    @Override
    public ArrayList<TuyenDuongVO> selectShowTuyenDuong(DatatableRequestCriteriasVO criterias) {
        return tuyenDuongService.selectShowTuyenDuong(criterias);
    }

    @Override
    public void updateTuyenDuong(TuyenDuongVO tuyenDuongVO) {
        tuyenDuongService.updateTuyenDuong(tuyenDuongVO);
    }

    @Override
    public TuyenDuongVO selectTuyenDuongByTuyenDuongId(int idTuyenDuong) {
        return tuyenDuongService.selectTuyenDuongByTuyenDuongId(idTuyenDuong);
    }

    @Override
    public void insertFile(FileAttachVO item) {
        tuyenDuongService.insertFile(item);
    }

    @Override
    public void updateFile(FileAttachVO item) {
        tuyenDuongService.updateFile(item);
    }

    @Override
    public void deleteDocumentAttach(int id) {
        tuyenDuongService.deleteDocumentAttach(id);
    }
}
