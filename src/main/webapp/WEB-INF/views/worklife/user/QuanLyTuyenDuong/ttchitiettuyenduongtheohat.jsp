<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>Thông tin chi tiết tuyến đường theo hạt</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
</head>
<body class="top-navigation">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="/WEB-INF/views/worklife/nav/topmenu.jsp" %>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>THÔNG TIN CHI TIẾT ĐƯỜNG THEO HẠT QUẢN LÝ</b></h3>
                </div>
                <div class="ibox-content">
                    <div class="row col-md-offset-3">
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <label>Hạt quản lý</label>
                                <select class="form-control" id="hatQuanLy"></select>
                            </div>
                            <div class="col-md-2">
                                <label>Loại đường</label>
                                <select class="form-control" id="loaiDuong"></select>
                            </div>
                            <div class="col-md-2">
                                <label>Tên đường</label>
                                <input type="text" class="form-control" id="tenDuong">
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-primary" id="btnTim" style="margin-top: 25px">
                                    <i class="fa fa-search"></i>&nbsp;Tìm
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <label>Danh sách đường</label>
                            <table class="table table-bordered table-hover" id="tableChiTietDuongTheoHat"
                                   style="width: 100%">
                                <thead>
                                <tr>
                                    <th class="text-center">TT</th>
                                    <th class="text-center">Hạt quản lý</th>
                                    <th class="text-center">Loại đường</th>
                                    <th class="text-center">Tên đường</th>
                                    <th class="text-center">Địa phận</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="ibox-content">
                    <form id="formChiTietTDTH">
                        <input type="hidden" name="iddh" id="iddh" value="${iddh eq null?-1:iddh}">
                        <input type="hidden" value="${startAt eq null?0:startAt}" id="startAt" />
                        <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                        <input type="hidden" id="group_Id" name="idGroup" value="${group_Id}">
                        <div class="row form-group">
                            <div class="col-md-12">
                                <div class="col-md-2">
                                    <label>Hạt quản lý</label>
                                    <select class="form-control" name="idGroup" id="idGroup" disabled></select>
                                </div>
                                <div class="col-md-2">
                                    <label>Loại đường</label>
                                    <select class="form-control" id="idLoaiDuong" disabled></select>
                                </div>
                                <div class="col-md-2">
                                    <label>Tên đường</label>
                                    <select class="form-control" id="idTuyenDuong" disabled></select>
                                </div>
                                <div class="col-md-3">
                                    <label>Địa danh: Điểm đầu</label>
                                    <input type="text" class="form-control" name="diaDanh_DiemDau" id="diaDanh_DiemDau">
                                </div>
                                <div class="col-md-3">
                                    <label>Điểm cuối</label>
                                    <input type="text" class="form-control" name="diaDanh_DiemCuoi"
                                           id="diaDanh_DiemCuoi">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <label>Danh sách lý trình</label>
                                <table class="table table-bordered table-hover" id="tableDSLyTrinh" style="width: 100%;margin-bottom: 0!important;">
                                    <thead>
                                    <tr style="display: none">
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                        <th class="text-center"></th>
                                    </tr>
                                    <tr>
                                        <th class="text-center" rowspan="2" style="min-width: 50px"><input
                                                type="checkbox" class="i-checks" id="checkAll"></th>
                                        <th class="text-center" rowspan="2" style="min-width: 50px">TT</th>
                                        <th class="text-center" colspan="4" style="min-width: 600px">Lý trình</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Chiều dài<br>(km)
                                        </th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Bề rộng nền<br>(m)
                                        </th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Bề rộng mặt<br>(m)
                                        </th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Kết cấu<br>mặt
                                            đường
                                        </th>
                                        <th class="text-center" rowspan="2" style="min-width: 170px">Cấp kỹ thuật<br>địa
                                            hình
                                        </th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Cấp quản lý</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Đánh giá<br>mặt
                                            đường
                                        </th>
                                        <th class="text-center" rowspan="2" style="min-width: 200px">Ghi chú</th>
                                    </tr>
                                    <tr>
                                        <th class="text-center" colspan="2">Từ km</th>
                                        <th class="text-center" colspan="2">Đến km</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                            <div class="col-md-12">
                                <button type="button" class="btn btn-xs btn-primary" id="btnAdd">
                                    <i class="fa fa-plus-square"></i>&nbsp;Thêm mới
                                </button>
                                <button type="button" class="btn btn-xs btn-primary" id="btnDelete">
                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="row text-right">
                        <div class="col-md-12">
                            <button type="button" class="btn btn-primary hidden" id="btnReport">
                                <i class="fa fa-file-excel-o"></i>&nbsp;Xuất excel
                            </button>
                            <button type="button" class="btn btn-primary" id="btnSave">
                                <i class="fa fa-save"></i>&nbsp;Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%--FOOTER--%>
        <%@ include file="/WEB-INF/views/worklife/nav/footer.jsp" %>
    </div>
</div>
</body>
<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js' />"></script>
<script type="text/javascript"
        src="<c:url value='/style/js/worklife/user/qltuyenduong/ttchitiettuyenduongtheohat.Form.js' />"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</html>
