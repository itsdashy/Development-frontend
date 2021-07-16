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

function renderFromPrices(plots){
	let output = [];
	let lastBeds = "";
	plots.forEach((plot) => {
		if(lastBeds != plot.property.bedrooms){
			output.push("<b>" + plot.property.bedrooms + "</b> beds from <b>&pound;" + Helpers.NumberWithCommas(plot.price) + "</b>");
		}
		lastBeds = plot.property.bedrooms;
	});
	if(output.length > 0) {
		return output.join("<br />");
	}
	return "";
}

function DevelopmentFromPrices(props) {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: props.developmentId },
  });

  if (error) return "Error Loading From Prices";
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
export default DevelopmentFromPrices;