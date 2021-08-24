import { initMySqlClient } from "../clients";
import { createUserTable, dropUserTable } from "../api/user";

export const initDb = async (name, host, username, password) => {
    initMySqlClient(name, host, username, password);
    // await dropUserTable();
    await createUserTable();
}