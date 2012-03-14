/* 
* Retrieve all calendars 
*/

var calendars;

function getCalendars(name, start, end, comment, location)
{
	// Create the calendar service object
	var calendarService = new google.gdata.calendar.CalendarService('SkedjoolMi');
	
	// The default "allcalendars" feed is used to retrieve a list of all 
	// calendars (primary, secondary and subscribed) of the logged-in user
	var feedUri = 'http://www.google.com/calendar/feeds/default/allcalendars/full';
	
	
	var calendars = new Array();
	// The callback method that will be called when getAllCalendarsFeed() returns feed data
	var callback = function(result) {
	
	  // Obtain the array of CalendarEntry
	  var entries = result.feed.entry;
	  
	  for (var i = 0; i < entries.length; i++) {
	    var calendarEntry = entries[i];
	    var calendarID = calendarEntry.id.getValue();
		
		calendars.push(formatID(calendarID));
	  }
	  test(calendars, name, start, end, comment, location);
	}
	
	// Error handler to be invoked when getAllCalendarsFeed() produces an error
	var handleError = function(error) {
	  alert('getCals: ' + error);
	}
	
	// Submit the request using the calendar service object
	calendarService.getAllCalendarsFeed(feedUri, callback, handleError);
}

function formatID(ID)
{
	var temp = ID.replace(/%40/g,"@");
	var t2 = temp.split("/");
	var output = t2[t2.length-1];
	
	output = "http://www.google.com/calendar/feeds/" + output + "/private/full";
	
	return output;
}
