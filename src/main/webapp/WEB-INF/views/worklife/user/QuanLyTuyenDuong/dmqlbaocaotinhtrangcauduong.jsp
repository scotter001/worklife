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
                    <h3><b>QUẢN LÝ BÁO CÁO TÌNH TRẠNG CẦU ĐƯỜNG</b></h3>
                </div>
                <div class=" ibox-content">
                    <div class="row col-md-offset-3">
                        <div class="col-md-12">
                            <div class="col-md-3">
                                <label>Quý</label>
                                <select class="form-control"  id="selQuy" name="selQuy">
                                    <option value="1">Quý I</option>
                                    <option value="2">Quý II</option>
                                    <option value="3">Quý III</option>
                                    <option value="4">Quý IV</option>
                                </select>
                            </div>
                            <div class="col-md-3">
                                <label>Năm</label>
                                <select class="form-control"  id="selNam" name="selNam" >
                                </select>
                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-primary" id="btnTim" style="margin-top: 25px">
                                    <i class="fa fa-search"></i>&nbsp;Xem
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="ibox-content">
                    <div class=" container-fluid">

                        <form id="formBaoCaoTTMatDuong">
                            <div class="col-md-5  ">
                                <label>Báo cáo tình trạng mặt đường</label>
                                <table class="table table-striped table-bordered table-hover  " id="tableBaoCaoTTMatDuong"
                                       style="width: 100%">
                                    <thead>
                                    <tr>
                                        <th class="text-center">TT</th>
                                        <th  class="text-center">Tên Hạt Quản lý</th>
                                        <th class="text-center">Ngày báo cáo</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </form>
                        <form >
                        <div class="col-md-1  ">
                        </div>
                        </form>

                        <form id="formBaoCaoTTCau">
                            <div class="col-md-5">
                                <label>Báo cáo tình trạng cầu</label>
                                <table class="table table-striped table-bordered table-hover  " id="tableBaoCaoTTCau"
                                       style="width: 100%">
                                    <thead>
                                    <tr>
                                        <th class="text-center">TT</th>
                                        <th  class="text-center">Tên Hạt Quản lý</th>
                                        <th class="text-center">Ngày báo cáo</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </form>
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
<script type="text/javascript" src="<c:url value='/style/js/worklife/user/qltuyenduong/dmqlbaocaotinhtrangcauduong.Form.js' />"></script>
<script type="text/javascript">let url = "${pageContext.request.contextPath}";
</script>
</html>
