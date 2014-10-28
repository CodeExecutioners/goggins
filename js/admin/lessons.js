$(document).ready(function() {


var table = $('#lessonsDropIn').DataTable();



    $('#lessonsDropIn tbody').on( 'click', 'tr', function () {
		
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
 
    $('#lessonsFormSubmit').on('click', function (event) {
		event.preventDefault()
        alert("form submit")
		data = $('#myForm').serialize()
		alert("sending" + data);
		$.ajax({
             type: 'POST',
			 url: 'http://localhost:48080/lessons',
             data: data,
			 dataType: 'json',
             success: function(data) {
				alert("success")
             },error: function(response){
				alert("Error with json post" + JSON.stringify(response));
			 }     
		});
		return false;
		
	});
	
	$('#addRow').on( 'click', function () {
		
        table.row.add(
		['<input type="text"></input>',
		'<input type="text"></input>',
		'<input type="text"></input>',
		'<input type="text"></input>',
		'<input type="text"></input>',
		'<input type="text"></input>',
		'<button value="save">Save</button></td>']).draw();
		
 
    });
	
});