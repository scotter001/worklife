package vn.worklife.manager.security.service.impl;

import vn.worklife.manager.security.model.WorklifeListPermissionVO;
import vn.worklife.manager.security.model.WorklifePermissionVO;
import vn.worklife.manager.security.model.WorklifeRoleGroupVO;
import vn.worklife.manager.security.service.WorklifePermissionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("WorklifePermissionServiceImpl")
public class WorklifePermissionServiceImpl implements WorklifePermissionService{
    @Autowired
    private WorklifePermissionService worklifePermissionService;

    @Transactional
    public void insertPermission(WorklifePermissionVO worklifePermissionVO) {
        worklifePermissionService.insertPermission(worklifePermissionVO);
    }

    @Transactional
    public void updatePermission(WorklifePermissionVO worklifePermissionVO) {
        worklifePermissionService.updatePermission(worklifePermissionVO);
    }

    @Transactional
    public void deleteSinglePermissionByPermissionId(WorklifePermissionVO worklifePermissionVO) {
        worklifePermissionService.deleteSinglePermissionByPermissionId(worklifePermissionVO);
    }

    public WorklifePermissionVO selectPermissionByPermissionId(WorklifePermissionVO worklifePermissionVO) {
        return worklifePermissionService.selectPermissionByPermissionId(worklifePermissionVO);
    }

    public ArrayList<WorklifeListPermissionVO> selectListPermissionGroupName() {
        return worklifePermissionService.selectListPermissionGroupName();
    }
    
    //Select list permissions of group for register group's role
    public ArrayList<WorklifePermissionVO> selectListPermissionForRole(WorklifeRoleGroupVO worklifeRoleGroupVO) {
        return worklifePermissionService.selectListPermissionForRole(worklifeRoleGroupVO);
    }

    //Select list permissions for register group's permissions
    public ArrayList<WorklifePermissionVO> selectListPermissionForRegister(int groupId) {
        return worklifePermissionService.selectListPermissionForRegister(groupId);
    }
    
    public ArrayList<WorklifePermissionVO> selectMutiPermissionSystem(){
    	return worklifePermissionService.selectMutiPermissionSystem();
    }
    
    public ArrayList<WorklifePermissionVO> selectMultiPermissionByListPermissionId(ArrayList<Integer> listPermissionId) {
        return worklifePermissionService.selectMultiPermissionByListPermissionId(listPermissionId);
    }

    public ArrayList<WorklifePermissionVO> selectMultiPermissionByGroupId(int groupId) {
        return worklifePermissionService.selectMultiPermissionByGroupId(groupId);
    }

    public ArrayList<WorklifePermissionVO> selectMultiPermission(WorklifePermissionVO worklifePermissionVO) {
        return worklifePermissionService.selectMultiPermission(worklifePermissionVO);
    }
    
    public ArrayList<WorklifePermissionVO> selectListPermissionByRoleId(int roleId) {
    	return worklifePermissionService.selectListPermissionByRoleId(roleId);
    }
    
    public int countMultiPermission(WorklifePermissionVO worklifePermissionVO) {
    	return worklifePermissionService.countMultiPermission(worklifePermissionVO);
    }
    
    public List<WorklifePermissionVO> selectPermissionNo() {
    	return worklifePermissionService.selectPermissionNo();
    }
    
    public ArrayList<WorklifePermissionVO> selectAllPermission(){
		return worklifePermissionService.selectAllPermission();
    	
    }
}
