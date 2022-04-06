import 'reflect-metadata';
import express from 'express';
import bodyParser from "body-parser";
import morgan from 'morgan';
import cors from 'cors';
import { DataSource } from "typeorm"
import { Inventory } from './entity/Inventory';
import { Order } from './entity/Order';
import * as Controllers from "./controllers"

process.on('SIGINT', function() {
    process.exit();
});

export var AppDataSource;

async function setupDbConnection() {
  console.log("Attempting to connect to database")
  var connectedDB;
  connectedDB = await connectDB();
  if( connectedDB == false) {
    await new Promise((resolve) => { setTimeout(resolve, 5000); });
    setupDbConnection();
  }
}

async function connectDB() {
  const noDB = process.env["NODB"]
  if (noDB && noDB == 'true') {
    return "";
  }

  const dbType = process.env["DATABASE_TYPE"]
  if (dbType == "postgres") {
  }else if (dbType == "mysql") {
  }else{
    // TODO - add DB type to messsage
    console.log("my set valid DATABASE_TYPE")
    process.exit();
  }  
  const dbUser = process.env["DATABASE_USER"]
  if (!dbUser) {
    console.log("must set DATABASE_USER")
    process.exit();
  }
  const dbHost = process.env["DATABASE_HOST"]
  if (!dbHost) {
    console.log("must set DATABASE_HOST")
    process.exit();
  }
  const dbPass = process.env["DATABASE_PASSWORD"]
  if (!dbPass) {
    console.log("must set DATABASE_PASSWORD")
    process.exit();
  }
  const dbDatabase = process.env["DATABASE_DATABASE"]
  if (!dbDatabase) {
    console.log("must set DATABASE_DATABASE")
    process.exit();
  }
  const dbPort = process.env["DATABASE_PORT"]
  if (!dbPort) {
    console.log("must set DATABASE_PORT")
    process.exit();
  }

  var entities, migrations;
  if( dbDatabase == "order"){
    entities = [Order]
    migrations = [ "./src/migrations/1648496838039-create-order-db.ts" ]
  }else if( dbDatabase == "inventory"){
    entities = [Inventory]
    migrations = [ "./src/migrations/1648496838040-create-inventory-db.ts" ]
  }else{
    console.log("Unknown database: " + dbDatabase );
    process.exit();
  }

  AppDataSource = new DataSource({
    type: dbType,
    host: dbHost,
    port: Number(dbPort),
    username: dbUser,
    password: dbPass,
    database: dbDatabase,
    logging: false,
    // synchronize: true,
    entities: entities,
    migrations: migrations
  });

  try{
    await AppDataSource.initialize();
    console.log("Connected to DB");
    await AppDataSource.runMigrations();
    console.log("Migrations ran");
  }catch(error){
    console.log("Error Connecting to DB: ", error);
    return false;
  }

   return true;
}

function createRoutes(app: express.Express) {
  const urlencodedParser = bodyParser.urlencoded({extended: false})

  app.get('/health_check', urlencodedParser, Controllers.check);

  app.get('/inventory', async (req, res) => {
    await Controllers.getInventory(req, res)
  })

  app.post('/order', async (req, res) => {
    await Controllers.createOrder(req, res)
  })

  app.post('/login', urlencodedParser, Controllers.logUserIn);
}

function createApp() {
  const app = express();
  app.use(cors({origin: "*"}))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(morgan('combined'))
  createRoutes(app)
  return app
}

// start
setupDbConnection()
const app = createApp()
const port = process.env.PORT || 8889
console.log(`Server running at http://localhost:${port}`);
app.listen(port);
