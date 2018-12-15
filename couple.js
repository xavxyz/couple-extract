const rp = require('request-promise');

var JULIET_VER = '1.70'; // API version

exports.version = JULIET_VER;

class Couple {
  constructor(options) {
    this.options = options || {};
  }

  identify() {
    if (
      typeof this.authObject === 'undefined' ||
      typeof this.authObject.user === 'undefined' ||
      typeof this.authObject.user.other === 'undefined'
    ) {
      throw new Error('Must authenticated with Couple.');
    }

    return {
      userID: this.authObject.user.userID,
      authToken: this.authObject.authenticationToken,
      otherID: this.authObject.user.other.userID,
      apiHost: this.authObject.base,
      userUuid: this.authObject.user.uuid,
      pairUuid: this.authObject.user.pairID,
    };
  }

  timeline({ limit, order } = { order: 'desc' }) {
    if (
      typeof this.authObject === 'undefined' ||
      typeof this.authObject.user === 'undefined' ||
      typeof this.authObject.user.other === 'undefined'
    ) {
      throw new Error('Must authenticated with Couple.');
    }

    const { apiHost, authToken } = this.identify();
    return rp({
      uri: apiHost + '/timeline',
      method: 'GET',
      qs: {
        authenticationToken: authToken,
        order,
        limit,
      },
      json: true,
    })
      .then(responseObject => {
        if (typeof responseObject.error !== 'undefined') {
          throw new Error(responseObject.error);
        }

        return responseObject;
      })
      .catch(e => console.error(e));
  }

  authenticate(email, password) {
    return rp({
      uri: 'https://api-ssl.tenthbit.com/authenticate',
      method: 'POST',
      form: {
        userID: email,
        secretKey: password,
      },
      headers: {
        'x-juliet-ver': JULIET_VER,
      },
      json: true,
    })
      .then(responseObject => {
        if (typeof responseObject.error !== 'undefined') {
          throw new Error(responseObject.error);
        }

        this.authObject = responseObject;

        return responseObject;
      })
      .catch(e => console.error(e));
  }
}

exports = module.exports = Couple;
