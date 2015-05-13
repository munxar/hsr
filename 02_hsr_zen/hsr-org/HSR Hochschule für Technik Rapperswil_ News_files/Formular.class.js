
/*################################################################################
	FORMULAR
################################################################################*/

function Formular(id)
{

		
	if(!$(id)) return;
	//alert("hallllllllllllllllllllllllllllllllllllllllllliiiiiiiiiiii");
	
	
	/*################################################################################
		initElements()
	################################################################################*/
	
	// Hier werden die TITLE der Formolarfelder
	// umgewandelt und ins Objekt geschrieben
	
	// Mgliche Typen:
	// text, checkbox, radio, textarea, select, int, float, email, phone, price
	
	this.initElements = function(el)
	{
		
		for(i=0;i<this.frm.elements.length;i++)
		{
			var el = this.frm.elements[i];
			if(el.className && el.className.indexOf("validate") > -1)
			{
				this.elements.push(el);
				el.addon = new Object();
				el.addon.check = 1;
				if(el.className.indexOf("_") > -1) {
					var type = el.className.substr(el.className.indexOf("_")+1,el.className.length);
					el.addon.type = type.toLowerCase();
				} else {
					el.addon.type = (el.tagName == "INPUT") ? el.type.toLowerCase() : el.tagName.toLowerCase();
				}
				
				switch(el.addon.type)
				{
					//-----------------------------------------------------------------------------------------------------
					// Sucht nach Labels und setzt den Parameter addon.label
					
					case "checkbox":
						var labels = document.getElementsByTagName("label");
						for (l = 0; l < labels.length; l++) if (labels[l].htmlFor == el.id) el.addon.label = labels[l];
					break;
					
					//-----------------------------------------------------------------------------------------------------
					// Sucht nach Labels und setzt den Parameter addon.label
					
					case "radio":
						var labels = document.getElementsByTagName("label");
						for (l = 0; l < labels.length; l++) if (labels[l].htmlFor == el.id) el.addon.label = labels[l];
					break;
				}
			}
		}

		this.fakeElements();
	}
	
	this.fakeElements = function()
	{
		window.fireRadioChange = true;
		var ra = $$('.frm_radio	');
		ra.each(function(cont)
		{
			for(i=0;i<cont.childNodes.length;i++)
			{
				var la = cont.childNodes[i];
				if(la.tagName == "LABEL")
				{
					
					la.radioBT				= $(la.htmlFor);
					la.radioBT.label		= la;
					la.labelIMG			= new Element("img");
					la.labelIMG.src		= (la.radioBT.checked) ? "/fileadmin/templates/hsr/ext/macina_searchbox/radio_active.gif" : "/fileadmin/templates/hsr/ext/macina_searchbox/radio_inactive.gif";
					la.labelIMG.border	= "0";
					la.labelIMG.alt		= "";
					var txt				= document.createTextNode(la.innerHTML);
					la.innerHTML		= "";
					la.appendChild(la.labelIMG);
					la.appendChild(txt);
					
					//--------------------------------
					
					la.onclick = function()
					{
						this.labelIMG.src = (this.radioBT.checked) ? "/fileadmin/templates/hsr/ext/macina_searchbox/radio_active.gif" : "/fileadmin/templates/hsr/ext/macina_searchbox/radio_inactive.gif";
						
						if(window.fireRadioChange)
						{
							window.fireRadioChange = false;
							var allRa = document.getElementsByName(this.radioBT.name);
							for(e=0;e<allRa.length;e++)
							{
								allRa[e].checked = (allRa[e].label === this) ? "checked" : "";
								allRa[e].label.onclick();
							}
							window.fireRadioChange = true;
						}
						/*if(Browser.Engine.trident4) IE7.recalc();*/
					}
					
					//-------------------------------
					
				}
			}
			var clearBoth = new Element("div");
			clearBoth.className = "clearBoth";
			cont.appendChild(clearBoth);
		});
		/*if(Browser.Engine.trident4) IE7.recalc();*/
	}
	
	/*################################################################################
		error()
	################################################################################*/
	
	this.error = function()
	{
		
	}
	
	
	/*################################################################################
		setError()
	################################################################################*/
	
	
	this.setError = function(el,error)
	{
		if(el.addon.label)
		{
			if(error) {
				el.addon.label.style.color = errorColorRed;
			} else {
				el.addon.label.style.color = errorColorGrey;
			}
		}
		else
		{
			if(error) {
				el.style.backgroundImage = "url(/pix/form/ico_error.gif)";
				//if(el.addon.type == "select") { for(o=0;o<el.options.length;o++) el.options[o].style.color = errorColorWhite; }
			} else {
				el.style.backgroundImage = "url(/pix/form/ico_ok.gif)";
				//if(el.addon.type == "select") { for(o=0;o<el.options.length;o++) el.options[o].style.color = errorColorGrey; }
			}
		}
	}
	
	
	/*################################################################################
		check()
	################################################################################*/
	
	
	this.check = function()
	{
		var error = false;
		
		this.elements.each(function(el)
		{
			switch(el.addon.type)
			{
				//-------------------------------------
				
				case "text": case "textarea":
					if(el.value == "") {
						error = true;
						_self.setError(el,1);
					} else { _self.setError(el,0); }
				break;
				
				//-------------------------------------
				
				case "checkbox":
					if(!el.checked) {
						error = true;
						_self.setError(el,1);
					} else { _self.setError(el,0); }
				break;
				
				//-------------------------------------
				
				case "radio":
					var group = $$$(el.name);
					var radioError = 1;
					for(g=0;g<group.length;g++) { if(group[g].checked) { radioError = 0; break; } }
					debug(radioError);
					if(radioError) { error = true; }
					for(g=0;g<group.length;g++) { _self.setError(group[g],radioError); }
				break;
				
				//-------------------------------------
				
				case "select":
					if(el.selectedIndex == 0) {
						error = true;
						_self.setError(el,1);
					} else { _self.setError(el,0); }
				break;
				
				//-------------------------------------
				
				case "int":
					if(el.value.match(/^[0-9]+$/)) { _self.setError(el,0); }
					else {
						error = true;
						_self.setError(el,1);
					}
				break;
				
				//-------------------------------------
				
				case "float":
					if(el.value.match(/^[0-9]+(\.)?([0-9]+)?$/)) { _self.setError(el,0); }
					else {
						error = true;
						_self.setError(el,1);
					}
				break;
				
				//-------------------------------------
				
				case "email":
					if(el.value.match(/^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([_a-zA-Z0-9-]+\.)+([a-zA-Z]{2,4})$/)) { _self.setError(el,0); }
					else {
						error = true;
						_self.setError(el,1);
					}
				break;
				
				//-------------------------------------
				
				case "phone":
					if(el.value.match(/^([0-9]|\+|\(|\)|\/| )+$/) && el.value.length > 9) { _self.setError(el,0); }
					else {
						error = true;
						_self.setError(el,1);
					}
				break;
				
				//-------------------------------------
				
				case "price":
					if(el.value.match(/^[0-9]+[.][0-9]+$/)) { _self.setError(el,0); }
					else {
						error = true;
						_self.setError(el,1);
					}
				break;
			}
		});
		if(error) {
			this.error();
			return false;
		} else { return true; }
	}
	
	
	/*################################################################################
		submit()
	################################################################################*/
	
	this.send = function()
	{
		if(this.check())
		{
			this.frm.action = this.frm.addon.action;
			this.frm.method = this.frm.addon.method;
			this.frm.submit();
		}
	}
	
	/*################################################################################
		INITIALISIERUNG
	################################################################################*/
	
	//if(!$(id)) return;
	
	var _self				= this;
	this.frm				= $(id);
	this.frm.addon			= new Object();
	this.frm.addon.action	= this.frm.action;
	this.frm.addon.method	= this.frm.method;
	this.frm.action			= "";
	this.frm.method			= "";

	this.elements			= new Array();
	this.initElements();
}

