formManager = (function () {
    let danhMucSCDKTable = undefined;
    let setup = function () {
        utils.initIChecks('i-checks');
        utils.initDecimal(".decimalNumber", 3,0);
        $('.decimalNumber').trigger('blur');
        configSellNhaThau();
        loadSelYear();
        danhMucSCDKTable = configTableDanhMucSCDK();
        btnTim();
        $('#selNam').on('change', btnTim);
        $('#btnSave').on('click', btnSave);
        $('#btnDel').on('click', btnDel);
        $('#btnReport').on('click', btnReport);
        validateConfig();
        utils.loadDatePicker();
        utils.initNotifyMessageBox();
    };
    /*VALIDATE CONFIG*/
    let validateConfig = function () {
        validatorUtils.getDateRequired();
        $('#formDanhMucSCDK').validate({
            rules: {
                tuNgayKh: {"date-required": true}
            },
            messages: {
                tuNgayKh: {"date-required": "Vui lòng nhập ngày"}
            }
        })
    };
    /*GET SEL DM NHA THAU*/
    let configSellNhaThau = function () {
        $.when(eventUtils.getAllCategory("dmnhathau")).done(function (dmnhathau) {
            eventUtils.selOption("thiCong","id","name",dmnhathau);
            eventUtils.selOption("tuVanThietKe","id","name",dmnhathau);
            eventUtils.selOption("tuVanGiamSat","id","name",dmnhathau);
        });
    };
    /*CONFIG TABLE DANH MUC SCDK*/
    let configTableDanhMucSCDK = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "orderable": false,
                class: "text-center",
                render: function (data, type, row, meta) {
                    return '<input type="checkbox" class="i-checks isChecked" id="checkSCDK">';
                }
            },{
                "sWidth": "5%",
                "targets": 1,
                "orderable": false,
                class: "text-center",
                render: function (data, type, row, meta) {
                    let rowIndex = parseInt(meta.row);
                    let startAt = parseInt(meta.settings._iDisplayStart);
                    return rowIndex + startAt + 1;
                }
            },{
                "sWidth": "20%",
                "targets": 2,
                "orderable": false
            }, {
                "sWidth": "8%",
                "targets": 3,
                class: "text-center",
                "orderable": false
            }, {
                "sWidth": "8%",
                "targets": 4,
                class: "text-center",
                "orderable": false
            }, {
                "sWidth": "13%",
                "targets": 5,
                class: "text-center",
                "orderable": false
            }, {
                "sWidth": "11%",
                "targets": 6,
                class: "text-center",
                "orderable": false
            }, {
                "sWidth": "11%",
                "targets": 7,
                class: "text-center",
                "orderable": false
            }, {
                "sWidth": "9%",
                "targets": 8,
                class: "text-center",
                "orderable": false
            }, {
                "sWidth": "8%",
                "targets": 9,
                class: "text-center",
                "orderable": false
            }
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
                utils.initIChecks('i-checks');
                for (let index = 0; index < $('#tblDMSCDK tbody tr').length; index++){
                    let iddmtv_tc = $('select[name="nhapThongTinSCDKVOS['+index+'].idDMTV_TC"]').attr('iddmtv_tc');
                    if (iddmtv_tc !== undefined && iddmtv_tc !== '' && iddmtv_tc !== null)
                        $('select[name="nhapThongTinSCDKVOS['+index+'].idDMTV_TC').select2().val(iddmtv_tc.split(',')).trigger("change");
                }
            },
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tblDMSCDK', colDefs, opts, 1);
    };
    let btnTim = function(){
        let nam = $('#selNam').val();
        $.ajax({
            url: url + '/worklife/user/suachuadinhky/selectdmscdk.do',
            type: 'post',
            data: {nam: nam},
            success: function (data) {
                if (data != null){
                    danhMucSCDKTable.clear().draw();
                    if (data.nhapThongTinSCDKVOS != null && data.nhapThongTinSCDKVOS.length > 0){
                        for (let index = 0; index < data.nhapThongTinSCDKVOS.length; index++){
                            let tenDuongCau = '';
                            if (data.nhapThongTinSCDKVOS[index].tenDuongCau !== '' && data.nhapThongTinSCDKVOS[index].tenDuongCau !== null)
                                tenDuongCau = '(' + data.nhapThongTinSCDKVOS[index].tenDuongCau + ')';
                            let viTri = '';
                            if (data.nhapThongTinSCDKVOS[index].viTri !== '' && data.nhapThongTinSCDKVOS[index].viTri !== null)
                                viTri = 'Lý Trình: ' + data.nhapThongTinSCDKVOS[index].viTri + '<br/>';
                            let diaDiem = '';
                            if (data.nhapThongTinSCDKVOS[index].diaDiem !== '' && data.nhapThongTinSCDKVOS[index].diaDiem !== null)
                                diaDiem = 'Địa điểm: ' + data.nhapThongTinSCDKVOS[index].diaDiem;
                            let rowHtml = [
                                '<input type="checkbox" class="i-checks isChecked" id="checkSCDK">',
                                index + 1,
                                'Công trình: ' + data.nhapThongTinSCDKVOS[index].tenHangMuc + ' ' + data.nhapThongTinSCDKVOS[index].tenCongTrinh + tenDuongCau + '<br/>'
                                + viTri
                                + diaDiem,
                                utils.initCommaSeparateNumber((data.nhapThongTinSCDKVOS[index].kinhPhi_Duyet).split('.')[0]),
                                '<input type="text" class="form-control decimalNumber" name="nhapThongTinSCDKVOS['+index+'].giaTrungThau" onchange="formManager.changeGiaTH(this,'+index+')" ' +
                                'value="'+utils.initCommaSeparateNumber((data.nhapThongTinSCDKVOS[index].giaTrungThau).split('.')[0])+'"/>'
                                + '<input type="hidden" name="nhapThongTinSCDKVOS['+index+'].idScdk" value="'+data.nhapThongTinSCDKVOS[index].idScdk+'"/>'
                                + '<input type="hidden" name="nhapThongTinSCDKVOS['+index+'].idDmscdk" value="'+data.nhapThongTinSCDKVOS[index].idDmscdk+'"/>',
                                createSelTC('nhapThongTinSCDKVOS['+index+'].idDMTV_TC',data.nhapThongTinSCDKVOS[index].idDMTV_TC, index),
                                createSelTK('nhapThongTinSCDKVOS['+index+'].idDMTV_TK',data.nhapThongTinSCDKVOS[index].idDMTV_TK),
                                createSelGS('nhapThongTinSCDKVOS['+index+'].idDMTV_GS',data.nhapThongTinSCDKVOS[index].idDMTV_GS),
                                '<input type="text" class="form-control" name="nhapThongTinSCDKVOS['+index+'].thoiGian_TH" value="'+data.nhapThongTinSCDKVOS[index].thoiGian_TH+'"/>',
                                '<input type="text" class="form-control datepicker" data-mask="99/99/9999" name="nhapThongTinSCDKVOS['+index+'].ngay_HT" value="'+data.nhapThongTinSCDKVOS[index].ngay_HT+'"/>'
                            ];
                            danhMucSCDKTable.row.add(rowHtml).draw();
                            danhMucSCDKTable.draw(true);
                            if (danhMucSCDKTable.data().count() !== 0) {
                                danhMucSCDKTable.page.len(danhMucSCDKTable.data().count()).draw();
                            }
                            initSelect2('select[name="nhapThongTinSCDKVOS['+index+'].idDMTV_TC"]');
                        }
                        danhMucSCDKTable.page.len(20).draw();
                        utils.initIChecks('i-checks');
                        datatableFactory.checkCheckBox('checkAll', 'isChecked');
                        datatableFactory.checkBoxOnSelect('checkAll', 'isChecked');
                        utils.loadDatePicker('.datepicker');
                    }
                }
            }
        })
    };
    let createSelTC = function(selName,idDMTV_TC, index){
        let selHtml = '<select class="form-control iddmtv_tc" name="' + selName + '" iddmtv_tc = "'+idDMTV_TC+'" onchange="formManager.tuVanThiCong(this, '+index+')" style="width:100%;" multiple="multiple">';
        selHtml += '<option value="-1"></option>';
        listTC.forEach(function (item, index) {
            selHtml += '<option ' + (idDMTV_TC === item.id ? 'selected' : '') + ' value="' + item.ten + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelTK = function(selName,idDMTV_TK){
        let selHtml = '<select class="form-control" name="' + selName + '" style="width:100%;">';
        selHtml += '<option value="-1"></option>';
        listTK.forEach(function (item, index) {
            selHtml += '<option ' + (idDMTV_TK === item.id ? 'selected' : '') + ' value="' + item.id + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let createSelGS = function(selName,idDMTV_GS){
        let selHtml = '<select class="form-control" name="' + selName + '" style="width:100%;">';
        selHtml += '<option value="-1"></option>';
        listGS.forEach(function (item, index) {
            selHtml += '<option ' + (idDMTV_GS === item.id ? 'selected' : '') + ' value="' + item.id + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };
    let initSelect2 = function (elemId) {
        $(elemId).select2({
            tags: true,
            dropdownCssClass: 'bigdrop',
            allowClear: true,
            tokenSeparators: [','],
            multiple: true,
            placeholder: "Vui lòng chọn đơn vị thi công"
        });
        $('.select2-selection__choice').css('margin', 0);
        $(elemId).change(function () {
            $('.select2-selection__choice').css('margin', 0);
        });
    };
    let btnSave = function() {
        let form = $('#formDanhMucSCDK');
        let fd = new FormData($('#formDanhMucSCDK')[0]);
        if (danhMucSCDKTable.data().count() !== 0) {
            $('#tblDMSCDK').DataTable().page.len($('#tblDMSCDK').DataTable().data().count()).draw();
        }
        for (let i = 0; i < $('#tblDMSCDK tbody tr').length; i++) {
            let idDMTV_TC =[];
            $('select[name="nhapThongTinSCDKVOS[' + i + '].idDMTV_TC"]').find(':selected').each(function (i, d) {
                idDMTV_TC.push($(d).attr('value'))
            });
        }
        if (form.valid()){
            $.ajax({
                url: url + "/worklife/user/suachuadinhky/nhapthongtinscdk/saveForm.do",
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data !== null){
                        swal({
                            title: "Thông báo",
                            text: "Lưu dữ liệu thành công",
                            type: "success",
                            confirmButtonText: "Đồng ý"
                        });
                        btnTim();
                    }
                    else {
                        swal({
                            title: "Thông báo",
                            text: "Lưu dữ liệu thất bại",
                            type: "warning",
                            confirmButtonText: "Đồng ý"
                        });
                    }
                }
            })
        }
    };
    let btnDel = function () {
        datatableFactory.removeRowByHoan("idScdk", danhMucSCDKTable, url + "/worklife/user/suachuadinhky/nhapthongtinscdk/deleteSCDK.do", "checkAll", refeshTable);
    };
    let refeshTable = function () {
        datatableFactory.refreshPagination("tblDMSCDK");
        datatableFactory.resetIndex(danhMucSCDKTable, "nhapThongTinSCDKVOS");
    };
    let btnReport = function() {
        let form = $('#formDanhMucSCDK');
        let fd = new FormData($('#formDanhMucSCDK')[0]);
        if (danhMucSCDKTable.data().count() !== 0) {
            $('#tblDMSCDK').DataTable().page.len($('#tblDMSCDK').DataTable().data().count()).draw();
        }
        for (let i = 0; i < $('#tblDMSCDK tbody tr').length; i++) {
            let idDMTV_TC =[];
            $('select[name="nhapThongTinSCDKVOS[' + i + '].idDMTV_TC"]').find(':selected').each(function (i, d) {
                idDMTV_TC.push($(d).attr('value'))
            });
        }
        if (form.valid()){
            $.ajax({
                url: url + "/worklife/user/suachuadinhky/nhapthongtinscdk/saveForm.do",
                type: "POST",
                data: fd,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data !== null){
                        let nam = parseInt($('#selNam').val());
                        window.location = url + '/worklife/user/suachuadinhky/nhapthongtinscdk/reportExcel.do?nam=' + nam;
                    }
                    else {
                        swal({
                            title: "Thông báo",
                            text: "Xuất excel thất bại",
                            type: "warning",
                            confirmButtonText: "Đồng ý"
                        });
                    }
                }
            })
        }
    };
    /*LOAD SEL YEAR*/
    let loadSelYear = function () {
        let thisYear = new Date().getFullYear();
        let startYear = 2019;
        let endYear = thisYear;
        let options = "";
        for (let year = endYear; year >= startYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $("#selNam").html(options);
        $("#selNam").val(thisYear);
    };
    return {
        init: function () {
            return setup();
        },
        tuVanThiCong: function (element, index){
            let $this = $(element);
            if ($this.val() !== null && $this.val() !== undefined)
                $('select[name="nhapThongTinSCDKVOS[' + index + '].idDMTV_TC"]').attr('iddmtv_tc', $this.val().toString());
            else
                $('select[name="nhapThongTinSCDKVOS[' + index + '].idDMTV_TC"]').attr('iddmtv_tc', '');
        },
        changeGiaTH: function (element, index) {
            let $this = $(element);
            $('input[name="nhapThongTinSCDKVOS['+index+'].giaTrungThau"]').val(utils.initCommaSeparateNumber($this.val().replace(/,/g,'')));
        }
    }
})();
