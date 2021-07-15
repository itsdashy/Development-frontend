/* components/DevelopmentProperties/index.js */

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

function DevelopmentProperties(props) {
	const development = props.development;
		
    return (
      <>
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
        </Row>
		
		  <style jsx>
			{`
			  .card-image {
				height: 265px;
				background-repeat: no-repeat;
				background-position: center center;
				background-size: cover;
			  }
			`}
		  </style>
      </>
    );
}
export default DevelopmentProperties;