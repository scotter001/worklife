/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */
const AppFolder = 'worklife';
const DataTableDefaultLanguage = {
    'paginate': {
        "first": "Đầu",
        "last": "Cuối",
        "next": "Sau",
        "previous": "Trước"
    },
    'decimal': '',
    'emptyTable': 'Không có dữ liệu',
    'info': ''/*'Showing _START_ to _END_ of _TOTAL_ entries'*/,
    'infoEmpty': ''/*'Showing 0 to 0 of 0 entries'*/,
    'infoFiltered': ''/*'(filtered from _MAX_ total entries)'*/,
    'infoPostFix': '',
    'thousands': ',',
    'lengthMenu': 'Show _MENU_ entries',
    'loadingRecords': 'Tải...',
    'processing': 'Xử lý...',
    'search': 'Tìm:',
    'zeroRecords': 'Không tìm thấy dữ liệu phù hợp'
};
const DataTableDefaultOptions = {
    'searching': false,
    'info': false,
    'lengthChange': false,
    'processing': true,
    'serverSide': true,
    'pageLength': 5,
    'pagingType': 'simple_numbers',
    'displayStart': 0,
    'deferLoading': 0,
    /*'responsive' : true,*/
    'dom': '<"top"lf>rt<"bottom"p><"clear">',
    'language': DataTableDefaultLanguage
};
const DatatableClient = {
    "searching": false,
    "bLengthChange": false,
    "pageLength": 5,
    "bFilter": false,
    "bInfo": false,
    "bSort": false,
    "bAutoWidth": false,
    "pagingType": "simple_numbers",
    'language': DataTableDefaultLanguage
};

String.prototype.format = String.prototype.f = function () {
    let s = this,
        i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};
let messageHandler = (function () {
    let error = function (xhr, status, error) {
        console.log(xhr.responseText);
    };
    let errorDelete = function (xhr, status, error) {
        console.log(xhr.responseText);
        messageHandler.deleteFailed();
    };
    let errorSaveFailed = function (xhr, status, error) {
        console.log(xhr.responseText);
        messageHandler.saveFailed();
    };
    return {
        getErrorCallBack: function () {
            return error;
        },
        getErrorCallBackSaveFailed: function () {
            return errorSaveFailed;
        },
        getErrorCallBackDeleteFailed: function () {
            return errorDelete;
        },
        saveSuccessful: function () {
            swal({
                title: "Thông báo",
                text: "Lưu thành công",
                type: "success",
                confirmButtonText: "Đồng ý"
            });
        },
        saveFailed: function () {
            swal({
                title: "Thông báo",
                text: "Lưu thất bại",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        },
        warningCustomMess: function (message) {
            swal({
                title: "Thông báo",
                text: message,
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        },
        selectRow: function () {
            swal({
                //Thông báo lỗi không có dòng nào được chọn
                title: "Thông báo",
                text: "Vui lòng chọn dòng cần xóa",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        },
        confirmDelete: function (callback) {
            swal({
                title: "Thông báo",
                text: "Bạn chắc chắn muốn xóa ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy",
                closeOnConfirm: true,
                closeOnCancel: true
            }, callback);
        },
        deleteSuccessful: function () {
            swal({
                //Thông báo lỗi không có dòng nào được chọn
                title: "Thông báo",
                text: "Xóa thành công",
                type: "success",
                confirmButtonText: "Đồng ý"
            });
        },
        deleteFailed: function () {
            swal({
                title: "Thông báo",
                text: "Xóa thất bại",
                type: "error",
                confirmButtonText: "Đồng ý",
                timer: 2000
            });
        },
        errorWithParam: function (title, text, accept) {
            swal({
                title: title,
                text: text,
                type: "error",
                confirmButtonText: accept,
                timer: 2000
            });
        },
        successWithParam: function (title, text, accept) {
            swal({
                title: title,
                text: text,
                type: "success",
                confirmButtonText: accept
            });
        },
        warningWithParam: function (title, text, accept) {
            swal({
                title: title,
                text: text,
                type: "warning",
                confirmButtonText: accept,
                timer: 2000
            });
        },
    }
})();
let utils = (function () {
    let initCsrf = function () {
        let _csrf = $("meta[name='_csrf']").attr("content");
        let _csrf_header = $("meta[name='_csrf_header']").attr("content");
        $(document).ajaxSend(function (e, xhr, options) {
            xhr.setRequestHeader(_csrf_header, _csrf);
        });
    };
    let inAjaxRequestErrorHandler = function () {
        $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
            console.log(arguments);
            /*console.log(arguments[3]);*/
        });
    };
    let initCommaSeparateNumber = function (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    let initSelect2 = function (elemId) {
        $(elemId).select2({
            tags: true,
            dropdownCssClass: 'bigdrop',
            allowClear: true,
            tokenSeparators: [','],
            multiple: true,
            placeholder: "Vui lòng chọn huyện/TP/TX"
        });
        $('.select2-selection__choice').css('margin', 0);
        $(elemId).change(function () {
            $('.select2-selection__choice').css('margin', 0);
        });
    };
    $(document).ready(function () {
        inAjaxRequestErrorHandler();
        initCsrf();
        $('[data-toggle="tooltip"]').tooltip();
    });
    return {
        getSafePath: function (url) {
            if (!rootPath.endsWith('/'))
                rootPath = rootPath + '/';
            return window.location.protocol + "//" + window.location.host + rootPath + url;
        },
        initCommaSeparateNumber: function (number) {
            return initCommaSeparateNumber(number);
        },
        initDecimalNumberRule: function () {
            //Chỉ cho nhập số thập phân
            $('.decimalNumber').on("keypress", function (evt) {
                var self = $(this);
                if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
                    evt.preventDefault();
                }
            });
        },
        initDecimal: function (className, seperate, commas) {
            $(className).on("keypress", function (evt) {
                let self = $(this);
                if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) {
                    evt.preventDefault();
                }
            });
            $(className).on("blur", function () {
                var self = $(this);
                var oldValue = self.val();
                oldValue = oldValue.split(',').join('');
                if (oldValue == '' || oldValue == 0.0) {
                    self.val('');
                    return;
                }
                if (typeof oldValue !== 'undefined' && oldValue != null) {
                    if (isNaN(oldValue)) {
                        self.val('');
                        return;
                    }
                    let number = 10;
                    for (let i = 0; i < commas; i++) {
                        number *= 10;
                    }
                    var newValue = parseFloat(Math.round(oldValue * number) / number).toFixed(commas);
                    if (seperate) {
                        newValue = initCommaSeparateNumber(newValue);
                    }
                }
                self.val(newValue);
            });
        },
        initLoaiDuong: function () {
            return $.ajax({
                url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getloaiduong.do",
                type: "POST",
                success: function (data) {
                    if (data !== null) {
                        let options = '<option value="-1"></option>';
                        for (let i = 0; i < data.length; i++) {
                            options += '<option value="' + data[i].idLoaiDuong + '">' + data[i].ten + '</option>';
                        }
                        $('#loaiDuong').html(options);
                        $('#idLoaiDuong').html(options);
                    }
                }
            })
        },
        initTuyenDuong: function () {
            return $.ajax({
                url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/gettuyenduong.do",
                type: "POST",
                success: function (data) {
                    if (data !== null) {
                        let options = '<option value="-1"></option>';
                        for (let i = 0; i < data.length; i++) {
                            options += '<option value="' + data[i].idTuyenDuong + '">' + data[i].tenDuong + '</option>'
                        }
                        $('#idTuyenDuong').html(options);
                    }
                }
            })
        },
        initHuyen: function () {
            $.ajax({
                url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getlisthuyen.do",
                type: "POST",
                success: function (data) {
                    if (data !== null) {
                        let options = '<option value="-1"></option>';
                        for (let i = 0; i < data.length; i++) {
                            options += '<option value="' + data[i].idHuyen + '">' + data[i].tenHuyen + '</option>';
                        }
                        $('#idHuyen,#huyenTP').html(options);
                    }
                }
            })
        },
        initHuyenSelect2: function () {
            return  $.ajax({
                url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getlisthuyen.do",
                type: "POST",
                success: function (data) {
                    if (data !== null) {
                        let options = '<option value="-1"></option>';
                        for (let i = 0; i < data.length; i++) {
                            options += '<option value="' + data[i].idHuyen + '">' + data[i].tenHuyen + '</option>';
                            listHuyen = data;
                        }
                        $('#nhieuHuyen,#huyenTP').html(options);
                        $('.nhieuHuyen').html(options);

                        initSelect2("#nhieuHuyen");
                        initSelect2(".nhieuHuyen");
                    }
                }
            })
        },
        initHatQuanLy: function () {
            return $.ajax({
                url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/gethatquanly.do",
                type: "POST",
                success: function (data) {
                    if (data !== null) {
                        let group_Id = parseInt($('#group_Id').val());
                        let options = '';
                        for(dat of data){
                            let selected ='';
                            if(group_Id !== undefined && group_Id !== null && group_Id !== 1) {
                                if (dat.group_Id === group_Id) {
                                    selected = 'selected ';
                                }
                            }
                            options+='<option {2} value="{0}">{1}</option>'.f(dat.group_Id,dat.group_Name,selected);
                        }
                        $('#hatQuanLy').html(options);
                        if (group_Id !== 1)
                            $('#hatQuanLy').attr('disabled', true);
                        /*$('#idGroup').html(options);*/
                    }
                }
            })
        },
        initHatQuanLyFormBC: function () {
            $.ajax({
                url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/gethatquanly.do",
                type: "POST",
                success: function (data) {
                    if (data !== null) {
                        let group_Id = parseInt($('#group_Id').val());
                        let options = '<option value="-1"></option>';
                        for(dat of data){
                            let selected ='';
                            if(group_Id !== undefined && group_Id !== null && group_Id !== 1) {
                                if (dat.group_Id === group_Id) {
                                    selected = 'selected ';
                                }
                            }
                            options+='<option {2} value="{0}">{1}</option>'.f(dat.group_Id,dat.group_Name,selected);
                        }
                        $('#idGroup,#hatQuanLy').html(options);
                        if (group_Id !== 1)
                            $('#hatQuanLy').attr('disabled', true);
                    }
                }
            })
        },
        initRoundDecimalNumber: function (element, x) {
            var self = $(element);
            var oldValue = self.val();
            oldValue = oldValue.split(',').join('');
            if (typeof oldValue !== 'undefined' && oldValue != null && oldValue != '') {
                //Kiểm tra trường hợp nhấn ctrl+v
                if (isNaN(oldValue)) {
                    self.val('');
                    return;
                }
                if (x == 0) {
                    newValue = oldValue;
                } else {
                    newValue = parseFloat(Math.round(oldValue * 100) / 100).toFixed(x);
                }
            }
            self.val(newValue);
        },
        initRoundToXDecimalNumber: function (element, x, check) {
            var newValue = "";
            var self = $(element);
            var oldValue = self.val();
            oldValue = oldValue.split(',').join('');
            if (typeof oldValue !== 'undefined' && oldValue != null && oldValue != '') {
                //Kiểm tra trường hợp nhấn ctrl+v
                if (isNaN(oldValue)) {
                    self.val('');
                    return;
                }
                if (x == -1) {
                    newValue = oldValue;
                } else {
                    newValue = parseFloat(Math.round(oldValue * 100) / 100).toFixed(x);
                }
                newValue = initCommaSeparateNumber(newValue);
            }
            if (check !== undefined && newValue == '') {
                if (check == 1) {
                    newValue = '0.00';
                } else if (check == 2) {
                    newValue = '0';
                }
            }
            self.val(newValue);
        },
        loadDateTimePicker: function () {
            let dtp = $('*[data-datetimepicker="true"] input[type="text"]');
            dtp.datetimepicker({
                format: 'DD/MM/YYYY HH:mm',
            });
            dtp.on("dp.change", function (e) {

            });
            $(document).on('touch click', '*[data-datetimepicker="true"] .input-group-addon', function (e) {
                $('input[type="text"]', $(this).parent()).focus();
            })
        },
        loadDatePicker: function (className) {
            if (className === undefined)
                className = '.datepicker';
            $(className).datepicker({
                todayBtn: "linked",
                format: 'dd/mm/yyyy',
                autoclose: true,
                keyboardNavigation: false,
                forceParse: false,
                todayHighlight: true
            }).on('changeDate', function () {
                $(this).valid();
            });
        },
        //dd/MM/yyyy
        convertStringToDate: function (sDate) {
            if (sDate) {
                let arrDate = sDate.split("/");
                let date = arrDate[1] + '/' + arrDate[0] + '/' + arrDate[2];
                let dDate = new Date(date);
                if (Object.prototype.toString.call(dDate) === "[object Date]") {
                    let month = parseInt(arrDate[1]);
                    let monthToCompare = dDate.getMonth() + 1;
                    if (month !== monthToCompare) {
                        return null;
                    }
                    if (isNaN(dDate.getTime())) {
                        return null;
                    }
                    else {
                        return dDate;
                    }
                }
                else {
                    return null;
                }
            }
        },
        csrfInject: function () {
            return initCsrf();
        },
        initToolTip: function (clazzName) {
            if (clazzName === undefined) {
                clazzName = '[data-toggle="tooltip"]';
            }
            $(clazzName).tooltip();
        },
        initNotifyMessageBox: function () {
            let isInsertSuccess = $("#isInsertSuccessfully");
            //Alert thông báo insert, update dữ liệu thành công hay thất bại
            let isInsertSuccessfully = parseInt(isInsertSuccess.val());
            //Nếu isInsertSuccessfully == 1 thì insert thành công
            if (isInsertSuccessfully === 1) {
                swal({
                    title: "Thông báo",
                    text:  "Lưu thành công",
                    type:  "success",
                    confirmButtonText: "Đồng ý"
                });
                $('body').css('overflow', 'auto');
            }
            //Nếu isInsertSuccessfully == 2 thì update thành công
            else if (isInsertSuccessfully === 2) {

            }
            //Nếu isInsertSuccessfully == 2 thì insert thất bại
            else if (isInsertSuccessfully === 3) {
                swal({
                    title: "Thông báo",
                    text: "Lưu thất bại",
                    type:  "error",
                    confirmButtonText: "Đồng ý"
                });
                $('body').css('overflow', 'auto');
            }
            //Nếu isInsertSuccessfully == 4 thì update thất bại
            else if (isInsertSuccessfully === 4) {

            }
            isInsertSuccess.val('');
        },
        initIntegerNumber: function () {
            //Chỉ cho nhập số nguyen
            $('.onlynumber').on('keypress', function (evt) {
                let self = $(this);
                if ((evt.which < 48 || evt.which > 57)) {
                    evt.preventDefault();
                }
            });
            //Chỉ cho nhập số nguyen
            $('.number').on('keypress', function (evt) {
                let self = $(this);
                if ((evt.which < 48 || evt.which > 57)) {
                    evt.preventDefault();
                }
            });
        },
        initIntegerNumberRule: function (className) {
            $(className).on('keypress', function (evt) {
                let self = $(this);
                if ((evt.which < 48 || evt.which > 57)) {
                    evt.preventDefault();
                }
            });
            $(className).on("blur", function () {
                var self = $(this);
                var oldValue = self.val();
                if (oldValue == '' || oldValue == 0.0 || oldValue.indexOf('.') > -1 || isNaN(oldValue)) {
                    self.val('');
                    return;
                }
                self.val(oldValue);
            });
        },

        ajaxRequestErrorHandler: function () {
            inAjaxRequestErrorHandler();
        },
        isNull: function (value) {
            return value === undefined || value === null;
        },
        isEmpty: function (value) {
            if (value === undefined || value === null)
                return true;
            if ($.isArray(value))
                return (value.length === 0);
            return false
        },
        getFullUrlPath: function (url) {
            if (!rootPath.endsWith('/'))
                rootPath = rootPath + '/';
            return rootPath + AppFolder + url;
        },
        inEditableSelect: function ($elementHolder, $valueHolder) {
            $('#' + $elementHolder).editableSelect({
                // enable filter
                filter: true,
                // default, fade or slide
                effects: 'slide',
                // fast, slow or [0-9]+
                duration: 'fast',
                // "focus" or "manual"
                trigger: 'focus'
            }).on('select.editable-select', function (e, li) {
                $('#' + $valueHolder).val(li.val());
            });
            eventUtils.eventStreet($elementHolder, $valueHolder);
        },
        initIChecks: function (className) {
            $('.' + className).iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
            });
        },
        enablePagination: function (target, enable) {
            if (!enable) {
                $(target).DataTable().page.len($(target).DataTable().data().count()).draw();
            } else {
                $(target).DataTable().page.len(5).draw();
            }
        },
        addCsrf :function(form){
           /* form.append($('<input>',{
                type : "hidden",
                name : $("meta[name='_csrf_parameter']").attr('content'),
                value : $("meta[name='_csrf']").attr('content')
            }))*/
        },
        resolve : function (o,s) {
            s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
            s = s.replace(/^\./, '');           // strip a leading dot
            let a = s.split('.');
            for (let i = 0, n = a.length; i < n; ++i) {
                let k = a[i];
                if (k in o) {
                    o = o[k];
                } else {
                    return;
                }
            }
            return o;
        }
    }
})();
let datatableFactory = (function () {
    let headerFormat = function (styles) {
        let newStylesForHeader = styles.createElement('xf');
        newStylesForHeader.setAttribute('numFmtId', '0');
        newStylesForHeader.setAttribute('fontId', '2');
        newStylesForHeader.setAttribute('fillId', '0');
        newStylesForHeader.setAttribute('borderId', '1');
        newStylesForHeader.setAttribute('applyFont', '1');
        newStylesForHeader.setAttribute('applyFill', '1');
        newStylesForHeader.setAttribute('applyBorder', 1);
        newStylesForHeader.setAttribute('applyAlignment', 1);
        let alignmentChild = styles.createElement('alignment');
        alignmentChild.setAttribute('horizontal', 'center');
        newStylesForHeader.appendChild(alignmentChild);
        let stylesHolder = styles.getElementsByTagName('cellXfs');
        $(stylesHolder).attr('count', parseInt($(stylesHolder).attr('count')) + 1);
        stylesHolder[0].appendChild(newStylesForHeader);
    };
    return {
        initAjaxDataSourceDataTable: function ($selector, colDefs/*array*/, url/*ajax url*/, postInject/*build post parameters function*/, opts, notAutoHidePaginator, jsonType) {
            let options = {};
            Object.assign(options, DataTableDefaultOptions, opts, {'columnDefs': colDefs});
            let ajaxOpt = null;
            if (jsonType === undefined) {
                ajaxOpt = {
                    'ajax': {
                        'url': url,
                        'type': 'POST',
                        'data': postInject
                    },
                };
            } else {
                ajaxOpt = {
                    'ajax': {
                        'url': url,
                        'type': 'POST',
                        'data': postInject,
                        "dataType": "json",
                        "processData": false,
                        "contentType": 'application/json;charset=UTF-8'
                    }
                };
            }
            Object.assign(options, ajaxOpt);
            if (notAutoHidePaginator === undefined)
                Object.assign(options, {
                    "fnDrawCallback": function (oSettings) {
                        if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                            $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                        } else {
                            $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                        }
                    },
                });
            return /*$selector*/$('#' + $selector).DataTable(options);
        },
        initDataSourceDataTable: function ($selector, colDefs/*array*/, url/*ajax url*/, postInject/*build post parameters function*/, opts, notAutoHidePaginator) {
            if (utils.isNull(opts))
                opts = {'serverSide': false};
            else
                Object.assign(opts, {'serverSide': false});
            return this.initAjaxDataSourceDataTable($selector, colDefs, url, postInject, opts, notAutoHidePaginator);
        },
        initDataSourceDataTableNonLoad: function ($selector, colDefs, opts, notAutoHidePaginator) {
            let options = {};
            Object.assign(options, DatatableClient, opts, {'columnDefs': colDefs});
            if (notAutoHidePaginator === undefined)
                Object.assign(options, {
                    "fnDrawCallback": function (oSettings) {
                        if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                            $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                        } else {
                            $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                        }
                    },
                });
            return /*$selector*/$('#' + $selector).DataTable(options);
        },
        indexing: function (tableName, index) {
            let table = $('#' + tableName).DataTable();
            let info = table.page.info();
            let infopage = info.pages;
            let liPag = $("#" + tableName + "_paginate ul.pagination li:not(li.previous, li.next)");
            if (index >= 5) {
                $.each(liPag, function (index, key) {
                    $(key).removeClass('active');
                    if ($(key).text() == infopage) {
                        $(key).addClass('active');
                        $(key).click();
                    }
                });
            }
        },
        refreshPagination: function (tableName,position) { // refresh pagination
            let table = $('#' + tableName).DataTable();
            table.draw(false);
            //Cập nhật lại số thứ tự
            let rows = table.$('tr');
            let stt = 1;
            $(rows).each(function () {
                let row = $(this);
                let tdSTT = $(row).find("td:nth-child("+(position === undefined ? 2 : position)+")");
                $(tdSTT).text(stt);
                stt++;
            });
        },
        checkBoxOnSelect: function (checkAll, isChecked,custom) {
            //event checkbox
            checkAll = '#'+checkAll;
            isChecked = '.'+isChecked;
            $(checkAll).on('ifChecked', function (e) {
                let notChecked = $(isChecked).not(':checked');
                if (notChecked.length > 0 ) {
                    notChecked.prop('checked',true).iCheck('update');
                }
                if(custom !== undefined){
                    custom(notChecked);
                }
            });
            $(checkAll).on('ifUnchecked', function (e) {
                $(isChecked).prop('checked',false).iCheck('update');
            });
            $(isChecked).on('ifChecked', function () {
                let iCheckedCheck = $(isChecked).length;
                let iCheckedChecked = $(isChecked + ':checked').length;
                if (iCheckedCheck !== 0) {
                    if (iCheckedCheck === iCheckedChecked) {
                        $(checkAll).prop('checked',true).iCheck('update');
                    } else {
                        $(checkAll).prop('checked',false).iCheck('update');
                    }
                }
            });
            $(isChecked).on('ifUnchecked', function (e) {
                let iCheckedCheck = $(isChecked).length;
                let iCheckedChecked = $(isChecked + ':checked').length;
                if (iCheckedCheck !== 0) {
                    if (iCheckedCheck === iCheckedChecked) {
                        $(checkAll).prop('checked',true).iCheck('update');
                    } else {
                        $(checkAll).prop('checked',false).iCheck('update');
                    }
                }
            });
        },
        checkCheckBox: function (checkAll, isChecked) {
            checkAll = '#' + checkAll;
            isChecked = '.' + isChecked;
            let iCheckedTBCheck = $(isChecked).length;
            let iCheckedTBChecked = $(isChecked + ':checked').length;
            if (iCheckedTBCheck !== 0) {
                if (iCheckedTBCheck === iCheckedTBChecked) {
                    $(checkAll).iCheck('check');
                } else {
                    $(checkAll).iCheck('uncheck');
                }
            }
        },
        uploadFile: function (element, textAreaName) {
            let This = this;
            let currentRow = $(element).closest('tr');
            let tenGiay = $(currentRow).find('[name$="' + textAreaName + '"]').val();
            console.log(tenGiay);
            if (!tenGiay) {
                swal({
                    title: fileMultiLanguage.notify,
                    text: fileMultiLanguage.required_name,
                    type: "warning",
                    confirmButtonText: fileMultiLanguage.accept
                });
                event.preventDefault();
                return false;
            } else {
                console.log($(currentRow).find('input[type="file"]'));
                $($(currentRow).find('input[type="file"]')).on('change', function () {
                    let $this = $(this);
                    let tenfile = $this.val();
                    if (tenfile) {
                        let sizeFile = $this[0].files[0].size;
                        if (sizeFile > 21000000) {
                            swal({
                                title: fileMultiLanguage.notify,
                                text: fileMultiLanguage.out_of_memory,
                                type: "warning",
                                confirmButtonText: fileMultiLanguage.accept
                            });
                            this.value = null;
                        } else {
                            let strArr = tenfile.split("\\");
                            let fixStr = strArr[strArr.length - 1];
                            if (fixStr.length > 20) {
                                $(element).attr("data-original-title", fixStr);
                            }
                            else {
                                $(element).attr("data-original-title", '');
                            }
                            $(element).text(This.hideStringIfOver20Character(fixStr));
                            //Delete icon download
                            if ($(currentRow).find('.download-file').length) {
                                $(currentRow).find('.download-file').remove();
                            }
                        }
                    }
                });
            }
        },
        hideStringIfOver20Character: function (tenFile) {
            let arrData = tenFile.split(".");
            let joinStr = "";
            if (arrData.length > 2) {
                for (let i = 0; i < arrData.length - 1; i++) {
                    if (i !== 0)
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
        deleteFile: function (element, name, type) {
            let divFile = $(element).closest("div.attackFile");
            let fileName = $(divFile).find("label").text().trim();
            if (fileName !== fileMultiLanguage.attack_file) {
                messageHandler.confirmDelete(function () {
                    let id = $(element).closest("tr").find("input[name*='" + name + "']").val();
                    console.log(id);
                    $.ajax({
                        type: "POST",
                        url: utils.getSafePath("/worklife/user/file/json/deleteFile.do"),
                        data: {'idParent': id, 'idLoaiTaiLieu': type},
                        success: function (data) {
                            if (data) {
                                $(divFile).find("label").text(fileMultiLanguage.attack_file);
                                $(element).attr("data-original-title", '');
                                let currentRow = $(element).closest('tr');
                                $(currentRow).find("input[type='file']").val('');
                                $(currentRow).find(".attachFile").attr('data-original-title', "");
                                if ($(currentRow).find('.download-file').length) {
                                    $(currentRow).find('.download-file').remove();
                                }
                                setTimeout(function () {
                                    messageHandler.successWithParam(fileMultiLanguage.notify, fileMultiLanguage.delete_successful, fileMultiLanguage.accept);
                                }, 100);
                            } else {
                                setTimeout(function () {
                                    messageHandler.errorWithParam(fileMultiLanguage.notify, fileMultiLanguage.delete_failed, fileMultiLanguage.accept);
                                }, 100);
                            }
                        },
                    });
                });
            }
        },
        fileNameBlur: function (element) {
            let tenGiay = $(element).val();
            let currentRow = $(element).closest('tr');
            let fileInput = $(currentRow).find("input[type='file']");
            if (!(tenGiay && tenGiay.trim())) {
                let divFile = $(currentRow).find("div.attackFile");
                let fileUploadName = $(divFile).find("label").text().trim();
                if (fileUploadName !== fileMultiLanguage.attack_file) {
                    messageHandler.warningWithParam(fileMultiLanguage.notify, fileMultiLanguage.required_name, fileMultiLanguage.accept);
                    setTimeout(function () {
                        $(element).focus()
                    }, 1);
                    return;
                }
                $(fileInput).prop("disabled", true);
            } else {
                $(fileInput).prop("disabled", false);
            }
            if (tenGiay.length > 45) {
                //&#xa = new line
                $(element).attr("data-original-title", tenGiay);
            } else {
                $(element).attr("data-original-title", '');
            }
        },
        removeRow: function (inputName, tbl, url, $selectorUncheck, custom) {
            let isChecked = tbl.$('tr').find("td:first-child input:checked");
            if (isChecked.length === 0) {
                messageHandler.warningWithParam(fileMultiLanguage.notify, fileMultiLanguage.required_select, fileMultiLanguage.accept);
            } else {
                messageHandler.confirmDelete(function () {
                    let lstId = [];
                    $.each(isChecked, function () {
                        let id = tbl.row($(this).closest("tr")).data()[inputName];
                        if (id > 0) {
                            lstId.push(parseInt(id));
                        } else {
                            tbl.row($(this).closest("tr")).remove().draw(false);
                        }
                    });
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json",
                        url: url,
                        data: JSON.stringify(lstId),
                        success: function (data) {
                            if (data) {
                                $.each(isChecked, function () {
                                    tbl.row($(this).closest("tr")).remove().draw(false);
                                });
                                let checkbox = $('#' + $selectorUncheck);
                                if (checkbox.closest('div').hasClass('checked')) {
                                    checkbox.iCheck('uncheck');
                                }
                                setTimeout(function () {
                                    messageHandler.successWithParam(
                                        fileMultiLanguage.notify, fileMultiLanguage.remove_successful, fileMultiLanguage.accept);
                                }, 100);
                                if (custom !== undefined) {
                                    console.log(custom);
                                    custom();
                                }
                            } else {
                                setTimeout(function () {
                                    messageHandler.successWithParam(fileMultiLanguage.notify, fileMultiLanguage.remove_failed, fileMultiLanguage.accept);
                                }, 100);
                            }
                        },
                        error: messageHandler.getErrorCallBackDeleteFailed()
                    });
                });
            }
        },
        removeRowByHoan  : function(inputName,tbl,url,$selectorUncheck,custom){
            let isChecked = tbl.$('tr').find("td:first-child input:checked");
            if (isChecked.length === 0) {
                messageHandler.warningWithParam(fileMultiLanguage.notify,fileMultiLanguage.required_select,fileMultiLanguage.accept);
            } else {
                messageHandler.confirmDelete(function(){
                    let lstId = [];
                    $.each(isChecked, function () {
                        let id = $(this).closest("tr").find("input[name$="+inputName+"]").val();
                        if (id > 0) {
                            lstId.push(parseInt(id));
                        } else {
                            tbl.row($(this).closest("tr")).remove().draw(false);
                        }
                    });
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json",
                        url: url,
                        data: JSON.stringify(lstId),
                        success: function (data) {
                            if (data) {
                                $.each(isChecked, function () {
                                    tbl.row($(this).closest("tr")).remove().draw(false);
                                });
                                let checkbox = $('#'+$selectorUncheck);
                                if (checkbox.closest('div').hasClass('checked')) {
                                    checkbox.iCheck('uncheck');
                                }
                                setTimeout(function () {
                                    messageHandler.successWithParam(fileMultiLanguage.notify,fileMultiLanguage.remove_successful,fileMultiLanguage.accept);
                                }, 100);
                                if(custom !== undefined){
                                    custom();
                                }
                            } else {
                                setTimeout(function () {
                                    messageHandler.successWithParam(fileMultiLanguage.notify,fileMultiLanguage.remove_failed,fileMultiLanguage.accept);
                                }, 100);
                            }
                        },
                        error: messageHandler.getErrorCallBackDeleteFailed()
                    });
                });
            }
        },
        downloadFile: function (element, idName, idLoaiTaiLieu) {
            let id = $(element).closest('tr').find('[name*="' + idName + '"]').val();
            window.open(utils.getSafePath("/worklife/user/file/json/downloadfile.do?idParent=" + id + "&idLoaiTaiLieu=" + idLoaiTaiLieu, '_blank'));
        },
        resetIndex: function (table, object, indexArr) {
            if (indexArr === undefined)
                indexArr = 1;
            let rows = table.$('tr');
            if (rows.length > 0) {
                $(rows).each(function (index) {
                    $(this).find(":input[name^='" + object + "']").each(function () {
                        let name = $(this).attr("name");
                        name = object + "[" + index + "]." + name.split('.')[indexArr];
                        $(this).attr("name", name);
                    });
                });
            }
        },
        updateRowPosition: function (table, object, pos) {
            let i = 0;
            let rows = table.$('tr');
            if (rows.length > 0) {
                $(rows).each(function () {
                    $(this).find("[name^='" + object + "']").each(function () {
                        var name = $(this).attr("name");
                        var nameArraySplitByDot = name.split('.');
                        name = object + "[" + i + "]";
                        for (var k = pos; k < nameArraySplitByDot.length; k++) {
                            name += "." + nameArraySplitByDot[k];
                        }
                        $(this).attr("name", name);
                    });
                    i++;
                });
            }
        },
        getButtonExcel: function (text, classType, headerCustomCallBack, fileExtractName,exOptions) {
            return {
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: text,
                        className: classType,
                        title: headerCustomCallBack,
                        customize: function (xlsx) {
                            let sheet = xlsx.xl.worksheets['sheet1.xml'];
                            let styles = xlsx.xl['styles.xml'];
                            $('fonts font sz', styles).attr('val', 13);
                            $('fonts font name', styles).attr('val', 'Times New Roman');
                            $('row c', sheet).attr('s', '25');
                            //first row
                            headerFormat(styles);
                            $('row:first c', sheet).attr('s', '67');
                            //row 2
                            $('row:nth-child(2) c', sheet).attr('s', '67');
                        },
                        filename: fileExtractName,
                        exportOptions: exOptions === undefined ? {} : exOptions,
                        createEmptyCells : true
                    }
                ]
            }
        }
    }
})();
let eventUtils = (function () {
    return {
        initNguoiKyVB: function() {
            $.ajax({
                url: url + '/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/getnguoiky.do',
                type: 'post',
                success: function (data) {
                    if (data != null){
                        let options = '<option value="" chucvu = ""></option>';
                        for (let i = 0; i < data.length; i++){
                            options += '<option value="'+data[i].nguoiKy+'" chucvu = "'+data[i].chucVu+'" uyquyen="'+data[i].uyQuyen+'">'+data[i].nguoiKy+'</option>';
                        }
                        $('#nguoiKy').html(options);
                    }
                }
            })
        },
        initNguoiKyGP: function() {
            $.ajax({
                url: url + '/worklife/qlctgt/user/xulyhoso/cpctdaunoiduong/getnguoikygp.do',
                type: 'post',
                success: function (data) {
                    if (data != null){
                        let options = '<option value="" chucvu = ""></option>';
                        for (let i = 0; i < data.length; i++){
                            options += '<option value="'+data[i].nguoiKy+'" chucvu = "'+data[i].chucVu+'">'+data[i].nguoiKy+'</option>';
                        }
                        $('#nguoiKyGP').html(options);
                    }
                }
            })
        },
        handyAjax: async function (url, data) {
            return $.ajax({
                url: utils.getSafePath(url),
                data: data,
                type: 'POST',
            });
        },
        postJson: async function (url, data) {
            return $.ajax({
                url: url,
                data: data,
                type: 'POST',
                dataType: 'json'
            });
        },

        inSelDistrict: function (/*element selector*/ ctl) {
            let This = this;
            return This.getAllCategory('dmhuyen', function (data) {
                if (ctl === undefined || data === undefined)
                    return;
                if ($.isArray(data)) {
                    ctl.empty();
                    ctl.append($("<option></option>").attr('value', -1).text('Chọn Huyện/Thành phố'));
                    for (let i = 0; i < data.length; i++) {
                        ctl.append($("<option></option>").attr('value', data[i].code.trim()).text(data[i].extendCol1 + " " + data[i].name).prop('jsData', data[i]));
                    }
                }
            });
        },

        eventDistrictOnChange : function(value,target,targetVal,readonly,readonlys) {
            return eventUtils.getAllCategoryWithParent('dmxa', value, function (data) {
                if (data === undefined)
                    return;
                if ($.isArray(data)) {
                    target.empty();
                    target.append($("<option></option>").attr('value', -1).text('Chọn Phường/Xã'));
                    for (let i = 0; i < data.length; i++) {
                        target.append($("<option></option>").attr('value', data[i].code).text(data[i].extendCol1 + " " + data[i].name).prop('jsData', data[i]));
                    }
                    target.prop("disabled", false);
                    if (targetVal !== undefined) {
                        target.val(targetVal);
                    }
                    if (readonly === "1") {
                        target.attr("disabled", "disabled");
                    }
                }
            }, 'code');
        },

        getAllCategory: function (tblName, callback) {
            return $.ajax({
                url: utils.getSafePath("/worklife/manager/category/get-list.do"),
                data: {"tblName": tblName},
                type: 'POST',
                success: callback
            });
        },
        getAllCategoryWithParent: function (tblName, parentId, callback, type, column, tblParent) {
            if (type === undefined)
                return;
            let data = {
                "tblName": tblName,
                "value": parentId
            };
            if (column !== undefined && tblParent !== undefined) {
                data["column"] = column;
                data["tblParent"] = tblParent;

            }
            return $.ajax({
                url: utils.getSafePath("/worklife/manager/category/get-with-parent/" + type + "/get-list.do"),
                data: data,
                type: 'POST',
                success: callback
            });
        },
        getAllCategoryWithCondition: function (tblName, column, value, callback) {
            let data = {
                "tblName": tblName,
                "value": value
            };
            if (column !== undefined) {
                data["column"] = column;
            }
            return $.ajax({
                url: utils.getSafePath("/worklife/manager/category/get-list-with-condition.do"),
                data: data,
                type: 'POST',
                success: callback
            });
        },

        selOption: function (element, id, text, data, defaultopts) {
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
                        value: data[i][id],
                        text: data[i][text].trim()
                    }).prop('jsData', data[i]));
                }
                element.append(options);
            }
        },
        eventStreet: function (element, valueHolder) {
            $This = this;
            $('#' + element).blur(function () {
                let tenDuong = $(this).val();
                if (tenDuong) {
                    tenDuong = tenDuong.trim();
                    let flag = false;
                    $.each($('.es-list li'), function () {
                        let text = $(this).text();
                        if (text) {
                            text = text.trim();
                            if (tenDuong === text) {
                                $('#' + valueHolder).val($(this).val());
                                flag = true;
                            }
                        }
                    });
                    if (flag) {
                        return;
                    }
                    $This.getCategory('dmduong', tenDuong, 'name', function (data) {
                        if (!data) {
                            $('#txtTenDuongModal').val(tenDuong);
                            $('#insertDuongModal').modal({
                                backdrop: 'static',
                                show: true
                            });
                        }
                    });
                } else {
                    $('#' + valueHolder).val('-1');
                }
            });
            $('#insertDuongModal').on('hidden.bs.modal', function (e) {
                setTimeout(function () {
                    $('#' + element).focus()
                }, 5);
            });
            $('#btnLuuTenDuongModal').on('click', function () {
                let txtTenDuong = $('#txtTenDuongModal').val();
                let CategoryVO = JSON.stringify({
                    id: -1,
                    name: txtTenDuong,
                    code: null,
                    extendCol1: null,
                    extendCol2: null,
                    extendCol3: null,
                    extendCol4: null,
                    extendCol5: null
                });
                $.ajax({
                    type: "POST",
                    url: utils.getSafePath("/worklife/manager/category/json/street/insert.do"),
                    contentType: 'application/json',
                    data: CategoryVO,
                    success: function (data) {
                        if (data && data !== null) {
                            $('#' + valueHolder).val(data);
                            messageHandler.saveSuccessful();
                            $('#' + element).editableSelect('add', $('#txtTenDuongModal').val(), undefined, {
                                0: {
                                    name: "value",
                                    value: data
                                }
                            });
                            $('#insertDuongModal').modal('hide');
                            $('body').css('overflow', 'auto');
                        }
                    },
                    error: messageHandler.getErrorCallBackSaveFailed()
                });
            });
        },
        getCategory: function (tblName, value, type, callback) {
            return $.ajax({
                url: utils.getSafePath("/worklife/manager/category/" + type + "/get.do"),
                data: {"tblName": tblName, "value": value},
                type: 'POST',
                success: callback
            });
        },
        getOptionsDefault: function (tblName, column, callback) {
            return $.ajax({
                url: utils.getSafePath("/worklife/manager/category/default/option/get.do"),
                data: {"tblName": tblName, "column": column},
                type: 'POST',
                success: callback
            });
        },
        setStreet: function (id, target) {
            if (id !== 0) {
                $.each(target.next().find('li'), function () {
                    if (id === parseInt($(this).val())) {
                        target.val($(this).text());
                        return false;
                    }
                });
            } else {
                target.val("");
            }
        },
        inDataOnFocus: function (element, dbName, id, name, defaultText, defaultOpts) {
            let $this = $(element);
            let loaded = $this.data("loaded");
            if (loaded === undefined) {
                $this.empty().append($('<option>', {value: -1, text: "Loading...."}));
                eventUtils.getAllCategory(dbName, function (data) {
                    $this.empty().data('loaded', 1);
                    let options = [];
                    if (defaultOpts === undefined) options.push($('<option>', {
                        value: -1,
                        text: defaultText === undefined ? "" : defaultText
                    }));
                    for (let i = 0; i < data.length; i++) {
                        options.push($('<option>', {value: data[i][id], text: data[i][name]}));
                    }
                    $this.append(options);
                });
            }
        },
        onFileChange: function ($selector) {
            $($selector).change(function () {
                let $this = $(this);
                let parent = $($this.parent());
                if ($this[0].files.length > 0) {
                    let name = $this[0].files[0].name;
                    parent.find('.file-name').val(name);
                    $this.data('fileAvailable', true);
                } else {
                    parent.find('.file-name').val('');
                    $this.data('fileAvailable', false);
                }
            });
        }
    }
})();
let validatorUtils = (function () {
    let setup = function () {
        method.email();
        method.date();
        method.datemax();
        method.dateless();
        method.yearmax();
        required.date();
    };
    let method = {
        email: function () {
            $.validator.methods.email = function (value, element) {
                return this.optional(element) || /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i.test(value);
            }
        },
        date: function (message) {
            $.validator.addMethod("dateformat", function (value) {
                if (value && "__/__/____" !== value) {
                    let dNewDate = utils.convertStringToDate(value);
                    return dNewDate !== null;
                }
                return true;
            }, message !== undefined ? message : "Vui lòng nhập đúng định dạng ngày tháng");
        },
        datemax: function (message) {
            $.validator.addMethod("datemax", function (value, element) {
                if (value && "__/__/____" !== value) {
                    let dNewDate = utils.convertStringToDate(value);
                    let currentDate = new Date();
                    return currentDate >= dNewDate;
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
                let new_end_date = utils.convertStringToDate(value);
                let new_start_date = utils.convertStringToDate(target);
                if (new_start_date !== null && new_start_date !== null)
                    return new_start_date >= new_end_date;
                return false;
            }, message !== undefined ? message : "Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
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
        select: function (message) {
            $.validator.addMethod("select-required", function (value) {
                return (value !== undefined && value !== null && value !== "" && value !== "-1");
            }, message);
        },
        selectRequiredDependOnOtherSelect: function (message) {
            $.validator.addMethod("select-target-required", function (value, element, params) {
                let target = $(params).val();
                if (target !== undefined && target !== null && target !== "" && target !== "-1") {
                    return (value !== undefined && value !== null && value !== "" && value !== "-1");
                }
                return true;
            }, message);
        }
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
        getEmail: function (message) {
            return method.email(message);
        },
        getDateRequired: function (message) {
            return required.date(message);
        },
        getSelectRequired: function (message) {
            return required.select(message);
        },
        getSelectTargetRequired: function (message) {
            return required.selectRequiredDependOnOtherSelect(message);
        }
    }
})();