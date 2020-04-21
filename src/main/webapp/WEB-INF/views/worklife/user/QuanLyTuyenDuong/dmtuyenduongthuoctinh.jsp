<%@ page import="vn.worklife.user.util.FileFactory" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
    <title>Danh mục tuyến đường theo hạt quản lý</title>
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
                    <h3><b>DANH MỤC TUYẾN ĐƯỜNG THUỘC TỈNH</b></h3>
                </div>
                <div class=" ibox-content">
                    <div class="row col-md-offset-3">
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <label>Loại đường</label>
                                <select class="form-control"  id="loaiDuong"></select>
                            </div>
                            <div class="col-md-3">
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
                    <div class="container">
                        <form id="formDmTuyenDuongThuocTinh">
                        <div class="col-md-12  ">
                            <label>Danh sách tuyến đường</label>
                            <table class="table table-striped table-bordered table-hover  " id="tableDSTuyenDuong"
                                   style="width: 100%">
                                <thead>
                                <tr>
                                    <th class="text-center">TT</th>
                                    <th  class="text-center">Loại đường</th>
                                    <th class="text-center">Tên tuyến đường</th>
                                    <th class="text-center">Chiều dài ( KM )</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                        </form>
                        <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                        <div class=" col-md-12">
                            <button type="button" class="btn btn-sm  btn-primary" id="btnThemMoi">
                                <i class="fa fa-plus-square"></i>&nbsp;Thêm mới
                            </button>
                            <button type="button" class="btn btn-sm  btn-primary" id="btnDelete">
                                <i class="fa fa-trash-o"></i>&nbsp;Xóa
                            </button>
                            <button type="button" class="btn btn-sm  btn-primary" id="btnSave">
                                <i class="fa fa-save"></i>&nbsp; Lưu
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
<script src="<c:url value='/style/js/others/datepicker/moment.js'/>" type="text/javascript"></script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/user/qltuyenduong/dmtuyenduongthuoctinh.Form.js' />"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</html>
