/* /pages/developments.js */
import { useRouter } from "next/router";

import DevelopmentInfo from "../components/DevelopmentInfo";
function Developments(props) {
  const router = useRouter();
  
	return (
	  <>
		<DevelopmentInfo developmentId={router.query.id} />
	  </>
	);
  return "";
}
export default Developments;
