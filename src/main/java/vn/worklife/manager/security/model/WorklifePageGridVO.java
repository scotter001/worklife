package vn.worklife.manager.security.model;

import java.util.List;

public class WorklifePageGridVO {
    private String columnName;
    private String TypeOrder;
    private int firstIndex;
    private int recordCountPerPage;
    private String search;
    
    //using for excel searching
    private List<String> listColumnName;
    private String mainColumn;
    private String mainColumnOrder;
    private String subColumnOrder;

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getTypeOrder() {
        return TypeOrder;
    }

    public void setTypeOrder(String typeOrder) {
        TypeOrder = typeOrder;
    }

    public int getFirstIndex() {
        return firstIndex;
    }

    public void setFirstIndex(int firstIndex) {
        this.firstIndex = firstIndex;
    }

    public int getRecordCountPerPage() {
        return recordCountPerPage;
    }

    public void setRecordCountPerPage(int recordCountPerPage) {
        this.recordCountPerPage = recordCountPerPage;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

	public List<String> getListColumnName() {
		return listColumnName;
	}

	public void setListColumnName(List<String> listColumnName) {
		this.listColumnName = listColumnName;
	}

	public String getMainColumnOrder() {
		return mainColumnOrder;
	}

	public void setMainColumnOrder(String mainColumnOrder) {
		this.mainColumnOrder = mainColumnOrder;
	}

	public String getSubColumnOrder() {
		return subColumnOrder;
	}

	public void setSubColumnOrder(String subColumnOrder) {
		this.subColumnOrder = subColumnOrder;
	}

	public String getMainColumn() {
		return mainColumn;
	}

	public void setMainColumn(String mainColumn) {
		this.mainColumn = mainColumn;
	}
}
