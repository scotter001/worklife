formManager = (function () {
    let tableDSCau;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        utils.initHatQuanLyFormBC();
        utils.initTuyenDuong();
        utils.initHuyen();
        initTinhTrangCau();
        initCapQL();
        initKetCau();
        initDangCau();
        tableDSCau = initTableDSCau();
        $('#btnTim').on('click', btnTim);
        $('#tableDSCau tbody').on('click', 'tr', selectedRow);
        $('#btnReset').on('click', btnReset);
        $('#btnSave').on('click', btnSave);
        utils.initNotifyMessageBox();
    };
    let initTinhTrangCau = function() {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/ttchitietduong/getlistttduong.do",
            type: "POST",
            success: function (data) {
                if (data !== null){
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++) {
                        options += '<option value="' + data[i].idTinhTrang + '">' + data[i].ten + '</option>';
                    }
                    $('#tinhTrang').html(options);
                }
            }
        })
    };
    let initCapQL = function() {
        $.ajax({
            url: url + "/worklife/user/quanlycau/getlistdonviql.do",
            type: "POST",
            success: function (data) {
                if (data !== null){
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++) {
                        options += '<option value="' + data[i].idDonViQL + '">' + data[i].ten + '</option>';
                    }
                    $('#donViQL').html(options);
                }
            }
        })
    };
    let initKetCau = function () {
        $.ajax({
            url: url + "/worklife/user/quanlycau/getlistkeucau.do",
            type: "POST",
            success: function (data) {
                if (data !== null){
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++) {
                        options += '<option value="' + data[i].id + '">' + data[i].ten + '</option>';
                    }
                    $('#kCMo_Mong, #kCMo_Than, #kCTru_Mong, #kCTru_Than').html(options);
                }
            }
        })
    };
    let initDangCau = function () {
        $.ajax({
            url: url + "/worklife/user/quanlycau/getlistdangcau.do",
            type: "POST",
            success: function (data) {
                if (data !== null) {
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++) {
                        options += '<option value="' + data[i].id + '">' + data[i].ten + '</option>';
                    }
                    $('#dangCau').html(options);
                }
            }
        })
    };
    let initTableDSCau = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1 + '<input type="hidden" value="' + row.idCau + '">';
                }
            },
            {"targets": 1, class:"text-center", width: "10%", "mData": "tenCau", "orderable": false},
            {"targets": 2, class:"text-center", width: "20%", "mData": "tenDuong", "orderable": false},
            {"targets": 3, class:"text-center", width: "20%", "mData": "tenHatQL", "orderable": false},
            {"targets": 4, class:"text-center", width: "10%", "mData": "lyTrinhKm", "orderable": false},
            {"targets": 5, class:"text-center", width: "15%", "mData": "tenHuyen", "orderable": false},
            {"targets": 6, class:"text-center", width: "10%", "mData": "taiTrong_KT", "orderable": false},
            {"targets": 7, class:"text-center", width: "10%", "mData": "tenTinhTrang", "orderable": false},
        ];
        let opts = {
            'deferLoading' : null,
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
                let row = null;
                let idCau = parseInt($("#idCau").val());
                if (idCau !== -1) {
                    tableDSCau.$("tr").each(function() {
                        let data = tableDSCau.row($(this)).data();
                        if (data.idCau === idCau) {
                            row = $(this);
                        }
                    });
                    if ($(row) != null) {
                        $(row).trigger('click');
                    }
                }
            },
            "pageLength": 10,
            'displayStart': parseInt($('#startAt').val()),
        };
        return datatableFactory.initAjaxDataSourceDataTable("tableDSCau", colDefs, url + "/worklife/user/quanlycau/getlistcau.do", function (settings) {
            let idGroup = $('#hatQuanLy').val();
            if (idGroup === null)
                idGroup = $('#group_Id').val();
            let idHuyen = $('#huyenTP').val();
            let obj = {
                "optional": {
                    "idGroup": idGroup,
                    "idHuyen": !idHuyen ? -1 : idHuyen,
                    "tenDuong": $('#stenDuong').val(),
                    "tenCau": $('#stenCau').val()
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };
    let btnTim = function () {
        tableDSCau.ajax.reload();
    };
    let selectedRow = function () {
        let data = tableDSCau.row(this).data();
        $('#tableDSCau').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        if (data !== null){
            $.each(data, function (key, value) {
                $("#" + key).val(value);
            });
        }
    };
    let btnReset = function () {
        $('#formQLCau input[type="text"]').val('');
        $('#formQLCau select').val(-1);
        $('#formQLCau input[type="hidden"]').val(0);
        $('#tableDSCau tbody tr.selected').removeClass('selected');
    };
    let btnSave = function () {
        let form = $('#formQLCau');
        let method = "POST";
        let modelAttribute = "cauVO";
        form.attr("method",method);
        form.attr("action",url + "/worklife/user/quanlycau/saveForm.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        form.attr("modelAttribute",modelAttribute);
        form.attr("enctype","multipart/form-data");
        form.submit();
    };
    return{
        init: function () {
            return setup();
        }
    }
})();