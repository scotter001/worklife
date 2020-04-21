package vn.worklife.user.statisticeditprice.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vn.worklife.user.statisticeditprice.service.StatisticEditPriceService;
@Service("StatisticEditPriceServiceImpl")
public class StatisticEditPriceServiceImpl implements StatisticEditPriceService {
	@Autowired StatisticEditPriceService statisticEditPriceService;

	@Override
	public List<HashMap<Object, Object>> selecteListQuarter(int nam) {
		// TODO Auto-generated method stub
		return this.statisticEditPriceService.selecteListQuarter(nam);
	}

	@Override
	public List<HashMap<Object, Object>> selecteListFiveYear(/*List<Integer>*/int nam) {
		// TODO Auto-generated method stub
		return this.statisticEditPriceService.selecteListFiveYear(nam);
	}
}
