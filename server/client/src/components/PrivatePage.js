import Recommendations from "./Recommendations";
import { useContext } from "react";
import jwt_decode from "jwt-decode";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";
import PrivateLibrary from "./PrivateLibrary";

const PrivatePage = (props) => {
  const { accessToken } = useContext(AppContext);
  const params = useParams();

  return (
    <div>
      {accessToken ? (
        params.id ==
          jwt_decode(accessToken).userId && (
          <div>
            <h1>
              Hello,{" "}
              {jwt_decode(accessToken).userName}
            </h1>
            <h3>Welcome to your library</h3>
            <PrivateLibrary
              id={params.id}
              accessToken={accessToken}
            />
            <Recommendations />
          </div>
        )
      ) : (
        <div>
          <h3>Welcome to the Private library</h3>
          <PrivateLibrary id={params.id} />
        </div>
      )}
    </div>
  );
};

export default PrivatePage;
