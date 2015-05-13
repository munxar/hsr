/*################################################################################
	D E B U G
################################################################################*/

var debugModus = 0; // Debugmodus EIN = 1 || AUS = 0

function debug(txt)
{
	if(!debugModus || typeof(console) != "object") { return; }
	else { console.log(txt); }
}
debug("debugModus = true");



/*################################################################################
	$$$
################################################################################*/

// get Elements by Name

function $$$(obj)
{
	var obj = document.getElementsByName(obj);
	obj = (obj.length==1)?obj[0]:obj;
	return obj;
}


/*################################################################################
	F U N C T I O N S
################################################################################*/

/*################################################################################
	Login
################################################################################*/

window.addEvent('domready', function() {
	//create our Accordion instance

	if ($('navTop_intern')){
	  $('navTop_intern').addEvent('click', function() { 
	  	$('login').setStyle('display', 'block'); 
	  	//window.addEvent("load",function(){ formular = new Formular('searchFormLogin'); });
	  	$('user').focus();
	  });	
	}

	$('loginClose').addEvent('click', function(){	
			$('login').setStyle('display', 'none');
	});

	if($('searchOption_pers_2')){
		$('searchOption_pers_2').addEvent('click', function(){
			$('tx_mhajaxsearch_result').setProperty('class', 'hidden');
		});
	}
	if($('searchOption_web_2')){
		$('searchOption_web_2').addEvent('click', function(){
				$('tx_mhajaxsearch_result').setProperty('class', 'tx_mhajaxsearch_result');
		});
	}
	if ($$('.blueBoxChoose')){
		$$('.blueBoxChoose').setOpacity(0.7);
	}

}); 



/*################################################################################
	Accordions
################################################################################*/


// *** Highlights ***
function changeHighlightOnSelect(id)
{        
    var actID = "highlightAccordContent" + id;
    var linkID = "highlight" + id;
	var titleID = "highlightAccordTitle" + id;
	var pixID = "highlightAccordPix" + id;
	
    var el = document.getElementById(actID);	
	var line = document.getElementById(titleID);
	var pix = document.getElementById(pixID);
	    
    if(el.style.display == "block") {    	
		el.style.display = "none"; 
		pix.style.display = "none";
		
		$(linkID).className = "highlight";		
		$(linkID).innerHTML = "<img src=/fileadmin/templates/hsr/html/img/navigation/right1.gif border='0' alt='' />";
		
		line.className = 'highlightAccordTitle';
        
    } else {
		
		var pixLen = pix.getElementsByTagName("img").length;
		
		if(pixLen != 0){
			pix.style.display = "block";			
		} else { 	
			pix.style.height = 0 + "px";
			pix.style.display = "none";
		}
		
        el.style.display = "block"; 	
		
		$(linkID).className = "highlightActive";		
		$(linkID).innerHTML = "<img src=/fileadmin/templates/hsr/html/img/navigation/down1.gif border='0' alt='' />";
		
		
		line.className = 'highlightAccordTitleActive';
	}
}
/*
window.addEvent("load",function(){
	if($('highlightAccordContent1')){
		openOnStart();
	}
});
*/




/*################################################################################
	Hauptnavigation 
################################################################################*/


function openSubmenu(obj,nr,id)
{
	var el = document.getElementById('mainNavi'+nr);
	//if(el.className != 'mainNavi'+nr+'Def')
	//{	
		obj.onmouseout = function()
		{
			document.getElementById(id).style.display='none';		
		
			for(i=0;i<$$('.subnaviAccordContent').length;i++)
			{
				$$('.subnaviAccordContent')[i].style.display = "none";			
			}
			for(i=0;i<$$('.subnaviTitleActive').length;i++)
			{
				$$('.subnaviTitleActive')[i].className = "subnaviTitle";		
			}
		}
	
		obj.onmouseover = function()
		{ 
			document.getElementById(id).style.display='block';
		}
		obj.onmouseover();
	//} 
}

/*################################################################################
	openSelf()
################################################################################*/

function openSelf(obj,id) {
	obj.onmouseout = function() { obj.style.display='none'; document.getElementById(id).className=id; }
	obj.onmouseover = function() { obj.style.display='block'; document.getElementById(id).className=id+'Active'; }
	obj.onmouseover();
}

/*################################################################################
	Subsubnavigation in Navi-Box oeffnen: changeSubnaviOnSelect()
################################################################################*/

var arrSubnavi = new Array ("SubnaviInteressierte","SubnaviWeiterbildung","SubnaviForschung");

function changeSubnaviOnSelect(arrPos,divId)
{	
		
	var actID = arrSubnavi[arrPos] + "Content" + divId;
	var linkID =  arrSubnavi[arrPos] + "Title" + divId;
	
	
	var el = document.getElementById(actID);
	var cls = document.getElementById(linkID);
	var parentEl = document.getElementById(linkID).parentNode;
	
	if(el.style.display == "block") {    	
		
		el.style.display = "none";
		
		if(cls.className == "subnaviTitleBgPixActive") {
			cls.className = "subnaviTitleBgPix";	
		} else {
			cls.className = "subnaviTitle";	
		}
		
		if(parentEl.className != "subnaviAccordTitle last") {
			parentEl.style.borderBottom = 1+"px solid #005291";
		}
        
    } else {
		
		if(cls.className == "subnaviTitleBgPix") {
			cls.className = "subnaviTitleBgPixActive";	
		} else {
			cls.className = "subnaviTitleActive";	
		}
	
		el.style.display = "block"; 	
		parentEl.style.border = "none";
    }  
}

/*################################################################################
	changeBlueBoxContent()
################################################################################*/

//var activeBlueBoxID;

//BlueBox aktivieren
/*
function openBlueBox(bt) {
	
	var box = $('blueBox');
	bt.onmouseout = function() { box.style.display = "none"; }
	bt.onmouseover = function() { box.style.display = "block"; }
	bt.onmouseover();
}
*/


function randomBGIMG() {
	
	var randomID = $random(1, 4);
	var bg_button = 'blueBoxContent_button_'+randomID;
	var tmp = $(bg_button).getProperty('onclick');
	
	//tmp =    changeBlueBoxContent(3,'03_I_kompr.jpg',''); return false;
	if (typeof(tmp) == 'function') {
		tmp = tmp.toString().replace(/^function\s+\w+\(\s*\)\s*\{/, '');
		tmp = tmp.replace(/\s*}$/, '');
	}
	tmp = tmp.replace(/\'\'\)\; return false\;/, '');
	tmp = tmp+"'1');";

	eval(tmp);
}

function changeBlueBoxContent(id,image,start) {	

	$('blueBoxContent_1').style.display = "none";
	$('blueBoxContent_2').style.display = "none";
	$('blueBoxContent_3').style.display = "none";
	$('blueBoxContent_4').style.display = "none";
	
	$('blueBoxContent_button_1').className = "blueBoxChoose";
	$('blueBoxContent_button_2').className = "blueBoxChoose";
	$('blueBoxContent_button_3').className = "blueBoxChoose";
	$('blueBoxContent_button_4').className = "blueBoxChoose";
	
	//$('blueBoxContent_'+activeBlueBoxID).style.display = "none";
	//$('blueBoxContent_button_'+activeBlueBoxID).className = "blueBoxChoose";
	
	$('blueBoxContent_'+id).style.display = "block";
	$('blueBoxContent_button_'+id).className = "blueBoxChooseActive";
	
	$('backgroundContainerIMG').style.visibility = "hidden";
	//$('backgroundContainerIMG').src = "/fileadmin/templates/hsr/html/img/layout/"+id+"";
	$('backgroundContainerIMG').src = "/uploads/pics/"+image;

	var imgSrc = $('backgroundContainerIMG').getProperty('src');		
	if(!start){
	$('backgroundContainerIMG').onload = function() {
		//this.style.visibility = "visible";
		this.setOpacity(0);
		this.set({morph:{duration: 700}});
		this.morph({opacity: 1});
	}
	}
	//activeBlueBoxID = id;
}

function changeBlueBoxInfotext(bt)
{
	var txt = $('blueBox_infoText');
	bt.onmouseout = function() { txt.style.display = "none"; }
	bt.onmouseover = function()
	{
		txt.style.display = "block";
		txt.style.left = parseInt(bt.style.left) - txt.offsetWidth + bt.offsetWidth + "px";
	}
	bt.onmouseover();
}

/*################################################################################
	setBackgroundImage()
################################################################################*/

function setBackgroundImage()
{
	
	if(!$('backgroundContainer')) return;
	// mit random bg hintergrund und infotext laden
	var imgSrc = $('backgroundContainerIMG').getProperty('src');		
	if(!imgSrc){
		randomBGIMG();
	}
	
	
	//var defWidth	 	= 2048;
	//var defHeight		= 1536;
	var defWidth	 	= 1500;
	var defHeight		= 1000;	
	var defRatio		= defWidth / defHeight;
	var hgbCt			= $('backgroundContainer');
	var img				= $('backgroundContainerIMG');
		
	hgbCt.style.width	= "0px";
	hgbCt.style.height	= "0px";
	
	var w				= window.getSize().x;
	var h				= window.getSize().y;
	
	hgbCt.style.width	= w + "px";
	hgbCt.style.height	= h + "px";
	
	var tmpRatio = w / h;
	if(tmpRatio > defRatio) {
		img.style.width		= w + "px";
		img.style.height	= w/defRatio + "px";
	} else {
		img.style.height	= h + "px";
		img.style.width		= h*defRatio + "px";
	}
	
	//img.style.visibility="visible";
	img.setOpacity(0);
	img.set({morph:{duration: 700}});
	img.morph({opacity: 1});
	setBlueBox();
}


function setBlueBox()
{
	var blueBox = $('blueBox');
	var min_x = 595;
	var win_x = window.getSize().x;
	
	if(!blueBox.defRight) blueBox.defRight = parseInt(blueBox.getStyle("right"));
	
	if(win_x > min_x)
	{
		var newRight = blueBox.defRight + ((win_x - min_x)/10);
		blueBox.style.right = newRight + "px";
	}
}

window.addEvent("resize",setBackgroundImage);
window.addEvent("load",setBackgroundImage);


/*################################################################################
	setSearchInput()
################################################################################*/

function setSearchInput(inp)
{
	inp.defValue = inp.value;
	// Feld verlassen
	inp.onblur = function() { if(this.value.length < 3 || this.value == "") this.value = this.defValue; this.onkeyup(); }
	// Feld aktiv
	inp.onfocus = function() { this.value=''; }
	inp.onfocus();
}

function showSearchResults(inp)
{
	$('searchResult').style.display = (inp.value == inp.defValue || inp.value.length < 3) ? "none" : "block";
}


function setFooter()
{
	var winHeight = window.getSize().y - 283;
	//var winHeight = window.getSize().y + 283;
	debug(winHeight);
	var newHeight = winHeight;
	//var minHeight = 400;
	var arr = new Array();
	if($('navigation')) arr.push($('navigation'));
	//if($('tx-ICSagenda-pi1_archiv')) arr.push($('tx-ICSagenda-pi1_archiv'));
	if($('colRight')) arr.push($('colRight'));
	if($('peopleBox')) arr.push($('peopleBox'));


	for(i=0;i<arr.length;i++)
	{
		var el = arr[i];
		el.style.height = "";
		if(el.offsetHeight > newHeight) newHeight = el.offsetHeight;
	}
	
	for(i=0;i<arr.length;i++)
	{
		arr[i].style.height = newHeight + "px";
	}

	debug("newHeight: " + newHeight);

}

window.addEvent("load",setFooter);
window.addEvent("resize",setFooter);


var scrollCont = null;
var cont = null;

function startScroll(bt,id, pos)
{
	bt.onmouseup = stopScroll;
	bt.onmouseout = stopScroll;
	cont = document.getElementById(id);
	scrollCont = setInterval("scroll" + pos + "()", 40);
}
function scrolldown() { cont.scrollTop += 11; }
function scrollup() { cont.scrollTop -= 11; }
function stopScroll() { clearInterval(scrollCont); }
