formManager = (function () {
    let datatable = undefined;
    let csrfData = '?'+$("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content');
    const form = $('#formSuCoDetails');

    let setup = function () {
        init();
        tableEvent();
        clearEvent();
        selectEvent();
        saveEvent();
        validation();
        utils.initIntegerNumber();
        utils.initNotifyMessageBox();
        utils.initTuyenDuong();
        datemax();
    };
    let init = function(){
        utils.initIChecks('i-checks');
        utils.loadDatePicker();
        getYears();
        getWeeks();
        $("#selNam").val(new Date().getFullYear());
        let weekNo = getWeekFromDate( new Date());
        $("#selTuan").val(weekNo);
        $('#maXa').prop('disabled', true).val(-1);
        $('#idCau').prop('disabled', true).val(-1);
        datatable = setupTable();
        $.when(
            //eventUtils.getAllCategory('cau');
            eventUtils.inSelDistrict($('#maHuyen'))
        ).done(
            function () {
               // eventUtils.selOption("capKt", "id", "name", dmcapkt[0]);
            });
        /*$('.onlynumber').val(0);*/

    };
    let selectEvent = function () {
        $('#selTuan').on('change', function () {
            loadForm();
        });
        $('#selNam').on('change', function () {
            loadForm();
        });
        $('#maHuyen').on('change', function () {
            let value = parseInt($(this).val());
            if (value === -1) {
                $('#maXa').prop('disabled', true).val(-1);
            } else {
                /// load xa khi chọn huyện
                eventUtils.eventDistrictOnChange(value, $('#maXa'));
            }
        });
        $('#idTuyenDuong').on('change', function () {
            let value = parseInt($(this).val());
            layDanhSachCau(value, $('#idCau')) ;
            layDanhSachBienBao(value);
        });
    };
    let loadForm = function(){
        datatable.ajax.reload();
    };
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
                        target.append($("<option></option>").attr('value', data[i].id).text( data[i].name));
                    }
                    target.prop("disabled", false);
                }
            }, 'id');
        }
    };
    let layDanhSachBienBao = function (value,idBbdth) {
        $.ajax({
            url: url + "/worklife/user/SuCoDuong/listBienBao.do",
            data: {idTuyenDuong: value},
            type: "POST",
            success: function (data) {
                let options = "<option value='-1'>Chọn Biển Báo/Đèn Tín Hiệu</option>";
                for(dat of data){
                    let selected ='';
                    if(idBbdth !== undefined && idBbdth !== null) {
                        if (dat.idBbdth === idBbdth)
                            selected = 'selected ';
                    }
                    options+='<option {2} value="{0}">{1}</option>'.f(dat.idBbdth,dat.tenBbdth,selected);
                }
                $('#idbbdth').html(options);
                if (idBbdth === undefined || idBbdth === null)
                    $('#idbbdth').val(-1);
            }
        })
    };
    let validation = function () {
        // phần mặc đinh tạo validation cho date, select tag
        validatorUtils.getDateRequired();
        validatorUtils.getSelectRequired();
        validatorUtils.getSelectTargetRequired();
        form.validate({
            rules: {
                ngay :{
                    datemax: true
                }
            },
        });
    };
    let datemax = function (message) {
        $.validator.addMethod("datemax", function (value, element) {
            if (value && "__/__/____" !== value) {
                let currentDate = moment(new Date(), 'DD/MM/YYYY');
                let date = moment(value, 'DD/MM/YYYY');
                return date.isBefore(currentDate);
            }
            return true;
        }, message !== undefined ? message : "Ngày nhập không được lớn hơn ngày hiện tại");
    };
    let clearFunct = function(){
        //Chọn tất cả input la text và loại bỏ tag ngày, tag number
        $('#formSuCoDetails').find('input[type="text"],textarea').val("");
        $('#formSuCoDetails').find('#idSuCo, select').val(-1);
        $('#fileListTable tr.selected').removeClass('selected');
    };
    let clearEvent = function () {
        $('#btnReset').on('click', function () {
            clearFunct();
        })
    };
    let saveEvent = function () {
        $('#btnSave').on('click', function () {
            let form = $('#formSuCoDetails');
            let method = "POST";
            let modelAttribute = "suCoVO";
            form.attr("method", method);
            form.attr("action", url + "/worklife/user/SuCoDuong/luu.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
            form.attr("modelAttribute", modelAttribute);
            form.attr("enctype", "multipart/form-data");
            form.submit();
        })
    };
    let tableEvent = function () {
        $('#fileListTable').find('tbody').on('click', 'tr', function () {
            if (datatable.rows().count()<=0 ) return false;
            if (!$(this).hasClass('selected')) {
                datatable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                let data = datatable.row(this).data();

                let idSuCo = data.idSuCo;
                $.ajax({
                    url: url + "/worklife/user/SuCoDuong/getscdtheoid.do",
                    data: {idSuCo: idSuCo},
                    type: "POST",
                    success: function (data) {
                        if (data !== null){
                            $.each(data, function (key, value) {
                                $("#" + key).val(value);
                            });
                        }
                        }
                    })
            }
        });

    };

    let setupTable = function () {
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
                "mData": "ngay",
                "orderable": false,
                class: "text-center"
            }, {
                "sWidth": "15%",
                "targets": 2,
                "mData": "tenDuong",
                "orderable": false,
                class: "text-center"
            }, {
                "sWidth": "30%",
                "targets": 3,
                "orderable": false,
                class: "text-left",
                render: function (data, type, row, meta) {
                    let taiNan = '';
                    let huHong = '';
                    if (row.taiNan !== '')
                        taiNan = '- ' + row.taiNan;
                    if (row.huHong !== '')
                        huHong = '- ' + row.huHong;
                    return taiNan + '<br>' + huHong;
                }
            }, {
                "sWidth": "40%",
                "targets": 4,
                "orderable": false,
                render: function (data, type, row, meta) {
                    let xuLy = '';
                    let khacPhuc = '';
                    if (row.xuLy !== '')
                        xuLy = '- ' + row.xuLy;
                    if (row.khacPhuc !== '')
                        khacPhuc = '- ' + row.khacPhuc;
                    return xuLy + '<br>' + khacPhuc;
                }
            }
        ];
        return datatableFactory.initAjaxDataSourceDataTable('fileListTable', colDefs, url + "/worklife/user/SuCoDuong/sucoduongsearch.do", function (settings) {
            let obj = {
                "optional": {
                    "tuanthu": $("#selTuan").val(),
                    "nam": $("#selNam").val(),
                    "idGroup": $('#group_Id').val()
                }
            };
            return JSON.stringify(Object.assign(obj, settings));
        }, {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
                let row = null;
                let idSuCo = parseInt($('#idSuCo').val());
                if(idSuCo !== 0) {
                    datatable.$("tr").each(function(){
                        let obj =  datatable.row($(this)).data();
                        if(obj.idSuCo === idSuCo){
                            row = $(this);
                        }
                    });
                    if($(row) != null) {
                        $(row).trigger('click');
                    }
                }
            },
            'deferLoading': null,
            /*'order': [[1, 'desc']],*/
            'pageLength': 10,
            'displayStart': parseInt($('#startAt').val())
        }, 1, 1);
    };

    let getYears = function () {
        let startYear = 1900;
        let endYear = new Date().getFullYear();
        let options = "";
        for (let year = endYear; year >= startYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $("#selNam").html(options);
    };

    let getWeeks = function () {
        let options = "";
        for (let week = 1; week <= 54; week++) {
            options += "<option value='" + week + "'>" + week + "</option>";
        }
        $("#selTuan").html(options);
    };
    let getWeekFromDate = function (date) {
        date.setHours(0,0,0,0);
        let yearStart = new Date(date.getFullYear(),0,1);
        let weekNo = Math.ceil(( ( (date - yearStart) / 86400000) + 1 + yearStart.getDay())/7);
        return weekNo;
    };

    return {
        init: function () {
            return setup();
        }

    }
})();