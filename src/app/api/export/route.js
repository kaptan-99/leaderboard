import { MongoClient } from 'mongodb';

// MongoDB connection URI and database name
const MONGODB_URI = process.env.MONGODB_URI;

let client;
let db;

const connectToDatabase = async () => {
  if (!db) {
    client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db("monthData");
  }
};

const fetchData = async (month, year) => {
  const collectionName = `${month}_${year}`;
  const collection = db.collection(collectionName);

  // Fetch all documents in the collection
  const data = await collection.find({}).toArray();
//   console.log(data)
  return data.map(item => ({
    
    
    city: item.cityName,
    postWeek: item.postWeek,
    robinGreen: item.robinGreen,
  }));
};

export async function GET(req) {
  // Read headers
  const month = req.headers.get('month');
  const year = req.headers.get('year');

  if (!month || !year) {
    return new Response(
      JSON.stringify({ error: 'Month and year headers are required' }),
      { status: 400 }
    );
  }
  try {
    await connectToDatabase();

    const cityData = await fetchData(month, year);

    return new Response(
      JSON.stringify({
        collection: `${month}_${year}`,
        month,
        year,
        cityData
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
