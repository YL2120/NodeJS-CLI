#!/usr/bin/env node

const Year = new Date().getFullYear();
const { getCode, getName } = require("country-list"); // gets the country list
const args = process.argv.slice(2); //gets the parameter from the command line
const countryname = args[0]; //retrieve the name of the country

if (getCode(countryname)) {
  //  if the country name exists

  const CountryCode = getCode(countryname);

  const axios = require("axios");

  getHolidays();

  async function getHolidays() {
    try {
      const response = await axios.get(
        `https://date.nager.at/api/v3/PublicHolidays/${Year}/${CountryCode}`
      );

      response.data.forEach((element) => {
        console.log(
          element.date + " - " + element.localName + " - " + element.name
        );
      });
    } catch (error) {
      console.error(error);
    }
  }
} else console.log("Please enter a valid country name !");
