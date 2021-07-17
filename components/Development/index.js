/* components/Development/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Helpers from "../../components/Helpers.js"

import DevelopmentFromPrices from "../../components/DevelopmentFromPrices";
import DevelopmentOpeningHours from "../../components/DevelopmentOpeningHours";
import DevelopmentImages from "../../components/DevelopmentImages";
import DevelopmentProperties from "../../components/DevelopmentProperties";

import Link from "next/link";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Media,
} from "reactstrap";

const QUERY = gql`
  query($id: ID!) {
    development(id: $id) {
		id
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
			description
			shortdescription
			image {
			  url
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
    variables: { id: props.developmentId },
  });

  if (error){ return "Error Loading Properties"; }
  if (loading) return <h1>Loading ...</h1>;
  if (data.development) {
    const { development } = data;
		
    return (
      <>
      <style>
        {`
			h1, h2 {
				margin-top: 30px;
			}
			.isDisabled {
				pointer-events: none;
			}
			  a {
				  text-decoration: underline;
			  }
			  .container-fluid {
				margin-bottom: 30px;
			  }
			  .btn-outline-primary {
				color: #007bff !important;
			  }
			  .btn-primary {
				  color: white !important;
			  }
			  .btn-plan {
				  margin: 0 0 1rem 1rem;
				  width: 140px;
				  float: left;
				  clear: left;
				  
			  }
			  .img-plan {
				  margin-bottom: 1rem;
				  background-color: #DDDDDD;
				  padding: 120px 50px !important;
			  }
			`}
		  </style>
        <h1>{development.name}</h1>
        <CardText>{showFullAddress(development)}</CardText>
		<DevelopmentFromPrices developmentId={development.id} />
		<CardText className="text-uppercase" style={{margin:"1rem 0 0 0 ", lineHeight:"120%"}}><b>Sales Office &amp; Show Home</b></CardText>
		<DevelopmentOpeningHours development={development} />
		<CardText style={{margin:0, lineHeight:"140%"}}><b>{development.telephone}</b></CardText>
		<a className="btn btn-primary" style={{marginTop:"1rem"}}>Enquire</a>
		
		<h2>Overview</h2>
		<DevelopmentImages development={development} />
		{Helpers.ShowAsParagraphs(development.description)}
		{Helpers.ShowAsList(development.specifications, "specification", {fontSize: "125%"})}
		<Link href="#"><a>View brochure</a></Link>
		
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
      </>
    );
  }
  return "";
}
export default Development;