package vn.worklife.manager.security.service.impl;

import vn.worklife.manager.security.model.WorklifePermissionVO;
import vn.worklife.manager.security.model.WorklifePermissionGroupVO;
import vn.worklife.manager.security.model.WorklifeRoleUserVO;
import vn.worklife.manager.security.service.WorklifePermissionGroupService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service("WorklifePermissionGroupServiceImpl")
public class WorklifePermissionGroupServiceImpl {
    @Autowired
    private WorklifePermissionGroupService worklifePermissionGroupService;

    @Transactional
    public void insertPermissionGroup(WorklifePermissionGroupVO worklifePermissionGroupVO) {
        worklifePermissionGroupService.insertPermissionGroup(worklifePermissionGroupVO);
    }

    @Transactional
    public void deleteSinglePermissionGroup(WorklifePermissionGroupVO worklifePermissionGroupVO) {
        worklifePermissionGroupService.deleteSinglePermissionGroup(worklifePermissionGroupVO);
    }

    @Transactional
    public void deleteSinglePermissionGroupByPermissionId(int permissionId) {
        worklifePermissionGroupService.deleteSinglePermissionGroupByPermissionId(permissionId);
    }

    @Transactional
    public void deleteSinglePermissionGroupByGroupId(int groupId) {
        worklifePermissionGroupService.deleteSinglePermissionGroupByGroupId(groupId);
    }

    public WorklifePermissionGroupVO selectSinglePermissionGroup(WorklifePermissionGroupVO worklifePermissionGroupVO) {
        return worklifePermissionGroupService.selectSinglePermissionGroup(worklifePermissionGroupVO);
    }
    
    public ArrayList<WorklifePermissionGroupVO> selectListPermissionGroup(WorklifePermissionGroupVO worklifePermissionGroupVO) {
        return worklifePermissionGroupService.selectListPermissionGroup(worklifePermissionGroupVO);
    }
    
    public ArrayList<Integer> selectListPermissionIdByGroupId(int groupId) {
    	return worklifePermissionGroupService.selectListPermissionIdByGroupId(groupId);
    }
    
    public ArrayList<Integer> selectListSystemPermissionIdByGroupId(int groupId) {
    	return worklifePermissionGroupService.selectListSystemPermissionIdByGroupId(groupId);
    }

    public ArrayList<WorklifePermissionVO> selectPermissionForSecurity() {
        return worklifePermissionGroupService.selectPermissionForSecurity();
    }

    public ArrayList<WorklifePermissionVO> selectPermissionForFilterByUrl(String url) {
        return worklifePermissionGroupService.selectPermissionForFilterByUrl(url);
    }

    public ArrayList<WorklifePermissionVO> selectPermissionForFilter(WorklifeRoleUserVO worklifeRoleUserVO) {
        return worklifePermissionGroupService.selectPermissionForFilter(worklifeRoleUserVO);
    }
    
    public int countListPermissionGroup(WorklifePermissionGroupVO worklifePermissionGroupVO) {
    	return worklifePermissionGroupService.countListPermissionGroup(worklifePermissionGroupVO);
    }
}
