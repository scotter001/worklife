<%@ tag language="java" pageEncoding="ISO-8859-1"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tag"%>
<%@ attribute name="list" required="true" type="vn.worklife.manager.group.model.WorklifeGroupVO" %>
<%@ attribute name="listParentId" required="false" type="java.util.ArrayList" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<li>
	<c:if test="${ !empty listParentId }">
		<c:set value="f" var="check"></c:set>
		<c:forEach var="parentId" items="${ listParentId }">
			<c:if test="${ parentId == list.groupId }">
				<c:set value="t" var="check"></c:set>
				<a href="#" class="parent-active" id="${ list.groupId }">${ list.groupName }</a>
			</c:if>
		</c:forEach>
			<c:if test="${ check == 'f' }">
				<a href="#" id="${ list.groupId }">${ list.groupName }</a>
			</c:if>
		<c:if test="${ !empty list.listChildGroup }">
			<ul>
				<c:forEach var="child" items="${ list.listChildGroup }">
					<tag:parent_group list="${ child }" listParentId="${ listParentId }" />
				</c:forEach>
			</ul>
		</c:if>
	</c:if>
	<c:if test="${ empty listParentId }">
		<a href="#" id="${ list.groupId }">${ list.groupName }</a>
		<c:if test="${ !empty list.listChildGroup }">
			<ul>
				<c:forEach var="child" items="${ list.listChildGroup }">
					<tag:parent_group list="${ child }" />
				</c:forEach>
			</ul>
		</c:if>
	</c:if>
</li>