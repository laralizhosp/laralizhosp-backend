import { MongoClient } from "mongodb";

export async function connection() {
  let client: MongoClient = new MongoClient(process.env.URL);

  await client.connect();

  return client.db("assessment");
}

const db = {
  async insert(collection: string, data: object) {
    let db = await connection();
    return await db.collection(collection).insertOne(data);
  },
  async list(collection: string) {
    let db = await connection();
    return await db.collection(collection).find().toArray();
  },
  async get(collection: string, id: Number) {
    let db = await connection();
    return await db.collection(collection).findOne({ id: id });
  },
  async search(collection: string, query: object) {
    let db = await connection();
    return await db.collection(collection).findOne(query);
  },
  async update(collection: string, id: Number, data: object) {
    let db = await connection();
    return await db
      .collection(collection)
      .updateOne({ id: id }, { $set: data });
  },
};

export default db;
