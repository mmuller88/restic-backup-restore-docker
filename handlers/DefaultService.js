const cp = require('child_process');

/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    cp.exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
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
      let { stdout } = await sh('restic snapshots');
      resolve(Service.successResponse({
        // result: stdout
        result: 'nice!!'
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
};
