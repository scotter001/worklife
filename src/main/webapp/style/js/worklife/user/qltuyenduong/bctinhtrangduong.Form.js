formManager = (function () {
    let tableDSBaoCaoTTD;
    /*let listTTDuong = [];*/
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        let ngayHienTai = new Date();
        initNam();
        setSelectValByDate(ngayHienTai);
        utils.initHatQuanLy();
        /*initTinhTrangDuong();*/
        tableDSBaoCaoTTD = initTableDSBaoCaoTTD();
        /*tableDSBaoCaoTTD.ajax.reload();*/
        btnTim();
        $('#quy, #nam, #hatQuanLy').on('change', btnTim);
        $('#btnSave').on('click', btnSave);
        $('#btnReportExcel').on('click', btnReportExcel);
    };
    let initNam = function () {
        let date = new Date();
        let year = date.getFullYear();
        let options = '';
        for (let i = year; i >= 2019; i--){
            options += '<option value="'+i+'">'+i+'</option>'
        }
        $('#nam').html(options);
    };
    let setSelectValByDate = function(ngay){
        let momentTmp = moment(ngay, "dd/MM/yyyy");
        moment().quarter();
        let quyTmp = momentTmp.quarter();
        $('#quy').val(quyTmp);
    };
    let initTableDSBaoCaoTTD = function () {
        let colDefs = [
            {
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false},
            {"targets": 1, class: "text-center","orderable": false},
            {"targets": 2, class: "text-center","orderable": false},
            {"targets": 3, class: "text-center","orderable": false},
            {"targets": 4, class: "text-center","orderable": false},
            {"targets": 5, class: "text-center","orderable": false},
            {"targets": 6, class: "text-center","orderable": false},
            {"targets": 7, class: "text-center","orderable": false},
            {"targets": 8, class: "text-center","orderable": false},
            {"targets": 9, class: "text-center","orderable": false},
            {"targets": 10, class: "text-center","orderable": false},
            {"targets": 11, class: "text-center","orderable": false},
            {"targets": 12, class: "text-center","orderable": false},
            {"targets": 13, class: "text-center","orderable": false},
            {"targets": 14, class: "text-center","orderable": false},
            {"targets": 15, class: "text-center","orderable": false}
        ];
        let opts = {
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
            },
            "scrollX": true,
            'pageLength': 10
        };
        return datatableFactory.initDataSourceDataTableNonLoad('tableDSBaoCaoTTD', colDefs, opts, 1);
    };
    /*let initTinhTrangDuong = function() {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/ttchitietduong/getlistttduong.do",
            type: "POST",
            async: false,
            success: function (data) {
                if (data !== null){
                    listTTDuong = data;
                }
            }
        })
    };*/
    let btnTim = function () {
        let quy = $('#quy').val();
        let nam = $('#nam').val();
        let idGroup = $('#group_Id').val();if (idGroup === '1')
            idGroup = $('#hatQuanLy').val();
        $.ajax({
            url: url + '/worklife/user/baocaotinhtrangduong/getlisttinhtrangduong.do',
            type: 'post',
            data: {idGroup: !idGroup?2:idGroup, quy: quy, nam: nam},
            success: function (data) {
                if (data != null && data.length > 0){
                    tableDSBaoCaoTTD.clear().draw();
                    for (let i = 0; i < data.length; i++){
                        let diaHinh = '';
                        if (data[i].diaHinh === 1)
                            diaHinh = 'Đồng bằng và đồi';
                        else
                            diaHinh = 'Vùng núi';
                        let rowHtml = [
                            i + 1
                            + '<input type="hidden" name="tinhTrangDuongVOS['+i+'].id" value="'+data[i].id+'">'
                            + '<input type="hidden" name="tinhTrangDuongVOS['+i+'].idLyTrinh" value="'+data[i].idLyTrinh+'">'
                            + '<input type="hidden" name="tinhTrangDuongVOS['+i+'].quy" value="'+data[i].quy+'">'
                            + '<input type="hidden" name="tinhTrangDuongVOS['+i+'].nam" value="'+data[i].nam+'">',
                            data[i].tenDuong,
                            data[i].diemDau_Tu,
                            data[i].diemDau_Den,
                            data[i].diemCuoi_Tu,
                            data[i].diemCuoi_Den,
                            data[i].diaDanh_DiemDau,
                            data[i].diaDanh_DiemCuoi,
                            createSelDGMD('tinhTrangDuongVOS['+i+'].tinhTrang',data[i].tinhTrang),
                            '<textarea class="form-control" rows="3" name="tinhTrangDuongVOS['+i+'].ghiChu" style="width: 100%">'+data[i].ghiChu+'</textarea>',
                            data[i].chieuDai,
                            data[i].rongNen,
                            data[i].rongMat,
                            data[i].tenKetCau,
                            diaHinh,
                            data[i].tenCapQL
                        ];
                        tableDSBaoCaoTTD.row.add(rowHtml).draw();
                        tableDSBaoCaoTTD.draw(false);
                        tableDSBaoCaoTTD.page('first').draw('page');
                    }
                    tableDSBaoCaoTTD.page.len(10).draw();
                }
            }
        });
        $.ajax({
            url: url + "/worklife/user/baocaotinhtrangduong/getngaybaocao.do",
            type: "POST",
            data: {quy: quy, nam: nam, idGroup: !idGroup?2:idGroup},
            success: function (data) {
                if (data !== null && data !== ''){
                    if (data.ngayBaoCao !== null && data.ngayBaoCao !== ""){
                        $('#htbaocao').iCheck('check');
                        $('#ngayBaoCao').val(data.ngayBaoCao);
                    }
                    else {
                        $('#htbaocao').iCheck('uncheck');
                        $('#ngayBaoCao').val('');
                    }
                }
                else {
                    $('#htbaocao').iCheck('uncheck');
                    $('#ngayBaoCao').val('');
                }
            }
        })
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
        let quy = $('#quy').val();
        let nam = $('#nam').val();
        if (quy === '-1' || nam === '-1'){
            swal({
                title: "Thông báo",
                text: "Vui lòng chọn quý và năm để lưu",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        }
        else {
            commitForm();
        }
    };
    let commitForm = function () {
        if (tableDSBaoCaoTTD.data().count() !== 0) {
            tableDSBaoCaoTTD.page.len(tableDSBaoCaoTTD.data().count()).draw();
        }
        let form = $('#formBCTTDuong');
        let fd = new FormData($('#formBCTTDuong')[0]);
        let date = new Date();
        let today = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
        if($('#htbaocao').is(':checked')){
            for (let i = 0; i < $('#tableDSBaoCaoTTD tbody tr').length; i++){
                fd.set('tinhTrangDuongVOS['+i+'].ngayBC', today);
            }
            fd.set('ngayBaoCao', today);
        }
        if (form.valid()){
            $.ajax({
                url: url + "/worklife/user/baocaotinhtrangduong/saveForm.do",
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
                        if (data.ngayBaoCao !== null)
                            $('#ngayBaoCao').val(data.ngayBaoCao);
                        else {
                            $('#ngayBaoCao').val('');
                        }
                        if (tableDSBaoCaoTTD.data().count() !== 0) {
                            tableDSBaoCaoTTD.page.len(tableDSBaoCaoTTD.data().count()).draw();
                        }
                        let tinhTrangDuongVOS = data.tinhTrangDuongVOS;
                        if (tinhTrangDuongVOS !== null && tinhTrangDuongVOS.length > 0){
                            for (let i = 0; i < tinhTrangDuongVOS.length; i++){
                                $('input[name="tinhTrangDuongVOS['+i+'].id"]').val(tinhTrangDuongVOS[i].id);
                                $('input[name="tinhTrangDuongVOS['+i+'].quy"]').val(tinhTrangDuongVOS[i].quy);
                                $('input[name="tinhTrangDuongVOS['+i+'].nam"]').val(tinhTrangDuongVOS[i].nam);
                                createSelDGMD('tinhTrangDuongVOS['+i+'].tinhTrang',tinhTrangDuongVOS[i].tinhTrang);
                                $('textarea[name="tinhTrangDuongVOS['+i+'].ghiChu"]').val(tinhTrangDuongVOS[i].ghiChu);
                            }
                        }
                        tableDSBaoCaoTTD.page.len(10).draw();
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
    let btnReportExcel = function () {
        let quy = parseInt($('#quy').val());
        let nam = parseInt($('#nam').val());
        let idGroup = parseInt($('#hatQuanLy').val());
        if (quy === -1 || nam === -1){
            swal({
                title: "Thông báo",
                text: "Vui lòng chọn quý và năm để xuất excel",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        }
        else {
            window.location = url + "/worklife/user/baocaotinhtrangduong/report.do?quy=" + quy + "&nam=" + nam + "&idGroup=" + idGroup;
        }
    };
    return{
        init: function () {
            return setup();
        }
    }
})();