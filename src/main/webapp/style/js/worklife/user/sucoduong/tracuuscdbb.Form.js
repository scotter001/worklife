formManager = (function () {
    let datatable = undefined;
    const GET_DATA_TCSCDBB_URL = utils.getSafePath('/worklife/user/SuCoDuong/taitracuuscdbb.do');
    const LOAD_ATTACHED_FILE_URL = utils.getSafePath('/worklife/user/SuCoDuong/taifiledinhkem.do');
    const DOWNLOAD_ATTACHED_FILE_URL = utils.getSafePath('/worklife/user/file/downloadfile.do');
    const EXPORT_EXCEL_FILE_URL = utils.getSafePath('/worklife/user/SuCoDuong/tracuuscd/exportexcel.do');
    let selNam = $('#selNam');
    let selTuan =  $('#selTuan');
    let selHatQuanLyGT =  $("#selHatQuanLyGT");
    let txtTenFile = $('#txtTenFile');
    let fileDinhKem = $('#fileDinhKem');
    let tuanGanNhat;
    let namGanNhat;
    let ngayGanNhat;

    let setup = function () {
        init();
        /*loadFormOnSelChange();*/
        downloadAttachedFile();
        exportExcel();
        $('#btnTim').on('click', btnTim);
        $('#btnSave').on('click', btnSave);
        utils.initNotifyMessageBox();
    };
    let init = function () {
        ngayGanNhat =new Date() ;
        tuanGanNhat = getWeekFromDate(ngayGanNhat);
        namGanNhat = ngayGanNhat.getFullYear();
        getYears(1900,namGanNhat);
        $(selNam).val(namGanNhat);
       // getWeeks(namGanNhat);
        getWeeks(1,54);
        $(selTuan).val(tuanGanNhat);

        //userSession
        let groupMaHuyenVal = $('#groupMaHuyen').val();
        if(groupMaHuyenVal!==''){
            $(selHatQuanLyGT).prop('disabled',true);
        }
        /*if(groupMaHuyenVal===''){
            $.when(
                eventUtils.getAllCategory("group")
            ).done(
                function (group) {
                    console.log(group[0]);
                    eventUtils.selOption("selHatQuanLyGT", "id", "name", group[0]);
                });
        }else{
            $(selHatQuanLyGT).html('<option value="'+$('#groupId').val()+'">'+$("#groupName").val()+'</option>');
           $(selHatQuanLyGT).val($('#groupId').val()).prop('disabled',true);
        }*/
        datatable = setupTable();
        loadAttachedFile();

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
                    return rowIndex + startAt + 1 + '<input type="hidden" name="chuyenSCTXVOS['+meta.row+'].idSuCo" value="'+row.idSuCo+'"/>';
                }

            }, {
                "sWidth": "10%",
                "targets": 1,
                "mData": "tenDuong",
                "orderable": false,
                class: "text-center"
            }, {
                "sWidth": "20%",
                "targets": 2,
                class: "text-left",
                "orderable": false,
                "mData": "taiNan"
            }, {
                "sWidth": "20%",
                "targets": 3,
                class: "text-left",
                "orderable": false,
                "mData": "huHong"
            }, {
                "sWidth": "15%",
                "targets": 4,
                class: "text-left",
                "orderable": false,
                "mData": "xuLy"
            }, {
                "sWidth": "20%",
                "targets": 5,
                class: "text-left",
                "orderable": false,
                "mData": "khacPhuc"
            }, {
                "sWidth": "10%",
                "targets": 6,
                class: "text-left",
                "orderable": false,
                render: function (data, type, row, meta) {
                    return '<select class="form-control" name="chuyenSCTXVOS['+meta.row+'].chuyenSCTX" style="width: 100%">'
                        + '<option value="-1" '+(row.chuyenSCTX !== -1?'selected':'')+'>Chưa chuyển</option>'
                        + '<option value="1" '+(row.chuyenSCTX === 1?'selected':'')+'>Đã chuyển</option>'
                        + '</select>';
                }
            }
        ];
        return datatableFactory.initAjaxDataSourceDataTable('fileListTable', colDefs, GET_DATA_TCSCDBB_URL, function (settings) {
            let chuyensctx;
                if ($('#chuyensctx').is(':checked')){
                    chuyensctx = 1;
                }
                else {
                    chuyensctx = -1;
                }
            let obj = {
                "optional": {
                    "tuanthu": $(selTuan).val(),
                    "nam": $(selNam).val(),
                    "idgroup": $(selHatQuanLyGT).val(),
                    "chuyensctx": chuyensctx
                }
            };
            return JSON.stringify(Object.assign(obj, settings));
        }, {
            'deferLoading': null,
            "pageLength": 15
            /*'order': [[1, 'desc']]*/
        }, 1, 1);
    };

    let btnTim = function() {
        $(txtTenFile).text('');
        $(fileDinhKem).val('');
        datatable.ajax.reload();
        loadAttachedFile();
    };

    let loadFormOnSelChange = function(){
        $('#selNam, #selTuan,#selHatQuanLyGT').on('change', function(){
            $(txtTenFile).text('');
            $(fileDinhKem).val('');
            datatable.ajax.reload();
            loadAttachedFile();
        });
    };

    let loadAttachedFile = function () {
        let tuan = $(selTuan).val();
        let nam = $(selNam).val();
        let idGroup = $(selHatQuanLyGT).val();

        $.ajax({
            url: LOAD_ATTACHED_FILE_URL,
            data: {tuan: tuan,nam:nam,idGroup: idGroup},
            type: "POST",
            success: function (responce) {
                if(responce != null){
                    let tenfile = responce.ten;
                    if (tenfile !== undefined && tenfile.length !== 0 && tenfile !== '') {
                        let strArr = tenfile.split("\\");
                        let fixStr = strArr[strArr.length - 1];
                        let hideString = datatableFactory.hideStringIfOver20Character(fixStr);
                        $(txtTenFile).text(hideString);
                        $(fileDinhKem).attr('idTiepDinhKem',responce.idTiepDinhKem);
                        $('#btnDownloadAttachedFile').prop('disabled',false);
                    }else{
                        $(fileDinhKem).attr('idTiepDinhKem',0);
                        $('#btnDownloadAttachedFile').prop('disabled',true);
                    }
                }
            }
        });
    };

    let downloadAttachedFile = function(){
        $('#btnDownloadAttachedFile').on('click', function(){
            /*let idFile = $(fileDinhKem).attr('idTiepDinhKem');
            if(idFile>0) {
                window.open(DOWNLOAD_ATTACHED_FILE_URL + "?idFile=" + idFile);
            }*/
            let tuan = parseInt($('#selTuan').val());
            let nam = parseInt($('#selNam').val());
            let idGroup = parseInt($('#group_Id').val());
            window.open(url + "/worklife/user/SuCoDuong/file/json/downloadfile.do?tuan=" + tuan + "&nam=" + nam + "&idGroup=" + idGroup, '_blank');
        })
    };

    let exportExcel = function(){
        $('#btnXuatExcel').on('click', function(){
            let tuan = $(selTuan).val();
            let nam = $(selNam).val();
            let idGroup = $('#selHatQuanLyGT').val();
            let groupName = $('#selHatQuanLyGT').text().trim();
            window.open(EXPORT_EXCEL_FILE_URL + "?tuan=" + tuan+"&nam="+nam+"&idGroup="+idGroup+"&groupName="+groupName );
        })
    };

    let getYears = function (fromYear, toYear) {
        let options = "";
        for (let year = toYear; year >= fromYear; year--) {
            options += "<option value='" + year + "'>" + year + "</option>";
        }
        $(selNam).html(options);
    };

    let getWeeks = function ( fromWeek, toWeek) {
        /*var endYear = new Date(year,11,31);
        alert(endYear);
        let toWeek= getWeekFromDate(endYear);*/
        let options = "";
        for (let week = fromWeek; week <= toWeek; week++) {
            options += "<option value='" + week + "'>" + week + "</option>";
        }
        $(selTuan).html(options);
    };

    let getWeekFromDate = function (date) {
        date.setHours(0,0,0,0);
        let yearStart = new Date(date.getFullYear(),0,1);
        let weekNo = Math.ceil(( ( (date - yearStart) / 86400000) + 1 + yearStart.getDay())/7);
        return weekNo;
    };

    let btnSave = function () {
        let form = $('#formTraCuuSuCo');
        let method = "POST";
        let modelAttribute = "suCoVO";
        form.attr("method", method);
        form.attr("action", url + "/worklife/user/TraCuuSuCoDuong/SaveForm.do?" + $("meta[name='_csrf_parameter']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        form.attr("modelAttribute", modelAttribute);
        form.attr("enctype", "multipart/form-data");
        form.submit();
    };
    return {
        init: function () {
            return setup();
        }

    }
})();