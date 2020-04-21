var listGroup = [];
var FORMSTATISTICAL_PUBLIC = {
    showDetailFormStatisticalWhenSelectRow : function(){
        var id = $('#idFormStatistical').val();
        if(id === "" || id === "undefined"){
            swal({
                title: "Cảnh báo",
                text: multiLanguage.warningchooseform,
                type: "warning",
                confirmButtonText: "Ok",
            });

        }else{
            $.ajax({
                url: url + '/worklife/admin/formstatistical/json/loaddetail.do',
                type: 'POST',
                contextType : "aplication/json;charset=utf-8",
                dataType: 'json', 
                data: { 
                   idFormStatistical: id
                },
                success: function(result){
                    //Clear Form
                    FORMSTATISTICAL_PUBLIC.clearForm();
                    //Information
                    $('#idFormStatistical').val(result.id);
                    $('#tenBieu').val(result.tenBieu);
                    $('#maBieu').val(result.maBieu);
                    $('#loaiBieuMau').val(result.loaiBieuMau);
                    var arrIdKyTK = result.idKyTK.split(",");
                    for (var int = 0; int < arrIdKyTK.length; int++) {
                        if(arrIdKyTK[int] === "1")
                            $('#iCheckMonth').iCheck('check');
                        if(arrIdKyTK[int] === "2")
                            $('#iCheckYear').iCheck('check');
                    }
                    $('#idKyTK').val(result.idKyTK).change();
                    //File
                    var arrPathFile ;
                    if(result.pathFile.indexOf("\\") > -1){
                        arrPathFile = result.pathFile.split("\\");
                    }else arrPathFile = result.pathFile.split("\/");
                    var nameFile = arrPathFile[arrPathFile.length - 1];
                    var nameFileRemake = WL_SUPPORT_UTILS_FILE.hideStringIfOverNumCharacter(nameFile,50);
                    $('#pathFile').val(result.pathFile);
                    $('#nameFile').val(nameFile);
                    $('#tenFile').text(nameFileRemake);
                    $("#btnFileExists").show();
                    //$("#btnFileExists").removeAttr("onclick");
                    $("#btnFileNew").hide();
                    //I-checks hiệu lực
                    if(result.hieuluc === 1){//Het hieu luc
                        $('#iCheck').iCheck('check');
                        $('#hieuluc').val('1');
                    }else{
                        $('#iCheck').iCheck('uncheck');
                        $('#hieuluc').val('0');
                    }
                    
                }
            });//end Ajax
        }//end else
    },
    
    checkMaBieu : function(){
        var maBieu = $('#maBieu').val();
        $.ajax({
            url: url + '/worklife/user/file/json/checkMaBieuExistOrNotExist.do',
            type: 'POST',
            contextType : "aplication/json;charset=utf-8",
            dataType: 'json', 
            data: { 
                maBieu: maBieu,
            },
            success: function(result){
                if(result.ok == true){
                    swal({
                        title: "Cảnh báo",
                        text: "Mã Biểu đã tồn tại, vui lòng đặt mã biểu khác!",
                        type: "warning"
                    });
                    $('#maBieu').val('');
                }
            },
            error: function(error) {
                console.log("Error: " + error);
            }
        });//end Ajax
    },
    
    clearForm : function(){
        $('#idFormStatistical').val('-1');
        $('#tenBieu').val('');
        $('#maBieu').val('');
        $('#loaiBieuMau').val('');
        //File
        $('#pathFile').val('');
        $('#nameFile').val('');
        $('#tenFile').text('');
        $("#btnFileExists").hide();
        $("#btnFileExists").attr('onClick','FORMSTATISTICAL_PUBLIC_FILE.choosseFile()');
        $("#btnFileNew").show();
        if($('#tenFile_error').val() != undefined){
            $('#tenFile_error').remove();
        }
        //I-checks hiệu lực
        $('#iCheck').iCheck('uncheck');
        $('#hieuluc').val('0');
        //IChekc kỳ báo cáo
        $('#iCheckMonth').iCheck('uncheck');
        $('#iCheckYear').iCheck('uncheck');
        $('#idKyBaoCao').val("");
        
    },
    
    deleteForm : function(){
        var id = $('#idFormStatistical').val();
        if(id < 0){
            swal({
                title: "Cảnh báo",
                text: multiLanguage.warningnotchoose4del,
                type: "warning",
                confirmButtonText: "Ok",
            })
        }else{
            swal({
                title: "Cảnh báo",
                text: multiLanguage.warningask4del,
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: false,
                confirmButtonText: multiLanguage.btndelete,
                cancelButtonText: multiLanguage.btncancel
                },
                function(){
                    $.ajax({
                        url : url + "/worklife/admin/formstatistical/json/checkusedornot.do",
                        type : 'POST',
                        contextType : "application/json;charset=utf-8",
                        dataType : 'json',
                        data : { id : id},
                        success: function(result){
                            if(result === false){
                                swal("Cảnh báo!", "Mẫu biểu không thể xóa vì đang được sử dụng", "warning")
                            }else if(result === true){
                                swal("Thành công!", "Mẫu biểu đã được xóa thành công", "success");
                                $('#tableFormStatistical').DataTable().ajax.reload();
                            }else
                                swal("Lỗi!", "Không xóa được vì có lỗi phát sinh...", "error")
                                
                        }
                    });
                }
            )
        }
            
    },
    
    submitForm : function(){
        var tenFile = $('#tenFile').text();
        var error = '<label id="tenFile_error" style="color:#cc5965" for="tenFile">' + multiLanguage.validreport + '</label>';
        var parentFileInput = $('#tenFile').parent().parent().parent();
        if(!$("#formStatisticalVO" ).valid()){
            $("#formStatisticalVO" ).validate().focusInvalid();
            if((tenFile === "" || tenFile === undefined) && $('#tenFile_error').val() === undefined)
                $(parentFileInput).after(error);
            return;
        }else{
            if ((tenFile === "" || tenFile === undefined) && $('#tenFile_error').val() === undefined){
                $(parentFileInput).after(error);
                return; 
            }else if(tenFile === "" || tenFile === undefined)
                return;
        }
        
        var listIdKyBaoCao = [];
        $.each($('input[type=checkbox]').filter('[name=kyBaoCao]'), function(index, element){
            if($(element).is(":checked"))
                listIdKyBaoCao.push($(element).val());
        });
        $('#idKyBaoCao').val(listIdKyBaoCao.join(","));
        //Submit Form
        window.formStatistical.submit();
    },
    
    initPublic : function(){
        //I-checks
        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green'
        });
        $('#iCheck').on('ifChecked ifUnchecked', function(event){
            if($(this).is(':checked'))
                $('#hieuluc').val('1');
            else $('#hieuluc').val('0');
        });
        
        if ($('#error').val() != '') {
            swal({
                  title: "Lỗi",
                  text: $('#error').val(),
                  type: "error"
            });
       } else if ($('#success').val() != '') {
            swal({
                  title: "Thành công",
                  text: $('#success').val(),
                  type: "success"
            });
       }
        
        //Validation
        $( "#formStatisticalVO" ).validate({
            rules: {
                tenBieu : {
                    required : true,
                }
            },
            messages: {
                tenBieu : {
                    required : multiLanguage.validname
                }
            },
        });
    },
    
};

var FORMSTATISTICAL_PUBLIC_FILE = {
    initInputFile : function(){
        $("#btnFileExists").hide();
        $("#delFile").hide();
        $("#dowFile").hide();
    },
    
    changeFile : function(name){
        $("#tenFile").text(name);
        $("#dowFile").show();
        if($('#tenFile_error').val() != undefined){
            $('#tenFile_error').remove();
        }
    },
    
    choosseFile : function(element){
        $("#file").click();
        if($('#tenFile_error').val() != undefined){
            $('#tenFile_error').remove();
        }
    },
    
    changeBtn : function(element){
        if($(element).val() != ''){
            $("#btnFileNew").hide();
            $("#btnFileExists").show();
        } else{
            $("#btnFileNew").show();
            $("#btnFileExists").hide();
        }
        $("#tenFile").text($(element).val().split("\\")[2]);
        $('#nameFile').val($(element).val().split("\\")[2]);
    },
    
    delFile : function(element){
        $(element).hide();
        $("#dowFile").hide();
        $("#file").val("");
        $("#tenFile").text("");
        $("#btnFileNew").show();
        $("#btnFileExists").hide();
    },
    
    hoverFile : function () {
        $("#delFile").show()
    },
    
    leaveFile : function () {
        $("#delFile").hide()
    },
};

var FORMSTATISTICALTOTAL_FILE = {
    onclickBtnDownLoadFile : function(element){
        var $parent = $(element).parent();
        var $td = $(element).parent().parent();
        var $input = $td.find("input");
        var pathFile = $input.val();
        var nameFile = $parent.attr('title');
        $.ajax({
            url: url + '/worklife/user/file/json/checkexistornot.do',
            type: 'POST',
            contextType : "aplication/json;charset=utf-8",
            dataType: 'json', 
            data: { 
                nameFile: nameFile,
                folderName : "baocao",
                pathFile : pathFile
            },
            success: function(result){
                if(result.ok == true)
                    window.location = url + "/worklife/manager/user/downloadFileFromPath.do" + "?fileName=" + nameFile + "&pathFile=" + pathFile;
                else swal({
                        title: "Cảnh báo",
                        text: "File không tồn tại, vui lòng kiểm tra và thử lại!",
                        type: "warning"
                    });
                    
            },
            error: function(error) {
                console.log("Error: fail check file exist or not : detail  " + error);
            }
        });//end Ajax
    },

};