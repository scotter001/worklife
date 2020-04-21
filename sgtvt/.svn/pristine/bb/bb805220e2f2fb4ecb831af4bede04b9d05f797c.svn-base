/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.category.model;

import org.apache.ibatis.type.Alias;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import java.util.List;

@Alias("TableVO")
@XmlAccessorType(XmlAccessType.FIELD)
public class TableVO {
    private String name;
    private String title;
    private String url;
    @XmlElementWrapper(name="fields")
    @XmlElement(name="field")
    private List<FieldVO> fields;

    public List<FieldVO> getFields() {
        return fields;
    }

    public void setFields(List<FieldVO> fields) {
        this.fields = fields;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
