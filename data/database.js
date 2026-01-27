import { MongoClient } from "mongodb";

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUsername = process.env.MONGO_DB_USERNAME;
const dbPassword = process.env.MONGO_DB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME;

if (!clusterAddress || !dbUsername || !dbPassword || !dbName) {
  throw new Error("Missing required environment variables for database connection.");
}

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@${clusterAddress}/${dbName}?retryWrites=true&w=majority`;

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  cachedClient = client;
  return client;
}
