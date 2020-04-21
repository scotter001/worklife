package vn.worklife.user.statisticeditprice.service;

import java.util.HashMap;
import java.util.List;

public interface StatisticEditPriceService {

	List<HashMap<Object, Object>> selecteListQuarter(int nam);
	List<HashMap<Object, Object>> selecteListFiveYear(/*List<Integer>*/int nam);
	
}
