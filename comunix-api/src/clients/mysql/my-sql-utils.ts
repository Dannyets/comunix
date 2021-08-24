import { mySqlClient } from "./mysql-client-instance";

export const escape = (str) => mySqlClient.pool?.escape(str);
