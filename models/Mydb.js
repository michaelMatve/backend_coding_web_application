/*
 This model will contain the functions needed to insert data into the MongoDB database.
 */
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');


const mongoPrivateURL = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@mongodb.railway.internal`;

const databaseName = 'test'; // Replace with your actual database name

/*
//   This function creates a connection to MongoDB.
// */

async function connectToMongoDB() {
  try {
    const client = new MongoClient(mongoPrivateURL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    // console.log('Connected to MongoDB using Private Networking');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return null;
  }
}

async function connectToDatabase() {
  const client = await connectToMongoDB();
  if (client) {
    return client.db(databaseName);
  } else {
    throw new Error('Unable to connect to the database');
  }
}

/*
 This function Use the connectToDatabase function to establish a connection to the database.
 Subsequently, it searches for all documents representing files.
 And return them.
*/
const getItemList = async () => {
  try {
    const db = await connectToDatabase();
    const codesCollection = db.collection('codes');
    const itemList = await codesCollection.find().toArray();
    // console.log(itemList);
    return itemList;

  } catch (error) {
    console.error('Error retrieving codes:', error);
    throw error;
  }
};
/*
This function use the connectToDatabase function to establish a connection to the database. 
It then searches for a record in the database using its unique ID and returns the corresponding code.
*/
const getCodeById = async (codeId) => {
  try {
    const db = await connectToDatabase();
    const codesCollection = db.collection('codes');

    // Each document has an ObjectId, so this function creates a new ObjectId based on our code ID.
    //to find the needed document
    const objectId = new ObjectId(codeId);
    const code = await codesCollection.findOne({ _id: objectId });

    return code;
  
  } catch (error) {
    console.error('Error retrieving code by ID:', error);
    throw error;
  }
};

module.exports = { connectToMongoDB, getItemList, getCodeById };
