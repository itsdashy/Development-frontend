/* components/DevelopmentFromPrices/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Helpers from "../../components/Helpers.js"

import {
  CardText,
} from "reactstrap";

const QUERY = gql`
  query($id: ID!) {
	  plots(where: { development: $id }, sort: "property.bedrooms:asc,price:asc") {
		number
		property {
		  name
		  bedrooms
		}
		price
	  }
  }
`;

function DevelopmentFromPrices(props) {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: props.developmentId },
  });

  if (error) return "Error Loading From Prices";
  if (loading) return <h1>Loading ...</h1>;
  if (data.plots && data.plots.length) {
    const { plots } = data;
	
	let output = [];
	let lastBeds = "";
	Object.keys(plots).map(function(object, i){
		if(lastBeds != plots[object].property.bedrooms){
			output.push(<CardText key={i} className="line-no-margin"><b>{plots[object].property.bedrooms}</b> beds from <b>{Helpers.PriceLarge(plots[object].price)}</b></CardText>);
		}
		lastBeds = plots[object].property.bedrooms;
	});
	
	return (
	  <>
		{output}
	  </>
	);
	
  }
  return "";
}
export default DevelopmentFromPrices;