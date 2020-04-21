/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.category.model;

import org.apache.ibatis.type.Alias;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import java.util.List;

@Alias("PropertyVO")
@XmlAccessorType(XmlAccessType.FIELD)
public class FieldVO {
    @XmlAttribute
    private String column;
    @XmlAttribute
    private String type;
    @XmlAttribute
    private String property;
    @XmlAttribute
    private String title;
    @XmlAttribute
    private String size;
    @XmlAttribute
    private String ddefault;
    @XmlElement(name = "option")
    private List<OptionVO> options;
    @XmlElement(name= "condition")
    private List<ConditionVO> conditions;
    private String value;

    public List<ConditionVO> getConditions() {
        return conditions;
    }

    public void setConditions(List<ConditionVO> conditions) {
        this.conditions = conditions;
    }
    public void setDdefault(String ddefault) {
        this.ddefault = ddefault;
    }

    public String getDdefault() {
        return ddefault;
    }

    public String getColumn() {
        return column;
    }

    public void setColumn(String column) {
        this.column = column;
    }
    public List<OptionVO> getOptions() {
        return options;
    }

    public void setOptions(List<OptionVO> options) {
        this.options = options;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }
}
