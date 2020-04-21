$(document).ready(function() {
	$('#side-menu').find('.active').removeClass('active');
	$('#WorklifeSystemManager').addClass('active');
	
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$(document).ajaxSend(function(e, xhr, options) {
		xhr.setRequestHeader(header, token);
	});
	
	create_user.init();
	create_user.crop_avatar('', 'imageBox', 'btnCrop', 'btnZoomIn', 'btnZoomOut', 'avatarProfile', 'file');
	create_user.date_picker();
	create_user.validation();
	create_user.event();
	clearValidateOnClick();
	
	$('#listUserGroup').click(function() {
		$('#lblGroupName-errorcon').remove();
		$('#lblGroupName').removeAttr('style');
	});
	
	$('#IDDatePicker').parent().find('.input-group-addon').on('click',function(){
		$('#IDDatePicker').focus();
	});
	$('#birthday').parent().find('.input-group-addon').on('click',function(){
		$('#birthday').focus();
	});
});

function clearValidateOnClick() {
	$('#username').on('click keyup', function() {
		$('#username-error').remove();
		$('#username').removeClass('error');
	});
	
}

function submitForm() {
	if (!$('#worklifeUserVO').valid()) {
		$("#worklifeUserVO").validate().focusInvalid();
		return;
	}
    var groupId = parseInt($('#groupId').val());
	if (groupId > 0) {
		$('#IDDate').val($('#IDDatePicker').val());
		document.adduser.submit();
	} else {
		var htmlContain = '<label id="lblGroupName-errorcon" class="error" for="areaqh" style="display: inline-block;">'+groupchose+'</label>';
		$('#listUserGroup').after(htmlContain);
		$('#listUserGroup').css("border","1px dotted #cc5965");
	}
}

var create_user = {
	init: function() {
		$('#listUserGroup').menu({
			content: $('#listUserGroup').next().html(),
			flyOut: true,
			functionChooseItem: function(item) {
				$('#lblGroupName').text($(item).text());
				$('#groupId').val(item.id);
			}
		});
	},
	
	crop_avatar : function(options, imageBoxId, btnCropId, btnZoomInId, btnZoomOutId, avatarProfileId, fileInputId) {
		var $imageBox = $('#' + imageBoxId);
		var $btnCrop = $('#' + btnCropId);
		var $btnZoomIn = $('#' + btnZoomInId);
		var $btnZoomOut = $('#' + btnZoomOutId);
		var $avatarProfile = $('#' + avatarProfileId);
		var $fileInput = $('#' + fileInputId);		
		var imgSrc = $('#avatarProfile').attr('src');
		if (options == undefined || options.length == 0) {
			options = {
				thumbBox : '.thumbBox',
				spinner : '.spinner',
				imgSrc : imgSrc
			}
		}
		
		var cropper = $imageBox.cropbox(options);
		
		$fileInput.on('change', function() {
			var reader = new FileReader();
			reader.onload = function(e) {
				options.imgSrc = e.target.result;
				cropper = $imageBox.cropbox(options);
			};
			reader.readAsDataURL(this.files[0]);
			//Save name of file
			fileName = this.files[0].name;
			this.files = [];
		});
		
		$btnCrop.on('click', function() {
			var img = cropper.getDataURL();
			$('#nameImage').val(fileName);
			$('#dataURLSheme').val(img);
			$avatarProfile.attr('src', img);
			$('#myModal').modal('hide');
		});
		
		$btnZoomIn.on('click', function() {
			cropper.zoomIn();
		});
		
		$btnZoomOut.on('click', function() {
			cropper.zoomOut();
		});
	},
	
	validation: function() {
		var validator = $('#worklifeUserVO').validate({
			errorPlacement: function (error, element) {
    			if (element.hasClass('date-picker')) {
    				error.insertAfter(element.parent());
    			} else {
    				if (element.hasClass('vali')) {
    					error.insertAfter(element);
    				} else {
    					error.insertAfter(element.parent());
    				}
    			}
	        }, 
			rules: {
				lblGroupName: {
					required: true
				},
				username: {
					required: true,
					checkUsername: true,
					checkSpace:true
				},
				email: {
	           	 	required: true,
	                emailCus: true,
	                checkEmail: true
	            },
	            password: {
	                required: true,
	                minlength: 8,
	                maxlength: 32
	            },
	            passwordConfirm:{
	                required: true,
	                minlength: 8,
	                maxlength: 32,
	                equalTo: '#password'
	            },
	            cellphone: {
	    			formatPhone: true
	    		},
	    		landline: {
	    			formatPhone: true
	    		},
	    		IDDatePicker: {
	    			dateRules: true
	    		},
	    		birthday: {
	    			dateRules: true
	    		}
			},
            messages:{
            	username:{
            		required: validNameRequired,
            		checkUsername: validCheckUsername,
            		checkSpace: validCheckUseSpace
           	 	},
           	 	email:{
           	 		required: validEmailRequired,
           	 		emailCus: validEmailFormat
           	 	},
           	 	password:{ 
           	 		required: validPassRequired,
           	 		minlength: validPassLength,
           	 		maxlength: validPassLength
           	 	},
           	 	passwordConfirm:{
           	 		required: validPassRequired,
           	 		equalTo: validPassNotSame,
           	 		minlength: validPassLength,
           	 		maxlength: validPassLength
           	 	},
           	 	IDDatePicker: {
	    			dateRules: datepickerValidateFormatDate
	    		},
	    		birthday: {
	    			dateRules: datepickerValidateFormatDate
	    		}
            }
		});
		jQuery.validator.addMethod('formatPhone', function(value, element) {
	    	var regex = /^\+?[0-9]+$/;
	    	return this.optional( element ) || regex.test( value );
	    }, validatePhone);
		
		/*jQuery.validator.addMethod('dateRules', function (value, element) {
			var iCheck = false;
			iCheck = create_user.check_date(value,iCheck);
			return iCheck;
		}, datepickerValidateFormatDate);*/
		jQuery.validator.addMethod('dateRules', function (value, element){
	    	var iCheck = false;
	    	if ($.trim(value) != "") {
	    		if ($.trim(value) != "__/__/____") {
	    			iCheck = checkDayInvalid(value);
	    		} else {
	    			iCheck = true;
	    		}
	    	} else {
	    		iCheck = true;
	    	}
	    	return iCheck;
	    }, datepickerValidateFormatDate);

	    jQuery.validator.addMethod("emailCus", function(value, element) {
			var regexEmail = /^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/;
			 return this.optional( element ) || regexEmail.test( value );
		}, jQuery.validator.messages.email);
	    
		jQuery.validator.addMethod('checkEmail', function() {
			var sttCheckEmail =  $('#checkEmail').val();
			if (sttCheckEmail === '-1') {
		    		return false;
		    } else {
		    	return true;
		    }
		}, validCheckEmail);

		jQuery.validator.addMethod('checkUsername', function() {
			var checkUsername =  $('#checkUsername').val();
			if (checkUsername === '-1') {
		    		return false;
		    } else {
		    	return true;
		    }
		}, validCheckEmail);
		
		//check khoảng trắng		
		jQuery.validator.addMethod('checkSpace', function() {
			var checkUsername =  $('#username').val();
			if (checkUsername.indexOf(" ") != '-1') {
		    		return false;
		    } else {
		    	return true;
		    }
		}, validCheckEmail);
		
		$('#email').focusout(function() {
			var emailStr = $(this).val();
			if (emailStr != '') {
				$.ajax({
					url: url + 'worklife/manager/user/check/checkExistsEmail.do',
					type: 'POST',
					contextType: 'application/json; charset=utf-8',
					dataType: 'json',
					data: {email : emailStr},
					success: function(data) {
						if (data.ok == false) {
							$('#checkEmail').val('-1');
						} else { 
							$('#checkEmail').val('1');
						}
						validator.element('#email');
					},
				});
			} else {
				
			}
		});
		
		$('#username').focusout(function() {
			var username = $(this).val();
			if (username != '') {
				$.ajax({
					url: url + 'worklife/manager/user/check/checkExistsUsername.do',
					type: 'POST',
					contextType: 'application/json; charset=utf-8',
					dataType: 'json',
					data: {username : username},
					success: function(data) {
						if (data.ok == false) {
							$('#checkUsername').val('-1');
						} else { 
							$('#checkUsername').val('1');
						}
						validator.element('#username');
					},
				});
			} else {
				
			}
		});
	},
	
	date_picker: function() {
		/*$('#IDDatePicker').datepicker({
			format: datepickerFormatDate,
			maxDate: '-0d',
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>',
            onSelect: function(dateText, inst) {
    			$('#birthday').datepicker('option','maxDate', dateText);
    			$('#IDAgency').prop('disabled', false);
        		$('#IDDate').val($('#IDDatePicker').val());
            }
		});*/
		$('#IDDatePicker').datepicker({
			format: datepickerFormatDate,
			maxDate: '-0d',
	        todayHighlight: true,
	        forceParse: false,     
	        autoclose: true	        
	    }).on('changeDate',function(selected) {
	    	$('#IDDatePicker').removeClass('error');
	    	$('#IDDatePicker').parent().next().remove();
	    	$('#IDAgency').prop('disabled', false);
    		//$('#IDDate').val($('#IDDatePicker').val());
	    });
		
		$('#IDDatePicker').inputmask({mask: datepickerFormatMask});
		
		/*$('#birthday').datepicker({
			format: datepickerFormatDate,
			maxDate: '-0d',
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>',
            onSelect: function(dateText, inst) {
            	$('#IDDatePicker').datepicker('option', 'minDate', dateText);
            }
		});*/
		$('#birthday').datepicker({
	        format: datepickerFormatDate,
	        maxDate: '-0d',
	        todayHighlight: true,
	        forceParse: false,        
	        autoclose: true
	    }).on('changeDate',function(selected) {
	    	$('#birthday').removeClass('error');
	    	$('#birthday').parent().next().remove();
	    });
		$('#birthday').inputmask({mask: datepickerFormatMask});
		$('#birthday').datepicker({}).on('changeDate',function(selected) {
		    	$('#birthday').removeClass('error');
		    	$("#birthday").parent().next().remove();
	    });
	},
	
	event: function() {
		$('#identityCard').on('focusout', function() {
	    	var cmndDKVal = $('#identityCard').val();
	    	if (cmndDKVal != '' && cmndDKVal != null) {
	    		$('#IDDatePicker').prop('disabled', false);
	    	} else {
	    		$('#IDDatePicker').prop('disabled', true);
	    		$('#IDDatePicker').val('');
	    		$('#IDAgency').prop('disabled', true);
	    		$('#IDAgency').val('');
	    		$('#IDDate').val('');
	    	}
	    });
	    
	    $('#IDDatePicker').on('focusout', function() {
	    	var cmndDateVal = $('#IDDatePicker').val();
	    	if (cmndDateVal != '' && cmndDateVal != null && cmndDateVal != '__/__/____') {
	    		$('#IDAgency').prop('disabled', false);
	    		$('#IDDate').val($('#IDDatePicker').val());
	    	} else {
	    		$('#IDAgency').prop('disabled', true);
	    		$('#IDAgency').val('');
	    		$('#IDDate').val('');
	    	}
	    });
	},
	
	check_date: function (value,iCheck) {	
		var x = value.split('/');
		
		if (x[2] == '0000') {
			iCheck = false;
		} else {
		    var pattern =/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;   
		    if (value != '' && value != '__/__/____' && !pattern.test(value)) {
		    	iCheck = false;
		    } else {
		    	iCheck = true;
		    }
		}
	    return iCheck;
	 }
};

/*== GET NGÀY KHI BIẾT THÁNG VÀ NĂM ==*/
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

/*== GET NGÀY HỢP LỆ ==*/
function checkDayInvalid(ngay) {
	var dateCurrently = new Date();		
	var arrayLookup = { '01' : 31,'03' : 31, 
			            '04' : 30,'05' : 31,
			            '06' : 30,'07' : 31,
			            '08' : 31,'09' : 30,
			            '10' : 31,'11' : 30,'12' : 31
			           };
	var bool = false;
	var strDay = ngay.split("/")[0];
	var strMonth = ngay.split("/")[1];
	var strYear = ngay.split("/")[2];
	if(strMonth == 2 && strYear > 1000) {
		if(strDay > 0 && strDay <= daysInMonth(strMonth,strYear))
			bool = true;
	} else {
		$.each(arrayLookup,function(index, value) {
			if(strMonth == index) {
				if(strDay > 0 && strDay <= value) {
					if(strYear >=1000 ) {
						bool = true;
						$('#endDate').removeAttr('disabled');
					}
				}
				return false;	
			}				
		});
	}
	return bool;
}