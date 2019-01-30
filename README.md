# Couple.me extract

## Install

Edit `.env` with your [Couple.me](https://couple.me) credentials

Then run these commands:

```sh
# install dependencies
yarn

# run the script
yarn start
```

Your history will be saved in a JSON file inside the `history` directory, suffixed with the request's timestamp.

## API

```js
// default limit is EVERYTHING
getData({ limit: 100 });
```

## Fetching history manually if API is down

Once logeed in, visit https://app.couple.me/1/p/timeline (this may take a while to load depending on how many messages you have), and Save the JSON file in /history as `timeline_couple.json`.

The script will parse and download locally all the images from the JSON file that you have backed up manually.