formManager = (function () {
    let tableDSDiemDenDB;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        utils.loadDatePicker();
        utils.initTuyenDuong();
        utils.initHuyenSelect2();
        tableDSDiemDenDB = initTableDSDiemDenDB();
        $('#btnSave').on('click', btnSave);
        selectedRow();
        utils.initNotifyMessageBox();
        $('#btnReset').on('click', btnReset);
        $('#btnTim').on('click', btnTim);
    };
    let initTableDSDiemDenDB = function() {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {"targets": 1, class:"text-center", width: "20%", "mData": "tenDuong", "orderable": false},
            {"targets": 2, class:"text-center", width: "20%", "mData": "lyTrinh", "orderable": false},
            {"targets": 3, class:"text-center", width: "15%", "mData": "loai", "orderable": false,
                render: function (data, type, row, meta) {
                    let loai = '';
                    if (row.loai === 1)
                        loai = "Điểm đen";
                    else
                        loai = "Điểm tiềm ẩn tai nạn giao thông";
                    return loai;
                }
            },
            {"targets": 4, class:"text-center", width: "20%", "mData": "nhieuHuyen", "orderable": false},
            {"targets": 5, class:"text-center", width: "10%", "mData": "vu_TN", "orderable": false},
            {"targets": 6, class:"text-center", width: "10%", "mData": "nam", "orderable": false},
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
                let idDiemDen = parseInt($("#idDiemDen").val());
                if (idDiemDen !== -1) {
                    tableDSDiemDenDB.$("tr").each(function() {
                        let data = tableDSDiemDenDB.row($(this)).data();
                        if (data.idDiemDen === idDiemDen) {
                            row = $(this);
                        }
                    });
                    if ($(row) != null) {
                        $(row).trigger('click');
                    }
                }
            },
            "pageLength": 30,
            'displayStart': parseInt($('#startAt').val()),
        };
        return datatableFactory.initAjaxDataSourceDataTable("tableDSDiemDenDB", colDefs, url + "/worklife/user/diemdenduongbo/getlistdiemden.do", function (settings) {
            let idHuyen = $('#huyenTP').val();
            let selLoaiDiem = $('#selLoaiDiem').val();
            let obj = {
                "optional": {
                    "loaiDiem": !selLoaiDiem ? -1 : selLoaiDiem,
                    "idHuyen": !idHuyen ? -1 : idHuyen,
                    "tenDuong": $('#stenDuong').val()
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };
    let btnSave = function () {
        let form = $('#formDiemDenDB');
        let idHuyenList = [];
        $('#nhieuHuyen').find(':selected').each(function (i, d) {
            idHuyenList.push($(d).attr('value'));
        });
        if (form.valid()){
            if (idHuyenList.length === 0) {
                form.append('<input name="nhieuHuyen" value="-1">');
            }
            let method = "POST";
            let modelAttribute = "diemDenVO";
            form.attr("method",method);
            form.attr("action",url + "/worklife/user/diemdenduongbo/saveForm.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
            form.attr("modelAttribute",modelAttribute);
            form.attr("enctype","multipart/form-data");
            form.submit();
        }
    };
    let selectedRow = function () {
        $('#tableDSDiemDenDB tbody').on('click', 'tr', function () {
            let data = tableDSDiemDenDB.row(this).data();
            $('#tableDSDiemDenDB').DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            if (data !== null){
                $.each(data, function (key, value) {
                    if (value === "0.0" || value === "0")
                        value = '';
                    $("#" + key).val(value);
                });
                if (data.listIdHuyen !== null && data.listIdHuyen !== ''){
                    $(".select2-hidden-accessible").select2().val(data.listIdHuyen.split(',')).trigger("change");
                }
            }
        })
    };
    let btnReset = function () {
        $('#formDiemDenDB').find('input[type="text"], textarea').val('');
        $('#idTuyenDuong').val(-1);
        $('#nhieuHuyen').val(null).trigger('change');
        $('.select2-search__field').attr('placeholder','Vui lòng chọn huyện/TP/TX');
        $('.select2-search__field').css('width','441px');
        $('#idDiemDen').val(-1);
        $('#tableDSDiemDenDB tr.selected').removeClass('selected');
        $('#loai').val(1);
    };
    let btnTim = function () {
        tableDSDiemDenDB.ajax.reload();
    };
    return{
        init: function () {
            return setup();
        }
    }
})();