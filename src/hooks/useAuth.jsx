import React from "react";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};
