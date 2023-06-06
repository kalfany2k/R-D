import { useEffect, useState } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { getUser } from "../services/user-auth";
import { Text } from "@chakra-ui/react";

const UserDropdown = () => {
  //   const [accessToken, setAccessToken] = useState("");
  //   useEffect(() => {
  //     const token = localStorage.getItem("accessToken");
  //     if (token !== null) setAccessToken(token);
  //   }, [localStorage.getItem("accessToken")]);
  //   if (accessToken) {
  //     const decodedToken = jwtDecode<JwtPayload>(accessToken) as {
  //       token_type: string;
  //       user_id: string;
  //       exp: number;
  //       iat: number;
  //       jti: string;
  //     };
  //     if (decodedToken) {
  //       const userId = decodedToken.user_id;
  //       console.log(userId);
  //       return <div>{userId}</div>;
  //     }
  //   }
  //   return <></>;

  const token = localStorage.getItem("accessToken");

  const user = getUser();

  return <Text>{user?.first_name}</Text>;
};

export default UserDropdown;
function useUser(): { data: any; error: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
