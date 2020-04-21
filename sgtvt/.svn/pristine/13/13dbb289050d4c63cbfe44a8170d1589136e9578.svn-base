package vn.worklife.manager.security.model;

import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.Date;

@Alias("WorklifeRoleHierarchyVO")
public class WorklifeRoleHierarchyVO implements Serializable {
    private static final long serialVersionUID = 3806599171045444210L;

    private int parentRoleInfoId;
    private int childrenRoleInfoId;
    private Date createAt;
    private Date updateAt;

    public WorklifeRoleHierarchyVO() {
        parentRoleInfoId = -1;
        childrenRoleInfoId = -1;
    }

    public WorklifeRoleHierarchyVO(int parentRoleInfoId, int childrenRoleInfoId, Date createAt, Date updateAt) {
        super();
        this.parentRoleInfoId = parentRoleInfoId;
        this.childrenRoleInfoId = childrenRoleInfoId;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }

    public int getParentRoleInfoId() {
        return parentRoleInfoId;
    }

    public void setParentRoleInfoId(int parentRoleInfoId) {
        this.parentRoleInfoId = parentRoleInfoId;
    }

    public int getChildrenRoleInfoId() {
        return childrenRoleInfoId;
    }

    public void setChildrenRoleInfoId(int childrenRoleInfoId) {
        this.childrenRoleInfoId = childrenRoleInfoId;
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
}
