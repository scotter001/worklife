<%@ page import="vn.worklife.user.mockup.model.LapDanhMucSCDKVO" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.DmTuyenDuongTheoHatImpl" %>
<%@ page import="java.util.List" %>
<%@ page import="com.fasterxml.jackson.databind.ObjectMapper" %>
<%@ page import="vn.worklife.user.mockup.service.impl.LapDmScdkServiceImpl" %>
<%@ page import="vn.worklife.user.mockup.model.DmhmSCTXVO" %>
<%@ page import="vn.worklife.user.quanlycau.model.CauVO" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.TuyenDuongHatVO" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.DmHuyenVO" %>
<%@ page import="vn.worklife.user.mockup.model.DmUTSCTXVO" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.model.QLThietBiVO" %>
<%@ page import="vn.worklife.user.quanlytuyenduong.service.impl.DmQLThietBiBienBaoImpl" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<script type="text/javascript">
    <%
    try{
     LapDmScdkServiceImpl bean  ;bean = vn.worklife.utils.BeanUtil.getBean(LapDmScdkServiceImpl.class);
     List<DmhmSCTXVO> lstTD =  bean.selectlisthangmuc();
     List<LapDanhMucSCDKVO> lstTD2 =  bean.selectlistnguonvon();
     List<DmUTSCTXVO> lstTD3 =  bean.selectlistUutien();
     List<CauVO> lstTD4 =  bean.selectListCau();
     DmTuyenDuongTheoHatImpl bean1 = vn.worklife.utils.BeanUtil.getBean(DmTuyenDuongTheoHatImpl.class);
     List<TuyenDuongHatVO> lstTD5 =  bean1.selectListTuyenDuong();
     List<DmHuyenVO> lstTD6 =  bean1.selectHuyen();
    DmQLThietBiBienBaoImpl bean2 = vn.worklife.utils.BeanUtil.getBean(DmQLThietBiBienBaoImpl.class);
     List<QLThietBiVO> lstTD7 =  bean2.selectListThietBi();
      ObjectMapper objectMapper = new ObjectMapper();
     out.write("let listHangMuc = ");
     out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD));
     out.write(";");
       out.write("let listNguonVon = ");
     out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD2));
     out.write(";");
     out.write("let listUuTien = ");
     out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD3));
     out.write(";");
     out.write("let listCau = ");
     out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD4));
     out.write(";");
      out.write("let listTuyenDuong = ");
     out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD5));
     out.write(";");
//     out.write("let listHuyen = ");
//     out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD6));
//     out.write(";");
        out.write("let listThietBi = ");
     out.write(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(lstTD7));
     out.write(";");
     }catch (Exception e){
        e.printStackTrace();
     }
    %>

</script>
<style type="text/css">
    .attackFile:hover .deleteFileIcon {
        display: inline!important;
    }
</style>
<style type="text/css">
    .select2-container--default{
        width: 100% !important;
    }
</style>
<!DOCTYPE html>
<html>
<head>
    <title>LẬP DANH MỤC SỮA CHỮA ĐỊNH KỲ</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf" %>
    <%@ include file="/WEB-INF/views/jspf/css.jspf" %>
    <link href="<c:url value='/style/css/others/inspinia/plugins/jasny/jasny-bootstrap.min.css' />" rel="stylesheet">
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
                    <h3><b>DANH MỤC CÁC CÔNG TRÌNH SỬA CHỮA ĐỊNH KỲ</b></h3>
                </div>
                <div class="ibox-content">
                    <input type="hidden" id="year" value="${year}">
                    <input type="hidden" id="isInsertSuccessfully" value="${message}" />
                    <div class="row col-md-offset-3">
                        <div class="col-md-12">
                            <div class="col-md-2 col-md-offset-3">
                                <label>Năm</label>
                                <select class="form-control" id="nam" name="nam"
                                        style="text-align: center;width: 180px;text-align-last:center;margin-right: 0;">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <form id="formDSCongTrinh" method="post" <%--onsubmit="return valiLau()"--%> >
                            <div class="col-md-12">
                                <label>Danh sách công trình</label>
                                <table class="table table-bordered table-hover" id="tableDSCongTrinh" style="width: 100%">
                                    <thead>
                                    <tr>
                                        <th class="text-center" style="min-width: 50px"><input type="checkbox" class="i-checks" id="checkAll"></th>
                                        <th class="text-center" style="min-width: 230px;">Hạng mục</th>
                                        <th class="text-center" style="min-width: 230px;">Tuyến đường/Cầu/Thiết bị</th>
                                        <th class="text-center" style="min-width: 150px;">Vị trí</th>
                                        <th class="text-center" style="min-width: 350px;">Thuộc huyện/TP/TX</th>
                                        <th class="text-center" style="min-width: 150px;">Mức ưu tiên</th>
                                        <th class="text-center" style="min-width: 150px;">Tổng mức đầu tư ( Triệu đồng )</th>
                                        <th class="text-center" style="min-width: 200px;">Nguồn vốn</th>
                                        <th class="text-center" style="min-width: 300px;">Hiện trạng</th>
                                        <th class="text-center" style="min-width: 300px;">Giải pháp sơ bộ</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        </form>
                        <div class=" col-md-12">
                            <button type="button" class="btn btn-sm  btn-primary" id="btnThemMoi">
                                <i class="fa fa-plus-square"></i>&nbsp;Thêm mới
                            </button>
                            <button type="button" class="btn btn-sm  btn-primary" id="btnDelete">
                                <i class="fa fa-trash-o"></i>&nbsp;Xóa
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="text-right col-md-12">
                            <button type="button" class="btn btn-primary" id="btnExportDmScdkToExcel">
                                <i class="fa fa-print"></i>&nbsp;&nbsp;Xuất excel &nbsp;&nbsp;
                            </button>
                            <button type="button" class="btn btn-primary" id="btnSave">
                                <i class="fa fa-save"></i>&nbsp;&nbsp;Lưu&nbsp;&nbsp;
                            </button>
                        </div>
                    </div>
                </div>
                <form id="formDSvanBanPhapLy">
                <div class="ibox-content">
                    <div class="container">
                        <div class="row" >
                            <div class="col-md-12">
                                <label>Danh sách văn bản pháp lý</label>
                                <table class="table table-bordered table-hover" id="tableDSvanBanPhapLy"
                                       style="width:90%">
                                    <thead>
                                    <tr>
                                        <th class="text-center" style="min-width: 50px"><input type="checkbox" class="i-checksPL" id="checkAllPL"></th>
                                        <th class="text-center">TT</th>
                                        <th class="text-center">Tên văn bản</th>
                                        <th class="text-center">Số văn bản</th>
                                        <th class="text-center">Ngày văn bản</th>
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
                            <div class=" col-md-12">
                                <button type="button" class="btn btn-sm  btn-primary" id="btnThemMoi2">
                                    <i class="fa fa-plus-square"></i>&nbsp;Thêm mới
                                </button>
                                <button type="button" class="btn btn-sm  btn-primary" id="btnDelete2">
                                    <i class="fa fa-trash-o"></i>&nbsp;Xóa
                                </button>
                                <button type="button" class="btn btn-sm  btn-primary" id="btnSave2">
                                    <i class="fa fa-save"></i>&nbsp; Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </form>
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
<script src="<c:url value='/style/js/worklife/user/suachuadinhky/lapdmscdk.Form.js'/>" type="text/javascript"></script>
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
</body>
</html>