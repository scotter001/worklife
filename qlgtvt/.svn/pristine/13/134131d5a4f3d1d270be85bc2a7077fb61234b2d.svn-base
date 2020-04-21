/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service.impl;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.*;
import vn.worklife.user.mockup.service.LapDmScdkService;
import vn.worklife.user.quanlycau.model.CauVO;
import vn.worklife.user.quanlytuyenduong.model.TuyenDuongHatVO;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.net.URL;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;
import java.util.Map;

@Service("LapDmScdkServiceImpl")
public class LapDmScdkServiceImpl implements LapDmScdkService {

    @Autowired
    LapDmScdkService lapDmScdkService;

    @Override
    public List<LapDanhMucSCDKVO> selectDSDanhMuc_Scdk(int nam){
        return this.lapDmScdkService.selectDSDanhMuc_Scdk(nam);
    }
    public List<LapDanhMucSCDKVO> selectDSDanhMuc_ScdkorferUT1(int nam){
        return this.lapDmScdkService.selectDSDanhMuc_ScdkorferUT1(nam);
    }
    public List<LapDanhMucSCDKVO> selectDSDanhMuc_ScdkorferUT2(int nam){
        return this.lapDmScdkService.selectDSDanhMuc_ScdkorferUT2(nam);
    }
    @Override
    public List<PhapLySCDKVO> selectDSPhapLy(int nam){
        return this.lapDmScdkService.selectDSPhapLy(nam);
    }
    @Override
    public PhapLySCDKVO selectDSPhapLyById(int idPL){
        return this.lapDmScdkService.selectDSPhapLyById(idPL);
    }
    @Override
    public List<DmhmSCTXVO> selectlisthangmuc(){
        return this.lapDmScdkService.selectlisthangmuc();
    }
    @Override
    public List<LapDanhMucSCDKVO> selectlistnguonvon(){
        return this.lapDmScdkService.selectlistnguonvon();
    }
    @Override
    public List<DmUTSCTXVO> selectlistUutien(){
        return this.lapDmScdkService.selectlistUutien();
    }

    public List<CauVO> selectListCau(){ return this.lapDmScdkService.selectListCau(); }

    public DmhmSCTXVO selectlisthangmucbyid( int idDmhmScdk){ return this.lapDmScdkService.selectlisthangmucbyid(idDmhmScdk); }

    @Override
    public void insertHuyenDmSCDK(int idDmScdk, int idHuyen){
        this.lapDmScdkService.insertHuyenDmSCDK(idDmScdk, idHuyen);
    }
    @Override
    public boolean deleteHuyenDmSCDK(int idDmScdk){
        return this.lapDmScdkService.deleteHuyenDmSCDK(idDmScdk);
    }
    @Override
    public void insertDanhMucSCDK(LapDanhMucSCDKVO lapDanhMucSCDKVO) {
        lapDmScdkService.insertDanhMucSCDK(lapDanhMucSCDKVO);
    }
    @Override
    public void updateDanhMucSCDK(LapDanhMucSCDKVO lapDanhMucSCDKVO) {
        lapDmScdkService.updateDanhMucSCDK(lapDanhMucSCDKVO);
    }
    @Override
    public boolean deleteDanhMucSCDK(int idDmScdk){
        return this.lapDmScdkService.deleteDanhMucSCDK(idDmScdk);
    }

    public int getPositionSeaShoe(int idDmScdk){
        return this.lapDmScdkService.getPositionSeaShoe(idDmScdk);
    }

    @Override
    public boolean deletePhapLySCDK(int idPL){
        return this.lapDmScdkService.deletePhapLySCDK(idPL);
    }

    @Override
    public void insertPhapLySCDK(PhapLySCDKVO phapLySCDKVO) {
        lapDmScdkService.insertPhapLySCDK(phapLySCDKVO);
    }
    @Override
    public void updatePhapLySCDK(PhapLySCDKVO phapLySCDKVO) {
        lapDmScdkService.updatePhapLySCDK(phapLySCDKVO);
    }

    @Override
    public void updateFileUploadVO(int idPL){
        this.lapDmScdkService.updateFileUploadVO(idPL);
    }


}
