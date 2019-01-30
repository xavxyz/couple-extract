const Couple = require('./couple');
const fs = require('fs-extra');
const dotenv = require('dotenv');
const request = require('request');
const downloader = require('image-downloader');

dotenv.config();

const { EMAIL, PASSWORD } = process.env;

const couple = new Couple();

async function getData({ limit, order } = {}) {
  try {
    // console.log('⚡️ Authenticating');
    // await couple.authenticate(EMAIL, PASSWORD);

    // const identity = couple.identify();

    // console.log('🚀  Fetching history');

    // const timeline = await couple.timeline({
    //   limit,
    //   order,
    // });

    // console.log(`🍕  ${timeline.length} events fetched!`);

    // await fs.writeJson(`./history/history-${Date.now()}.json`, timeline, {
    //   spaces: 2,
    // });

    // console.log('♥️  History saved in history.json!');
    console.log('♥️  Using local history: timeline_couple.json');

    const alreadySavedImages = await fs.readdir('./images');
    const alreadySavedImagesTimeStamp = alreadySavedImages.map(filename => filename.substr(0, filename.length-4));

    const timeline = await fs.readJson('./history/timeline_couple.json');

    console.log(`🍕 ${timeline.length} events in the timeline!`);
    console.log(`🍕 ${alreadySavedImages.length-1} images already saved!`);

    //  download images
    const itemWithImages = timeline.filter(item => item.mediaType === 'image');
    console.log(`🏞 ${itemWithImages.length} images on-line`);

    const itemsToDownload = itemWithImages.filter(item => !alreadySavedImagesTimeStamp.find(timeStamp => Number(timeStamp) === item.timeStamp))

    console.log(`🏞 About to downloads ${itemsToDownload.length} images`);

    for (const item of itemsToDownload) {
      const options = {
        url: item.file,
        dest: `${process.cwd()}/images/${item.timeStamp}.jpg`,
      };

      try {
        const { filename } = await downloader.image(options);

        console.log(`👌 Image linked to message ${item.timeStamp} saved!`);
      } catch (e) {
        console.log(
          `💩 Couldn't save image linked to message ${
            item.timeStamp
          }, file url: ${options.url}`
        );
      }
    }

    console.log('🤝 We are done here, congrats!');

    process.exit(0);
  } catch (e) {
    console.error(
      '😵 Something went bad, you may want to restart the script...\n\n'
    );
    throw new Error(e);
  }
}

getData({ limit: 2, order: 'asc' });
