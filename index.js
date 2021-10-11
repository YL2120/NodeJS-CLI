#!/usr/bin/env node

import ora from 'ora';
import axios from 'axios';
import * as country from "country-list";
import chalk from "chalk";
import figlet from "figlet";


// const { getCode, getName } = require("country-list"); // gets the country list
const args = process.argv.slice(2); //gets the parameter from the command line
const countryname = args[0]; //retrieve the name of the country
const user_year = args[1];


if (country.getCode(countryname)) {
  //  if the country name exists
  let Year;
  if (user_year != null)
     Year = user_year;
  else
     Year = new Date().getFullYear();
  
  const CountryCode = country.getCode(countryname);

  // const axios = require("axios");

  getHolidays();

  async function getHolidays() {
    try {
      
      const spinner = ora("Wait").start();

      setTimeout(() => {  
        spinner.color = "blue";
        spinner.text = "It's loading";
      }, 1000);
      
      figlet('Holidays', function(err, data) { //funny typo
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
      
    const response = await axios.get(
        `https://date.nager.at/api/v3/PublicHolidays/${Year}/${CountryCode}`
      );
      
      console.log("\n");
      response.data.forEach((element) => {
        console.log(
          chalk.red(element.date) + " - " + chalk.blue(element.localName) + " - " + chalk.yellow(element.name)
        );
      });
      spinner.stop();
    } catch (error) {
      console.error(error);
    }
  }
} else console.log("Please enter a valid country name !");
