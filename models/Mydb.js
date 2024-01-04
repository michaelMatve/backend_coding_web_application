/*
 This model will contain the functions needed to insert data into the MongoDB database.
 */
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

const mongoURI = process.env.MONGO_PRIVATE_URL + '/test';


// Use the MONGO_PRIVATE_URL environment variable
const mongoPrivateURL = process.env.MONGO_PRIVATE_URL;

async function connectToMongoDB() {
  const client = new MongoClient(mongoPrivateURL, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB using Private Networking');

    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return null;
  }
}

async function connectTodb() {
  const client = new MongoClient(mongoPrivateURL, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    const db = client.db('test'); // 'test' is the name of your database

    // Now 'db' is the database instance that you can use for further operations
    return db;
   
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return null;
  }
}

// const getItemList = async () => {
//   try {
//     const db = await connectTodb();
//   } catch (error) {
//   }
// };


/*
//   This function creates a connection to MongoDB.
// */
// const connectToDatabase = async () => {
//   try {
//     const client = await MongoClient.connect(mongoURI);

//     return client.db();
    
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//     throw error;
//   }
// };

/*
 This function Use the connectToDatabase function to establish a connection to the database.
 Subsequently, it searches for all documents representing files.
 And return them.
*/
const getItemList = async () => {
  try {
    const db = await connectTodb();
    const codesCollection = db.collection('codes');
    const itemList = await codesCollection.find().toArray();

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
