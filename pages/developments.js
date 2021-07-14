/* /pages/developments.js */
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";

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

const GET_development_PROPERTIES = gql`
  query($id: ID!) {
    development(id: $id) {
      id
      name
      properties {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

function Developments(props) {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_development_PROPERTIES, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading Properties";
  if (loading) return <h1>Loading ...</h1>;
  if (data.development) {
    const { development } = data;
    return (
      <>
        <h1>{development.name}</h1>
        <Row>
          {development.properties.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
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
                  <Button outline color="primary">
                    Add To Favorites
                  </Button>

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
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  }
  return <h1>Add Properties</h1>;
}
export default Developments;
