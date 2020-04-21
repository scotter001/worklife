<%@ page import="vn.worklife.map2.esri.web.MapManager"%>
<%@ page import="java.util.Map"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <link href="<c:url value='/style/css/others/inspinia/bootstrap.min.css'/>" rel="stylesheet" type="text/css">
    <link href="<c:url value='/style/font-awesome/css/font-awesome.min.css'/>" rel="stylesheet" type="text/css">
    <link href="<c:url value='/style/css/others/inspinia/animate.css'/>" rel="stylesheet" type="text/css">
    <link href="<c:url value='/style/css/others/inspinia/plugins/sweetalert/sweetalert.css'/>" rel="stylesheet" type="text/css">
    <link href="<c:url value='/style/css/worklife/user/nav-menu.css'/>" rel="stylesheet" type="text/css">
    <link href="<c:url value='/style/css/others/inspinia/style.css'/>" rel="stylesheet" type="text/css">
</head>
<body>
<div class="row"></div>
    <sec:authentication var="worklifeUserVO" property="principal" />
<div class="row border-bottom white-bg m-b">
    <nav class="navbar navbar-static-top" role="navigation">
        <%--<div class="navbar-header" style="border-right: 1px solid #23629F !important;">
            <button aria-controls="navbar" aria-expanded="false" data-target="#worklifeTopMenu" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
                <i class="fa fa-reorder"></i>
            </button>
            <a href="<c:url value="/" />" class="navbar-brand" id="btnHomePage"><i class="fa fa-home" style="font-size: 30px"></i></a>
        </div>--%>
        <div class="navbar-collapse collapse" id="worklifeTopMenu">
            <ul class="nav navbar-nav" style="margin-left: 20px">
                <li class="dropdown"><a href="#"  class="dropdown-toggle" data-toggle="dropdown">Quản lý quy hoạch&nbsp;<span class="caret"></span></a>
                    <ul role="menu" class="dropdown-menu multi-level">
                        <li><a href="<c:url value="/worklife/user/quanlyquyhoach/kthsqh.do"/>">Khởi tạo hồ sơ quy hoạch</a></li>
                        <li><a href="<c:url value="/worklife/user/quanlyquyhoach/tchsqh.do"/>">Tra cứu hồ sơ quy hoạch</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav" style="margin-left: 20px">
                <li class="dropdown"><a href="#"  class="dropdown-toggle" data-toggle="dropdown">Quản lý tuyến đường&nbsp;<span class="caret"></span></a>
                    <ul role="menu" class="dropdown-menu multi-level">
                        <li class="hidden"><a href="<c:url value="/worklife/user/quanlyduong/quanlyduong.do"/>">Quản lý đường &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/quanlytuyenduong/dmtuyenduongthuoctinh.do"/>">Danh mục tuyến đường thuộc tỉnh</a></li>
                        <li><a href="<c:url value="/worklife/user/quanlytuyenduong/dmtuyenduongtheohat.do"/>">Danh mục tuyến đường theo hạt</a></li>
                        <li><a href="<c:url value="/worklife/user/quanlytuyenduong/ttchitietduongtheohat.do"/>">Thông tin chi tiết đường theo hạt</a></li>
                        <li><a href="<c:url value="/worklife/user/quanlycau/quanlycau.do"/>">Quản lý cầu</a></li>
                        <li><a href="<c:url value="/worklife/user/quanlttuyenduong/dmqlthietbibienbao.do"/>">Quản lý thiết bị/biển báo</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav">
                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Hiện trạng giao thông&nbsp;<span class="caret"></span></a>
                    <ul role="menu" class="dropdown-menu multi-level">
                        <li><a href="<c:url value="/worklife/user/SuCoDuong/SuCoDuong.do"/>">Sự cố đường &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/SuCoDuong/baocaothgt.do"/>">Báo cáo sự cố đường, thiết bị giao thông &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/SuCoDuong/tracuuscdbb.do"/>">Tra cứu sự cố đường, thiết bị giao thông &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/baocaotinhtrangduong/bctinhtrangduong.do"/>">Báo cáo tình trạng mặt đường</a></li>
                        <li><a href="<c:url value="/worklife/user/baocaotinhtrangcau/bctinhtrangcau.do"/>">Báo cáo tình trạng cầu</a></li>
                        <li><a href="<c:url value="/worklife/user/quanlytuyenduong/dmqlbaocaotinhtrangcauduong.do"/>">Quản lý báo cáo tình trạng cầu đường</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav">
                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Duy tu/bảo trì&nbsp;<span class="caret"></span></a>
                    <ul role="menu" class="dropdown-menu multi-level">
                        <li><a href="<c:url value="/worklife/user/suachuathuongxuyen/lapdanhmucsuachuathuongxuyen.do"/>">Lập danh mục sửa chữa thường xuyên &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/suachuathuongxuyen/duyetdanhmucsuachuathuongxuyen.do"/>">Duyệt danh mục sửa chữa thường xuyên &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/suachuathuongxuyen/lapkehoachsuachuathuongxuyen.do"/>">Lập kế hoạch sửa chữa thường xuyên &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/repair/regular/index.do"/>">Nhập kết quả sửa chữa thường xuyên &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/suachuathuongxuyen/nhapkiemtrasctx.do"/>">Nhập kiểm tra sửa chữa thường xuyên &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/suachuathuongxuyen/tracuusuachuathuongxuyen.do"/>">Tra cứu sửa chữa thường xuyên &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                    </ul>
                </li>
            </ul>
            <%--<ul class="nav navbar-nav">
                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Sửa chữa định kỳ&nbsp;<span class="caret"></span></a>
                    <ul role="menu" class="dropdown-menu multi-level">
                        <li><a href="<c:url value="/worklife/user/BaoCaoTinhHinhGiaoThong/prototype/lapdmscdk.do"/>">Lập danh mục sữa chữa định kỳ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/SuCoDuong/prototype/lichsusuachuadinhky.do"/>">Lịch sử sửa chữa định kỳ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                        <li><a href="<c:url value="/worklife/user/SuCoDuong/prototype/nhapthongtinsuachuadinhky.do"/>">Nhập thông tin sửa chữa định kỳ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                    </ul>
                </li>
            </ul>--%>
            <ul class="nav navbar-nav">
                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Thống kê sửa chữa thường xuyên&nbsp;<span class="caret"></span></a>
                    <ul role="menu" class="dropdown-menu multi-level">
                        <li><a href="<c:url value="/worklife/user/thongkesctx/thongkekinhphisctx.do"/>">Thống kê kinh phí sửa chữa thường xuyên &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav">
                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Sửa chữa định kỳ&nbsp;<span class="caret"></span></a>
                    <ul role="menu" class="dropdown-menu multi-level">
                        <li><a href="<c:url value="/worklife/user/suachuadinhky/lapdmscdk.do"/>">Lập danh mục sữa chữa định kỳ </a></li>
                        <li><a href="<c:url value="/worklife/user/suachuadinhky/nhapthongtinsuachuadinhky.do"/>">Nhập thông tin sửa chữa định kỳ</a></li>
                        <li><a href="<c:url value="/worklife/user/suachuadinhky/lichsusuachuadinhky.do"/>">Lịch sử sửa chữa định kỳ</a></li>

                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav">
                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Điểm đen giao thông&nbsp;<span class="caret"></span></a>
                    <ul role="menu" class="dropdown-menu multi-level">
                        <li><a href="<c:url value="/worklife/user/diemdenduongbo/index.do"/>">Điểm đen giao thông đường bộ</a></li>
                        <li><a href="<c:url value="/worklife/user/diemdenduongthuy/index.do"/>">Điểm đen giao thông đường thủy</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav">
                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Hệ thống<span class="caret"></span></a>
                    <ul role="menu" class="dropdown-menu multi-level">
                        <sec:authorize url="/worklife/manager/user/view/redirectToUserPage.do">
                            <li><a href="<c:url value="/worklife/manager/user/view/redirectToUserPage.do" />">Quản
                                trị người dùng</a></li>
                        </sec:authorize>
                        <sec:authorize url="/worklife/manager/group/redirectToGroupPage.do">
                            <li><a href="<c:url value="/worklife/manager/group/redirectToGroupPage.do" />">Quản trị
                                bộ phận</a></li>
                        </sec:authorize>
                        <sec:authorize url="/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do">
                            <li>
                                <a href="<c:url value="/worklife/manager/permissiongroup/redirectToPermissionGroupPage.do" />">Quản
                                    trị quyền bộ phận</a></li>
                        </sec:authorize>
                        <sec:authorize url="/worklife/manager/role/redirectToRolePage.do">
                            <li><a href="<c:url value="/worklife/manager/role/redirectToRolePage.do" />">Quản trị
                                vai trò cho bộ phận</a></li>
                        </sec:authorize>
                        <sec:authorize url="/worklife/manager/roleuser/redirectToRoleUserPage.do">
                            <li><a href="<c:url value="/worklife/manager/roleuser/redirectToRoleUserPage.do" />">Quản
                                trị vai trò cho user</a></li>
                        </sec:authorize>
                    </ul>
                </li>
            </ul>

            <ul class="nav navbar-nav" style="float: right;">
                <sec:authorize access="!isAuthenticated()">
                    <li class="pull-right"><a href="<c:url value='/login.do' />"><i class="fa fa-sign-out"></i>Đăng nhập</a></li>
                </sec:authorize>
                <sec:authorize access="isAuthenticated()">
                    <li class="pull-right"><a href="<c:url value='/logout.do' />"><i class="fa fa-sign-out"></i>Thoát</a></li>
                </sec:authorize>
                <sec:authorize access="isAuthenticated()">
                    <li style="float: right;">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">${worklifeUserVO.realName eq null || worklifeUserVO.realName eq '' ? worklifeUserVO.username : worklifeUserVO.realName}
                            <span class="caret"></span>
                        </a>
                        <ul role="menu" class="dropdown-menu">
                            <li><a href="" data-toggle="modal" data-backdrop="static" data-target="#modalChangePassword">Đổi mật khẩu</a></li>
                        </ul>
                    </li>
                </sec:authorize>
            </ul>
        </div>
    </nav>
</div>
<%--<div class="modal fade" id="modalChangePassword" role="dialog">
	<div class="modal-dialog">
		<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" onClick="emptValue()">&times;</button>
				<h4 class="modal-title">Đổi mật khẩu</h4>
			</div>
			<div class="modal-body">
				<form action="" id="changePassword">
					<div class="form-group">
						<label for="psw">
							<span class="fa fa-user"></span>
							Tên đăng nhập
						</label>
						<input type="text" class="form-control" id="userName" readonly="readonly">
						<p id="userNameVali" style="color: red"></p>
					</div>
					<div class="form-group">
						<label for="psw">
							<span class="fa fa-lock"></span>
							Mật khẩu mới
						</label>
						<input type="password" class="form-control" id="newPassword" maxlength="32" placeholder="Enter new password">
						<p id="newPasswordVali" style="color: red"></p>
					</div>
					<div class="form-group">
						<label for="psw">
							<span class="fa fa-lock"></span>
							Nhập lại mật khẩu mới
						</label>
						<input type="password" class="form-control" id="confirmPassword" maxlength="32" placeholder="Enter confirm password">
						<p id="confirmPasswordVali" style="color: red"></p>
					</div>
					<div class="form-group">
						<label for="psw">
							<span class="fa fa-unlock-alt"></span>
							Mật khẩu cũ
						</label>
						<input type="password" class="form-control" id="oldPassword" maxlength="32" placeholder="Enter old password">
						<p id="oldPasswordVali" style="color: red"></p>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" onClick="changePassword()" id="okChange" class="btn btn-primary">OK</button>
				<button type="button" onClick="emptValue()" id="closeModel" class="btn btn-default">Cancel</button>
			</div>
		</div>
	</div>
</div>--%>
</body>
</html>
