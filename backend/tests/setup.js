const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');

let mongo;

beforeAll(async () => {
  // mongo = await MongoMemoryServer.create();
  // const uri = mongo.getUri();
  // console.log(process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI);

}, 20000); // optional: allow 20s for slow systems
