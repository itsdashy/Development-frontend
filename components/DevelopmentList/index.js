
/* components/DevelopmentList/index.js */
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

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
    developments {
      id
      name
      description
      image {
        url
      }
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
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                />
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/developments/${res.id}`}
                    href={`/developments?id=${res.id}`}
                  >
                    <a className="btn btn-primary">View</a>
                  </Link>
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
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>No developments Found</h1>;
    }
  }
  return <h5>Add developments</h5>;
}
export default DevelopmentList;