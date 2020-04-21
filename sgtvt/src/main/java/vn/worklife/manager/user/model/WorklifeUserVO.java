package vn.worklife.manager.user.model;

import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.security.model.WorklifePageGridVO;
import vn.worklife.manager.security.model.WorklifeRoleVO;
import vn.worklife.security.util.WorklifeDecryptEncryptObject;

import org.apache.ibatis.type.Alias;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Alias("WorklifeUserVO")
public class WorklifeUserVO extends WorklifePageGridVO implements UserDetails {
    private static final long serialVersionUID = 532166538326271843L;
    private int userId;
    private String userName;
    private String password; /* Encrypt password */
    private String email;
	private List<GrantedAuthority> authorities;
    private Integer groupId;
    private WorklifeGroupVO group;
    private ArrayList<WorklifeRoleVO> listRole;
    private String listRoleName;
    private int activeFlag;	/* 0 is Disabled; 1 is Enabled */
    private Date createAt;
    private Date updateAt;
    private String mahuyen; 
    
    //Persional information
    private String realName;
    private int gender;
    private String address;
    private Date birthday;
    private String cellphone;
    private String landline;
    private String identityCard;
    private Date IDDate;
    private String IDAgency;
    private String avatar;
    
    //Only using for project CPXD
    private String chucvu;
    
    //Only using for Admin Manager User
    private Integer idGroupUserLogin;
    private Integer idGroupSuperAdmin;
    private Integer isAdmin;

	//Only using for change password
    private String confirmPassword;
    private String newPassword;
    private String userNameID;
    
	public WorklifeUserVO() {
        userId = -1;
        userName = "";
        password = "";
        email = "";
        groupId = null;
        activeFlag = 1;
        createAt = null;
        updateAt = null;
        realName = "";
        gender = -1;
        address = "";
        cellphone = "";
        landline = "";
        identityCard = "";
        IDDate = null;
        IDAgency = "";
        avatar = "";
        group = new WorklifeGroupVO();
        isAdmin = 0;
    }

	public Integer getIsAdmin() {
		return isAdmin;
	}

	public void setIsAdmin(Integer isAdmin) {
		this.isAdmin = isAdmin;
	}
		
	public String getUserNameID() {
		return userNameID;
	}

	public void setUserNameID(String userNameID) {
		this.userNameID = userNameID;
	}



	public String getConfirmPassword() {
		return confirmPassword;
	}


	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}


	public String getNewPassword() {
		return newPassword;
	}


	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}


	public String getMahuyen() {
		return mahuyen;
	}


	public void setMahuyen(String mahuyen) {
		this.mahuyen = mahuyen;
	}


	public Integer getIdGroupUserLogin() {
		return idGroupUserLogin;
	}


	public void setIdGroupUserLogin(Integer idGroupUserLogin) {
		this.idGroupUserLogin = idGroupUserLogin;
	}


	public Integer getIdGroupSuperAdmin() {
		return idGroupSuperAdmin;
	}


	public void setIdGroupSuperAdmin(Integer idGroupSuperAdmin) {
		this.idGroupSuperAdmin = idGroupSuperAdmin;
	}


	public WorklifeUserVO(int userId, String userName, String password, String realName, int groupId, int activeFlag, Date createAt, Date updateAt) throws Exception {
        this.userId = userId;
        this.userName = userName;
        this.password = WorklifeDecryptEncryptObject.encryptPassword(password);
        this.realName = realName;
        this.groupId = groupId;
        this.activeFlag = activeFlag;
        this.createAt = createAt;
        this.updateAt = updateAt;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    public void setUsername(String username) {
        this.userName = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
		this.password = password;
    }

    public void setEncryptPassword(String password) {
        try {
			this.password = WorklifeDecryptEncryptObject.encryptPassword(password);
		} catch (Exception e) {
			this.password = "";
		}
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public int getActiveFlag() {
        return activeFlag;
    }

    public void setActiveFlag(int activeFlag) {
        this.activeFlag = activeFlag;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public int getGender() {
		return gender;
	}

	public void setGender(int gender) {
		this.gender = gender;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getCellphone() {
		return cellphone;
	}

	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}

	public String getLandline() {
		return landline;
	}

	public void setLandline(String landline) {
		this.landline = landline;
	}

	public String getIdentityCard() {
		return identityCard;
	}

	public void setIdentityCard(String identityCard) {
		this.identityCard = identityCard;
	}

	public Date getIDDate() {
		return IDDate;
	}

	public void setIDDate(Date iDDate) {
		IDDate = iDDate;
	}

	public String getIDAgency() {
		return IDAgency;
	}

	public void setIDAgency(String iDAgency) {
		IDAgency = iDAgency;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public WorklifeGroupVO getGroup() {
		return group;
	}

	public void setGroup(WorklifeGroupVO group) {
		this.group = group;
	}

	public List<GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	public void setAuthorities(List<GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public boolean isEnabled() {
		return activeFlag > 0;
	}

	public ArrayList<WorklifeRoleVO> getListRole() {
		return listRole;
	}

	public void setListRole(ArrayList<WorklifeRoleVO> listRole) {
		this.listRole = listRole;
	}

	public String getListRoleName() {
		return listRoleName;
	}

	public void setListRoleName(String listRoleName) {
		this.listRoleName = listRoleName;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	public String getChucvu() {
		return chucvu;
	}

	public void setChucvu(String chucvu) {
		this.chucvu = chucvu;
	}
}
