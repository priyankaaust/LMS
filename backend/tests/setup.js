const mongoose = require('mongoose');
const express = require('express');

let mongo;

beforeAll(async () => {

  await mongoose.connect(process.env.MONGO_URI);

}, 20000); // optional: allow 20s for slow systems
