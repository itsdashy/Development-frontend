/* /pages/index.js */
import React, { useState } from "react";
import { Col, Input, InputGroup, InputGroupAddon, Row } from "reactstrap";
import DevelopmentList from "../components/DevelopmentList";

function GetIds(obj) {
	let ids = [];
	for (let i = 0; i < Object.keys(obj).length; i++) {
	  ids.push(obj[i].id);
	}
	return ids;
}

export async function getStaticProps() {

  // Get Developments
  const developmentsReq = await fetch('http://51.140.127.107:1337/graphql', {
    method: 'POST',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
    body: JSON.stringify({
      query: `{
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
      }`
    })
  })

  const developmentsRes = await developmentsReq.json()
  if (developmentsReq.status !== 200) {
    console.error(developmentsRes)
    throw new Error('Failed to fetch API')
  }
  
  const developments = developmentsRes.data.["developments"].map(
    (item) => item
  );
  
  const plotsReq = await fetch('http://51.140.127.107:1337/graphql', {
    method: 'POST',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
    body: JSON.stringify({
      query: `{
		  fromprices: plots(where: { _development: [${GetIds(developments).join(',')}] }, sort: "property.bedrooms:asc,price:asc") {
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

  const plotsRes = await plotsReq.json()
  if (plotsReq.status !== 200) {
    console.error(developmentsRes)
    throw new Error('Failed to fetch API')
  }
  
  let fromprices = null;
  if(plotsRes.data.fromprices !== null) {
	  fromprices = plotsRes.data.fromprices.map(
		(item) => item
	  );
  }
  
  return {
    props: {
      developments,
      fromprices,
    },
    revalidate: 1
  }
  
}

export default function Home({ developments, fromprices }) {
	/*
	console.log("PLOTS");
	console.log(plots);
	console.log(developmentId);
	console.log(test);
	console.log("PLOTS");
	*/
  const [query, updateQuery] = useState("");
  
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
		<DevelopmentList developments={developments} fromprices={fromprices} search={query} />
	</>
  );
}