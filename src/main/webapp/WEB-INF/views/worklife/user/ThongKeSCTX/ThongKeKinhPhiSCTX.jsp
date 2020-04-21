<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<title>THỐNG KÊ KINH PHÍ SỬA CHỮA THƯỜNG XUYÊN</title>
<%@ include file="/WEB-INF/views/jspf/head.jspf"%>
<%@ include file="/WEB-INF/views/jspf/css.jspf"%>

<link href="<c:url value='/style/css/others/inspinia/plugins/jasny/jasny-bootstrap.min.css' />" rel="stylesheet">
</head>
<body class="top-navigation">
	<div id="wrapper">
		<div id="page-wrapper" class="gray-bg">
			<!-- HEADER -->
		  	<%@ include file="../../nav/topmenu.jsp"%>
			<!-- BODY -->
			<div class="wrapper wrapper-content animated fadeInRight">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<h4>THỐNG KÊ KINH PHÍ SỬA CHỮA THƯỜNG XUYÊN</h4>
					</div>
					<div class="ibox-content detail">
						<form:form id="frmSearch">
							<div class="row form-group">
								<div class="col-md-offset-4 col-md-2">
									<label>Tiêu chí</label>
									<select class="form-control" id="tieuChi">
										<option value="1">Theo quý</option>
										<option value="2">Theo 5 năm</option>
									</select>
								</div>
								<div class="col-md-2 namClass" id="namId">
									<label>Năm</label>
									<input type="text" class="form-control onlyNumber" id="selNam" maxlength="4">
								</div>
								<div class="col-md-2 tuNamClass" id="tuNamId" style="display: none;">
									<label>Đến năm</label>
									<input type="text" class="form-control onlyNumber" maxlength="4" id="selYear">
								</div>
								<%--<div class="col-md-2" style="margin-top: 25px;">
									<button type="button" class="btn btn-primary" id="btnSearch">
										<i class="fa fa-search"></i>&nbsp;&nbsp;Xem&nbsp;&nbsp;
									</button>
								</div>--%>
							</div>
							<div class="row">
								<div class="col-md-12 namClass">
									<label>Danh sách hạng mục sửa chữa thường xuyên được duyệt</label>
									<table class="table table-bordered table-hover dataTable" id="tblQuy" style="width: 100%;">
										<thead>
											<tr>
												<th class="text-center">TT</th>
												<th class="text-center">Tên hạt quản lý giao thông</th>
												<th class="text-center">Quý I</th>
												<th class="text-center">Quý II</th>
												<th class="text-center">Quý III</th>
												<th class="text-center">Quý IV</th>
											</tr>
										</thead>
										<tbody>
										</tbody>
									</table>
								</div>
								<div class="col-md-12 tuNamClass">
									<table class="table table-bordered table-hover dataTable" id="tblFiveYear" style="width: 100%;display: none;">
										<thead>
											<tr>
												<th class="text-center">TT</th>
												<th class="text-center">Tên hạt quản lý giao thông</th>
											</tr>
										</thead>
										<tbody>
										</tbody>
									</table>
								</div>
							</div>
						</form:form>
					</div>
					<div class="ibox-content">
						<div class="row">
							<div class="text-right col-md-12">
								<button type="button" class="btn btn-primary" id="btnXuatBaoCaoQuy">
									<i class="fa fa-print"></i>&nbsp;&nbsp;Xuất excel &nbsp;&nbsp;
								</button>
								<button type="button" class="btn btn-primary" id="btnXuatBaoCaoNam" style="display: none">
									<i class="fa fa-print"></i>&nbsp;&nbsp;Xuất excel &nbsp;&nbsp;
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- FOOTER -->
			<%@ include file="../../nav/footer.jsp"%>
		</div>
	</div>
	<%@ include file="/WEB-INF/views/jspf/js.jspf"%>
	<%@ include file="/WEB-INF/views/jspf/file-language.jspf"%>
	<script src="<c:url value='/style/js/worklife/public/utils.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/worklife/user/thongke/tkkpsctx/tkkpsctx.Init.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/worklife/user/thongke/tkkpsctx/tkkpsctx.Form.js'/>" type="text/javascript"></script>
	<script type="text/javascript">
		let multiLanguage = {
			saveSuccessful 		: '<spring:message code="label.savesuccessfully"/>',
			saveFailed 			: '<spring:message code="label.savefailed"/>',
			accept 				: '<spring:message code="label.accept"/>',
			notify 				: '<spring:message code="label.notify"/>',
			cancel				: '<spring:message code="label.cancel"/>',
		};
		let url = "${pageContext.request.contextPath}";
	</script>
</body>
</html>