<%@ page import="vn.worklife.user.mockup.service.impl.NhapThongTinSCDKImpl" %>
<%@ page import="java.util.List" %>
<%@ page import="vn.worklife.user.mockup.model.DmTuVanVO" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>NHẬP THÔNG TIN SỬA CHỮA ĐỊNH KỲ</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <link href="<c:url value='/style/css/others/inspinia/plugins/jasny/jasny-bootstrap.min.css' />" rel="stylesheet">
    <script type="text/javascript">
        <%
        try{
            NhapThongTinSCDKImpl bean = vn.worklife.utils.BeanUtil.getBean(NhapThongTinSCDKImpl.class);
            List<DmTuVanVO> listTC = bean.selectListTC();
            List<DmTuVanVO> listTK = bean.selectListTK();
            List<DmTuVanVO> listGS = bean.selectListGS();
            ObjectMapper objectMapper = new ObjectMapper();
            out.write("let listTC = ");
            out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(listTC));
            out.write(";");
            out.write("let listTK = ");
            out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(listTK));
            out.write(";");
            out.write("let listGS = ");
            out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(listGS));
            out.write(";");
         }catch (Exception e){
            e.printStackTrace();
         }
        %>
    </script>
</head>
<body class="top-navigation">
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <%@ include file="../../nav/topmenu.jsp" %>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h3><b>NHẬP THÔNG TIN SỬA CHỮA ĐỊNH KỲ</b></h3>
                </div>
                <div class="ibox-content detail">
                    <form id="formDanhMucSCDK">
                        <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                        <div class="row">
                            <div class="col-md-12 col-md-offset-5">
                                <div class="col-md-2" style="margin-top: 20px">
                                    <label>Năm</label>
                                    <select id="selNam" class="form-control"></select>
                                </div>
                            </div>
                            <div class="col-md-12" style="margin-top: 20px">
                                <div class="col-md-12">
                                    <label>Danh mục sửa chữa định kỳ</label>
                                    <table id="tblDMSCDK" class="table table-bordered table-hover dataTable"
                                           style="width: 100%;">
                                        <thead>
                                        <tr>
                                            <th class="text-center"><input type="checkbox" class="i-checks" id="checkAll"></th>
                                            <th class="text-center">STT</th>
                                            <th class="text-center">Tên công trình/địa điểm</th>
                                            <th class="text-center">Giá phê duyệt</th>
                                            <th class="text-center">Giá trúng thầu</th>
                                            <th class="text-center">Nhà thầu thi công</th>
                                            <th class="text-center">Tư vấn thiết kế</th>
                                            <th class="text-center">Tư vấn giám sát</th>
                                            <th class="text-center">Thời gian thực hiện</th>
                                            <th class="text-center">Ngày hoàn thành</th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-xs btn-primary" id="btnDel">
                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-12 text-right">
                                <button type="button" class="btn btn-primary" id="btnReport"><i class="fa fa-file-excel-o"></i>&nbsp;Xuất excel</button>&nbsp;
                                <button type="button" class="btn btn-primary" id="btnSave"><i class="fa fa-save"></i>&nbsp;Lưu</button>
                            </div>
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
<script src="<c:url value='/style/js/worklife/user/suachuadinhky/nhapthongtinscdk.Init.js'/>"
        type="text/javascript"></script>
<script src="<c:url value='/style/js/worklife/user/suachuadinhky/nhapthongtinscdk.Form.js'/>"
        type="text/javascript"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</body>
</html>