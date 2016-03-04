/* eslint no-console: 0 */

import manager from 'commander';
import DB from '../backend/lib/db';
import config from 'config';
import faker from 'faker';
import * as userRepository from '../backend/repositories/user';
import * as doorRepository from '../backend/repositories/door';

function generateRandomModel(modelName) {
  let data;
  switch (modelName) {
    case 'user':
      data = {
        name: faker.name.findName(),
        password: faker.internet.password(),
      };
      break;
    case 'door':
      data = {
        name: faker.address.streetName(),
        actionGpioPin: faker.random.number(),
        statusGpioPin: faker.random.number(),
      };
      break;
    default:
      throw new Error('Bad model');
  }
  return data;
}

function saveModelInstance(modelName, data) {
  switch (modelName) {
    case 'user':
      return userRepository.addUser(data);
    case 'door':
      return doorRepository.addDoor(data);
    default:
      throw new Error('Bad model');
  }
}

function addToCollection(modelName, jsonfile) {
  let data;
  if (!jsonfile) {
    data = generateRandomModel(modelName);
  } else {
    const filename = jsonfile.search('/') === 0 ? jsonfile : `${process.cwd()}/${jsonfile}`;
    data = require(filename);
  }

  return new Promise((resolve, reject) => {
    saveModelInstance(modelName, data).then(() => {
      resolve();
    }).catch(err => {
      reject(err);
    });
  });
}

function parseCommandLine() {
  manager
    .command('add [collection] [file.json]')
    .description(`add a new record to the collection,
 if no json file is passed a random one will be inserted`)
    .action(addToCollection);

  manager.parse(process.argv);
}

const db = new DB(config.get('nedb'));
db.connect().then(() => {
  parseCommandLine();
}).catch(err => {
  console.log(err.message);
});
