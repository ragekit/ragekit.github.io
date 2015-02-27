var text = document.getElementsByClassName("text")[0];

var ps = text.getElementsByTagName("p");

var note = 1


for (var i = 0; i < ps.length; i++) {
	var p = ps[i];
	var output = "";
	var t= p.innerHTML;
	var lastIndex = 0;
	var noteIndex = p.innerHTML.indexOf("["+note+"]");
	while(noteIndex >-1)
	{
		
		var noteEnd = noteIndex + note.toString().length + 2;
		output += t.substring(lastIndex,noteIndex)+"<span class='note'>"+t.substring(noteIndex,noteEnd)+"</span>";
		lastIndex = noteEnd;
		note++;
		noteIndex = p.innerHTML.indexOf("["+note+"]");
	}
	output += t.substr(lastIndex);
	p.innerHTML = output;
}

var notes = document.getElementsByClassName("notes")[0];

var notesText = notes.innerHTML;

function whenLoaded(){
	for (var i = 0; i < ps.length; i++) {
		var spans = ps[i].getElementsByTagName("span");
		for (var j = 0; j < spans.length; j++) {
			console.log(spans[j].offsetTop);
		}
	}
}




function wrapWithSpan(){


}

window.onload = whenLoaded;