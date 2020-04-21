package vn.worklife.manager.security.model;

import vn.worklife.manager.group.model.WorklifeGroupVO;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.ArrayList;

@Alias("WorklifePermissionGroupVO")
public class WorklifePermissionGroupVO extends WorklifePageGridVO implements Serializable {
    private static final long serialVersionUID = 32264855062160090L;

    private int groupId;
    private int permissionId;

    private WorklifeGroupVO worklifeGroup;
    private ArrayList<WorklifePermissionVO> arrWorklifePermission;
    private String listPermissionOfGroup;
    private String listPermissionName;
    private int listPermissionNo;
    //using for checking this permission has registered for group or not
    private String permissionStatus;
    
    private Integer idGroupUserLogin;
    private Integer idGroupSuperAdmin;

    public WorklifePermissionGroupVO() {
        groupId = -1;
        permissionId = -1;
        permissionStatus = "N";
    }

    public WorklifePermissionGroupVO(int groupId, int permissionId) {
        super();
        this.groupId = groupId;
        this.permissionId = permissionId;
        this.permissionStatus = "N";
    }

    public Integer getIdGroupUserLogin() {
		return idGroupUserLogin;
	}

	public void setIdGroupUserLogin(Integer idGroupUserLogin) {
		this.idGroupUserLogin = idGroupUserLogin;
	}

	public Integer getIdGroupSuperAdmin() {
		return idGroupSuperAdmin;
	}

	public void setIdGroupSuperAdmin(Integer idGroupSuperAdmin) {
		this.idGroupSuperAdmin = idGroupSuperAdmin;
	}

	public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public int getPermissionId() {
        return permissionId;
    }

    public void setPermissionId(int permissionId) {
        this.permissionId = permissionId;
    }

    public WorklifeGroupVO getWorklifeGroup() {
        return worklifeGroup;
    }

    public void setWorklifeGroup(WorklifeGroupVO worklifeGroup) {
        this.worklifeGroup = worklifeGroup;
    }

    public ArrayList<WorklifePermissionVO> getArrWorklifePermission() {
        return arrWorklifePermission;
    }

    public void setArrWorklifePermission(ArrayList<WorklifePermissionVO> arrWorklifePermission) {
        this.arrWorklifePermission = arrWorklifePermission;
    }

    public String getListPermissionOfGroup() {
        return listPermissionOfGroup;
    }

    public void setListPermissionOfGroup(String listPermissionOfGroup) {
        this.listPermissionOfGroup = listPermissionOfGroup;
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
