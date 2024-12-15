"use client";

import React from "react";
import { create, getData } from "@/lib/server-actions";

export default function Home() {
    const [record, setRecord] = React.useState([]);

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
        <button onClick={getData}>Get</button>
      </div>
    </div>
  );
}
