<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.DmTuyenDuongTheoHatImpl" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.TuyenDuongHatVO" %>
<%@ page import="java.util.List" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<!DOCTYPE html>
<html>
<head>
<title>NHẬP KẾT QUẢ SỬA CHỮA THƯỜNG XUYÊN</title>
<%@ include file="/WEB-INF/views/jspf/head.jspf"%>
<%@ include file="/WEB-INF/views/jspf/css.jspf"%>
<link href="<c:url value='/style/css/others/inspinia/plugins/jasny/jasny-bootstrap.min.css' />" rel="stylesheet">
	<script type="text/javascript">
		<%
        try{
         DmTuyenDuongTheoHatImpl bean = vn.worklife.utils.BeanUtil.getBean(DmTuyenDuongTheoHatImpl.class);
         List<TuyenDuongHatVO> lstTD =  bean.selectListTuyenDuong();
         ObjectMapper objectMapper = new ObjectMapper();
         out.write("let listIdTuyenDuong = ");
         out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD));
         out.write(";");
         }catch (Exception e){
            e.printStackTrace();
         }
        %>
	</script>
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
						<h4>NHẬP KẾT QUẢ SỬA CHỮA THƯỜNG XUYÊN</h4>
					</div>
					<div class="ibox-content detail">
						<form:form id="frmSuaChuaThuongXuyen">
							<div class="row form-group">
								<div class="col-md-offset-3 col-md-2">
									<label>Quý</label>
									<select class="form-control" id="selPeriod">
										<option value="1" ${quarter eq 1 ? "selected" : ""}>Quý I</option>
										<option value="2" ${quarter eq 2 ? "selected" : ""}>Quý II</option>
										<option value="3" ${quarter eq 3 ? "selected" : ""}>Quý III</option>
										<option value="4" ${quarter eq 4 ? "selected" : ""}>Quý IV</option>
									</select>
								</div>
								<div class="col-md-2">
									<label>Năm</label>
									<select class="form-control" id="selYear">
										<option value="${year}">${year}</option>
										<option value="${year + 1}">${year + 1}</option>
									</select>
								</div>
								<div class="col-md-2">
									<label>Tình trạng</label>
									<select class="form-control" id="selStatus">
										<option value="-1"></option>
										<option value="1">Đã thực hiện</option>
										<option value="2">Chưa thực hiện</option>
									</select>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<label>Kế hoạch hạng mục sửa chữa thường xuyên</label>
									<input type="hidden" id="group_Id" name="idGroup" value="${group_Id}">
									<input type="hidden" id="isInsertSuccessfully" value="${message}" />
									<table class="table table-bordered table-hover dataTable" id="tblHMSCTX" style="width: 100%;">
										<thead>
											<tr>
												<th class="text-center">TT</th>
												<th class="text-center">Tuyến đường</th>
												<th class="text-center">Lý trình</th>
												<th class="text-center">Nội dung công việc</th>
												<th class="text-center">Khối lượng</th>
												<th class="text-center">Kế hoạch thực hiện</th>
												<th class="text-center">Thời gian thực hiện</th>
												<th class="text-center">Ghi chú</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
						</form:form>
					</div>
					<div class="ibox-content">
						<div class="row">
							<div class="text-right col-md-12">
								<button type="button" class="btn btn-primary" id="btnView">
									<i class="fa fa-print"></i>&nbsp;&nbsp;Xuất excel &nbsp;&nbsp;
								</button>
								<button type="button" class="btn btn-primary" id="btnSave">
									<i class="fa fa-save"></i>&nbsp;&nbsp;Lưu&nbsp;&nbsp;
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
	<%--<script src="<c:url value='/style/js/worklife/user/sctx_thuchien/sctx.Init.js'/>" type="text/javascript"></script>--%>
	<script src="<c:url value='/style/js/worklife/user/sctx_thuchien/sctx.Form.js'/>" type="text/javascript"></script>
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