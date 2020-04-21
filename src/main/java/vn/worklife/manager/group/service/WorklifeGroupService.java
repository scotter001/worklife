package vn.worklife.manager.group.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.manager.group.model.WorklifeGroupVO;

import java.util.ArrayList;
import java.util.List;

public interface WorklifeGroupService {
    void insertGroup(WorklifeGroupVO worklifeGroupVO);

    void updateGroup(WorklifeGroupVO worklifeGroupVO);

    void deleteSingleGroupByGroupId(Integer groupId);

    void deleteMultiGroupSameParentId(Integer parentId);

    WorklifeGroupVO selectGroupByGroupId(Integer groupId);

    WorklifeGroupVO selectGroupWithFullPathNameByGroupId(WorklifeGroupVO worklifeGroupVO);

    ArrayList<WorklifeGroupVO> selectMultiGroupByParentId(WorklifeGroupVO worklifeGroupVO);

    ArrayList<WorklifeGroupVO> selectMultiGroupByParentIdForDropdownlist(WorklifeGroupVO worklifeGroupVO);
    
    ArrayList<WorklifeGroupVO> selectAllParentGroup(WorklifeGroupVO worklifeGroupVO);

    ArrayList<WorklifeGroupVO> selectMultiGroupWithFullPathNameByParentId(WorklifeGroupVO worklifeGroupVO);

    List<Integer> selectAllParentGroupIdsWithType(@Param("groupIds") List<Integer> groupIds,@Param("isDepartment") int isDepartment);

    int countMultiGroupByGroupId(WorklifeGroupVO worklifeGroupVO);

    WorklifeGroupVO getList(WorklifeGroupVO worklifeGroupVO);

    int checkGroupHavingChildren(WorklifeGroupVO worklifeGroupVO);

    ArrayList<Integer> getListChildrenId(WorklifeGroupVO worklifeGroupVO);

    int checkGroupHasUser(Integer groupId);
    int countPermissionInGroup(Integer groupId);
    
    List<WorklifeGroupVO> selectAllGroupName();
}
