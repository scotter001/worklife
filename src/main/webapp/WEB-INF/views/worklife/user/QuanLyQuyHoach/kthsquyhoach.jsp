<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>Khởi tạo hồ sơ quy hoạch</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <style type="text/css">
        .attackFile:hover .deleteFileIcon {
            display: inline!important;
        }
    </style>
</head>
<body class="top-navigation">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="/WEB-INF/views/worklife/nav/topmenu.jsp" %>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>KHỞI TẠO HỒ SƠ QUY HOẠCH</b></h3>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-4 col-md-offset-4">
                            <label>Tên quy hoạch</label>
                            <input type="text" class="form-control" id="TenQH">
                        </div>
                    </div>
                    <div class="row">
                        <div class=" col-md-12">
                            <h4>Danh sách quy hoạch</h4>
                            <table class="table table-bordered table-hover dataTables-example dataTable"
                                   id="tableDanhSachQuyHoach" aria-describedby="DataTables_Table_0_info" role="grid">
                                <thead>
                                <tr role="row">
                                    <th class="text-center">TT</th>
                                    <th class="text-center">Tên quy hoạch</th>
                                    <th class="text-center">Quyết định số</th>
                                    <th class="text-center">Ngày</th>
                                    <th class="text-center">Cơ quan phê duyệt</th>
                                    <th class="text-center">Điều chỉnh</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
                <form id="formKTHS">
                    <input type="hidden" id="group_Id" name="idGroup" value="${group_Id}">
                    <input type="hidden" id="cap" value="${cap}" name="cap"/>
                    <input type="hidden" id="maHuyen" name="maHuyen" value="${maHuyen}">
                    <input type="hidden" id="idHoSo_QH" name="idHoSo_QH" value='${idHoSo_QH eq null ? -1 : idHoSo_QH}'/>
                    <input type="hidden" id="idParent" name="idParent" value='${idParent eq null ? -1 : idParent}'/>
                    <input type="hidden" id="startAt" value="${startAt eq null ? 0 : startAt}">
                    <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-md-2">
                                <h4>Thông tin chung</h4>
                            </div>
                            <div class="col-md-4" style="top: -8px">
                                <div class="checkbox checkbox-primary">
                                    <input id="cboxdieuchinh" type="checkbox">
                                    <label for="cboxdieuchinh">
                                        Điều chỉnh quy hoạch
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-lg control-label">Tên quy hoạch</label>
                                    <input id="tenQuyHoach" name="tenQuyHoach" class="form-control" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-lg control-label">Phạm vi lập quy hoạch</label>
                                    <input id="phamViQuyHoach" name="phamViQuyHoach" class="form-control" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label class="col-lg control-label">Quy mô quy hoạch</label>
                                    <input id="quyMoQuyHoach" name="quyMoQuyHoach" class="form-control" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="row form-group">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="col-lg control-label">Đơn vị tư vấn lập quy hoạch</label>
                                        <%--<c:choose>
                                            <c:when test="${cap =='1'}">--%>
                                    <input type="text" class="form-control autoCompleteDVTV"
                                           name="donViTuVan" id="donViTuVan">
                                        <%--</c:when>
                                        <c:otherwise>
                                            <input type="text" class="form-control autoCompleteDVTVHuyen"
                                                   name="donViTuVan">
                                        </c:otherwise>
                                    </c:choose>--%>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="col-lg control-label">Cơ quan trình thẩm định</label>
                                        <%--<c:choose>
                                            <c:when test="${cap =='1'}">--%>
                                    <input type="text" class="form-control autoCompleteCQTD" name="donViThamDinh" id="donViThamDinh">
                                        <%--</c:when>
                                        <c:otherwise>
                                            <input type="text" class="form-control autoCompleteCQTDHuyen" name="donViThamDinh">
                                        </c:otherwise>
                                    </c:choose>--%>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label class="col-lg control-label">Quyết định phê duyệt số</label>
                                    <input id="soQuyetDinh" name="soQuyetDinh" class="form-control" type="text" value="">
                                </div>
                            </div>
                            <div class="col-md-1">
                                <label class="col-lg control-label">Ngày</label>
                                <input type="hidden" id="checkNgayKy" value="1">
                                <div class="" data-datepicker="true">
                                    <input id="ngayQD" name="ngayQD" class="form-control datepicker formatDate" data-mask="99/99/9999" type="text"/>
                                </div>
                                <label id="txtNgayKy-error" for="ngayQD" class="error"  style="display: none;"></label>
                            </div>
                            <div class="col-md-2">
                                <div class="form-group">
                                    <label class="col-lg control-label">Cơ quan phê duyệt</label>
                                        <%--<c:choose>
                                            <c:when test="${cap =='1'}">--%>
                                                <input type="text" class="form-control autoCompleteCQDuyet" name="coQuanDuyet" id="coQuanDuyet">
                                            <%--</c:when>
                                            <c:otherwise>
                                                <input type="text" class="form-control autoCompleteCQDuyetHuyen" name="coQuanNguoiDuyet">
                                            </c:otherwise>
                                        </c:choose>--%>
                                </div>
                            </div>
                            <%--<div class="col-md-2" style="margin-top: 23px">
                                <div class="checkbox checkbox-primary">
                                    <input id="khongChiaSe" type="checkbox">
                                    <label for="khongChiaSe">
                                        Không chia sẻ
                                    </label>
                                </div>
                            </div>--%>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-md-12">
                                <h4>Danh sách bản vẽ thuộc quy hoạch</h4>
                                <table class="table table-bordered table-hover dataTable" id="tableBanVeQuyHoach"
                                       aria-describedby="DataTables_Table_0_info" role="grid">
                                    <thead>
                                    <tr role="row">
                                        <th>
                                            <div style="margin-top: 5px;">
                                                <input type="checkbox" class="i-checksBV" id="checkAllBanVe">
                                            </div>
                                        </th>
                                        <th class="text-center">TT</th>
                                        <th class="text-center">Tên bản vẽ</th>
                                        <th class="text-center">Số ký hiệu bản vẽ</th>
                                        <th class="text-center">Tỷ lệ</th>
                                        <th class="text-center">Tờ số</th>
                                        <th class="text-center">File đính kèm</th>
                                        <th class="text-center"><span class="btn btn-white btn-sm" data-toggle="tooltip"
                                                                      data-placement="top" title=""
                                                                      data-original-title="Tải tệp tin đính kèm."> <i
                                                class="fa fa-download"></i>
												</span></th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 actionDatable" id="btncontrolthemxoabanve">
                                <button id="btnAddBanVe" type="button" class="btn btn-primary btn-xs m-r-xs">
                                    <i class="fa fa-plus"></i>&nbsp;Thêm
                                </button>
                                <button id="btnDeleteBanVe" type="button" class="btn btn-primary btn-xs">
                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                </button>
                            </div>
                        </div>
                        <!-- end luu tru -->
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class=" col-md-12">
                                <h4>Danh sách tài liệu</h4>
                                <table class="table table-bordered table-hover dataTable" id="tableTaiLieu"
                                       aria-describedby="DataTables_Table_0_info" role="grid">
                                    <thead>
                                    <tr role="row">
                                        <th>
                                            <div style="margin-top: 5px;">
                                                <input type="checkbox" class="i-checksTL" id="checkAllTailieu">
                                            </div>
                                        </th>
                                        <th class="text-center">TT</th>
                                        <th class="text-center">Tên tài liệu/văn bản pháp lý(số/ngày/cơ quan)</th>
                                        <th class="text-center">File đính kèm</th>
                                        <th class="text-center"><span class="btn btn-white btn-sm" data-toggle="tooltip"
                                                                      data-placement="top" title=""
                                                                      data-original-title="Tải tệp tin đính kèm."> <i
                                                class="fa fa-download"></i>
												</span></th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="  col-md-6 actionDatable" id="btncontrolthemxoatailieu">

                                <button id="btnAddTaiLieu" type="button" class="btn btn-primary btn-xs m-r-xs">
                                    <i class="fa fa-plus"></i>&nbsp;Thêm
                                </button>
                                <button id="btnDeleteTaiLieu" type="button" class="btn btn-primary btn-xs">
                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-md-6 pull-right text-right">
                                <button type="button" class="btn btn-primary" id="btnMap">
                                    <i class="fa fa-globe"></i> &nbsp;Bản đồ ranh vùng quy hoạch
                                </button>
                                <button type="button" class="btn btn-primary" id="btnReset">
                                    <i class="fa fa-plus"></i> &nbsp;Thêm mới
                                </button>
                                <button type="button" class="btn btn-primary" id="btnSave">
                                    <i class="fa fa-save"></i> &nbsp;Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <%--FOOTER--%>
            <%@ include file="/WEB-INF/views/worklife/nav/footer.jsp" %>
        </div>
    </div>
</div>
</body>
<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js' />"></script>
<script type="text/javascript"
        src="<c:url value='/style/js/worklife/user/quanlyquyhoach/kthsquyhoach.Form.js' />"></script>
<script type="text/javascript">
    let multiLanguage = {
        attackfile : '<spring:message code="label.attackfile"/>',
        notify : '<spring:message code="label.notify"/>',
        deleteconfirm : '<spring:message code="validate.paperfile.deleteconfirm"/>',
        accept : '<spring:message code="label.accept"/>',
        cancel : '<spring:message code="label.cancel"/>',
        deletesuccesfully : '<spring:message code="label.drawingdesign.info.delsuccess"/>',
    };
    let url = "${pageContext.request.contextPath}";
</script>
</html>
