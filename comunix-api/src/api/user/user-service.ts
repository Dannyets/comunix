import { mySqlClient, mySqlUtils } from "../../clients";
import { Credentials } from "../../models";
import { queries, jwtUtils } from "../../utils";
import { USER_TABLE_NAME, USER_TABLE_COLUMNS } from "./user-db";

const getUserByCredentials = async (credentials: Credentials) => {
  const { username, password } = credentials;
  const sql = `SELECT ${USER_TABLE_COLUMNS.join(
    ","
  )} from ${USER_TABLE_NAME} as u
                 WHERE u.username = ${mySqlUtils.escape(
                   username
                 )} AND u.password = ${mySqlUtils.escape(password)}`;
  const [result] = await mySqlClient.query(sql);
  return result;
};

export const login = async (credentials: Credentials) => {
  const result = await getUserByCredentials(credentials);

  if (!result) {
    return null;
  }

  const token = jwtUtils.generateJwtToken(result);
  return token;
};

export const register = async (credentials: Credentials) => {
  const { username, password } = credentials;
  const sql = queries.insertInto(USER_TABLE_NAME, USER_TABLE_COLUMNS, [
    username,
    password,
  ]);
  const result = await mySqlClient.query(sql);
  return result;
};

export const authorize = async (token: string): Promise<boolean> => {
  const { username, password } = jwtUtils.decodeJwtToken(token);
  const credentials = {
    username,
    password,
  };
  const result = await getUserByCredentials(credentials);
  return result ? true : false;
};
