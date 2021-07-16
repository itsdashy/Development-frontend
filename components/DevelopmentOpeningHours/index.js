/* components/DevelopmentOpeningHours/index.js */

import {
  CardText,
} from "reactstrap";

function formatAmPm(time) {
	if(time !== undefined && time !== null){
		let h = parseInt(time.substr(0, 2));
		if(h == 0){
			return "";
		}
		let m = parseInt(time.substr(3, 2));
		if(m == 0){
			m = "";
		}else if (m < 10){
			m = ".0" + m;
		}else {
			m = "." + m;
		}
		let ampm = (h < 12 || h === 24) ? "am" : "pm";
		let h2 = h % 12 || 12;
		return h2.toString() + m.toString() + ampm;
	}
	return "";
}

function AbbrevWeekday(str) {
	return str.substr(0, 1).toUpperCase() + str.substr(1, 2);
}

function ShowHtml(str) {
	return (
	 <CardText style={{margin:0, lineHeight:"140%"}} dangerouslySetInnerHTML={{__html: str}} />
	)
}

function DevelopmentOpeningHours(props) {
	const development = props.development;
	
	let openinghours = [];
	let openinghourstext = "";
	let openingtimes = [];
	let okey = "";
	let otopening = "";
	let otclosing = "";
	let week = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
	
	for (let i = 0; i < week.length; i++) {
		otopening = formatAmPm(development[week[i]+'opening']);
		otclosing = formatAmPm(development[week[i]+'closing']);
		if(otopening != "" && otclosing != ""){
			okey = formatAmPm(development[week[i]+'opening']) + "-" + formatAmPm(development[week[i]+'closing']);
			if(okey != "-"){
				if(!(okey in openingtimes)){
					openingtimes[okey] = [];
				}else{
				}
				openingtimes[okey].push(week[i]);
			}
		}
	}
	let oplength = Object.keys(openingtimes).length;
	
	if(oplength == 1) {
		let otkey1 = Object.keys(openingtimes)[0];
		if(openingtimes[otkey1].length == 7){
			openinghourstext = "Mon-Sun, " + otkey1;
		}
	}
	if(oplength > 0 && openinghourstext == "") {
		let weekmove = 0;
		for ( let otkey in openingtimes ) {
			for (let i = 0; i < week.length; i++) {
				weekmove = i - 1;
				if(i == 0) {
					weekmove = week.length - 1;
				}
				if(openingtimes[otkey][i] == week[i] && openingtimes[otkey][openingtimes[otkey].length - 1] == week[weekmove]){
					openingtimes[otkey].splice(0, 1);
					openingtimes[otkey].push(week[i]);
				}
			}
			if(AbbrevWeekday(openingtimes[otkey][0]) == AbbrevWeekday(openingtimes[otkey][openingtimes[otkey].length - 1])) {
				openinghours.push(AbbrevWeekday(openingtimes[otkey][0]) + ", " + otkey);
			}else{
				openinghours.push(AbbrevWeekday(openingtimes[otkey][0]) + "-" + AbbrevWeekday(openingtimes[otkey][openingtimes[otkey].length - 1]) + ", " + otkey);
			}
		}
	}
	if(openinghours.length > 0){
		openinghourstext = openinghours.join("<br />");
	}
		
    return (
      <>
		{ShowHtml(openinghourstext)}
      </>
    );
}
export default DevelopmentOpeningHours;