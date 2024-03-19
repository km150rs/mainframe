(function(global, $, factory) {
	if (typeof define === "function" && define.amd) {
		define(function() {
			return factory($, global);
		});
	} else if (typeof exports !== "undefined") {
		module.exports = factory($, global);
	} else {
		global.datatableEdit = factory($, global);
	}
})(window, jQuery, function($, window) {

var keyCount = 0;
var editPool = [];
var bodyEvent = null;

function init(editor) {
	editor.originCell = null;
	editor.$editingCell = null;
	editor.editingCellIndex = null;
}

function allCancel() {
	for(var i = 0; i < editPool.length; i++) {
		editPool[i].cancel();
	}
}

function keyup(e, editor) {
	e.preventDefault();
	e.stopPropagation();

	switch(e.key) {
		case 'Enter':
			key_blur(e,editor);
			break;
		case 9:
			cellClick(e,editor);
			break;
		case 'Escape':
			// editor.$editingCell.blur();
			allCancel();
			break;
	}
}
function key_blur(e, editor) {
	e.preventDefault();
	e.stopPropagation();
	var prev = editor.originCell.value;
	var cur = editor.$editingCell.val();
	
	if(editor.originCell.type != typeof cur) {
		if(editor.originCell.type == 'number')
			cur = parseInt(cur, 10);
	}
	try {
			editor.originCell.data(cur);			
	} catch ( e){
			return;
	}		
	

	var colDef = editor.column[editor.editingCellIndex.col];
	colDef.onEdited && colDef.onEdited(prev, cur, editor.originCell.cell.index(), editor.originCell.cell);
	editor.onEdited && editor.onEdited(prev, cur, editor.originCell.cell.index(), editor.originCell.cell);
	init(editor);			
}
function cellClick(e, editor) {
	e.preventDefault();
	e.stopPropagation();


	var idx = editor.table.cell(this).index();

	if(editor.editingCellIndex && editor.editingCellIndex.col == idx.column && editor.editingCellIndex.row == idx.row) {
		return;
	}
	allCancel();

	if(!editor.column[idx.column]) {
		return;
	}
	var colDef = editor.column[idx.column];
	//console.log(colDef.maxlength);
	
	editor.originCell = {
		cell : editor.table.cell(this)
	};
	editor.originCell.value = editor.originCell.cell.data();
	editor.originCell.type = typeof editor.originCell.value;
	editor.originCell.data = editor.originCell.cell.data;

	editor.originCell.data('<input type="text" id="' + editor.labelID + '" value="" class="inputEditerText" maxlength="'+ colDef.maxlength + '"/>');
	editor.$editingCell = $('#' + editor.labelID);
	editor.$editingCell.focus();
	editor.$editingCell.val(editor.originCell.value);
	editor.$editingCell.select();
	editor.editingCellIndex = {
		col : idx.column,
		row : idx.row
	};
}


function editable(option) {
	if(!option.dataTable) {
		throw new Error('dataTable is undefined');
	}
	if(!option.columnDefs) {
		throw new Error('columnDefs is undefined');
	}

	var editor = {
		table : option.dataTable,
		labelID : 'datatable_editing_cell_' + (keyCount++),
		column : {},
		onEdited : option.onEdited
	};
	
	init(editor);

	for(var i = 0; i < option.columnDefs.length; i++) {
		var columnIdx = option.columnDefs[i].targets;
		editor.column[columnIdx] = option.columnDefs[i]
	}

	option.eventTarget = option.eventTarget || 'tbody td';

	editor.table.on('click', option.eventTarget, function(e) {
		cellClick.call(this, e, editor);
	}).on('keyup', '#' + editor.labelID, function(e) {
		keyup.call(this, e, editor);
	}).on('blur', '#' + editor.labelID, function(e) {
		key_blur.call(this, e, editor);
	});

	function cancel() {
		if(editor.$editingCell == null) {
			return;
		}
		try {
			editor.originCell.data(editor.originCell.value);			
		} catch ( e){
			return;
		}
		init(editor);
	}

	editPool.push({
		cancel : cancel
	});

	if(!bodyEvent) {
		bodyEvent = allCancel;
		$('body').on('click', bodyEvent);
	}
	
}



return editable;

});