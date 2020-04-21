<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tag"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta name="_csrf" content="${_csrf.token}"/>
	<meta name="_csrf_header" content="${_csrf.headerName}"/>
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
		
	<link rel="shortcut icon" href="<c:url value="/style/images/worklife/worklife.ico" />" />
	
	<script type="text/javascript">
		$(document).ready(function() {
			$('#side-menu').find('.active').removeClass('active');
			$('#WorklifeSystemManager').addClass('active');
		});
	</script>
	<script type="text/javascript">
		var url = '${pageContext.request.contextPath}/';
	</script>
	<script src="<c:url value='/style/js/worklife/admin/login-name-user.js' />"></script>
</head>
<body>
	<div id="wrapper">
		<!-- HEADER -->
		<%@ include file="componentpage/leftmenu.jsp"%>
		<input type="hidden" name="error" id="error" value="${ error }">
		<input type="hidden" name="success" id="success" value="${ success }">
		<fmt:setLocale value="vi_VI"/>
		<div id="page-wrapper" class="gray-bg">
			<!-- Import file header right -->
			<%@ include file="componentpage/header.jsp"%>
			<div class="row wrapper border-bottom white-bg page-heading">
				<div class="col-lg-10">
					<h2><spring:message code="label.uppercase.system" /></h2>
					<ol class="breadcrumb">
						<li class="active">
							<strong><spring:message code="label.lowercase.system" /></strong>
						</li>
					</ol>
				</div>
				<div class="col-lg-2"></div>
			</div>
			<!-- BODY -->
			<div class="wrapper wrapper-content animated fadeInRight">
				<div class="row">
					<div class="col-lg-6 col-md-6 fixheight">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<h5><spring:message code="label.user.manager" /></h5>
							</div>
							<div class="ibox-content" style="padding: 0 !important;">
								<table class="table dataTables-example">
									<thead>
										<sec:authorize url="/worklife/manager/user/view/redirectToUserPage.do">
											<tr>
												<th class="pad"><spring:message code="label.user.manager.user" /></th>
												<th>
													<a href="<c:url value='/worklife/manager/user/view/redirectToUserPage.do' />" role="button" class="btn btn-primary fl-r">Xem</a>
												</th>
											</tr>
										</sec:authorize>
										<sec:authorize url="/worklife/manager/group/redirectToGroupPage.do">
											<tr>
												<th class="pad"><spring:message code="label.user.manager.group" /></th>
												<th>
													<a href="<c:url value='/worklife/manager/group/redirectToGroupPage.do' />" role="button" class="btn btn-primary fl-r">Xem</a>
												</th>
											</tr>
										</sec:authorize>
									</thead>
								</table>
							</div>
						</div>
					</div>
					<div class="col-lg-6 col-md-6 fixheight">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<h5><spring:message code="label.permission.manager" /></h5>
							</div>
							<div class="ibox-content" style="padding: 0 !important;">
								<table class="table dataTables-example">
									<thead>
										<sec:authorize url="/worklife/manager/permission/redirectToPermissionPage.do">
										<tr>
											<th class="pad"><spring:message code="label.permission.manager.permission" /></th>
											<th>
												<a href="<c:url value='/worklife/manager/permission/redirectToPermissionPage.do' />" role="button" class="btn btn-primary fl-r">Xem</a>
											</th>
										</tr>
										</sec:authorize>
										<sec:authorize url="/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do">
											<tr>
												<th class="pad"><spring:message code="label.permission.manager.permissiongroup" /></th>
												<th>
													<a href="<c:url value='/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do' /> " role="button" class="btn btn-primary fl-r">Xem</a>
												</th>
											</tr>	
										</sec:authorize>	
										<sec:authorize url="/worklife/manager/role/redirectToRolePage.do">								
											<tr>
												<th class="pad"><spring:message code="label.permission.manager.rolegroup" /></th>
												<th>
													<a href="<c:url value='/worklife/manager/role/redirectToRolePage.do' />" role="button" class="btn btn-primary fl-r">Xem</a>
												</th>
											</tr>
										</sec:authorize>	
										<sec:authorize url="/worklife/manager/roleuser/redirectToRoleUserPage.do">	
											<tr>
												<th class="pad"><spring:message code="label.permission.manager.roleuser" /></th>
												<th>
													<a href="<c:url value='/worklife/manager/roleuser/redirectToRoleUserPage.do' />" role="button" class="btn btn-primary fl-r">Xem</a>
												</th>
											</tr>
										</sec:authorize>	
									</thead>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- FOOTER -->
			<%@ include file="componentpage/footer.jsp"%>
		</div>
	</div>
</body>
</html>