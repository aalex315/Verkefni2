$(document).ready(function() {
	$.ajax({
		'url': 'http://apis.is/concerts',
		'type': 'GET',
		'dataType': 'json',
		'success': function(response){
			// console.log(response);

			// Gets the number of objects
			var responseLength = Object.keys(response.results).length;
			// Goes through every object and displays value
			for(var i = 0; i < responseLength; i++)
			{
				var cleanDate = response.results[i].dateOfShow;
				var cutDate = cleanDate.substring(0,10);

				var data = "<li date='" + response.results[i].dateOfShow + "'><div class='row idfk'><div class='large-8 columns'><span class='title'>" + response.results[i].eventDateName + "</span><br><span class='idk'>" + response.results[i].name + "</span><br><span class='idk'>" + response.results[i].eventHallName + "</span><br><span class='date'>" + cutDate + "</span><span class='group'>" + response.results[i].userGroupName + "</span></div><div class='large-4 columns'><img src='" + response.results[i].imageSource + "'></div></div></li>";

				$(".mainStuff").append(data);
			}
		}
	});
	// Sets value of datePicker
	$("#datefrom").datepicker({dateFormat: 'yy-mm-dd'});
	$("#dateto").datepicker({dateFormat: 'yy-mm-dd'});
});

function getConcerts(){
	// Emptys the list
	$(".mainStuff").empty();
	// Gets data from input
	var dateFrom = $("#datefrom").val();
	var dateTo = $("#dateto").val();
	$.ajax({
		'url': 'http://apis.is/concerts',
		'type': 'GET',
		'dataType': 'json',
		'success': function(response){
			console.log(response);
			// Gets the number of objects
			var responseLength = Object.keys(response.results).length;

			for(var i = 0; i < responseLength; i++)
			{
				// Puts the date from json into right format
				var cleanDate = response.results[i].dateOfShow;
				var cutDate = cleanDate.substring(0,10);

				// checks if object is within date range
				if (new Date(cutDate) >= new Date(dateFrom) && new Date(cutDate) <= new Date(dateTo)) {
					var data = "<li date='" + response.results[i].dateOfShow + "'><div class='row idfk'><div class='large-8 columns'><span class='title'>" + response.results[i].eventDateName + "</span><br><span class='idk'>" + response.results[i].name + "</span><br><span class='idk'>" + response.results[i].eventHallName + "</span><br><span class='date'>" + cutDate + "</span><span class='group'>" + response.results[i].userGroupName + "</span></div><div class='large-4 columns'><img src='" + response.results[i].imageSource + "'></div></div></li>";
				}
				else if(new Date(cutDate) >= new Date(dateTo)){
					// End the for loop instead of going through the rest of the objects when it detects the date is more the input date
					break;
				}
				$(".mainStuff").append(data);
			}
		}
	});
}