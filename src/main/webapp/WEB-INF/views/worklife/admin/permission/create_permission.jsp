<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tag"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="_csrf" content="${_csrf.token}"/>
	<meta name="_csrf_header" content="${_csrf.headerName}"/>
	<title><c:if test="${ title == 'update' }"><spring:message code="label.update" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.new" /></c:if> <spring:message code="label.permission" /></title>
	<!-- LIST SOURCE FILE CSS -->
	<link href="<c:url value='/style/css/others/inspinia/style.min.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.bootstrap.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.responsive.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.tableTools.min.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/worklife/admin/datatable/datatable_custom.css'/>" rel="stylesheet">
	<!-- CSS SELECTIZE -->
	<link href="<c:url value='/style/css/others/selectize/selectize.bootstrap3.css'/>" rel="stylesheet">
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
	<script src="<c:url value='/style/js/worklife/admin/manager_permission/create_permission.js'/>" type="text/javascript"></script>
	<!-- JS SELECTIZE -->
	<script src="<c:url value='/style/js/others/selectize/selectize.min.js'/>" type="text/javascript"></script>
	
	<link rel="shortcut icon" href="<c:url value="/style/images/worklife/worklife.ico" />" />
	
	<script type="text/javascript">
		var url = '${pageContext.request.contextPath}/';
		var multiLanguage = {
				permissionName 				: '<spring:message code="validate.permission.permissionname" />',
				permissionPattern			: '<spring:message code="validate.permission.permissionpattern" />',
				listPermissionNo			: '<spring:message code="validate.permission.listpermissionno" />',
				selectRoleGroupName			: '<spring:message code="validate.permission.selectrolegroupname" />',
				addcommobox			: '<spring:message code="label.addcommobox" />',
 		}
	</script>
</head>
<body>
	<div id="wrapper">
		<!-- LEFT MENU  -->
		<%@ include file="../componentpage/leftmenu.jsp"%>
		<!-- HEADER -->
		<input type="hidden" name="error" id="error" value="<c:out value="${ error }" />">
		<input type="hidden" name="success" id="success" value="<c:out value="${ success }"/>">
		<div id="page-wrapper" class="gray-bg">
			<!-- Import file header right -->
			<%@ include file="../componentpage/header.jsp"%>
			<div class="row wrapper border-bottom white-bg page-heading">
				<div class="col-lg-10">
					<h2><spring:message code="label.uppercase.system" /></h2>
					<ol class="breadcrumb">
						<li>
							<a href="<c:url value='/worklife/manager/admin/redirectAdminPage.do' />"> <spring:message code="label.lowercase.system" /></a>
						</li>
						<li>
							<a href="<c:url value='/worklife/manager/permission/redirectToPermissionPage.do' />"> <spring:message code="label.lowercase.managepermission" /></a>
						</li>
						<li class="active">
							<strong><c:if test="${ title == 'update' }"><spring:message code="label.update" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.new" /></c:if> <spring:message code="label.permission" /></strong>
						</li>
					</ol>
				</div>
				<div class="col-lg-2"></div>
			</div>
			<!-- BODY -->
			<div class="animated fadeInRight m-t p-b-lg">
				<form:form class="form" id="createRole" name="createRole" method="POST">
					<input type="hidden" name="pageNumber" id="pageNumber" />
					<div class="row animated fadeInRight">
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="row">
									<div class="col-lg-12">
										<div class="ibox float-e-margins" style="margin-bottom: 0px;">
											<div class="ibox-title">
												<h5><c:if test="${ title == 'update' }"><spring:message code="label.update" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.new" /></c:if> <spring:message code="label.permission" /></h5>
											</div>
											<div class="ibox-content">
												<div class="form-group">
													<div class="row">
														<div class="col-lg-5 col-md-5 m-b">
															<label><spring:message code="label.permissionname" /></label> 
															<label class="required">&nbsp;*</label>
															<input name="permissionName" id="permissionName" class="form-control" maxlength="255" value="<c:out value="${ permission.permissionName }" />" />
															<input type="hidden" name="permissionId" id="permissionId" value="<c:out value="${ permission.permissionId == '' || permission.permissionId == null ? '-1' : permission.permissionId }" />" />
														</div>
														<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
															<label><spring:message code="label.createat" /></label>
															<input class="form-control" disabled="disabled" value="<fmt:formatDate value="${ permission.createAt }" pattern="dd/MM/yyyy"/>" />
														</div>
													</div>
													<div class="row">
														<div class="col-lg-5 col-md-5 m-b">
															<label><spring:message code="label.permissionpattern" /></label>
															<label class="required">&nbsp;*</label>
															<input name="permissionPattern" id="permissionPattern" class="form-control" maxlength="255" value="<c:out value="${ permission.permissionPattern }" />" />
														</div>
														<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
															<label><spring:message code="label.updateat" /></label>
															<input class="form-control" disabled="disabled" value="<fmt:formatDate value="${ permission.updateAt }" pattern="dd/MM/yyyy"/>" />
														</div>
													</div>
													<div class="row">
														<div class="col-lg-5 col-md-5 m-b">
															<label><spring:message code="label.selectpermissiongroupname" /></label>
															<label class="required">&nbsp;*</label>
															<select id="selectRoleGroupName" name="selectRoleGroupName" class="form-control" required>
																<option></option>
																<c:forEach items="${ listPermissionGroupName }" var="permissionGroupName">
																	<option value="${ permissionGroupName.listPermissionNo }" <c:if test="${ permissionGroupName.listPermissionNo == permission.listPermissionNo }">selected="selected"</c:if>><c:out value="${ permissionGroupName.listPermissionName }" /></option>
																</c:forEach>
															</select>
															<input type="hidden" name="listPermissionName" id="listPermissionName" value="<c:out value="${ permission.listPermissionName }" />">
														</div>
														<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
															<label><spring:message code="label.permissiongroupno" /></label>
															<label class="required"></label>
															<input name="listPermissionNo" id="listPermissionNo" class="form-control" maxlength="4" value="${ permission.listPermissionNo }" readonly="readonly"/>
														</div>
													</div>
													<div class="row">
														<div class="col-lg-12 col-md-12">
															<label><spring:message code="label.description" /></label> 
															<textarea rows="5" cols="" name="permissionDescription" id="permissionDescription" class="form-control">${ permission.permissionDescription }</textarea>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- GROUP BUTTON -->
									<div class="col-lg-12">
										<div class="ibox float-e-margins">
											<div class="ibox-content" style="border: none;">
												<div class="form-group">
													<div class="row">
														<div class="col-lg-12 text-right m-b-lg">
															<c:if test="${ title == 'insert'}">
																<script type="text/javascript">
																	function PermissionInsert() {
																		if (!$('#createRole').valid())
																			return;
																		document.createRole.action = "<c:url value='/worklife/manager/permission/create/insertPermission.do' />";
																		document.createRole.submit();
																	}
																</script>
																<input type="button" class="btn btn-primary" onclick="PermissionInsert();" value="<spring:message code="label.new" />" />
															</c:if>
															<c:if test="${ title == 'update'}">
																<script type="text/javascript">
																	function PermissionUpdate() {
																		if (!$('#createRole').valid())
																			return;
																		document.createRole.action = "<c:url value='/worklife/manager/permission/create/updatePermission.do' />";
																		document.createRole.submit();
																	}
																	function PermissionDelete() {
																		document.createRole.action = "<c:url value='/worklife/manager/permission/create/deletePermission.do' />";
																		document.createRole.submit();
																	}
																</script>
																<input type="button" class="btn btn-primary" onclick="PermissionUpdate();" value="<spring:message code="label.update" />" />
																<input type="button" class="btn btn-primary btn-danger" data-toggle="modal" data-target="#deleteGroup" value="<spring:message code="label.delete" />" />
															</c:if>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form:form>
			</div>
			<!-- FOOTER -->
			<%@ include file="../componentpage/footer.jsp"%>
		</div>
	</div>
	<div class="modal inmodal fade" id="deleteGroup" tabindex="-1" role="dialog" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">
						<span aria-hidden="true">&times;</span><span class="sr-only"><spring:message code="label.close" /></span>
					</button>
					<h5 class="modal-title">
						<i class="fa fa-exclamation-triangle m-r" style="color: orange;"> <spring:message code="label.delete" /></i>
					</h5>
				</div>
				<div class="modal-body">
					<p class="f-s-20" id="md-content"><spring:message code="delete.group.confirmfix" /></p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-white" id="d-close" data-dismiss="modal"><spring:message code="label.close" /></button>
					<button type="button" class="btn btn-primary" id="d-accept" onclick="PermissionDelete();"><spring:message code="label.accept" /></button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>