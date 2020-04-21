package vn.worklife.manager.group.model;

import vn.worklife.manager.security.model.WorklifePageGridVO;
import org.apache.ibatis.type.Alias;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;

@Alias("WorklifeGroupVO")
public class WorklifeGroupVO extends WorklifePageGridVO implements Serializable {
    private static final long serialVersionUID = 2311764739685858893L;

    private int groupId;
    private String groupName;
    private String abbreviation;
    private String groupDescription;
    private int parentId; //If this group is parent, parent id will be -1
    private String parentName;
    private ArrayList<WorklifeGroupVO> listChildGroup;
    private String listNameOfParent;
    private String listIdOfParent;
    private Date createAt;
    private Date updateAt;

    private int isDepartment;
    private String maHuyen;
    private String maXa;

    //Only using load list group
    private Integer idGroupUserLogin;
    private Integer idSuperAdminGroup;

    public WorklifeGroupVO() {
        groupId = -1;
        parentId = -2;
        groupName = "";
        isDepartment = 0;
        maHuyen = "";
        maXa = "";
        abbreviation = "";
        groupDescription = "";
        listNameOfParent = "";
    }


    public WorklifeGroupVO(int groupId, String groupName, String abbreviation, String groupDescription, int isDepartment, String maHuyen, String maXa, int parentId, String parentName, ArrayList<WorklifeGroupVO> listChildGroup, String listNameOfParent, String listIdOfParent, Date createAt, Date updateAt, Integer idGroupUserLogin, Integer idSuperAdminGroup) {
        this.groupId = groupId;
        this.groupName = groupName;
        this.abbreviation = abbreviation;
        this.groupDescription = groupDescription;
        this.isDepartment = isDepartment;
        this.maHuyen = maHuyen;
        this.maXa = maXa;
        this.parentId = parentId;
        this.parentName = parentName;
        this.listChildGroup = listChildGroup;
        this.listNameOfParent = listNameOfParent;
        this.listIdOfParent = listIdOfParent;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.idGroupUserLogin = idGroupUserLogin;
        this.idSuperAdminGroup = idSuperAdminGroup;
    }

    public Integer getIdSuperAdminGroup() {
		return idSuperAdminGroup;
	}

	public void setIdSuperAdminGroup(Integer idSuperAdminGroup) {
		this.idSuperAdminGroup = idSuperAdminGroup;
	}

	public Integer getIdGroupUserLogin() {
		return idGroupUserLogin;
	}

	public void setIdGroupUserLogin(Integer idGroupUserLogin) {
		this.idGroupUserLogin = idGroupUserLogin;
	}

	public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupDescription() {
        return groupDescription;
    }

    public void setGroupDescription(String groupDescription) {
        this.groupDescription = groupDescription;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
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

    public ArrayList<WorklifeGroupVO> getListChildGroup() {
        return listChildGroup;
    }

    public void setListChildGroup(ArrayList<WorklifeGroupVO> listChildGroup) {
        this.listChildGroup = listChildGroup;
    }

    public String getListNameOfParent() {
        return listNameOfParent;
    }

    public void setListNameOfParent(String listNameOfParent) {
        this.listNameOfParent = listNameOfParent;
    }

    public String getListIdOfParent() {
        return listIdOfParent;
    }

    public void setListIdOfParent(String listIdOfParent) {
        this.listIdOfParent = listIdOfParent;
    }

    public String getParentName() {
        return parentName;
    }

    public void setParentName(String parentName) {
        this.parentName = parentName;
    }

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}


	public int getIsDepartment() {
		return isDepartment;
	}

	public void setIsDepartment(int isDeparment) {
		this.isDepartment = isDeparment;
	}

    public String getMaHuyen() {
        return maHuyen;
    }

    public void setMaHuyen(String maHuyen) {
        this.maHuyen = maHuyen;
    }

    public String getMaXa() {
        return maXa;
    }

    public void setMaXa(String maXa) {
        this.maXa = maXa;
    }
}
