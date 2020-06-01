const cp = require('child_process');

/* eslint-disable no-unused-vars */
const Service = require('./Service');
const logger = require('./logger');

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    cp.exec(cmd, (err, stdout, stderr) => {
      // if (err) {
      //   reject(err);
      // } else {
        resolve({ stdout, stderr });
      // }
    });
  });
}

/**
* List all snapshots
*
* returns String
* */
const getSnapshots = () => new Promise(
  async (resolve, reject) => {
    try {
      let { stdout, stderr } = await sh('restic snapshots --json');
      logger.info(`stdout: ${stdout}`)
      logger.info(`stderr: ${stderr}`)
      let stdoutJSON = JSON.parse(stdout);
      resolve(Service.successResponse(stdoutJSON));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

/**
* Executes an restore based on the **short_id**
*
* shortId String Snapshot id Query Parameter.
* returns List
* */
const restoreSnapshot = ({ shortId }) => new Promise(
  async (resolve, reject) => {
    try {
      let { stdout, stderr } = await sh(`restic restore ${shortId} --target /`);
      logger.info(`stdout: ${stdout}`)
      logger.info(`stderr: ${stderr}`)
      if(stderr){
        if(stderr.includes('no matching ID found')){
          // logger.info(`no matching ID found`)
          reject(Service.rejectResponse(
            'Snapshot Id not found',
            404,
          ));
        }
      }
      resolve(Service.successResponse({
        shortId,
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  getSnapshots,
  restoreSnapshot
};
