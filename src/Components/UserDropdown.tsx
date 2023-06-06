import { useEffect, useState } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";

const UserDropdown = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token !== null) setAccessToken(token);
  }, [localStorage.getItem("accessToken")]);

  if (accessToken) {
    const decodedToken = jwtDecode<JwtPayload>(accessToken) as {
      token_type: string;
      user_id: string;
      exp: number;
      iat: number;
      jti: string;
    };
    if (decodedToken) {
      const userId = decodedToken.user_id;
      console.log(userId);
      return <div>{userId}</div>;
    }
  }
  return <></>;
};

export default UserDropdown;
