/* /components/DevelopmentFromPrices/index.js */
import Helpers from "../../components/Helpers.js"

import { CardText } from "reactstrap";

export default function DevelopmentFromPrices(props) {
    const fromprices = props.fromprices;
    const developmentId = props.developmentId;
	
  if (fromprices && Object.keys(fromprices).length > 0) {
	
	let output = [];
	let lastBeds = "";
	Object.keys(fromprices).map(function(object, i){
		
		if(fromprices[object].development.id == developmentId && lastBeds != fromprices[object].property.bedrooms) {
			output.push(<CardText key={i} className="line-no-margin"><b>{fromprices[object].property.bedrooms}</b> beds from <b>{Helpers.PriceLarge(fromprices[object].price)}</b></CardText>);
		}
		lastBeds = fromprices[object].property.bedrooms;
	});
	
	return (
	  <>
		{output}
	  </>
	);
	
  }
  return null;
}