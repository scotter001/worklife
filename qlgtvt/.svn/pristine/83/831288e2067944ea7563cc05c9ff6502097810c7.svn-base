/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.basicinformation.model.datatable;

public class ColumnVO {
    /**
     * Column's data source, as defined by columns.data.
     */
    private String data;

    /**
     * Column's name, as defined by columns.name.
     */
    private String name;

    /**
     * Flag to indicate if this column is searchable (true) or not (false). This is controlled by columns.searchable.
     */
    private boolean searchable;


    /**
     * Flag to indicate if this column is orderable (true) or not (false). This is controlled by columns.orderable.
     */
    private boolean orderable;

    /**
     * Search value to apply to this specific column.
     */
    private SearchVO search;

    /**
     * Flag to indicate if the search term for this column should be treated as regular expression (true) or not (false). As with global search, normally
     * server-side processing scripts will not perform regular expression searching for performance reasons on large data sets, but it is technically possible
     * and at the discretion of your script.
     */
    private boolean regex;

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isSearchable() {
        return searchable;
    }

    public void setSearchable(boolean searchable) {
        this.searchable = searchable;
    }

    public boolean isOrderable() {
        return orderable;
    }

    public void setOrderable(boolean orderable) {
        this.orderable = orderable;
    }

    public SearchVO getSearch() {
        return search;
    }

    public void setSearch(SearchVO search) {
        this.search = search;
    }

    public boolean isRegex() {
        return regex;
    }

    public void setRegex(boolean regex) {
        this.regex = regex;
    }
}
