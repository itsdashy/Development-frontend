
/* components/DevelopmentList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Helpers from "../../components/Helpers.js"

import Link from "next/link";

import DevelopmentFromPrices from "../../components/DevelopmentFromPrices";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const QUERY = gql`
  {
	  developments(sort: "name:asc") {
		id
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
        <Row>
          {searchQuery.map((res) => (
			<Col xs="12" sm="12" md="6" lg="4" style={{ padding: 0 }} key={res.id}>
				<Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
					{Object.keys(res.images).map(function(object, i){
					   return i == 0 ? (<Link key={i}
					as={`/developments/${res.id}`}
					href={`/developments?id=${res.id}`}
					><a key={i}><div key={i} className="card-image" style={{ 
						backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${res.images[object].url})` 
					}}></div></a></Link>) : null; 
					})}
					<CardBody>
						<CardTitle>{res.name}</CardTitle>
						<CardText>{res.city}, {res.county}</CardText>
						{Helpers.ShowAsParagraphs(res.shortdescription)}
						<DevelopmentFromPrices developmentId={res.id} />
					</CardBody>
					<div className="card-footer">
						<Link
						as={`/developments/${res.id}`}
						href={`/developments?id=${res.id}`}
						><a className="btn btn-primary">View</a></Link>
					</div>
				</Card>
			</Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              a:hover {
                color: white;
              }
              .card-columns {
                column-count: 3;
              }
              .card-title {
				  font-size: 1.4em;
				  margin-bottom: 0;
              }
              .card-image {
				height: 202px;
				background-repeat: no-repeat;
				background-position: center center;
				background-size: cover;
			  }
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>No developments Found</h1>;
    }
  }
  return "";
}
export default DevelopmentList;