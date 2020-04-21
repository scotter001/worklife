<%--
  ~ Copyright (c) 2018.
  ~ Author : Phat Thinh
  --%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<div class="row">
    <div class="col-md-2">
        <label>Ngày</label>
        <input type="text" class="form-control datepicker" data-mask="99/99/9999" name="ngayHHBB" id="NgayHHBB" />
    </div>
    <div class="col-md-2">
        <label>Huyện/Tp</label>
        <select class="form-control" name="huyenHHBB" id="HuyenHHBB">
            <option value="-1"></option>
        </select>
    </div>
    <div class="col-md-2">
        <label>Xã/Phường</label>
        <select class="form-control" name="xaPhuongHHBB" id="XaPhuongHHBB">
            <option value="-1"></option>
        </select>
    </div>
    <div class="col-md-2">
        <label>Tuyến đường</label>
        <select class="form-control" name="tuyenDuongHHBB" id="TuyenDuongHHBB">
            <option value="-1"></option>
        </select>
    </div>
    <div class="col-md-2">
        <label>Lý trình</label>
        <div class="input-group">
            <input type="text" class="col-md-3 form-control" style="width:33%" placeholder="km" name="diemDauKmHHBB" id="DiemDauKmHHBB" />
            <input type="text" class="col-md-3 form-control" style="width:33%" placeholder="+" name="diemDauCongHHBB" id="DiemDauCongHHBB" />
            <input type="text" class="col-md-4 form-control" style="width:33%" name="diemDauHHBB" id="DiemDauHHBB" />
        </div>
    </div>
    <div class="col-md-2">
        <label>Cầu, biển báo</label>
        <select class="form-control" name="cauBienBaoHHBB" id="CauBienBaoHHBB">
            <option value="-1"></option>
        </select>
    </div>
</div>
<br>
<div class="row">
    <div class="col-md-12">
        <label>Tình hình hư hỏng mặt đường</label>
        <textarea class="form-control" rows="5" name="tinhHinhHuHongMatDuongHHBB" id="TinhHinhHuHongMatDuongHHBB" ></textarea>
    </div>
</div>
<br/>
<div class="row">
    <div class="col-md-12">
        <label>Những việc đã được nhân viên tuần đường xử lý</label>
        <textarea class="form-control" rows="5" name="viecDaDuocXuLyHHBB" id="ViecDaDuocXuLyHHBB"></textarea>
    </div>
</div>
<br>
<div class="row">
    <div class="col-md-12">
        <label>Giải pháp khắc phục</label>
        <textarea class="form-control" rows="5"name="giaiPhapKhacPhucHHBB" id="GiaiPhapKhacPhucHHBB"></textarea>
    </div>
</div>


