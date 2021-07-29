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

function TextBedsBaths(beds = 0, baths = 0){
	let output = "";
	if(beds > 0) output += beds+" bed";
	if(beds == 0 || beds > 1) output += "s";
	if(beds > 0 && baths > 0) output += ", ";
	if(baths > 0) output += baths+" bath";
	if(baths == 0 || baths > 1) output += "s";
	if(output != "") return (<CardText>{output}</CardText>);
	return "";
}

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
			  {
				  res.image ? (<div className="card-image" style={{
						height: 265,
						backgroundImage: `url(${res.image.url})` 
				}}>{TextBedsBaths(res.bedrooms,res.bathrooms)}</div>)
					:
					(<div className="card-image" style={{ height: 265 }}>{TextBedsBaths(res.bedrooms,res.bathrooms)}</div>)
			  }
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