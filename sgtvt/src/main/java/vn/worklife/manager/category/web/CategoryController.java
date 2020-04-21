/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.category.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.annotations.Param;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import vn.worklife.basicinformation.model.datatable.DatatableJSonVO;
import vn.worklife.manager.category.model.*;
import vn.worklife.manager.category.service.impl.CategoryServiceImpl;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CategoryController {
    private Logger logger = Logger.getLogger(this.getClass());

    @Resource(name = "transactionManager")
    private PlatformTransactionManager transactionManager;

    @Resource(name = "CategoryServiceImpl")
    private CategoryServiceImpl categoryServiceImpl;

    @Autowired
    CategoryUtils categoryUtils;

    @RequestMapping(value = "/worklife/manager/category/list/get.do", method = RequestMethod.POST)
    public @ResponseBody
    List<TableVO> getCategory() {
        return ConfigurationCategory.getCategoryTbl();
    }

    @RequestMapping(value = "/worklife/manager/category/{urlContext}/form.do", method = RequestMethod.GET)
    public String showCategory(@PathVariable String urlContext, Model model) {
        TableVO tbl = categoryUtils.getTable(urlContext);
        for (FieldVO field: tbl.getFields()) {
            if(field.getDdefault() != null && field.getDdefault().equals("association")){
                List<OptionVO> opts = new ArrayList<>();
                for (ConditionVO condition: field.getConditions()) {
                    if(condition.getType().equals("table")){
                        ObjectMapper m;
                        List<CategoryVO> data = this.categoryServiceImpl.selectAllCategory(condition.getName());
                        TableVO joinTbl = categoryUtils.getTableByName(condition.getName());
                        String valuePropety= "";
                        String textProperty ="";
                        for (FieldVO fieldJoin:  joinTbl.getFields()) {
                            if(fieldJoin.getColumn().equals(condition.getValue())){
                                valuePropety = fieldJoin.getProperty();
                            }
                            if(fieldJoin.getColumn().equals(condition.getText())){
                                textProperty = fieldJoin.getProperty();
                            }
                        }
                        for (CategoryVO cat:data) {
                            m = new ObjectMapper();
                            Map props = m.convertValue(cat, Map.class);
                            OptionVO opt = new OptionVO(Integer.parseInt(props.get(valuePropety).toString()),props.get(textProperty).toString());
                            opts.add(opt);
                        }
                    }
                }
                field.setOptions(opts);
            }
        }
        model.addAttribute("category", tbl);
        return "worklife/admin/category/manager_category";
    }

    @RequestMapping(value = "/worklife/manager/category/{url}/delete.do", method = RequestMethod.POST)
    public @ResponseBody
    boolean deleteCategory(@PathVariable("url") String url, @RequestBody int[] lstId) {
        TableVO table = this.categoryUtils.getTable(url);
        String tblName = table.getName();
        String colId = this.categoryUtils.getColId(table.getFields());
        for (int id : lstId) {
            try {
                this.categoryServiceImpl.deleteCategory(id, colId, tblName);
            } catch (Exception e) {
                logger.error(e.getMessage());
                return false;
            }
        }
        return true;
    }

    @RequestMapping(value = "/worklife/manager/category/{url}/save.do", method = RequestMethod.POST)
    public String saveCategoryVO(@PathVariable("url") String url, @ModelAttribute("CategoryVO") CategoryVO cal, RedirectAttributes rm) {
        /** TRANSACTION */
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {
            TableVO tbl = categoryUtils.getTable(url);
            ObjectMapper m = new ObjectMapper();
            Map props = m.convertValue(cal, Map.class);
            for (FieldVO field : tbl.getFields()) {
                field.setValue(props.get(field.getProperty()).toString());
            }
            if (cal.getId() == -1) {
                this.categoryServiceImpl.insertCategory(tbl);
            } else {
                this.categoryServiceImpl.updateCategory(tbl);
            }
            rm.addFlashAttribute("message", 1);
            transactionManager.commit(status);
        } catch (Exception e) {
            transactionManager.rollback(status);
            logger.error(e.getMessage());
            rm.addFlashAttribute("message", 3);
        }
        return "redirect:/worklife/manager/category/" + url + "/form.do";
    }
    @RequestMapping(value = "/worklife/manager/category/json/{url}/insert.do", method = RequestMethod.POST)
    public @ResponseBody String saveCategory(@PathVariable("url") String url, @RequestBody CategoryVO cal) {
        TableVO tbl = categoryUtils.getTable(url);
        /** TRANSACTION */
        DefaultTransactionDefinition td = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRED);
        td.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        TransactionStatus status = transactionManager.getTransaction(td);
        try {

            ObjectMapper m = new ObjectMapper();
            Map props = m.convertValue(cal, Map.class);
            for (FieldVO field : tbl.getFields()) {
                field.setValue(props.get(field.getProperty()).toString());
            }
            if (cal.getId() == -1) {
                this.categoryServiceImpl.insertCategory(tbl);
            }
            transactionManager.commit(status);
        } catch (Exception e) {
            transactionManager.rollback(status);
            logger.error(e.getMessage());
        }
        return tbl.getFields().get(0).getValue();
    }
    //get data

    @RequestMapping(value = "/worklife/manager/category/{url}/table/get.do", method = RequestMethod.POST, produces = "application/json; charset=UTF-8")
    public @ResponseBody
    String tblCategory(@PathVariable("url") String url) {
        String objectJS = null;
        TableVO tbl = new TableVO();
        tbl.setUrl(url);
        try {
            List<CategoryVO> categoryVOS = this.categoryServiceImpl.selectAllCategory(tbl);
            ObjectMapper mapJson = new ObjectMapper();
            DatatableJSonVO<CategoryVO> dataJSON = new DatatableJSonVO<>();
            dataJSON.setData(categoryVOS);
            objectJS = mapJson.writeValueAsString(dataJSON);
        } catch (Exception e) {
            logger.info(e.getMessage());
            logger.debug(e.getMessage());
            logger.error(e.getMessage());
        }
        return objectJS;
    }
    @RequestMapping(value = "/worklife/manager/category/get-list.do", method = RequestMethod.POST)
    public @ResponseBody List<CategoryVO> getdata(@RequestParam("tblName") String tblName){
        List<CategoryVO> list = new ArrayList<>();
        try {
            list = this.categoryServiceImpl.selectAllCategory(tblName);
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return list;
    }

    @RequestMapping(value = "/worklife/manager/category/get-with-parent/{type}/get-list.do", method = RequestMethod.POST)
    public @ResponseBody List<CategoryVO> getListWithValue(@PathVariable("type") String type,@RequestParam("tblName") String tblName,@RequestParam("value") String value,
                                                           @RequestParam(value="column",required = false) String column,
                                                           @RequestParam(value="tblParent",required = false) String tblParent){
        List<CategoryVO> list = new ArrayList<>();
        try {
            if(type.equals("id"))
                list = this.categoryServiceImpl.selectAllCategoryWithParentId(tblName,Integer.parseInt(value));
            if(type.equals("code"))
                list = this.categoryServiceImpl.selectAllCategoryWithParentCode(tblName, value);
            if(type.equals("column"))
                list = this.categoryServiceImpl.selectAllCategoryWithParentColumn(tblName,column,value,tblParent);
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return list;
    }

    @RequestMapping(value = "/worklife/manager/category/{type}/get.do", method = RequestMethod.POST)
    public @ResponseBody CategoryVO getData(@PathVariable("type") String type,@RequestParam("tblName") String tblName,@RequestParam("value") String value){
        CategoryVO cate = new CategoryVO();
        try {
            cate = this.categoryServiceImpl.selectCategory(tblName, new HashMap<String, HashMap<String,String>>() {{
                put("1",categoryUtils.addCondition(type,value));
            }});
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return cate;
    }

    @RequestMapping(value = "/worklife/manager/category/default/option/get.do", method = RequestMethod.POST)
    public @ResponseBody List<OptionVO> getData(@Param("tblName") String tblName,@Param("column") String column){
        List<OptionVO> list = new ArrayList<>();
        try {
            TableVO tbl = categoryUtils.getTableByName(tblName);
            for (FieldVO field: tbl.getFields()) {
                list = field.getOptions();
            }
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return list;
    }
}
