import React from "react";
import MicrosoftLogin from "react-microsoft-login";

export default (props) => {
  const authHandler = (err, data) => {
    // console.log(err, "Data : "+ data.authResponseWithAccessToken.idToken.claims.preferred_username);
  };

  const id = 'e79f4b1c-4a14-442b-9e32-b9ff1b7f4955'

  return (
    <MicrosoftLogin clientId={id} authCallback={authHandler} />
  );
};