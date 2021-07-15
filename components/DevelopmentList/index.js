
/* components/DevelopmentList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

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
		description
		image {
		  url
		}
		region{
		  name
		}
		county
	  }
  }
`;

const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

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
					<Link
					as={`/developments/${res.id}`}
					href={`/developments?id=${res.id}`}
					><a><div className="card-image" style={{ 
						backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${res.image.url})` 
					}}></div></a></Link>
					<CardBody>
						<CardTitle>{res.name}</CardTitle>
						<CardText>{res.city}, {res.county}</CardText>
						<CardText>{truncate(res.description, 120, '...')}</CardText>
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