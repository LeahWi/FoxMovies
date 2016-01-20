﻿var app = angular.module('slider', ['ngAnimate','ui.bootstrap', 'dialogs.main'])
	.config(['dialogsProvider', function (dialogsProvider) {
	    dialogsProvider.useBackdrop('static');
	    dialogsProvider.useEscClose(false);
	    dialogsProvider.useCopy(false);
	    dialogsProvider.setSize('sm');
	}]);
