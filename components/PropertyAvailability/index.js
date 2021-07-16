/* components/PropertyAvailability/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Helpers from "../../components/Helpers.js"

import {
  CardText,
} from "reactstrap";

const QUERY = gql`
  query($developmentId: ID!, $propertyId: ID!) {
	plots(where: {
		development: $developmentId,
		property: $propertyId
		}, sort: "price:asc"){
		price
	}
  }
`;

function renderFromPrices(plots){
	try{
		let availability = Object.keys(plots).length, minprice = "";
		Object.keys(plots).map(function(object, i){
			if(i == 0) {
				minprice = plots[object].price;
			}
		});
		if(minprice != "") {
			return "<b>" + availability + "</b> available from <b>&pound;" + Helpers.NumberWithCommas(minprice) + "</b>";
		}
	}
	catch(err) {}
	return "";
}

function PropertyAvailability(props) {
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
		developmentId: props.developmentId,
		propertyId: props.propertyId,
	},
  });

  if (error) return "Error Loading Availability";
  if (loading) return <h1>Loading ...</h1>;
  if (data.plots && data.plots.length) {
    const { plots } = data;
	
    return (
      <>
          {Helpers.ShowAsParagraphs(renderFromPrices(plots))}
      </>
    );
  }
  return "";
}
export default PropertyAvailability;