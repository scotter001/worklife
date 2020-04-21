/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.basicinformation.model.datatable;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.List;

public class DatatableRequestCriteriasVO {
    /**
     * Draw counter. This is used by DataTables to ensure that the Ajax returns from server-side processing requests are drawn in sequence by DataTables
     * (Ajax requests are asynchronous and thus can return out of sequence). This is used as part of the draw return parameter (see below).
     */
    private int draw;

    /**
     * Paging first record indicator. This is the start point in the current data set (0 index based - i.e. 0 is the first record).
     */
    private int start;

    /**
     * Number of records that the table can display in the current draw. It is expected that the number of records returned will be equal to this number, unless
     * the server has fewer records to return. Note that this can be -1 to indicate that all records should be returned (although that negates any benefits of
     * server-side processing!)
     */
    private int length;

    /**
     * @see SearchVO
     */
    private SearchVO search;

    /**
     * @see OrderVO
     */
    @JsonProperty("order")
    private List<OrderVO> orders;

    /**
     * @see ColumnVO
     */
    private List<ColumnVO> columns;

    /**
     * Optional string could retrieve from there
     */

    /**
     * List Object Data Custom C. Danh
     */

    private List<Object> custom;

    private HashMap<String,String> optional;

    public List<Object> getCustom() {
        return custom;
    }

    public void setCustom(List<Object> custom) {
        this.custom = custom;
    }

    public int getDraw() {
        return draw;
    }

    public void setDraw(int draw) {
        this.draw = draw;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public SearchVO getSearch() {
        return search;
    }

    public void setSearch(SearchVO search) {
        this.search = search;
    }

    public List<OrderVO> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderVO> orders) {
        this.orders = orders;
    }

    public List<ColumnVO> getColumns() {
        return columns;
    }

    public void setColumns(List<ColumnVO> columns) {
        this.columns = columns;
    }

    public HashMap<String, String> getOptional() {
        return optional;
    }

    public void setOptional(HashMap<String, String> optional) {
        this.optional = optional;
    }
}