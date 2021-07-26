/* /pages/index.js */
import React, { useState } from "react";
import Helpers from "../components/Helpers.js"

import {
  Input,
  InputGroup,
  InputGroupAddon,
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

import DevelopmentFromPrices from "../components/DevelopmentFromPrices";

export async function getStaticProps() {
	
  const developmentsReq = await fetch('http://51.140.127.107:1337/graphql', {
    method: 'POST',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
    body: JSON.stringify({
      query: `{
		  developments: developments(sort: "name:asc") {
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
		  fromprices: plots(sort: "development.id:asc,property.bedrooms:asc,price:asc") {
			development {
			  id
			}
			number
			property {
			  name
			  bedrooms
			}
			price
		  }
      }`
    })
  })

  const developmentsRes = await developmentsReq.json()
  if (developmentsReq.status !== 200) {
    console.error(developmentsRes)
    throw new Error('Failed to fetch API')
  }
  
  let developments = developmentsRes.data.developments.map(
    (item) => item
  )
  
  developments = developments.map(
    (item) => item
  )
  
  let fromprices = null;
  if(developmentsRes.data.fromprices !== null) {
	  fromprices = developmentsRes.data.fromprices.map(
		(item) => item
	  )
  }
  
  return {
    props: {
      developments,
      fromprices,
    },
    revalidate: 600
  }
  
}

export default function Home({ developments, fromprices }) {
  const [query, updateQuery] = useState("");
  
  if (developments && Object.keys(developments).length > 0) {
	  
    const searchQuery = developments.filter((squery) =>
      squery.name.toLowerCase().includes(query)
    );
	
	if (Object.keys(searchQuery).length > 0) {
  
	  return (
		<>
			<div className="container-fluid">
			  <Row>
				<Col>
				  <div className="search">
					<InputGroup>
					  <InputGroupAddon addonType="append">Search</InputGroupAddon>
					  <Input
						onChange={e => updateQuery(e.target.value.toLocaleLowerCase())}
						value={query}
					  />
					</InputGroup>
				  </div>
				</Col>
			  </Row>
			</div>
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
}