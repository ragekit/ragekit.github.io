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
		noteIndex = t.indexOf("["+note+"]");
	}
	output += t.substr(lastIndex);
	p.innerHTML = output;
}

var notes = document.getElementsByClassName("notes")[0];

var notesText = notes.innerHTML;

note = 1;

output = "";
var lastIndex = 0;
noteIndex = notesText.indexOf("["+note+"]");


var noteCouples = [];

while(noteIndex >-1)
{
	
	var noteEnd = noteIndex + note.toString().length + 2;
	
	output += "<div class='leftNote'>";
	output += notesText.substring(lastIndex,noteIndex)+"<span class='leftBullet'>"+notesText.substring(noteIndex,noteEnd)+"</span>";
	note++;
	noteIndex = notesText.indexOf("["+note+"]");

	var noteContent = notesText.substr(noteEnd);

	var startofNext = noteContent.indexOf("["+note+"]");

	if(startofNext > -1)
	{
		noteContent = noteContent.substring(0,startofNext-1);
	}

	var finalNoteContent ="";
	var noteContentIndex = 0;
	var maRegex = /(https?:\/\/[^ ]+)/g;
	var monTableau;
	
	while ((monTableau = maRegex.exec(noteContent)) !== null) {

		finalNoteContent += noteContent.substring(noteContentIndex,monTableau["index"]);
		finalNoteContent += "<a href='"+monTableau[0].substring(0,monTableau[0].length-1)+"'>Link</a>";
		noteContentIndex = maRegex.lastIndex;
	}

	finalNoteContent += noteContent.substr(noteContentIndex);

	output += finalNoteContent;
	output += "</div>";

	lastIndex = noteEnd + noteContent.length;

}
//output += notesText.substr(lastIndex);
notes.innerHTML = output;

function whenLoaded(){
	var lastTop = 0;
	var leftNotes = notes.getElementsByTagName("div");
	var noteNb = 0;
	for (var i = 0; i < ps.length; i++) {
		var spans = ps[i].getElementsByTagName("span");
		for (var j = 0; j < spans.length; j++) {
			
			
			if(spans[j].offsetTop > lastTop)
			{

				leftNotes[noteNb].style.top = spans[j].offsetTop + "px";
			}else{
				leftNotes[noteNb].style.top = lastTop + "px";
			}
			noteCouples.push([leftNotes[noteNb],spans[j]]);
			lastTop = parseInt(leftNotes[noteNb].style.top) + leftNotes[noteNb].clientHeight + 20;
			noteNb++;
		}
	}



	for (var i = 0; i < noteCouples.length; i++) {
		(function(i){
			var couple = noteCouples[i];


			function coupleOver(){
				console.log("i");
				console.log(couple[0].innerHTML);
				if(couple[0].className.indexOf("fullOpacity") == -1)
				{
					couple[0].className += " fullOpacity";
					couple[1].className += " bigNote";
				}

				for (var j = 0; j < ps.length; j++) {
					console.log(couple[1].parentNode, ps[j]);
					if(couple[1].parentNode != ps[j])
					{
						if(ps[j].className.indexOf("veryDimText") == -1)
						{
							ps[j].className += " veryDimText";
						}
					}else{
						if(ps[j].className.indexOf("halfColorText") == -1)
						{
							ps[j].className += " halfColorText";
						}
					}	
				}

				for (var k = 0; k < noteCouples.length; k++) {
					if(noteCouples[k][0] != couple[0])
					{
						noteCouples[k][0].className += " veryDimText";
					}
				};
			}

			function coupleOut(){
				couple[0].className = "leftNote";
				couple[1].className = "note";

				for (var i = 0; i < ps.length; i++) {
					ps[i].className = "";
					
				}

				for (var k = 0; k < noteCouples.length; k++) {
					if(noteCouples[k][0] != couple[0])
					{
						noteCouples[k][0].className =" leftNote";
					}
				};
			}

			couple[0].onmouseover = function(e){
				coupleOver();
			}

			couple[0].onmouseout = function(e){
				coupleOut();
			}

			couple[1].onmouseover = function(e){
				coupleOver();
			}

			couple[1].onmouseout = function(e){
				coupleOut();
			}

		})(i)	
	};

}




function wrapWithSpan(){


}

window.onload = whenLoaded;