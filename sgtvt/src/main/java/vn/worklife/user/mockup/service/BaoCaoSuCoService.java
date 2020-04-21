/*
 * Copyright (c) 2018.
 * Author : Phat Thinh
 */

package vn.worklife.user.mockup.service;

import vn.worklife.user.mockup.model.BaoCaoSuCoVO;

public interface BaoCaoSuCoService {
    Integer selectIdBaoCaoSuCo(BaoCaoSuCoVO baoCaoSuCoVO);

    void insertBaoCaoSuCo(BaoCaoSuCoVO baoCaoSuCoVO);

    void updateBaoCaoSuCo(BaoCaoSuCoVO baoCaoSuCoVO);

    void deleteBaoCaoSuCoById(int baoCaoSuCoId);
}
