<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
    <title>BÁO CÁO SỰ CỐ ĐƯỜNG, THIẾT BỊ GIAO THÔNG</title>
    <%@ include file="/WEB-INF/views/jspf/head.jspf"%>
    <%@ include file="/WEB-INF/views/jspf/css.jspf"%>
    <link href="<c:url value='/style/css/others/inspinia/plugins/ladda/ladda-themeless.min.css' />" rel="stylesheet">
</head>
<body class="top-navigation" class="pace-done">
<div class="pace pace-inactive">
    <div class="pace-progress" data-progress-text="100%" data-progress="99" style="transform: translate3d(100%, 0px, 0px);">
        <div class="pace-progress-inner"></div>
    </div>
    <div class="pace-activity"></div>
</div>
<div id="wrapper">
    <div id="page-wrapper" class="gray-bg">
        <!-- HEADER -->
        <%@ include file="/WEB-INF/views/worklife/nav/topmenu.jsp"%>
        <input type="hidden" value="${tuan}" id="txtTuan">
        <input type="hidden" value="${nam}" id="txtNam">
        <input id="groupId" type="hidden" value="${worklifeUserVO.getGroupId()}"/>
        <input id="groupName" type="hidden" value="${worklifeUserVO.group.groupName}"/>
        <input type="hidden" id="isInsertSuccessfully" value="${isInsertSuccessfully}">
        <!-- BODY -->
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="ibox float-e-margins boxborder">
                <div class="ibox-title">
                    <h2>Báo cáo sự cố đường, thiết bị giao thông</h2>
                </div>

                <form id="saveAttachedFile" enctype="multipart/form-data">
                    <div class="ibox-content" id="searchContainer">
                        <div class="row">
                            <div class="col-md-4"></div>
                            <div class="col-md-2">
                                <label>Tuần Thứ</label>
                                <select class="form-control" name="tuan" id="selTuan">

                                </select>
                            </div>
                            <div class="col-md-2">
                                <label>Năm</label>
                                <select id="selNam" name="nam"  class="form-control">

                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="row top-buffer">
                                    <div class="col-md-12">
                                        <table class="table table-bordered table-hover" id="fileListTable" style="width: 100%;">
                                            <thead>
                                            <tr>
                                                <th class="text-center">
                                                    STT
                                                </th>
                                                <th class="text-center">
                                                    Tuyến đường
                                                </th>
                                                <th class="text-center">
                                                    Tai nạn giao thông xảy ra trong tuần, địa điểm, lý trình, nguyên nhân xảy ra tai nạn
                                                </th>
                                                <th class="text-center">
                                                    Hư hỏng mặt đường và biển báo giao thông
                                                </th>
                                                <th class="text-center">
                                                    Những việc được nhân viên tuần đường xử lý
                                                </th>
                                                <th class="text-center">
                                                    Giải pháp khắc phục
                                                </th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                    <div class="col-md-12">
                                        <div id="btnControlDSHS">
                                            <button type="button" class="btn btn-md btn-primary pull-right"  id="btnXuatExcel">
                                                <i class="fa fa-file-excel-o"></i>&nbsp;Xuất excel
                                            </button>&nbsp;&nbsp;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-md-offset-1">
                                <div class="col-md-1 text-right <%--form-horizontal--%>">
                                    <label class="control-label">Kèm file báo cáo: </label>
                                </div>
                                <div class="col-md-5">
                                    <div class="input-group">
                                        <div class = "form-control fileinput fileinput-new input-group" id="inputFileHover">
                                            <span type="text" class="" name="txtTenFile" id="txtTenFile"></span>
                                            <span id="removeSign" class="fileinput-exists" style="cursor: pointer; display:none;">
                                                <i class="fa fa-times"></i>
                                            </span>
                                        </div>
                                        <!--Phai đặt bên ngoài, không gây ra vòng lặp vô tận sự kiện click khi click vào inputFileHover-->
                                        <input type="file" class="form-control" name="files[0].file" id= "fileDinhKem" style="display: none;">
                                        <a href="" class="input-group-addon btn btn-default" id="btnDownloadFile" style="display: none;"><i class="fa fa-download"></i> </a>
                                    </div>
                                </div>
                                <div class="col-md-1 text-right">
                                    <label>Ngày báo cáo</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="ngayBaoCao">
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="ibox-content">
                    <div class="row">
                        <div class="col-md-12 text-right">
                            <button id="btnSaveAttachedFile" type="button" class="btn btn-primary">
                                <i class="fa fa-save"></i> &nbsp;&nbsp;
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%@ include file="/WEB-INF/views/worklife/nav/footer.jsp"%>
        <%@ include file="/WEB-INF/views/jspf/js.jspf"%>
        <%@ include file="/WEB-INF/views/jspf/file-language.jspf" %>
    </div>
</div>
</body>
<script type="text/javascript" src="<c:url value='/style/js/worklife/public/utils.js' />"></script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/user/sucoduong/baocaoscdbb.Init.js' />"></script>
<script type="text/javascript" src="<c:url value='/style/js/worklife/user/sucoduong/baocaoscdbb.Form.js' />"></script>
<script type="text/javascript">
    let url = "${pageContext.request.contextPath}";
</script>
</html>