$(document).ready(function() {
	utils.csrfInject();
	$('#side-menu').find('.active').removeClass('active');
	$('#WorklifeSystemManager').addClass('active');
	
	// BUTTONS
	$('.fg-button').hover(
		function() { $(this).removeClass('ui-state-default').addClass('ui-state-focus'); },
		function() { $(this).removeClass('ui-state-focus').addClass('ui-state-default'); }
	);
	
	//MULTI LEVEL DROPDOWNLIST
	$('#listParentGroup').menu({
		content: $('#listParentGroup').next().html(),
		flyOut: true,
		functionChooseItem: function(item) {
			$('#lblParentName').text($(item).text());
			$('#parentId').val(item.id);
		}
	});

	$.validator.addMethod("select-required", function(value,element){
		let id = $(element).attr('id');
        let type = parseInt($("#txtDepartment").val());
        if(id === 'lstHuyen'){
            if(type === 2 || type === 3){
                return (value !== undefined && value !== null && value !== "" && value !== "-1");
            }
        }
        if(id === 'lstPhuongXa'){
            if(type === 3){
                return (value !== undefined && value !== null && value !== "" && value !== "-1");
            }
        }
        return true;
	}, "");

	$("#createGroup").validate({
		rules: {
			groupName: {
				required: true
			},
			groupDescription: {
				required: true
			},
            maHuyen : {
                "select-required" : true
			},
            maXa : {
                "select-required" : true
            }
		},
		messages: {
			groupName: {
				required: multiLanguage.groupName
            },
            groupDescription: {
				required: multiLanguage.groupDescription
			},
            maHuyen : {
                "select-required" : "Vui lòng chọn huyện"
            },
            maXa : {
                "select-required" : "Vui lòng chọn xã"
            }
        }
	});
	
	if ($('#error').val() != '') {
		 swal({
		       title: "Lỗi xử lý",
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

	let loadFirstTime = false;
    let selDistrict = $('#lstHuyen');
    let maHuyen = $('#maHuyen').val();
    let departMent = $("#txtDepartment");
    let isDepartment = parseInt($('#isDepartment').val());
    if(maHuyen !== "" && maHuyen !== "-1"){
        loadFirstTime = true;
        $.when(eventUtils.inSelDistrict(selDistrict,1)).done(function(){
        	if(isDepartment === 3){
                $.when(eventUtils.eventDistrictOnChange(maHuyen, $('#lstPhuongXa'))).done(function(){
                    $('#lstHuyen').val(maHuyen);
                    let maXa = $('#maXa').val();
                    if(maXa !== "-1"){
                        $('#lstPhuongXa').val(maXa);
                    }
                });
			}
        });
	}

    selDistrict.on('change', function () {
    	if(parseInt($("#txtDepartment").val()) === 3){
            let value = $(this).val();
            let target = $('#lstPhuongXa');
            if (value <= 0) {
                target.prop("disabled", true);
                target.html("");
                target.append($("<option></option>").attr('value', -1).text('Chọn Phường/Xã'));
                target.val(-1);
                return;
            }
            eventUtils.eventDistrictOnChange(value, target);
		}
    });
    utils.initIChecks('i-checks');
    if(isDepartment > 0){
        $('#chkVSATTP').iCheck('check');
        $('#txtDepartment').val(isDepartment);
        if(isDepartment === 1){
			$('#txtDepartment').prop('disabled',false);
        }else if(isDepartment === 2){
        	$('#txtDepartment,#lstHuyen').prop('disabled',false);
        }else if(isDepartment === 3){
            $('#txtDepartment,#lstHuyen,#lstPhuongXa').prop('disabled',false);
        }
	}

    $('#chkVSATTP').on('ifChanged',function(e){
    	if(e.target.checked) {
            departMent.find("option[value='-1']").remove();
            departMent.prop('disabled',false);
        }else{
            departMent.append($('<option>',{
            	value : -1,
				text : ""
			}).prop('selected',true)).prop('disabled',true);
            $('#lstHuyen,#lstPhuongXa').prop('disabled',true);
            selDistrict.append($('<option>',{
                value : -1,
                text : ""
            }).prop('selected',true));
            $('#lstPhuongXa').empty().valid();
		}
	});
    departMent.on('change',function(){
    	let type = parseInt($(this).val());
		if(type === 1){
    		$('#lstHuyen,#lstPhuongXa').prop('disabled',true);
        	selDistrict.append($('<option>',{
                value : -1,
                text : ""
            }).prop('selected',true));
			$('#lstPhuongXa').empty().valid();
		}else if(type === 2 || type ===3){
			if(!loadFirstTime){
                loadFirstTime = true;
                eventUtils.inSelDistrict(selDistrict,1)
			}
            $('#lstPhuongXa').empty().prop('disabled',true);
            if(selDistrict.is(':enabled') && type === 3){
                selDistrict.change();
			}else{
                selDistrict.prop('disabled',false);
                selDistrict.find("option[value='-1']").remove();
            }
		}
    });
});