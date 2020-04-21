package vn.worklife.manager.security.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

import org.apache.ibatis.type.Alias;

import vn.worklife.manager.group.model.WorklifeGroupVO;

@Alias("WorklifeRoleVO")
public class WorklifeRoleVO extends WorklifePageGridVO implements Serializable {
	private static final long serialVersionUID = 1041357118201803124L;
	private int roleId;
	private int groupId;
	private WorklifeGroupVO group;
	private String roleName;
	private String roleCode;
	private String roleDescription;
	private Date createAt;
	private Date updateAt;
	
	private String roleStatus;
	
	private ArrayList<WorklifePermissionVO> listPermission;
	
	//Only using in manager role group
	private Integer idSuperAdminGroup;
	private Integer idGroupUserLogin;
	
	public Integer getIdSuperAdminGroup() {
		return idSuperAdminGroup;
	}

	public void setIdSuperAdminGroup(Integer idSuperAdminGroup) {
		this.idSuperAdminGroup = idSuperAdminGroup;
	}

	public Integer getIdGroupUserLogin() {
		return idGroupUserLogin;
	}

	public void setIdGroupUserLogin(Integer idGroupUserLogin) {
		this.idGroupUserLogin = idGroupUserLogin;
	}

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public int getGroupId() {
		return groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleCode() {
		return roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode.toUpperCase();
	}

	public String getRoleDescription() {
		return roleDescription;
	}

	public void setRoleDescription(String roleDescription) {
		this.roleDescription = roleDescription;
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

	public ArrayList<WorklifePermissionVO> getListPermission() {
		return listPermission;
	}

	public void setListPermission(ArrayList<WorklifePermissionVO> listPermission) {
		this.listPermission = listPermission;
	}

	public WorklifeGroupVO getGroup() {
		return group;
	}

	public void setGroup(WorklifeGroupVO group) {
		this.group = group;
	}

	public String getRoleStatus() {
		return roleStatus;
	}

	public void setRoleStatus(String roleStatus) {
		this.roleStatus = roleStatus;
	}
}
