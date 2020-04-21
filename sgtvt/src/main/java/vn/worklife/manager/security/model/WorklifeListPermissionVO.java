package vn.worklife.manager.security.model;

import org.apache.ibatis.type.Alias;

import java.io.Serializable;

@Alias("WorklifeListPermissionVO")
public class WorklifeListPermissionVO implements Serializable {
    private static final long serialVersionUID = -5841487034910076829L;

    private String listPermissionName;
    private int listPermissionNo;

    public WorklifeListPermissionVO() {
        super();
        this.listPermissionName = "";
        this.listPermissionNo = 0;
    }

    public WorklifeListPermissionVO(String listPermissionName, int listPermissionNo) {
        super();
        this.listPermissionName = listPermissionName;
        this.listPermissionNo = listPermissionNo;
    }

    public int getListPermissionNo() {
        return listPermissionNo;
    }

    public void setListPermissionNo(int listPermissionNo) {
        this.listPermissionNo = listPermissionNo;
    }

    public String getListPermissionName() {
        return listPermissionName;
    }

    public void setListPermissionName(String listPermissionName) {
        this.listPermissionName = listPermissionName;
    }
}
