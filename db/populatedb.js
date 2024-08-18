require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR ( 255 ) NOT NULL,
    last_name VARCHAR ( 255 ) NOT NULL,
    username VARCHAR ( 255 ) NOT NULL,
    password VARCHAR ( 255 ) NOT NULL,
    is_admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR ( 255 ) NOT NULL,
    message VARCHAR ( 255 ) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER REFERENCES users(id)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL, //postgresql://<roleName>:<rolePassword>@localhost:<databasePort>/<databaseName>
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

//run this file once to create tables and/or add data to a database
