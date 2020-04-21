var worklifeAdminUtil = {
	numericInputById: function(inputName){
		$('#' + inputName).keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 
					|| (e.keyCode == 65 && e.ctrlKey === true) 
					|| (e.keyCode >= 35 && e.keyCode <= 39)) {
	           return;
	        }
			
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))) {
	        	if((e.keyCode < 96 || e.keyCode > 105))
	            	e.preventDefault();
	        }
	    });
	},
	numericInputByClass: function(inputClassName){
		$('.' + inputClassName).keydown(function(e) {
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 
					|| (e.keyCode == 65 && e.ctrlKey === true) 
					|| (e.keyCode >= 35 && e.keyCode <= 39)) {
	           return;
	        }
			
	        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))) {
	        	if((e.keyCode < 96 || e.keyCode > 105))
	            	e.preventDefault();
	        }
	    });
	},
	
	notAllowSpaceInputById: function(inputName){
		$('#' + inputName).keypress(function(e) {
		    if(e.which === 32) 
		        return false;
		});
	},
	
	notAllowSpaceInputByClass: function(inputClassName){
		$('.' + inputClassName).keypress(function(e) {
		    if(e.which === 32) 
		        return false;
		});
	},
	
	loadDistrictById: function(id, showDistrictText, hiddenDistrictId, cityId, isAround, language) {
		if(id == '' || showDistrictText == '')
			return;
		var selector = $('#' + id);
		if(cityId == '')
			if(isAround == '' || isAround == undefined || isAround == false) {
				var html = '<li><a id="-1"><span class="pull-left">' + language.nodata + '</span><span class="pull-right _ds"></span></a></li>';
				selector.html(html);
				return;
			}
		
		var html = '<li><a id="0" name="ahChoiceDistrict" text="' + language.arround + '"><span class="pull-left">Tìm quanh đây</span><span class="pull-right _ds"></span></a></li>';
		$.ajax({
			url: language.url + 'worklife/homepage/yt01/getDistrict.do',
			type: 'POST',
			data: {cityId: cityId},
			success: function(data) {
				if(data != null && data.length > 0) {
					$.each(data, function(index, value) {
						html += '<li><a id="' + value.idQuan + '" name="ahChoiceDistrict" text="' + value.tenQuan + '"><span class="pull-left">' + value.tenQuan + '</span><span class="pull-right _ds">' + value.numberOfFacilities + '</span></a></li>';
					});
				}
				selector.html(html);
				$('#' + showDistrictText).text(language.location);
				$('#' + hiddenDistrictId).val('-1');
			},
			error: function() {
				 swal({
				       title: language.errorProcess,
				       text: language.labelSelectDistrictError,
				       type: 'error'
				 });
			}
		});
	}
};