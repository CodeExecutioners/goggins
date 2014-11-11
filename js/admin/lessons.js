
function AddDropInLesson(){ 
$("#dropInLessons tbody").append(
 "<tr id='None'>"+
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
 "<tr id='None'>"+
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
 tdButtons.html("<button class='btnEdit'value='Edit'>Edit</button><button class='btnDelete'value='Delete'>Delete</button>");
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
 var par = $(this).parent().parent(); //tr)
 var id = par.attr("id")
 var array  = {};
 var rowName = "ID";
 array[rowName] = id
 var json = JSON.stringify(array);
 //alert("DELETE JSON: " + json)
 json = "["+json+"]";
 //alert("New JSON" + json);
 var path='/deleteLessons';
		$.ajax({
             type: 'POST',
			 url:path,
             data: json,
			 dataType: 'json',
			 contentType:'application/json; charset=utf-8',
             success: function(response) {
				//alert("Success" + response)
				alert('redirecting...');
				window.location = '/adminLessons';
             },error: function(response){
				alert("Error with json post" + response);
			 
			}
			
			
		});
		return false;
	
	//postLessonsTable('#dropInLessons', path);
 };

 
 

 

function postLessonsTable(tableID, path){
    var keys = $(tableID +' tbody tr').map(function(i){
			id = this.id;
			return id;
	}).get()   
	
	
		
		//iterate through table
	var count = 0;
	var columns = $(tableID +' thead th').map(function() {
	  // This assumes that your headings are suitable to be used as
	  //  JavaScript object keys. If the headings contain characters 
	  //  that would be invalid, such as spaces or dashes, you should
	  //  use a regex here to strip those characters out.
	  count= count+1;
	  return $(this).text();
	  
	});
	
	columns[count-1] = "ID";
	
			$.each(columns, function( index, value ) {
				//alert( index + ": " + value );
			});
		
		var tableObject = $(tableID +' tbody tr').map(function(i) {
		  var row = {};

		 
		
		  var lastIndex = 0;
		  var id  = 0;
		  // Find all of the table cells on this row.
		  $(this).find('td').each(function(i) {
			// Determine the cell's column name by comparing its index
			//  within the row with the columns list we built previously.
			
				var rowName = columns[i];
				
				//alert("ID:" +id);
				// Add a new property to the row object, using this cell's
				//  column name as the key and the cell's text as the value.
				//alert("RowName: " + rowName)
				
				
				if(rowName == "ID"){
					row[rowName] =$(this).parent().attr("id");
				
				}else{
					row[rowName] =$(this).text();
				}
				
			
			
			
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
			 url:path,
             data: jsonTable,
			 dataType: 'json',
			 contentType:'application/json; charset=utf-8',
             success: function(response) {
				//alert("Success" + response)
				alert('redirecting...');
				window.location = '/adminLessons';
             },error: function(response){
				alert("Error with json post" + response);
			 
			}
			
			
		});
		return false;
		
	};
	
	



$(document).ready(function() {


$(function(){ //Add, Save, Edit and Delete functions code
 $(".btnEdit").bind("click", Edit); 
 $(".btnDelete").bind("click", Delete);
 $(".btnSave").bind("click", Save);
 $("#btnAddDropInLesson").bind("click", AddDropInLesson);
 $("#btnAddGroupLesson").bind("click", AddGroupLesson);
 });
 
 //post for the drop in table
 $('#dropInLessonsSaveTable').on('click', function (event) {
	event.preventDefault();
	path = '/adminLessons'
	postLessonsTable('#dropInLessons', path);
 });

 
 //post for the group lessons table
 $('#groupLessonsSaveTable').on('click', function (event) {
		event.preventDefault();
    path = '/adminLessons'
	postLessonsTable('#groupLessons', path);
 });   
 
 });

 
 
 


 