package vn.worklife.manager.security.service;

import vn.worklife.manager.security.model.WorklifeListPermissionVO;
import vn.worklife.manager.security.model.WorklifePermissionVO;
import vn.worklife.manager.security.model.WorklifeRoleGroupVO;

import java.util.ArrayList;
import java.util.List;

public interface WorklifePermissionService {
    void insertPermission(WorklifePermissionVO worklifePermissionVO);

    void updatePermission(WorklifePermissionVO worklifePermissionVO);

    void deleteSinglePermissionByPermissionId(WorklifePermissionVO worklifePermissionVO);
    
    WorklifePermissionVO selectPermissionByPermissionId(WorklifePermissionVO worklifePermissionVO);
    
    ArrayList<WorklifeListPermissionVO> selectListPermissionGroupName();

    ArrayList<WorklifePermissionVO> selectListPermissionForRegister(int groupId);

    ArrayList<WorklifePermissionVO> selectListPermissionForRole(WorklifeRoleGroupVO worklifeRoleGroupVO);

    ArrayList<WorklifePermissionVO> selectMultiPermissionByGroupId(int groupId);
    
    ArrayList<WorklifePermissionVO> selectMutiPermissionSystem();

    ArrayList<WorklifePermissionVO> selectMultiPermissionByListPermissionId(ArrayList<Integer> listPermissionId);

    ArrayList<WorklifePermissionVO> selectMultiPermission(WorklifePermissionVO worklifePermissionVO);
    
    ArrayList<WorklifePermissionVO> selectListPermissionByRoleId(int roleId);

    int countMultiPermission(WorklifePermissionVO worklifePermissionVO);
    
    List<WorklifePermissionVO> selectPermissionNo();
    
    ArrayList<WorklifePermissionVO> selectAllPermission();
}
