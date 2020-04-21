<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tag"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Admin Control Panel</title>
	<!-- LIST SOURCE FILE CSS -->
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.bootstrap.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.responsive.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.tableTools.min.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/worklife/admin/datatable/datatable_custom.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/multidropdownlist/fg.menu.css'/>" rel="stylesheet">
	
	<!-- LIST JS LIB  -->
	<script src="<c:url value='/style/js/others/inspinia/jquery-2.1.1.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/bootstrap.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/slimscroll/jquery.slimscroll.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/pace/pace.min.js'/>" type="text/javascript"></script>
	<!-- LIST JS DATATABLE -->
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/jquery.dataTables.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/dataTables.bootstrap.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/dataTables.responsive.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/dataTables.tableTools.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/multidropdownlist/fg.menu.js'/>" type="text/javascript"></script>
		
	<script src="<c:url value='/style/js/worklife/admin/manager_role_user/manager_role_user.js'/>" type="text/javascript"></script>	
	
	<link rel="shortcut icon" href="<c:url value="/style/images/worklife/worklife.ico" />" />
	
	<script type="text/javascript">
		var url = '${pageContext.request.contextPath}/';
		var lengthmenu = '<spring:message code="label.datatable.lengthmenu" />';
		var search = '<spring:message code="label.datatable.search" />';
		var info = '<spring:message code="label.datatable.info" />';
		var infoempty = '<spring:message code="label.datatable.infoempty" />';
		var zerorecord = '<spring:message code="label.datatable.zerorecord" />';
		var infofiltered = '<spring:message code="label.datatable.infofiltered" />';
		var next = '<spring:message code="label.next"/>';
 		var prev = '<spring:message code="label.prev"/>';
	</script>
	<style type="text/css">
		/* .positionHelper .fg-menu-container {
			    bottom: -374px !important;
		} */
	</style>
</head>
<body>
	<div id="wrapper">
		<!-- LEFT MENU  -->
		<%@ include file="../componentpage/leftmenu.jsp"%>
		<!-- HEADER -->
		<input type="hidden" name="error" id="error" value="<c:out value="${ error }" />">
		<input type="hidden" name="success" id="success" value="<c:out value="${ success }"/>">
		<fmt:setLocale value="vi_VI"/>
		<div id="page-wrapper" class="gray-bg">
			<!-- Import file header right -->
			<%@ include file="../componentpage/header.jsp"%>
			<div class="row wrapper border-bottom white-bg page-heading">
				<div class="col-lg-10">
					<h2><spring:message code="label.uppercase.system" /></h2>
					<ol class="breadcrumb">
						<li>
							<a href="<c:url value='/worklife/manager/admin/redirectAdminPage.do' />"><spring:message code="label.lowercase.system" /></a>
						</li>
						<li class="active">
							<strong><spring:message code="label.lowercase.administrategroup3" /></strong>
						</li>
					</ol>
				</div>
				<div class="col-lg-2"></div>
			</div>
			<!-- BODY -->
			<div class="animated fadeInRight m-t p-b-lg">
				<form class="form" action="${pageContext.request.contextPath}/worklife/manager/role/create/newRole.do" id="roleGroupManager" name="roleGroupManager" method="GET">
					<input type="hidden" name="pageNumber" id="pageNumber"/>
					<div class="row animated fadeInRight">
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="ibox-title">
									<h5><spring:message code="label.lowercase.managegroup3" /></h5>
									<div class="ibox-tools mgt7" style="margin-top: -7px;">
										<%-- <button type="button" id="btnNew" class="btn btn-white btn-sm">
											<i class="fa fa-plus">&nbsp;<spring:message code="label.new" /></i>
										</button> --%>
									</div>
								</div>
								<div class="ibox-content">
									<div class="form-group">
										<div class="row">
											<div class="col-lg-5 col-md-5 m-b">
												<input type="hidden" name="groupId" id="groupId" value="${ groupId }">
												<input type="hidden" name="groupName" id="groupName" value="<c:out value="${ groupName }" />">
												<a href="#news-items-2" class="btn btn-primary dropdown-toggle" id="listGroup">
													<span id="lblGroupName"><c:if test="${ groupName == '' || groupName == null }"><spring:message code="label.register.groupname2" /></c:if><c:if test="${ groupName != null && groupName != '' }">${ groupName }</c:if></span> <span class="caret"></span>
												</a>
												<div id="news-items-2" class="hidden">
													<ul>
														<c:forEach var="child" items="${ listGroup }">
															<tag:parent_group list="${ child }" listParentId="${ listParentId }"></tag:parent_group>
														</c:forEach>
													</ul>
												</div>
											</div>
										</div>
										<div class="row">
											<div class="col-lg-12 col-md-12">
												<table class="table table-bordered dataTables-example" id="tableRoleUserList" style="width: 100%">
													<thead>
														<tr>
															<th style="width: 5%; padding-right: 3px !important;" class="text-center"><spring:message code="label.number" /></th>
															<th style="width: 25%" class="text-center"><spring:message code="label.uppercase.user" /></th>
															<th style="width: 35%" class="text-center"><spring:message code="label.groupname" /></th>
															<th style="width: 40%" class="text-center"><spring:message code="label.permissiongroupnameth" /></th>
															<th style="width: 15%"><spring:message code="label.modify" /></th>
														</tr>
													</thead>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<!-- FOOTER -->
			<%@ include file="../componentpage/footer.jsp"%>
		</div>
	</div>
</body>
</html>