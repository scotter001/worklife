/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.category.web;

import org.springframework.stereotype.Service;
import vn.worklife.manager.category.model.FieldVO;
import vn.worklife.manager.category.model.TableVO;

import java.util.HashMap;
import java.util.List;
import java.util.function.Predicate;
@Service
public class CategoryUtils {
    private List<TableVO> lstCal = ConfigurationCategory.getCategoryTbl();

    public TableVO getTable(String urlContext){
        Predicate<TableVO> tblPredicate = p->p.getUrl().equals(urlContext);
        return lstCal.stream().filter(tblPredicate).findFirst().orElse(null);
    }
    public TableVO getTableByName(String tblName){
        Predicate<TableVO> tblPredicate = p->p.getName().equals(tblName);
        return lstCal.stream().filter(tblPredicate).findFirst().orElse(null);
    }
    public String getDatabaseTblName(String urlContext){
        return  getTable(urlContext).getName();
    }
    String getColId(List<FieldVO> list){
        for (FieldVO field: list) {
            if(field.getProperty().equals("id")){
                return field.getColumn();
            }
        }
        return "";
    }
    public HashMap<String,String> addCondition(String type, String value){
        HashMap<String,String> condition = new HashMap<>();
        condition.put("value",value);
        condition.put("type",type);
        return condition;
    }
}
