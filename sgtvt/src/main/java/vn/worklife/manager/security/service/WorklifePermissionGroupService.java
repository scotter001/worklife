package vn.worklife.manager.security.service;

import vn.worklife.manager.security.model.WorklifePermissionVO;
import vn.worklife.manager.security.model.WorklifePermissionGroupVO;
import vn.worklife.manager.security.model.WorklifeRoleUserVO;
import vn.worklife.manager.security.model.WorklifeRoleVO;

import java.util.ArrayList;

public interface WorklifePermissionGroupService {
    void insertPermissionGroup(WorklifePermissionGroupVO worklifePermissionGroupVO);

    void deleteSinglePermissionGroup(WorklifePermissionGroupVO worklifePermissionGroupVO);

    void deleteSinglePermissionGroupByGroupId(int groupId);

    void deleteSinglePermissionGroupByPermissionId(int permissionId);

    WorklifePermissionGroupVO selectSinglePermissionGroup(WorklifePermissionGroupVO worklifePermissionGroupVO);

    ArrayList<WorklifePermissionGroupVO> selectListPermissionGroup(WorklifePermissionGroupVO worklifePermissionGroupVO);

    ArrayList<WorklifePermissionVO> selectPermissionForSecurity();

    ArrayList<WorklifePermissionVO> selectPermissionForFilterByUrl(String url);

    ArrayList<WorklifePermissionVO> selectPermissionForFilter(WorklifeRoleUserVO worklifeRoleUserVO);

    ArrayList<Integer> selectListPermissionIdByGroupId(int groupId);

    ArrayList<Integer> selectListSystemPermissionIdByGroupId(int groupID);

    int countListPermissionGroup(WorklifePermissionGroupVO WorklifePermissionGroupVO);
}
