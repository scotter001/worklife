<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%--
  ~ Copyright (c) 2018.
  ~ Author : Phat Thinh
  --%>

<!DOCTYPE html>
<html>
<head>
<title>TRA CỨU SỬA CHỮA THƯỜNG XUYÊN</title>
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
						<h4>TRA CỨU SỬA CHỮA THƯỜNG XUYÊN</h4>
					</div>
					<div class="ibox-content">
                        <div id = "queryConditions" class="row form-group">
                            <div class="col-md-2" id="divTieuChiTraCuu">
                                <label>Tiêu chí tra cứu</label>
                                <select class="form-control" id="selTieuChi" name="selTieuChi" >
                                    <option value="1">Theo thời gian</option>
                                    <option value="2">Theo tuyến đường</option>
                                </select>
                            </div>
                            <div class="col-md-1 tieuchi_1">
                                <label>Quý*</label>
                                <select class="form-control " id="selQuy" name="selQuy" >
                                    <option value="1">Quý I</option>
                                    <option value="2">Quý II</option>
                                    <option value="3">Quý III</option>
                                    <option value="4">Quý IV</option>
                                </select>
                            </div>
                            <div class="col-md-1 tieuchi_1" >
                                <label>Năm*</label>
                                <select class="form-control" id="selNam" name="selNam">
                                </select>
                            </div>
                            <div class="col-md-3 tieuchi_1">
                                <label>Hạt quản lý giao thông</label>
                                <select class="form-control" id="selGroup" name="selGroup">
                                    <c:forEach var = "item" items="${worklifeGroup}" >
                                        <option value="${item.groupId}">${item.groupName}</option>
                                    </c:forEach>
                                </select>
                            </div>
                            <div class="col-md-2 tieuchi_2">
                                <label>Tên tuyến đường</label>
                                <select class="form-control" id="idTuyenDuong" name="idTuyenDuong">
                                </select>
                            </div>
                            <div class="col-md-1 tieuchi_2">
                                <label>Từ năm</label>
                                <input type="text" class="form-control onlynumber" id="tuNam" name="tuNam">
                            </div>
                            <div class="col-md-1" style="margin-top: 25px;">
                                <button type="button" class="btn btn-primary" id="btnTraCuu">
                                    <i class="fa fa-search"></i>&nbsp;&nbsp;Xem&nbsp;&nbsp;
                                </button>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-12">
                                <label>Danh sách tuyến đường sữa chữa thường xuyên</label>
                                <table class="table table-bordered table-hover dataTable" id="dmSctxTable" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th class="text-center">TT</th>
                                            <th class="text-center">Tuyến đường</th>
                                            <th class="text-center">Lý trình</th>
                                            <th class="text-center">Nội dung công việc</th>
                                            <th class="text-center">Khối lượng</th>
                                            <th class="text-center">Thời gian thực hiện</th>
                                            <th class="text-center">Ngày kiểm tra</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
					</div>
					<div class="ibox-content" id="detailDmSctxTable">
						<br>
                        <div class="row form-group">
                            <div class="col-md-3">
                                <label>Tên tuyến đường</label>
                                <input type="text" class="form-control" name ="suCoVo.tenDuong" id="tenDuong">
                            </div>
                            <div class="col-md-2">
                                <label>Lý trình</label>
                                <input type="text" class="form-control" id="lyTrinh">
                            </div>
                            <div class="col-md-2">
                                <label>Hạt quản lý</label>
                                <input type="text" class="form-control" id="tenHatQL">
                            </div>
                            <div class="col-md-1">
                                <label>ĐVT</label>
                                <input type="text" class="form-control" id="tenDVT">
                            </div>
                            <div class="col-md-2">
                                <label>Khối lượng</label>
                                <input type="text" class="form-control decimalNumber" name ="klDuyet_Tong" id="klDuyet_Tong">
                            </div>
                            <div class="col-md-2">
                                <label>Kinh phí phê duyệt</label>
                                <input type="text" class="form-control decimalNumber" name ="kinhPhi" id="kinhPhi">
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Nội dung công việc</label>
                                <textarea class="form-control" rows="3" name ="noiDungSuaChua" id="noiDungSuaChua"></textarea>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-2">
                                <label>Kế hoạch thực hiện</label>
                                <input type="text" class="form-control" name ="keHoach_TH" id="keHoach_TH">
                            </div>
                            <div class="col-md-2">
                                <label>Thời gian thực hiện</label>
                                <input type="text" class="form-control" name ="thoiGian_TH" id="thoiGian_TH">
                            </div>
                            <div class="col-md-2">
                                <label>Kiểm tra ngày</label>
                                <input type="text" class="form-control" name ="ngayKT" id="ngayKT">
                            </div>
                            <div class="col-md-2">
                                <label>Người kiểm tra</label>
                                <input type="text" class="form-control" id="nguoiKT">
                            </div>
                            <div class="col-md-2" style="top: 22px">
                                <div class="checkbox checkbox-primary">
                                    <input id="daTH" type="checkbox">
                                    <label for="daTH">
                                        Đã thực hiện
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-2" style="top: 22px">
                                <div class="checkbox checkbox-primary">
                                    <input id="chuaTH" type="checkbox">
                                    <label for="chuaTH">
                                        Chưa thực hiện
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Ghi chú</label>
                                <textarea class="form-control" rows="3" name ="ghiChu_TH" id="ghiChu_TH"></textarea>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-12">
                                <label>Ý kiến nhận xét và đánh giá</label>
                                <textarea class="form-control" rows="3" name ="danhGia" id="danhGia"></textarea>
                            </div>
                        </div>
					</div>
					<div class="ibox-content">
						<div class="row">
							<div class=" text-right col-md-12">
								<button type="button" class="btn btn-primary" id="btnExportDmSctxTableToExcel">
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
    <script src="<c:url value='/style/js/others/datepicker/moment.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/worklife/user/sctx/tracuusctx.Init.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/worklife/user/sctx/tracuusctx.Form.js'/>" type="text/javascript"></script>
	<script type="text/javascript">
		var multiLanguage = {
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