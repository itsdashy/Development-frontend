/* /components/DevelopmentProperties/index.js */
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
  NavLink,
} from "reactstrap";

function DevelopmentProperties(props) {
	const development = props.development;
	const propertiesbyprice = props.propertiesbyprice;
	
	let list = [];
	if(Object.keys(development.properties).length > 0) {
		Object.keys(development.properties).map(function(propertykey, i){
			if(Object.keys(development.properties[propertykey].specifications).length) {
				Object.keys(development.properties[propertykey].specifications).map(function(speckey, ii){
					list.push(development.properties[propertykey].specifications[speckey]);
				});
			}
		});
	}
		
    return (
      <>
        <Row className="card-row">
          {development.properties.map((res) => (
            <Col xs="12" sm="12" md="6" lg="4" key={res.id} className="column">
              <Card>
                <div className="card-image" style={{
						height: 265,
						backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${res.image.url})` 
					}}><CardText>{
					res.bedrooms > 0 ? 
					(res.bedrooms+" bed") : null
					}{
					res.bedrooms == 0 || res.bedrooms > 1 ? 
					("s") : null
					}{
					res.bedrooms > 0 && res.bathrooms > 0 ? 
					(", ") : null
					}{
					res.bathrooms > 0 ? 
					(res.bathrooms+" bath") : null
					}{
					res.bathrooms == 0 || res.bathrooms > 1 ? 
					("s") : null
					}</CardText></div>
                <CardBody>
                  <CardTitle>{res.name}</CardTitle>
                  {Helpers.ShowAsParagraphs(res.shortdescription)}
				  <PropertyAvailability propertyId={res.id} propertiesbyprice={propertiesbyprice} />
                </CardBody>
				<PropertyFeaturesFooter propertyId={res.id} propertiesbyprice={propertiesbyprice} />
              </Card>
            </Col>
          ))}
        </Row>
		{Helpers.ShowAsList(list, "specification", {fontSize: "125%"})}
		{(Object.keys(list).length > 0) ? (
			<NavLink href="#">More property specs</NavLink>
			) : null
		}
      </>
    );
}
export default DevelopmentProperties;