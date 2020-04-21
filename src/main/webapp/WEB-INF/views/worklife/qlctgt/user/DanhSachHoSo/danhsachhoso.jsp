<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>Danh sách hồ sơ</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
</head>
<body class="top-navigation">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="/WEB-INF/views/worklife/nav/topmenu_qlctgt.jsp" %>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>Danh sách hồ sơ</b></h3>
                </div>
                <div class="ibox-content">
                    <div class="row form-group">
                        <div class="col-md-12 col-md-offset-4">
                            <div class="col-md-2">
                                <label>Loại hồ sơ</label>
                                <select class="form-control" id="selLoaiHS"></select>
                            </div>
                            <div class="col-md-2">
                                <label>Trạng thái</label>
                                <select class="form-control" id="selTrangThai"></select>
                            </div>
                            <div class="col-md-1" style="top: 26px">
                                <button class="btn btn-primary" id="btnTim" type="button">
                                    <i class="fa fa-search"></i>&nbsp;Tìm
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="row form-group">
                        <div class="col-md-12">
                            <input type="hidden" id="group_Id" value="${group_Id}">
                            <input type="hidden" id="group_Name" value="${group_Name}">
                            <table class="table table-bordered table-hover dataTable" id="tableDanhSachHoSo"
                                   style="width: 100%;">
                                <thead>
                                <tr>
                                    <th class="text-center">TT</th>
                                    <th class="text-center">Số biên nhận</th>
                                    <th class="text-center">Loại hồ sơ</th>
                                    <th class="text-center">Tên đơn vị/doanh nghiệp</th>
                                    <th class="text-center">Địa chỉ</th>
                                    <th class="text-center">Ngày nhận</th>
                                    <th class="text-center">Ngày hẹn trả</th>
                                    <th class="text-center">Trạng thái</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div class="modal fade" id="khoiTaoHoSoModal" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="modal-content fadeIn">
                                <div class="modal-header">
                                    <div class="pull-left"><label class="col-lg control-label" style="float: left;">KHỞI
                                        TẠO HỒ SƠ</label></div>
                                    <div class="pull-right"><a class="close" data-dismiss="modal"
                                                               aria-label="Close">X</a></div>
                                </div>
                                <div class="modal-body">
                                    <form id="khoiTaoHoSoForm">
                                        <input type="hidden" name="idDMDN" id="idDMDN" value="-1">
                                        <input type="hidden" name="idCongTrinh" id="idCongTrinh" value="-1">
                                        <input type="hidden" id="isInsertSuccessfully" value="${message}"/>
                                        <input type="hidden" name="user_Nhan" id="user_Nhan" value="${user_Nhan}">
                                        <input type="hidden" name="user_FullName" id="user_FullName"
                                               value="${user_FullName}">
                                        <div class="row form-group">
                                            <div class="col-md-6">
                                                <label>Loại hồ sơ</label>
                                                <select class="form-control" name="idLoaiHoSo" id="idLoaiHoSo">
                                                </select>
                                            </div>
                                            <div class="col-md-2">
                                                <label>Số biên nhận</label>
                                                <input type="text" class="form-control" name="soBienNhan"
                                                       id="soBienNhan"/>
                                            </div>
                                            <div class="col-md-2">
                                                <label>Ngày nhận</label>
                                                <input type="text" class="form-control datepicker"
                                                       data-mask="99/99/9999" name="ngayNhan" id="ngayNhan"/>
                                            </div>
                                            <div class="col-md-2">
                                                <label>Ngày hẹn trả</label>
                                                <input type="text" class="form-control datepicker"
                                                       data-mask="99/99/9999" name="ngayHenTra" id="ngayHenTra"/>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-md-12">
                                                <a style="text-decoration: underline; color: #0000cc; display: none"
                                                   id="duLieuDN">Lấy dữ liệu doanh nghiệp</a>
                                                <a style="text-decoration: underline; color: #0000cc; display: none"
                                                   id="hoSoB1">Tìm hồ sơ bước 1</a>
                                            </div>
                                        </div>
                                        <div class="row form-group">
                                            <div class="col-md-6">
                                                <label>Tên đơn vị/doanh nghiệp</label>
                                                <input type="text" class="form-control" name="tenDoanhNghiep"
                                                       id="tenDoanhNghiep"/>
                                            </div>
                                            <div class="col-md-6">
                                                <label>Địa chỉ</label>
                                                <input type="text" class="form-control" name="diaChi_DN" id="diaChi_DN">
                                            </div>
                                        </div>
                                        <div class="row form-group hidden" id="ctrinh">
                                            <div class="col-md-12">
                                                <label>Tên công trình</label>
                                                <input type="text" class="form-control" name="tenCongTrinh"
                                                       id="tenCongTrinh">
                                            </div>
                                        </div>
                                    </form>
                                    <div class="row">
                                        <div class="col-md-12 text-right">
                                            <button class="btn btn-primary" type="button" id="btnTaoMoi">
                                                <i class="fa fa-plus"></i>
                                                &nbsp;Tạo mới
                                            </button>
                                            <button class="btn btn-primary" type="button" id="cBtnSave">
                                                <i class="fa fa-save"></i>
                                                &nbsp;Lưu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-content hidden" id="donViDNModal">
                                <div class="modal-header">
                                    <div class="pull-left"><label class="col-lg control-label" style="float: left;">DANH
                                        MỤC ĐƠN VỊ/DOANH NGHIỆP</label></div>
                                    <div class="pull-right"><a class="close closeModal">X</a></div>
                                </div>
                                <div class="modal-body">
                                    <div class="row form-group">
                                        <div class="col-md-12 col-md-offset-3">
                                            <div class="col-md-4">
                                                <label>Tên doanh nghiệp</label>
                                                <input type="text" class="form-control" id="sTenDoanhNghiep">
                                            </div>
                                            <div class="col-md-2" style="top: 26px;">
                                                <button type="button" class="btn btn-primary" id="sbtnTim">
                                                    <i class="fa fa-search"></i>&nbsp;Tìm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <form id="formDoanhNghiep">
                                        <div class="row form-group">
                                            <div class="col-md-12">
                                                <table class="table table-bordered table-hover dataTable"
                                                       id="tableDanhSachDN" style="width: 100%;">
                                                    <thead>
                                                    <tr>
                                                        <th class="text-center" style="min-width: 50px"><input
                                                                type="checkbox" class="i-checks" id="checkAll"></th>
                                                        <th class="text-center" style="min-width: 50px">TT</th>
                                                        <th class="text-center" style="min-width: 250px">Tên doanh
                                                            nghiệp
                                                        </th>
                                                        <th class="text-center" style="min-width: 350px">Địa chỉ</th>
                                                        <th class="text-center" style="min-width: 150px">Tên đại diện
                                                        </th>
                                                        <th class="text-center" style="min-width: 150px">Chức vụ</th>
                                                        <th class="text-center" style="min-width: 150px">Điện thoại</th>
                                                    </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>

                                    </form>
                                    <div class="row form-group">
                                        <div class="col-md-12">
                                            <button class="btn btn-xs btn-primary" type="button" id="btnAdd">
                                                <i class="fa fa-plus-square"></i>&nbsp;Thêm
                                            </button>
                                            <button class="btn btn-xs btn-primary" type="button" id="btnDelete">
                                                <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                            </button>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 text-right">
                                            <button class="btn btn-primary" type="button" id="btnNhanDN">
                                                &nbsp;Nhận
                                            </button>
                                            <button class="btn btn-primary" type="button" id="btnLuuDN">
                                                <i class="fa fa-save"></i>&nbsp;Lưu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-content hidden" id="DSHoSoBuoc1">
                                <div class="modal-header">
                                    <div class="pull-left"><label class="col-lg control-label" style="float: left;">DANH
                                        SÁCH HỒ SƠ BƯỚC 1</label></div>
                                    <div class="pull-right"><a class="close closeModal">X</a></div>
                                </div>
                                <div class="modal-body">
                                    <div class="row form-group">
                                        <div class="col-md-12">
                                            <div class="col-md-5">
                                                <label>Tên công trình</label>
                                                <input type="text" class="form-control" id="tenCT">
                                            </div>
                                            <div class="col-md-6">
                                                <label>Tên doanh nghiệp</label>
                                                <input type="text" class="form-control" id="tenDN">
                                            </div>
                                            <div class="col-md-1" style="top: 26px">
                                                <button type="button" class="btn btn-primary" id="btnSearch">
                                                    <i class="fa fa-search"></i>&nbsp;Tìm
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <form id="formHoSoBuoc1">
                                        <div class="row form-group">
                                            <div class="col-md-12">
                                                <table class="table table-bordered table-hover dataTable"
                                                       id="tableDanhSachHSBuoc1" style="width: 100%;">
                                                    <thead>
                                                    <tr>
                                                        <th class="text-center" style="min-width: 50px">TT</th>
                                                        <th class="text-center" style="min-width: 250px">Số biên nhận
                                                        </th>
                                                        <th class="text-center" style="min-width: 150px">Tên doanh
                                                            nghiệp
                                                        </th>
                                                        <th class="text-center" style="min-width: 350px">Địa chỉ</th>
                                                        <th class="text-center" style="min-width: 150px">Tên công
                                                            trình
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                </table>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="row">
                                        <div class="col-md-12 text-right">
                                            <button class="btn btn-primary" type="button" id="btnNhanHSB1">
                                                &nbsp;Nhận
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal inmodal" id="chuyenHoSoModal" tabindex="-1" role="dialog" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button aria-hidden="true" data-dismiss="modal" class="close" type="button">X</button>
                                    <h3>CHUYỂN HỒ SƠ</h3>
                                </div>
                                <div class="modal-body">
                                    <!-- CONTROL TOP -->
                                    <form id="chuyenHoSoForm">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Trạng thái</label>
                                                <select class="form-control" id="trangThai" name="trangThai">
                                                </select>
                                            </div>
                                            <div class="col-md-6">
                                                <label>Phòng ban</label>
                                                <input type="text" class="form-control" id="phongBan" readonly/>
                                            </div>
                                        </div>
                                        <div class="row m-t">
                                            <div class="col-md-12">
                                                <table class="table table-bordered table-hover dataTable no-footer" id="tableListUser">
                                                    <thead>
                                                    <tr>
                                                        <th class="text-center sorting_disabled" rowspan="1" colspan="1" style="width: 0px;">Tên người nhận</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                        <c:forEach items="${users}" var="user">
                                                            <tr class="text-center">
                                                                <td>
                                                                    <i class="fa fa-user" style="color:green"></i>
                                                                    <label>${user.realName}</label>
                                                                    <input type="hidden" value="${user.userId}" name="nhan_User"/>
                                                                    <input type="hidden" value="${user.realName}" name="nhan_FullName"/>
                                                                </td>
                                                            </tr>
                                                        </c:forEach>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <!-- THE END CONTROL TOP -->
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" id="cBtnChuyen" class="btn btn-primary">
                                        <i class="fa fa-mail-forward"></i>
                                        &nbsp;Chuyển
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button type="button" class="btn btn-primary" id="btnKhoiTaoHS" data-toggle="modal"
                                    data-target="#khoiTaoHoSoModal">
                                <i class="fa fa-plus"></i>&nbsp;Khởi tạo hồ sơ
                            </button>
                            <button type="button" class="btn btn-primary" id="xuLyHoSo">
                                <i class="fa fa-play"></i>&nbsp;Xử lý
                            </button>
                            <button type="button" class="btn btn-primary" id="btnChuyen" data-toggle="modal"
                                    <%--data-target="#chuyenHoSoModal"--%>>
                                <i class="fa fa-mail-forward"></i>&nbsp;Chuyển
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <%--FOOTER--%>
            <%@ include file="/WEB-INF/views/worklife/nav/footer.jsp" %>
        </div>
    </div>
</div>
</body>
<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
<script src="<c:url value='/style/js/others/datepicker/moment.js'/>" type="text/javascript"></script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js' />"></script>
<script type="text/javascript"
        src="<c:url value='/style/js/worklife/qlctgt/user/danhsachhoso/danhsachhoso.Form.js' />"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</html>
