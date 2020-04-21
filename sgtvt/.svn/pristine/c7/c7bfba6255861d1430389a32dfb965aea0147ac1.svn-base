package vn.worklife.manager.security.service.impl;

import vn.worklife.manager.security.model.WorklifeRoleHierarchyVO;
import vn.worklife.manager.security.service.WorklifeRoleHierarchyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service("WorklifeRoleHierarchyServiceImpl")
public class WorklifeRoleHierarchyServiceImpl {
    @Autowired
    private WorklifeRoleHierarchyService worklifeRoleHierarchyService;

    @Transactional
    public void insertRoleHierarchy(WorklifeRoleHierarchyVO worklifeRoleHieararchyVO) {
        worklifeRoleHierarchyService.insertRoleHierarchy(worklifeRoleHieararchyVO);
    }

    @Transactional
    public void deleteSingleRoleHierarchy(WorklifeRoleHierarchyVO worklifeRoleHieararchyVO) {
        worklifeRoleHierarchyService.deleteSingleRoleHierarchy(worklifeRoleHieararchyVO);
    }

    public ArrayList<WorklifeRoleHierarchyVO> selectMultiRoleHierarchy(WorklifeRoleHierarchyVO worklifeRoleHieararchyVO) {
        return worklifeRoleHierarchyService.selectMultiRoleHierarchy(worklifeRoleHieararchyVO);
    }

}
