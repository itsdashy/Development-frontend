/* components/PropertyFeaturesFooter/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Helpers from "../../components/Helpers.js"

import {
  CardText,
  CardFooter,
} from "reactstrap";

const QUERY = gql`
  query($developmentId: ID!, $propertyId: ID!) {
	plots(where: {
		development: $developmentId,
		property: $propertyId
		}, sort: "price:asc"){
		homeoftheweek
		partexchange
	}
  }
`;

function PropertyFeaturesFooter(props) {
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
	
	let output = [];
	let features = [];
	let homeoftheweek = false;
	let partexchange = false;
	Object.keys(plots).map(function(object, i){
		if(plots[object].homeoftheweek) {
			homeoftheweek = true;
		}
		if(plots[object].partexchange) {
			partexchange = true;
		}
	});
	if(homeoftheweek){
		features.push("Home of the week");
	}
	if(partexchange){
		features.push("Part exchange available");
	}
	
    return (
      <>
		{Object.keys(features).length > 0 ? (
			<CardFooter style={{color:"white", backgroundColor: "#D00000", padding: "5px 10px"}}>
				<CardText>{features.join(" | ")}</CardText>
			</CardFooter>
			) : null
		}
      </>
    );
  }
  return "";
}
export default PropertyFeaturesFooter;