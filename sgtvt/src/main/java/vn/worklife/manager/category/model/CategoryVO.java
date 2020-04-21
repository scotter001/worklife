/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.category.model;

import org.apache.ibatis.type.Alias;

@Alias("CategoryVO")
public class CategoryVO {
    private int id;
    private String code;
    private String name;
    private String extendCol1;
    private String extendCol2;
    private String extendCol3;
    private String extendCol4;
    private String extendCol5;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExtendCol1() {
        return extendCol1;
    }

    public void setExtendCol1(String extendCol1) {
        this.extendCol1 = extendCol1;
    }

    public String getExtendCol2() {
        return extendCol2;
    }

    public void setExtendCol2(String extendCol2) {
        this.extendCol2 = extendCol2;
    }

    public String getExtendCol3() {
        return extendCol3;
    }

    public void setExtendCol3(String extendCol3) {
        this.extendCol3 = extendCol3;
    }

    public String getExtendCol4() {
        return extendCol4;
    }

    public void setExtendCol4(String extendCol4) {
        this.extendCol4 = extendCol4;
    }

    public String getExtendCol5() {
        return extendCol5;
    }

    public void setExtendCol5(String extendCol5) {
        this.extendCol5 = extendCol5;
    }
}
