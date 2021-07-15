/* /pages/developments.js */
import { useRouter } from "next/router";

import Development from "../components/Development";
function Developments(props) {
  const router = useRouter();
  
	return (
	  <>
		<Development developmentId={router.query.id} />
	  </>
	);
  return "";
}
export default Developments;
