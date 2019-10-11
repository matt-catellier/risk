import 'dotenv/config';
import {wireup} from './app'
import {DB_POSTGRES} from "./constants";

const app = wireup({
  environment: process.env.ENVIRONMENT,
  database: DB_POSTGRES,
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})

