/* components/DevelopmentList/index.js */
import React from "react";
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

export default function DevelopmentList(props) {
  const developments = props.developments;
  const fromprices = props.fromprices;
  
  if (developments && Object.keys(developments).length > 0) {
	  
    const searchQuery = developments.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (Object.keys(searchQuery).length > 0) {
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
							<DevelopmentFromPrices developmentId={res.id} fromprices={fromprices} />
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
    }
  }
  return null;
}