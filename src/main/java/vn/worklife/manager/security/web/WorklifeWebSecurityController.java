package vn.worklife.manager.security.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;
import org.springframework.security.web.access.intercept.FilterSecurityInterceptor;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import vn.worklife.manager.security.model.WorklifePermissionVO;
import vn.worklife.manager.security.model.WorklifeRoleUserVO;
import vn.worklife.manager.security.service.impl.WorklifePermissionGroupServiceImpl;
import vn.worklife.manager.user.model.WorklifeUserVO;
import vn.worklife.manager.user.service.WorklifeUserService;
import vn.worklife.manager.user.service.impl.WorklifeUserDetailsService;
import vn.worklife.security.util.WorklifeDecryptEncryptObject;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Configuration
@EnableWebSecurity
public class WorklifeWebSecurityController extends WebSecurityConfigurerAdapter {
    @Resource(name = "WorklifePermissionGroupServiceImpl")
	WorklifePermissionGroupServiceImpl worklifePermissionGroupServiceImpl;
    
    @Resource(name = "WorklifeLoginSuccessHandler")
    WorklifeLoginSuccessHandler worklifeLoginSuccessHandler;

    @Resource(name = "WorklifeUserDetailsService")
    WorklifeUserDetailsService worklifeUserDetailsService;
    
	private final String usersByUsernameQuery = "SELECT 	username AS username, " +
				    							"			password, " +
				    							"			active_flag AS enabled " +
				    							"FROM 		users " +
				    							"WHERE 		username = ?";

	private final String authoritiesByUsernameQuery = 	"SELECT 	users.username AS username, " + 
				    									"			role.role_code AS role " +
				    									"FROM 		users " +
				    									"INNER JOIN role_user ON role_user.id_user = users.id_user " +
				    									"INNER JOIN role ON role.role_id = role_user.role_id " +
				    									"WHERE 		username = ?";
	
    @Autowired
	DataSource worklifeDatabase;
    
    @Autowired
    private WorklifeUserService worklifeUserService;
	
	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
	  auth.jdbcAuthentication()
	  		.dataSource(worklifeDatabase)
			.usersByUsernameQuery(usersByUsernameQuery)
			.authoritiesByUsernameQuery(authoritiesByUsernameQuery)
			.passwordEncoder(new BCryptPasswordEncoder())
	  		.and()
	  		.userDetailsService(worklifeUserDetailsService)
	  		.and()
	  		.authenticationProvider(new AuthenticationProvider() {
				@Override
				public boolean supports(Class<?> authentication) {
					return authentication.equals(UsernamePasswordAuthenticationToken.class);
				}
				
				@Override
				public Authentication authenticate(Authentication authentication)
						throws AuthenticationException {
					Object principal = authentication.getPrincipal();
					if (principal != null && principal instanceof WorklifeUserVO) {
				        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();  
						WorklifeUserVO worklifeUserVO = (WorklifeUserVO) principal;
				        ArrayList<String> listRoles = worklifeUserService.selectUserPermissionForSecurity(worklifeUserVO.getUsername());
				        
				        if (listRoles != null && listRoles.size() > 0) {
				        	for (String role : listRoles) {
				        		 SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);  
				                 authorities.add(authority); 
				        	} 
				        }
				         
				        worklifeUserVO.setAuthorities(authorities);				         
				        Authentication auth = new UsernamePasswordAuthenticationToken(worklifeUserVO, worklifeUserVO.getPassword(), authorities);
				        return auth;
					} else {
						String userName = authentication.getName();
				        String password = authentication.getCredentials().toString();
				        
				        if (userName.equals("") || password.equals("")) 
				        	return null;
				         
				         List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();  
				         
				         WorklifeUserVO worklifeUserVO = worklifeUserService.loginSingleActiveUserByUserName(userName);
				         
				         try {
							if (worklifeUserVO == null || !WorklifeDecryptEncryptObject.comparePassword(password, worklifeUserVO.getPassword())) 
								 return null;
						} catch (Exception e) {
							return null;
						}  
				         
				         ArrayList<String> listRoles = worklifeUserService.selectUserPermissionForSecurity(userName);
				         if (listRoles != null && listRoles.size() > 0) {
				        	for (String role : listRoles) {
				        		 SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);  
				                 authorities.add(authority); 
				        	} 
				         }
				         
				         worklifeUserVO.setAuthorities(authorities);
				         
				         Authentication auth = new UsernamePasswordAuthenticationToken(worklifeUserVO, worklifeUserVO, authorities);
				         return auth;
					}
				}
			});
	}
    
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		/*ArrayList<WorklifePermissionVO> listPermission = worklifePermissionGroupServiceImpl.selectPermissionForSecurity();
		
		if (listPermission != null && listPermission.size() > 0) {
			for (WorklifePermissionVO permission : listPermission) {
				http.authorizeRequests().antMatchers("ROLE_" + permission.getPermissionPattern()).hasAnyAuthority(permission.getPermissionName());
			}
		}*/
		
		http.authorizeRequests()
			.and()
            .formLogin()
            .loginPage("/login.do")
            .loginProcessingUrl("/validateInforLogin.do")
            .failureUrl("/login.do?error")
            .successHandler(worklifeLoginSuccessHandler)
            .usernameParameter("username")
            .passwordParameter("password")
            .permitAll()
            .and()
            .logout()
            .logoutUrl("/logout.do")
            .invalidateHttpSession(true)
            .deleteCookies("worklifeRememberMe", "JSESSIONID")
            .permitAll()
            .and()
            .exceptionHandling()
            .accessDeniedPage("/Error401.do")
            .and()
            .csrf()
            .and()
            .rememberMe()
			.rememberMeParameter("worklifeRememberMe")
			.rememberMeCookieName("worklifeRememberMe")
			.key("worklifeRememberMe")
			.tokenRepository(persistentTokenRepository())
			.tokenValiditySeconds(1209600);
    }
	
	@Bean
	public PersistentTokenRepository persistentTokenRepository() {
		JdbcTokenRepositoryImpl db = new JdbcTokenRepositoryImpl();
		db.setDataSource(worklifeDatabase);
		return db;
	}
	
	@Override
    public void configure(final WebSecurity web) throws Exception {
        final HttpSecurity http = getHttp();
        web.postBuildAction(new Runnable() {
            @Override
            public void run() {
            	FilterSecurityInterceptor filterSecurityInterceptor = http.getSharedObject(FilterSecurityInterceptor.class);
            	filterSecurityInterceptor.setAlwaysReauthenticate(true);
            	filterSecurityInterceptor.setSecurityMetadataSource(new FilterInvocationSecurityMetadataSource() {
					
					@Override
					public boolean supports(Class<?> clazz) {
						return false;
					}
					
					@Override
					public Collection<ConfigAttribute> getAttributes(Object object)
							throws IllegalArgumentException {
						FilterInvocation fi = (FilterInvocation) object;
						
						String url = fi.getRequestUrl();

			            if (url.indexOf('?') != -1)
			            	url = url.substring(0, url.indexOf('?'));
			            url = url.trim();

			            List<ConfigAttribute> attributes = new ArrayList<ConfigAttribute>();
			            
			            if (url.indexOf("login.do") != -1 || url.indexOf("/logout.do") != -1 || url.indexOf("/validateInforLogin.do") != -1) {
			            	return null;
			            } else {
			            	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			            	Object principal = authentication.getPrincipal();
			            	
							if (principal != null && principal instanceof WorklifeUserVO) {
								WorklifeUserVO worklifeUserVO = (WorklifeUserVO) authentication.getPrincipal();
								
								WorklifeRoleUserVO worklifeRoleUserVO = new WorklifeRoleUserVO();
								worklifeRoleUserVO.setUserName(worklifeUserVO.getUsername());
								worklifeRoleUserVO.setPattern(url);
					            ArrayList<WorklifePermissionVO> listPermission = worklifePermissionGroupServiceImpl.selectPermissionForFilter(worklifeRoleUserVO);
					            ArrayList<WorklifePermissionVO> listPermissionByUrl = worklifePermissionGroupServiceImpl.selectPermissionForFilterByUrl(url);
					            
					            if (listPermission != null && listPermission.size() > 0 || listPermissionByUrl == null || listPermissionByUrl.size() == 0) {
									return null;
					            } else {
					            	attributes.add(new SecurityConfig("IS_NOT_AUTHENTICATED_FULLY"));
					            }
							} else {
								ArrayList<WorklifePermissionVO> listPermissionByUrl = worklifePermissionGroupServiceImpl.selectPermissionForFilterByUrl(url);
								if (listPermissionByUrl == null || listPermissionByUrl.size() == 0) {
									return null;
					            } else {
					            	attributes.add(new SecurityConfig("IS_NOT_AUTHENTICATED_FULLY"));
					            }
							}
			            }
			            return attributes;
					}
					
					@Override
					public Collection<ConfigAttribute> getAllConfigAttributes() {
						return null;
					}
				});
                web.securityInterceptor(filterSecurityInterceptor);
            }
        });
    }
	
	public void config() throws Exception {
		
	}
}
