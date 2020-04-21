formManager = (function () {
    let tblSearchQL, tblList;
    let form = $('#formSearch');
    let rows_selected = [];
    let rowsObject_selected =[];
    let selDistrict =$('#selDistrict');
    let selDistricts =$('#txtHuyen');
    const checkRole = parseInt($('#checkRole').val());
    // let selPoint = $('#selCapDiem');
    //data category variable
    // let classOfEatingServiceList = null;
    // let productTypeList = null;

    let setup = function () {
        if(checkRole == 2){
        	inDisabledForm();
        }
        $.when(
            eventUtils.getAllCategory("dm_duong")
        ).done(function (data1) {
            eventUtils.selOption("txtDuong", "id", "name", data1);
            utils.inEditableSelect('txtDuong', 'idDuong');

        });
        eventUtils.inSelDistrict(selDistrict);
        eventUtils.inSelDistrict(selDistricts);
        tblSearchQL = inSetupTblSearch();
        tblSearchQL.draw();
        tblList = initTableList();
        $("#btnThemtb").on('click',addbtn);
        $("#btnXoaTb").on('click',deletebtn);
        eventUtils.getAllCategory('dmcapdiembc',function(data){
            eventUtils.selOption('selCapDiem','id','name',data);
        });
        eventUtils.getAllCategory('dmcapdiembc',function(data){
            eventUtils.selOption('txtCapDiem','id','name',data);
        });
        eventUtils.getAllCategory('dm_xa',function(data){
            eventUtils.selOption('txtXa','id','name',data);
        });
        // eventUtils.getAllCategory('dm_duong',function(data){
        //     eventUtils.selOption('txtDuong','id','name',data);
        // });
        eventUtils.getAllCategory('dmloaibuuchinh',function(data){
            eventUtils.selOption('txtLoaiBuuChinh','id','name',data);
        });
        $('#txtHuyen').on('change', onChangeDistrict);
        $('#btnSearch').on('click',function () {
            tblSearchQL.ajax.reload();
        });
        $('#btnThemMoi').on('click',function () {
           let idDiemBC = -1;
            inFillInfo(idDiemBC);
        });
        $('#btnLuu').on('click',submitHandel);
        $('#tableTimKiem').find('tbody').on('click','tr',fillOnForm);
        utils.initIChecks('i-checks');
        utils.initNotifyMessageBox();
        utils.initIntegerNumberRule('.onlyNumber');
        utils.initDecimal('.decimal-no-seperate',false,6);
        validateForm();
    };
    let onChangeDistrict = function () {
        let value = $(this).val();
        let target = $('#txtXa');
        if (value <= 0) {
            target.prop("disabled", true);
            target.html("");
            target.append($("<option></option>").attr('value', -1).text('Chọn Phường/Xã'));
            target.val(-1);
            return;
        }
        eventUtils.eventDistrictOnChange(value, target);
    };
    let fillOnForm  =function () {
        tblSearchQL.$('tr').each(function(){
            $(this).removeClass("selected");
        });
        $(this).addClass("selected");
        let infoManagePoint =  $('#tableTimKiem').DataTable().row($(this)).data();
        let idDiemBC = infoManagePoint.idDiemBC;
        $('#idDiemBC').val(idDiemBC);
        $.ajax({
            type : "POST",
            data : {"idDiemBC" : idDiemBC},
            url : url + "/worklife/user/quanlydiemdichvubuuchinh/getinfomationform/get.do",
            success: function (data) {
                inFillInfo(data);
                fillDataToClick(data);
            }
        });

    };
    let inFillInfo = function (infoManagePoint) {
        $('#idDoanhNghiep').val(infoManagePoint.idDoanhNghiep);
        $('#idDiemBC').val(infoManagePoint.idDiemBC);
        $('#txtMaDiem').val(infoManagePoint.maDiem);
        $('#txtTenDiem').val(infoManagePoint.tenDiem);
        $('#txtCapDiem').val(infoManagePoint.idCapDiem);
        $('#txtToaDoX').val(infoManagePoint.toaDoX);
        $('#txtToaDoY').val(infoManagePoint.toaDoY);
        $('#comment').val(infoManagePoint.moTa_ViTri);
        $('#txtDiaChi').val(infoManagePoint.diaChiSo);
        $('#txtHuyen').val(infoManagePoint.idHuyen);
        $('#txtXa').val(infoManagePoint.idXa);
        $('#txtNguoiPhuTrach').val(infoManagePoint.nguoiPhuCap);
        $('#txtDienThoai').val(infoManagePoint.soDienThoai);
        $('#txtSoNhanVienNam').val(infoManagePoint.soNhanVienNam);
        $('#txtSoNhanVienNu').val(infoManagePoint.soNhanVienNu);
        $('#txtNamXayDung').val(infoManagePoint.namXayDung);
        $('#txtDienTichQuanLy').val(infoManagePoint.dienTichQuanLy);
        $('#txtDienTichXayDung').val(infoManagePoint.dienTichXayDung);
        $('#txtSoMayTinh').val(infoManagePoint.soMayTinh);
        $('#txtSoMayIn').val(infoManagePoint.soMayIn);
        $('#txtLoaiBuuChinh').val(infoManagePoint.idLoaiBuuChinh);
        eventUtils.setStreet(infoManagePoint.idDuong,$('#txtDuong'));
        $('#idDuong').val(infoManagePoint.idDuong);
        $('#idParent').val(infoManagePoint.idParent);
        $('#txtCapDiem').val(infoManagePoint.idCapDiem);
        if(infoManagePoint.ftth == 1){
            $('#ftth1').iCheck('check');
        }else {
            $('#ftth2').iCheck('check');

        }
        if(infoManagePoint.adsl == 1){
            $('#adsl1').iCheck('check');
        }else {
            $('#adsl2').iCheck('check');
        }
        $('.decimal-no-seperate').trigger('blur');
        tblList.ajax.reload();

    };
    let initTableList = function () {
        let colDefs = [
            {
                "sWidth" : "5%",
                "targets" : 0,
                class : "text-center",
                "mData" : "idDichVu_BuuChinh",
                "sortable" : false,
                render : function(data, type, row, meta) {
                    return meta.row + 1;
                }

            },{
                "sWidth" : "5%",
                "targets" : 1,
                class : "text-center",
                "sortable" : false,
                render : function(data, type, row, meta) {
                    let index = meta.row;
                    let idDichVu_BuuChinh = row.idDichVu_BuuChinh;
                    idDichVu_BuuChinh = idDichVu_BuuChinh == null ? "-1" : idDichVu_BuuChinh;
                    let col = '<input type="checkbox" class="i-check-postal isCheckedPostal"/>';
                    col += '<input type="hidden" value="'+idDichVu_BuuChinh+'"  name="postal['+index+'].idDichVu_BuuChinh"/>';
                    return col;
                }

            }, {
                "sWidth" : "45%",
                "targets" : 2,
                "mData" : "tenDichVu",
                "sortable" : false,
                render : function(data, type, row, meta) {
                    let index = meta.row;
                    let tenDichVu = row.tenDichVu;
                    tenDichVu = tenDichVu == null ? "" : tenDichVu;
                    let col = '<input type="text" class="form-control" name="postal['+index+'].tenDichVu" value="'+tenDichVu+'"/>';
                    return col;
                }
            }, {
                "sWidth" : "45%",
                "targets" : 3,
                "mData" : "ghiChu",
                "sortable" : false,
                render : function(data, type, row, meta) {
                    let index = meta.row;
                    let ghiChu = row.ghiChu;
                    ghiChu = ghiChu == null ? "" : ghiChu;
                    let col = '<input type="text" class="form-control" name="postal['+index+'].ghiChu" value="'+ghiChu+'"/>';
                    return col;
                }
            },
        ]; return datatableFactory.initDataSourceDataTable('tblDanhSachDV', 									// target
            // element
            colDefs, 												// column
            // define
            rootPath+"/worklife/user/quanlydiemdichvubuuchinh/postal/list.do",	// url
            function (settings) {
                let obj = {
                    idDiemBC : $("#idDiemBC").val(),
                };
                return Object.assign(obj, settings);
            },														// data
            undefined,												// options
            {
                "fnDrawCallback" : function(oSettings) {
                    if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                        $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                        $('#btnControlThemXoaGiayToHoSo').attr('style', 'margin-top:-32px;');
                    } else {
                        $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                        $('#btnControlThemXoaGiayToHoSo').attr('style', 'margin-top:-68px;');
                    }
                    $("#tblDanhSachDV thead").find('th:nth-child(1),th:nth-child(2)').removeClass('sorting_asc').removeClass('sorting');
                    utils.initIChecks("i-check-postal");
                    datatableFactory.checkBoxOnSelect('checkAllPostal','isCheckedPostal');
                },
                'pageLength': 2,
            }
        );
    };
    let addbtn = function(){
        var index = tblList.rows().count();
        var rowHTML = {
            idDichVu_BuuChinh : -1,
            tenDichVu : '',
            ghiChu : ''
        };
        tblList.row.add(rowHTML);
        tblList.draw(false);
        tblList.page('last').draw('page');
    };
    let deletebtn = function(){
        var isRowCheckedList = $('#tblDanhSachDV tbody tr td:nth-child(2)').find("input:checked");
        if (isRowCheckedList.length == 0) {
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
                    var idArray = [];
                    $.each(isRowCheckedList, function(index, value) {
                        var id = tblList.row($(this).closest("tr")).data().idNhaMangSuDung;
                        if (id > 0) {
                            idArray.push(parseInt(id));
                        }
                        tblList.row($(this).closest("tr")).remove().draw();
                    });
                    if (idArray.length > 0) {
                        var urlDelete = url + '/worklife/user/quanlydiemdichvubuuchinh/document/delete.do';
                        $.ajax({
                            type : "POST",
                            url : urlDelete,
                            dataType : "json",
                            contentType : "application/json",
                            url : urlDelete,
                            data : JSON.stringify(idArray),
                            success : function(isSuccessfully) {

                            }
                        });

                    }
                    $("#checkAllNetworkCarrier").iCheck('uncheck');
                    var rows = tblList.$('tr');
                    var stt = 1;
                    $(rows).each(function() {
                        var row = $(this);
                        var tdSTT = $(row).find("td:nth-child(1)");
                        $(tdSTT).text(stt);
                        stt++;
                    });
                    datatableFactory.updateRowPosition(tblList, "postal", 1);
                    messageHandler.deleteSuccessful();
                }
            });

        }
    };
    let submitHandel = function () {
        var method = "POST";
        var modelAttribute = "managePointServicePostalVO";
        $("#formQuanLyDiemBC").attr("method",method);
        $("#formQuanLyDiemBC").attr("action",url + "/worklife/user/quanlydiemdichvubuuchinh/save.do?"+ $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        $("#formQuanLyDiemBC").attr("modelAttribute",modelAttribute);
        $("#formQuanLyDiemBC").attr("enctype","multipart/form-data");
        $("#formQuanLyDiemBC").submit();
    };
    let inSetupTblSearch = function(){
        let colDefs = [
            {
                "sWidth": "5%",
                "targets": 0,
                "searchable": false,
                "orderable": false,
                "className": "text-center",
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
            {"targets": 1, "className": "text-left", "mData": "tenDiem", "sWidth": "20%","searchable": false, "orderable": false},
            {"targets": 2, "className": "text-left", "mData": "ten", "sWidth": "10%", "searchable": false, "orderable": false},
            {"targets": 3, "className": "text-left", "mData": "tenHuyen", "sWidth": "15%", "searchable": false, "orderable": false},
            {"targets": 4, "className": "text-left", "mData": "diaChi", "sWidth": "20%", "searchable": false, "orderable": false},
            {"targets": 5, "className": "text-left", "mData": "tenDoanhNghiep", "sWidth": "35%", "searchable": false, "orderable": false},
        ];
        
        let opts = {
            'initComplete' : function() {
                let row = null;
                let idDiemBC = $('#idDiemBC').val();
                if(idDiemBC != 0) {
                    tblSearchQL.$('tr').each(function() {
                        let obj = tblSearchQL.row($(this)).data();
                        if(obj.idDiemBC == idDiemBC) {
                            row = $(this);
                        }
                    });
                    if($(row) != null) {
                        $(row).trigger('click');
                    }
                }
            },
            "deferLoading" : null,
            "fnDrawCallback": function (oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                } else {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                }
                $("#tableTimKiem thead tr th:nth-child(3)").removeClass("sorting_asc");
            }
        };
        return datatableFactory.initAjaxDataSourceDataTable('tableTimKiem', colDefs, rootPath + "/worklife/user/quanlydiemdichvubuuchinh/getinfodatatable/get.do",
            function (settings) {
                let obj = {
                    "optional" : {
                        "district" : $('#selDistrict').val(),
                        "point" : $('#selCapDiem').val(),
                        "enterprise" :$('#selDoanhNghiep').val(),
                    }
                };
                Object.assign(settings,obj);
                return JSON.stringify(settings);
            },opts ,1,1);
    };
    let fillDataToClick = function(obj) {
        if(obj != null) {
            $.each(obj,function(key,val){
                $("#"+key).val(val);
            });
            $('#maDiemCompare').val(obj.maDiem);
            $('.decinalNumber').trigger('blur');

        }
    };
    let validateForm = function() {
        jQuery.validator.addMethod("selectCheck", function(value,element){
            var checkValue = value;
            if(utils.isEmpty(checkValue) || checkValue == -1){
                return false;
            }else{
                return true;
            }
        }, "");
        jQuery.validator.addMethod("uniqueMaDonVi", function(value,element){
            var maDiem = $('#txtMaDiem').val().trim();
            var maDiemCompare = $('#maDiemCompare').val().trim();
            var flag = false;
            if(maDiem == maDiemCompare){
                flag = true;
            }else{
                if(typeof maDiem != undefined && null != maDiem && "" != maDiem){
                    $.ajax({
                        url: url+ '/worklife/user/quanlydiemdichvubuuchinh/checkexits.do',
                        async: false,
                        type: 'POST',
                        data: {'maDiem' : maDiem},
                        success: function(isExisted){
                            flag = !isExisted;
                        }
                    });
                }
            }
            return flag;
        }, "");
        $("#formQuanLyDiemBC").validate({
            rules : {
                'maDiem' : {
                    required : true,
                    uniqueMaDonVi : true ,
                },
                'tenDiem' : {
                    required : true ,
                },
                'idHuyen' : {
                    selectCheck : true ,
                },
                'idXa' : {
                    selectCheck : true ,
                },
            },
            messages : {
                'maDiem' : {
                    required : 'Vui lòng nhập mã điểm',
                    uniqueMaDonVi : 'Mã điểm đã tồn tại' ,
                },
                'tenDiem' : {
                    required : 'Vui lòng nhập tên điểm' ,
                },
                'idHuyen' : {
                    selectCheck : 'Vui lòng chọn Huyện' ,
                },
                'idXa' : {
                    selectCheck : 'Vui lòng chọn Xã' ,
                },
            }
        });
    };
    let inDisabledForm = function () {
	    $('#btnLuu').hide();
		$('#btnThemMoi').hide();
		$('#btnThemtb').attr('disabled', 'disabled');
		$('#btnXoaTb').attr('disabled', 'disabled');
		$('#formQuanLyDiemBC input, textarea').attr('disabled', 'disabled');
		$('#formQuanLyDiemBC select').attr('disabled', 'disabled');
		$('textarea, input, select').css('cursor' , 'default');
    };
    
    return {
        init: function () {
            return setup();
        },
    }
})();
