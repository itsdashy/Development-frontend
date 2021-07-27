/* /pages/[seourl].js */
import Helpers from "../../components/Helpers.js"

import DevelopmentFromPrices from "../../components/DevelopmentFromPrices";
import DevelopmentOpeningHours from "../../components/DevelopmentOpeningHours";
import DevelopmentImages from "../../components/DevelopmentImages";
import DevelopmentProperties from "../../components/DevelopmentProperties";

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

export async function getStaticPaths() {
  const developmentsReq = await fetch('http://51.140.127.107:1337/graphql', {
    method: 'POST',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
    body: JSON.stringify({
      query: `{
		developments(sort: "name:asc") {
			seourl
		}
	  }`
    })
  })

  const developmentsRes = await developmentsReq.json()
  if (developmentsReq.status !== 200) {
    console.error(developmentsRes)
    throw new Error('Failed to fetch API')
  }
  
  const paths = developmentsRes.data.["developments"].map(
    (item) => ({
		params: { seourl: item.seourl }
	})
  );

  return {
    paths,
	fallback: false
  }
}

export async function getStaticProps({ params }) {
  const developmentReq = await fetch('http://51.140.127.107:1337/graphql', {
    method: 'POST',
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
    body: JSON.stringify({
      query: `{
		developmentinfo: developments(where: { seourl: "${params.seourl}" }) {
			id
			seourl
			name
			description
			shortdescription
			addressline1
			addressline2
			city
			county
			postcode
			images {
				url
			}
			properties {
				id
				name
				bedrooms
				bathrooms
				description
				shortdescription
				image {
				  url
				}
				specifications {
				  specification
				}
			}
			specifications {
				specification
			}
			telephone
			mondayopening
			mondayclosing
			tuesdayopening
			tuesdayclosing
			wednesdayopening
			wednesdayclosing
			thursdayopening
			thursdayclosing
			fridayopening
			fridayclosing
			saturdayopening
			saturdayclosing
			sundayopening
			sundayclosing
		}
		fromprices: plots(where: { 
			development: {
				seourl: "${params.seourl}"
			}}, sort: "property.bedrooms:asc,price:asc") {
			development {
			  id
			}
			number
			property {
			  name
			  bedrooms
			}
			price
		}
		propertiesbyprice: plots(where: { 
			development: {
				seourl: "${params.seourl}"
			}}, sort: "price:asc") {
			price
			homeoftheweek
			partexchange
			property {
				id
				name
			}
		}
	  }`
    })
  })

  const developmentRes = await developmentReq.json()
  if (developmentReq.status !== 200) {
    console.error(developmentRes)
    throw new Error('Failed to fetch API')
  }
  
  let development = developmentRes.data.developmentinfo.map(
    (item) => item
  );
  
  if(development[0]) {
	  development = development[0];
  }
  
  let fromprices = null;
  if(developmentRes.data.fromprices !== null) {
	  fromprices = developmentRes.data.fromprices.map(
		(item) => item
	  );
  }
  
  let propertiesbyprice = null;
  if(developmentRes.data.propertiesbyprice !== null) {
	  propertiesbyprice = developmentRes.data.propertiesbyprice.map(
		(item) => item
	  );
  }

  return {
    props: {
      development,
	  fromprices,
	  propertiesbyprice
    },
    revalidate: 600
  }
  
}

export default function Home({development, fromprices, propertiesbyprice}) {
	
  if(development) {
		
    return (
	  <>
		  <div className="main-content">
			<div>
				<h1>{development.name}</h1>
				<CardText>{showFullAddress(development)}</CardText>
					{ fromprices !== null ?
				<DevelopmentFromPrices developmentId={development.id} fromprices={fromprices} /> : null
					}
				<CardText className="heading2"><b>Sales Office &amp; Show Home</b></CardText>
				<DevelopmentOpeningHours development={development} />
				<CardText className="line-no-margin"><b>{development.telephone}</b></CardText>
				<NavLink href="#" className="btn btn-primary btn-enquire">Enquire</NavLink>
			</div>
			<div>
				<h2>Overview</h2>
				<DevelopmentImages development={development} />
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
				<DevelopmentProperties development={development} propertiesbyprice={propertiesbyprice} />
			</div>
		  </div>
	  </>
    );
  }
  return null;
}
