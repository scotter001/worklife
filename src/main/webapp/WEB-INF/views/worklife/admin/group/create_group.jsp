<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib tagdir="/WEB-INF/tags" prefix="tag"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title><c:if test="${ title == 'update' }"><spring:message code="label.update" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.new" /></c:if> <spring:message code="label.group" /></title>
	<!-- LIST SOURCE FILE CSS -->
	<link href="<c:url value='/style/css/others/inspinia/style.min.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/dataTables/datatables.min.css'/>" rel="stylesheet">
	<link href="<c:url value='/style/css/others/inspinia/plugins/iCheck/custom.css' />" rel="stylesheet">
	<link href="<c:url value='/style/css/worklife/admin/datatable/datatable_custom.css'/>" rel="stylesheet">
	<!-- MULTI LEVEL DROPDOWNLIST -->
	<link href="<c:url value='/style/css/others/multidropdownlist/fg.menu.css'/>" rel="stylesheet">
	<!-- LIST JS LIB  -->
	<script src="<c:url value='/style/js/others/inspinia/jquery-2.1.1.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/bootstrap.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/slimscroll/jquery.slimscroll.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/pace/pace.min.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/others/inspinia/plugins/iCheck/icheck.min.js'/>" type="text/javascript"></script>
	<!-- LIST JS DATATABLE -->
	<script src="<c:url value='/style/js/others/inspinia/plugins/dataTables/datatables.min.js'/>" type="text/javascript"></script>
	<!-- MULTI LEVEL DROPDOWNLIST -->
	<script src="<c:url value='/style/js/others/multidropdownlist/fg.menu.js'/>" type="text/javascript"></script>

	<link rel="shortcut icon" href="<c:url value="/style/images/worklife/worklife.ico" />" />

	<style>
		.lbhidden {
			content: ".";
			display: list-item;
			visibility: hidden;
		}
	</style>

	<script type="text/javascript">
		var url = '${pageContext.request.contextPath}/';
        var rootPath = '${pageContext.request.contextPath}/';

        var multiLanguage = {
				groupName 					: '<spring:message code="label.vaidate.groupname" />',
				groupDescription			: '<spring:message code="label.validate.groupdescription" />',
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
							<a href="<c:url value='/worklife/manager/group/redirectToGroupPage.do' />"> <spring:message code="label.lowercase.administrategroup2" /></a>
						</li>
						<li class="active">
							<strong><c:if test="${ title == 'update' }"><spring:message code="label.update" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.new" /></c:if> <spring:message code="label.group2" /></strong>
						</li>
					</ol>
				</div>
				<div class="col-lg-2"></div>
			</div>
			<!-- BODY -->
			<div class="animated fadeInRight m-t p-b-lg">
				<form:form class="form" id="createGroup" name="createGroup" method="POST">
					<input type="hidden" name="pageNumber" id="pageNumber" />
					<input type="hidden" id="maHuyen" value="${ group.maHuyen }"/>
					<input type="hidden" id="maXa" value="${ group.maXa }"/>
					<input type="hidden" id="isDepartment" value="${ group.isDepartment }"/>
					<div class="row animated fadeInRight">
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="ibox-title">
									<h5><spring:message code="label.lowercase.managegroup2" /></h5>
								</div>
								<div class="row">
									<div class="col-lg-12">
										<div class="ibox float-e-margins" style="margin-bottom: 0px;">
											<div class="ibox-title">
												<h5><c:if test="${ title == 'update' }"><spring:message code="label.update" /></c:if><c:if test="${ title != 'update' }"><spring:message code="label.new" /></c:if> <spring:message code="label.group2" /></h5>
											</div>
											<div class="ibox-content">
												<div class="form-group">
													<div class="row">
														<div class="col-lg-5 col-md-5 m-b">
															<label><spring:message code="label.groupname" /></label> 
															<label class="required">&nbsp;*</label>
															<input name="groupName" id="groupName" maxlength="225" class="form-control" value="<c:out value='${ group.groupName }' />" />
															<input type="hidden" name="groupId" id="groupId" value="<c:out value="${ group.groupId == '' || group.groupId == null ? '-1' : group.groupId }" />" />
														</div>
														<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
															<label><spring:message code="label.createat" /></label>
															<input name="createAt" id="createAt" class="form-control" disabled="disabled" value="<fmt:formatDate value="${ group.createAt }" pattern="dd/MM/yyyy"/>" />
														</div>
													</div>
													<div class="row">
														<div class="col-lg-5 col-md-5 m-b">
															<label><spring:message code="label.abbreviation" /></label>
															<input name="abbreviation" id="abbreviation" maxlength="100" class="form-control" value="<c:out value="${ group.abbreviation }" />" />
														</div>
														<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
															<label><spring:message code="label.updateat" /></label>
															<input name="createAt" id="createAt" class="form-control" disabled="disabled" value="<fmt:formatDate value="${ group.updateAt }" pattern="dd/MM/yyyy"/>" />
														</div>
													</div>
													<div class="row">
														<div class="col-lg-5 col-md-5 m-b">
															<label><spring:message code="label.parentgroupname3" /></label><br/>
															<input type="hidden" name="parentId" id="parentId" value="<c:out value="${ group.parentId == null || group.parentId == '' ? '-1' : group.parentId }" />">
															<a href="#news-items-2" class="btn btn-primary dropdown-toggle" id="listParentGroup">
																<span id="lblParentName"><c:out value="${ group.parentName == null || group.parentName == '' ? 'Chọn bộ phận cha' : group.parentName }"/></span> <span class="caret"></span>
															</a>
															<div id="news-items-2" class="hidden">
																<ul>
																	<li role="menuitem" class="">
																		<a href="#" id="-1" class="ui-corner-all" tabindex="-1">Không nhóm cha</a>
																	</li>
																	<c:forEach var="child" items="${ listGroup }">
																		<tag:parent_group list="${ child }" listParentId="${ parentId }"></tag:parent_group>
																	</c:forEach>
																</ul>
															</div>
														</div>
													</div>
													<div class="row m-b">
														<div class="col-md-2 text-center">
															<label class="col-lg control-label lbhidden"></label>
															<label>
																<input type="checkbox" class="i-checks" value="-1" id="chkVSATTP">
																VSATTP
															</label>
														</div>
														<div class="col-md-2">
															<label>Cấp</label>
															<select id="txtDepartment" name="isDepartment" class="form-control" disabled="disabled">
																<option value="-1"></option>
																<option value="1">Cấp chi cục</option>
																<option value="2">Cấp huyện</option>
																<option value="3">Cấp xã</option>
															</select>
														</div>
														<div class="col-lg-4 col-md-3 m-b">
															<label>Huyện</label>
															<select name="maHuyen" id="lstHuyen" class="form-control" disabled="disabled">
																<option value="-1"></option>
															</select>
														</div>
														<div class="col-lg-4 col-md-3 m-b">
															<label>Xã</label>
															<select name="maXa" id="lstPhuongXa" class="form-control" disabled="disabled"></select>
														</div>
													</div>
													<div class="row">
														<div class="col-lg-12 col-md-12">
															<label><spring:message code="label.description" /></label> 
															<label class="required">&nbsp;*</label>
															<textarea rows="5" cols="" name="groupDescription" id="groupDescription" class="form-control">${ group.groupDescription }</textarea>
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
																	function GroupInsert() {
																		if (!$('#createGroup').valid())
																			return;
																		document.createGroup.action = "<c:url value='/worklife/manager/group/create/insertGroup.do' />";
																		document.createGroup.submit();
																	}
																</script>
																<input type="button" class="btn btn-primary" onclick="GroupInsert();" value="<spring:message code="label.new" />" />
															</c:if>
															<c:if test="${ title == 'update'}">
																<script type="text/javascript">
																	function GroupUpdate() {
																		if (!$('#createGroup').valid())
																			return;
																		document.createGroup.action = "<c:url value='/worklife/manager/group/create/updateGroup.do' />";
																		document.createGroup.submit();
																	}
																	function GroupDelete() {
																		document.createGroup.action = "<c:url value='/worklife/manager/group/create/deleteGroup.do' />";
																		document.createGroup.submit();
																	}
																</script>
																<input type="button" class="btn btn-primary" onclick="GroupUpdate();" value="<spring:message code="label.update" />" />
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
					<p class="f-s-20" id="md-content"><spring:message code="delete.group.confirmgroup" /></p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-white" id="d-close" data-dismiss="modal"><spring:message code="label.close" /></button>
					<button type="button" class="btn btn-primary" id="d-accept" onclick="GroupDelete();"><spring:message code="label.accept" /></button>
				</div>
			</div>
		</div>
	</div>
	<script src="<c:url value='/style/js/worklife/admin/manager_group/create_group.js'/>" type="text/javascript"></script>
</body>
</html>