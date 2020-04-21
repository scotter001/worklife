/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.user.mockup.model.*;
import vn.worklife.user.quanlycau.model.CauVO;
import java.util.List;
import java.util.Map;

public interface LapDmScdkService {
    List<LapDanhMucSCDKVO> selectDSDanhMuc_Scdk(@Param("nam") int nam);
    List<LapDanhMucSCDKVO> selectDSDanhMuc_ScdkorferUT1(@Param("nam") int nam);
    List<LapDanhMucSCDKVO> selectDSDanhMuc_ScdkorferUT2(@Param("nam") int nam);
    List<PhapLySCDKVO> selectDSPhapLy(@Param("nam") int nam);
    PhapLySCDKVO selectDSPhapLyById(@Param("idPL") int idPL);
    void updateFileUploadVO(@Param("idPL") int idPL);
    List<DmhmSCTXVO> selectlisthangmuc();
    List<LapDanhMucSCDKVO> selectlistnguonvon();
    List<DmUTSCTXVO> selectlistUutien();
    List<CauVO> selectListCau();
    DmhmSCTXVO selectlisthangmucbyid(@Param("idDmhmScdk") int idDmhmScdk);

    void insertDanhMucSCDK(LapDanhMucSCDKVO lapDanhMucSCDKVO);
    void updateDanhMucSCDK(LapDanhMucSCDKVO lapDanhMucSCDKVO);
    boolean deleteDanhMucSCDK(@Param("idDmScdk") int idDmScdk);

    void insertHuyenDmSCDK(@Param("idDmScdk") int idDmScdk, @Param("idHuyen") int idHuyen);
    boolean deleteHuyenDmSCDK(@Param("idDmScdk") int idDmScdk);
    int getPositionSeaShoe(@Param("idDmScdk") int idDmScdk);
    void insertPhapLySCDK(PhapLySCDKVO phapLySCDKVO);
    void updatePhapLySCDK(PhapLySCDKVO phapLySCDKVO);
    boolean deletePhapLySCDK(@Param("idPL") int idPL);
}
