var urlGetListFormStatisticial = url + "/worklife/admin/formstatistical/json/getlist.do";
var dtTable;
var ListFormStatisticalDataTable = {
    renderRowColumnPathFile : function(data){
        var arrPathFile ;
        if(data.indexOf("\\") > -1){
            arrPathFile = data.split("\\");
        }else arrPathFile = data.split("\/");
        var nameFile = arrPathFile[arrPathFile.length - 1];
        var nameFileRemake = WL_SUPPORT_UTILS_FILE.hideStringIfOver20Character(nameFile);
        return '<a title="'+ nameFile +'"><label style="cursor:pointer" onclick="FORMSTATISTICALTOTAL_FILE.onclickBtnDownLoadFile(this)">'+ nameFileRemake +'</label></a><input type="hidden" value="'+data+'">';
    },
    renderRowColumnKyTK : function(data){
        var nameKyTK = "";
        nameKyTK = data.replace('1', 'Tháng');
        nameKyTK = nameKyTK.replace('2', 'Năm');
        return nameKyTK;
    },
    
    initTable : function(){
        dtTable = $('#tableFormStatistical').DataTable({
            "searching" : false,
            "info" : false,
            "bLengthChange" : false,
            "responsive": true,
            "bAutoWidth": false,
            "serverSide": true,
            "processing": true,
            "pagingType": "simple_numbers",
            "iDisplayLength": 5,
            "iDisplayStart": 0,
            "aoColumnDefs":[
                {
                    "sWidth" : "5%",
                    "targets" : 0,
                    "searchable": false,
                    "orderable": false,
                    "className": "text-center",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },{
                    "sWidth" : "10%",
                    "targets" : 1,
                    "searchable": false,
                    "orderable": false,
                    "className": "text-center",
                    "mData": "maBieu"
                },{
                    "sWidth" : "10%",
                    "targets" : 2,
                    "searchable": false,
                    "orderable": false,
                    "className": "text-center",
                    "mData": "loaiBieuMau"
                },{
                    "sWidth" : "35%",
                    "targets" : 3,
                    "searchable": false,
                    "orderable": false,
                    "className": "text-left",
                    "mData" : "tenBieu"
                },{
                    "sWidth" : "20%",
                    "targets" : 4,
                    "searchable": false,
                    "orderable": false,
                    "className": "text-center",
                    "mData" : "pathFile",
                    render: function (data, type, row, meta) {
                       return ListFormStatisticalDataTable.renderRowColumnPathFile(data);
                    }
                },{
                    "sWidth" : "20%",
                    "targets" : 5,
                    "searchable": false,
                    "orderable": false,
                    "className": "text-center",
                    "mData" : "idKyTK",
                    render: function (data, type, row, meta) {
                        return ListFormStatisticalDataTable.renderRowColumnKyTK(data);
                     }
                },{
                    "targets" : 6,
                    "searchable": false,
                    "orderable": false,
                    "className": "text-center",
                    "visible" : false,
                    "mData" : "id"
                }],
            "ajax": {
                "url": urlGetListFormStatisticial ,
                "type": "POST",
            },
            "fnDrawCallback": function(oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsDisplay()) {
                   $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
               }else{
                   $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
               }
           },
            "language": {
                "paginate": {
                    "sFirst" :  multiLanguage.first,
                    "sPrevious" : multiLanguage.prev,
                    "sNext" : multiLanguage.next,
                    "sLast" : multiLanguage.last
                    },
                     "search": "",
                     "sInfo": "",
                     "sInfoEmpty": "",
                     "zeroRecords": multiLanguage.emptyTable,
                     "sInfoFiltered": ""                    
            }
        });
        
       
        $('#tableFormStatistical tbody').on( 'click', 'tr', function () {
            var table = $('#tableFormStatistical').DataTable();
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
                $('#idFormStatistical').val('-1');
                //Clear Form
                FORMSTATISTICAL_PUBLIC.clearForm();
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var id = dtTable.row(this).data().id;
                $('#idFormStatistical').val(id);
                FORMSTATISTICAL_PUBLIC.showDetailFormStatisticalWhenSelectRow();
            }
        });
    },
    
};