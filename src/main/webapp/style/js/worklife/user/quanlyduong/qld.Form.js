formManager = (function () {
    const csrfData = '?' + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content');
    const URL_GET_DATA_TUYEN_DUONG = utils.getSafePath("/worklife/user/quanlytuyenduong/getdata.do");
    const URL_GET_DATA_TUYEN_DUONG_BY_ID = utils.getSafePath("/worklife/user/quanlytuyenduong/getTuyenDuongById.do");
    const URL_POST_DATA_TUYEN_DUONG = utils.getSafePath("/worklife/user/quanlytuyenduong/postTuyenDuong.do" + csrfData);
    const URL_POST_DATA_BRIDGE = utils.getSafePath("/worklife/user/quanlytuyenduong/insertBridge.do" + csrfData);
    const URL_GET_DATA_BRIDGE = utils.getSafePath("/worklife/user/quanlytuyenduong/getDataBridge.do");
    const URL_GET_DATA_BRIDGE_BY_ID = utils.getSafePath("/worklife/user/quanlytuyenduong/getBridgeById.do");
    const URL_GET_DATA_BIEN_BAO = utils.getSafePath("/worklife/user/quanlytuyenduong/getDataBienBao.do");
    const URL_GET_DATA_BIEN_BAO_BY_ID = utils.getSafePath("/worklife/user/quanlytuyenduong/getBienBaoById.do");
    const URL_POST_DATA_BIEN_BAO = utils.getSafePath("/worklife/user/quanlytuyenduong/insertBienBao.do" + csrfData);
    const URL_GET_DATA_BAO_TRI_DUONG = utils.getSafePath("/worklife/user/quanlytuyenduong/getDataBaoTriDuong.do");
    const URL_GET_DATA_BAO_TRI_CAU = utils.getSafePath("/worklife/user/quanlytuyenduong/getDataBaoTriCau.do");
    const URL_GET_DATA_BAO_TRI_THIET_BI = utils.getSafePath("/worklife/user/quanlytuyenduong/getDataBaoTriThietBi.do");
    const URL_GET_DATA_BAO_TRI_THIET_BI_BY_ID = utils.getSafePath("/worklife/user/quanlytuyenduong/getBaoTriThietBiById.do");
    const URL_GET_DATA_BAO_TRI_BY_ID = utils.getSafePath("/worklife/user/quanlytuyenduong/getBaoTriById.do");
    const URL_GET_DATA_BAO_TRI_CAU_BY_ID = utils.getSafePath("/worklife/user/quanlytuyenduong/getBaoTriCauById.do");
    const URL_POST_DATA_BAO_TRI_DUONG = utils.getSafePath("/worklife/user/quanlytuyenduong/insertBaoTriDuong.do" + csrfData);
    const URL_DEL_DOCX_ATTACH = utils.getSafePath("/worklife/user/quanlytuyenduong/delFileAttach.do");
    const URL_DEL_THONG_TIN_CAU = utils.getSafePath("/worklife/user/quanlytuyenduong/delThongTinCau.do");
    const URL_GET_DANH_MUC = utils.getSafePath("/worklife/user/quanlytuyenduong/selectDm.do");

    const tooltip = 'data-html="true" data-toggle="tooltip"  data-placement="top" data-original-title="{0}"';
    const col1 = '<input type="checkbox" class="file-ichecks isCheckedFile" value="-1" /><input type="hidden" name="files[{0}].idTaiLieu" value="{1}"/>';
    const col3 = '<textarea name="files[{1}].tenTaiLieu" onblur="{2}" ' + tooltip + '  class="form-control" rows="1" >{3}</textarea>';
    const col1Cau = '<input type="checkbox" class="information-ichecks isCheckedInformation" value="-1" /><input type="hidden" name="details[{0}].idThongSoKt" value="{1}"/>';
    const col3Cau = '<input name="details[{0}].dvtThongSoKt" type="text" class="form-control" value="{1}" readonly>';
    const col5CauInp = '<input name="details[{0}].soLieuKt" type="text" class="form-control {2}" value="{1}">';

    let formStreets = $('#frmThongTinDuong');
    let formBridge = $('#fromInputBridgeInfo');
    let formBienBao = $('#formBienBao');
    let formBaoTri = $('#fromBaoTri');
    let streetTable = undefined;
    let fileTable = undefined;
    let bridgeTable = undefined;
    let bienBaoTable = undefined;
    let baoTriDuongTable = undefined;
    let baoTriCauTable = undefined;
    let baoTriThietBiTable = undefined;
    let thongTinCauTable = undefined;
    let dmthongsokt = undefined;
    let tempCategory = {};

    let setup = function () {
        $('#tenThietBiEventCheck').hide(); //Ẩn label Tên Thiết Bị (CẦU)
        $('#divTblBaoTriCau').hide(); //Ẩn div Bảo trì cầu
        $('#divTblBaoTriThietBi').hide();// Ẩn div Bảo trì thiết bị
        $('#tenEventCheck').hide(); //Ẩn label Tên thiết bị (THIẾT BỊ)
        $("#selYear").val(new Date().getFullYear());
        $('#addFile').on('click', addRowFileDuong);
        $('#deleteFile').on('click', fileFactory.deleteRow);
        $('#btnAddInfoCau').on('click', configTableThongTinCau.addRow);
        $('#btnDelInfoCau').on('click', configTableThongTinCau.deleteRow);

        eventUtils.getAllCategory("dmthongsokt", function (data) {
            dmthongsokt = data;
        });
        //Lấy danh mục bảng THÔNG TIN CẦU
        utils.loadDatePicker();
        bridgeTable = configTableBridge();
        streetTable = configTableStreets();
        fileTable = fileFactory.initTable();
        thongTinCauTable = configTableThongTinCau.initTable();
        bienBaoTable = configTableTskt();
        baoTriDuongTable = configTableBaoTriDuong();
        baoTriCauTable = configTableBaoTriCau();
        baoTriThietBiTable = configTableBaoTriThietBi();

        configInsertBridge();
        configInsertBienBao();
        checkedRadioButton();
        eventChooseSelCity();
        eventChooseSelEndCity();
        eventChooseSelHuyenCau();
        eventChooseSelHuyenBBDTH();
        eventChooseBienTaiTrong();
        eventChangeSelBciav();
        eventChangeSelBcicrit();
        configSelYear();
        eventSearchBaoTri();
        eventSearchStreets();
        configInsertStreets();
        eventSelectTableBridge();
        eventSelectTableBienBao();
        eventSelectTableBaoTriDuong();
        eventSelectTableBaoTriCau();
        eventSelectTableBaoTriThietBi();
        eventSelectTableStreets();
        eventClickAddMain();
        eventSaveBridge();
        eventSaveBienBao();
        eventSaveBaoTri();
        eventSaveStreets();
        configValidate();
    };

    /*CONFIG VALIDATE DATETIMEPICKER*/
    let configValidate = function () {
        validatorUtils.getDateMax();
        validatorUtils.getDateFormat();
        validatorUtils.getDateRequired();
        $("#fromBaoTri").validate({
            rules: {
                thoiGianBaoTriDuong: {
                    "date-required": true,
                    dateformat: true,
                    datemax: true
                }
            },
        });
    };

    /*CONFIG TABLE THONGSOKYTHUAT*/
    let configTableThongTinCau = {
        initTable: function () {
            let colDefs =
                [
                    {
                        "sWidth": "5%",
                        "targets": 0,
                        "className": "text-center",
                        "searchable": false,
                        "orderable": false,
                        "data": function (data, type, row, meta) {
                            let index = meta.row;
                            let id;
                            if (!data && !data.idThongSoKt) id = -1;
                            else id = data.idThongSoKt;
                            return col1Cau.f(index, id);
                        }
                    }, {
                    "sWidth": "7%",
                    "targets": 1,
                    "className": "text-center",
                    "searchable": false,
                    "orderable": false,
                    "data": function (data, type, row, meta) {
                        return meta.row + 1;
                    }
                }, {
                    "targets": 2,
                    "className": "text-left",
                    "sWidth": "58%",
                    "data": function (data, type, row, meta) {

                        return formManager.getSelOptionTSKT(dmthongsokt, meta.row, data !== undefined && data !== '' ? data.noiDung : '');
                    }
                }, {
                    "targets": 3,
                    "className": "text-center",
                    "sWidth": "10%",
                    "data": function (data, type, row, meta) {
                        let index = meta.row;
                        if (data.dvtThongSoKt != null) {
                            return col3Cau.f(index, data.dvtThongSoKt);
                        } else {
                            return col3Cau.f(index, "");
                        }
                    }
                }, {
                    "targets": 4,
                    "className": "text-left",
                    "sWidth": "20%",
                    data: function (data, type, full, meta) {
                        let index = meta.row;
                        if (data !== undefined) {
                            // Event input cột số liệu
                            if (data.soLieuKt != null) {
                                if (data.loai != 1 && data.loaiDuLieu == 2) {
                                    return col5CauInp.f(index, data.soLieuKt, "decimal1");
                                } else if (data.loai != 1 && data.loaiDuLieu == 3) {
                                    return col5CauInp.f(index, data.soLieuKt, "decimal2");
                                } else if (data.loai != 1 && data.loaiDuLieu == 4) {
                                    return col5CauInp.f(index, data.soLieuKt, "decimal3");
                                } else if (data.loai != 1 && data.loaiDuLieu == 5) {
                                    return col5CauInp.f(index, data.soLieuKt, "decimal4");
                                }
                                return col5CauInp.f(index, data.soLieuKt);
                            } else {
                                return col5CauInp.f(index, "", "decimal1");
                            }
                        }
                        return "";
                    },
                    render: function (nodes, type, data, meta) {
                        if (data !== undefined) {
                            if (data.loai == 1 && data.loaiDuLieu == 1) {
                                $.when(getCategoryForTableBridgeDetails(data.tenDm)).done(function (category) {
                                    let cell = $("#tblThongTinCau").DataTable().cells({
                                        "row": meta.row,
                                        "column": meta.col
                                    }).nodes(0);
                                    $(cell).html(formManager.getSelOptionTSKT(category, meta.row, data !== undefined && data !== '' ? data.soLieuKt : ''));
                                });
                            }
                        }
                        return nodes;
                    },
                }
                ];
            let opts = {
                "fnDrawCallback": function (oSettings) {
                    if (oSettings._iDisplayLength >= oSettings.fnRecordsTotal()) {
                        $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                        $('.btn-insert-delete-group').attr('style', 'margin-top:-5px;');
                    } else {
                        $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                        $('.btn-insert-delete-group').attr('style', 'margin-top:-35px;');
                    }
                    utils.initDecimal('.decimal1', 0, 0); // 0
                    utils.initDecimal('.decimal2', 0, 1); // 0,0
                    utils.initDecimal('.decimal3', 0, 2); // 0,00
                    utils.initDecimal('.decimal4', 0, 3); // 0,000
                    utils.initIChecks('information-ichecks');
                    utils.initToolTip();
                    datatableFactory.checkCheckBox('checkAllInformation', 'isCheckedInformation');
                    datatableFactory.checkBoxOnSelect('checkAllInformation', 'isCheckedInformation');

                    $(".selContent").on('change', function () {
                        let noiDung = $(this).val();
                        let $this = $(this);
                        let input = $this.closest('tr').find('input[name^="details"]input[name$="soLieuKt"]').parent();
                        let dvt = $this.closest('tr').find('input[name^="details"]input[name$="dvtThongSoKt"]');
                        let rowIndex = $(this).closest('tr').index();
                        $.ajax({
                            url: URL_GET_DANH_MUC
                            , data: {'idThongSoKt': noiDung}
                            , type: "POST"
                            , success: function (data) {
                                if (data != null) {
                                    if (data.tenDm == "" || data.tenDm == null || data.tenDm == undefined) {
                                    }
                                    else {
                                        $.when(getCategoryForTableBridgeDetails(data.tenDm)).done(function (getdm) {
                                            let html = '<select class="form-control selContent" name="soLieuKt">';
                                            let value = data.soLieuKt;

                                            // Fill Tên danh mục vào cột nếu có
                                            if (undefined !== getdm && null !== getdm) {
                                                getdm.forEach(function (obj) {
                                                    html += '<option value="' + obj.id + '" ' + (value !== undefined && value === obj.id ? "selected" : "") + '>' + obj.name + '</option>';
                                                });
                                                html += '</select>';
                                            }
                                            return $(input).html(html);
                                        });
                                    }
                                    // Fill đơn vị tính vào cột nếu có
                                    if (data.dvtThongSoKt == "" || data.dvtThongSoKt == null || data.dvtThongSoKt == undefined) {
                                        $(dvt).val("");
                                    } else {
                                        $(dvt).val(data.dvtThongSoKt);
                                    }
                                    // Sự kiện nhập cột Số liệu dựa theo Loại - Loại dữ liệu
                                    if (data.loai != 1 && data.loaiDuLieu == 2) {
                                        $(input).html(col5CauInp.f(rowIndex, "", "decimal"));
                                        utils.initDecimal('.decimal', 0, 0);
                                    } else if (data.loai != 1 && data.loaiDuLieu == 3) {
                                        $(input).html(col5CauInp.f(rowIndex, "", "decimal"));
                                        utils.initDecimal('.decimal', 0, 1);
                                    } else if (data.loai != 1 && data.loaiDuLieu == 4) {
                                        $(input).html(col5CauInp.f(rowIndex, "", "decimal"));
                                        utils.initDecimal('.decimal', 0, 2);
                                    } else if (data.loai != 1 && data.loaiDuLieu == 5) {
                                        $(input).html(col5CauInp.f(rowIndex, "", "decimal"));
                                        utils.initDecimal('.decimal', 0, 3);
                                    }
                                } else {
                                    return "";
                                }
                            }
                        })
                    });

                }
            };
            return datatableFactory.initDataSourceDataTableNonLoad('tblThongTinCau', colDefs, opts, /*just make it not undefined*/ 1);
        },
        addRow: function () {
            thongTinCauTable.row.add("", "", "", "", "").draw();
            thongTinCauTable.page('last').draw('page');
        },
        deleteRow: function () {
            datatableFactory.removeRow('idThongSoKt', thongTinCauTable, URL_DEL_THONG_TIN_CAU, 'isCheckedInformation', function () {
                datatableFactory.resetIndex(thongTinCauTable, "isCheckedInformation");
                datatableFactory.refreshPagination("tblThongTinCau");
            });
        },
    };

    /*SEARCH BAOTRI BY YEAR*/
    let eventSearchBaoTri = function () {
        $('#btnSelYearBTD').on('click', function () {
            baoTriDuongTable.ajax.reload();
            baoTriCauTable.ajax.reload();
            baoTriThietBiTable.ajax.reload();
        })
    };

    /*FILL DATA SELECT YEAR IN TAB BAOTRI*/
    let configSelYear = function () {
        let startYear = 1900;
        let endYear = new Date().getFullYear();
        let options = "";
        for (let year = startYear; year <= endYear; year++) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $("#namBaoTri").html(options);
        $("#namBaoTri").val(endYear);
    };

    /*CONFIG TABLE BAO TRI DUONG*/
    let configTableBaoTriDuong = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                "data": function (data, type, row, meta) {
                    return meta.row + 1;
                }
            }, {
                "sWidth": "20%",
                "targets": 1,
                "mData": "thoiGianBaoTriDuong",
                class: "text-center"
            }, {
                "sWidth": "15%",
                "targets": 2,
                class: "text-center",
                "mData": function (data) {
                    if (data.hinhThuc == 1) {
                        data.hinhThuc = "Thường xuyên";
                    } else {
                        data.hinhThuc = "Định kỳ";
                    }
                    return data.hinhThuc;
                }
            }, {
                "sWidth": "30%",
                "targets": 3,
                class: "text-center",
                render: function (data, type, row) {
                    return 'Km ' + row.lyTrinhKmBaoTri + '-' + row.lyTrinhMBaoTri;
                }
            }, {
                "sWidth": "30%",
                "targets": 4,
                "data": "noiDungBaoTri",
                class: "text-center"
            }
        ];
        return datatableFactory.initAjaxDataSourceDataTable('tableBaoTriDuong', colDefs, URL_GET_DATA_BAO_TRI_DUONG, function (settings) {
            let obj = {
                "optional": {
                    "idTuyenDuong": $('#idTuyenDuong').val(),
                    "valRadioCheck": $('input[name ="loai"]:checked').val(),
                    "namBaoTri": $('#namBaoTri').val(),
                }
            };
            return JSON.stringify(Object.assign(obj, settings));
        }, {
            'deferLoading': null,
            'order': [[1, 'asc']],
        }, undefined, 1);
    };

    /*CONFIG TABLE BAO TRI CAU*/
    let configTableBaoTriCau = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                "data": function (data, type, row, meta) {
                    return meta.row + 1;
                }
            }, {
                "sWidth": "15%",
                "targets": 1,
                "mData": "thoiGianBaoTriDuong",
                class: "text-center"
            }, {
                "sWidth": "15%",
                "targets": 2,
                class: "text-center",
                "mData": function (data) {
                    if (data.hinhThuc == 1) {
                        data.hinhThuc = "Thường xuyên";
                    } else {
                        data.hinhThuc = "Định kỳ";
                    }
                    return data.hinhThuc;
                }
            }, {
                "sWidth": "20%",
                "targets": 3,
                "data": "tenCauBaoTri",
                class: "text-center"
            }, {
                "sWidth": "20%",
                "targets": 4,
                class: "text-center",
                render: function (data, type, row) {
                    return 'Km ' + row.lyTrinhKmBaoTri + '-' + row.lyTrinhMBaoTri;
                }
            }, {
                "sWidth": "25%",
                "targets": 5,
                "data": "noiDungBaoTri",
                class: "text-center"
            }
        ];
        return datatableFactory.initAjaxDataSourceDataTable('tableBaoTriCau', colDefs, URL_GET_DATA_BAO_TRI_CAU, function (settings) {
            let obj = {
                "optional": {
                    "idTuyenDuong": $('#idTuyenDuong').val(),
                    "namBaoTri": $('#namBaoTri').val(),
                }
            };
            return JSON.stringify(Object.assign(obj, settings));
        }, {
            'deferLoading': null,
            'order': [[1, 'asc']],
        }, undefined, 1);
    };

    /*CONFIG TABLE BAO TRI CAU*/
    let configTableBaoTriThietBi = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                "data": function (data, type, row, meta) {
                    return meta.row + 1;
                }
            }, {
                "sWidth": "15%",
                "targets": 1,
                "mData": "thoiGianBaoTriDuong",
                class: "text-center"
            }, {
                "sWidth": "10%",
                "targets": 2,
                class: "text-center",
                "mData": function (data) {
                    if (data.hinhThuc == 1) {
                        data.hinhThuc = "Thường xuyên";
                    } else {
                        data.hinhThuc = "Định kỳ";
                    }
                    return data.hinhThuc;
                }
            }, {
                "sWidth": "20%",
                "targets": 3,
                "data": "tenThietBiBaoTri",
                class: "text-center"
            }, {
                "sWidth": "25%",
                "targets": 4,
                class: "text-center",
                render: function (data, type, row) {
                    return 'Km ' + row.lyTrinhKmBaoTri + '-' + row.lyTrinhMBaoTri;
                }
            }, {
                "sWidth": "25%",
                "targets": 5,
                "data": "noiDungBaoTri",
                class: "text-center"
            }
        ];
        return datatableFactory.initAjaxDataSourceDataTable('tableBaoTriThietBi', colDefs, URL_GET_DATA_BAO_TRI_THIET_BI, function (settings) {
            let obj = {
                "optional": {
                    "idTuyenDuong": $('#idTuyenDuong').val(),
                    "namBaoTri": $('#namBaoTri').val(),
                }
            };
            return JSON.stringify(Object.assign(obj, settings));
        }, {
            'deferLoading': null,
            'order': [[1, 'asc']],
        }, undefined, 1);
    };

    /*CONFIG INSERT STREETS*/
    let configInsertStreets = function () {
        $.when(
            eventUtils.getAllCategory("dmloaiduong"),
            eventUtils.getAllCategory("dmcapkythuat"),
            eventUtils.getAllCategory("dmloaidiahinh"),
            eventUtils.getAllCategory("dmketcaumatdg"),
            eventUtils.getAllCategory("dmdonviql"),
            eventUtils.getAllCategory("dmcapql"),
            eventUtils.getAllCategory("dmtinhtrang"),
            eventUtils.getAllCategory("dmdonvibaotri"),
            eventUtils.inSelDistrict($('#maHuyenDiemDau,#maHuyenDiemCuoi'))
        ).done(
            function (dmloaiduong, dmcapkt, dmloaidiahinh, dmketcaumatdg, dmdonviquanly, dmcapql, dmtinhtrang, donvibaotri) {
                eventUtils.selOption("capKt", "id", "name", dmcapkt[0]);
                eventUtils.selOption("selStreetType", "id", "name", dmloaiduong[0]);
                eventUtils.selOption("idLoaiDuong", "id", "name", dmloaiduong[0]);
                eventUtils.selOption("loaiDiaHinh", "id", "name", dmloaidiahinh[0]);
                eventUtils.selOption("ketCauMatDg", "id", "name", dmketcaumatdg[0]);
                eventUtils.selOption("donViQl", "id", "name", dmdonviquanly[0]);
                eventUtils.selOption("capQl", "id", "name", dmcapql[0]);
                eventUtils.selOption("tinhTrang", "id", "name", dmtinhtrang[0]);
                eventUtils.selOption("donViThucHienBaoTri", "id", "name", donvibaotri[0]);
            });
    };

    /*CONFIG INSERT BIEN BAO*/
    let configInsertBienBao = function () {
        $.when(
            eventUtils.getAllCategory("tuyenduong"),
            eventUtils.inSelDistrict($('#maHuyenBbdth'))
        ).done(
            function (tenduong/*,baotri*/) {
                eventUtils.selOption("idTuyenDuongBbdth", "id", "name", tenduong[0]);
            });
    };

    /*CONFIG SEL BCIAV*/
    let selOptionBciav = function (element, data, defaultopts, val) {
        element = $('#' + element);
        if (data === undefined)
            return;
        if ($.isArray(data)) {
            element.empty();
            let options = [];
            if (defaultopts === undefined)
                options.push($('<option>', {value: -1}));
            for (let i = 0; i < data.length; i++) {
                options.push($("<option>", {
                    value: data[i]["id"],
                    text: data[i]["name"].trim(),
                    tinhtrang: data[i]["extendCol1"],
                    mota: data[i]["extendCol2"]
                }).prop('jsData', data[i]));
            }
            element.append(options);
            if (val !== undefined) {
                element.val(val);
            }
        }
    };

    /*CONFIG INSERT BRIDGE*/
    let configInsertBridge = function () {
        $.when(
            eventUtils.getAllCategory("dmloaicau"),
            eventUtils.getAllCategory("tuyenduong"),
            eventUtils.getAllCategory("dmdoituongvuot"),
            eventUtils.getAllCategory("dmchaychung"),
            eventUtils.getAllCategory("dmketcaunhip"),
            eventUtils.getAllCategory("dmvatlieu_nhipchinh"),
            eventUtils.getAllCategory("dmloaibientaitrong"),
            eventUtils.getAllCategory("dmchongvaxo"),
            eventUtils.getAllCategory("dmbciav"),
            eventUtils.getAllCategory("dmbcicrit"),
            eventUtils.getAllCategory("cau"),
            eventUtils.getAllCategory("bienbao_dentinhieu"),
            eventUtils.inSelDistrict($('#maHuyenCau'))
        ).done(
            function (dmloaicau, tenduong, dmdoituongvuot, dmchaychung, dmketcaunhip, dmvatlieu_nhipchinh, dmloaibientaitrong, dmchongvaxo, dmbciav, dmbcicrit, cau, bienbao_dentinhieu) {
                eventUtils.selOption("loaiCau", "id", "name", dmloaicau[0]);
                eventUtils.selOption("idTuyenDuongCau", "id", "name", tenduong[0]);
                eventUtils.selOption("doiTuongVuot", "id", "name", dmdoituongvuot[0]);
                eventUtils.selOption("chayChungVoi", "id", "name", dmchaychung[0]);
                eventUtils.selOption("ketCauNhip", "id", "name", dmketcaunhip[0]);
                eventUtils.selOption("vatLieuNhipChinh", "id", "name", dmvatlieu_nhipchinh[0]);
                eventUtils.selOption("bienHanChe", "id", "name", dmloaibientaitrong[0]);
                eventUtils.selOption("chongVaXo", "id", "name", dmchongvaxo[0]);
                eventUtils.selOption("idCauBaoTri", "id", "name", cau[0]);
                eventUtils.selOption("idBienBaoDTH", "id", "name", bienbao_dentinhieu[0]);
                selOptionBciav("bClav", dmbciav[0]);
                selOptionBciav("bClcrit", dmbcicrit[0]);
            });
    };

    /*CONFIG LAY DS CAU*/
    let layDanhSachCau = function (value, target) {
        if (value === -1) {
            $(target).prop('disabled', true).val(-1);
        } else {
            return eventUtils.getAllCategoryWithParent("cau", value, function (data) {
                if (data === undefined)
                    return;
                if ($.isArray(data)) {
                    //The empty() method removes all child nodes and content from the selected elements.
                    target.empty();
                    target.append($("<option></option>").attr('value', -1).text('Chọn Cầu'));
                    for (let i = 0; i < data.length; i++) {
                        target.append($("<option></option>").attr('value', data[i].id).text(data[i].name));
                    }
                    target.prop("disabled", false);
                }
            }, 'id');
        }
    };

    /*EVENT CHANGE SEL BCIAV*/
    let eventChangeSelBciav = function () {
        $('#bClav').on('change', function () {
            let valueTT = $('#bClav option:selected ').attr('tinhtrang');
            let valueMT = $('#bClav option:selected ').attr('mota');
            $('#bClavTT').val(valueTT);
            $('#bClavMT').val(valueMT);
        })
    };

    /*EVENT CHANGE SEL BCICRIT*/
    let eventChangeSelBcicrit = function () {
        $('#bClcrit').on('change', function () {
            let valueTT = $('#bClcrit option:selected ').attr('tinhtrang');
            let valueMT = $('#bClcrit option:selected ').attr('mota');
            $('#bClcritTT').val(valueTT);
            $('#bClcritMT').val(valueMT);
        })
    };

    /*EVENT CLICK BUTTON ADD BRIGDE CLEAR FIELD*/
    let eventClickAddMain = function () {
        $('#btnAddCau,#btnAddBienBao,#btnAddBaoTri').on('click', function () {
            $('#fromInputBridgeInfo,#frmThongTinDuong,#formBienBao,#fromBaoTri').find('input[type=text], textarea').val("");
            $('#fromInputBridgeInfo,#formBienBao,#fromBaoTri').find('input[type=hidden]').val("-1");
            $('#fromInputBridgeInfo,#frmThongTinDuong,#formBienBao,#fromBaoTri').find('select').val(-1);
            thongTinCauTable.clear().draw();
        });
        $('#btnAddTuyenDuong').on('click',function () {
            $('#frmThongTinDuong').find('input[type=text], textarea').val("");
            $('#frmThongTinDuong').find('input[type=hidden]').val("-1");
            $('#frmThongTinDuong').find('select').val(-1);
            $('#tblTuyenDuong').find("tbody tr").removeClass('selected');
            fileTable.clear().draw();
        })
    };

    /*EVENT CHOOSE HUYEN DUONG DAU*/
    let eventChooseSelCity = function () {
        $('#maHuyenDiemDau').on('change', function () {
            let value = parseInt($(this).val());
            if (value === -1) {
                $('#maXaDiemDau').prop('disabled', true).val(-1);
            } else {
                eventUtils.eventDistrictOnChange(value, $('#maXaDiemDau'));
            }
        });
    };

    /*EVENT CHOOSE SEL HUYEN DUONG CUOI*/
    let eventChooseSelEndCity = function () {
        $('#maHuyenDiemCuoi').on('change', function () {
            let value = parseInt($(this).val());
            if (value === -1) {
                $('#maXaDiemCuoi').prop('disabled', true).val(-1);
            } else {
                eventUtils.eventDistrictOnChange(value, $('#maXaDiemCuoi'));
            }
        });
    };

    /*EVENT CHOOSE SEL HUYEN CAU*/
    let eventChooseSelHuyenCau = function () {
        $('#maHuyenCau').on('change', function () {
            let value = parseInt($(this).val());
            if (value === -1) {
                $('#maXaCau').prop('disabled', true).val(-1);
            } else {
                eventUtils.eventDistrictOnChange(value, $('#maXaCau'));
            }
        });
    };

    /*EVENT CHOOSE SEL HUYEN BBDTH*/
    let eventChooseSelHuyenBBDTH = function () {
        $('#maHuyenBbdth').on('change', function () {
            let value = parseInt($(this).val());
            if (value === -1) {
                $('#maXaBbdth').prop('disabled', true).val(-1);
            } else {
                eventUtils.eventDistrictOnChange(value, $('#maXaBbdth'));
            }
        });
    };

    /*EVENT CHOOSE 115*/
    let eventChooseBienTaiTrong = function () {
        $('#bienHanChe').on('change', function () {
            if ($(this).val() == 2) {
                $('#taiTrong').prop('disabled', false);
                $('#xeSoMiRoMooc,#xeKeoRoMooc,#xeThanLien').prop('disabled', true);
            } else if ($(this).val() == 3) {
                $('#taiTrong').prop('disabled', true);
                $('#xeSoMiRoMooc,#xeKeoRoMooc,#xeThanLien').prop('disabled', false);
            } else {
                $('#taiTrong,#xeRoMiRoMooc,#xeKeoRoMooc,#xeThanLien').prop('disabled', true);
            }
        })
    };

    /*EVENT SELECT TABLE TUYENDUONG*/
    let eventSelectTableStreets = function () {
        $('#tblTuyenDuong').find('tbody').on('click', 'tr', function () {
            if (!$(this).hasClass('selected')) {
                streetTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                let data = streetTable.row(this).data();
                let idTuyenDuong = data.idTuyenDuong;
                $.ajax({
                    url: URL_GET_DATA_TUYEN_DUONG_BY_ID
                    , data: {'idTuyenDuong': idTuyenDuong}
                    , type: "POST"
                    , success: function (data) {
                        fileTable.clear().draw();
                        layDanhSachCau(data.idTuyenDuong, $('#idCauBaoTri'));
                        if (data != null) {
                            $.each(data, function (key, val) {
                                $('#' + key).val(val);
                            });
                            utils.initDecimal(".decimalNumber", 0, 2);
                            if (data.files.length > 0) {
                                data.files.forEach(value => {
                                    fileTable.row.add(value);
                                });
                                fileTable.draw();
                            }

                            let targetValueDau = data.maXaDiemDau;
                            let targetDau = $('#maXaDiemDau');
                            eventUtils.eventDistrictOnChange(data.maHuyenDiemDau, targetDau, targetValueDau);
                            let targetValueCuoi = data.maXaDiemCuoi;
                            let targetCuoi = $('#maXaDiemCuoi');
                            eventUtils.eventDistrictOnChange(data.maHuyenDiemCuoi, targetCuoi, targetValueCuoi);

                            bridgeTable.ajax.reload();
                            bienBaoTable.ajax.reload();
                            baoTriDuongTable.ajax.reload();
                            baoTriCauTable.ajax.reload();
                            baoTriThietBiTable.ajax.reload();
                        }
                    }
                });
            }
        });
    };

    /*EVENT SEARCH BY LOAIDUONG ID*/
    let eventSearchStreets = function () {
        $('#btnSearch').on('click', function () {
            streetTable.ajax.reload();
        });
    };

    /*CONFIG TABLE TSKT*/
    let configTableTskt = function () {
        let colDefs = [
            {
                "sWidth": "4%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                "data": function (data, type, row, meta) {
                    return meta.row + 1;
                }
            }, {
                "sWidth": "5%",
                "targets": 1,
                "mData": "tenBbdth",
                class: "text-center"
            }, {
                "sWidth": "15%",
                "targets": 2,
                class: "text-center",
                render: function (data, type, row) {
                    return 'Km ' + row.lyTrinhKmBbdth + '-' + row.lyTrinhMBbdth;
                }
            }, {
                "sWidth": "20%",
                "targets": 3,
                "data": "tenDuongBbdth",
                class: "text-center",
            }, {
                "sWidth": "20%",
                "targets": 4,
                "data": "kinhDoBbdth",
                class: "text-center"
            }, {
                "sWidth": "20%",
                "targets": 5,
                "data": "viDoBbdth",
                class: "text-center"
            }
        ];
        return datatableFactory.initAjaxDataSourceDataTable('tableBienBao', colDefs, URL_GET_DATA_BIEN_BAO, function (settings) {
            let obj = {
                "optional": {
                    "idTuyenDuong": $('#idTuyenDuong').val()
                }
            };
            return JSON.stringify(Object.assign(obj, settings));
        }, {
            'deferLoading': null,
            'order': [[1, 'asc']],
        }, undefined, 1);
    };

    /*CONFIG TABLE FILE ATTACH*/
    let fileFactory = {
        initTable: function () {
            let colDefs =
                [
                    {
                        "sWidth": "5%",
                        "targets": 0,
                        "className": "text-center",
                        "searchable": false,
                        "orderable": false,
                        "data": function (data, type, row, meta) {
                            let index = meta.row;
                            let id;
                            if (!data && !data.idTaiLieu) id = -1;
                            else id = data.idTaiLieu;
                            return col1.f(index, id);
                        }
                    },
                    {
                        "sWidth": "8%",
                        "targets": 1,
                        "className": "text-center",
                        "searchable": false,
                        "orderable": false,
                        "data": function (data, type, row, meta) {
                            return meta.row + 1;
                        }
                    },
                    {
                        "targets": 2,
                        "className": "text-left",
                        "sWidth": "40%",
                        "data": function (data, type, row, meta) {
                            let index = meta.row;
                            let flag = false;
                            let tenGiay = "";
                            if (data && data.tenTaiLieu) {
                                tenGiay = data.tenTaiLieu;
                                if (tenGiay.length > 45) {
                                    flag = true;
                                }
                            }
                            return col3.f(flag === true ? tenGiay : '', index, 'datatableFactory.fileNameBlur(this)', tenGiay);
                        }
                    },
                    {
                        "targets": 3,
                        "className": "text-center",
                        "sWidth": "42%",
                        "data": function (data, type, row, meta) {
                            let index = meta.row;
                            let tooltip = "";
                            let tenFile = fileMultiLanguage.attack_file;
                            if (data && data.fileData) {
                                data.fileData.ten = data.fileData.ten.trim();
                                if (data.fileData.ten.length > 20) {
                                    tenFile = datatableFactory.hideStringIfOver20Character(data.fileData.ten);
                                    tooltip = data.fileData.ten;
                                } else {
                                    tenFile = data.fileData.ten;
                                }
                            }
                            return uploadFileNodes.f(tooltip, 'datatableFactory.uploadFile(this,\'tenTaiLieu\')', index, tenFile, 'datatableFactory.deleteFile(this,\'id\',1)', 'files');
                        }
                    },
                    {
                        "targets": 4,
                        "className": "text-center",
                        "sWidth": "5%",
                        "data": function (data) {
                            let downloadFileIcon = "";
                            if (data.fileData != null && data.fileData != undefined && data.fileData != '') {
                                let idParent = data.fileData.id;
                                downloadFileIcon = '<span class="btn btn-white btn-sm" data-toggle="tooltip" id="tooltipHeader" data-placement="top" title="" data-original-title="Tải file đính kèm" onclick="formManager.downloadFile(' + idParent + ')">'
                                    + '<i class="fa fa-download" ></i>'
                                    + '</span>';
                                return downloadFileIcon;
                            }
                            else {
                                return "";
                            }
                        }
                    }
                ];
            let opts = {
                "fnDrawCallback": function (oSettings) {
                    if (oSettings._iDisplayLength >= oSettings.fnRecordsTotal()) {
                        $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                        $('.btn-insert-delete-group').attr('style', 'margin-top:-5px;');
                    } else {
                        $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                        $('.btn-insert-delete-group').attr('style', 'margin-top:-35px;');
                    }
                    utils.initIChecks('file-ichecks');
                    utils.initToolTip();
                    datatableFactory.checkCheckBox('checkAllFile', 'isCheckedFile');
                    datatableFactory.checkBoxOnSelect('checkAllFile', 'isCheckedFile');
                }
            };
            return datatableFactory.initDataSourceDataTableNonLoad('tableFileDinhKem', colDefs, opts, /*just make it not undefined*/ 1);
        },
        deleteRow: function () {
            datatableFactory.removeRow('idTaiLieu', fileTable, URL_DEL_DOCX_ATTACH, 'isCheckedFile', function () {
                datatableFactory.resetIndex(fileTable, "isCheckedFile");
                datatableFactory.refreshPagination("tableFileDinhKem");
            });
        },
    };

    let addRowFileDuong = function() {
        let index = fileTable.rows().count();
        let rowHTML = [
            '<input type="checkbox" class="file-ichecks"/>',
            index + 1,
            '<input type="text" class="form-control"/>',
            '<div class="btn-group attackFile" onmouseover="formManager.hoverin(this)" onmouseout="formManager.hoverout(this)">'
            + '<label data-html="true" data-toggle="tooltip"  data-placement="top"  onclick="datatableFactory.uploadFile(this,\'noiDung\')" title="" for="uploadAttackFile' + index + '" style="text-decoration: underline; cursor: pointer; color: #337ab7; font-weight: 500" data-original-title="">' + 'File'
            +
            '</label>' + '<i onclick="datatableFactory.deleteFile(this,\'idNiemYet\',1)" class="fa fa-times class-X" style="margin-left: 5px; cursor: pointer; font-size: 16px; display: none;"></i>' +
            '<input type="file"  name="fileAttachs[' + index + '].file" id="uploadAttackFile' + index + '" class="hide">'
            + '<input type="hidden" value="0" name="fileAttachs[' + index + '].idTepDinhKem"/>'
            + '</div>',
            "<span class='btn btn-white btn-sm hide' data-toggle='tooltip' id='tooltipHeader' data-placement='top' title='' data-original-title='Tải file đính kèm' onclick='datatableFactory.downloadFile(this,\"idNiemYet\",1)>"
            + "<i class='fa fa-download'></i>" +
            "</span>"
        ];
        /*fileTable.row.add(rowHTML);
        fileTable.draw(true);
        datatableFactory.indexing("tableFileDinhKem");*/
    };

    /*SAVE STREETS*/
    let eventSaveStreets = function () {
        $('#btnSaveTuyenDuong').on('click', function () {
            $('select').attr('disable', false);
            formStreets.attr('action', URL_POST_DATA_TUYEN_DUONG);
            formStreets.attr('enctype', "multipart/form-data");
            formStreets.attr('method', 'POST');
            formStreets.submit();
        })
    };

    /*SAVE BRIGDE*/
    let eventSaveBridge = function () {
        $('#btnSaveCau').on('click', function () {
            formBridge.attr('action', URL_POST_DATA_BRIDGE);
            formBridge.attr('method', 'POST');
            formBridge.submit();
        })
    };

    /*EVENT CHECK RADIO BUTTON TO CONVERT TAB*/
    let checkedRadioButton = function () {
        utils.initIChecks('i-checks');

        $('#BaoTriDuong').on('ifChecked', function () {

            $('#divTblBaoTriDuong,#kinhDoEventCheck,#viDoEventCheck').show(); // show table
            $('#divTblBaoTriThietBi,#divTblBaoTriCau,#tenEventCheck,#tenThietBiEventCheck').hide(); // hide table
            $('#fromBaoTri').find('input[type=text], textarea').val("");
            $('#fromBaoTri').find('select').val(-1);
            configSelYear();

        });

        $('#BaoTriCau').on('ifChecked', function () {
            $('#divTblBaoTriCau,#tenThietBiEventCheck').show(); // show table
            $('#divTblBaoTriThietBi,#divTblBaoTriDuong,#kinhDoEventCheck,#viDoEventCheck,#tenEventCheck').hide(); // hide table
            $('#fromBaoTri').find('input[type=text], textarea').val("");
            $('#fromBaoTri').find('select').val(-1);
            configSelYear();
        });

        $('#BaoTriThietBi').on('ifChecked', function () {
            $('#divTblBaoTriThietBi,#tenEventCheck').show(); // show table
            $('#divTblBaoTriCau,#divTblBaoTriDuong,#kinhDoEventCheck,#viDoEventCheck,#tenThietBiEventCheck').hide(); // hide table
            $('#fromBaoTri').find('input[type=text], textarea').val("");
            $('#fromBaoTri').find('select').val(-1);
            configSelYear();
        });
    };

    /*CONFIG TABLE TUYENDUONG*/
    let configTableStreets = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "orderable": false,
                class: "text-center",
                render: function (data, type, row, meta) {
                    let rowIndex = parseInt(meta.row);
                    let startAt = parseInt(meta.settings._iDisplayStart);
                    return rowIndex + startAt + 1;
                }
            }, {
                "sWidth": "10%",
                "targets": 1,
                class: "text-center",
                "mData": function (data) {
                    if (data.idLoaiDuong == 1) {
                        return "Quốc lộ";
                    } else {
                        return "Tỉnh lộ";
                    }
                }
            }, {
                "sWidth": "25%",
                "targets": 2,
                "mData": "tenDuong",
                class: "text-center"
            }, {
                "sWidth": "10%",
                "targets": 3,
                "mData": "tenCapKt",
                class: "text-center"
            }, {
                "sWidth": "25%",
                "targets": 4,
                class: "text-center",
                render: function (data, type, row, meta) {
                    return row.tenHuyen + ' - ' + row.tenXa;
                }
            }, {
                "sWidth": "25%",
                "targets": 5,
                class: "text-center",
                render: function (data, type, row, meta) {
                    return row.tenHuyenCuoi + ' - ' + row.tenXaCuoi;
                }
            }
        ];
        return datatableFactory.initAjaxDataSourceDataTable('tblTuyenDuong', colDefs, URL_GET_DATA_TUYEN_DUONG, function (settings) {
            let obj = {
                "optional": {
                    "idLoaiDuong": $("#selStreetType").val()
                }
            };
            return JSON.stringify(Object.assign(obj, settings));
        }, {
            'deferLoading': null,
            'order': [[1, 'asc']],
        }, undefined, 1);
    };

    /*CONFIG TABLE BRIDGE*/
    let configTableBridge = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,
                "data": function (data, type, row, meta) {
                    return meta.row + 1;
                }
            }, {
                "sWidth": "20%",
                "targets": 1,
                "mData": "tenCau",
                class: "text-center"
            }, {
                "sWidth": "20%",
                "targets": 2,
                "mData": "tenDuongCau",
                class: "text-center"
            }, {
                "sWidth": "20%",
                "targets": 3,
                class: "text-center",
                render: function (data, type, row) {
                    return 'Km ' + row.lyTrinhKm + '-' + row.lyTrinhM;
                }
            }, {
                "sWidth": "20%",
                "targets": 4,
                "data": "kinhDo",
                class: "text-center"
            }, {
                "sWidth": "20%",
                "targets": 5,
                "data": "viDo",
                class: "text-center"
            }
        ];
        return datatableFactory.initAjaxDataSourceDataTable('tableBridge', colDefs, URL_GET_DATA_BRIDGE, function (settings) {
            let obj = {
                "optional": {
                    "idTuyenDuong": $('#idTuyenDuong').val()
                }
            };
            return JSON.stringify(Object.assign(obj, settings));
        }, {
            'deferLoading': null,
            'order': [[1, 'asc']],
        }, undefined, 1);
    };

    /*EVENT SELECT TABLE BRIDGE*/
    let eventSelectTableBridge = function () {
        $('#tableBridge').find('tbody').on('click', 'tr', function () {
            if (!$(this).hasClass('selected')) {
                bridgeTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                let data = bridgeTable.row(this).data();
                let idCau = data.idCau;
                $.ajax({
                    url: URL_GET_DATA_BRIDGE_BY_ID
                    , data: {'idCau': idCau}
                    , type: "POST"
                    , success: function (data) {
                        thongTinCauTable.clear().draw();
                        if (data != null) {
                            $.each(data, function (key, val) {
                                $('#' + key).val(val);
                            })
                            utils.initDecimal(".decimalNumber", 0, 2);
                            // Đổ list details vào table thongTinCau
                            if (data.details.length > 0) {
                                data.details.forEach(value => {
                                    thongTinCauTable.row.add(value);
                                    thongTinCauTable.draw();
                                });
                            }
                            $('#bClav,#bClcrit').trigger("change"); // Sự kiện chọn select bClav
                            let targetValueXaCau = data.maXaCau;
                            let targetXaCau = $('#maXaCau');
                            eventUtils.eventDistrictOnChange(data.maHuyenCau, targetXaCau, targetValueXaCau);
                        }
                    }
                });
            }
        });
    };

    /*EVENT SELECT TABLE BIEN BAO*/
    let eventSelectTableBienBao = function () {
        $('#tableBienBao').find('tbody').on('click', 'tr', function () {

            if (!$(this).hasClass('selected')) {
                bienBaoTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                let data = bienBaoTable.row(this).data();
                let idBbdth = data.idBbdth;
                //    alert('adsfasdfas');
                $.ajax({
                    url: URL_GET_DATA_BIEN_BAO_BY_ID
                    , data: {'idBbdth': idBbdth}
                    , type: "POST"
                    , success: function (data) {
                        if (data != null) {
                            $.each(data, function (key, val) {
                                $('#' + key).val(val);
                            })
                            utils.initDecimal(".onlyNumber", 0, 0);
                            utils.initDecimal(".decimalNumber", 0, 2);
                            let targetValueXa = data.maXaBbdth;
                            let targetXa = $('#maXaBbdth');
                            eventUtils.eventDistrictOnChange(data.maHuyenBbdth, targetXa, targetValueXa);
                        }
                    }
                });
            }
        });
    };

    /*EVENT SELECT TABLE BAO TRI DUONG*/
    let eventSelectTableBaoTriDuong = function () {
        $('#tableBaoTriDuong').find('tbody').on('click', 'tr', function () {
            if (!$(this).hasClass('selected')) {
                baoTriDuongTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                let data = baoTriDuongTable.row(this).data();
                let idBaoTri = data.idBaoTri;
                $.ajax({
                    url: URL_GET_DATA_BAO_TRI_BY_ID
                    , data: {'idBaoTri': idBaoTri}
                    , type: "POST"
                    , success: function (data) {
                        if (data != null) {
                            $.each(data, function (key, val) {
                                $('#' + key).val(val);
                            });
                            utils.initDecimal(".decimalNumber", 0, 2);
                        }
                    }
                });
            }
        });
    };

    /*EVENT SELECT TABLE BAO TRI THIET BI*/
    let eventSelectTableBaoTriThietBi = function () {
        $('#tableBaoTriThietBi').find('tbody').on('click', 'tr', function () {
            if (!$(this).hasClass('selected')) {
                baoTriThietBiTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                let data = baoTriThietBiTable.row(this).data();
                let idBaoTri = data.idBaoTri;
                $.ajax({
                    url: URL_GET_DATA_BAO_TRI_THIET_BI_BY_ID
                    , data: {'idBaoTri': idBaoTri}
                    , type: "POST"
                    , success: function (data) {
                        if (data != null) {
                            $.each(data, function (key, val) {
                                $('#' + key).val(val);
                            })
                            utils.initDecimal(".decimalNumber", 0, 2);
                        }
                    }
                });
            }
        });
    };

    /*EVENT SELECT TABLE BAO TRI CAU*/
    let eventSelectTableBaoTriCau = function () {
        $('#tableBaoTriCau').find('tbody').on('click', 'tr', function () {

            if (!$(this).hasClass('selected')) {
                baoTriCauTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                let data = baoTriCauTable.row(this).data();
                let idBaoTri = data.idBaoTri;
                $.ajax({
                    url: URL_GET_DATA_BAO_TRI_CAU_BY_ID
                    , data: {'idBaoTri': idBaoTri}
                    , type: "POST"
                    , success: function (data) {
                        if (data != null) {
                            $.each(data, function (key, val) {
                                $('#' + key).val(val);
                            });
                            utils.initDecimal(".decimalNumber", 0, 2);
                        }
                    }
                });
            }
        });
    };

    /*SAVE BIEN BAO*/
    let eventSaveBienBao = function () {
        $('#btnSaveBienBao').on('click', function () {
            formBienBao.attr('action', URL_POST_DATA_BIEN_BAO);
            formBienBao.attr('method', 'POST');
            formBienBao.submit();
        })
    };

    /*EVENT CLICK BUTTON SAVE BAOTRI*/
    let eventSaveBaoTri = function () {
        $('#btnSaveBaoTri').on('click', function () {
            let idLoaiBaoTri = $('input[name ="loai"]:checked').val();
            $('#loaiBaoTri').val(idLoaiBaoTri);

            if (idLoaiBaoTri == 1) {
                $('#idDoiTuong').val($('#idTuyenDuong').val());
                formBaoTri.attr('action', URL_POST_DATA_BAO_TRI_DUONG);
                formBaoTri.attr('method', 'POST');
                formBaoTri.submit();
            } else if (idLoaiBaoTri == 2) {
                $('#idDoiTuong').val($('#idCauBaoTri').val());
                formBaoTri.attr('action', URL_POST_DATA_BAO_TRI_DUONG);
                formBaoTri.attr('method', 'POST');
                formBaoTri.submit();
            } else if (idLoaiBaoTri == 3) {
                $('#idDoiTuong').val($('#idBienBaoDTH').val());
                formBaoTri.attr('action', URL_POST_DATA_BAO_TRI_DUONG);
                formBaoTri.attr('method', 'POST');
                formBaoTri.submit();
            }
        })
    };

    /*GET CATEGORY TABLE BRIDGE*/
    let getCategoryForTableBridgeDetails = function (tblName) {
        if (tempCategory[tblName] === undefined) {
            return eventUtils.getAllCategory(tblName, function (data) {
                tempCategory[tblName] = data;
            });
        } else {
            return tempCategory[tblName];
        }
    };

    return {
        init: function () {
            return setup();
        },
        getSelOptionTSKT: function (data, index, value) {
            let html = '<select class="form-control selContent" name="details[' + index + '].noiDung">';
            if (undefined !== data && null !== data) {
                data.forEach(function (obj) {
                    html += '<option value="' + obj.id + '" ' + (value !== undefined && value === obj.id ? "selected" : "") + '>' + obj.name + '</option>';
                });
                html += '</select>';
            }
            return html;
        },
        downloadFile: function (id) {
            window.location = rootPath + "/worklife/user/file/downloadfile.do?idFile=" + id;
        },
        hoverin: function (element) {
            $(element).find('.class-X').css('display', 'inline');
        },
        hoverout: function (element) {
            $(element).find('.class-X').css('display', 'none');
        }
    }
})();
