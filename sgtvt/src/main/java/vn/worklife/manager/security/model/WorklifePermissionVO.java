package vn.worklife.manager.security.model;

import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.Date;

@Alias("WorklifePermissionVO")
public class WorklifePermissionVO extends WorklifePageGridVO implements Serializable {
    private static final long serialVersionUID = -2826031664749953170L;

    private int permissionId;
    private String permissionName;
    private String permissionPattern;
    private String permissionDescription;
    private String listPermissionName;
    private int listPermissionNo;
    private Date createAt;
    private Date updateAt;

    //using for checking this permission has registered for group or not
    private String permissionStatus;

    public WorklifePermissionVO() {
        permissionId = -1;
        permissionName = "";
        permissionPattern = "";
        permissionDescription = "";
        permissionStatus = "N";
    }

    public WorklifePermissionVO(int permissionId, String permissionName, String permissionPattern, String permissionDescription, Date createAt, Date updateAt) {
        super();
        this.permissionId = permissionId;
        this.permissionName = permissionName;
        this.permissionPattern = permissionPattern;
        this.permissionDescription = permissionDescription;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.permissionStatus = "N";
    }

    public int getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(int permissionId) {
        this.permissionId = permissionId;
    }

    public String getPermissionName() {
        return permissionName;
    }

    public void setPermissionName(String permissionName) {
        this.permissionName = permissionName;
    }

    public String getPermissionPattern() {
        return permissionPattern;
    }

    public void setPermissionPattern(String permissionPattern) {
        this.permissionPattern = permissionPattern;
    }

    public String getPermissionDescription() {
        return permissionDescription;
    }

    public void setPermissionDescription(String permissionDescription) {
        this.permissionDescription = permissionDescription;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public String getListPermissionName() {
        return listPermissionName;
    }

    public void setListPermissionName(String listPermissionName) {
        this.listPermissionName = listPermissionName;
    }

    public int getListPermissionNo() {
        return listPermissionNo;
    }

    public void setListPermissionNo(int listPermissionNo) {
        this.listPermissionNo = listPermissionNo;
    }

    public String getPermissionStatus() {
        return permissionStatus;
    }

    public void setPermissionStatus(String permissionStatus) {
        this.permissionStatus = permissionStatus;
    }
}
