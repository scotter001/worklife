package vn.worklife.manager.security.service;

import vn.worklife.manager.security.model.WorklifeRoleHierarchyVO;

import java.util.ArrayList;

public interface WorklifeRoleHierarchyService {
    void insertRoleHierarchy(WorklifeRoleHierarchyVO worklifeRoleHieararchyVO);

    void deleteSingleRoleHierarchy(WorklifeRoleHierarchyVO worklifeRoleHieararchyVO);

    ArrayList<WorklifeRoleHierarchyVO> selectMultiRoleHierarchy(WorklifeRoleHierarchyVO worklifeRoleHieararchyVO);
}
