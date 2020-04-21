formManager = (function () {
    let tableThongTinChiTiet, tableDSDuongTheoHat;
    let listUser = [];
    let listHuyen = [];
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        if ($('#group_Id').val() !== '1'){
            $('#idGroup').attr('disabled', true);
        }
        utils.initHatQuanLyFormBC();
        utils.initLoaiDuong();
        utils.initTuyenDuong();
        initHuyen();
        $('#idGroup').on('change',initUser);
        tableThongTinChiTiet = initTableThongTinChiTiet();
        tableDSDuongTheoHat = initTableDSDuongTheoHat();
        $('#btnAdd').on('click', btnAdd);
        $('#btnSave').on('click', btnSave);
        $('#btnTim').on('click', btnTim);
        $('#tableDSDuongTheoHat tbody').on('click', 'tr', selected);
        $('#btnThemMoi').on('click', btnThemMoi);
        $('#btnDelete').on('click', btnDelete);
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAll','isChecked');
        datatableFactory.checkBoxOnSelect('checkAll','isChecked');
        utils.initNotifyMessageBox();
    };
    let initUser = function (idGroup) {
        /*if (idGroup === undefined || idGroup === null)*/
            idGroup = $('#idGroup').val();
        return $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getuser.do",
            type: "POST",
            async: false,
            data: {idGroup: idGroup},
            success: function (data) {
                if (data !== null) {
                    listUser = data;
                }
            }
        });
    };
    let initHuyen = function () {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getlisthuyen.do",
            type: "POST",
            success: function (data) {
                if (data !== null) {
                    listHuyen = data;
                }
            }
        })
    };
    let initTableThongTinChiTiet = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checks isChecked" id="checkDD"/>';
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
            {"targets": 2, class: "text-center", width: "10%"},
            {"targets": 3, class: "text-center", width: "15%"},
            {"targets": 4, class: "text-center", width: "15%"},
            {"targets": 5, class: "text-center", width: "20%"},
            {"targets": 6, class: "text-center", width: "20%"},
            {"targets": 7, class: "text-center", width: "15%"},
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
                utils.initIChecks('i-checks');
            },
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableThongTinChiTiet', colDefs, opts, 1);
    };
    let initTableDSDuongTheoHat = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1 + '<input type="hidden" value="' + row.iddh + '">';
                }
            },
            {"targets": 1, class:"text-center", width: "20%", "mData": "group_Name", "orderable": false},
            {"targets": 2, class:"text-center", width: "15%", "mData": "ten", "orderable": false},
            {"targets": 3, class:"text-center", width: "15%", "mData": "tenDuong", "orderable": false},
            {"targets": 4, class:"text-center", width: "10%", "mData": "chieuDai", "orderable": false},
            {"targets": 5, class:"text-center", width: "20%", "mData": "tenHuyen", "orderable": false}
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
                let iddh = parseInt($("#iddh").val());
                if (iddh !== -1) {
                    tableDSDuongTheoHat.$("tr").each(function() {
                        let data = tableDSDuongTheoHat.row($(this)).data();
                        if (data.iddh === iddh) {
                            row = $(this);
                        }
                    });
                    if ($(row) != null) {
                        $(row).trigger('click');
                    }
                }
            },
            "pageLength": 15,
            'displayStart': parseInt($('#startAt').val()),
        };
        return datatableFactory.initAjaxDataSourceDataTable("tableDSDuongTheoHat", colDefs, url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getlistduonghat.do", function (settings) {
            let idGroup = $('#hatQuanLy').val();
            if (idGroup === null)
                idGroup = $('#group_Id').val();
            let idLoaiDuong = $('#loaiDuong').val();
            let obj = {
                "optional": {
                    "idGroup": idGroup,
                    "idLoaiDuong": !idLoaiDuong ? -1 : idLoaiDuong,
                    "tenDuong": $('#tenDuong').val()
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };
    let selected = function () {
        let iddh = tableDSDuongTheoHat.row(this).data().iddh;
        $('#tableDSDuongTheoHat').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        getInfoRow(iddh);
    };
    let getInfoRow = function (iddh) {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getdatabyiddn.do",
            type: "POST",
            data: {iddh: iddh},
            success: function (data) {
                if (data != null) {
                    $.each(data, function (key, value) {
                        $("#" + key).val(value);
                    });
                    let idGroup = $('#idGroup').val();
                    tableThongTinChiTiet.clear().draw();
                    if (data.listDoanDuongVOs !== null) {
                        for (let i = 0; i < data.listDoanDuongVOs.length; i++) {
                            let rowHtml = [
                                '<input type="checkbox" class="i-checks isChecked" id="checkDD"/>',
                                i + 1,
                                '<input type="text" class="form-control" name="listDoanDuongVOs[' + i + '].lyTrinh_Tu" value="' + data.listDoanDuongVOs[i].lyTrinh_Tu + '"/>'
                                + '<input type="hidden" name="listDoanDuongVOs[' + i + '].idDoan"  value="' + data.listDoanDuongVOs[i].idDoan + '">',
                                '<input type="text" class="form-control" name="listDoanDuongVOs[' + i + '].lyTrinh_Den"  value="' + data.listDoanDuongVOs[i].lyTrinh_Den + '" style="width: 100%"/>',
                                '<input type="text" class="form-control" name="listDoanDuongVOs[' + i + '].chieuDai" onchange="formManager.changeChieuDai(this)"  value="' + data.listDoanDuongVOs[i].chieuDai + '" style="width: 100%"/>',
                                createSel('listDoanDuongVOs[' + i + '].idHuyen', data.listDoanDuongVOs[i].idHuyen),
                                createSelUser('listDoanDuongVOs[' + i + '].idUser', data.listDoanDuongVOs[i].idUser, idGroup),
                                '<input type="text" class="form-control telephone"  value="' + (data.listDoanDuongVOs[i].telephone===null?'':data.listDoanDuongVOs[i].telephone) + '" style="width: 100%" disabled/>'
                            ];
                            $('.diaPhan').val(data.listDoanDuongVOs[i].idHuyen);
                            tableThongTinChiTiet.row.add(rowHtml).draw();
                            tableThongTinChiTiet.draw(false);
                            tableThongTinChiTiet.page('first').draw('page');
                        }
                        tableThongTinChiTiet.page.len(5).draw();
                        utils.initIChecks('i-checks');
                        datatableFactory.checkCheckBox('checkAll','isChecked');
                        datatableFactory.checkBoxOnSelect('checkAll','isChecked');
                    }
                }
            }
        })
    };
    let createSel = function (selName, idHuyen) {
        let selHtml = '<select class="form-control" name="'+selName+'" style="width:100%;" >';
        selHtml += '<option value="-1"></option>';
        listHuyen.forEach(function (item, index) {
            selHtml += '<option ' + (idHuyen == item.idHuyen ? 'selected' : '') + ' value="' + item.idHuyen + '">' + item.tenHuyen + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelUser = function (selName, idUser, idGroup) {
        if (idGroup !== undefined && idGroup !== null)
            initUser(idGroup);
        let selHtml = '<select class="form-control tuanduong" onchange="formManager.changeTuanDuong(this)" name="'+selName+'" style="width:100%;" >';
        selHtml += '<option value="-1"></option>';
        listUser.forEach(function (item, index) {
            selHtml += '<option ' + (idUser == item.id_User ? 'selected' : '') + ' value="' + item.id_User + '">' + item.fullName + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let btnTim = function () {
        tableDSDuongTheoHat.ajax.reload();
    };
    let btnAdd = function () {
        let idGroup = $('#idGroup').val();
        if (idGroup === '-1') {
            swal({
                title: "Thông báo",
                text: "Vui lòng chọn hạt quản lý",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        } else {
            let index = tableThongTinChiTiet.rows().count();
            let rowHtml = [
                '<input type="checkbox" class="i-checks isChecked" id="checkDD"/>',
                index + 1,
                '<input type="text" class="form-control" name="listDoanDuongVOs[' + index + '].lyTrinh_Tu"/>'
                + '<input type="hidden" name="listDoanDuongVOs[' + index + '].idDoan" value="-1">',
                '<input type="text" class="form-control" name="listDoanDuongVOs[' + index + '].lyTrinh_Den" style="width: 100%"/>',
                '<input type="text" class="form-control" name="listDoanDuongVOs[' + index + '].chieuDai" onchange="formManager.changeChieuDai(this)" style="width: 100%"/>',
                createSel('listDoanDuongVOs[' + index + '].idHuyen',''),
                createSelUser('listDoanDuongVOs[' + index + '].idUser', ''),
                '<input type="text" class="form-control telephone" style="width: 100%"/>'
            ];
            tableThongTinChiTiet.row.add(rowHtml).draw();
            datatableFactory.indexing('tableThongTinChiTiet', index);
            utils.initIChecks('i-checks');
            datatableFactory.checkCheckBox('checkAll','isChecked');
            datatableFactory.checkBoxOnSelect('checkAll','isChecked');
        }
    };
    let btnSave = function () {
        let iddh = $('#idGroup').val();
        $('#chieuDai').attr("disabled", false);
        if (tableThongTinChiTiet.data().count() !== 0) {
            tableThongTinChiTiet.page.len(tableThongTinChiTiet.data().count()).draw();
        }
        let form = $('#formDmTuyenDuongTheoHat');
        let method = "POST";
        let modelAttribute = "duongHatVO";
        let fd = new FormData($('#formDmTuyenDuongTheoHat')[0]);
        fd.set('listDoanDuongVOs.iddh', iddh);
        form.attr("method",method);
        form.attr("action",url + "/worklife/user/quanlytuyenduong/dmtdtheohat/saveForm.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        form.attr("modelAttribute",modelAttribute);
        form.attr("enctype","multipart/form-data");
        form.submit();
    };
    let btnThemMoi = function () {
        $('input[type="text"]').val('');
        $('input[type="hidden"]').val(-1);
        $('select').val(-1);
        tableThongTinChiTiet.clear().draw();
        $('#tableDSDuongTheoHat tbody tr.selected').removeClass('selected');
    };
    let btnDelete = function () {
        datatableFactory.removeRowByHoan("idDoan",tableThongTinChiTiet,rootPath+"/worklife/user/quanlytuyenduong/dmtdtheohat/deleteDoanDuong.do","checkAll",refeshTable);
    };
    let refeshTable = function () {
        datatableFactory.refreshPagination("tableThongTinChiTiet");
        datatableFactory.resetIndex(tableThongTinChiTiet, "listDoanDuongVOs");
    };
    return {
        init: function () {
            return setup();
        },
        changeTuanDuong: function (element) {
            let idUser = $(element).val();
            $.ajax({
                url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/gettelephone.do",
                type: "POST",
                data: {idUser: idUser},
                success: function (data) {
                    if (data != null) {
                        $(element).parent().next().find('.telephone').val(data.cellphone);
                    }
                }
            })
        },
        changeHQL: function (element) {
            let idGroup = $('#idGroup').val();
            if (idGroup !== null && idGroup !== undefined)
                $.ajax({
                    url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getuser.do",
                    type: "POST",
                    async: false,
                    data: {idGroup: idGroup},
                    success: function (data) {
                        if (data.length !== 0) {
                            let options = '<option value="-1"></option>';
                            for (let i = 0; i < data.length; i++) {
                                options += '<option value="' + data[i].id_User + '">' + data[i].fullName + '</option>'
                            }
                            $('.tuanduong').html(options);
                        }
                        else {
                            let options = '<option value="-1"></option>';
                            $('.tuanduong').html(options);
                        }
                    }
                });
        },
        changeChieuDai: function() {
            let total = 0;
            let rows = $('#tableThongTinChiTiet tbody tr').length;
            if (rows > 0) {
                for (let i = 0; i < rows; i++) {
                    total += parseFloat($('input[name="listDoanDuongVOs[' + i + '].chieuDai"]').val());
                }
            }
            $('#chieuDai').val(total);
        }
    }
})();