"use server";

import { neon } from "@neondatabase/serverless";

export async function create(formData) {
  "use server"; //Using Server Action

  const sql = neon(process.env.DATABASE_URL);

  const schema = `CREATE TABLE IF NOT EXISTS students (
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(50) NOT NULL,
                    last_name VARCHAR(50) NOT NULL,
                    date_of_birth DATE NOT NULL,
                    address TEXT NULL,
                    level VARCHAR(50) NOT NULL,
                    state VARCHAR(50) NOT NULL,
                    country VARCHAR(50) NOT NULL
                )`;

  await sql(schema);

  // Insert the data from the form into the Postgres (powered by Neon)
  await sql(
    "INSERT INTO students (first_name, last_name, date_of_birth, address, level, state, country) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      formData.get("firstname"),
      formData.get("lastname"),
      formData.get("dob"),
      formData.get("address"),
      formData.get("level"),
      formData.get("state"),
      formData.get("country"),
    ]
  );
}

export async function getData() {
  "use server";
  const sql = neon(process.env.DATABASE_URL);
  // const response = await sql(`SELECT version()`);
  const response = await sql(`SELECT * from students`);
  console.log(response);
  return response;
}
