formManager = (function () {
    let datatable = undefined;
    let csrfData = '?' + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content');
    const GET_DATA_BCSCDBB_URL = utils.getSafePath('/worklife/user/SuCoDuong/getbaocaothgt.do');
    const SAVE_ATTACHED_FILE_URL = utils.getSafePath('/worklife/user/SuCoDuong/luufiledinhkem.do' + csrfData);
    const LOAD_ATTACHED_FILE_URL = utils.getSafePath('/worklife/user/SuCoDuong/taifiledinhkem.do');
    const EXPORT_EXCEL_FILE_URL = utils.getSafePath('/worklife/user/SuCoDuong/exportexcel.do');
    let selNam = $('#selNam');
    let selTuan =  $('#selTuan');
    let txtTenFile = $('#txtTenFile');
    let fileDinhKem = $('#fileDinhKem');
    let inputFileHover = $('#inputFileHover');
    let removeSign = $('#removeSign');
    let tuanGanNhat;
    let namGanNhat;
    let ngayGanNhat;
    let setup = function () {
        init();
        loadFormOnSelChange();
        fileAttachment();
        exportExcel();
        utils.initNotifyMessageBox();
        $('#btnDownloadFile').on('click',downLoadFile);
    };
    let downLoadFile = function () {
        let tuan = parseInt($('#selTuan').val());
        let nam = parseInt($('#selNam').val());
        let idGroup = parseInt($('#groupId').val());
        window.open(url + "/worklife/user/SuCoDuong/file/json/downloadfile.do?tuan=" + tuan + "&nam=" + nam + "&idGroup=" + idGroup, '_blank');
    };
    let init = function () {
        //Khởi tạo gia trị;
        ngayGanNhat =new Date() ;
        tuanGanNhat = getWeekFromDate(ngayGanNhat);
        namGanNhat = ngayGanNhat.getFullYear();

        getYears(1900,namGanNhat);
        getWeeks(1,54);

        let tuan = $('#txtTuan').val();
        if(tuan===''){
            tuan = tuanGanNhat;
        }
        $(selTuan).val(tuan);

        let nam = $('#txtNam').val();
        if(nam===''){
            nam = namGanNhat;
        }
        $(selNam).val(nam);

        datatable = setupTable();
        loadAttachedFile();
        let selTuanVal = $(selTuan).val();
        let selNamVal = $(selNam).val();
        if(selTuanVal!=tuanGanNhat||selNamVal!=namGanNhat){
            $('#btnSaveAttachedFile').hide();
        }else{
            $('#btnSaveAttachedFile').show();
        }
        //Đăng ký sự kiện
    };

    let loadFormOnSelChange= function () {
        $(selNam).on('change',function () {
            loadForm();
        });
        $(selTuan).on('change', function () {
            loadForm();
        });
    };
    let fileAttachment = function () {
        /// Ẩn hiện dấu x khi rê chuột
        $(inputFileHover).on( 'mouseover', function () {
            let fileName = $(txtTenFile).text();
            if(fileName!='' && fileName!=null){
                $(removeSign).show();
            }
        });
        $(inputFileHover).on( 'mouseout', function () {
            $(removeSign).hide();
        });
        ////
        //// Xóa file khi nhấn dấu x
        $(removeSign).on('click', function () {
            $(txtTenFile).text('');
            $(fileDinhKem).val('');
            return false;
        });
        //////
        ///// Chọn file khi click vào span chọn file///
        $(inputFileHover).on('click',function () {
            $(fileDinhKem).trigger('click');
        });
         $(fileDinhKem).change(function () {
             let tenfile = $(fileDinhKem).val();
             if (tenfile !== undefined && tenfile.length !== 0 && tenfile !== '') {
                 let strArr = tenfile.split("\\");
                 let fixStr = strArr[strArr.length - 1];
                 let hideString = datatableFactory.hideStringIfOver20Character(fixStr);
                 $(txtTenFile).text(hideString);
             }
         });
         /////
        ///Luu File đính kèm
        $('#btnSaveAttachedFile').on('click', function () {
            $('#saveAttachedFile').attr({'action':SAVE_ATTACHED_FILE_URL,'method':'POST' });
            $('#saveAttachedFile').submit();
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
                "orderable": false,
                "mData": "tenDuong",
                class: "text-center"
            }, {
                "sWidth": "20%",
                "targets": 2,
                "orderable": false,
                class: "text-left",
                "mData": "taiNan"
            }, {
                "sWidth": "20%",
                "targets": 3,
                "orderable": false,
                class: "text-left",
                 "mData": "huHong"
            }, {
                "sWidth": "20%",
                "targets": 4,
                "orderable": false,
                class: "text-left",
                "mData": "xuLy"
            }, {
                "sWidth": "25%",
                "orderable": false,
                class: "text-left",
                "targets": 5,
                "mData": "khacPhuc"
            }
        ];
        return datatableFactory.initAjaxDataSourceDataTable('fileListTable', colDefs, GET_DATA_BCSCDBB_URL, function (settings) {
            let obj = {
                "optional": {
                    "tuanthu": $(selTuan).val(),
                    "nam": $(selNam).val()
                }
            };
            return JSON.stringify(Object.assign(obj, settings));
        }, {
            'deferLoading': null,
            /*'order': [[1, 'desc']]*/
        }, undefined, 1);
    };

    let loadForm = function(){
        $(txtTenFile).text('');
        $(fileDinhKem).val('');
        datatable.ajax.reload();
        loadAttachedFile();
        let selTuanVal = $(selTuan).val();
        let selNamVal = $(selNam).val();
        if(selTuanVal!=tuanGanNhat||selNamVal!=namGanNhat){
            $('#btnSaveAttachedFile').hide();
        }else{
            $('#btnSaveAttachedFile').show();
        }
    };

    let loadAttachedFile = function () {
        let tuan = $(selTuan).val();
        let nam = $(selNam).val();
        let idGroup = $('#groupId').val();

        $.ajax({
            url: LOAD_ATTACHED_FILE_URL
            , data: {tuan: tuan,nam:nam,idGroup: idGroup}
            , type: "POST"
            , success: function (responce) {
                if(responce != null){
                    let tenfile = responce.ten;
                    if (tenfile !== undefined && tenfile.length !== 0 && tenfile !== '') {
                        let strArr = tenfile.split("\\");
                        let fixStr = strArr[strArr.length - 1];
                        let hideString = datatableFactory.hideStringIfOver20Character(fixStr);
                        $(txtTenFile).text(hideString);
                        $('#btnDownloadFile').show();
                        $('#btnDownloadFile').parent('div').addClass('input-group');
                    }
                    else {
                        $('#btnDownloadFile').hide();
                        $('#btnDownloadFile').parent('div').removeClass('input-group');
                    }
                    $('#ngayBaoCao').val(responce.ngayBC);
                }
            }
        });
    };

    let exportExcel = function(){
        $('#btnXuatExcel').on('click', function(){
            let tuan = $(selTuan).val();
            let nam = $(selNam).val();
            let idGroup = $('#groupId').val();
            let groupName = $('#groupName').val().trim();
            window.open(EXPORT_EXCEL_FILE_URL + "?tuan=" + tuan+"&nam="+nam+"&idGroup="+idGroup+"&groupName="+groupName );
    })
    };

    let getYears = function (fromYear, toYear) {
        let options = "";
        for (let year = fromYear; year <= toYear; year++) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $(selNam).html(options);
    };

    let getWeeks = function (fromWeek, toWeek) {
        var options = "";
        for (var week = fromWeek; week <= toWeek; week++) {
            options += "<option value='" + week + "'>" + week + "</option>";
        }
        $(selTuan).html(options);
    };

    let getWeekFromDate = function (date) {
        date.setHours(0,0,0,0);
        var yearStart = new Date(date.getFullYear(),0,1);
        var weekNo = Math.ceil(( ( (date - yearStart) / 86400000) + 1 + yearStart.getDay())/7);
        return weekNo;
    };

    return {
        init: function () {
            return setup();
        }
    }
})
();