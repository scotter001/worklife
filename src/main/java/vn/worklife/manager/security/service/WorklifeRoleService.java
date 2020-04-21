package vn.worklife.manager.security.service;

import java.util.ArrayList;
import java.util.Map;

import vn.worklife.manager.security.model.WorklifePermissionGroupVO;
import vn.worklife.manager.security.model.WorklifeRoleGroupVO;
import vn.worklife.manager.security.model.WorklifeRoleUserVO;
import vn.worklife.manager.security.model.WorklifeRoleVO;

public interface WorklifeRoleService {
	void insertRole(WorklifeRoleVO worklifeRoleVO);

	void insertRoleUser(WorklifeRoleUserVO worklifeRoleUserVO);

	void updateRole(WorklifeRoleVO worklifeRoleVO);
	
	void deleteSingleRoleByRoleId(int roleId);

	void deleteRoleUserByUserId(int userId);

	void deleteRoleUserByRoleId(int roleId);

	void deleteRoleUser(WorklifeRoleUserVO worklifeRoleUserVO);

	void deleteRoleByGroupId(int groupId);

	void deleteRoleGroupByRoleId(int roleId);

	void deleteRoleGroupByGroupId(int groupId);

	void deleteRoleGroupByPermissionId(int permissionId);

	void intertNewPermission4Role(WorklifeRoleGroupVO worklifeRoleGroupVO);

	void deleteRoleGroupByGroupIdAndPermissionId(WorklifePermissionGroupVO worklifePermissionGroupVO);

	ArrayList<WorklifeRoleVO> selectListRoleByGroupId(WorklifeRoleVO worklifeRoleVO);

	ArrayList<WorklifeRoleVO> selectAllRoleByGroupId(Map<String, Object> map);

	int countListRoleByGroupId(WorklifeRoleVO worklifeRoleVO);

	int checkRoleUsedOrNotUsed(int roleId);

	ArrayList<WorklifeRoleVO> selectRoleByUserId(int userId);

	WorklifeRoleVO selectRoleByRoleId(int roleId);

	String selectListRoleNameByUserId(int userId);
	
	WorklifeRoleVO checkRoleExsit(WorklifeRoleVO worklifeRoleVO);
}
