import { MongoClient } from "mongodb";

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@${clusterAddress}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

console.log('Connecting to database:', dbName);

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected to MongoDB cluster');
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

const database = client.db(dbName);
export default database;
