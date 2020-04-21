/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.category.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.worklife.manager.category.model.CategoryVO;
import vn.worklife.manager.category.model.TableVO;
import vn.worklife.manager.category.service.CategoryService;
import vn.worklife.manager.category.web.CategoryUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("CategoryServiceImpl")
public class CategoryServiceImpl implements CategoryService{
    @Autowired CategoryService categoryService;

    @Autowired
    CategoryUtils categoryUtils;

    @Override
    public List<CategoryVO> selectAllCategory(TableVO table) {
        return this.categoryService.selectAllCategory(categoryUtils.getTable(table.getUrl()));
    }

    @Override
    public List<CategoryVO> selectAllCategory(String tblName) {
        return this.categoryService.selectAllCategory(categoryUtils.getTableByName(tblName));
    }

    @Override
    public List<CategoryVO> selectAllCategoryData(TableVO table) {
        return this.categoryService.selectAllCategory(categoryUtils.getTable(table.getUrl()));
    }

    @Override
    public List<CategoryVO> selectAllCategoryWithParentCode(String tblName, String code) {
        return this.categoryService.selectAllCategoryWithParentCode(categoryUtils.getTableByName(tblName),code);
    }

    @Override
    public List<CategoryVO> selectAllCategoryWithParentCode(TableVO table, String code) {
        return this.categoryService.selectAllCategoryWithParentCode(table, code);
    }

    @Override
    public List<CategoryVO> selectAllCategoryWithParentId(String tblName, int id) {
        return this.categoryService.selectAllCategoryWithParentId(categoryUtils.getTableByName(tblName),id);
    }

    @Override
    public List<CategoryVO> selectAllCategoryWithParentId(TableVO table, int id) {
        return this.categoryService.selectAllCategoryWithParentId(table, id);
    }

    @Override
    public List<CategoryVO> selectAllCategoryWithParentColumn(String tblName, String column, String value,String tblParent) {
        return this.selectAllCategoryWithParentColumn(categoryUtils.getTableByName(tblName),column,value,tblParent);
    }

    @Override
    public List<CategoryVO> selectAllCategoryWithParentColumn(TableVO table, String column, String value,String tblParent) {
        return this.categoryService.selectAllCategoryWithParentColumn(table, column, value,tblParent);
    }

    @Override
    public CategoryVO selectCategory(String tblName,Map<String,HashMap<String,String>> condition) {
        return this.categoryService.selectCategory(categoryUtils.getTableByName(tblName),condition);
    }

    @Override
    public CategoryVO selectCategory(TableVO table,Map<String,HashMap<String,String>> condition) {
        return this.categoryService.selectCategory(table,condition);
    }

    @Override
    public void insertCategory(TableVO table) {
        this.categoryService.insertCategory(table);
    }


    @Override
    public void updateCategory(TableVO table) {
        this.categoryService.updateCategory(table);
    }

    @Override
    public void deleteCategory(int value, String colId, String tblName) {
        this.categoryService.deleteCategory(value, colId, tblName);
    }

}
