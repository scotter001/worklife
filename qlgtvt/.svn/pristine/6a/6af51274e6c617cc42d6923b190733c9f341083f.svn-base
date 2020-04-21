package vn.worklife.security.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;
import vn.worklife.manager.user.model.WorklifeUserVO;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class WorklifeUserManager {
    @Autowired
    private WorklifeGroupServiceImpl worklifeGroupService;

    public static WorklifeUserVO getLoginUser() {
        try {
        	 Authentication auth = SecurityContextHolder.getContext().getAuthentication();
             if (auth == null || auth.getPrincipal() == null || !(auth.getPrincipal() instanceof WorklifeUserVO)) {
                 return null;
             }
             
             return (WorklifeUserVO) auth.getPrincipal();
        } catch (Exception ex) {
            return null;
        }
    }
    public static String checkLogged () {
        WorklifeUserVO curLogged;
        if(WorklifeUserManager.getLoginUser() != null){
            curLogged = WorklifeUserManager.getLoginUser();
            if(curLogged == null)
                return "redirect:/login.do";
        }else{
            return "redirect:/login.do";
        }
        return "";
    }
    public List<Integer> getChildrenGroup(int cap){
        WorklifeUserVO worklifeUserVO = WorklifeUserManager.getLoginUser();
        List<Integer> groupIds = new ArrayList<>();
        int isDepartment = worklifeUserVO.getGroup().getIsDepartment();
        int groupIdLogged = worklifeUserVO.getGroupId();
        if(isDepartment == cap){
            groupIds.add(groupIdLogged);
        }else{
            if(isDepartment == 1){
                if(cap == 2){
                    groupIds = worklifeGroupService.selectAllParentGroupIdsWithType(Collections.singletonList(groupIdLogged),2);
                }else if(cap == 3){
                    groupIds = worklifeGroupService.selectAllParentGroupIdsWithType(Collections.singletonList(groupIdLogged),2);
                    if(groupIds != null &&  groupIds.size() > 0){
                        groupIds = worklifeGroupService.selectAllParentGroupIdsWithType(groupIds,3);
                    }
                }
            } else if (isDepartment == 2) {
                if(cap == 3){
                    groupIds = worklifeGroupService.selectAllParentGroupIdsWithType(Collections.singletonList(groupIdLogged),3);
                }
            }
        }
        return groupIds;
    }
}
