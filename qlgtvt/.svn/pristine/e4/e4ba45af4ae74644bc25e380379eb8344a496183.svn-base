package vn.worklife.user.mockup.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.basicinformation.model.datatable.DatatableRequestCriteriasVO;
import vn.worklife.user.mockup.model.BridgeVO;
import vn.worklife.user.mockup.model.ThongSoKtVO;
import vn.worklife.user.mockup.service.BridgeService;

import java.util.ArrayList;

@Service("BridgeImpl")
public class BridgeImpl implements BridgeService {

    @Autowired
    BridgeService bridgeService;

    @Override
    public ArrayList<BridgeVO> selectShowCau(DatatableRequestCriteriasVO criterias) {
        return bridgeService.selectShowCau(criterias);
    }

    @Override
    public BridgeVO selectBridgeById(int idCau) {
        return bridgeService.selectBridgeById(idCau);
    }

    @Override
    public void insertBridge(BridgeVO bridgeVO) {
        bridgeService.insertBridge(bridgeVO);
    }

    @Override
    public void updateBridge(BridgeVO bridgeVO) {bridgeService.updateBridge(bridgeVO);}

    @Override
    public void deleteThongTinCau(int id) {
        bridgeService.deleteThongTinCau(id);
    }

    @Override
    public void insertInfoBridge(ThongSoKtVO thongSoKtVO) {
        bridgeService.insertInfoBridge(thongSoKtVO);
    }

    @Override
    public void updateInfoBridge(ThongSoKtVO thongSoKtVO) {
        bridgeService.updateInfoBridge(thongSoKtVO);
    }

    @Override
    public ThongSoKtVO selectDm(int idThongSoKt) {
        return bridgeService.selectDm(idThongSoKt);
    }
}
