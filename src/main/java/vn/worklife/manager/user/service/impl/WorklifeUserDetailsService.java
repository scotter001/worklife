package vn.worklife.manager.user.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.manager.user.service.WorklifeUserService;

@Service("WorklifeUserDetailsService")
public class WorklifeUserDetailsService implements UserDetailsService {
    @Autowired
    private WorklifeUserService worklifeUserService;

	@Override
	public WorklifeUserVO loadUserByUsername(String username) throws UsernameNotFoundException {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();  
        
        WorklifeUserVO worklifeUserVO = worklifeUserService.loginSingleActiveUserByUserName(username);
        
        try {
			if (worklifeUserVO == null) 
				 return null;
		} catch (Exception e) {
			return null;
		}  
        
        ArrayList<String> listRoles = worklifeUserService.selectUserPermissionForSecurity(username);
        if (listRoles != null && listRoles.size() > 0) {
       	for (String role : listRoles) {
       		 SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);  
                authorities.add(authority); 
       	} 
        }
        
        worklifeUserVO.setAuthorities(authorities);
        
        return worklifeUserVO;
	}

}
