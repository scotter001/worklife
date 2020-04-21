$(document).ready(function() {
	$('#side-menu').find('.active').removeClass('active');
	$('#WorklifeSystemManager').addClass('active');
	
	$('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green'
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
});

function submitForm() {
	var listRoleId = [];
	$.each($('input[type=checkbox]').filter('[name!="checkAll"]'), function(index, element) {
		if ($(element).is(':checked')) {
			listRoleId.push($(element).val());
		}
	});
	$('#permissionId').val(listRoleId.join(','));
	document.createGroupRole.submit();
}