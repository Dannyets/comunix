import { MySqlClient } from "./mysql-client";

export let mySqlClient: MySqlClient;

export const initMySqlClient = (database: string, host: string, user: string, password: string) => {
    mySqlClient = new MySqlClient();
    mySqlClient.connect(database, host, user, password);
}