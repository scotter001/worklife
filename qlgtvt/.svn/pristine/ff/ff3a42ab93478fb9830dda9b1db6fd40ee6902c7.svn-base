/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.user.mockup.model.DanhSachDmScdkVO;

import java.util.List;

public interface DanhSachDmScdkService {
	void insertDsDmScdk(DanhSachDmScdkVO danhSachDmScdkVO);
    void deleteDsDmScdkByDmScdkId(int idDmScdk);
    void deleteDsDmScdkByDmScdkIdList(@Param("idDmScdk")int[] idDmScdk);
    List<DanhSachDmScdkVO> selectDsDmScdkTheoDmScdk(int idDmScdk);

}
