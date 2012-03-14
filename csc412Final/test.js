/*
* Retrieve events with a date query
*/ 

function test(name, start, end, comment, location){
	// Create the calendar service object
	var calendarService = new google.gdata.calendar.CalendarService('SkedjoolMi');

	// The default "private/full" feed is used to retrieve events from 
	// the primary private calendar with full projection 
	var feedUri = 'http://www.google.com/calendar/feeds/default/private/full';
	
	// Create a CalendarEventQuery, and specify that this query is 
	// applied toward the "private/full" feed
	var query = new google.gdata.calendar.CalendarEventQuery(feedUri);
	
	var title = name;

	// Create and set the minimum and maximum start time for the date query
	var startMin = google.gdata.DateTime.fromIso8601(start);
	var startMax = google.gdata.DateTime.fromIso8601(end);
	query.setMinimumStartTime(startMin);
	query.setMaximumStartTime(startMax);
	
	// The callback that will be called when getEventsFeed() returns feed data
	var callback = function(root){
		// Obtain the array of matched CalendarEventEntry
		var eventEntries = root.feed.getEntries();
		
		// If there is matches for the date query
		if (eventEntries.length > 0) {
			for (var i = 0; i < eventEntries.length; i++) {
				var event = eventEntries[i];
				// Print the event title of the matches
				var result = confirm('It appears you currently have ' + event.getTitle().getText() + ' scheduled at that time. Would you like to cancel it and re-schedule the current event in its place?');
				
				if (result) {
					event.deleteEntry(function(res){}, handleError);
					
					update(title, startMin, startMax, comment, location);
										
				}
			}
		}
		else {
			// No match is found for the date query
			var result = confirm('You\'re free at this time. Would you like to schedule the event?');
			
			if (result) {
				
				update(title, startMin,startMax, comment, location);

			}
			else {
				alert("Event was not added");
			}
		}
	}
	
	// Error handler to be invoked when getEventsFeed() produces an error
	var handleError = function(error){
		alert('Test: ' + error);
	}
	
	// Submit the request using the calendar service object. Notice the CalendarEventQuery 
	// object is passed in place of the feed URI
	calendarService.getEventsFeed(query, callback, handleError);
}