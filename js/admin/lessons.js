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
		event.preventDefault();
        alert("form submit");
		var data = JSON.stringify({'vendor': {'name': 'test', 'description': 'a good company', 'tags':['foo', 'bar']}});
		
		//iterate through table
	var columns = $('#myTable thead th').map(function() {
	  // This assumes that your headings are suitable to be used as
	  //  JavaScript object keys. If the headings contain characters 
	  //  that would be invalid, such as spaces or dashes, you should
	  //  use a regex here to strip those characters out.
	  return $(this).text();
		});

		
		var tableObject = $('#myTable tbody tr').map(function(i) {
		  var row = {};
		 
		  // Find all of the table cells on this row.
		  $(this).find('td').each(function(i) {
			// Determine the cell's column name by comparing its index
			//  within the row with the columns list we built previously.
			var rowName = columns[i];
		 
			// Add a new property to the row object, using this cell's
			//  column name as the key and the cell's text as the value.
			row[rowName] = $(this).text();
		  });
		 
		  // Finally, return the row's object representation, to be included
		  //  in the array that $.map() ultimately returns.
		  return row;
		 
		// Don't forget .get() to convert the jQuery set to a regular array.
		}).get();
		
		
		
		jsonTable = JSON.stringify(tableObject);
		alert("tableObject:" + jsonTable);
		
		
		alert(data);
		$.ajax({
             type: 'POST',
			 url:'/lessons',
             data: jsonTable,
			 dataType: 'json',
			 contentType:'application/json; charset=utf-8',
             success: function(response) {
				alert("Success" + response)
             },error: function(response){
				alert("Error with json post" + response);
			 
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