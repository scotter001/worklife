package vn.worklife.user.mockup.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.BridgeVO;
import vn.worklife.user.mockup.model.ThongSoKtVO;

import java.util.ArrayList;

public interface BridgeService {

    ArrayList<BridgeVO> selectShowCau(DatatableRequestCriteriasVO criterias);

    BridgeVO selectBridgeById(int idCau);

    void insertBridge(BridgeVO bridgeVO);

    void updateBridge(BridgeVO bridgeVO);

    void deleteThongTinCau(int id);

    void insertInfoBridge(ThongSoKtVO thongSoKtVO);

    void updateInfoBridge(ThongSoKtVO thongSoKtVO);

    ThongSoKtVO selectDm(int idThongSoKt);
}
