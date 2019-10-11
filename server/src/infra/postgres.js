import { Client } from "pg";

const config = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT
}

function createConnection() {
  const client = new Client(config);

  client.connect(err => {
    if(err) {
      throw err
    } else {
      console.log("pg connected")
    }
  })
  return {
    query: (sql, params) =>
      client.query(sql, params)
        .then(result => result.rows)
  }
}

export default {
  createConnection
}
