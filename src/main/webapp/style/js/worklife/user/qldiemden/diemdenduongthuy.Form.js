formManager = (function () {
    let tableDSDiemDenDT;
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        utils.loadDatePicker();
        tableDSDiemDenDT = initTableDSDiemDenDT();
        selectedRow();
        utils.initHuyenSelect2().done(function () {
            $('#tableDSDiemDenDT tr.selected').click();
        });
        initDmTieuChi();
        $('#loai').on('change', initDmTieuChi);
        $('#btnSave').on('click', btnSave);
        $('#btnTim').on('click', btnTim);
        $('#checkTrenBien').on('click', function () {
           checkTrenBien();
        });
        $('#btnReset').on('click', btnReset);
        utils.initNotifyMessageBox();
    };
    let initTableDSDiemDenDT = function() {
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
            {"targets": 1, class:"text-center", width: "20%", "mData": "tenDiem", "orderable": false},
            {"targets": 2, class:"text-center", width: "20%", "mData": "lyTrinh", "orderable": false},
            {"targets": 3, class:"text-center", width: "15%", "mData": "trenSong", "orderable": false,
                render: function (data, type, row, meta) {
                    let trenSong = '';
                    if (row.trenSong === 1)
                        trenSong = "Trên sông";
                    else
                        trenSong = "Trên biển";
                    return trenSong;
                }
            },
            {"targets": 4, class:"text-center", width: "15%", "mData": "loai", "orderable": false,
                render: function (data, type, row, meta) {
                    let loai = '';
                    if (row.loai === 1)
                        loai = "Điểm đen";
                    else
                        loai = "Điểm tiềm ẩn tai nạn giao thông";
                    return loai;
                }
            },
            {"targets": 5, class:"text-center", width: "20%", "mData": "tenSong", "orderable": false},
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
                    tableDSDiemDenDT.$("tr").each(function() {
                        let data = tableDSDiemDenDT.row($(this)).data();
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
        return datatableFactory.initAjaxDataSourceDataTable("tableDSDiemDenDT", colDefs, url + "/worklife/user/diemdenduongthuy/getlistdiemden.do", function (settings) {
            let idHuyen = $('#huyenTP').val();
            let loaiDiem = $('#loaiDiem').val();
            let thuocSB = $('#thuocSB').val();
            let obj = {
                "optional": {
                    "loaiDiem": !loaiDiem ? -1 : loaiDiem,
                    "idHuyen": !idHuyen ? -1 : idHuyen,
                    "thuocSB": !thuocSB ? -1 : thuocSB
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };
    let initDmTieuChi = function (phanloai, idtieuchi) {
        /*if (phanloai === null || phanloai === undefined)*/
        phanloai = $('#loai').val();
        $.ajax({
            url: url + "/worklife/user/diemdenduongthuy/getlisttieuchi.do",
            type: "POST",
            data: {phanloai: phanloai},
            success: function (data) {
                let options = '<option value="-1"></option>';
                for(dat of data){
                    let selected ='';
                    if(dat.id === idtieuchi)
                        selected = 'selected ';
                    options+='<option {2} value="{0}">{1}</option>'.f(dat.id,dat.ten,selected);
                }
                $('#tieuChi_DiemDenGTThuy').html(options);
            }
        })
    };
    let checkTrenBien = function () {
        if ($('#checkTrenBien').is(':checked')){
            $('#tenSong').attr('disabled', true);
            $('#rongSong').attr('disabled', true);
            $('#chieuRong').attr('disabled', true);
            $('#chieuSau').attr('disabled', true);
            $('#tinhKhong').attr('disabled', true);
            $('#tinhTrang_TruChongVa').attr('disabled', true);
            $('#ketCau_TruChongVa').attr('disabled', true);
            $('#donVi_BaoTri').attr('disabled', true);
            $('#tinhHinh_TNGT').attr('disabled', true);
            $('#trenSong').val(2);
        }
        else {
            $('#tenSong').attr('disabled', false);
            $('#rongSong').attr('disabled', false);
            $('#chieuRong').attr('disabled', false);
            $('#chieuSau').attr('disabled', false);
            $('#tinhKhong').attr('disabled', false);
            $('#tinhTrang_TruChongVa').attr('disabled', false);
            $('#ketCau_TruChongVa').attr('disabled', false);
            $('#donVi_BaoTri').attr('disabled', false);
            $('#tinhHinh_TNGT').attr('disabled', false);
            $('#trenSong').val(1);
        }
    };
    let btnSave = function () {
        let form = $('#formDiemDenDT');
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
            form.attr("action",url + "/worklife/user/diemdenduongthuy/saveForm.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
            form.attr("modelAttribute",modelAttribute);
            form.attr("enctype","multipart/form-data");
            form.submit();
        }
    };
    let selectedRow = function () {
        $('#tableDSDiemDenDT tbody').on('click', 'tr', function () {
            let data = tableDSDiemDenDT.row(this).data();
            $('#tableDSDiemDenDT').DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            if (data !== null){
                $.each(data, function (key, value) {
                    if (value === "0.0" || value === "0")
                        value = '';
                    $("#" + key).val(value);
                });
                if (data.trenSong === 2){
                    $('#checkTrenBien').iCheck('check');
                    checkTrenBien();
                }
                else {
                    $('#checkTrenBien').iCheck('uncheck');
                    checkTrenBien();
                }
                initDmTieuChi(data.loai, data.tieuChi_DiemDenGTThuy);
                if (data.listIdHuyen !== null && data.listIdHuyen !== ''){
                    console.log('Ready!!!!??????!');
                    $("#nhieuHuyen").val(data.listIdHuyen.split(',')).trigger("change");
                }
            }
        })
    };
    let btnTim = function () {
        tableDSDiemDenDT.ajax.reload();
    };
    let btnReset = function () {
        $('#tableDSDiemDenDT tr.selected').removeClass('selected');
        $('#formDiemDenDT').find('input[type="text"],textarea').val('');
        $('#checkTrenBien').iCheck('uncheck');
        checkTrenBien();
        $('#loai').val(1);
        initDmTieuChi();
        $('#idDiemDen').val(-1);
        $('#nhieuHuyen').val(null).trigger('change');
        $('.select2-search__field').attr('placeholder','Vui lòng chọn huyện/TP/TX');
        $('.select2-search__field').css('width','441px');
    };
    return{
        init: function () {
            return setup();
        }
    }
})();