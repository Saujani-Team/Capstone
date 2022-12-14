"use strict";

const {
  db,
  models: { User, Drawing },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "ilana",
      password: "123",
      firstName: "Ilana",
      lastName: "Bye",
      email: "ilana@gmail.com",
      isAdmin: true,
    }),
    User.create({
      username: "michelle",
      password: "123",
      firstName: "Michelle",
      lastName: "Mullane",
      email: "michelle@gmail.com",
      isAdmin: true,
    }),
    User.create({
      username: "allie",
      password: "123",
      firstName: "Allie",
      lastName: "Wang",
      email: "allie@gmail.com",
      isAdmin: true,
    }),
    User.create({
      username: "jett",
      password: "123",
      firstName: "Jett",
      lastName: "Bye",
      email: "jett@gmail.com",
    }),
    User.create({
      username: "chief",
      password: "123",
      firstName: "Chief",
      lastName: "Mullane",
      email: "chief@gmail.com",
    }),
    User.create({
      username: "jane",
      password: "123",
      firstName: "Jane",
      lastName: "Bye",
      email: "jane@gmail.com",
    }),
    User.create({
      username: "apple",
      password: "123",
      firstName: "Apple",
      lastName: "Banana",
      email: "apple@gmail.com",
    }),
    User.create({
      username: "zebra",
      password: "123",
      firstName: "Zebra",
      lastName: "Banana",
      email: "zebra@gmail.com",
    }),
  ]);

  const drawings = await Promise.all([
    Drawing.create({
      userId: 1,
      imageUrl: `https://i.imgur.com/CzbQDq5.png`,
      status: "live",
    }),
    Drawing.create({
      userId: 2,
      imageUrl: `https://i.imgur.com/HwbIHC9.png`,
      status: "live",
    }),
    Drawing.create({
      userId: 3,
      imageUrl: `https://i.imgur.com/0UPSVAI.png`,
      status: "live",
    }),
    Drawing.create({
      userId: 1,
      imageUrl: `https://i.imgur.com/M38ylgb.png`,
      status: "saved",
    }),
    Drawing.create({
      userId: 1,
      imageUrl: `https://i.imgur.com/cpzLRHO.png`,
      status: "saved",
    }),
    Drawing.create({
      userId: 4,
      imageUrl: `https://i.imgur.com/DG4tXyt.png`,
      status: "live",
    }),
    Drawing.create({
      userId: 5,
      imageUrl: `https://i.imgur.com/YzNGNwL.png`,
      status: "saved",
    }),
    Drawing.create({
      userId: 6,
      imageUrl: `https://i.imgur.com/7W5ownI.png`,
      status: "saved",
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${drawings.length} drawings`);
  console.log(`seeded successfully`);
  return {
    users: {
      ilana: users[0],
      michelle: users[1],
      allie: users[2],
      jett: users[3],
      chief: users[4],
      jane: users[5],
      apple: users[6],
      zebra: users[7],
    },
    drawings: {
      drawing1: drawings[0],
      drawing2: drawings[1],
      drawing3: drawings[2],
      drawing4: drawings[3],
      drawing5: drawings[4],
      drawing6: drawings[5],
      drawing7: drawings[6],
      drawing8: drawings[7],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
