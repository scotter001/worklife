package vn.worklife.manager.user.service.impl;

import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.manager.user.service.WorklifeUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("WorklifeUserServiceImpl")
public class WorklifeUserServiceImpl {
    @Autowired
    private WorklifeUserService worklifeUserService;

    public Boolean checkExistsEmail(String email) {
        return worklifeUserService.checkExistsEmail(email) > 0;
    }

    public Boolean checkExistsUserName(String username) {
        return worklifeUserService.checkExistsUserName(username) > 0;
    }
    
    @Transactional
    public void insertUser(WorklifeUserVO worklifeUserVO) {
		worklifeUserVO.setEncryptPassword(worklifeUserVO.getPassword());
        worklifeUserService.insertUser(worklifeUserVO);
    }

    public void updateUserAvatar(WorklifeUserVO worklifeUserVO) {
        worklifeUserService.updateUserAvatar(worklifeUserVO);
    }

    public void updateUser(WorklifeUserVO worklifeUserVO) {
        worklifeUserService.updateUser(worklifeUserVO);
    }

    public void updateUserPasswordd(WorklifeUserVO worklifeUserVO) {
        worklifeUserService.updateUserPasswordd(worklifeUserVO);
    }
    
    public void deleteSingleUserByUserId(WorklifeUserVO worklifeUserVO) {
        worklifeUserService.deleteSingleUserByUserId(worklifeUserVO);
    }

    public void deleteMultiUserSameGroupId(WorklifeUserVO worklifeUserVO) {
        worklifeUserService.deleteMultiUserSameGroupId(worklifeUserVO);
    }

    public void deleteMultiUserSameActiveFlag(WorklifeUserVO worklifeUserVO) {
        worklifeUserService.deleteMultiUserSameActiveFlag(worklifeUserVO);
    }

    public void deleteMultiUserSameGroupIdActiveFlag(WorklifeUserVO worklifeUserVO) {
        worklifeUserService.deleteMultiUserSameGroupIdActiveFlag(worklifeUserVO);
    }

    public WorklifeUserVO loginSingleActiveUser(WorklifeUserVO worklifeUserVO) {
        return worklifeUserService.loginSingleActiveUser(worklifeUserVO);
    }

    public WorklifeUserVO selectSingleActiveUser(WorklifeUserVO worklifeUserVO) {
        return worklifeUserService.selectSingleActiveUser(worklifeUserVO);
    }

    public ArrayList<WorklifeUserVO> selectMultiUser(WorklifeUserVO worklifeUserVO) {
        //return worklifeUserService.selectMultiUser(worklifeUserVO);
    	return worklifeUserService.selectMultiUser(worklifeUserVO);
    }
    
    public ArrayList<WorklifeUserVO> selectMultiRoleUser(WorklifeUserVO worklifeUserVO) {
    	return worklifeUserService.selectMultiRoleUser(worklifeUserVO);
    }

    public Integer countMultiUser(WorklifeUserVO worklifeUserVO) {
        return worklifeUserService.countMultiUser(worklifeUserVO);
    }
    
    public Integer checkRoleUser(WorklifeUserVO worklifeUserVO) {
        return worklifeUserService.checkRoleUser(worklifeUserVO);
    }
    
    public Integer countListUser(WorklifeUserVO worklifeUserVO) {
        return worklifeUserService.countListUser(worklifeUserVO);
    }


    public List<WorklifeUserVO> selectUsersByGroupId(int id, int idUser){
        return worklifeUserService.selectUsersByGroupId(id,idUser);
    }
}
