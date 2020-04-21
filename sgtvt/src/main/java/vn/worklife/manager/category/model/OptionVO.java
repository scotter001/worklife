/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.manager.category.model;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;

@XmlAccessorType(XmlAccessType.FIELD)
public class OptionVO {
    @XmlAttribute
    private int value;
    @XmlValue
    private String text;

    public OptionVO(int value, String text) {
        this.value = value;
        this.text = text;
    }

    public OptionVO() {

    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }


}
