/* /components/Helpers.js */

import {
  CardText,
  List,
} from "reactstrap";

const Helpers = {
    ShowAsParagraphs: function(str, style = {}, classname = ""){
		try{
			let strsplit = [], strrows = [];
			if(str.indexOf("\n\n") !== -1) {
				strsplit = str.split("\n\n");
				for (let i = 0; i < strsplit.length; i++) {
					strrows.push(<CardText key={i} dangerouslySetInnerHTML={{__html:strsplit[i]}} className={classname} style={style} />);
				}
				if(strrows.length > 0) {
					str = strrows;
					return strrows;
				}
			}
			return (<CardText dangerouslySetInnerHTML={{__html:str}} className={classname} style={style} />);
		}
		catch(err) {}
		return (<></>);
    },
    ShowAsList: function(list, listitem = "", style = {}, classname = ""){
		try{
			let strrows = [];
			let count = Object.keys(list).length;
			if(count > 0 && listitem != ""){
				return (
				  <>
				  <List className={classname} style={style}>
					{Object.keys(list).map(function(object, i){
						return count > 0 ? (
						<li dangerouslySetInnerHTML={{__html:list[i][listitem]}} key={i} />) : null; 
					})}
				  </List>
				  </>
				);
			} else if(count > 0 && listitem == ""){
				return (
				  <>
				  <List className={classname} style={style}>
					{Object.keys(list).map(function(object, i){
						return count > 0 ? (
						<li dangerouslySetInnerHTML={{__html:list[i]}} key={i} />) : null; 
					})}
				  </List>
				  </>
				);
			}
		}
		catch(err) {}
		return (<></>);
    },
    PriceLarge: function(str){
		try{
			return (<>&pound;{str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</>);
		}
		catch(err) {}
		return (<></>);
    }
}

// const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
// truncate(res.description, 120, '...')

export default Helpers;