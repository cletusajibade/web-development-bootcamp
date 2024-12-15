import React from "react";
import { neon } from "@neondatabase/serverless";

export default function Home() {
  async function create(formData) {
    "use server";

    const sql = neon(process.env.DATABASE_URL);

    // const schema = `CREATE TABLE IF NOT EXISTS students (
    //                 id SERIAL PRIMARY KEY,
    //                 first_name VARCHAR(50) NOT NULL,
    //                 last_name VARCHAR(50) NOT NULL,
    //                 date_of_birth DATE NOT NULL,
    //                 address TEXT NULL,
    //                 level VARCHAR(50) NOT NULL,
    //                 state VARCHAR(50) NOT NULL,
    //                 country VARCHAR(50) NOT NULL
    //             )`;

    // await sql(schema);

    await sql(
      "INSERT INTO students(first_name, last_name, date_of_birth, address, level, state, country) VALUES($1, $2,$3,$4,$5,$6,$7)",
      [
        formData.get("firstname"),
        formData.get("lastname"),
        formData.get("dob"),
        formData.get("address"),
        formData.get("level"),
        formData.get("state"),
        formData.get("country"),
      ]
    ).then((message) => {
      console.log(message);
    });
  }

  return (
    <div>
      <div className="container">
        <h1>Register Student Record</h1>

        <form action={create}>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" name="firstname" required />
          </div>

          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" name="lastname" required />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" name="dob" required />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address" name="address" />
          </div>

          <div className="form-group">
            <label htmlFor="level">Level</label>
            <input type="text" id="level" name="level" required />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" required />
          </div>

          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select id="country" name="country" required>
              <option value="">Select Country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
