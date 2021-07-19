/* components/Development/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Helpers from "../../components/Helpers.js"

import DevelopmentFromPrices from "../../components/DevelopmentFromPrices";
import DevelopmentOpeningHours from "../../components/DevelopmentOpeningHours";
import DevelopmentImages from "../../components/DevelopmentImages";
import DevelopmentProperties from "../../components/DevelopmentProperties";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  NavLink,
  ListGroup,
  ListGroupItem,
  Media,
} from "reactstrap";

const QUERY = gql`
  query($seourl: String!) {
    developments(where: { seourl: $seourl }) {
		id
		seourl
		name
		description
		shortdescription
		addressline1
		addressline2
		city
		county
		postcode
		images {
			url
		}
		properties {
			id
			name
			bedrooms
			bathrooms
			description
			shortdescription
			image {
			  url
			}
			specifications {
			  specification
			}
		}
		specifications {
			specification
		}
		telephone
		mondayopening
		mondayclosing
		tuesdayopening
		tuesdayclosing
		wednesdayopening
		wednesdayclosing
		thursdayopening
		thursdayclosing
		fridayopening
		fridayclosing
		saturdayopening
		saturdayclosing
		sundayopening
		sundayclosing
    }
  }
`;
					
function showFullAddress(development){
	let output = "";
	let arr = [];
	if(development.addressline1 && development.addressline1 != ""){
		arr.push(development.addressline1);
	}
	if(development.addressline2 && development.addressline2 != ""){
		arr.push(development.addressline2);
	}
	if(development.city && development.city != ""){
		arr.push(development.city);
	}
	if(development.county && development.county != ""){
		arr.push(development.county);
	}
	if(arr.length > 0) {
		output = arr.join(", ");
	}
	if(development.postcode && development.postcode != "" && output != ""){
		output += " " + development.postcode;
	}else if(development.postcode && development.postcode){
		output = development.postcode;
	}
	return output;
}

function Development(props) {
	
  const { loading, error, data } = useQuery(QUERY, {
    variables: { seourl: props.seoUrl },
  });

  if (error){ return "Error Loading Developments"; }
  if (loading) return <h1>Loading ...</h1>;
  if (data.developments && Object.keys(data.developments).length == 1) {
	  
    const development = data.developments[0];
		
    return (
      <div className="main-content">
        <h1>{development.name}</h1>
        <CardText>{showFullAddress(development)}</CardText>
		<DevelopmentFromPrices developmentId={development.id} />
		<CardText className="heading2"><b>Sales Office &amp; Show Home</b></CardText>
		<DevelopmentOpeningHours development={development} />
		<CardText className="line-no-margin"><b>{development.telephone}</b></CardText>
		<a className="btn btn-primary btn-enquire">Enquire</a>
		
		<h2>Overview</h2>
		<DevelopmentImages development={development} />
		{Helpers.ShowAsParagraphs(development.description)}
		{Helpers.ShowAsList(development.specifications, "specification", {fontSize: "125%"})}
		<NavLink href="#">View brochure</NavLink>
		
		<h2>Properties</h2>
		<Media>
			<Media left href="#">
				<Media object alt="Plan image" className="img-plan" />
			</Media>
			<Media right body>
				<a className="btn btn-primary btn-plan">Expand plan</a>
				<a className="btn btn-primary btn-plan">Download plan</a>
			</Media>
		</Media>
		<DevelopmentProperties development={development} />
      </div>
    );
  }
  return "";
}
export default Development;