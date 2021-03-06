/* /components/PropertyFeaturesFooter/index.js */
import Helpers from "../../components/Helpers.js"

import {
  CardText,
  CardFooter,
} from "reactstrap";

export default function PropertyFeaturesFooter(props) {
	const propertyId = props.propertyId;
	const plotsbyprice = props.plotsbyprice;
	
  if (plotsbyprice && Object.keys(plotsbyprice).length > 0) {
	  
	let features = [];
	Object.keys(plotsbyprice).map(function(object, i){
		if(propertyId == plotsbyprice[object].property.id){
			if(plotsbyprice[object].homeoftheweek) {
				features.push("Home of the week");
			}
			if(plotsbyprice[object].partexchange) {
				features.push("Part exchange available");
			}
		}
	});
	  if(Object.keys(features).length > 0){
		return (
		  <>
			<CardFooter className="red-panel">
				<CardText>{features.join(" | ")}</CardText>
			</CardFooter>
		  </>
		);
	  }
  }
  return null;
}