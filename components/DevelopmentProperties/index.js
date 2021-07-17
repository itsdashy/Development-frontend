/* components/DevelopmentProperties/index.js */

import Helpers from "../../components/Helpers.js"
import PropertyAvailability from "../../components/PropertyAvailability";
import PropertyFeaturesFooter from "../../components/PropertyFeaturesFooter";

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
		  <style jsx>
			{`
			  h3 {
				  font-size: 1.4em;
				  margin-bottom: 1rem;
			  }
			  .card-image {
				height: 265px;
				background-repeat: no-repeat;
				background-position: center center;
				background-size: cover;
			  }
			`}
		  </style>
		  
        <Row>
          {development.properties.map((res) => (
            <Col xs="12" sm="12" md="6" lg="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                <div className="card-image" style={{ 
						backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${res.image.url})` 
					}}></div>
                <CardBody>
                  <h3>{res.name}</h3>
                  {Helpers.ShowAsParagraphs(res.shortdescription)}
				  <PropertyAvailability developmentId={development.id} propertyId={res.id} />
                </CardBody>
				<PropertyFeaturesFooter developmentId={development.id} propertyId={res.id} />
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
}
export default DevelopmentProperties;