$(document).ready(function() {
	var token = $("meta[name='_csrf']").attr("content");
	 var header = $("meta[name='_csrf_header']").attr("content");
	 $(document).ajaxSend(function(e, xhr, options) {
	  xhr.setRequestHeader(header, token);
	 });
	
	$('#side-menu').find('.active').removeClass('active');
	$('#WorklifeSystemManager').addClass('active');
	
	$('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green'
    });
	
	$('#roleCode').keypress(function(e) {    
	    if (!/[a-zA-Z-]/.test(String.fromCharCode(e.which)) || e.which === 32)
	        return false;
	});
	
	$('input[name*="checkAll"]').on('ifChecked ifUnchecked', function() {
		var $element = $(this);
		var idDiv = $element.attr('id').replace('checkAll_', '');
		$.each($('#' + idDiv + ' input[type=checkbox]').filter('[name!="checkAll"]'), function(index, element) {
			if ($element.is(':checked'))
				$(element).iCheck('check');
			else
				$(element).iCheck('uncheck');
		});
	});
	
	$("#createGroupRole").validate({
		rules: {
			roleName: {
				required: true
			},
			roleDescription: {
				required: true
			},
			roleCode: {
				required: true
			}
		},
		messages: {
			roleName: {
				required: multiLanguage.name
			},
			roleDescription: {
				required: multiLanguage.description
			},
			roleCode: {
				required: multiLanguage.code
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
	
	$('#roleCode').on('keyup', function() {
		var roleCode = $('#roleCode').val();
		$('#roleCode-errorcon').remove();
		$('#roleCode').removeAttr('style');
		$.ajax({
			url : url + "worklife/manager/role/json/checkExistRole.do",
			type : 'POST',
			contextType : "aplication/json;charset=utf-8",
			dataType : "json",
			data : {
				roleCode 	:	roleCode
			},
			success : function(jSon) {
				var message = jSon.message;
				var ok = jSon.ok;
				if (ok == false) {
					$('#roleCode-errorcon').remove();
					$('#roleCode').removeAttr('style');
				} else {
					if (ok != null) {
						var htmlContain = '<label id="roleCode-errorcon" class="error" for="areaqh" style="display: inline-block;">'+multiLanguage.exsit+'</label>';
						$('#roleCode').after(htmlContain);
						$('#roleCode').css("border","1px dotted #cc5965");
					}
				}
			},
			error : function(jSon) {
				$('#roleCode-errorcon').remove();
				$('#roleCode').removeAttr('style');
			}
		});
	});
});

function submitForm() {
	if (!$('#createGroupRole').valid()) {
		$("#createGroupRole").validate().focusInvalid();
		return;
	}
	
	var listRoleId = [];
	$.each($('input[type=checkbox]').filter('[name!="checkAll"]'), function(index, element) {
		if ($(element).is(':checked')) {
			listRoleId.push($(element).val());
		}
	});
	
	$('#permissionId').val(listRoleId.join(','));
	document.createGroupRole.submit();
}