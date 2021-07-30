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

function BuildProperties(plotsbyprice){
	let output = [];
	let lastPlot = "";
	Object.keys(plotsbyprice).map(function(obj, i){
		if(lastPlot != plotsbyprice[obj].property.name) {
			output.push(
				<Col xs="12" sm="12" md="6" lg="4" key={i} className="column">
				  <Card>
				  {
					  plotsbyprice[obj].property.image ? (<div className="card-image" style={{
							height: 265,
							backgroundImage: `url(${plotsbyprice[obj].property.image.url})` 
					}}>{TextBedsBaths(plotsbyprice[obj].property.bedrooms,plotsbyprice[obj].property.bathrooms)}</div>)
						:
						(<div className="card-image" style={{ height: 265 }}>{TextBedsBaths(plotsbyprice[obj].property.bedrooms,plotsbyprice[obj].property.bathrooms)}</div>)
				  }
					<CardBody>
					  <CardTitle>{plotsbyprice[obj].property.name}</CardTitle>
					  {Helpers.ShowAsParagraphs(plotsbyprice[obj].property.shortdescription)}
					  <PropertyAvailability propertyId={plotsbyprice[obj].property.id} plotsbyprice={plotsbyprice.slice().reverse()} />
					</CardBody>
					<PropertyFeaturesFooter propertyId={plotsbyprice[obj].property.id} plotsbyprice={plotsbyprice.slice().reverse()} />
				  </Card>
				</Col>
			);
		}
		lastPlot = plotsbyprice[obj].property.name;
	});
	return output;
}

function DevelopmentProperties(props) {
	let plotsbyprice = props.plotsbyprice;
	
	if(Object.keys(plotsbyprice).length > 0) {
		plotsbyprice = plotsbyprice.slice().reverse();
	}

	let list = [];
	if(Object.keys(plotsbyprice).length > 0) {
		Object.keys(plotsbyprice).map(function(obj, i){
			if(Object.keys(plotsbyprice[obj].property.specifications).length) {
				Object.keys(plotsbyprice[obj].property.specifications).map(function(speckey, ii){
					if(plotsbyprice[obj].property.specifications[speckey].specification && list.indexOf(plotsbyprice[obj].property.specifications[speckey].specification) === -1){
						list.push(plotsbyprice[obj].property.specifications[speckey].specification);
					}
				});
			}
		});
	}
	
	let lastProperty = "";
	if (plotsbyprice && Object.keys(plotsbyprice).length > 0) {
		return (
		  <>
			<Row className="card-row">
			{BuildProperties(plotsbyprice)}
			</Row>
			{Helpers.ShowAsList(list, "", {fontSize: "125%"})}
			{(Object.keys(list).length > 0) ? (
			<NavLink href="#">More property specs</NavLink>
			) : null }
		  </>
		);
	}
	return null;
		
}
export default DevelopmentProperties;