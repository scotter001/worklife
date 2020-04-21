formManager = (function () {
    let tableDSTuyenDuong;
    let listLoaiDuong = [];
     let listTDThuocTinh= [];
    $(document).ready(function () {
        formManager.init();
    });
    let setup = function () {
        initLoaiDuong();
        tableDSTuyenDuong = inittableDSTuyenDuong();
        $('#btnTim').on('click', btnTim);
        $('#tableDSTuyenDuong tbody').on('click', 'tr',selected );
        $('#btnDelete').on('click', btnDelete);
        initTuyenDuongThuocTinh();
        $('#btnSave').on('click', btnSave);
        $('#btnThemMoi').on('click', btnThemMoi);
        utils.initNotifyMessageBox();
    };
    let FormatsNBTC = function (abc) {
        if (abc ===  null){
            abc = "";
            return abc;
        }
        return abc;
    };
    let initLoaiDuong = function () {
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/dmtdtheohat/getloaiduong.do",
            type: "POST",
            success: function (data) {
                if (data !== null) {
                    let options = '<option value="-1"></option>';
                    for (let i = 0; i < data.length; i++){
                        options += '<option value="'+data[i].idLoaiDuong+'">'+data[i].ten+'</option>';
                        listLoaiDuong = data;

                    }
                    $('#loaiDuong').html(options);


                }
            }
        })
    };
    /*let inittableDSTuyenDuong = function() {
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
            {
                "targets": 1, class: "text-center", width: "10%", "orderable": false,
                render: function (data, type, row, meta) {
                    return createSel(1, 1);
               }
            },
            {"targets": 2, class: "text-left", width: "25%",  "orderable": false,render: function (data, type, row, meta) {
                return '<input style="width: 100%" type="text" value="'+row.tenDuong+'">';
            }},
            {"targets": 3, class: "text-right", width: "15%",  "orderable": false, render: function (data, type, row, meta) {
                return '<input style="width: 100%; " type="text" value="'+row.chieuDai+'">';
            }},
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
        return datatableFactory.initAjaxDataSourceDataTable("tableDSTuyenDuong", colDefs, url + "/worklife/user/quanlytuyenduong/dmtdthuoctinh/gettuyenduong.do", function (settings) {
            let idLoaiDuong = $('#loaiDuong').val();
            let obj = {
                "optional": {
                    "idLoaiDuong": !idLoaiDuong ? -1 : idLoaiDuong,
                    "tenDuong": $('#tenDuong').val(),
                    "chieuDai": $('#chieuDai').val()
                }
            };
            Object.assign(settings, obj);
            return JSON.stringify(settings);
        }, opts, 1, 1);
    };*/
    let inittableDSTuyenDuong = function () {
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "className": "text-center",
                "searchable": false,
                "orderable": false,

            },
            {"targets": 1, class: "text-center border-0", width: "10%"},
            {"targets": 2, class: "text-center border-0", width: "25%"},
            {"targets": 3, class: "text-center border-0", width: "15%"},
        ];
        return datatableFactory.initDataSourceDataTableNonLoad('tableDSTuyenDuong', colDefs, undefined, 1);
    };
    let initTuyenDuongThuocTinh = function () {
        let idLoaiDuong = $('#loaiDuong').val();
        $.ajax({
            url: url + "/worklife/user/quanlytuyenduong/dmtdthuoctinh/gettuyenduong.do",
            type: "POST",
            data: {idLoaiDuong: idLoaiDuong===null?'-1':idLoaiDuong, tenDuong: $('#tenDuong').val() },
            success: function (data) {
                if (data !== null) {
                    tableDSTuyenDuong.clear().draw();
                    for (let i = 0; i < data.length; i++) {
                        let rowHtml = [
                            i+1 + '<input type="hidden" name="tuyenDuongVOs[' + i + '].idTuyenDuong" value="'+data[i].idTuyenDuong+'">',
                            //$('idLoaiDuong').val(data[i].idLoaiDuong),
                           createSel('tuyenDuongVOs[' + i + '].idLoaiDuong', data[i].idLoaiDuong),
                            '<input type="text" class="form-control border-0 "  name="tuyenDuongVOs[' + i + '].tenDuong"  value="' + data[i].tenDuong + '" style="width: 100%"/>',
                            '<input type="text" class="form-control text-right    " name="tuyenDuongVOs[' + i + '].chieuDai"   value="' + FormatsNBTC(data[i].chieuDai) + '" style="width: 100%"/>'
                        ];
                        tableDSTuyenDuong.row.add(rowHtml).draw();
                        tableDSTuyenDuong.page.len(30).draw();
                        //tableDSTuyenDuong.draw(false);
                        //tableDSTuyenDuong.page('first').draw('page');
                    }
                    listTDThuocTinh = data;
                }
                utils.initDecimal(".decimal", true, 0);
                utils.initIChecks('i-checks');
            }
        })
    };
    let btnThemMoi = function () {
            let index = tableDSTuyenDuong.rows().count();
            let rowHtml = [
                index+1 + '<input type="hidden" name="tuyenDuongVOs[' + index + '].idTuyenDuong" value="-1">',
                createSel('tuyenDuongVOs[' + index + '].idLoaiDuong'),
                '<input type="text" class="form-control border-0 "  name="tuyenDuongVOs[' + index + '].tenDuong"   style="width: 100%"/>',
                '<input type="text" class="form-control text-right    " name="tuyenDuongVOs[' + index + '].chieuDai"   style="width: 100%"/>'
            ];
        tableDSTuyenDuong.row.add(rowHtml).draw();
            datatableFactory.indexing('tableDSTuyenDuong', index);
            utils.initDecimal(".decimal", true, 0);
            utils.initIChecks('i-checks');
        };
    let createSel = function (selName, idLoaiDuong) {
        let selHtml = '<select class="form-control text-center" name="'+selName+'" style="width:100%;" >';
        selHtml += '<osption value="-1"></osption>';
        listLoaiDuong.forEach(function (item, index) {
            selHtml += '<option ' + (idLoaiDuong == item.idLoaiDuong ? 'selected' : '') + ' value="' + item.idLoaiDuong + '">' + item.ten + '</option>';
        });
        selHtml += '</select>';
        return selHtml;
    };

    let btnTim = function () {
        initTuyenDuongThuocTinh();
    };
    let selected = function () {
        let idTuyenDuong= tableDSTuyenDuong.row(this).data().idTuyenDuong;
        $('#tableDSTuyenDuong').DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        //let idTuyenDuong = $('#tableDSTuyenDuong tbody tr.selected input[type="hidden"]').val();
   };
    let btnSave = function () {
        if (tableDSTuyenDuong.data().count() !== 0) {
            tableDSTuyenDuong.page.len(tableDSTuyenDuong.data().count()).draw();
        }
        let method = "POST";
        let modelAttribute = "tuyenThuocTinhVO";
        $("#formDmTuyenDuongThuocTinh").attr("method",method);
        $("#formDmTuyenDuongThuocTinh").attr("action",url + "/worklife/user/quanlytuyenduong/dmtdtthuoctinh/saveForm.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        $("#formDmTuyenDuongThuocTinh").attr("modelAttribute",modelAttribute);
        $("#formDmTuyenDuongThuocTinh").attr("enctype","multipart/form-data");
        $("#formDmTuyenDuongThuocTinh").submit();
    };
    /*let btnDelete = function (idTuyenDuong) {
        let id = $('#tableDSTuyenDuong tbody tr.selected input[type="hidden"]').val();
        if (id === undefined) {
            swal({
                title: "Thông báo",
                text: "Vui lòng chọn tuyến đường để xóa",
                type: "warning",
                confirmButtonText: "Đồng ý"
            });
        }
        else {
            swal({
                    title: "Thông báo",
                    text: "Bạn chắc chắn muốn xóa ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Đồng ý",
                    cancelButtonText: "Hủy",
                    closeOnConfirm: true,
                    closeOnCancel: true
                }),
                $.ajax({
                    url: url + "/worklife/user/quanlytuyenduong/delTuyebDuong.do",
                    type: "POST",
                    data: {idTuyenDuong: id},
                    success: function (data) {
                        if (data === true) {
                            swal({
                                title: "Thông báo",
                                text: "Xóa dữ liệu thành công",
                                type: "success",
                                confirmButtonText: "Đồng ý"
                            })
                            initTuyenDuongThuocTinh();
                        }
                        else {
                            swal({
                                title: "Thông báo",
                                text: "Xóa dữ liệu thất bại",
                                type: "warning",
                                confirmButtonText: "Đồng ý"
                            });
                    }
                }
        })
    }};
*/
    let btnDelete = function(){
        let id = $('#tableDSTuyenDuong tbody tr.selected input[type="hidden"]').val();
        if (id === undefined) {
            messageHandler.selectRow();
        } else {
            swal({
                title: "Thông báo",
                text: "Bạn chắc chắn muốn xóa ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Đồng ý",
                cancelButtonText: "Hủy bỏ",
                closeOnConfirm: false,
                closeOnCancel: true
            }, function(isConfirm) {
                if (isConfirm) {
                    $.ajax({
                        url: url + "/worklife/user/quanlytuyenduong/delTuyebDuong.do",
                        type: "POST",
                        data: {idTuyenDuong: id},
                        success: function (data) {
                            if (data === true) {
                                swal({
                                    title: "Thông báo",
                                    text: "Xóa dữ liệu thành công",
                                    type: "success",
                                    confirmButtonText: "Đồng ý"
                                })
                                initTuyenDuongThuocTinh();
                            }
                            else {
                                swal({
                                    title: "Thông báo",
                                    text: "Xóa dữ liệu thất bại",
                                    type: "warning",
                                    confirmButtonText: "Đồng ý"
                                });
                            }
                        }
                    })
                }
            });

        }
    };
    return{
        init: function () {
            return setup();
            }
        }
    })();