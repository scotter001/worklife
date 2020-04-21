formManager = (function () {
    let tableChiTietDuongTheoHat,tableDSLyTrinh;
    let listKetCauMD = [];
    let listCapQL = [];
    let listTTDuong = [];
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        utils.initHatQuanLyFormBC();
        utils.initLoaiDuong();
        utils.initTuyenDuong();
        initKetCauMatDuong();
        initCapQL();
        initTinhTrangDuong();
        tableChiTietDuongTheoHat = initTableChiTietDuongTheoHat();
        tableDSLyTrinh = initTableDSLyTrinh();
        $('#btnTim').on('click', btnTim);
        $('#tableChiTietDuongTheoHat tbody').on('click', 'tr', selected);
        $('#btnAdd').on('click', btnAdd);
        $('#btnSave').on('click', btnSave);
        $('#btnDelete').on('click', btnDelete);
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAll','isChecked');
        datatableFactory.checkBoxOnSelect('checkAll','isChecked');
        utils.initNotifyMessageBox();
    };
    let initKetCauMatDuong = function() {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/ttchitietduong/getlistketcaumatdg.do",
            type: "POST",
            success: function (data) {
                if (data !== null){
                    listKetCauMD = data;
                }
            }
        })
    };
    let initCapQL = function() {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/ttchitietduong/getlistcapql.do",
            type: "POST",
            success: function (data) {
                if (data !== null){
                    listCapQL = data;
                }
            }
        })
    };
    let initTinhTrangDuong = function() {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/ttchitietduong/getlistttduong.do",
            type: "POST",
            success: function (data) {
                if (data !== null){
                    listTTDuong = data;
                }
            }
        })
    };
    let initTableChiTietDuongTheoHat = function () {
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
            {"targets": 1, class:"text-center", width: "25%", "mData": "group_Name", "orderable": false},
            {"targets": 2, class:"text-center", width: "20%", "mData": "ten", "orderable": false},
            {"targets": 3, class:"text-center", width: "25%", "mData": "tenDuong", "orderable": false},
            {"targets": 4, class:"text-center", width: "25%", "mData": "tenHuyen", "orderable": false}
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
                    tableChiTietDuongTheoHat.$("tr").each(function() {
                        let data = tableChiTietDuongTheoHat.row($(this)).data();
                        if (data.iddh === iddh) {
                            row = $(this);
                        }
                    });
                    if ($(row) != null) {
                        $(row).trigger('click');
                    }
                }
            },
            "pageLength": 10,
            "displayStart": parseInt($('#startAt').val()),
        };
        return datatableFactory.initAjaxDataSourceDataTable("tableChiTietDuongTheoHat", colDefs, url + "/worklife/user/quanlytuyenduong/ttchitietduong/getlistduong.do", function (settings) {
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
    let initTableDSLyTrinh = function() {
        let colDefs = [
            {
                "sWidth": "4%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checks isChecked" id="checkLT"/>';
                }
            },
            {
                "sWidth": "4%",
                "targets": 1,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {"targets": 2, class: "text-center", "sWidth": "7%"},
            {"targets": 3, class: "text-center", "sWidth": "7%"},
            {"targets": 4, class: "text-center", "sWidth": "7%"},
            {"targets": 5, class: "text-center", "sWidth": "7%"},
            {"targets": 6, class: "text-center", "sWidth": "7%"},
            {"targets": 7, class: "text-center", "sWidth": "7%"},
            {"targets": 8, class: "text-center", "sWidth": "7%"},
            {"targets": 9, class: "text-center", "sWidth": "10%"},
            {"targets": 10, class: "text-center", "sWidth": "9%"},
            {"targets": 11, class: "text-center", "sWidth": "7%"},
            {"targets": 12, class: "text-center", "sWidth": "7%"},
            {"targets": 13, class: "text-center", "sWidth": "10%"}
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
            "scrollX": true
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableDSLyTrinh', colDefs, opts, 1);
    };
    let btnTim = function () {
        tableChiTietDuongTheoHat.ajax.reload();
    };
    let selected = function () {
        let iddh = tableChiTietDuongTheoHat.row(this).data().iddh;
        $('#tableChiTietDuongTheoHat').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        getInfoDetailRow(iddh);
    };
    let getInfoDetailRow = function (iddh) {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/ttchitietduong/getdatabyiddn.do",
            type: "POST",
            data: {iddh: iddh},
            success: function (data) {
                if (data != null) {
                    $.each(data, function (key, value) {
                        $("#" + key).val(value);
                    });
                    tableDSLyTrinh.clear().draw();
                    if (data.lyTrinhVOS !== null && data.lyTrinhVOS.length !== 0){
                        for (let index = 0; index < data.lyTrinhVOS.length; index++) {
                            let id;
                            let tinhTrangDuongVO = data.lyTrinhVOS[index].tinhTrangDuongVO;
                            if (tinhTrangDuongVO === null)
                                id = -1;
                            else
                                id = tinhTrangDuongVO.id;
                            let rowHTML = [
                                '<input type="checkbox" class="i-checks isChecked" id="checkLT"/>',
                                index + 1,
                                '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].diemDau_Tu" value="'+data.lyTrinhVOS[index].diemDau_Tu+'"/>'
                                + '<input type="hidden" name="lyTrinhVOS[' + index + '].idLyTrinh"  value="'+data.lyTrinhVOS[index].idLyTrinh+'">'
                                + '<input type="hidden" name="lyTrinhVOS[' + index + '].tinhTrangDuongVO.id"  value="'+id+'">',
                                '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].diemDau_Den" value="'+data.lyTrinhVOS[index].diemDau_Den+'"/>',
                                '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].diemCuoi_Tu" value="'+data.lyTrinhVOS[index].diemCuoi_Tu+'"/>',
                                '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].diemCuoi_Den" value="'+data.lyTrinhVOS[index].diemCuoi_Den+'"/>',
                                '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].chieuDai" value="'+data.lyTrinhVOS[index].chieuDai+'"/>',
                                '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].rongNen" value="'+data.lyTrinhVOS[index].rongNen+'"/>',
                                '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].rongMat" value="'+data.lyTrinhVOS[index].rongMat+'"/>',
                                createSelKCMD('lyTrinhVOS[' + index + '].ketCauMat', data.lyTrinhVOS[index].ketCauMat),
                                '<select class="form-control" name="lyTrinhVOS[' + index + '].diaHinh" style="width: 100%">'+
                                '<option value="1" '+(data.lyTrinhVOS[index].diaHinh == 1?'selected':'')+'>Đồng bằng và đồi</option>'+
                                '<option value="2" '+(data.lyTrinhVOS[index].diaHinh == 2?'selected':'')+'>Vùng núi</option>'+
                                '</select>',
                                createSelCapQL('lyTrinhVOS[' + index + '].capQL',data.lyTrinhVOS[index].capQL),
                                createSelDGMD('lyTrinhVOS[' + index + '].tinhTrangDuongVO.tinhTrang',tinhTrangDuongVO===null?-1:tinhTrangDuongVO.tinhTrang),
                                '<textarea cols="2" rows="2" class="form-control" name="lyTrinhVOS[' + index + '].tinhTrangDuongVO.ghiChu" style="width: 100%"></textarea>'
                            ];
                            tableDSLyTrinh.row.add(rowHTML).draw();
                            tableDSLyTrinh.draw(false);
                            tableDSLyTrinh.page('first').draw('page');
                            $('textarea[name="lyTrinhVOS[' + index + '].tinhTrangDuongVO.ghiChu"]').val(tinhTrangDuongVO===null?'':tinhTrangDuongVO.ghiChu);
                        }
                        tableDSLyTrinh.page.len(5).draw();
                        utils.initIChecks('i-checks');
                        datatableFactory.checkCheckBox('checkAll','isChecked');
                        datatableFactory.checkBoxOnSelect('checkAll','isChecked');
                    }
                }
            }
        })
    };
    let btnAdd = function () {
        let index = tableDSLyTrinh.rows().count();
        let rowHTML = [
            '<input type="checkbox" class="i-checks isChecked" id="checkLT"/>',
            index + 1,
            '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].diemDau_Tu"/>'
            + '<input type="hidden" name="lyTrinhVOS[' + index + '].idLyTrinh" value="-1">'
            + '<input type="hidden" name="lyTrinhVOS[' + index + '].tinhTrangDuongVO.id"  value="-1">',
            '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].diemDau_Den"/>',
            '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].diemCuoi_Tu"/>',
            '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].diemCuoi_Den"/>',
            '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].chieuDai"/>',
            '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].rongNen"/>',
            '<input type="text" class="form-control" name="lyTrinhVOS[' + index + '].rongMat"/>',
            createSelKCMD('lyTrinhVOS[' + index + '].ketCauMat',''),
            '<select class="form-control" name="lyTrinhVOS[' + index + '].diaHinh" style="width: 100%">'+
            '<option value="1">Đồng bằng và đồi</option>'+
            '<option value="2">Vùng núi</option>'+
            '</select>',
            createSelCapQL('lyTrinhVOS[' + index + '].capQL',''),
            createSelDGMD('lyTrinhVOS[' + index + '].tinhTrangDuongVO.tinhTrang',''),
            '<textarea cols="2" rows="2" class="form-control" name="lyTrinhVOS[' + index + '].tinhTrangDuongVO.ghiChu" style="width: 100%"></textarea>'
        ];
        tableDSLyTrinh.row.add(rowHTML).draw();
        datatableFactory.indexing('tableDSLyTrinh', index);
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAll','isChecked');
        datatableFactory.checkBoxOnSelect('checkAll','isChecked');
    };
    let createSelKCMD = function (selName, idKetCauMat) {
        let selHtml = '<select class="form-control" name="'+selName+'">';
        selHtml += '<option value="-1"></option>';
        listKetCauMD.forEach(function (item, index) {
            selHtml += '<option ' + (parseInt(idKetCauMat) === item.idKetCauMat ? 'selected' : '') + ' value="' + item.idKetCauMat + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelCapQL = function (selName, idCapQL) {
        let selHtml = '<select class="form-control" name="'+selName+'" style="width: 100%">';
        selHtml += '<option value="-1"></option>';
        listCapQL.forEach(function (item, index) {
            selHtml += '<option ' + (parseInt(idCapQL) === item.idCapQL ? 'selected' : '') + ' value="' + item.idCapQL + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelDGMD = function (selName, tinhTrang) {
        let selHtml = '<select class="form-control" name="'+selName+'" style="width: 100%">';
        selHtml += '<option value="-1"></option>';
        listTTDuong.forEach(function (item, index) {
            selHtml += '<option ' + (parseInt(tinhTrang) === item.idTinhTrang ? 'selected' : '') + ' value="' + item.idTinhTrang + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let btnSave = function () {
        if (tableDSLyTrinh.data().count() !== 0) {
            tableDSLyTrinh.page.len(tableDSLyTrinh.data().count()).draw();
        }
        let method = "POST";
        let modelAttribute = "duongHatVO";
        $("#formChiTietTDTH").attr("method",method);
        $("#formChiTietTDTH").attr("action",url + "/worklife/user/quanlytuyenduong/ttchitietduong/saveForm.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        $("#formChiTietTDTH").attr("modelAttribute",modelAttribute);
        $("#formChiTietTDTH").attr("enctype","multipart/form-data");
        $("#formChiTietTDTH").submit();
    };
    let btnDelete = function () {
        datatableFactory.removeRowByHoan("idLyTrinh",tableDSLyTrinh,rootPath+"/worklife/user/quanlytuyenduong/ttchitietduong/deletelytrinh.do","checkAll",refeshTable);
    };
    let refeshTable = function () {
        datatableFactory.refreshPagination("tableDSLyTrinh");
        datatableFactory.resetIndex(tableDSLyTrinh, "lyTrinhVOS");
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAll','isChecked');
        datatableFactory.checkBoxOnSelect('checkAll','isChecked');
    };
    return {
        init: function () {
            return setup();
        }
    }
})();