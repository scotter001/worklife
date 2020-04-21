package vn.worklife.manager.user.service;

import org.apache.ibatis.annotations.Param;
import vn.worklife.manager.user.model.WorklifeUserVO;

import java.util.ArrayList;
import java.util.List;

public interface WorklifeUserService {

    void insertUser(WorklifeUserVO worklifeUserVO);
    
    int checkExistsEmail(String email);

    int checkExistsUserName(String username);
    
    void updateUserAvatar(WorklifeUserVO worklifeUserVO);
    
    void updateUser(WorklifeUserVO worklifeUserVO);
    
    void updateUserPasswordd(WorklifeUserVO worklifeUserVO);

    void deleteSingleUserByUserId(WorklifeUserVO worklifeUserVO);

    void deleteMultiUserSameGroupId(WorklifeUserVO worklifeUserVO);

    void deleteMultiUserSameActiveFlag(WorklifeUserVO worklifeUserVO);

    void deleteMultiUserSameGroupIdActiveFlag(WorklifeUserVO worklifeUserVO);

    WorklifeUserVO loginSingleActiveUser(WorklifeUserVO worklifeUserVO);
    
    ArrayList<String> selectUserPermissionForSecurity(String username);

    WorklifeUserVO loginSingleActiveUserByUserName(String userName);
    
    WorklifeUserVO selectSingleActiveUser(WorklifeUserVO worklifeUserVO);

    ArrayList<WorklifeUserVO> selectMultiUser(WorklifeUserVO worklifeUserVO);
    
    ArrayList<WorklifeUserVO> selectMultiRoleUser(WorklifeUserVO worklifeUserVO);

    Integer countMultiUser(WorklifeUserVO worklifeUserVO);
    
    Integer checkRoleUser(WorklifeUserVO worklifeUserVO);
    
    Integer countListUser(WorklifeUserVO worklifeUserVO);

    List<WorklifeUserVO> selectUsersByGroupId(@Param("idGroup")int id, @Param("idUser")int idUser);
}
