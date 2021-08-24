import { mySqlClient } from "../../clients";

export const USER_TABLE_NAME = 'comunix.users';

export const USER_TABLE_COLUMNS = ["username", "password"];

export const createUserTable = (): Promise<void> => {
  return mySqlClient.query(`
        CREATE TABLE IF NOT EXISTS ${USER_TABLE_NAME} (
            username VARCHAR(255) PRIMARY KEY,
            password VARCHAR(255) NOT NULL
        )
     `);
};

export const dropUserTable = () => {
  return mySqlClient.query(`
    DROP TABLE IF EXISTS ${USER_TABLE_NAME};
 `);
};
