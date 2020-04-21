/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

let managerCategory = (function(){
    let datatable = undefined;
    let form = undefined;

    let setup = function () {
        form = $('#formCategory');
        datatable = setupTable();
        datatable.draw();
        $('#btnAdd').on('click',addCategory);
        $('#btnDelete').on('click',onRemove);
        $('#btnLuu').on('click',submitHandler);
        $('#tblCategory').find('tbody').on('click','tr',onClick);
    };

    let setupTable = function(){
        let colDef = [];
        colDef.push(
            {
                "sWidth" : "7%",
                "searchable": false,
                "orderable": false,
                "targets" : 0,
                "data":function(data){
                    return '<input type="checkbox" class="i-checks isChecked" value="true" id="'+data.id+'"/>';
                }
            },
            {
                "sWidth" : "4%",
                "targets" : 1,
                "searchable": false,
                "orderable": false,
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
        );
        let tblCal = $('#tblCategory');
        let ctlLength = tblCal.find('thead tr th').length -2;
        tblCal.find('thead tr th').not(':lt(2)').each(function (index) {
            let colRef = $(this).attr("colref");
            if(index === ctlLength){
                colDef.push(
                    {
                        "targets" : (index+2),
                        "data":colRef
                    }
                );
            }else{
                colDef.push(
                    {
                        "targets" : (index+2),
                        "data":colRef
                    },
                );
            }

        });
        let opts = {
            "fnDrawCallback": function(oSettings) {
                if (oSettings._iDisplayLength >= oSettings.fnRecordsTotal()) {
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
                    $('#btnControlThemXoa').attr('style','margin-top: -27px')
                }else{
                    $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
                    $('#btnControlThemXoa').attr('style','margin-top: -69px')
                }
                utils.initIChecks('i-checks');
                datatableFactory.checkCheckBox('checkAllCategory', 'isChecked');
                datatableFactory.checkBoxOnSelect('checkAllCategory', 'isChecked');
            },
            'order': [[1, 'asc']],
        };

        let urlCategory = $('#txtUrl').val();
        return datatableFactory.initDataSourceDataTable('tblCategory', colDef, url+ "/worklife/manager/category/"+urlCategory+"/table/get.do",function(settings){
            return settings
        },opts,1);
    };

    let addCategory = function(){
        form.find('#txtId').val(-1);
        form.find('input[type="text"]').val("");
        form.find('select').val(-1);
        $('#modalCategory').modal({backdrop: 'static'});
    };

    let onClick = function(){
        var data = datatable.row(this).data();

        form.find('input').each(function(){
            $(this).val(data[$(this).attr("name")]);
        });
        form.find('select').each(function(){
            let value = (data[$(this).attr("name")]).trim();
            $(this).find('option').filter(function() {
                //may want to use $.trim in here
                return ($(this).text()).trim() === value;
            }).attr('selected', true);
        });


        $('#modalCategory').modal({backdrop: 'static'});
    };

    let onRemove = function(){
        var isChecked = $('#tblCategory').find('tbody tr td:first-child').find("input:checked");
        if (isChecked.length === 0) {
            messageHandler.selectRow();
        }else{
            messageHandler.confirmDelete(function(){
                if (isChecked.length > 0) {
                    let lstId = [];
                    $.each(isChecked, function () {
                        let data = datatable.row($(this).closest('tr')).data();
                        lstId.push(parseInt(data.id));
                    });
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json",
                        url: url + "/worklife/manager/category/"+$('#txtUrl').val()+"/delete.do",
                        data: JSON.stringify(lstId),
                        success: function (data) {
                            if (data) {
                                datatable.ajax.reload();
                                datatable.draw();
                                if ($('#checkAllCategory').closest('div').hasClass('checked')) {
                                    $('#checkAllCategory').iCheck('uncheck');
                                }
                                setTimeout(function () {
                                    messageHandler.deleteSuccessful();
                                }, 100);
                            } else {
                                setTimeout(function () {
                                    messageHandler.deleteFailed();
                                }, 100);
                            }
                        },
                        error :messageHandler.getErrorCallBackDeleteFailed()
                    })
                }
            });
        }
    };

    let submitHandler = function(e){
        e.preventDefault();
        let submitUrl = url+"worklife/manager/category/"+$('#txtUrl').val()+"/save.do";
        let form = $('#formCategory');
        let modelAttribute = "CategoryVO";
        $(form).attr("action", submitUrl + "?" + $("meta[name='_csrf_name']").attr('content') + '=' + $("meta[name='_csrf']").attr('content'));
        $(form).attr("modelAttribute", modelAttribute);
        form.submit();
    };

    return {
        init : function(){
            return setup();
        },
        getList : function(callback){
            $.ajax({
                type: 'POST',
                url: url + "worklife/manager/category/list/get.do",
                success : callback,
                error : messageHandler.getErrorCallBack()
            })
        },
    }
})();