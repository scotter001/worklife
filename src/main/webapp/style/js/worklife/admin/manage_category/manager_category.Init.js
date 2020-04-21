/*
 * Copyright (c) 2017.
 * Author : Phat Thinh
 */

$(document).ready(function(){
    utils.csrfInject();
    managerCategory.init();
    utils.initNotifyMessageBox();
    utils.initIntegerNumberRule();
});