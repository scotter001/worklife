package vn.worklife.manager.security.model;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

import vn.worklife.manager.user.model.WorklifeUserVO;

@Alias("WorklifeRoleUserVO")
public class WorklifeRoleUserVO implements Serializable {
	private static final long serialVersionUID = 3416591863008116616L;
	private int userId;
	private int roleId;
	
	private String pattern;
	private String userName;
	
	private WorklifeUserVO user;
	private WorklifeRoleVO role;
	
	public int getUserId() {
		return userId;
	}
	
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	public int getRoleId() {
		return roleId;
	}
	
	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public WorklifeUserVO getUser() {
		return user;
	}

	public void setUser(WorklifeUserVO user) {
		this.user = user;
	}

	public WorklifeRoleVO getRole() {
		return role;
	}

	public void setRole(WorklifeRoleVO role) {
		this.role = role;
	}

	public String getPattern() {
		return pattern;
	}

	public void setPattern(String pattern) {
		this.pattern = pattern;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
}
