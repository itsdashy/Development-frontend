/* /components/PropertyFeaturesFooter/index.js */
import Helpers from "../../components/Helpers.js"

import {
  CardText,
  CardFooter,
} from "reactstrap";

export default function PropertyFeaturesFooter(props) {
	const propertyId = props.propertyId;
	const propertiesbyprice = props.propertiesbyprice;
	
  if (propertiesbyprice && Object.keys(propertiesbyprice).length > 0) {
	  
	let features = [];
	Object.keys(propertiesbyprice).map(function(object, i){
		if(propertyId == propertiesbyprice[object].property.id){
			if(propertiesbyprice[object].homeoftheweek) {
				features.push("Home of the week");
			}
			if(propertiesbyprice[object].partexchange) {
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