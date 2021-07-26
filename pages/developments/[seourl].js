/* /pages/developments.js */

import Development from "../../components/Development";
					
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
	fallback: true
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

  return {
    props: {
      development,
	  fromprices
    },
    revalidate: 1
  }
  
}

export default function Home({development, fromprices}) {
	/*
	console.log("seourl development");
	console.log(development);
	console.log("seourl development");
	*/
	return (
	  <>
		<Development development={development} fromprices={fromprices} />
	  </>
	);
}
