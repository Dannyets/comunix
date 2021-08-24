import * as mysql from 'mysql';

export class MySqlClient {
    pool: mysql.Pool;

    connect(database: string, host: string, user: string, password: string): void {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host,
            user,
            password,
            database
        });
    }

    query(sql): Promise<any>{
        return new Promise((resolve, reject) => {
            this.pool.query(sql, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
            });
        })
    }
}