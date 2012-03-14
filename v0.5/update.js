/*
 * Create a single event
 */ 

function update(title, start, end, comment, location)
{	
	// Create the calendar service object
	var calendarService = new google.gdata.calendar.CalendarService('SkedjoolMi');
	
	// The default "private/full" feed is used to insert event to the 
	// primary calendar of the authenticated user
	var feedUri = 'http://www.google.com/calendar/feeds/default/private/full';
	
	// Create an instance of CalendarEventEntry representing the new event
	var entry = new google.gdata.calendar.CalendarEventEntry();
	
	// Set the title of the event
	entry.setTitle(google.gdata.Text.create(title));
	//entry.setComments(google.gdata.Text.create(comment));
	
	// Create a When object that will be attached to the event
	var when = new google.gdata.When();
	var where = new google.gdata.Where();
	var summary = new google.gdata.Text();
	
	
	// Set the start and end time of the When object
	var startTime = start;
	var endTime = end;
	when.setStartTime(startTime);
	when.setEndTime(endTime);
	
	where.setLabel(location);
	where.setValueString(location);
	
	summary.setText(comment)
	// Add the When object to the event 
	entry.addTime(when);
	entry.addLocation(where);
	entry.setSummary(summary);
	
	// The callback method that will be called after a successful insertion from insertEntry()
	var callback = function(result){
		alert('Event created successfully.');
	}
	
	// Error handler will be invoked if there is an error from insertEntry()
	var handleError = function(error){
		alert('Update: ' + error);
	}
	
	// Submit the request using the calendar service object
	calendarService.insertEntry(feedUri, entry, callback, handleError, google.gdata.calendar.CalendarEventEntry);
}