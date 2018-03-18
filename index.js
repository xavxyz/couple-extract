const Couple = require('./couple');
const fs = require('fs-extra');
const dotenv = require('dotenv');

dotenv.config();

const { EMAIL, PASSWORD } = process.env;

const couple = new Couple();

const getData = async ({ limit } = {}) => {
  try {
    await couple.authenticate(EMAIL, PASSWORD);

    const identity = couple.identify();

    console.log('🚀  Fetching history');

    const timeline = await couple.timeline({ limit });

    console.log(`🍕  ${timeline.length} events fetched!`);

    await fs.writeJson(`./history/history-${Date.now()}.json`, timeline, {
      spaces: 2,
    });

    console.log('♥️  History saved in history.json!');
  } catch (e) {
    console.error(e);
  }
};

getData();
