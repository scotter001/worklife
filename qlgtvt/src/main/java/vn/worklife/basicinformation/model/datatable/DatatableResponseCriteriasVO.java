/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

package vn.worklife.basicinformation.model.datatable;

import com.google.common.collect.Lists;
import org.apache.log4j.Logger;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;

public class DatatableResponseCriteriasVO<T> {
    /**
     * The draw counter that this object is a response to - from the draw parameter sent as part of the data request. Note that it is strongly recommended for
     * security reasons that you cast this parameter to an integer, rather than simply echoing back to the client what it sent in the draw parameter, in order
     * to prevent Cross Site Scripting (XSS) attacks.
     */
    private int draw;

    /**
     * Total records, before filtering (i.e. the total number of records in the database)
     * <p/>
     * (NB: I changed this to long)
     */
    private int recordsTotal;

    /**
     * Total records, after filtering (i.e. the total number of records after filtering has been applied - not just the number of records being returned for this
     * page of data).
     * <p/>
     * (NB: I changed this to long)
     */
    private int recordsFiltered;
    /**
     * The data to be displayed in the table. This is an array of data source objects, one for each row, which will be used by DataTables. Note that this parameter's
     * name can be changed using the ajax option's dataSrc property.
     */
    private List<T> data = Lists.newArrayList();

    public DatatableResponseCriteriasVO(int draw,List<T> data) {
        this.draw = draw;
        if(data != null && data.size() >0 ){
            try {
                Field field = data.get(0).getClass().getDeclaredField("recordTotals");
                field.setAccessible(true);
                int size = (int)field.get(data.get(0));
                this.recordsTotal =  size;
                this.recordsFiltered =  size;
            } catch (NoSuchFieldException | IllegalAccessException e) {
                Logger logger = Logger.getLogger(this.getClass());
                logger.error(e.getMessage());
                this.recordsTotal = 0;
                this.recordsFiltered = 0;
            }
        }else{
            this.recordsTotal = 0;
            this.recordsFiltered = 0;
            data = Lists.newArrayList();
        }
        this.data = data;
    }
    public DatatableResponseCriteriasVO() {

    }
    public void setHashMap(int draw, List<HashMap<Object, Object>> data) {
        this.draw = draw;
        if(data != null && data.size() >0 ){
            try {
                this.recordsTotal =  Integer.parseInt(data.get(0).get("totalrecords").toString());
                this.recordsFiltered =   Integer.parseInt(data.get(0).get("totalrecords").toString());
            } catch (Exception e) {
                Logger logger = Logger.getLogger(this.getClass());
                logger.error(e.getMessage());
                this.recordsTotal = 0;
                this.recordsFiltered = 0;
            }
        }else{
            this.recordsTotal = 0;
            this.recordsFiltered = 0;
            data = Lists.newArrayList();
        }
        this.data = (List<T>) data;
    }


    public int getDraw() {
        return draw;
    }

    public void setDraw(int draw) {
        this.draw = draw;
    }

    public int getRecordsTotal() {
        return recordsTotal;
    }

    public void setRecordsTotal(int recordsTotal) {
        this.recordsTotal = recordsTotal;
    }

    public int getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(int recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}
