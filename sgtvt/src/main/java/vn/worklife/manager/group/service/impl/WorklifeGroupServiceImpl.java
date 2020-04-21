package vn.worklife.manager.group.service.impl;

import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.WorklifeGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("WorklifeGroupServiceImpl")
public class WorklifeGroupServiceImpl {
    @Autowired
    private WorklifeGroupService worklifeGroupService;

    @Transactional
    public void insertGroup(WorklifeGroupVO worklifeGroupVO) {
        worklifeGroupService.insertGroup(worklifeGroupVO);
    }

    @Transactional
    public void updateGroup(WorklifeGroupVO worklifeGroupVO) {
        worklifeGroupService.updateGroup(worklifeGroupVO);
    }

    @Transactional
    public void deleteSingleGroupByGroupId(Integer groupId) {
        worklifeGroupService.deleteSingleGroupByGroupId(groupId);
    }

    @Transactional
    public void deleteMultiGroupSameParentId(Integer parentId) {
        worklifeGroupService.deleteMultiGroupSameParentId(parentId);
    }

    public WorklifeGroupVO selectGroupByGroupId(Integer groupId) {
        return worklifeGroupService.selectGroupByGroupId(groupId);
    }

    /**
     * This function will return string of group's parent name
     */
    public WorklifeGroupVO selectGroupWithFullPathNameByGroupId(WorklifeGroupVO worklifeGroupVO) {
        return worklifeGroupService.selectGroupWithFullPathNameByGroupId(worklifeGroupVO);
    }

    public ArrayList<WorklifeGroupVO> selectMultiGroupByParentId(WorklifeGroupVO worklifeGroupVO) {
        return worklifeGroupService.selectMultiGroupByParentId(worklifeGroupVO);
    }

    public ArrayList<WorklifeGroupVO> selectMultiGroupByParentIdForDropdownlist(WorklifeGroupVO worklifeGroupVO) {
        return worklifeGroupService.selectMultiGroupByParentIdForDropdownlist(worklifeGroupVO);
    }
    
    public ArrayList<WorklifeGroupVO> selectAllParentGroup(WorklifeGroupVO worklifeGroupVO) {
		return worklifeGroupService.selectAllParentGroup(worklifeGroupVO);
	}

    /**
     * This function will return strings of groups's parent name
     */
    public ArrayList<WorklifeGroupVO> selectMultiGroupWithFullPathNameByParentId(WorklifeGroupVO worklifeGroupVO) {
        return worklifeGroupService.selectMultiGroupByParentId(worklifeGroupVO);
    }

    public int countMultiGroupByGroupId(WorklifeGroupVO worklifeGroupVO) {
        return worklifeGroupService.countMultiGroupByGroupId(worklifeGroupVO);
    }

    public WorklifeGroupVO getList(WorklifeGroupVO worklifeGroupVO) {
        return worklifeGroupService.getList(worklifeGroupVO);
    }

    public Boolean checkGroupHavingChildren(WorklifeGroupVO worklifeGroupVO) {
        return worklifeGroupService.checkGroupHavingChildren(worklifeGroupVO) > 0;
    }

    public ArrayList<Integer> getListChildrenId(WorklifeGroupVO worklifeGroupVO) {
        return worklifeGroupService.getListChildrenId(worklifeGroupVO);
    }

    public Boolean checkGroupHasUser(Integer groupId) {
        return worklifeGroupService.checkGroupHasUser(groupId) > 0;
    }
    
    
    public int countPermissionInGroup(Integer groupId) {
        return worklifeGroupService.countPermissionInGroup(groupId);
    }
    
    public List<WorklifeGroupVO> selectAllGroupName(){
    	return this.worklifeGroupService.selectAllGroupName();
    }

    public List<Integer> selectAllParentGroupIdsWithType(List<Integer> groupIds,int isDepartment){ return this.worklifeGroupService.selectAllParentGroupIdsWithType(groupIds,isDepartment);}
}
