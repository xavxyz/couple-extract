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
