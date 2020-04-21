formManager = (function () {
    let tableTraCuuQuyHoach, tableTaiLieu, tableBanVeQuyHoach;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        if($('#maHuyen').val() !== '-1'){
            $('#TenQH').parent('div').addClass('col-md-offset-4');
        }
        initHuyen();
        tableTraCuuQuyHoach = initTableTraCuuQuyHoach();
        tableBanVeQuyHoach = initTableBanVeQuyHoach();
        tableTaiLieu = initTableTaiLieu();
        selectedTableHSQH();
        $('#btnTim').on('click', btnTim);
    };
    let initHuyen = function () {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getlisthuyen.do",
            type: "POST",
            success: function (data) {
                if (data !== null) {
                    let options = '<option value="-1">Sở giao thông vận tải</option>';
                    for (let i = 0; i < data.length; i++) {
                        options += '<option value="' + data[i].maHuyen + '">' + data[i].tenHuyen + '</option>';
                    }
                    $('#donViQL').html(options);
                }
            }
        })
    };
    let initTableTraCuuQuyHoach = function () {
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
            {"targets": 1, class:"text-center", width: "10%", "mData": "tenQuyHoach", "orderable": false},
            {"targets": 2, class:"text-center", width: "20%", "mData": "soQuyetDinh", "orderable": false},
            {"targets": 3, class:"text-center", width: "20%", "mData": "ngayQD", "orderable": false},
            {"targets": 4, class:"text-center", width: "10%", "mData": "coQuanDuyet", "orderable": false},
            {"targets": 5, class:"text-center", width: "15%", "orderable": false,
                render: function (data, type, row, meta) {
                    let dieuChinh = '';
                    if (row.dieuChinh === '1')
                        dieuChinh = "Đã điều chỉnh";
                    else
                        dieuChinh = "Chưa điều chỉnh";
                    return dieuChinh;
                }
            },
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
            "pageLength": 10,
            'displayStart': parseInt($('#startAt').val()),
        };
        return datatableFactory.initAjaxDataSourceDataTable("tableTraCuuQuyHoach", colDefs, url + "/worklife/user/quanlyquyhoach/getlisttracuuhsqh.do", function (settings) {
            let maHuyen = $('#maHuyen').val();
            if (maHuyen === '-1'){
                maHuyen = $('#donViQL').val();
            }
            let obj = {
                "optional": {
                    "tenQuyHoach": $('#TenQH').val(),
                    "maHuyen": !maHuyen?-1:maHuyen,
                    "idGroup": $('#group_Id').val()
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };
    let initTableBanVeQuyHoach = function(){
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {"targets": 1, class: "text-center", width: "25%"},
            {"targets": 2, class: "text-center", width: "20%"},
            {"targets": 3, class: "text-center", width: "10%"},
            {"targets": 4, class: "text-center", width: "10%"},
            {"targets": 5, class: "text-center", width: "20%"},
            {"targets": 6, class: "text-center", width: "10%"},
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
            },
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableBanVeQuyHoach', colDefs, opts, 1);
    };
    let initTableTaiLieu = function() {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            {"targets": 1, class: "text-center", width: "55%"},
            {"targets": 2, class: "text-center", width: "30%"},
            {"targets": 3, class: "text-center", width: "10%"},
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
            },
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableTaiLieu', colDefs, opts, 1);
    };
    let selectedTableHSQH = function () {
        $('#tableTraCuuQuyHoach tbody').on('click','tr', function () {
            let data = tableTraCuuQuyHoach.row(this).data();
            $('#tableTraCuuQuyHoach').DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            let idHoSo_QH = data.idHoSo_QH;
            getDataByIdHoSoQH(idHoSo_QH);
        })
    };
    let getDataByIdHoSoQH = function (idHoSo_QH) {
        $.ajax({
            url: url + '/worklife/user/quanlyquyhoach/kthsquyhoach/getinfodata.do',
            method: 'POST',
            data: {idHoSo_QH: idHoSo_QH},
            success: function (data) {
                if (data != null){
                    $.each(data, function (key, val) {
                        $('#' + key).val(val);
                    });
                    if (data.banVeQuyHoachVOS !== null && data.banVeQuyHoachVOS.length > 0){
                        let banVeQuyHoachVOS = data.banVeQuyHoachVOS;
                        tableBanVeQuyHoach.clear().draw();
                        for (let index = 0; index < banVeQuyHoachVOS.length; index++ ) {
                            let downloadFileIcon = "";
                            let tenFile = "";
                            if (banVeQuyHoachVOS[index].ten == null || banVeQuyHoachVOS[index].ten == undefined || banVeQuyHoachVOS[index].ten == '') {
                                tenFile = 'File đính kèm';
                            } else {
                                downloadFileIcon = '<span class="btn btn-white btn-sm" data-placement="top" title="" data-original-title="Tải file đính kèm" onclick="formManager.downloadBanVeFile(this)">'
                                    + '<i class="fa fa-download" ></i>'
                                    + '</span>';
                                tenFile = banVeQuyHoachVOS[index].ten;
                            }
                            let rowHTML = [
                                index + 1,
                                '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].tenBanVe" value="'+banVeQuyHoachVOS[index].tenBanVe+'" style="width:100%;"/>'
                                + '<input type="hidden" class="form-control" name="banVeQuyHoachVOS[' + index + '].idBanVe_QH" value="'+banVeQuyHoachVOS[index].idBanVe_QH+'" value="0" />',
                                '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].maBanVe" value="'+banVeQuyHoachVOS[index].maBanVe+'" style="width:100%;"/>',
                                '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].tyLe" value="'+banVeQuyHoachVOS[index].tyLe+'" style="width:100%;"/>',
                                '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].soTo" value="'+banVeQuyHoachVOS[index].soTo+'" style="width:100%;"/>',
                                '<div class="btn-group attackFile">'
                                + '<label data-html="true" data-toggle="tooltip"  data-placement="top" title="" for="uploadAttackFile' + index + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
                                + formManager.hideStringIfOver20Character(tenFile)
                                + '</label>'
                                + '<input type="file" value="" name="banVeQuyHoachVOS[' + index + '].file" id="uploadAttackFile' + index + '" class="hide">'
                                + '<input type="hidden" value="'+banVeQuyHoachVOS[index].id+'" name="banVeQuyHoachVOS[' + index + '].id"/>'
                                + '<span style="display: inherit;"><i class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
                                + '</div>',
                                downloadFileIcon
                            ];
                            tableBanVeQuyHoach.row.add(rowHTML).draw();
                            tableBanVeQuyHoach.draw(false);
                            tableBanVeQuyHoach.page('first').draw('page');
                        }
                        tableBanVeQuyHoach.page.len(5).draw();
                    }
                    if (data.taiLieuQuyHoachVOS !== null && data.taiLieuQuyHoachVOS.length > 0){
                        let taiLieuQuyHoachVOS = data.taiLieuQuyHoachVOS;
                        tableTaiLieu.clear().draw();
                        for (let index = 0; index < taiLieuQuyHoachVOS.length; index++){
                            let downloadFileIcon = "";
                            let tenFile = "";
                            if (taiLieuQuyHoachVOS[index].ten == null || taiLieuQuyHoachVOS[index].ten == undefined || taiLieuQuyHoachVOS[index].ten == '') {
                                tenFile = 'File đính kèm';
                            } else {
                                downloadFileIcon = '<span class="btn btn-white btn-sm" data-placement="top" title="" data-original-title="Tải file đính kèm" onclick="formManager.downloadTaiLieuFile(this)">'
                                    + '<i class="fa fa-download" ></i>'
                                    + '</span>';
                                tenFile = taiLieuQuyHoachVOS[index].ten;
                            }
                            let rowHTML = [
                                index + 1,
                                '<input type="text" class="form-control" name="taiLieuQuyHoachVOS[' + index + '].tenTaiLieu" value="'+taiLieuQuyHoachVOS[index].tenTaiLieu+'" style="width:100%;"/>'
                                + '<input type="hidden" class="form-control" name="taiLieuQuyHoachVOS[' + index + '].idTaiLieu_QH" value="'+taiLieuQuyHoachVOS[index].idTaiLieu_QH+'" />',
                                '<div class="btn-group attackFile">'
                                + '<label data-html="true" data-toggle="tooltip"  data-placement="top" title="" for="uploadAttackFileTL' + index + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
                                + formManager.hideStringIfOver20Character(tenFile)
                                + '</label>'
                                + '<input type="file" value="" name="taiLieuQuyHoachVOS[' + index + '].file" id="uploadAttackFileTL' + index + '" class="hide">'
                                + '<input type="hidden" value="'+taiLieuQuyHoachVOS[index].id+'" name="taiLieuQuyHoachVOS[' + index + '].id"/>'
                                + '<span style="display: inherit;"><i class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
                                + '</div>',
                                downloadFileIcon
                            ];
                            tableTaiLieu.row.add(rowHTML).draw();
                            tableTaiLieu.draw(false);
                            tableTaiLieu.page('first').draw('page');
                        }
                        tableTaiLieu.page.len(5).draw();
                    }
                }
            }
        })
    };
    let btnTim = function () {
        tableTraCuuQuyHoach.ajax.reload();
    };
    return{
        init: function () {
            return setup();
        },
        hideStringIfOver20Character: function (tenFile) {
            let arrData = tenFile.split(".");
            let joinStr = "";
            if (arrData.length > 2) {
                for (var i = 0; i < arrData.length - 1; i++) {
                    if (i != 0)
                        joinStr += "." + arrData[i];
                    else
                        joinStr += arrData[i];
                }
            } else {
                joinStr = arrData[0];
            }
            if (joinStr.length >= 20) {
                joinStr = joinStr.substring(0, 15);
                tenFile = joinStr + "...." + arrData[arrData.length - 1];
            }
            return tenFile;
        },
        downloadBanVeFile: function (element) {
            let idBanVe_QH = $(element).closest("tr").find("td:eq(1)").find('input[type="hidden"]').val();
            window.location = url + "/worklife/user/file/json/downloadfilebanve.do?idBanVe_QH=" + parseInt(idBanVe_QH);
        },
        downloadTaiLieuFile: function (element) {
            let idTaiLieu_QH = $(element).closest("tr").find("td:eq(1)").find('input[type="hidden"]').val();
            window.location = url + "/worklife/user/file/json/downloadfiletailieu.do?idTaiLieu_QH=" + parseInt(idTaiLieu_QH);
        }
    }
})();