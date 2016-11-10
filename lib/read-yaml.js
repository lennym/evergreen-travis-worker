const https = require('https');
const bl = require('bl');
const yaml = require('js-yaml');

function read (repo) {
  const url = `https://raw.githubusercontent.com/${repo}/master/.travis.yml`;
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode >= 300) {
        return reject(new Error('.travis.yml not found'));
      }
      response.pipe(bl((err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(yaml.load(data.toString()));
      }))
    }).on('error', reject);
  });
}

module.exports = read;