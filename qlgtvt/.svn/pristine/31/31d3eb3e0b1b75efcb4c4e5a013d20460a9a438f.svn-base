/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.category.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.manager.category.model.CategoryVO;
import vn.worklife.manager.category.model.TableVO;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface CategoryService {
    List<CategoryVO> selectAllCategory(@Param("table")TableVO table);
    List<CategoryVO> selectAllCategory(String tblName);
    List<CategoryVO> selectAllCategoryData(@Param("table")TableVO table);

    List<CategoryVO> selectAllCategoryWithParentCode(@Param("tblName") String tblName,@Param("code") String code);
    List<CategoryVO> selectAllCategoryWithParentCode(@Param("table")TableVO table,@Param("code") String code);

    List<CategoryVO> selectAllCategoryWithParentId(@Param("tblName") String tblName,@Param("id") int id);
    List<CategoryVO> selectAllCategoryWithParentId(@Param("table")TableVO table,@Param("id") int id);

    List<CategoryVO> selectAllCategoryWithParentColumn(@Param("tblName") String tblName,@Param("column") String column,@Param("value") String value,@Param("tblparent") String tblParent);
    List<CategoryVO> selectAllCategoryWithParentColumn(@Param("table")TableVO table,@Param("column") String column,@Param("value") String value,@Param("tblparent") String tblParent);


    CategoryVO selectCategory(@Param("tblName") String tblName, @Param("conditional")Map<String,HashMap<String,String>> condition);
    CategoryVO selectCategory(@Param("table")TableVO table,@Param("conditional")Map<String,HashMap<String,String>> condition);



    void insertCategory(@Param("table")TableVO table);
    void updateCategory(@Param("table")TableVO table);
    void deleteCategory(@Param("value") int value,@Param("colId") String colId,@Param("tblName") String tblName);
}
