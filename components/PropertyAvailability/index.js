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
		{Object.keys(plots).map(function(object, i){
			return i == 0 ? (<CardText key={i}><b>{Object.keys(plots).length}</b> available from <b>{Helpers.PriceLarge(plots[object].price)}</b></CardText>) : null;
		})}
      </>
    );
  }
  return "";
}
export default PropertyAvailability;