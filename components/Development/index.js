/* components/Development/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
} from "reactstrap";

const QUERY = gql`
  query($id: ID!) {
    development(id: $id) {
		id
		name
		description
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
			image {
			  url
			}
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
		`}
      </style>
        <h1>{development.name}</h1>
        <CardText>{showFullAddress(development)}</CardText>
		<DevelopmentFromPrices developmentId={development.id} />
		<CardText className="text-uppercase" style={{margin:0, lineHeight:"120%"}}><b>Sales Office &amp; Show Home</b></CardText>
		<DevelopmentOpeningHours development={development} />
		<CardText style={{margin:0, lineHeight:"140%"}}><b>{development.telephone}</b></CardText>
        <Button outline color="primary" style={{marginTop:"1rem"}}>Enquire</Button>
		
		<h2>Overview</h2>
		<DevelopmentImages development={development} />
        <CardText>{development.description}</CardText>
		
		
		<h2>Properties</h2>
		<DevelopmentProperties development={development} />
		
		  <style jsx>
			{`
			  a {
				color: white;
			  }
			  a:link {
				text-decoration: none;
				color: white;
			  }
			  .container-fluid {
				margin-bottom: 30px;
			  }
			  .btn-outline-primary {
				color: #007bff !important;
			  }
			  a:hover {
				color: white !important;
			  }
			`}
		  </style>
      </>
    );
  }
  return "";
}
export default Development;