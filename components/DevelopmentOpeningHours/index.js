/* components/DevelopmentOpeningHours/index.js */
import Helpers from "../../components/Helpers.js"

import {
  CardText,
} from "reactstrap";

function CheckTimes(o, c) {
	try {
		if(o != "" && c != ""){
			if(parseInt(c.substr(0, 2)) > parseInt(o.substr(0, 2))) {
				return true;
			}
		}
	}
	catch(err) {}
	return false;
}

function formatAmPm(time) {
	try {
		if(time !== undefined && time !== null){
			let h = parseInt(time.substr(0, 2));
			if(h == 0) return "";
			let m = parseInt(time.substr(3, 2));
			if(m == 0) m = "";
			else if (m < 10) m = ".0" + m;
			else m = "." + m;
			return (h % 12 || 12).toString() + m.toString() + ((h < 12 || h === 24) ? "am" : "pm");
		}
	}
	catch(err) {}
	return "";
}

function AbbrevWeekday(str) {
	return str.substr(0, 1).toUpperCase() + str.substr(1, 2);
}

function DevelopmentOpeningHours(props) {
	const development = props.development;
	
	let openinghourstext = "", openinghours = [], openingtimes = [], okey = "", otopening = "", otclosing = "", weekdaymove = 0, otkey1 = 0, week = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
	
	try {
		for (let i = 0; i < week.length; i++) {
			otopening = development[week[i]+'opening'];
			otclosing = development[week[i]+'closing'];
			if(CheckTimes(otopening, otclosing)) {
				okey = formatAmPm(otopening) + "-" + formatAmPm(otclosing);
				if(okey != "-"){
					if(!(okey in openingtimes)) openingtimes[okey] = [];
					openingtimes[okey].push(week[i]);
				}
			}
		}
		let oplength = Object.keys(openingtimes).length;
		
		if(oplength == 1) {
			otkey1 = Object.keys(openingtimes)[0];
			if(openingtimes[otkey1].length == 7) openinghourstext = "Mon-Sun, " + otkey1;
		}
		if(oplength > 0 && openinghourstext == "") {
			for (let otkey in openingtimes) {
				for (let i = 0; i < week.length; i++) {
					weekdaymove = i - 1;
					if(i == 0) weekdaymove = week.length - 1;
					if(openingtimes[otkey][i] == week[i] && openingtimes[otkey][openingtimes[otkey].length - 1] == week[weekdaymove]){
						openingtimes[otkey].splice(0, 1);
						openingtimes[otkey].push(week[i]);
					}
				}
				otopening = AbbrevWeekday(openingtimes[otkey][0]);
				otclosing = AbbrevWeekday(openingtimes[otkey][openingtimes[otkey].length - 1]);
				if(otopening != otclosing) otopening += "-" + otclosing;
				openinghours.push(otopening + ", " + otkey);
			}
		}
		if(openinghours.length > 0) openinghourstext = openinghours.join("<br />");
	}
	catch(err) {}
		
    return (
      <>
		{Helpers.ShowAsParagraphs(openinghourstext, {margin:0, lineHeight:"140%"})}
      </>
    );
}
export default DevelopmentOpeningHours;