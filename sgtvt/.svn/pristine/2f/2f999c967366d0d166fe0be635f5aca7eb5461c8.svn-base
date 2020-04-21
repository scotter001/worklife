package vn.worklife.manager.security.service.impl;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vn.worklife.manager.security.model.WorklifePermissionGroupVO;
import vn.worklife.manager.security.model.WorklifeRoleGroupVO;
import vn.worklife.manager.security.model.WorklifeRoleUserVO;
import vn.worklife.manager.security.model.WorklifeRoleVO;
import vn.worklife.manager.security.service.WorklifeRoleService;

@Service("WorklifeRoleServiceImpl")
public class WorklifeRoleServiceImpl {
    @Autowired
    private WorklifeRoleService worklifeRoleService;
    
    @Transactional
	public void insertRole(WorklifeRoleVO worklifeRoleVO) {
		worklifeRoleService.insertRole(worklifeRoleVO);
	}

    @Transactional
	public void insertRoleUser(WorklifeRoleUserVO worklifeRoleUserVO) {
		worklifeRoleService.insertRoleUser(worklifeRoleUserVO);
	}
    
    @Transactional
	public void updateRole(WorklifeRoleVO worklifeRoleVO) {
		worklifeRoleService.updateRole(worklifeRoleVO);
	}

    @Transactional
	public void deleteSingleRoleByRoleId(int roleId) {
		worklifeRoleService.deleteSingleRoleByRoleId(roleId);
	}

    @Transactional
	public void deleteRoleUserByUserId(int userId) {
		worklifeRoleService.deleteRoleUserByUserId(userId);
	}

    @Transactional
	public void deleteRoleUserByRoleId(int roleId) {
		worklifeRoleService.deleteRoleUserByRoleId(roleId);
	}

    @Transactional
	public void deleteRoleUser(WorklifeRoleUserVO worklifeRoleUserVO) {
		worklifeRoleService.deleteRoleUser(worklifeRoleUserVO);
	}

    @Transactional
	public void deleteRoleGroupByRoleId(int roleId) {
		worklifeRoleService.deleteRoleGroupByRoleId(roleId);
	}

    @Transactional
	public void deleteRoleGroupByGroupId(int groupId) {
		worklifeRoleService.deleteRoleGroupByGroupId(groupId);
	}

    @Transactional
	public void deleteRoleGroupByGroupIdAndPermissionId(WorklifePermissionGroupVO worklifePermissionGroupVO) {
		worklifeRoleService.deleteRoleGroupByGroupIdAndPermissionId(worklifePermissionGroupVO);
	}
    
    @Transactional
    public void deleteRoleGroupByPermissionId(int permissionId) {
    	worklifeRoleService.deleteRoleGroupByPermissionId(permissionId);
    }
    
    @Transactional
    public void intertNewPermission4Role(WorklifeRoleGroupVO worklifeRoleGroupVO) {
    	worklifeRoleService.intertNewPermission4Role(worklifeRoleGroupVO);
    }

    @Transactional
	public void deleteRoleByGroupId(int groupId) {
		worklifeRoleService.deleteRoleByGroupId(groupId);
	}
	
	public ArrayList<WorklifeRoleVO> selectListRoleByGroupId(WorklifeRoleVO worklifeRoleVO) {
		return worklifeRoleService.selectListRoleByGroupId(worklifeRoleVO);
	}
	
	public ArrayList<WorklifeRoleVO> selectAllRoleByGroupId(Map<String, Object> map) {
		return worklifeRoleService.selectAllRoleByGroupId(map);
	}
	
	public int countListRoleByGroupId(WorklifeRoleVO worklifeRoleVO) {
		return worklifeRoleService.countListRoleByGroupId(worklifeRoleVO);
	}
	
	public int checkRoleUsedOrNotUsed(int roleId){
		return worklifeRoleService.checkRoleUsedOrNotUsed(roleId);
	}
	
	public ArrayList<WorklifeRoleVO> selectRoleByUserId(int userId) {
		return worklifeRoleService.selectRoleByUserId(userId);
	}
	
	public WorklifeRoleVO selectRoleByRoleId(int roleId) {
		return worklifeRoleService.selectRoleByRoleId(roleId);
	}
    
    public String selectListRoleNameByUserId(int userId) {
    	return worklifeRoleService.selectListRoleNameByUserId(userId);
    }
    
    public WorklifeRoleVO checkRoleExsit(WorklifeRoleVO worklifeRoleVO) {
    	return worklifeRoleService.checkRoleExsit(worklifeRoleVO);
    }
}
