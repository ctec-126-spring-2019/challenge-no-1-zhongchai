// api key: Eo5DUhuaw)xWf8TWsajbyg((

/**
 *  Info to grab: 
 *  tags, is_answered, view_count, answer_count, link, title
 *  owner: display_name, profile_image, link
 *  
 *  data.items[i].tags
 *  data.items[i].owner[j].display_name
 */

// load the code when page is finished loading
$(document).ready(function(){
	// call the ajax with the api url, and display results if successful
	$.ajax({
		url: "https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow&api-key=Eo5DUhuaw)xWf8TWsajbyg((",
		method: "GET"
	})
	.done(function(data){
		data = displayResults(data);
		$('#api-content').html(data);
	})
	.fail(function(){
		alert('Something went wrong when calling the API');
	});
});

function displayResults(data){
    var output = "<div>";
    
	var p = "<p>"; // paragraph tag
    var cp = "</p>"; // closing paragraph tag
    
	for (var i=0 ; i < data.items.length ; i++){
        output += "<div class='entry'>";
        
        // displays the title with link
        output += `${p}<a href='${data.items[i].link}' target='_blank'><span class='bigtitle'>${data.items[i].title}</span></a>${cp}`;

        var isAnswered = data.items[i].is_answered;

        if (isAnswered) {
            output += p + "<span class='answered'>Answered!</span>" + cp;
        } else {
            output += p + "<span class='unanswered'>Not answered yet!</span>" + cp;
        }

        output += p + "<span class='title'>View Count: </span>" + data.items[i].view_count + cp;

        output += p + "<span class='title'>Answer Count: </span>" + data.items[i].answer_count + cp;

        output += p + "<span class='title'>Score: </span>" + data.items[i].score + cp;

    
        output += p + "<span class='title'>Tags: </span>";
		// loop through tag array to display all the tags
		for (var j = 0 ; j < data.items[i].tags.length ; j++){
			// concatenate each tag into the output string
			output += data.items[i].tags[j] + " ";
		}
		output += cp;
        // end tags

        output += p + "<span class='title'>User info: </span>" + cp;
		// loop through tag array to display all the tags\
            // concatenate each tag into the output string
            output += `${p}<a href='${data.items[i].owner.link}' target='_blank'>${data.items[i].owner.display_name}</a>${cp}`;
            output += p + "<img src='" + data.items[i].owner.profile_image + "'>" + cp;
		
        // end tags

        // output += p + "<span class='title'>User info: </span>";
		// // loop through tag array to display all the tags
		// for (var j = 0 ; j < data.items[i].owner.length ; j++){
        //     // concatenate each tag into the output string
        //     output += p + "<img src='" + data.items[i].owner[j].profile_image + "'>" + cp;
        //     output += `${p}<a href='${data.items[i].owner[j].link}' target='_blank'>${data.items[i].owner[j].display_name}</a>${cp}`;
		// }
		// output += cp;
    
        
        output += "</div>";
    }
        return output;
}

	

