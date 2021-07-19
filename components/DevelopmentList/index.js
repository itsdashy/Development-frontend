/* components/DevelopmentList/index.js */
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Helpers from "../../components/Helpers.js"

import DevelopmentFromPrices from "../../components/DevelopmentFromPrices";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardFooter,
  Row,
  Col,
  NavLink,
  Button,
} from "reactstrap";

const QUERY = gql`
  {
	  developments(sort: "name:asc") {
		id
		seourl
		name
		city
		shortdescription
		description
		images {
		  url
		}
		region{
		  name
		}
		county
	  }
  }
`;

function DevelopmentList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading developments";
  //if developments are returned from the GraphQL query, run the filter query
  //and set equal to variable developmentsSearch
  if (loading) return <h1>Fetching</h1>;
  if (data.developments && data.developments.length) {
    //searchQuery
    const searchQuery = data.developments.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
		<>
			<Row className="card-row card-development">
			  {searchQuery.map((res) => (
				<Col xs="12" sm="12" md="6" lg="4" key={res.id} className="column">
					<Card>
						{Object.keys(res.images).map(function(object, i){
						   return i == 0 ? (<NavLink key={i}
						to={`/developments/${res.seourl}`}
						className="card-image"
						style={{
							backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${res.images[object].url})`}}
						></NavLink>) : null; 
						})}
						<CardBody>
							<CardTitle>{res.name}</CardTitle>
							<CardText>{res.city}, {res.county}</CardText>
							{Helpers.ShowAsParagraphs(res.shortdescription)}
							<DevelopmentFromPrices developmentId={res.id} />
						</CardBody>
						<CardFooter>
							<Button
							href={`/developments/${res.seourl}`}
							color="primary"
							>View</Button>
						</CardFooter>
					</Card>
				</Col>
			  ))}
			</Row>
		</>
      );
    } else {
      return <h1>No developments Found</h1>;
    }
  }
  return "";
}
export default DevelopmentList;