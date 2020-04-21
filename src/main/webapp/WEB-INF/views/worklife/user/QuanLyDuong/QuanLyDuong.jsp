<%@ page import="vn.worklife.user.util.FileFactory" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>QUẢN LÝ TUYẾN ĐƯỜNG</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <link href="<c:url value='/style/css/others/inspinia/plugins/ladda/ladda-themeless.min.css' />" rel="stylesheet">
</head>
<body class="top-navigation" class="pace-done">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="/WEB-INF/views/worklife/nav/topmenu.jsp" %>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>QUẢN LÝ TUYẾN ĐƯỜNG</b></h3>
                </div>
                <div class="ibox-content" id="searchContainer">
                    <div class="row" style="margin-top: 10px">
                        <div class="col-md-2 col-md-offset-5">
                            <label>Loại đường</label>
                            <select id="selStreetType" name="chooseStreetType" class="form-control disableForm"></select>
                        </div>
                        <div class="col-md-4">
                            <label class="lbhidden"></label>
                            <button type="button" class="btn btn-primary" id="btnSearch"><i class="fa fa-search"></i>&nbsp;Tìm</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 table-responsive">
                            <label>Danh sách tuyến đường</label>
                            <table id="tblTuyenDuong" class="table table-bordered table-hover" style="width: 100%;">
                                <thead>
                                <tr>
                                    <th class="text-center">STT</th>
                                    <th class="text-center">Loại đường</th>
                                    <th class="text-center">Tên đường</th>
                                    <th class="text-center">Cấp kỹ thuật</th>
                                    <th class="text-center">Điểm đầu</th>
                                    <th class="text-center">Điểm cuối</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        <%--<div class="col-md-12" style="margin-top: 20px">
                            <div>
                                <button id="btnThemTuyenDuong" type="button" class="btn btn-primary" style="float: right"><i class="fa fa-plus"></i>&nbsp;Thêm mới</button>
                            </div>
                        </div>--%>
                    </div>
                </div>
                <%-- TAB --%>
                <div class="ibox-content" id="inputContainer">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="tabs-container">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a data-toggle="tab" href="#tab-1">Thông tin đường</a></li>
                                    <li><a data-toggle="tab" href="#tab-2">Cầu</a></li>
                                    <li><a data-toggle="tab" href="#tab-3">Đèn tín hiệu/Biển báo</a></li>
                                    <li><a data-toggle="tab" href="#tab-4">Bảo trì/Bảo dưỡng</a></li>
                                </ul>
                                <div class="tab-content">
                                    <div id="tab-1" class="tab-pane active">
                                        <form id="frmThongTinDuong">
                                            <input type="hidden" id="idTuyenDuong" name="idTuyenDuong" value="-1">
                                            <div class="row top-buffer">
                                                <div class="col-md-12" style="margin-top: 20px">
                                                    <div class="col-md-2">
                                                        <label class="control-label">Loại đường</label>
                                                        <select id="idLoaiDuong" name="idLoaiDuong" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Tên đường</label>
                                                        <input id="tenDuong" name="tenDuong" type="text" class="form-control">
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Địa danh: Điểm đầu</label>
                                                        <select id="maHuyenDiemDau" name="maHuyenDiemDau" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">&nbsp;</label>
                                                        <select id="maXaDiemDau" name="maXaDiemDau" class="form-control" disabled="disabled"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Điểm cuối</label>
                                                        <select id="maHuyenDiemCuoi" name="maHuyenDiemCuoi" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="lbhidden"></label>
                                                        <select id="maXaDiemCuoi" name="maXaDiemCuoi" class="form-control" disabled="disabled"></select>
                                                    </div>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 20px">
                                                    <div class="col-md-2">
                                                        <label>Lý trình điểm đầu</label>
                                                        <div>
                                                            <input id="lyTrinhKmDiemDau" name="lyTrinhKmDiemDau" type="text" class="form-control valid" placeholder="Km" style="float: left; width: 35% !important">
                                                            <input type="text" class="form-control text-center" value="+" style="border-left-style:hidden;border-right-style:hidden ;float: left; width: 20% !important" readonly="">
                                                            <input id="lyTrinhMDiemDau" name="lyTrinhMDiemDau" type="text" class="form-control valid" placeholder="M" style="float: left; width: 45% !important">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Điểm cuối</label>
                                                        <div>
                                                            <input id="lyTrinhKmDiemCuoi" name="lyTrinhKmDiemCuoi" type="text" class="form-control valid" placeholder="Km" style="float: left; width: 35% !important">
                                                            <input type="text" class="form-control text-center" value="+" style="border-left-style:hidden;border-right-style:hidden ;float: left; width: 20% !important" readonly="">
                                                            <input id="lyTrinhMDiemCuoi" name="lyTrinhMDiemCuoi" type="text" class="form-control valid" placeholder="M" style="float: left; width: 45% !important">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Chiều dài (Km)</label>
                                                        <input id="chieuDai" name="chieuDai" type="text" class="form-control decimalNumber"/>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Bề rộng: Nền (m)</label>
                                                        <input id="rongNen" name="rongNen" type="text" class="form-control decimalNumber"/>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Mặt đường (m)</label>
                                                        <input id="rongMatDuong" name="rongMatDuong" type="text" class="form-control decimalNumber"/>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Kết cấu mặt đường</label>
                                                        <select id="ketCauMatDg" name="ketCauMatDg" class="form-control"></select>
                                                    </div>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 20px">
                                                    <div class="col-md-4">
                                                        <label class="control-label">Cấp kỹ thuật</label>
                                                        <div>
                                                            <select id="loaiDiaHinh" type="text" name="loaiDiaHinh" class="form-control" style="float: left; width: 80% !important"></select>
                                                            <select id="capKt" name="capKt" type="text" class="form-control valid" style="border-left-style:hidden;float: left; width: 20% !important"></select>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <label class="control-label">Đơn vị quản lý</label>
                                                        <select id="donViQl" name="donViQl" type="text" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Cấp quản lý</label>
                                                        <select id="capQl" name="capQl" type="text" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Tình trạng</label>
                                                        <select id="tinhTrang" name="tinhTrang" type="text" class="form-control"></select>
                                                    </div>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 20px">
                                                    <div class="col-md-12">
                                                        <label class="control-label">Ghi chú</label>
                                                        <textarea id="ghiChu" name="ghiChu" type="text" class="form-control" rows="3"></textarea>
                                                    </div>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 40px">
                                                    <div class="col-md-8 col-md-offset-2" style="padding-left: 10px;padding-right: 10px">
                                                        <label class="control-label">Tài liệu đính kèm</label>
                                                        <table class="table table-bordered table-hover dataTable" id="tableFileDinhKem" role="grid">
                                                            <thead>
                                                            <tr role="row">
                                                                <th><input type="checkbox" class="file-ichecks" id="checkAllFile"></th>
                                                                <th>STT</th>
                                                                <th>Tên tài liệu</th>
                                                                <th>Kèm file</th>
                                                                <th><i class="fa fa-download"></i></th>
                                                            </tr>
                                                            </thead>
                                                        </table>
                                                    </div>
                                                    <div class="col-md-8 col-md-offset-2">
                                                        <button id="addFile" class="btn btn-xs btn-primary"><i class="fa fa-plus"></i> &nbsp;&nbsp;Thêm</button>
                                                        <button id="deleteFile" class="btn btn-xs btn-primary"><i class="fa fa-trash-o"></i> &nbsp;&nbsp;Xóa</button>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-md-12" style="margin-top: 40px">
                                                <div class="col-md-12 text-right">
                                                    <button type="button" style="margin-right: 8px" class="btn btn-primary" id="btnAddTuyenDuong"><i class="fa fa-plus"></i>&nbsp;Thêm mới</button>
                                                    <button type="button" class="btn btn-primary" id="btnSaveTuyenDuong"><i class="fa fa-save"></i>&nbsp;Lưu</button>&nbsp;
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div id="tab-2" class="tab-pane">
                                        <form id="fromInputBridgeInfo">
                                            <input type="hidden" id="idCau" name="idCau" value="-1">
                                            <div class="row top-buffer">
                                                <div class="col-md-12 table-responsive" style="margin-top: 30px">
                                                    <div class="col-md-12">
                                                        <label>Danh sách cầu</label>
                                                        <table id="tableBridge" class="table table-bordered table-hover" style="width: 100%">
                                                            <thead>
                                                            <tr>
                                                                <th class="text-center">STT</th>
                                                                <th class="text-center">Tên cầu</th>
                                                                <th class="text-center">Tên đường</th>
                                                                <th class="text-center">Lý trình</th>
                                                                <th class="text-center">Vi trí (Kinh độ)</th>
                                                                <th class="text-center">Vị trí (Vĩ độ)</th>
                                                            </tr>
                                                            </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 30px;margin-left: 10px">
                                                    <label>THÔNG TIN CHUNG</label>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 15px">
                                                    <div class="col-md-2">
                                                        <label class="control-label">Loại cầu</label>
                                                        <select id="loaiCau" name="loaiCau" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Tên cầu</label>
                                                        <input id="tenCau" name="tenCau" type="text" class="form-control"/>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Tên đường</label>
                                                        <select id="idTuyenDuongCau" name="idTuyenDuongCau" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Lý trình cầu</label>
                                                        <div>
                                                            <input id="lyTrinhKm" name="lyTrinhKm" type="text" class="form-control" placeholder="Km" style="float: left; width: 35% !important">
                                                            <input type="text" class="form-control" value="+" style="text-align: center;border-left-style:hidden;border-right-style:hidden ;float: left; width: 20% !important" readonly="">
                                                            <input id="lyTrinhM" name="lyTrinhM" type="text" class="form-control" style="float: left; width: 45% !important" placeholder="M">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Vị trí: Kinh độ</label>
                                                        <input id="kinhDo" name="kinhDo" type="text" class="form-control decimalNumber"/>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Vĩ độ</label>
                                                        <input id="viDo" name="viDo" type="text" class="form-control decimalNumber"/>
                                                    </div>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 20px">
                                                    <div class="col-md-2">
                                                        <label class="control-label">Huyện/TP</label>
                                                        <select id="maHuyenCau" name="maHuyenCau" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Phường/Xã</label>
                                                        <select id="maXaCau" name="maXaCau" class="form-control" disabled="disabled"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Đối tượng vượt</label>
                                                        <select id="doiTuongVuot" name="doiTuongVuot" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Chạy chung với</label>
                                                        <select id="chayChungVoi" name="chayChungVoi" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Dạng kết cấu nhịp</label>
                                                        <select id="ketCauNhip" name="ketCauNhip" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Vật liệu/Đặc điểm KCNC</label>
                                                        <select id="vatLieuNhipChinh" name="vatLieuNhipChinh" class="form-control"></select>
                                                    </div>
                                                </div>

                                                <div class="col-md-12" style="margin-top: 20px">
                                                    <div class="col-md-2">
                                                        <label class="control-label">Biển hạn chế tải trọng</label>
                                                        <select id="bienHanChe" name="bienHanChe" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Tải trọng xe (tấn)</label>
                                                        <input id="taiTrong" name="taiTrong" type="text" class="form-control" disabled="disabled">
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Xe thân liền</label>
                                                        <input id="xeThanLien" name="xeThanLien" type="text" class="form-control" disabled="disabled">
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Xe sơ mi rơ moóc</label>
                                                        <input id="xeSoMiRoMooc" name="xeSoMiRoMooc" type="text" class="form-control" disabled="disabled">
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Xe kéo rơ moóc</label>
                                                        <input id="xeKeoRoMooc" name="xeKeoRoMooc" type="text" class="form-control" disabled="disabled">
                                                    </div>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 30px;margin-left: 10px">
                                                    <label>THÔNG TIN</label>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 15px">
                                                    <div class="col-md-4">
                                                        <label class="control-label">Kết cấu chống va xô</label>
                                                        <select id="chongVaXo" name="chongVaXo" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <label class="control-label">BClav</label>
                                                        <select id="bClav" name="bClav" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <label class="control-label">Tình trạng</label>
                                                        <input type="text" id="bClavTT" name="bClavTT" class="form-control">
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Mô tả</label>
                                                        <input id="bClavMT" name="bClavMT" type="text" class="form-control"/>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <label class="control-label">BClcrit</label>
                                                        <select id="bClcrit" name="bClcrit" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-1">
                                                        <label class="control-label">Tình trạng</label>
                                                        <input type="text" id="bClcritTT" name="bClcritTT" class="form-control" readonly>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Mô tả</label>
                                                        <input id="bClcritMT" name="bClcritMT" type="text" class="form-control" readonly>
                                                    </div>
                                                </div>
                                                <div class="col-md-8 col-md-offset-2 table-responsive" style="margin-top: 40px;padding-left: 10px;padding-right: 10px">
                                                    <div class="col-md-12">
                                                        <table id="tblThongTinCau" class="table table-bordered table-hover" style="width: 100%;">
                                                            <thead>
                                                            <tr>
                                                                <th><input type="checkbox" class="file-ichecks" id="checkAllInformation"></th>
                                                                <th class="text-center">STT</th>
                                                                <th class="text-center">Nội dung</th>
                                                                <th class="text-center">ĐVT</th>
                                                                <th class="text-center">Số liệu</th>
                                                            </tr>
                                                            </thead>
                                                        </table>
                                                        <button id="btnAddInfoCau" class="btn btn-xs btn-primary"><i class="fa fa-plus"></i> &nbsp;&nbsp;Thêm
                                                        </button>
                                                        <button id="btnDelInfoCau" class="btn btn-xs btn-primary"><i class="fa fa-trash-o"></i> &nbsp;&nbsp;Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12" style="margin-top: 40px">
                                                <div class="col-md-12 text-right">
                                                    <button type="button" style="margin-right: 8px" class="btn btn-primary" id="btnAddCau"><i class="fa fa-plus"></i>&nbsp;Thêm mới
                                                    </button>
                                                    <button type="button" class="btn btn-primary" id="btnSaveCau"><i class="fa fa-save"></i>&nbsp;Lưu
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div id="tab-3" class="tab-pane">
                                        <form id="formBienBao">
                                            <input type="hidden" id="idBbdth" name="idBbdth" value="-1">
                                            <div class="row top-buffer">
                                                <div class="col-md-12 table-responsive" style="margin-top: 30px;">
                                                    <div class="col-md-12">
                                                        <label>Danh sách công trình thiết bị thuộc đường</label>
                                                        <table id="tableBienBao" class="table table-bordered table-hover" style="width: 100%;">
                                                            <thead>
                                                            <tr>
                                                                <th class="text-center">STT</th>
                                                                <th class="text-center">Tên công trình/Thiết bị</th>
                                                                <th class="text-center">Lý trình</th>
                                                                <th class="text-center">Thuộc đường</th>
                                                                <th class="text-center">Vị trí (Kinh độ)</th>
                                                                <th class="text-center">Vị trí (Vĩ độ)</th>
                                                            </tr>
                                                            </thead>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 30px;margin-left: 10px">
                                                    <label>THÔNG TIN CHUNG</label>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 15px">
                                                    <div class="col-md-2">
                                                        <label class="control-label">Tên CT/Thiết bị</label>
                                                        <input id="tenBbdth" name="tenBbdth" type="text" class="form-control">
                                                    </div>

                                                    <div class="col-md-2">
                                                        <label class="control-label">Lý trình (Km + M)</label>
                                                        <div>
                                                            <input id="lyTrinhKmBbdth" name="lyTrinhKmBbdth" type="text" class="form-control valid" placeholder="Km" style="float: left; width: 45% !important">
                                                            <input type="text" class="form-control valid" value="+" style="text-align: center;border-left-style:hidden;border-right-style:hidden ;float: left; width: 20% !important" readonly="">
                                                            <input id="lyTrinhMBbdth" name="lyTrinhMBbdth" type="text" class="form-control valid" style="float: left; width: 35% !important" placeholder="M">
                                                        </div>
                                                    </div>

                                                    <div class="col-md-1">
                                                        <label class="control-label">Kinh độ</label>
                                                        <input id="kinhDoBbdth" name="kinhDoBbdth" type="text" class="form-control decimalNumber">
                                                    </div>

                                                    <div class="col-md-1">
                                                        <label class="control-label">Vĩ độ</label>
                                                        <input id="viDoBbdth" name="viDoBbdth" type="text" class="form-control decimalNumber">
                                                    </div>

                                                    <div class="col-md-2">
                                                        <label class="control-label">Thuộc đường</label>
                                                        <select id="idTuyenDuongBbdth" name="idTuyenDuongBbdth" type="text" class="form-control"></select>
                                                    </div>

                                                    <div class="col-md-2">
                                                        <label class="control-label">Huyện/TP</label>
                                                        <select id="maHuyenBbdth" name="maHuyenBbdth" type="text" class="form-control"></select>
                                                    </div>

                                                    <div class="col-md-2">
                                                        <label class="control-label">Phường/Xã</label>
                                                        <select id="maXaBbdth" name="maXaBbdth" type="text" class="form-control" disabled="disabled"></select>
                                                    </div>
                                                </div>

                                                <div class="col-md-12" style="margin-top: 20px">
                                                    <div class="col-md-6">
                                                        <label class="control-label">Mô tả/Ghi chú</label>
                                                        <input id="moTaBbdth" name="moTaBbdth" type="text" class="form-control"/>
                                                    </div>

                                                    <div class="col-md-2">
                                                        <label class="control-label">Năm hoạt động</label>
                                                        <input type="text" id="namHoatDong" name="namHoatDong" type="text" pattern="\d*" maxlength="4" class="form-control"/>
                                                    </div>

                                                    <div class="col-md-2">
                                                        <label class="control-label">Thời gian bảo trì</label>
                                                        <input id="thoiGianBaoTri" name="thoiGianBaoTri" type="text" class="form-control onlyNumber"/>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Ngày bảo trì gần nhất</label>
                                                        <input type="text" class="form-control" name="ngayBaoTri" id="ngayBaoTri" disabled="disabled">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12" style="margin-top: 40px">
                                                <div class="col-md-12 text-right">
                                                    <button type="button" class="btn btn-primary" id="btnSaveBienBao"><i class="fa fa-save"></i>&nbsp;Lưu</button>
                                                    <button type="button" style="margin-right: 8px" class="btn btn-primary" id="btnAddBienBao"><i class="fa fa-plus"></i>&nbsp;Thêm mới</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div id="tab-4" class="tab-pane">
                                        <form id="fromBaoTri">
                                            <input type="hidden" name="idBaoTri" id="idBaoTri" value="-1">
                                            <input id="loaiBaoTri" name="loaiBaoTri" type="hidden">
                                            <input id="idDoiTuong" name="idDoiTuong" type="hidden">
                                            <div class="top-buffer row">
                                                <div class="col-md-12" style="margin-top: 20px">
                                                    <div class="col-md-1 text-right" style="margin-left: 50px">
                                                        <input type="radio" class="i-checks" name="loai" id="BaoTriDuong" value="1" checked>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>Bảo trì, Bảo dưỡng đường</label>
                                                    </div>
                                                    <div class="col-md-1 text-right">
                                                        <input type="radio" class="i-checks" name="loai" id="BaoTriCau" value="2">
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>Bảo trì, Bảo dưỡng cầu</label>
                                                    </div>
                                                    <div class="col-md-1 text-right">
                                                        <input type="radio" class="i-checks" name="loai" id="BaoTriThietBi" value="3">
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>Bảo trì, Bảo dưỡng thiết bị</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-12" id="BTD" style="margin-top: 15px">
                                                    <div class="col-md-2 col-md-offset-4">
                                                        <label>Năm</label>
                                                        <select id="namBaoTri" name="namBaoTri" class="form-control"></select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="lbhidden"></label>
                                                        <button id="btnSelYearBTD" class="btn btn-primary"><i class="fa fa-search"></i>&nbsp;Xem</button>
                                                    </div>
                                                </div>

                                                <div class="col-md-12 table-responsive" style="margin-top: 25px">
                                                    <label style="margin-left: 10px">Danh sách công trình thiết bị thuộc đường</label>
                                                    <div class="col-md-12">
                                                        <div id="divTblBaoTriDuong">
                                                            <table id="tableBaoTriDuong" class="table table-bordered table-hover" style="width: 100%">
                                                                <thead>
                                                                <tr>
                                                                    <th class="text-center">STT</th>
                                                                    <th class="text-center">Thời gian</th>
                                                                    <th class="text-center">Hình thức</th>
                                                                    <th class="text-center">Lý trình</th>
                                                                    <th class="text-center">Nội dung</th>
                                                                </tr>
                                                                </thead>
                                                            </table>
                                                        </div>
                                                        <div id="divTblBaoTriCau">
                                                            <table id="tableBaoTriCau" class="table table-bordered table-hover" style="width: 100%">
                                                                <thead>
                                                                <tr>
                                                                    <th class="text-center">STT</th>
                                                                    <th class="text-center">Thời gian</th>
                                                                    <th class="text-center">Hình thức</th>
                                                                    <th class="text-center">Tên cầu</th>
                                                                    <th class="text-center">Lý trình</th>
                                                                    <th class="text-center">Nội dung</th>
                                                                </tr>
                                                                </thead>
                                                            </table>
                                                        </div>
                                                        <div id="divTblBaoTriThietBi">
                                                            <table id="tableBaoTriThietBi" class="table table-bordered table-hover" style="width: 100%;">
                                                                <thead>
                                                                <tr>
                                                                    <th class="text-center">STT</th>
                                                                    <th class="text-center">Thời gian</th>
                                                                    <th class="text-center">Hình thức</th>
                                                                    <th class="text-center">Thiết bị</th>
                                                                    <th class="text-center">Lý trình</th>
                                                                    <th class="text-center">Nội dung</th>
                                                                </tr>
                                                                </thead>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 20px">
                                                    <div class="col-md-2">
                                                        <label class="control-label">Hình thức</label>
                                                        <select id="hinhThuc" name="hinhThuc" type="text" class="form-control">
                                                            <option value="-1">Chọn Hình thức</option>
                                                            <option value="1">Thường xuyên</option>
                                                            <option value="2">Định kỳ</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Thời gian</label>
                                                        <input id="thoiGianBaoTriDuong" name="thoiGianBaoTriDuong" type="text" class="form-control datepicker valid">
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label class="control-label">Lý trình</label>
                                                        <div>
                                                            <input id="lyTrinhKmBaoTri" name="lyTrinhKmBaoTri" type="text" class="form-control valid" placeholder="Km" style="float: left; width: 45% !important" aria-invalid="false">
                                                            <input type="text" class="form-control valid" value="+" style="text-align: center;border-left-style:hidden;border-right-style:hidden ;float: left; width: 20% !important" readonly="" aria-invalid="false">
                                                            <input id="lyTrinhMBaoTri" name="lyTrinhMBaoTri" type="text" class="form-control valid" style="float: left; width: 35% !important" aria-invalid="false" placeholder="M">
                                                        </div>
                                                    </div>
                                                    <div id="tenThietBiEventCheck" class="col-md-3">
                                                        <label class="control-label">Tên thiết bị</label>
                                                        <select id="idCauBaoTri" name="idCauBaoTri" type="text" class="form-control"></select>
                                                    </div>
                                                    <div id="tenEventCheck" class="col-md-3">
                                                        <label class="control-label">Tên thiết bị</label>
                                                        <select id="idBienBaoDTH" name="idBienBaoDTH" type="text" class="form-control"></select>
                                                    </div>

                                                    <div id="kinhDoEventCheck" class="col-md-2">
                                                        <label class="control-label">Vị trí: Kinh độ</label>
                                                        <input id="kinhDoBaoTri" name="kinhDoBaoTri" type="text" class="form-control decimalNumber"/>
                                                    </div>

                                                    <div id="viDoEventCheck" class="col-md-2">
                                                        <label class="control-label">Vĩ độ</label>
                                                        <input id="viDoBaoTri" name="viDoBaoTri" type="text" class="form-control decimalNumber"/>
                                                    </div>

                                                    <div class="col-md-2">
                                                        <label class="control-label">Đơn vị thực hiện</label>
                                                        <select id="donViThucHienBaoTri" name="donViThucHienBaoTri" type="text" class="form-control"></select>
                                                    </div>
                                                </div>
                                                <div class="col-md-12" style="margin-top: 20px">
                                                    <div class="col-md-12">
                                                        <label class="control-label">Nội dung</label>
                                                        <textarea id="noiDungBaoTri" name="noiDungBaoTri" type="text" class="form-control" rows="5"></textarea>
                                                    </div>
                                                </div>
                                                <div class="col-md-12 text-right" style="margin-top: 30px">
                                                    <button id="btnAddBaoTri" type="button" class="btn btn-primary"><i class="fa fa-plus"></i>&nbsp;Thêm mới</button>
                                                    <button id="btnSaveBaoTri" class="btn btn-primary" type="button" style="margin-left: 8px"><i class="fa fa-save"></i>&nbsp;Lưu</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
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
<script type="text/javascript">
    let dataCol5 = '<%out.print(FileFactory.getFileTpl("col.download-file"));%>';
    const downloadFileNodes = dataCol5.f("formManager.downloadFile(this)");
    const uploadFileNodes = '<%out.print(FileFactory.getFileTpl("col.upload-file"));%>';
</script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/user/quanlyduong/qld.Init.js' />"></script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/user/quanlyduong/qld.Form.js' />"></script>
</html>