var text = document.getElementsByClassName("text")[0];
var ps = text.getElementsByTagName("p");

var note = 1
var p = text;
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


var p = text;
var output = "";
var t= p.innerHTML;
var chapterStartIndex = 0;
var chapterEndIndex;
var titleIndex = p.innerHTML.indexOf("<h1");

chapterStartIndex = p.innerHTML.indexOf("</h1>")+5

output += p.innerHTML.substring(0,chapterStartIndex);
var lol = 0;
while(chapterStartIndex <p.innerHTML.length && lol<50)
{
	var chapterLength = p.innerHTML.substr(chapterStartIndex).indexOf("<h2",3);

	console.log(chapterLength);
	if(chapterLength == -1)  
	{
		//last chapter
		chapterEndIndex = p.innerHTML.length-1;
		output += "<div class='chapter'>"+t.substring(chapterStartIndex,chapterEndIndex)+"</div>";
		break;
	}else
	{
		chapterEndIndex = chapterStartIndex + chapterLength;
		output += "<div class='chapter'>"+t.substring(chapterStartIndex,chapterEndIndex)+"</div>";
		chapterStartIndex = chapterEndIndex;
	}

		

	
	lol++;
}
p.innerHTML = output;


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

var ids = [];
var menuAs = [];

function layoutNotes(){
	var lastTop = 0;
	var leftNotes = notes.getElementsByTagName("div");
	var noteNb = 0;
	console.log("in");
		var spans = text.getElementsByTagName("span");

		spans = Array.prototype.slice.call(spans,0).filter(function(e){
			if(e.className.indexOf("imgAuthor") == -1)
			{
				return true;
			}
			return false;
		})

		for (var j = 0; j < spans.length; j++) {
			//console.log(j);
			
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

function whenLoaded(){
	console.log("in");
	document.body.style.display ="block";
	Array.prototype.push.apply(ids,text.getElementsByTagName("h1"));
	 Array.prototype.push.apply(ids,text.getElementsByTagName("h2"));
	 
	Array.prototype.push.apply(menuAs,document.getElementsByClassName("thesisMenu")[0].getElementsByTagName("a"));
	


	layoutNotes();


	for (var i = 0; i < noteCouples.length; i++) {
		(function(i){
			var couple = noteCouples[i];


			function coupleOver(){
				if(couple[0].className.indexOf("fullOpacity") == -1)
				{
					couple[1].className += " bigNote";
				}

				for (var j = 0; j < ps.length; j++) {
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
						noteCouples[k][0].className += " veryDimNote";
					}
				};
			}

			function coupleOut(){
				couple[0].className = "leftNote";
				couple[1].className = "note";

				for (var i = 0; i < ps.length; i++) {
					ps[i].className = ps[i].className.replace(/\bveryDimText\b/,'');
					ps[i].className= ps[i].className.replace(/\bhalfColorText\b/,'');
					
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

function scroll(){
	 var scrollValue = document.documentElement.scrollTop || document.body.scrollTop;
	 var currentChapter;
	 for (var i = 0; i < ids.length; i++) {
	 	var current = ids[i];
	 	if(scrollValue > ids[i].offsetTop)
	 	{
	 		console.log(i);
	 		currentChapter = ids[i];
	 			for (var j = 0; j < menuAs.length; j++) {
	 				currentA = menuAs[j];

	 				if(currentA.href.indexOf(current.id)>-1)
	 				{
	 					if(currentA.className.indexOf("selected") == -1)
	 					{
	 						currentA.className += " selected";
	 					}
	 				}
	 			};
	 	}else{
	 		for (var j = 0; j < menuAs.length; j++) {
	 			currentA = menuAs[j];
	 			if(currentA.href.indexOf(current.id) > -1)
	 			{
	 				currentA.className = currentA.className.replace(/\bselected\b/,'');
	 			}
	 		};
	 	}
	 };
	 if(currentChapter)
	 {
	 	 for (var j = 0; j < menuAs.length; j++) {
 			currentA = menuAs[j];
 			if(currentA.href.indexOf(currentChapter.id) > -1)
 			{
 				if(currentA.className.indexOf("current") == -1)
	 					{
	 						currentA.className += " current";
	 					}
 			}else
 			{
 				currentA.className = currentA.className.replace(/\bcurrent\b/,'');
 			}
 		};
	 }
	

}

var img = document.getElementsByTagName("img");

for (var i = 0; i < img.length; i++) {
	(function(i){
		img[i].onload = layoutNotes;
	})(i)
	
};

window.onload = whenLoaded();
window.onscroll = scroll;
