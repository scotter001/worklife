package vn.worklife.security.util;

import java.util.ArrayList;

import org.apache.log4j.Logger;

import vn.worklife.manager.group.model.WorklifeGroupVO;
import vn.worklife.manager.group.service.impl.WorklifeGroupServiceImpl;

public class WorklifeGroupManager {

	public static ArrayList<WorklifeGroupVO> getFullChildGroup(WorklifeGroupVO group, int currentGroupId, WorklifeGroupServiceImpl worklifeGroupService, Logger logger) throws Exception {
		try {
			if (!worklifeGroupService.checkGroupHavingChildren(group)) {
				return null;
			}
			WorklifeGroupVO groupParent = new WorklifeGroupVO();
			groupParent.setParentId(group.getGroupId());
			groupParent.setGroupId(currentGroupId);
			ArrayList<WorklifeGroupVO> listGroup = worklifeGroupService.selectMultiGroupByParentIdForDropdownlist(groupParent);
			if (listGroup != null && !listGroup.isEmpty()) {
				for (WorklifeGroupVO groupChild : listGroup) {
					groupChild.setListChildGroup(getFullChildGroup(groupChild, currentGroupId, worklifeGroupService, logger));
				}
			}
			return listGroup;
		} catch (Exception ex) {
			logger.error(ex);
		}
		return null;
	}
}
