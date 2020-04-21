<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>LỊCH SỬ SỬA CHỮA ĐỊNH KỲ</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <link href="<c:url value='/style/css/others/inspinia/plugins/jasny/jasny-bootstrap.min.css' />" rel="stylesheet">
</head>
<body class="top-navigation">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="../../nav/topmenu.jsp" %>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>LỊCH SỬ SỬA CHỮA ĐỊNH KỲ</b></h3>
                </div>
                <div class="ibox-content">
                    <div class="row top-buffer">
                        <div class="col-md-12 col-md-offset-2" style="margin-top: 20px">
                            <div class="col-md-2">
                                <label>Loại</label>
                                <select class="form-control" id="loai">
                                    <option value="-1"></option>
                                    <option value="1">Đường</option>
                                    <option value="2">Cầu</option>
                                    <option value="3">Thiết bị</option>
                                    <option value="4">Khác</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Tuyến đường/Cầu/Thiết bị/Công trình</label>
                                <select id="tenDuong" name="tenDuong" class="form-control"></select>
                            </div>
                            <div class="col-md-2">
                                <label>Từ năm</label>
                                <select id="selTuNam" name="selTuNam" type="text" class="form-control"></select>
                            </div>
                            <div class="col-md-2">
                                <label>Đến năm</label>
                                <select id="selDenNam" name="selDenNam" type="text" class="form-control"></select>
                            </div>
                            <div class="col-md-2">
                                <label class="lbhidden"></label>
                                <button type="button" class="btn btn-primary" id="btnSearch" name="btnSearch">
                                    <i class="fa fa-search"></i>&nbsp;&nbsp;Xem&nbsp;&nbsp;
                                </button>
                            </div>
                        </div>
                        <div class="col-md-12" style="margin-top: 20px">
                            <div class="col-md-12">
                                <label>Danh mục sửa chữa định kỳ</label>
                                <table id="tblLichSuDMSCDK" class="table table-bordered table-hover dataTable" style="width: 100%;">
                                    <thead>
                                    <tr>
                                        <th class="text-center" style="min-width: 50px">STT</th>
                                        <th class="text-center" style="min-width: 100px">Lý trình</th>
                                        <th class="text-center" style="min-width: 300px">Thuộc huyện/TP/TX</th>
                                        <th class="text-center" style="min-width: 150px">Thời gian thực hiện</th>
                                        <th class="text-center" style="min-width: 150px">Ngày hoàn thành</th>
                                        <th class="text-center" style="min-width: 150px">Giá phê duyệt</th>
                                        <th class="text-center" style="min-width: 150px">Nguồn vốn</th>
                                        <th class="text-center" style="min-width: 150px">Giá trúng thầu</th>
                                        <th class="text-center" style="min-width: 300px">Nhà thầu thi công</th>
                                        <th class="text-center" style="min-width: 150px">Tư vấn thiết kế</th>
                                        <th class="text-center" style="min-width: 150px">Tư vấn giám sát</th>
                                        <th class="text-center" style="min-width: 200px">Hiện trạng</th>
                                        <th class="text-center" style="min-width: 200px">Giải pháp sơ bộ</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            <button id="btnXuatExcel" type="button" class="btn btn-primary hidden" style="float: right;margin-left: 10px;margin-right: 20px">
                                <i class="fa fa-file-excel-o"></i>&nbsp;Xuất excel
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <!-- FOOTER -->
            <%@ include file="../../nav/footer.jsp" %>
        </div>
    </div>
</div>
<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
<script src="<c:url value='/style/js/worklife/public/utils.js'/>" type="text/javascript"></script>
<script src="<c:url value='/style/js/others/datepicker/moment.js'/>" type="text/javascript"></script>
<script src="<c:url value='/style/js/worklife/user/suachuadinhky/lichsuscdk.Init.js'/>" type="text/javascript"></script>
<script src="<c:url value='/style/js/worklife/user/suachuadinhky/lichsuscdk.Form.js'/>" type="text/javascript"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</body>
</html>