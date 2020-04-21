formManager = (function () {
    let tableBanVeQuyHoach, tableTaiLieu, tableDanhSachQuyHoach;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        tableDanhSachQuyHoach = initTableDanhSachQuyHoach();
        ajaxLoadDonViTuVan();
        autoDonViTuVan('.autoCompleteDVTV');
        ajaxLoadCoQuanThamDinh();
        autoCoQuanThamDinh('.autoCompleteCQTD');
        ajaxLoadCoQuanDuyet();
        autoCoQuanDuyet('.autoCompleteCQDuyet');
        tableBanVeQuyHoach = initTableBanVeQuyHoach();
        tableTaiLieu = initTableTaiLieu();
        $('#btnAddBanVe').on('click', btnAddBanVe);
        $('#btnAddTaiLieu').on('click', btnAddTaiLieu);
        utils.initIChecks('i-checksBV');
        utils.initIChecks('i-checksTL');
        checkDieuChinh();
        $('#btnSave').on('click', btnSave);
        selectedTableHSQH();
        utils.initNotifyMessageBox();
        utils.loadDatePicker();
        $('#TenQH').on('change', btnTim);
        $('#btnDeleteBanVe').on('click', btnDeleteBanVe);
        $('#btnDeleteTaiLieu').on('click', btnDeleteTaiLieu);
        $('#btnReset').on('click', btnReset);
    };
    let checkDieuChinh = function() {
        $('#cboxdieuchinh').on('click', function () {
            if($(this).is(':checked'))
                $('#dieuChinh').val(1);
            else
                $('#dieuChinh').val(0);
        })
    };
    let initTableDanhSachQuyHoach = function(){
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
                let row = null;
                let idHoSo_QH = parseInt($("#idHoSo_QH").val());
                if (idHoSo_QH !== -1) {
                    tableDanhSachQuyHoach.$("tr").each(function() {
                        let data = tableDanhSachQuyHoach.row($(this)).data();
                        if (data.idHoSo_QH === idHoSo_QH) {
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
        return datatableFactory.initAjaxDataSourceDataTable("tableDanhSachQuyHoach", colDefs, url + "/worklife/user/quanlyquyhoach/getlisthsqh.do", function (settings) {
            let obj = {
                "optional": {
                    "tenQuyHoach": $('#TenQH').val(),
                    "maHuyen": $('#maHuyen').val(),
                    "idGroup": $('#group_Id').val()
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };
    let autoDonViTuVan = function (className) {
        let $this;
        let isSelect = false;
        $(className).unbind('focus');
        $(className).on('focus', function () {
            $this = $(this);
            $this.autocomplete("search", "");
        });
        $(className).autocomplete({
            delay: 0,
            minLength: 0,
            change: function (event, ui) {
                if (isSelect == true) {
                    isSelect = false;
                    return;
                }
                let localItem;
                let $thisVal = $this.val();
                localItem = $.grep(listDonViTV, function (item) {
                    return item.label.toLowerCase() == $thisVal.toLowerCase();
                });
                if (localItem.length > 0) {
                    $this.closest("td").next('td').find("select").val(localItem[0].id);
                    $this.closest("td").next('td').next('td').find("input").val(localItem[0].ten);
                    $this.val(localItem[0].label)
                }
            },
            select: function (event, ui) {
                isSelect = true;
                $this.closest("td").next('td').find("select").val(ui.item.id);
                $this.closest("td").next('td').next('td').find("input").val(ui.item.ten);
                $this.val(ui.item.label);
            },
            source: function (request, response) {
                let matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                response($.grep(listDonViTV, function (item) {
                    return matcher.test(item.label);
                }));
            }
        });
    };
    let ajaxLoadDonViTuVan = function(){
        $.ajax({
            url: url + "/worklife/user/qlquyhoach/json/loaddonvituvanso.do",
            type: 'POST',
            data:{cap: $('#cap').val()},
            success: function (data) {
                listDonViTV = $.map(data, function (value, index) {
                    return {label: value.ten, value: value.ten};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error load fail: " + textStatus);
            }
        });
    };
    let autoCoQuanThamDinh = function (className) {
        let $this;
        let isSelect = false;
        $(className).unbind('focus');
        $(className).on('focus', function () {
            $this = $(this);
            $this.autocomplete("search", "");
        });
        $(className).autocomplete({
            delay: 0,
            minLength: 0,
            change: function (event, ui) {
                if (isSelect == true) {
                    isSelect = false;
                    return;
                }
                let localItem;
                let $thisVal = $this.val();
                localItem = $.grep(listDonViTDSo, function (item) {
                    return item.label.toLowerCase() == $thisVal.toLowerCase();
                });
                if (localItem.length > 0) {
                    $this.closest("td").next('td').find("select").val(localItem[0].id);
                    $this.closest("td").next('td').next('td').find("input").val(localItem[0].ten);
                    $this.val(localItem[0].label)
                }
            },
            select: function (event, ui) {
                isSelect = true;
                $this.closest("td").next('td').find("select").val(ui.item.id);
                $this.closest("td").next('td').next('td').find("input").val(ui.item.ten);
                $this.val(ui.item.label);
            },
            source: function (request, response) {
                let matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                response($.grep(listDonViTDSo, function (item) {
                    return matcher.test(item.label);
                }));
            }
        });
    };
    let ajaxLoadCoQuanThamDinh = function(){
        $.ajax({
            url: url + "/worklife/user/qlquyhoach/json/loadcoquanthamdinhso.do",
            type: 'POST',
            data:{},
            success: function (data) {
                listDonViTDSo = $.map(data, function (value, index) {
                    return {label: value.ten, value: value.ten};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error load fail: " + textStatus);
            }
        });
    };
    let autoCoQuanDuyet = function(className) {
        let $this;
        let isSelect = false;
        $(className).unbind('focus');
        $(className).on('focus', function () {
            $this = $(this);
            $this.autocomplete("search", "");
        });
        $(className).autocomplete({
            delay: 0,
            minLength: 0,
            change: function (event, ui) {
                if (isSelect == true) {
                    isSelect = false;
                    return;
                }
                let localItem;
                let $thisVal = $this.val();
                localItem = $.grep(listDonViDuyet, function (item) {
                    return item.label.toLowerCase() == $thisVal.toLowerCase();
                });
                if (localItem.length > 0) {
                    $this.closest("td").next('td').find("select").val(localItem[0].id);
                    $this.closest("td").next('td').next('td').find("input").val(localItem[0].ten);
                    $this.val(localItem[0].label)
                }
            },
            select: function (event, ui) {
                isSelect = true;
                $this.closest("td").next('td').find("select").val(ui.item.id);
                $this.closest("td").next('td').next('td').find("input").val(ui.item.ten);
                $this.val(ui.item.label);
            },
            source: function (request, response) {
                let matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                response($.grep(listDonViDuyet, function (item) {
                    return matcher.test(item.label);
                }));
            }
        });
    };
    let ajaxLoadCoQuanDuyet = function() {
        $.ajax({
            url: url + "/worklife/user/qlquyhoach/json/loadcoquanduyet.do",
            type: 'POST',
            data:{cap: $('#cap').val()},
            success: function (data) {
                listDonViDuyet = $.map(data, function (value, index) {
                    return {label: value.ten, value: value.ten};
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error load fail: " + textStatus);
            }
        });
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
                    return '<input type="checkbox" class="i-checks isCheckedBV"/>';
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
            {"targets": 2, class: "text-center", width: "20%"},
            {"targets": 3, class: "text-center", width: "20%"},
            {"targets": 4, class: "text-center", width: "10%"},
            {"targets": 5, class: "text-center", width: "10%"},
            {"targets": 6, class: "text-center", width: "20%"},
            {"targets": 7, class: "text-center", width: "10%"},
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
                    return '<input type="checkbox" class="i-checks isCheckedTL"/>';
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
            {"targets": 2, class: "text-center", width: "50%"},
            {"targets": 3, class: "text-center", width: "30%"},
            {"targets": 4, class: "text-center", width: "10%"},
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
        return datatableFactory.initDataSourceDataTableNonLoad('tableTaiLieu', colDefs, opts, 1);
    };
    let btnAddBanVe = function () {
        let table = $("#tableBanVeQuyHoach").DataTable();
        let index = table.rows().count();
        let rowHTML = [
            '<input type="checkbox" class="i-checksBV isCheckedBV" value="0" />',
            index + 1,
            '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].tenBanVe" style="width:100%;"/>'
            + '<input type="hidden" class="form-control" name="banVeQuyHoachVOS[' + index + '].idBanVe_QH" value="0" />',
            '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].maBanVe" style="width:100%;"/>',
            '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].tyLe" style="width:100%;"/>',
            '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].soTo" style="width:100%;"/>',
            '<div class="btn-group attackFile">'
            + '<label data-html="true" data-toggle="tooltip"  data-placement="top"  onclick="formManager.eventUploadDocumentFile(this)" title="" for="uploadAttackFile' + index + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
            + multiLanguage.attackfile
            + '</label>'
            + '<input type="file" value="" name="banVeQuyHoachVOS[' + index + '].file" id="uploadAttackFile' + index + '" class="hide">'
            + '<input type="hidden" value="0" name="banVeQuyHoachVOS[' + index + '].id"/>'
            + '<span style="display: inherit;"><i onclick="formManager.eventDeleteFileBanVe(this)" class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
            + '</div>',
            ''
        ];
        tableBanVeQuyHoach.row.add(rowHTML).draw();
        datatableFactory.indexing('tableBanVeQuyHoach', index);
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAllBanVe','isCheckedBV');
        datatableFactory.checkBoxOnSelect('checkAllBanVe','isCheckedBV');
    };
    let btnAddTaiLieu = function () {
        let table = $("#tableTaiLieu").DataTable();
        let index = table.rows().count();
        let rowHTML = [
            '<input type="checkbox" class="i-checksTL isCheckedTL" value="0" />',
            index + 1,
            '<input type="text" class="form-control" name="taiLieuQuyHoachVOS[' + index + '].tenTaiLieu" style="width:100%;"/>'
            + '<input type="hidden" class="form-control" name="taiLieuQuyHoachVOS[' + index + '].idTaiLieu_QH" value="0" />',
            '<div class="btn-group attackFile">'
            + '<label data-html="true" data-toggle="tooltip"  data-placement="top"  onclick="formManager.eventUploadDocumentFile(this)" title="" for="uploadAttackFileTL' + index + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
            + multiLanguage.attackfile
            + '</label>'
            + '<input type="file" value="" name="taiLieuQuyHoachVOS[' + index + '].file" id="uploadAttackFileTL' + index + '" class="hide">'
            + '<input type="hidden" value="0" name="taiLieuQuyHoachVOS[' + index + '].id"/>'
            + '<span style="display: inherit;"><i onclick="formManager.eventDeleteFileTaiLieu(this)" class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
            + '</div>',
            ''
        ];
        tableTaiLieu.row.add(rowHTML).draw();
        datatableFactory.indexing('tableTaiLieu', index);
        utils.initIChecks('i-checks');
        datatableFactory.checkCheckBox('checkAllTailieu','isCheckedTL');
        datatableFactory.checkBoxOnSelect('checkAllTailieu','isCheckedTL');
    };
    let btnSave = function () {
        let form = $("#formKTHS");
        if (tableBanVeQuyHoach.data().count() !== 0) {
            tableBanVeQuyHoach.page.len(tableBanVeQuyHoach.data().count()).draw();
        }
        if (tableTaiLieu.data().count() !== 0) {
            tableTaiLieu.page.len(tableTaiLieu.data().count()).draw();
        }
        if($('#cboxdieuchinh').is(':checked'))
            form.append('<input type="hidden" id="dieuChinh" name="dieuChinh" value="1">');
        else
            form.append('<input type="hidden" id="dieuChinh" name="dieuChinh" value="0">');
        let method = "POST";
        let modelAttribute = "banVeQuyHoachVO";
        form.attr("method",method);
        form.attr("action",url + "/worklife/user/quanlyquyhoach/kthsquyhoach/saveForm.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        form.attr("modelAttribute",modelAttribute);
        form.attr("enctype","multipart/form-data");
        form.submit();
    };
    let selectedTableHSQH = function () {
        $('#tableDanhSachQuyHoach tbody').on('click','tr', function () {
            let data = tableDanhSachQuyHoach.row(this).data();
            $('#tableDanhSachQuyHoach').DataTable().$('tr.selected').removeClass('selected');
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
                                '<input type="checkbox" class="i-checksBV isCheckedBV" value="0" />',
                                index + 1,
                                '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].tenBanVe" value="'+banVeQuyHoachVOS[index].tenBanVe+'" style="width:100%;"/>'
                                + '<input type="hidden" class="form-control" name="banVeQuyHoachVOS[' + index + '].idBanVe_QH" value="'+banVeQuyHoachVOS[index].idBanVe_QH+'" value="0" />',
                                '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].maBanVe" value="'+banVeQuyHoachVOS[index].maBanVe+'" style="width:100%;"/>',
                                '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].tyLe" value="'+banVeQuyHoachVOS[index].tyLe+'" style="width:100%;"/>',
                                '<input type="text" class="form-control" name="banVeQuyHoachVOS[' + index + '].soTo" value="'+banVeQuyHoachVOS[index].soTo+'" style="width:100%;"/>',
                                '<div class="btn-group attackFile">'
                                + '<label data-html="true" data-toggle="tooltip"  data-placement="top"  onclick="formManager.eventUploadDocumentFile(this)" title="" for="uploadAttackFile' + index + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
                                + formManager.hideStringIfOver20Character(tenFile)
                                + '</label>'
                                + '<input type="file" value="" name="banVeQuyHoachVOS[' + index + '].file" id="uploadAttackFile' + index + '" class="hide">'
                                + '<input type="hidden" value="'+banVeQuyHoachVOS[index].id+'" name="banVeQuyHoachVOS[' + index + '].id"/>'
                                + '<span style="display: inherit;"><i onclick="formManager.eventDeleteFileBanVe(this)" class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
                                + '</div>',
                                downloadFileIcon
                            ];
                            tableBanVeQuyHoach.row.add(rowHTML).draw();
                            tableBanVeQuyHoach.draw(false);
                            tableBanVeQuyHoach.page('first').draw('page');
                        }
                        tableBanVeQuyHoach.page.len(5).draw();
                        utils.initIChecks('i-checks');
                        datatableFactory.checkCheckBox('checkAllBanVe','isCheckedBV');
                        datatableFactory.checkBoxOnSelect('checkAllBanVe','isCheckedBV');
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
                                '<input type="checkbox" class="i-checksTL isCheckedTL" value="0" />',
                                index + 1,
                                '<input type="text" class="form-control" name="taiLieuQuyHoachVOS[' + index + '].tenTaiLieu" value="'+taiLieuQuyHoachVOS[index].tenTaiLieu+'" style="width:100%;"/>'
                                + '<input type="hidden" class="form-control" name="taiLieuQuyHoachVOS[' + index + '].idTaiLieu_QH" value="'+taiLieuQuyHoachVOS[index].idTaiLieu_QH+'" />',
                                '<div class="btn-group attackFile">'
                                + '<label data-html="true" data-toggle="tooltip"  data-placement="top"  onclick="formManager.eventUploadDocumentFile(this)" title="" for="uploadAttackFileTL' + index + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">'
                                + formManager.hideStringIfOver20Character(tenFile)
                                + '</label>'
                                + '<input type="file" value="" name="taiLieuQuyHoachVOS[' + index + '].file" id="uploadAttackFileTL' + index + '" class="hide">'
                                + '<input type="hidden" value="'+taiLieuQuyHoachVOS[index].id+'" name="taiLieuQuyHoachVOS[' + index + '].id"/>'
                                + '<span style="display: inherit;"><i onclick="formManager.eventDeleteFileTaiLieu(this)" class="fa fa-times deleteFileIcon" style="margin-left: 5px; cursor: pointer; font-size: 16px;display:none;"></i></span> '
                                + '</div>',
                                downloadFileIcon
                            ];
                            tableTaiLieu.row.add(rowHTML).draw();
                            tableTaiLieu.draw(false);
                            tableTaiLieu.page('first').draw('page');
                        }
                        tableTaiLieu.page.len(5).draw();
                        utils.initIChecks('i-checks');
                        datatableFactory.checkCheckBox('checkAllTailieu','isCheckedTL');
                        datatableFactory.checkBoxOnSelect('checkAllTailieu','isCheckedTL');
                    }
                }
            }
        })
    };
    let btnTim = function () {
        tableDanhSachQuyHoach.ajax.reload();
    };
    let btnDeleteBanVe = function () {
        datatableFactory.removeRowByHoan("idBanVe_QH", tableBanVeQuyHoach, url + "/worklife/user/quanlyquhoach/kthsquyhoach/deletebanveqh.do", "checkAllBanVe", refeshTableBVQH);
    };
    let refeshTableBVQH = function () {
        datatableFactory.refreshPagination("tableBanVeQuyHoach");
        datatableFactory.resetIndex(tableBanVeQuyHoach, "banVeQuyHoachVOS");
    };
    let btnDeleteTaiLieu = function() {
        datatableFactory.removeRowByHoan("idTaiLieu_QH", tableTaiLieu, url + "/worklife/user/quanlyquhoach/kthsquyhoach/deletetailieuqh.do", "checkAllTailieu", refeshTableTLQH);
    };
    let refeshTableTLQH = function () {
        datatableFactory.refreshPagination("tableTaiLieu");
        datatableFactory.resetIndex(tableTaiLieu, "taiLieuQuyHoachVOS");
    };
    let btnReset = function () {
        $('#tableDanhSachQuyHoach tr.selected').removeClass('selected');
        $('#formKTHS input[type="text"]').val('');
        $('#idHoSo_QH, #idParent').val(-1);
        tableBanVeQuyHoach.clear().draw();
        tableTaiLieu.clear().draw();
    };
    return{
        init: function () {
            return setup();
        },
        eventUploadDocumentFile: function (element) {
            let currentRow = $(element).closest('tr');
            let input = $(currentRow).find('input[type="file"]');
            //Khi click vào thẻ input[type=file], hộp thoại browser hiện lên để chọn file cần upload
            $(input).on('change', function (event) {
                //Khi nếu chọn được file để upload
                //event.stopPropagation();
                let $this = $(this);
                let tenfile = $(input).val();
                if (null == $this[0].files[0]) {
                    this.value = null;
                    return;
                }
                let sizeFile = $this[0].files[0].size;
                let html = $this[0].outerHTML;
                if (sizeFile > 209715200) {
                    swal({
                        title: multiLanguage.notify,
                        text: "Dung lượng file đính kèm không được vượt quá 200Mb",
                        type: "warning",
                        confirmButtonText: multiLanguage.accept
                    });
                    this.value = null;
                } else {
                    if (tenfile != '') {
                        strArr = tenfile.split("\\");
                        let fixStr = strArr[strArr.length - 1];
                        if (fixStr.length > 20) {
                            $(element).attr("data-original-title", fixStr);
                        }
                        else {
                            $(element).attr("data-original-title", '');
                        }
                        $(element).text(formManager.hideStringIfOver20Character(fixStr));
                        $(currentRow).find('input[name*="fileUploadVO.ten"]').val(fixStr);
                        console.log(fixStr);
                        $(currentRow).find('.btn-download').hide();
                        //Delete icon download
                        if ($(currentRow).find('td:last-child span').length) {
                            $(currentRow).find('td:last-child span').remove();
                        }
                    }
                }
            });
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
        eventDeleteFileBanVe: function (element) {
            let divFile = $(element).closest("div.attackFile");
            let fileName = $(divFile).find("label").text().trim();
            if (fileName === multiLanguage.attackfile) {
                return;
            } else {
                swal
                ({
                    title: multiLanguage.notify,
                    text: multiLanguage.deleteconfirm,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: multiLanguage.accept,
                    cancelButtonText: multiLanguage.cancel,
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        try {
                            let idBanVe_QH = $(element).closest("tr").find("input[name*='idBanVe_QH']").val();
                            $.ajax({
                                type: "POST",
                                url: url + "/worklife/user/doccumentfile/file/json/delete.do?" + $("meta[name='_csrf_name']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'),
                                data: {'idBanVe_QH': idBanVe_QH},
                                success: function (data) {
                                    $(divFile).find("label").text(multiLanguage.attackfile);
                                    $(divFile).find("label").attr("data-original-title", "");
                                    let currentRow = $(element).closest('tr');
                                    $(currentRow).find("input[type='file']").val(null);
                                    /*$(currentRow).find('input[name*="fileUploadVO.ten"]').val('');*/
                                    $(currentRow).find('input[name*="id"]').not('input[name*="idBanVe_QH"]').val(0);
                                    $(currentRow).find('.btn-download').hide();
                                    if ($(currentRow).find('td:last-child span').length) {
                                        $(currentRow).find('td:last-child span').remove();
                                    }
                                    swal({
                                        title: multiLanguage.notify,
                                        text: multiLanguage.deletesuccesfully,
                                        type: "success",
                                        confirmButtonText: multiLanguage.accept
                                    });
                                },
                            });
                        }
                        catch (e) {

                        }
                    }

                });

            }
        },
        eventDeleteFileTaiLieu: function (element) {
            let divFile = $(element).closest("div.attackFile");
            let fileName = $(divFile).find("label").text().trim();
            if (fileName === multiLanguage.attackfile) {
                return;
            } else {
                swal
                ({
                    title: multiLanguage.notify,
                    text: multiLanguage.deleteconfirm,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: multiLanguage.accept,
                    cancelButtonText: multiLanguage.cancel,
                    closeOnConfirm: false,
                    closeOnCancel: true
                }, function (isConfirm) {
                    if (isConfirm) {
                        try {
                            let idTaiLieu_QH = $(element).closest("tr").find("input[name*='idTaiLieu_QH']").val();
                            $.ajax({
                                type: "POST",
                                url: url + "/worklife/user/doccumentfile/filetailieu/json/delete.do?" + $("meta[name='_csrf_name']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'),
                                data: {'idTaiLieu_QH': idTaiLieu_QH},
                                success: function (data) {
                                    $(divFile).find("label").text(multiLanguage.attackfile);
                                    $(divFile).find("label").attr("data-original-title", "");
                                    let currentRow = $(element).closest('tr');
                                    $(currentRow).find("input[type='file']").val(null);
                                    /*$(currentRow).find('input[name*="fileUploadVO.ten"]').val('');*/
                                    $(currentRow).find('input[name*="id"]').not('input[name*="idTaiLieu_QH"]').val(0);
                                    $(currentRow).find('.btn-download').hide();
                                    if ($(currentRow).find('td:last-child span').length) {
                                        $(currentRow).find('td:last-child span').remove();
                                    }
                                    swal({
                                        title: multiLanguage.notify,
                                        text: multiLanguage.deletesuccesfully,
                                        type: "success",
                                        confirmButtonText: multiLanguage.accept
                                    });
                                },
                            });
                        }
                        catch (e) {

                        }
                    }

                });

            }
        },
        downloadBanVeFile: function (element) {
            let idBanVe_QH = $(element).closest("tr").find("td:eq(2)").find('input[type="hidden"]').val();
            window.location = url + "/worklife/user/file/json/downloadfilebanve.do?idBanVe_QH=" + parseInt(idBanVe_QH);
        },
        downloadTaiLieuFile: function (element) {
            let idTaiLieu_QH = $(element).closest("tr").find("td:eq(2)").find('input[type="hidden"]').val();
            window.location = url + "/worklife/user/file/json/downloadfiletailieu.do?idTaiLieu_QH=" + parseInt(idTaiLieu_QH);
        }
    }
})();