<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<!-- LIST CSS BOOTSTRAP DÙNG CHUNG CHO TẤT CÀ CÁC TRANG -->
	<link href="<c:url value='/style/css/others/inspinia/bootstrap.min.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='/style/font-awesome/css/font-awesome.min.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='/style/css/others/inspinia/animate.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='/style/css/others/inspinia/style.min.css'/>" rel="stylesheet" type="text/css">
	<link href="<c:url value='/style/css/others/inspinia/plugins/sweetalert/sweetalert.css'/>" rel="stylesheet" type="text/css">
	<!-- Mainly scripts -->
	<script src="<c:url value='/style/js/others/inspinia/plugins/sweetalert/sweetalert.min.js'/>"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/validate/jquery.validate.min.js'/>"></script>
	<!-- Admin utility -->
	<script src="<c:url value='/style/js/worklife/admin/worklife_admin_util.js'/>"></script>
	<style type="text/css">
		#worklifeTopMenu .dropdown:hover .dropdown-menu {
		    display: block;
		    margin-top: 0;
		 }
	</style>
</head>
<body>
	<div class="row border-bottom white-bg m-b">
		<nav class="navbar navbar-static-top" role="navigation">
			<div class="navbar-header">
				<button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
					<i class="fa fa-reorder"></i>
				</button>
				<a class="navbar-brand">Worklife</a>
			</div>
			<div class="navbar-collapse collapse" id="worklifeTopMenu">
				<ul class="nav navbar-nav">
					<sec:authorize access="isAuthenticated()">
						<sec:authentication var="worklifeLoginUser" property="principal" />
						<li class="active">
							<a aria-expanded="false" role="button" href="<c:url value="/worklife/manager/user/modify/modifyUser.do?userId=${worklifeLoginUser.userId}" />"> ${worklifeLoginUser.realName == null || worklifeLoginUser.realName == '' ? worklifeLoginUser.username : worklifeLoginUser.realName}</a>
						</li>
					</sec:authorize>
					<sec:authorize access="!isAuthenticated()">
						<li class="active">
							<a aria-expanded="false" role="button" href="<c:url value='/login.do' />"> Anonymous</a>
						</li>
					</sec:authorize>
					<li class="dropdown">
						<a aria-expanded="false" role="button" href="#" class="dropdown-toggle" data-toggle="dropdown"> 
							<spring:message code="label.user.manager" />
							<span class="caret"></span>
						</a>
						<ul role="menu" class="dropdown-menu">
							<sec:authorize url="/worklife/manager/user/view/redirectToUserPage.do">
								<li>
									<a href="<c:url value='/worklife/manager/user/view/redirectToUserPage.do' />">
										<spring:message code="label.user.manager.user" />
									</a>
								</li>
							</sec:authorize>
							<sec:authorize url="/worklife/manager/group/redirectToGroupPage.do">
								<li>
									<a href="<c:url value='/worklife/manager/group/redirectToGroupPage.do' />">
										<spring:message code="label.user.manager.group" />
									</a>
								</li>
							</sec:authorize>
						</ul>
					</li>
					<li class="dropdown">
						<a aria-expanded="false" role="button" href="#" class="dropdown-toggle" data-toggle="dropdown"> 
							<spring:message code="label.permission.manager" /> 
							<span class="caret"></span>
						</a>
						<ul role="menu" class="dropdown-menu">
							<sec:authorize url="/worklife/manager/permission/redirectToPermissionPage.do">
								<li>
									<a href="<c:url value='/worklife/manager/permission/redirectToPermissionPage.do' />">
										<spring:message code="label.permission.manager.permission" />
									</a>
								</li>
							</sec:authorize>
							<sec:authorize url="/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do">
								<li>
									<a href="<c:url value='/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do' />">
										<spring:message code="label.permission.manager.permissiongroup" />
									</a>
								</li>
							</sec:authorize>
							<sec:authorize url="/worklife/manager/role/redirectToRolePage.do">
								<li>
									<a href="<c:url value='/worklife/manager/role/redirectToRolePage.do' />">
										<spring:message code="label.permission.manager.rolegroup" />
									</a>
								</li>
							</sec:authorize>
							<sec:authorize url="/worklife/manager/roleuser/redirectToRoleUserPage.do">
								<li>
									<a href="<c:url value='/worklife/manager/roleuser/redirectToRoleUserPage.do' />">
										<spring:message code="label.permission.manager.roleuser" />
									</a>
								</li>
							</sec:authorize>
						</ul>
					</li>
				</ul>
				<ul class="nav navbar-top-links navbar-right">
					<li>
						<sec:authorize access="isAuthenticated()">
							<a href="<c:url value='/logout.do' />"> 
								<i class="fa fa-sign-out"></i> Log out
							</a>
						</sec:authorize>
						<sec:authorize access="!isAuthenticated()">
							<a href="<c:url value='/login.do' />"> 
								<i class="fa fa-sign-out"></i> Log in
							</a>
						</sec:authorize>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</body>
</html>