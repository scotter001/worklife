package vn.worklife.manager.group.model;

import java.io.Serializable;
import java.util.ArrayList;

import org.apache.ibatis.type.Alias;

import vn.worklife.manager.security.model.WorklifePermissionVO;
@Alias("WorklifeGroupAndPermissionVO")
public class WorklifeGroupAndPermissionVO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	WorklifeGroupVO worklifegroupVO;
	ArrayList<WorklifePermissionVO> arrworklifepermission;
	
	
	
	public WorklifeGroupAndPermissionVO() {
		super();
	}
	public WorklifeGroupAndPermissionVO(WorklifeGroupVO worklifegroupVO,
			ArrayList<WorklifePermissionVO> arrworklifepermission) {
		super();
		this.worklifegroupVO = worklifegroupVO;
		this.arrworklifepermission = arrworklifepermission;
	}
	public WorklifeGroupVO getWorklifegroupVO() {
		return worklifegroupVO;
	}
	public void setWorklifegroupVO(WorklifeGroupVO worklifegroupVO) {
		this.worklifegroupVO = worklifegroupVO;
	}
	public ArrayList<WorklifePermissionVO> getArrworklifepermission() {
		return arrworklifepermission;
	}
	public void setArrworklifepermission(
			ArrayList<WorklifePermissionVO> arrworklifepermission) {
		this.arrworklifepermission = arrworklifepermission;
	}
	
	

}
