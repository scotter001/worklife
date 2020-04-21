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
            <input type="hidden" id="iudMsg" name ="iudMsg" value="${iudMsg}">
			<div class="wrapper wrapper-content animated fadeInRight">
				<div class="ibox float-e-margins">
					<div class="ibox-title">
						<h4>LẬP DANH MỤC SỮA CHỮA ĐỊNH KỲ</h4>
					</div>
					<div class="ibox-content">
                        <input type="hidden" id="groupId" name="groupId" value="${worklifeUserVO.groupId}">
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
                                            <th class="text-center"><input type="checkbox" id="checkAllTD" class="i-checksTD"></th>
                                            <th class="text-center">Vị trí</th>
                                            <th class="text-center">Ngày sụ cố</th>
                                            <th class="text-center">Sữa chữa lần cuối</th>
                                            <th class="text-center">Tình trạng</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
					</div>
                    <div class="ibox-content">
                        <form id = "formDmScdk">
                            <h4>Lập danh mục sữa chữa định kỳ</h4>
                            <div class="row form-group">
                                <div class="col-md-2">
                                    <label>Năm</label>
                                    <select class="form-control" name="nam" id="selNamDmScdk">
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label>Hạng mục</label>
                                    <input type="text" class="form-control" name="hangMuc" id="hangMuc" >
                                </div>
                                <div class="col-md-4">
                                    <label>Tuyến đường/Công trình giao thông</label>
                                    <input type="text" class="form-control" name="tdCtgt" id="tdCtgt" disabled>
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
                                    </table>
                                </div>
                            </div>
                            <br>
                            <div class="row form-group">
                                <div class="col-md-2">
                                    <label>Kinh phí dự toán</label>
                                    <input type="text" class="form-control decimalNumber" name="kinhPhiDuToan" id="kinhPhiDuToan" >
                                </div>
                                <div class="col-md-2">
                                    <label>Nguồn vốn</label>
                                    <select class="form-control" name="nguonVon" id="selNguonVon" >
                                    </select>
                                </div>
                                <div class="col-md-2">
                                    <label>Tư vấn khảo sát lập dự toán</label>
                                    <select class="form-control" name="tuVanKsldt" id="selTuVanKsLdt" >
                                    </select>
                                </div>
                                <div class="col-md-2" style="margin-top: 25px;">
                                    <button type="button" class="btn btn-primary" id="btnSave">
                                        <i class="fa fa-save"></i>&nbsp;&nbsp;Lưu &nbsp;&nbsp;
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-md-12 ">
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
                                </table>
                            </div>
                        </div>
                    </div>
					<div class="ibox-content">
						<div class="row">
							<div class=" text-right col-md-12">
								<button type="button" class="btn btn-red" id="btnDelete">
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
    <script src="<c:url value='/style/js/worklife/user/suachuadinhky/lapdmscdk.Init.js'/>" type="text/javascript"></script>
	<script src="<c:url value='/style/js/worklife/user/suachuadinhky/lapdmscdk.Form.js'/>" type="text/javascript"></script>
</body>
</html>