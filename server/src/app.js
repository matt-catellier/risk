import express from 'express';
import routes from './routes'
import postgres from './infra/postgres';
import {DB_POSTGRES} from "./constants";


export function wireup(config) {
  console.log('src/index.js runing in ' + config.environment + ' mode');

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
  })

  // Create DB connection
  let db;
  if (config.database === DB_POSTGRES ) {
    db = postgres.createConnection();
  }

  // Register Routes
  app.use('/api/example', routes.example(db));

  app.close = function() {
    db.end()
  }

  return app
}


