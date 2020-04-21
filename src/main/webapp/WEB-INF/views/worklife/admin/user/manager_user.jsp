<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
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
	<link rel="stylesheet" href="<c:url value='/style/css/others/inspinia/plugins/sweetalert/sweetalert.css'/>"  type="text/css">
	<!-- ICHECK -->
	<link href="<c:url value='/style/css/others/inspinia/plugins/iCheck/custom.css'/>" rel="stylesheet">
	
	<!-- LIST JS LIB  -->
	<script src="<c:url value='/style/js/others/inspinia/jquery-2.1.1.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/bootstrap.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/slimscroll/jquery.slimscroll.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/pace/pace.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/iCheck/icheck.min.js'/>" type="text/javascript"></script>
	<!-- LIST JS DATATABLE -->
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/jquery.dataTables.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/dataTables.bootstrap.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/dataTables.responsive.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/dataTables.tableTools.min.js'/>" type="text/javascript"></script>	
	<script src="<c:url value='/style/js/worklife/admin/manager_user/manager_user.js'/>" type="text/javascript"></script>	
	
	<script type="text/javascript" src="<c:url value='/style/js/others/inspinia/plugins/sweetalert/sweetalert.min.js'/>"></script>
	
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
 		var notify	= '<spring:message code="label.notify"/>';
 		var accept	= '<spring:message code="label.accept"/>';
 		var cancel	= '<spring:message code="label.cancel"/>';
 		var askdelete = '<spring:message code="label.delete.askuser"/>';
 		var deleteok = '<spring:message code="label.delete.ok"/>';
 		var deletefalse = '<spring:message code="label.delete.false"/>';
 		var nochangeuser = '<spring:message code="label.delete.nochangeuser"/>';
	</script>
</head>
<body>
	<div id="wrapper">
		<!-- HEADER -->
		<%@ include file="../componentpage/leftmenu.jsp"%>
		<input type="hidden" name="error" id="error" value="${ error }">
		<input type="hidden" name="success" id="success" value="${ success }">
		<div id="page-wrapper" class="gray-bg">
			<!-- Import file header right -->
			<%@ include file="../componentpage/header.jsp"%>
			<div class="row wrapper border-bottom white-bg page-heading">
				<input type="hidden" id="activePage" value="CV03XemCongViec" />
				<div class="col-lg-10">
					<h2><spring:message code="label.uppercase.system" /></h2>
					<ol class="breadcrumb">
						<li>
							<a href="<c:url value='/worklife/manager/admin/redirectAdminPage.do' />"><spring:message code="label.lowercase.system" /></a>
						</li>
						<li class="active">
							<strong><spring:message code="label.lowercase.administrateuser" /></strong>
						</li>
					</ol>
				</div>
				<div class="col-lg-2"></div>
			</div>
			<!-- BODY -->
			<div class="wrapper wrapper-content animated fadeInRight">
				<form class="form" action="${pageContext.request.contextPath}/worklife/manager/user/create/createUser.do" id="userManager" name="userManager" method="GET">
					<input type="hidden" name="pageNumber" id="pageNumber"/>
					<div class="row">
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="ibox-title">
									<h5><spring:message code="label.lowercase.managegroup" /></h5>
									<div class="ibox-tools mgt7" style="margin-top: -7px;">
										<button type="button" class="btn btn-danger btn-sm" id="deleteuser">
											<i class="fa fa-times">&nbsp;<spring:message code="label.delete" /></i>
										</button>
										<button type="submit" class="btn btn-white btn-sm" id="newAdmin" onclick="createAdmin()">
											<i class="fa fa-plus">&nbsp;<spring:message code="label.newAdmin" /></i>
										</button>
										<button type="submit" class="btn btn-white btn-sm">
											<i class="fa fa-plus">&nbsp;<spring:message code="label.new" /></i>
										</button>
									</div>
								</div>
								<div class="ibox-content">
									<div class="form-group">
										<div class="row">
											<div class="col-lg-12 col-md-12">
												<table class="table table-bordered dataTables-example" id="tableUserList" style="width: 100%">
													<thead>
														<tr>
															<th style="width: 5%; padding-right: 0px !important;"><spring:message code="label.number" /></th>
															<th style="width: 20%" class="text-center"><spring:message code="label.uppercase.user" /></th>
															<th style="width: 30%" class="text-center"><spring:message code="label.register.email" /></th>
															<th style="width: 35%" class="text-center"><spring:message code="label.groupname" /></th>
															<th style="width: 10%" class="text-center"><spring:message code="label.isadmin" /></th>
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