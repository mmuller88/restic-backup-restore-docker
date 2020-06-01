/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* List all snapshots 
*
* returns List
* */
const getSnapshots = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
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
  restoreSnapshot,
};
