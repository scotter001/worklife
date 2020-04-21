package vn.worklife.user.settupcategoryupdate.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.worklife.user.mockup.model.DanhMucSCTXVO;
import vn.worklife.user.settupcategoryupdate.service.SettupCategoryUpdateService;

@Service("SettupCategoryUpdateServiceImpl")
public class SettupCategoryUpdateServiceImpl implements SettupCategoryUpdateService {
	@Autowired SettupCategoryUpdateService settupCategoryUpdateService;

	@Override
	public List<DanhMucSCTXVO> selectListDuyetSCTX(int nam, int quy, int idGroup) {
		// TODO Auto-generated method stub
		return this.settupCategoryUpdateService.selectListDuyetSCTX(nam,quy,idGroup);
	}
	@Override
	public void updateDuyetSCTX(DanhMucSCTXVO danhMucSCTXVO){
		this.settupCategoryUpdateService.updateDuyetSCTX(danhMucSCTXVO);
	}
}
