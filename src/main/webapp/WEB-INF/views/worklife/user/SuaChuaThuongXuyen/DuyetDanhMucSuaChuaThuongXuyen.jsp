<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.DmTuyenDuongTheoHatImpl" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.TuyenDuongHatVO" %>
<%@ page import="java.util.List" %>
<%@ page import="vn.worklife.user.mockup.service.impl.DanhMucSCTXServiceImpl" %>
<%@ page import="vn.worklife.user.mockup.model.DmDVTVO" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<!DOCTYPE html>
<html>
<head>
    <title>DUYỆT DANH MỤC SỬA CHỮA THƯỜNG XUYÊN</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <link href="<c:url value='/style/css/others/inspinia/plugins/jasny/jasny-bootstrap.min.css' />" rel="stylesheet">
    <script type="text/javascript">
        <%
        try{
         DmTuyenDuongTheoHatImpl bean = vn.worklife.utils.BeanUtil.getBean(DmTuyenDuongTheoHatImpl.class);
         List<TuyenDuongHatVO> lstTD =  bean.selectListTuyenDuong();
         DanhMucSCTXServiceImpl bean1 = vn.worklife.utils.BeanUtil.getBean(DanhMucSCTXServiceImpl.class);
         List<DmDVTVO> lstDVT = bean1.selectListDVT();
         ObjectMapper objectMapper = new ObjectMapper();
         out.write("let listIdTuyenDuong = ");
         out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD));
         out.write(";");

         out.write("let listIdDVT = ");
         out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstDVT));
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
        <!-- HEADER -->
        <%@ include file="../../nav/topmenu.jsp" %>
        <!-- BODY -->
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h4>DUYỆT DANH MỤC SỬA CHỮA THƯỜNG XUYÊN</h4>
                </div>
                <div class="ibox-content">
                    <input type="hidden" id="month" value="${month}">
                    <input type="hidden" id="year" value="${year}">
                    <input type="hidden" id="idDMSCTX" value="0">
                    <input type="hidden" id="group_Id" name="idGroup" value="${group_Id}">
                    <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                    <div class="row form-group">
                        <div class="col-md-offset-2 col-md-2">
                            <label>Quý</label>
                            <select class="form-control" id="quy">
                                <option value="1">Quý I</option>
                                <option value="2">Quý II</option>
                                <option value="3">Quý III</option>
                                <option value="4">Quý IV</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <label>Năm</label>
                            <select class="form-control" id="nam">

                            </select>
                        </div>
                        <div class="col-md-3">
                            <label>Hạt quản lý giao thông</label>
                            <select class="form-control" id="hatQuanLy">

                            </select>
                        </div>
                    </div>
                </div>
                <form id="formDuyetSCTX">
                    <div class="ibox-content">
                        <div class="row">
                            <div class="col-md-12">
                                <label>Danh sách danh mục sửa chữa thường xuyên duyệt</label>
                                <table class="table table-bordered table-hover" id="tableDuyetSCTX"
                                       style="width: 100%;">
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
                                    </tr>
                                    <tr>
                                        <th class="text-center" rowspan="2" style="min-width: 50px"><input
                                                type="checkbox"
                                                class="i-checks"
                                                id="checkAll">
                                        </th>
                                        <th class="text-center" rowspan="2" style="min-width: 200px">Tuyến đường</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Lý trình</th>
                                        <th class="text-center" rowspan="2" style="min-width: 300px">Biện pháp xử lý
                                        </th>
                                        <th class="text-center" rowspan="2" style="min-width: 100px">ĐVT</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Công thức</th>
                                        <th class="text-center" colspan="2" style="min-width: 300px">Khối lượng</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Công thức duyệt
                                        </th>
                                        <th class="text-center" colspan="2" style="min-width: 300px">Khối lượng duyệt
                                        </th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Kinh phí</th>
                                        <th class="text-center" rowspan="2" style="min-width: 300px">Tình trạng</th>
                                        <th class="text-center" rowspan="2" style="min-width: 150px">Ngày sự cố</th>
                                    </tr>
                                    <tr>
                                        <th class="text-center">Chi tiết</th>
                                        <th class="text-center">Tổng cộng</th>
                                        <th class="text-center">Chi tiết</th>
                                        <th class="text-center">Tổng cộng</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-xs btn-primary" id="btnDel">
                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="ibox-content">
                    <div class="row">
                        <div class="text-right col-md-12">
                            <button type="button" class="btn btn-primary" id="btnExcell">
                                <i class="fa fa-print"></i>&nbsp;&nbsp;Xuất excel &nbsp;&nbsp;
                            </button>
                            <button type="button" class="btn btn-primary" id="btnSave">
                                <i class="fa fa-save"></i>&nbsp;&nbsp;Lưu&nbsp;&nbsp;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- FOOTER -->
        <%@ include file="../../nav/footer.jsp" %>
    </div>
</div>
<%@ include file="/WEB-INF/views/jspf/js.jspf" %>
<%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
<script src="<c:url value='/style/js/worklife/public/utils.js'/>" type="text/javascript"></script>
<script src="<c:url value='/style/js/others/datepicker/moment.js'/>" type="text/javascript"></script>
<%--<script src="<c:url value='/style/js/worklife/user/duyetdmsuachuathuongxuyen/ddmsctx.Init.js'/>" type="text/javascript"></script>--%>
<script src="<c:url value='/style/js/worklife/user/duyetdmsuachuathuongxuyen/ddmsctx.Form.js'/>"
        type="text/javascript"></script>
<script type="text/javascript">
    let multiLanguage = {
        saveSuccessful: '<spring:message code="label.savesuccessfully"/>',
        saveFailed: '<spring:message code="label.savefailed"/>',
        accept: '<spring:message code="label.accept"/>',
        notify: '<spring:message code="label.notify"/>',
        cancel: '<spring:message code="label.cancel"/>',
    };
    let url = "${pageContext.request.contextPath}";
</script>
</body>
</html>