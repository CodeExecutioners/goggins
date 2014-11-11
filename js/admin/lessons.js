function AddDropInLesson(){ 
$("#dropInLessons tbody").append(
 "<tr>"+
 "<td><input type='text'/></td>"+
 "<td><input type='text'/></td>"+
 "<td><input type='text'/></td>"+
 "<td><input type='text'/></td>"+
 "<td><input type='text'/></td>"+
 "<td><input type='text'/></td>"+
 "<td><button class='btnSave'value='save'>Save</button><button class='btnDelete'value='Delete'>Delete</button></td>"+
 "</tr>");
 $(".btnSave").bind("click", Save);
 $(".btnDelete").bind("click", Delete); 

};

function AddGroupLesson(){ 
$("#groupLessons tbody").append(
 "<tr>"+
 "<td><input type='text'/></td>"+
 "<td><input type='text'/></td>"+
 "<td><input type='text'/></td>"+
 "<td><input type='text'/></td>"+
 "<td><input type='text'/></td>"+
 "<td><input type='text'/></td>"+
 "<td><button class='btnSave'value='save'>Save</button><button class='btnDelete'value='Delete'>Delete</button></td>"+
 "</tr>");
 $(".btnSave").bind("click", Save);
 $(".btnDelete").bind("click", Delete); 

};


function Save(){ 

var par = $(this).parent().parent(); //tr 
 var tdType = par.children("td:nth-child(1)");
 var tdCity = par.children("td:nth-child(2)");
 var tdDate = par.children("td:nth-child(3)");
 var tdTime = par.children("td:nth-child(4)");
 var tdLocation = par.children("td:nth-child(5)");
 var tdCost = par.children("td:nth-child(6)");
 var tdButtons = par.children("td:nth-child(7)");
 tdType.html(tdType.children("input[type=text]").val()); 
 tdCity.html(tdCity.children("input[type=text]").val());
 tdDate.html(tdDate.children("input[type=text]").val());
 tdTime.html(tdTime.children("input[type=text]").val());
 tdLocation.html(tdLocation.children("input[type=text]").val());
 tdCost.html(tdCost.children("input[type=text]").val());
 tdButtons.html("<button class='btnDelete'value='Delete'>Delete</button><button class='btnEdit'value='Edit'>Edit</button>");
 $(".btnEdit").bind("click", Edit);
 $(".btnDelete").bind("click", Delete);
 }; 

 
 function Edit(){
 
 var par = $(this).parent().parent(); //tr 
 
 var tdType = par.children("td:nth-child(1)");
 var tdCity = par.children("td:nth-child(2)");
 var tdDate = par.children("td:nth-child(3)");
 var tdTime = par.children("td:nth-child(4)");
 var tdLocation = par.children("td:nth-child(5)");
 var tdCost = par.children("td:nth-child(6)");
 var tdButtons = par.children("td:nth-child(7)");
 tdType.html("<input type='text' id='txtType' value='"+tdType.html()+"'/>");
 tdCity.html("<input type='text' id='txtCity' value='"+tdCity.html()+"'/>");
 tdDate.html("<input type='text' id='txtDate' value='"+tdDate.html()+"'/>");
 tdTime.html("<input type='text' id='txtTime' value='"+tdTime.html()+"'/>");
 tdLocation.html("<input type='text' id='txtLocation' value='"+tdLocation.html()+"'/>");
 tdCost.html("<input type='text' id='txtCost' value='"+tdCost.html()+"'/>");
 tdButtons.html("<button class='btnSave'value='save'>Save</button>");
 $(".btnSave").bind("click", Save);
 $(".btnEdit").bind("click", Edit);
 $(".btnDelete").bind("click", Delete); 
 };

 function Delete(){
 var par = $(this).parent().parent(); //tr
 par.remove(); 
 /*Figure out how to delete
 var tdType = par.children("td:nth-child(1)");
 var tdCity = par.children("td:nth-child(2)");
 tdType.html(tdType.children("input[type=text]").val()); 
 tdCity.html(tdCity.children("input[type=text]").val());
 tdLocation.html(tdLocation.children("input[type=text]").val());
 */
 
 }; 

 

$(document).ready(function() {
//var table = $('#lessonsDropIn').DataTable();



$(function(){ //Add, Save, Edit and Delete functions code
 $(".btnEdit").bind("click", Edit); 
 $(".btnDelete").bind("click", Delete);
 $(".btnSave").bind("click", Save);
 $("#btnAddDropInLesson").bind("click", AddDropInLesson);
 $("#btnAddGroupLesson").bind("click", AddGroupLesson);
 });
 

 
$('#dropInLessonsSaveTable').on('click', function (event) {
		event.preventDefault();
        
		
		//iterate through table
	var columns = $('#dropInLessons thead th').map(function() {
	  // This assumes that your headings are suitable to be used as
	  //  JavaScript object keys. If the headings contain characters 
	  //  that would be invalid, such as spaces or dashes, you should
	  //  use a regex here to strip those characters out.
	  return $(this).text();
		});

		
		var tableObject = $('#dropInLessons tbody tr').map(function(i) {
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
		
		
		
		$.ajax({
             type: 'POST',
			 url:'/adminLessons',
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
	
	
	
	
	
	
	
 
$('#groupLessonsSaveTable').on('click', function (event) {
		event.preventDefault();
        
		
		//iterate through table
	var columns = $('#groupLessons thead th').map(function() {
	  // This assumes that your headings are suitable to be used as
	  //  JavaScript object keys. If the headings contain characters 
	  //  that would be invalid, such as spaces or dashes, you should
	  //  use a regex here to strip those characters out.
	  return $(this).text();
		});

		
		var tableObject = $('#groupLessons tbody tr').map(function(i) {
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
	
	
});