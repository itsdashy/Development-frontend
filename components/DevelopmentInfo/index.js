/* components/DevelopmentInfo/index.js */
import { useQuery } from "@apollo/react-hooks";
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

const QUERY = gql`
  query($id: ID!) {
    development(id: $id) {
      id
      name
      description
      properties {
        id
        name
        description
        image {
          url
        }
      }
    }
  }
`;

function DevelopmentInfo(props) {
  const { loading, error, data } = useQuery(QUERY, {
    variables: { id: props.developmentId },
  });

  if (error){ return "Error Loading Properties"; }
  if (loading) return <h1>Loading ...</h1>;
  if (data.development) {
    const { development } = data;
    return (
      <>
        <h1>{development.name}</h1>
        <Button outline color="primary">Enquire</Button>
        <CardText>{development.description}</CardText>
        <Row>
          {development.properties.map((res) => (
            <Col xs="12" sm="12" md="6" lg="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <div className="card-image" style={{ 
						backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${res.image.url})` 
					}}></div>
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
              </Card>
            </Col>
          ))}
		  
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
			  .card-image {
				height: 265px;
				background-repeat: no-repeat;
				background-position: center center;
				background-size: cover;
			  }
			`}
		  </style>
        </Row>
      </>
    );
  }
  return "";
}
export default DevelopmentInfo;