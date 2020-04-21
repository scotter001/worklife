<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tag"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="_csrf" content="${_csrf.token}"/>
	<meta name="_csrf_header" content="${_csrf.headerName}"/>
	<title><c:if test="${ title == 'update' }"><spring:message code="label.update" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.new" /></c:if> <spring:message code="lable.rolegroup" /></title>
	<!-- LIST SOURCE FILE CSS -->
	<link href="<c:url value='/style/css/others/inspinia/style.min.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.bootstrap.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.responsive.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/dataTables.tableTools.min.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/worklife/admin/datatable/datatable_custom.css'/>" rel="stylesheet">
	<!-- MULTI LEVEL DROPDOWNLIST -->
	<link href="<c:url value='/style/css/others/multidropdownlist/fg.menu.css'/>" rel="stylesheet">
	<!-- ICHECK -->
	<link href="<c:url value='/style/css/others/inspinia/plugins/iCheck/custom.css'/>" rel="stylesheet">
	
	<link rel="stylesheet" href="<c:url value='/style/css/others/inspinia/plugins/sweetalert/sweetalert.css'/>"  type="text/css">
	
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
	<!-- MULTI LEVEL DROPDOWNLIST -->
	<script src="<c:url value='/style/js/others/inspinia/plugins/iCheck/icheck.min.js'/>" type="text/javascript"></script>
	<!-- ICHECK -->
	<script src="<c:url value='/style/js/others/multidropdownlist/fg.menu.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/worklife/admin/manager_role_group/create_role_group.js'/>" type="text/javascript"></script>
	
	<script type="text/javascript" src="<c:url value='/style/js/others/inspinia/plugins/sweetalert/sweetalert.min.js'/>"></script>
	
	<link rel="shortcut icon" href="<c:url value="/style/images/worklife/worklife.ico" />" />
	
	<script type="text/javascript">
		var url = '${pageContext.request.contextPath}/';
		var multiLanguage = {
				name 				: '<spring:message code="validate.rolegroup.name" />',
				code				: '<spring:message code="validate.rolegroup.code" />',
				description			: '<spring:message code="validate.rolegroup.description" />',
				notify					: '<spring:message code="label.notify"/>',
				accept					: '<spring:message code="label.accept"/>',
				exsit					: '<spring:message code="validate.rolegroup.code.exsit"/>',
 		}
	</script>
	
	<style type="text/css">
		.div-bordered {
		    border: 1px solid #E4E3E3;
		    padding: 8px;
		    margin-bottom: 15px;
		}
		
		.hrTitle {
		    margin: 8px -9px;
		    border: 0 !important;
		    border-top: 1px solid #E4E3E3 !important;
		}
		
		.hrContent {
		    margin: 8px -9px;
		    border: 0 !important;
		    border-top: 1px solid #eee!important;
		}
		
		.icheckbox_square-green, .iradio_square-green {
		    margin-right: 20px;
		}
	</style>
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
							<a href="<c:url value='/worklife/manager/admin/redirectAdminPage.do' />"><spring:message code="label.lowercase.system" /></a>
						</li>
						<li>
							<a href="<c:url value='/worklife/manager/role/redirectToRolePage.do' />"><spring:message code="label.lowercase.managerole2" /></a>
						</li>
						<li class="active">
							<strong><c:if test="${ title == 'update' }"><spring:message code="label.update" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.new" /></c:if> <spring:message code="lable.rolegroup" /></strong>
						</li>
					</ol>
				</div>
				<div class="col-lg-2"></div>
			</div>
			<!-- BODY -->
			<div class="animated fadeInRight m-t p-b-lg">
				<form:form class="form" id="createGroupRole" name="createGroupRole" action="${pageContext.request.contextPath}/worklife/manager/role/create/insertRoleGroup.do" method="POST">
					<input type="hidden" name="pageNumber" id="pageNumber" />
					<input type="hidden" name="permissionId" id="permissionId" />
					<div class="row animated fadeInRight">
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="ibox-title">
									<h5><c:if test="${ title == 'update' }"><spring:message code="label.lowercase.managerole4" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.lowercase.managerole3" /></c:if></h5>
								</div>
								<div class="row">
									<div class="col-lg-12">
										<div class="ibox float-e-margins" style="margin-bottom: 0px;">
											<div class="ibox-title">
												<div class="row">
													<div class="col-lg-2 col-md-2 col-sm-2 m-b">
														<label class="mgT"><spring:message code="label.groupname" /></label>
													</div>
													<div class="col-lg-5 col-md-5 col-sm-5 m-b">
														<input type="text" class="form-control" value="<c:out value="${ group.groupName }" />" disabled="disabled">
														<input type="hidden" name="groupId" id="groupId" value="${ group.groupId }"/>
														<input type="hidden" name="groupName" id="groupName" value="<c:out value="${ group.groupName }" />"/>
													</div>
													<div class="col-lg-5 col-md-5 col-sm-5 m-b text-right">
														<input type="button" class="btn btn-sm btn-primary text-right" onclick="submitForm()" value="<c:if test="${ title == 'update' }"><spring:message code="label.update" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.new" /></c:if>" />
													</div>
												</div>
											</div>
											<div class="ibox-content" >
												<div class="form-group">
													<div class="row">
														<div class="col-lg-5 col-md-5 m-b">
																<label><spring:message code="label.rolegroup.name" /></label> 
																<label class="required">&nbsp;*</label>
																<input name="roleName" id="roleName" maxlength="255" class="form-control" value="<c:out value="${ role.roleName }" />" />
															<input type="hidden" name="roleId" id="roleId" value="${ role.roleId == null || role.roleId == '' ? -1 : role.roleId }"/>
															</div>
															<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
																<label><spring:message code="label.rolegroup.code" /></label>
																<label class="required">&nbsp;*</label>
																<input name="roleCode" id="roleCode" maxlength="20" ${ role.roleId == null || role.roleId == '' ? '' : 'disabled="disabled"' } style="text-transform: uppercase;" class="form-control" value="${ role.roleCode }" />
															</div>
													</div>
													<div class="row">
														<div class="col-lg-12 col-md-12">
															<label><spring:message code="label.description" /></label> 
															<label class="required">&nbsp;*</label>
															<textarea rows="5" cols="" name="roleDescription" id="roleDescription" class="form-control">${ role.roleDescription }</textarea>
														</div>
													</div>
												</div>
											</div>
											<div class="ibox-content">
												<div class="form-group">
													<div class="row">
														<div class="col-lg-12">
															<c:forEach items="${ listResult }" var="item" varStatus="index">
																<div class="div-bordered" id="div${ index.index }">
																	<div class="row" id="contentFile">
																		<div class="col-xs-12">
																			<input type="checkbox" class="i-checks" name="checkAll" id="checkAll_div${ index.index }"/> 
																			<label>${ item.listPermissionName }</label>
																		</div>
																	</div>
																	<hr class="hrTitle" />
																	<c:set value="0" var="count"></c:set>
																	<c:forEach items="${ item.arrWorklifePermission }" varStatus="status">
																		<div class="row">
																			<c:if test="${ item.arrWorklifePermission[status.index + count] != null }">
																				<div class="col-sm-6 m-b-15 m-b">
																					<input type="checkbox" <c:if test="${ item.arrWorklifePermission[status.index + count].permissionStatus == 'Y' }">checked</c:if> value="<c:out value="${ item.arrWorklifePermission[status.index + count].permissionId }"/>" class="i-checks" />
																					${ item.arrWorklifePermission[status.index + count].permissionName }
																				</div>
																			</c:if>
																			<c:set value="${ count + 1 }" var="count"></c:set>
																			<c:if test="${ item.arrWorklifePermission[status.index + count] != null }">
																				<div class="col-sm-6 m-b-15 m-b">
																					<input type="checkbox" <c:if test="${ item.arrWorklifePermission[status.index + count].permissionStatus == 'Y' }">checked</c:if> value="<c:out value="${ item.arrWorklifePermission[status.index + count].permissionId }"/>" class="i-checks" />
																					${ item.arrWorklifePermission[status.index + count].permissionName }
																				</div>
																			</c:if>
																		</div>
																	</c:forEach>
																</div>
															</c:forEach>
														</div>
													</div>
													<div class="row">
														<%-- <div class="col-lg-12 col-md-12 col-sm-12 m-b text-right">
															<input type="button" class="btn btn-sm btn-primary text-right" onclick="submitForm()" value="<spring:message code='label.update' />" />
														</div> --%>
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
</body>
</html>