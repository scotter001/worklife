package vn.worklife.manager.security.model;

import java.io.Serializable;
import java.util.List;

public class WorklifeJsonVO implements Serializable {
    private static final long serialVersionUID = 3240462664816863518L;

    private int draw = 0;

    private int recordsTotal = 0;

    private int recordsFiltered = 0;


    private List<Object> data;

    public WorklifeJsonVO() {
        this.draw = 0;
        this.recordsTotal = 0;
        this.recordsFiltered = 0;
        this.data = null;
    }

    public WorklifeJsonVO(int draw, int recordsTotal, int recordsFiltered, List<Object> data) {
        super();
        this.draw = draw;
        this.recordsTotal = recordsTotal;
        this.recordsFiltered = recordsFiltered;
        this.data = data;
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

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
        this.data = data;
    }

    public int getRecordsFiltered() {
        return recordsFiltered;
    }

    public void setRecordsFiltered(int recordsFiltered) {
        this.recordsFiltered = recordsFiltered;
    }
}
