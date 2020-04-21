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
<title>LẬP DANH MỤC SỮA CHỮA ĐỊNH KỲ</title>
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
						<h4>LẬP DANH MỤC SỮA CHỮA ĐỊNH KỲ</h4>
					</div>
					<div class="ibox-content">
                        <h4>Danh sách các công trình sự cố</h4>
                        <div class="row form-group">
                            <div class="col-md-2">
                                <label>Năm</label>
                                <select class="form-control" id="selNamDsCtsc" name="selNamDsCtsc" >
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Tuyến đường</label>
                                <select class="form-control" id="selTuyenDuong" name="selTuyenDuong">
                                    <option value="1">Phan Đình Gót</option>
                                    <option value="2">Phan Văn Thuận</option>
                                    <option value="3">Hoàng Hoa Thám</option>
                                </select>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-12">
                                <label>Danh sách tuyến đường và công trình sự cố</label>
                                <table class="table table-bordered table-hover dataTable" id="dmCtscTable" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Chọn</th>
                                            <th class="text-center">Vị trí</th>
                                            <th class="text-center">Ngày sụ cố</th>
                                            <th class="text-center">Sữa chữa lần cuối</th>
                                            <th class="text-center">Tình trạng</th>
                                        </tr>
                                    </thead>
                                   <%-- <tbody>
                                        <tr>
                                            <td class="text-center">1</td>
                                            <td class="text-center">Km 100 + 1 - 132 + 2</td>
                                            <td class="text-center">20/10/2016</td>
                                            <td class="text-center">20/05/2018</td>
                                            <td class="text-center">Hoàn thành</td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">2</td>
                                            <td class="text-center">Km 102 - 102</td>
                                            <td class="text-center">21/5/2018</td>
                                            <td class="text-center"></td>
                                            <td class="text-center">Đang sửa chữa</td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">3</td>
                                            <td class="text-center">Km 120 + 1 - 152 + 92</td>
                                            <td class="text-center">25/12/2014</td>
                                            <td class="text-center">20/08/2018</td>
                                            <td class="text-center">Hoàn thành</td>
                                        </tr>
                                    </tbody>--%>
                                </table>
                            </div>
                        </div>
					</div>
                    <div class="ibox-content">
                        <h4>Lập danh mục sữa chữa định kỳ</h4>
                        <div class="row form-group">
                            <div class="col-md-2">
                                <label>Năm</label>
                                <select class="form-control" name="selNamDmScdk" id="selNamDmScdk">

                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Hạng mục</label>
                                <input type="text" class="form-control" name="hangMuc" id="hangMuc" >
                            </div>
                            <div class="col-md-4">
                                <label>Tuyến đường/Công trình giao thông</label>
                                <input type="text" class="form-control" name="tdCtgt" id="tdCtgt" >
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-12">
                                <label>Danh sách vị trí tuyến đường và công trình sự cố</label>
                                <table class="table table-bordered table-hover dataTable" id="dmVttdCtscTable" style="width: 100%;">
                                    <thead>
                                    <tr>
                                        <th class="text-center">TT</th>
                                        <th class="text-center">Vị trí</th>
                                        <th class="text-center">Trái/phải</th>
                                        <th class="text-center">Ngày sự cố</th>
                                        <th class="text-center">Địa điểm</th>
                                        <th class="text-center">Sửa chữa lần cuối</th>
                                        <th class="text-center">Tình trạng</th>
                                    </tr>
                                    </thead>
                                    <%--<tbody>
                                        <tr>
                                            <td class="text-center">1</td>
                                            <td class="text-center">Km 101 - 1001</td>
                                            <td class="text-center">Trái</td>
                                            <td class="text-center">20/05/2018</td>
                                            <td class="text-center">25/7 Hoàng hoa Thám, P13, Quận 1</td>
                                            <td class="text-center">20/08/2018</td>
                                            <td class="text-center">Hoàn thành</td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">2</td>
                                            <td class="text-center">Km 101-101</td>
                                            <td class="text-center">Phải</td>
                                            <td class="text-center">21/10/2018</td>
                                            <td class="text-center">110 Phan Văn Thuận, P2, Quận 11</td>
                                            <td class="text-center">20/05/2018</td>
                                            <td class="text-center">Đang sửa chữa </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">3</td>
                                            <td class="text-center">Km 102-102</td>
                                            <td class="text-center">Trái + Phải</td>
                                            <td class="text-center">22/10/2018</td>
                                            <td class="text-center">95 Ngô tất tố, P9, Quận Tân Bình</td>
                                            <td class="text-center">25/10/2018</td>
                                            <td class="text-center">Đã hoàn thành</td>
                                        </tr>
                                    </tbody>--%>
                                </table>
                            </div>
                        </div>
                        <br>
                        <div class="row form-group">
                            <div class="col-md-2">
                                <label>Kinh phí dự toán</label>
                                <input type="text" class="form-control" name="kpDuToan" id="kpDuToan" >
                            </div>
                            <div class="col-md-2">
                                <label>Nguồn vốn</label>
                                <select class="form-control" name="selNguonVon" id="selNguonVon" >
                                    <option value="1">Đầu tư</option>
                                    <option value="2">Huy Động</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Tư vấn khảo sát lập dự toán</label>
                                <select class="form-control" name="selTuVanKsLdt" id="selTuVanKsLdt" >
                                    <option value="1">Giá vật tư</option>
                                    <option value="2">Giá vật liệu</option>
                                    <option value="3">Tiền lương nhân công</option>
                                </select>
                            </div>
                            <div class="col-md-2" style="margin-top: 25px;">
                                <button type="button" class="btn btn-primary" id="btnSave">
                                    <i class="fa fa-save"></i>&nbsp;&nbsp;Lưu &nbsp;&nbsp;
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-md-12">
                                <label>Danh mục sửa chữa định kỳ</label>
                                <table class="table table-bordered table-hover dataTable" id="dmScdkTable" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th class="text-center">TT</th>
                                            <th class="text-center">Tên công trình</th>
                                            <th class="text-center">Lý trình</th>
                                            <th class="text-center">Địa điểm</th>
                                            <th class="text-center">Kinh phí dự toán</th>
                                            <th class="text-center">Nguồn vốn</th>
                                            <th class="text-center">Tư vấn khảo sát lập dự toán</th>
                                        </tr>
                                    </thead>
                                  <%--  <tbody>
                                        <tr>
                                            <td class="text-center">1</td>
                                            <td class="text-center">Công trình 1</td>
                                            <td class="text-center">Km 10 + 10 - Km 20 + 20</td>
                                            <td class="text-center">25/7 Hoàng hoa Thám, P13, Quận 1</td>
                                            <td class="text-center">100,000,000 </td>
                                            <td class="text-center">Đầu tư</td>
                                            <td class="text-center">Giá vật tư</td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">2</td>
                                            <td class="text-center">Công trình 2</td>
                                            <td class="text-center">Km 101 + 101 - Km 201 + 201</td>
                                            <td class="text-center">95 Ngô tất tố, P9, Quận Tân Bình</td>
                                            <td class="text-center">200,000,000</td>
                                            <td class="text-center">Huy Động</td>
                                            <td class="text-center">Tiền lương nhân công</td>
                                        </tr>
                                        <tr>
                                            <td class="text-center">3</td>
                                            <td class="text-center">Công trình 3</td>
                                            <td class="text-center">Km 103 + 103 - Km 203 + 203</td>
                                            <td class="text-center">110 Phan Văn Thuận, P2, Quận 11</td>
                                            <td class="text-center">300,000,000</td>
                                            <td class="text-center">Đầu tư</td>
                                            <td class="text-center">Tiền lương nhân công</td>
                                        </tr>
                                    </tbody>--%>
                                </table>
                            </div>
                        </div>
                    </div>
					<div class="ibox-content">
						<div class="row">
							<div class=" text-right col-md-12">
								<button type="button" class="btn btn-outline btn-red" id="btnDelete">
									<i class="fa fa-trash-o"></i>&nbsp;&nbsp;Xóa &nbsp;&nbsp;
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
	<script src="<c:url value='/style/js/worklife/user/prototype/lapDmScdk.Init.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/worklife/user/prototype/lapDmScdk.Form.js'/>" type="text/javascript"></script>
	<script type="text/javascript">
		var multiLanguage = {
			saveSuccessful 		: '<spring:message code="label.savesuccessfully"/>',
			saveFailed 			: '<spring:message code="label.savefailed"/>',
			accept 				: '<spring:message code="label.accept"/>',
			notify 				: '<spring:message code="label.notify"/>',
			cancel				: '<spring:message code="label.cancel"/>',
		};
	</script>
</body>
</html>