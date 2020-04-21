package vn.worklife.manager.security.model;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

@Alias("WorklifeRoleGroupVO")
public class WorklifeRoleGroupVO implements Serializable {
	private static final long serialVersionUID = 2669235376337527663L;
	private int groupId;
	private int permissionId;
	private int roleId;
	
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
	
	public int getRoleId() {
		return roleId;
	}
	
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}
}
