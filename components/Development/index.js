/* components/Development/index.js */
//import React from "react";
import Helpers from "../../components/Helpers.js"

import DevelopmentFromPrices from "../../components/DevelopmentFromPrices";
//import DevelopmentOpeningHours from "../../components/DevelopmentOpeningHours";
//import DevelopmentImages from "../../components/DevelopmentImages";
//import DevelopmentProperties from "../../components/DevelopmentProperties";

import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Row,
	ListGroup,
	ListGroupItem,
	Media,
	NavLink,
} from "reactstrap";
					
function showFullAddress(development){
	let output = "";
	let arr = [];
	if(development.addressline1 && development.addressline1 != ""){
		arr.push(development.addressline1);
	}
	if(development.addressline2 && development.addressline2 != ""){
		arr.push(development.addressline2);
	}
	if(development.city && development.city != ""){
		arr.push(development.city);
	}
	if(development.county && development.county != ""){
		arr.push(development.county);
	}
	if(arr.length > 0) {
		output = arr.join(", ");
	}
	if(development.postcode && development.postcode != "" && output != ""){
		output += " " + development.postcode;
	}else if(development.postcode && development.postcode){
		output = development.postcode;
	}
	return output;
}

export default function Development(props) {
  const development = props.development;
  const fromprices = props.fromprices;
  /*
	console.log("comp development");
	console.log(development);
	console.log("comp development");
  
	console.log("comp fromprices");
	console.log(fromprices);
	console.log("comp fromprices");
	*/
  if(development) {
		
    return (
	  <>
		  <div className="main-content">
			<div>
				<h1>{development.name}</h1>
				<CardText>{showFullAddress(development)}</CardText>
				<DevelopmentFromPrices developmentId={development.id} fromprices={fromprices} />
				<CardText className="heading2"><b>Sales Office &amp; Show Home</b></CardText>
				{/*
				<DevelopmentOpeningHours development={development} />
				*/}
				<CardText className="line-no-margin"><b>{development.telephone}</b></CardText>
				<NavLink href="#" className="btn btn-primary btn-enquire">Enquire</NavLink>
			</div>
			<div>
				<h2>Overview</h2>
				{/*
				<DevelopmentImages development={development} />
				*/ }
				{Helpers.ShowAsParagraphs(development.description)}
				{Helpers.ShowAsList(development.specifications, "specification", {fontSize: "125%"})}
				<NavLink href="#">View brochure</NavLink>
			</div>
			<div>
				<h2>Properties</h2>
				<Media>
					<Media left href="#">
						<Media object alt="Plan image" className="img-plan" />
					</Media>
					<Media right body>
						<a className="btn btn-primary btn-plan">Expand plan</a>
						<a className="btn btn-primary btn-plan">Download plan</a>
					</Media>
				</Media>
				{/*
				<DevelopmentProperties development={development} />
				*/}
			</div>
		  </div>
	  </>
    );
  }
  
  return null;
}