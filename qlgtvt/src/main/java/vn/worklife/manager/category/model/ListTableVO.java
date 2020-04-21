/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.category.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name="category")
@XmlAccessorType(XmlAccessType.FIELD)
public class ListTableVO {
    private List<TableVO> table;

    public List<TableVO> getTable() {
        return table;
    }

    public void setTable(List<TableVO> table) {
        this.table = table;
    }
}
