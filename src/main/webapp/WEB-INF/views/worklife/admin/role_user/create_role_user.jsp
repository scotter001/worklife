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
	<title><spring:message code="label.update" /> <spring:message code="label.permission" /></title>
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
	<script src="<c:url value='/style/js/worklife/admin/manager_role_user/create_role_user.js'/>" type="text/javascript"></script>
	
	<link rel="shortcut icon" href="<c:url value="/style/images/worklife/worklife.ico" />" />
	
	<script type="text/javascript">
		var url = '${pageContext.request.contextPath}/';
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
							<a href="<c:url value='/worklife/manager/roleuser/redirectToRoleUserPage.do' />"><spring:message code="label.lowercase.administraterole" /></a>
						</li>
						<li class="active">
							<strong><spring:message code="label.update" /> <spring:message code="label.roleuser" /></strong>
						</li>
					</ol>
				</div>
				<div class="col-lg-2"></div>
			</div>
			<!-- BODY -->
			<div class="animated fadeInRight m-t p-b-lg">
				<form:form class="form" id="createRoleUser" name="createRoleUser" action="${pageContext.request.contextPath}/worklife/manager/roleuser/insertRoleUser.do" method="POST">
					<input type="hidden" name="pageNumber" id="pageNumber" />
					<input type="hidden" name="listRoleId" id="listRoleId" />
					<input type="hidden" value="${worklifeUserVO.userId == null ? -1 : worklifeUserVO.userId}" id="userId" name="userId">
					<div class="row animated fadeInRight">
						<div class="col-lg-12">
							<div class="ibox float-e-margins">
								<div class="ibox-content">
									<div class="form-group">
										<div class="row">
											<div class="col-lg-3 col-md-3 m-b">
												<img class="img-responsive md-margin-bottom-10 min-width" id="avatarProfile" src="<c:if test="${ worklifeUserVO.avatar == null || worklifeUserVO.avatar == ''}"><c:url value='/style/images/worklife/useredit.png'/></c:if><c:if test="${ worklifeUserVO.avatar != null && worklifeUserVO.avatar != ''}"><c:url value='/worklife/avatar/viewAvatar.do?imageName=${ worklifeUserVO.avatar }&userName=${ worklifeUserVO.username }'/></c:if>" alt="">
					                        </div>
			                            	<div class="col-lg-9 col-md-9 m-b">
                          						<div class="row">
                          							<div class="col-md-12 m-b">
									                    <label><spring:message code="label.username" /></label>
									                    <div class="input-group m-b">
														    <span class="input-group-addon"><i class="icon-append fa fa-user"></i></span>
														    <input tabindex="1" type="text" class="form-control" placeholder="Enter username" disabled="disabled" id="username" name="username" value="<c:out value="${worklifeUserVO.username}" />">
														</div>
													</div>
			                            		</div>
			                            		<div class="row">
													<div class="col-lg-12 col-md-12 m-b">
														 <label><spring:message code="label.register.name" /></label>
														 <input type="text" class="form-control" placeholder="Enter real name" disabled="disabled" id="realName" name="realName" value="<c:out value="${worklifeUserVO.realName}" />">
													</div>
												</div>
                          						<div class="row">
													<div class="col-lg-5 col-md-5 m-b">
									                     <label><spring:message code="label.register.email" /></label>
									                    <div class="input-group m-b">
														   <span class="input-group-addon"><i class="icon-append fa fa-envelope"></i></span>
														   <input tabindex="2" type="text" class="form-control" id="email" name="email" placeholder="Enter email" disabled="disabled" value="<c:out value="${worklifeUserVO.email}" />">
														</div>
													</div>
													<div class="col-lg-5 col-md-5 col-lg-push-2 col-md-push-2 m-b">
														<label><spring:message code="label.register.groupname" /></label><br/>
														<input type="hidden" name="groupId" id="groupId" value="${ worklifeUserVO.groupId == null || worklifeUserVO.groupId == '' ? '-1' : worklifeUserVO.groupId }">
														<input type="hidden" name="groupName" id="groupName" value="<c:out value="${ worklifeUserVO.group == null || worklifeUserVO.group.groupName == '' ? '' : worklifeUserVO.group.groupName }" />">
														<a class="btn btn-primary dropdown-toggle" id="listUserGroup" disabled="disabled">
															<span id="lblGroupName">${ worklifeUserVO.group == null || worklifeUserVO.group.groupName == '' ? 'Chọn nhóm người dùng' : worklifeUserVO.group.groupName }</span> <span class="caret"></span>
														</a>
													</div>
			                            		</div>
												<div class="row">
													<div class="col-lg-12 col-md-12 col-sm-12 text-right">
														<input type="button" class="btn btn-sm btn-primary text-right" onclick="submitForm()" value="<spring:message code='label.update' />" />
													</div>
												</div>
				                       		</div>
				                       	</div>
				                    </div>
								</div>
								<c:forEach var="role" items="${ listRole }">
									<div class="row">
										<div class="col-lg-12 mb">
											<div class="ibox float-e-margins" style="margin-bottom: 0px;">
												<div class="ibox-title">
													<div class="row">
														<div class="col-lg-6 col-md-6">
															<label style="font-weight: normal; font-size: 14px">
																<input type="checkbox" class="i-checks" <c:if test="${ role.roleStatus == 'Y' }">checked</c:if> name="checkRole" value="${ role.roleId }"> ${ role.roleName }
															</label>
														</div>
														<div class="col-lg-6 col-md-6">
															<div class="ibox-tools">
																<a class="collapse-link">
																	<i class="fa fa-chevron-up"></i>
																</a>
															</div>
														</div>
													</div>
												</div>
												<div class="ibox-content" >
													<p>${ role.roleDescription }</p>
												</div>
											</div>
										</div>
									</div>
								</c:forEach>
								<c:if test="${ fn:length(listRole) == 0 }">
									<div class="row">
										<div class="col-lg-12 col-md-12 mb">
											<div class="ibox-content" >
												<p>Không có nhóm quyền tương ứng, vui lòng thiết lập</p>
											</div>
										</div>
									</div>
								</c:if>
								<div class="row">
									<div class="col-lg-12 mb">
										<div class="ibox float-e-margins" style="margin-bottom: 0px;">
											<div class="ibox-title">
												<%-- <div class="row">
													<div class="col-lg-12 col-md-12 col-sm-12 text-right">
														<input type="button" class="btn btn-sm btn-primary text-right" onclick="submitForm()" value="<spring:message code='label.update' />" />
													</div>
												</div> --%>
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