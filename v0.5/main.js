var skjq={};
skjq.query=jQuery.noConflict(true);
if ((document.URL).indexOf("mail.google.com")!==-1)
{
	var iframe = document.getElementById("canvas_frame");
	var iframeDoc = iframe.contentDocument;
	var frameDocBody = iframeDoc.body;
	skjq('body').append('<script type="text/javascript">(function(l){
	  var res = document.createElement('SCRIPT');
	  res.type = 'text/javascript';
	  res.src = l;
	  document.getElementsByTagName('head')[0].appendChild(res);})'"+chrome.extension.getURL("main.js");</script>');
////////////////////////////////////////////////////////////	

	skjq(frameDocBody).on("click",'a[href*="http://www.google.com/calendar/event?action=TEMPLATE"]', function(event){
		event.preventDefault();
		SKDMmain(this);		
	});
	skjq(frameDocBody).on("click",'a[href*="https://www.google.com/calendar/event?action=TEMPLATE"]', function(event) {
		event.preventDefault();
		SKDMmain(this);
	});
	
	skjq(frameDocBody).on("click",'a[href*="http%3A%2F%2Fwww.google.com%2Fcalendar%2Fevent%3Faction%3DTEMPLATE"]', function(event) {
		event.preventDefault();
		SKDMmain(this);
	});
}

skjq('body').on("click",'a[href*="http://www.google.com/calendar/event?action=TEMPLATE"]', function(event) {
	event.preventDefault();
	SKDMmain(this);
});
skjq('body').on("click",'a[href*="https://www.google.com/calendar/event?action=TEMPLATE"]', function(event) {
	event.preventDefault();
	SKDMmain(this);
});
skjq('body').on("click",'a[href*="http%3A%2F%2Fwww.google.com%2Fcalendar%2Fevent%3Faction%3DTEMPLATE"]', function(event) {
	event.preventDefault();
	SKDMmain(this);
});

    //google.setOnLoadCallback(prep);
    //google.load("gdata", "1");

	var input;

    function SKDMmain(input) {
		var scope = "http://www.google.com/calendar/feeds";
		if (!google.accounts.user.checkLogin(scope))
		{
			google.accounts.user.login();
		}
		else
		{
			var calendars = getCalendars();
			var cleaned = cleanURL(input);
			//send the name, start, end, location, and comments along
			getCalendars(cleaned[0], cleaned[1], cleaned[2], cleaned[3], cleaned[4]);
		}
    }

	function cleanURL(inputURL)
	{ 
		var t2 = inputURL.replace(/=&/g,"=%20&")
		var temp = t2.split('&');
		//0 == garbage --> trash
		//1 == title --> 0
		//2 == dates (need another split for start/end) --> 1,2
		//3 == comment --> 3
		//4 == location
		//5 == guests
		//6 == privacy
		//7 == web address
		//8 == web name
		var output = new Array();
		output[0]=(temp[1].split("="))[1];
		output[1]=((temp[2].split("="))[1].split("/"))[0];
		output[2]=((temp[2].split("="))[1].split("/"))[1];
		output[3]=(temp[3].split("="))[1];
		output[4]=(temp[4].split("="))[1];
		output[5]=(temp[5].split("="))[1];

//		output[6]=(temp[6].split("="))[1];
//		output[7]=(temp[7].split("="))[1];
//		output[8]=((temp[8].split("="))[1].split(":"))[1];
//


		for(var i=0;i<output.length;i++)
		{
			output[i] = output[i].replace(/%20/g," ");
			output[i] = output[i].replace(/%2F/g,"/");
		}

		output[1]=dateCleaner(output[1]);
		output[2]=dateCleaner(output[2]);

		return output;
	}

	function dateCleaner (dateString)
	{
		var output = dateString.slice(0,4) + "-" + dateString.slice(4,6)+"-"+
		   dateString.slice(6,11) + ":" + dateString.slice(11,13)+":"+
		   dateString.slice(13,15)+".000"+dateString.slice(15);

		return output;
	}


	function prep(linkHref)
	{
		var googleTemplate = "www.google.com/calendar/event?action=TEMPLATE";
		for(var i=0;i<x.length;i++)
		{
			if(x[i].href.substring(7,52)==googleTemplate)
			{
				input = x[i].href;
				x[i].addEventListener("click",SKDMmain,false);
				x[i].addEventListener("click",preventDef,false);
				//x[i].href="javascript:SKDMmain()";
				//x[i].onclick="SKDMmain();return false"
				//x[i].target="";
			}

		}
	}

	function logout()
	{
		google.accounts.user.logout();
	}
    