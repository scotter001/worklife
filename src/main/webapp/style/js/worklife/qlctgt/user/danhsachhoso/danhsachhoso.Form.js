formManager = (function () {
    let tableDanhSachDN, tableDanhSachHSBuoc1, tableDanhSachHoSo, tableListUser;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        initLoaiHoSo();
        initTrangThai();
        $('#idLoaiHoSo').on('change', cLoaiHoSo);
        $('#duLieuDN').on('click', duLieuDN);
        $('#hoSoB1').on('click', hoSoB1);
        $('#btnKhoiTaoHS').on('click', btnKhoiTaoHS);
        $(".closeModal").on('click',closeModal);
        tableDanhSachDN = initTableDanhSachDN();
        tableDanhSachHSBuoc1 = initTableDanhSachHSBuoc1();
        tableDanhSachHoSo = initTableDanhSachHoSo();
        $('#btnTim').on('click', btnTim);
        selectedRowDSHS();
        selectedUser();
        chuyenHoSo();
        $('#cBtnChuyen').on('click', cBtnChuyen);
        $('#btnAdd').on('click', btnAdd);
        $('#btnDelete').on('click', btnDelete);
        $('#btnLuuDN').on('click', btnLuuDN);
        $('#btnNhanDN').on('click', btnNhanDN);
        $('#sbtnTim').on('click', duLieuDN);
        $('#cBtnSave').on('click', cBtnSave);
        $('#xuLyHoSo').on('click', xuLyHoSo);
        $('#btnTaoMoi').on('click', btnTaoMoi);
        $('#btnSearch').on('click', btnSearch);
        selectRowHSBuoc1();
        $('#btnNhanHSB1').on('click', btnNhanHSB1);
        initValidate();
        _validatorUtils.init();
        utils.loadDatePicker();
        utils.initIChecks('i-checks');
        utils.initNotifyMessageBox();
    };
    let duLieuDN = function() {
        let tenDoanhNghiep = $('#sTenDoanhNghiep').val();
        $.ajax({
            url: url + '/worklife/qlctgt/user/danhsachhoso/danhsachdn/getlistdn.do',
            type: 'post',
            data: {tenDoanhNghiep: tenDoanhNghiep},
            success: function (data) {
                    tableDanhSachDN.clear().draw();
                    for (let index = 0; index < data.length; index++) {
                        let dmDoanhNghiepVOS = data[index];
                        let rowHTML = [
                            '<input type="checkbox" class="i-checks isChecked" id="checked"/>',
                            index + 1,
                            '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].ten" value="'+dmDoanhNghiepVOS.ten+'" style="width: 100%"/>'
                            + '<input type="hidden" name="dmDoanhNghiepVOS[' + index + '].idDMDN" value="'+dmDoanhNghiepVOS.idDMDN+'">',
                            '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].diaChi" value="'+dmDoanhNghiepVOS.diaChi+'" style="width: 100%"/>',
                            '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].nguoiDaiDien" value="'+dmDoanhNghiepVOS.nguoiDaiDien+'"/>',
                            '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].chucVu" value="'+dmDoanhNghiepVOS.chucVu+'"/>',
                            '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].dienThoai" value="'+dmDoanhNghiepVOS.dienThoai+'"/>'
                        ];
                        tableDanhSachDN.row.add(rowHTML).draw();
                        tableDanhSachDN.draw(false);
                        tableDanhSachDN.page('first').draw('page');
                    }
                    tableDanhSachDN.page.len(5).draw();
                    utils.initIChecks('i-checks');
                    datatableFactory.checkCheckBox('checkAll','isChecked');
                    datatableFactory.checkBoxOnSelect('checkAll','isChecked');
            }
        });
        $("#donViDNModal").removeClass("hidden");
    };
    let hoSoB1 = function() {
        tableDanhSachHSBuoc1.ajax.reload();
        $('#DSHoSoBuoc1').removeClass('hidden');
    };
    let btnKhoiTaoHS = function() {
        $("#donViDNModal").addClass('hidden');
        $('#DSHoSoBuoc1').addClass('hidden');
    };
    let closeModal = function(){
        $("#donViDNModal").addClass('hidden');
        $('#DSHoSoBuoc1').addClass('hidden');
    };
    let initLoaiHoSo = function() {
        $.ajax({
            url: url + '/worklife/qlctgt/user/danhsachhoso/getlistloaihs.do',
            method: 'post',
            success: function (data) {
                if(data != null){
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++){
                        options += '<option value="'+data[i].id_LoaiHoSo+'" haibuoc = "'+data[i].haiBuoc+'">'+data[i].tenLoaiHoSo+'</option>';
                    }
                    $('#idLoaiHoSo, #selLoaiHS').html(options);
                }
            }
        })
    };
    let initTrangThai = function (){
        $.ajax({
            url: url + '/worklife/qlctgt/user/danhsachhoso/getlisttrangthai.do',
            method: 'post',
            success: function (data) {
                if(data != null){
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++){
                        options += '<option value="'+data[i].idTrangThai+'">'+data[i].tenTrangThai+'</option>';
                    }
                    $('#selTrangThai,#trangThai').html(options);
                }
            }
        })
    };
    let cLoaiHoSo = function() {
        $("#donViDNModal").addClass('hidden');
        $('#DSHoSoBuoc1').addClass('hidden');
        let haibuoc = $('#idLoaiHoSo option:selected').attr('haibuoc');
        if (haibuoc === '0'){
            $('#duLieuDN').show();
            $('#hoSoB1').hide();
            $('#cBtnSave').removeClass('hidden');
            $('#ctrinh').addClass('hidden');
        }
        else {
            $('#duLieuDN').hide();
            $('#hoSoB1').show();
            $('#cBtnSave').addClass('hidden');
            $('#ctrinh').removeClass('hidden');
        }
    };
    let initTableDanhSachDN = function() {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checks isChecked" id="checked"/>';
                }
            },
            {
                "sWidth": "5%",
                "targets": 1,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {"targets": 2, class: "text-center", "sWidth": "19%"},
            {"targets": 3, class: "text-center", "sWidth": "19%"},
            {"targets": 4, class: "text-center", "sWidth": "19%"},
            {"targets": 5, class: "text-center", "sWidth": "19%"},
            {"targets": 6, class: "text-center", "sWidth": "14%"}
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
                utils.initIChecks("i-checks");
            },
            "scrollX": true
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableDanhSachDN', colDefs, opts, 1);
    };
    let initTableDanhSachHSBuoc1 = function() {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1
                        + '<input type="hidden" name="idDMDN" value="'+row.idDMDN+'">'
                        + '<input type="hidden" name="idCongTrinh" value="'+row.idCongTrinh+'">';
                }
            },
            {"targets": 1, class:"text-center", width: "25%", "mData": "soBienNhan", "orderable": false},
            {"targets": 2, class:"text-center", width: "20%", "mData": "tenDoanhNghiep", "orderable": false},
            {"targets": 3, class:"text-center", width: "25%", "mData": "diaChi_DoanhNghiep", "orderable": false},
            {"targets": 4, class:"text-center", width: "25%", "mData": "tenCongTrinh", "orderable": false}
        ];
        let opts = {
            'deferLoading' : null,
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
                utils.initIChecks("i-checks");
            },
            "scrollX": true,
            "pageLength": 10,
        };
        return datatableFactory.initAjaxDataSourceDataTable("tableDanhSachHSBuoc1", colDefs, url + "/worklife/qlctgt/user/danhsachhs/kths/getlisthsbuoc1.do", function (settings) {
            let obj = {
                "optional": {
                    "idLoaiHoSo": $('#idLoaiHoSo').val(),
                    "tenCongTrinh": $('#tenCT').val(),
                    "tenDoanhNghiep": $('#tenDN').val()
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };
    let initTableDanhSachHoSo = function() {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1
                        + '<input type="hidden" name="idHoSo" value="'+row.idHoSo+'">'
                        + '<input type="hidden" name="idLoaiHoSo" value="'+row.idLoaiHoSo+'">'
                        + '<input type="hidden" name="idDanhSach_HoSo" value="'+row.idDanhSach_HoSo+'">';
                }
            },
            {"targets": 1, class:"text-center", width: "10%", "mData": "soBienNhan", "orderable": false},
            {"targets": 2, class:"text-center", width: "15%", "mData": "tenLoaiHS", "orderable": false},
            {"targets": 3, class:"text-center", width: "20%", "mData": "tenDoanhNghiep", "orderable": false},
            {"targets": 4, class:"text-center", width: "20%", "mData": "diaChi_DN", "orderable": false},
            {"targets": 5, class:"text-center", width: "10%", "mData": "ngayNhan", "orderable": false},
            {"targets": 6, class:"text-center", width: "10%", "mData": "ngayHenTra", "orderable": false},
            {"targets": 7, class:"text-center", width: "10%", "mData": "tenTrangThai", "orderable": false}
        ];
        let opts = {
            'deferLoading' : null,
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
            },
            "pageLength": 10
        };
        return datatableFactory.initAjaxDataSourceDataTable("tableDanhSachHoSo", colDefs, url + "/worklife/qlctgt/user/danhsachhs/getlisthoso.do", function (settings) {
            let obj = {
                "optional": {
                    "loaiHoSo": $('#selLoaiHS').val(),
                    "trangThai": $('#selTrangThai').val(),
                    "idUser": $('#user_Nhan').val()
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };
    let selectedRowDSHS = function() {
        $('#tableDanhSachHoSo tbody').on('click','tr', function () {
            if (!$(this).hasClass('selected')) {
                tableDanhSachHoSo.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    };
    let btnTim = function() {
        tableDanhSachHoSo.ajax.reload();
    };
    let selectedUser = function() {
        $('#tableListUser tbody').on('click', 'tr', function () {
            if (!$(this).hasClass('selected')) {
                $('#tableListUser tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        })
    };
    let chuyenHoSo = function(){
        $('#btnChuyen').on('click', function () {
            let data = tableDanhSachHoSo.row('.selected').data();
            if (data === undefined){
                swal({
                    title: "Thông báo",
                    text: "Vui lòng chọn một dòng để chuyển",
                    type: "warning",
                    confirmButtonText: "Đồng ý"
                });
            }
            else {
                $('#btnChuyen').attr('data-target','#chuyenHoSoModal');
                $('#trangThai').val(data.trangThai);
                $('#phongBan').val($('#group_Name').val());
            }
        })
    };
    let cBtnChuyen = function() {
        if ($('#tableListUser tr.selected').length < 1) {
            swal({
                title: "Thông báo",
                text: "Vui lòng chọn người nhận",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        }
        else {
            let form = $('#chuyenHoSoForm');
            form.append("<input type='hidden' name='idHoSo' value='"+$('#tableDanhSachHoSo tbody').find('tr.selected td:first').find('input[name="idHoSo"]').val()+"'/>");
            form.append("<input type='hidden' name='idLoaiHoSo' value='"+$('#tableDanhSachHoSo tbody').find('tr.selected td:first').find('input[name="idLoaiHoSo"]').val()+"'/>");
            form.append("<input type='hidden' name='idDanhSach_HoSo' value='"+$('#tableDanhSachHoSo tbody').find('tr.selected td:first').find('input[name="idDanhSach_HoSo"]').val()+"'/>");
            let d = new Date();
            let ngayHoanThanh_HoSo = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
            if ($('#trangThai').val() === '8')
                form.append('<input type="hidden" name="ngayHoanThanh_HoSo" value="'+ngayHoanThanh_HoSo+'">');
            if (form.valid()){
                let method = "POST";
                let modelAttribute = "danhSachHoSoVO";
                form.attr("method",method);
                form.attr("action",url + "/worklife/qlctgt/user/danhsachhs/chuyenhoso/saveFormCHS.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
                form.attr("modelAttribute",modelAttribute);
                form.attr("enctype","multipart/form-data");
                form.submit();
            }
        }
    };
    let btnAdd = function () {
        let index = tableDanhSachDN.rows().count();
        let rowHTML = [
            '<input type="checkbox" class="i-checks isChecked" id="checked"/>',
            index + 1,
            '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].ten" style="width: 100%"/>'
            + '<input type="hidden" name="dmDoanhNghiepVOS[' + index + '].idDMDN" value="-1">',
            '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].diaChi" style="width: 100%"/>',
            '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].nguoiDaiDien"/>',
            '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].chucVu"/>',
            '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].dienThoai"/>'
        ];
        tableDanhSachDN.row.add(rowHTML).draw();
        datatableFactory.indexing('tableDanhSachDN', index);
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAll','isChecked');
        datatableFactory.checkBoxOnSelect('checkAll','isChecked');
    };
    let btnDelete = function() {
        datatableFactory.removeRowByHoan("idDMDN", tableDanhSachDN, url + "/worklife/qlctgt/user/danhsachdn/deletedn.do", "checkAll", refeshTable);
    };
    let refeshTable = function () {
        datatableFactory.refreshPagination("tableDanhSachDN");
        datatableFactory.resetIndex(tableDanhSachDN, "dmDoanhNghiepVOS");
    };
    let btnLuuDN = function () {
        let form = $('#formDoanhNghiep');
        let tableDanhSachDN = $('#tableDanhSachDN').DataTable();
        if (tableDanhSachDN.data().count() !== 0) {
            tableDanhSachDN.page.len(tableDanhSachDN.data().count()).draw();
        }
        let fd = new FormData($('#formDoanhNghiep')[0]);
        if (form.valid()){
            $.ajax({
                url: url + "/worklife/qlctgt/user/danhsachhoso/danhsachdn/save.do",
                type: "POST",
                data: fd,
                processData: false, // tell jQuery not to process the data
                contentType: false, // tell jQuery not to set contentType
                success: function (data) {
                    if (data != null) {
                        if (data.dmDoanhNghiepVOS !== null && data.dmDoanhNghiepVOS.length > 0) {
                            tableDanhSachDN.clear().draw();
                            for (let index = 0; index < data.dmDoanhNghiepVOS.length; index++) {
                                let dmDoanhNghiepVOS = data.dmDoanhNghiepVOS[index];
                                let rowHTML = [
                                    '<input type="checkbox" class="i-checks isChecked" id="checked"/>',
                                    index + 1,
                                    '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].ten" value="'+dmDoanhNghiepVOS.ten+'" style="width: 100%"/>'
                                    + '<input type="hidden" name="dmDoanhNghiepVOS[' + index + '].idDMDN" value="'+dmDoanhNghiepVOS.idDMDN+'">',
                                    '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].diaChi" value="'+dmDoanhNghiepVOS.diaChi+'" style="width: 100%"/>',
                                    '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].nguoiDaiDien" value="'+dmDoanhNghiepVOS.nguoiDaiDien+'"/>',
                                    '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].chucVu" value="'+dmDoanhNghiepVOS.chucVu+'"/>',
                                    '<input type="text" class="form-control" name="dmDoanhNghiepVOS[' + index + '].dienThoai" value="'+dmDoanhNghiepVOS.dienThoai+'"/>'
                                ];
                                tableDanhSachDN.row.add(rowHTML).draw();
                                tableDanhSachDN.draw(false);
                                tableDanhSachDN.page('first').draw('page');
                            }
                            tableDanhSachDN.page.len(5).draw();
                            utils.initIChecks('i-checks');
                            datatableFactory.checkCheckBox('checkAll','isChecked');
                            datatableFactory.checkBoxOnSelect('checkAll','isChecked');
                        }
                        swal({
                            title: "Thông báo",
                            text: "Lưu thành công",
                            type: "success",
                            confirmButtonText: "Đồng ý"
                        });
                    }
                    else {
                        swal({
                            title: "Thông báo",
                            text: "Lưu thất bại",
                            type: "warning",
                            confirmButtonText: "Đồng ý"
                        });
                    }
                }
            })
        }
    };
    let btnNhanDN = function () {
        let isChecked = tableDanhSachDN.$('tr').find("td:first-child input:checked");
        if (isChecked.length === 0){
            swal({
                title: "Thông báo",
                text: "Vui lòng chọn một dòng trên danh sách",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        }
        else if (isChecked.length > 1){
            swal({
                title: "Thông báo",
                text: "Vui lòng chọn chỉ chọn một dòng trên danh sách",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        }
        else {
            let idDMDN = isChecked.parents('td').next().next().children('input[type="hidden"]').val();
            let tenDoanhNghiep = isChecked.parents('td').next().next().children('input[type="text"]').val();
            let diaChi = isChecked.parents('td').next().next().next().children('input[type="text"]').val();
            $('#idDMDN').val(idDMDN);
            $('#tenDoanhNghiep').val(tenDoanhNghiep);
            $('#diaChi_DN').val(diaChi);
            $("#donViDNModal").addClass('hidden');
        }
    };
    let initValidate = function(){
        khoiTaoHoSoForm = $("#khoiTaoHoSoForm").validate({
            rules : {
                "idLoaiHoSo" : {
                    min: 1
                },
                "soBienNhan" : {
                    required : true,
                    remote : {
                        type : "POST",
                        url : url + '/worklife/qlctgt/user/file/receptionnumber.do',
                        data : {
                            soBienNhan : function(){
                                return $("#soBienNhan").val();
                            }
                        }

                    }
                },
                "ngayNhan": {
                    required: true,
                    dateformat: true,
                    datemax: true
                },
                "ngayHenTra": {
                    required: true,
                    dateformat: true,
                    issameorafter: "#ngayNhan"
                }
            },
            messages : {
                "idLoaiHoSo" : {
                    min : "Vui lòng chọn loại hồ sơ",
                },
                "soBienNhan" : {
                    required : "Vui lòng nhập số biên nhận",
                    remote : "Số biên nhận đã tồn tại"
                },
                "ngayNhan": {
                    required: "Vui lòng nhập ngày nhận",
                },
                "ngayHenTra": {
                    required: "Vui lòng nhập ngày hẹn trả",
                }
            }
        });
    };
    let cBtnSave = function () {
        let form = $('#khoiTaoHoSoForm');
        let valid = form.valid();
        if (valid){
            let method = "POST";
            let modelAttribute = "hoSoVO";
            form.attr("method",method);
            form.attr("action",url + "/worklife/qlctgt/user/danhsachhs/kths/saveForm.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
            form.attr("modelAttribute",modelAttribute);
            form.attr("enctype","multipart/form-data");
            form.submit();
        }
    };
    let _validatorUtils = (function () {
        let setup = function () {
            method.date();
            method.datemax();
            method.dateless();
            method.yearmax();
            required.date();
            method.compareToDate();
        };
        let method = {
            date: function (message) {
                $.validator.addMethod("dateformat", function (value) {
                    if (value && "__/__/____" !== value) {
                        let dNewDate = moment(value, 'DD/MM/YYYY').isValid();
                        return dNewDate;
                    }
                    return true;
                }, message !== undefined ? message : "Ngày không hợp lệ");
            },
            datemax: function (message) {
                $.validator.addMethod("datemax", function (value, element) {
                    if (value && "__/__/____" !== value) {
                        let currentDate = moment(new Date(), 'DD/MM/YYYY');
                        let date = moment(value, 'DD/MM/YYYY');
                        return date.isBefore(currentDate);
                    }
                    return true;
                }, message !== undefined ? message : "Ngày nhập không được lớn hơn ngày hiện tại");
            },
            dateless: function (message) {
                $.validator.addMethod("dateless", function (value, element, params) {
                    let target = $(params).val();
                    if (!value || value === '__/__/____' || !target || target === "__/__/____") {
                        return true;
                    }
                    let new_end_date = moment(value, 'DD/MM/YYYY');
                    let new_start_date = moment(target, 'DD/MM/YYYY');
                    return new_start_date.isSameOrBefore(new_end_date);
                }, message !== undefined ? message : "Ngày hẹn phải lớn hơn ngày nhận");
            },
            compareToDate: function (message) {
                $.validator.addMethod("issameorafter", function (value, element, params) {
                    let target = $(params).val();
                    if (!value || value === '__/__/____' || !target || target === "__/__/____") {
                        return true;
                    }
                    let new_end_date = moment(value, 'DD/MM/YYYY');
                    let new_start_date = moment(target, 'DD/MM/YYYY');
                    return !new_start_date.isSameOrAfter(new_end_date);
                }, message !== undefined ? message : "Ngày nhận phải nhỏ hơn ngày hẹn trả");
            },
            yearmax: function (message) {
                $.validator.addMethod("yearmax", function (value, element) {
                    let currentYear = new Date().getFullYear();
                    return value === "" || value <= currentYear;
                }, message !== undefined ? message : "Năm nhập không được nhỏ hơn năm hiện tại");
            }
        };
        let required = {
            date: function (message) {
                $.validator.addMethod("date-required", function (value) {
                    let sNewDate = value;
                    return !("" === sNewDate || "__/__/____" === sNewDate);
                }, message !== undefined ? message : "Vui lòng nhập ngày tháng");
            },
        };
        return {
            init: function () {
                return setup();
            },
            getDateFormat: function (message) {
                return method.date(message);
            },
            getDateMax: function (message) {
                return method.datemax(message);
            },
            getDateCompare: function (message) {
                return method.dateless(message);
            },
            getEmail: function () {
                return method.email();
            }
        }
    })();
    let xuLyHoSo = function () {
        let isSelected = $('#tableDanhSachHoSo tr.selected').length;
        let idHoSo = $('#tableDanhSachHoSo tr.selected').find('input[name="idHoSo"]').val();
        if (isSelected === 0) {
            swal({
                title: "Thông báo",
                text: "Vui lòng chọn hồ sơ để xử lý",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        }
        else {
            let idLoaiHoSo = $('#tableDanhSachHoSo tr.selected').find('input[name="idLoaiHoSo"]').val();
            if (idLoaiHoSo === '1'){
                window.open(url + '/worklife/qlctgt/user/danhsachhs/xulyhoso/cpcaitaoviahe.do?idHoSo=' + parseInt(idHoSo));
            }
            else if (idLoaiHoSo === '2'){

            }
            else if (idLoaiHoSo === '3' || idLoaiHoSo === '4'){
                window.open(url + '/worklife/qlctgt/user/danhsachhs/xulyhoso/hosocpctdnd.do?idHoSo=' + parseInt(idHoSo));

            }
            else if (idLoaiHoSo === '5' || idLoaiHoSo === '6'){
                window.open(url + '/worklife/qlctgt/user/danhsachhs/xulyhoso/hosocpctthietyeu.do?idHoSo=' + parseInt(idHoSo));
            }
            else if (idLoaiHoSo === '7'){
                window.open(url + '/worklife/qlctgt/user/danhsachhs/xulyhoso/hscpdnhttthoatnuoctthai.do?idHoSo=' + parseInt(idHoSo));
            }
        }
    };
    let btnTaoMoi = function () {
        $('#khoiTaoHoSoForm input').val('');
        $('#khoiTaoHoSoForm select').val(-1);
        $('#duLieuDN, #hoSoB1').hide();
        $("#donViDNModal").addClass('hidden');
        $('#DSHoSoBuoc1').addClass('hidden');
    };
    let btnSearch = function () {
        tableDanhSachHSBuoc1.ajax.reload();
    };
    let selectRowHSBuoc1 = function () {
        $('#tableDanhSachHSBuoc1 tbody').on('click','tr', function () {
            if (!$(this).hasClass('selected')) {
                tableDanhSachHSBuoc1.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    };
    let btnNhanHSB1 = function () {
        let isSelected = $('#tableDanhSachHSBuoc1 tr.selected');

        if (isSelected.length === 0){
            swal({
                title: "Thông báo",
                text: "Vui lòng chọn một dòng trên danh sách",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        }
        else {
            let idDMDN = isSelected.find('td:first input[name="idDMDN"]').val();
            let idCongTrinh = isSelected.find('td:first input[name="idCongTrinh"]').val();
            let tenDoanhNghiep = isSelected.find('td:eq(2)').text();
            let diaChi = isSelected.find('td:eq(3)').text();
            let tenCongTrinh = isSelected.find('td:eq(4)').text();
            $('#idDMDN').val(idDMDN);
            $('#tenDoanhNghiep').val(tenDoanhNghiep);
            $('#diaChi_DN').val(diaChi);
            $('#tenCongTrinh').val(tenCongTrinh);
            $('#idCongTrinh').val(idCongTrinh);
            $('#DSHoSoBuoc1').addClass('hidden');
            $('#cBtnSave').removeClass('hidden');
        }
    };
    return{
        init: function () {
            return setup();
        },
    }
})();