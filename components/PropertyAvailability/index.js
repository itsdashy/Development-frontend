/* /components/PropertyAvailability/index.js */
import Helpers from "../../components/Helpers.js"

import {
  CardText,
} from "reactstrap";

export default function PropertyAvailability(props) {
	const propertyId = props.propertyId;
	const propertiesbyprice = props.propertiesbyprice;
	
  if (propertiesbyprice && Object.keys(propertiesbyprice).length > 0) {
	  let count = 0, minprice = 0, isfirst = false;
	  Object.keys(propertiesbyprice).map(function(object, i){
		  if(propertyId == propertiesbyprice[object].property.id){
			  if(!isfirst){
				  minprice = propertiesbyprice[object].price;
				  isfirst = true;
			  }
			  count++;
		  }
	  });
	  if(count > 0 && minprice > 0){
		return (
		  <>
			<CardText><b>{count}</b> available from <b>{Helpers.PriceLarge(minprice)}</b></CardText>
		  </>
		);
	  }
  }
  return null;
}