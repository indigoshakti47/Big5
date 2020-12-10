
/**
 * Checks whether a given string is an email.
 * 
 * @param {string} email A string to be checked. 
 * @return {boolean}
 */
function isEmail(email) {
    var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regex.test(email);
}

/**
 * Returns the available roles for the application.
 * 
 * @return {Array<string>}
 */
function getAvailableRoles() {
    return ["client", "inJur", "inNat", "admin"];
}

/**
 * Returns the sum of two averages, if you wan't to append a new value to an
 * existing average you can use avg2 as your new value and count2 as 1. Since
 * technically the average of a single number is the same number.
 * 
 * @param {number} avg1 The original average.
 * @param {number} count1 The count of items that the average have.
 * @param {number} avg2 The new value or new average.
 * @param {number?} count2 The count of items of the second average, if it isn't
 *      proportioned, the function will asume that avg2 is a new value instead
 *      of an average to be added.
 * 
 * @return {number} The new average.
 */
function getAverage(avg1, count1, avg2, count2 = 1) {
    return ((avg1 * count1) + (avg2 * count2)) / (count1 + count2);
}

/**
 * Returns the necessary data for the application to start.
 * 
 * @return {Object}
 */
function getFirebaseCredentials() {
    return {
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
    };
}

/**
 * Checks if the pInfo Object is valid within the requeriments, it must contain:
 * first name, last name, an office, a phone number, an adress, a city and a 
 * country. Optionally, you can specify some additional notes
 * 
 * @param {Object} pInfo Personal information about the user. 
 * @param {string} pInfo.firstName
 * @param {string} pInfo.lastName 
 * @param {string} pInfo.office 
 * @param {string} pInfo.phoneNumber 
 * @param {string} pInfo.address
 * @param {string} pInfo.city 
 * @param {string} pInfo.country
 * @param {string=} pInfo.addNotes Some additional notes. 
 * 
 * @return {boolean}
 */
function isInhouseValid(pInfo) {
    if (pInfo == null) return false;

    const profileRequired = ['userName', 'idType', 'idNumber', 'state', 'city', 'phoneInd', 'phoneNumber', 'address'];
    const profileOptional = ['camara', 'nameC', 'RUT', 'nameR', 'cedulaRep', 'nameCR', 'certifBan', 'nameCB', 'companyName', 'jobTitle'];

    for (const key in pInfo) {
        if (typeof pInfo[key] != 'string') return false;
        if (!profileRequired.includes(key) && !profileOptional.includes(key))
            return false;
    }

    for (let i = 0; i < profileRequired.length; i++) {
        if (!(profileRequired[i] in pInfo)) return false;
    }

    return true;
}

/**
 * Checks if the pInfo Object is valid within the requeriments of client
 * 
 * @return {boolean}
 */
function isClientValid(pInfo) {
    if (pInfo == null) return false;

    const profileRequired = ['userName', 'idType', 'idNumber', 'state', 'city', 'phoneInd', 'phoneNumber', 'address'];
    const profileOptional = [];

    for (const key in pInfo) {
        if (typeof pInfo[key] != 'string') return false;
        if (!profileRequired.includes(key) && !profileOptional.includes(key))
            return false;
    }

    for (let i = 0; i < profileRequired.length; i++) {
        if (!(profileRequired[i] in pInfo)) return false;
    }

    return true;
}

/**
 * Convert a string into a Date, if a period is defined a range will be 
 * returned.
 * 
 * @example stringToDate('2020-04-15', 'Month') 
 * returns -> {
 *      startDate: 2020-04-01T00:00:0000Z,
 *      endDate: 2020-05-01T00:00:0000Z
 * }
 * 
 * @param {string} dateStr The string with a date format.
 * @param {string} period The period of time you want to get, it can be 'Month',
 *      'Date' or 'Hours'.
 * 
 * @return {Object} Object that contains the converted date or the range of 
 *      dates.
 */
function stringToDate(dateStr, period) {
    if (dateStr == null) return null;
    dateStr = dateStr.split('T');
    var startDate = new Date(dateStr[0]);
    if (isNaN(startDate)) return null;

    if (dateStr.length == 2) startDate.setUTCHours(dateStr[1].split(":")[0]);
    if (period == null) return startDate;


    if (period == 'Month') startDate.setUTCDate(1);
    var endDate = new Date(startDate);

    endDate[`setUTC${period}`](endDate[`getUTC${period}`]() + 1);
    return { startDate: startDate, endDate: endDate };
}

/**
 * Transform a given HTTP method to its equivalent for the access control
 * package.
 * 
 * @param {string} method 
 */
function queryTransformation(method) {
    var actions;
    switch (method) {
        case 'GET':
            actions = 'read'
            break;
        case 'POST':
            actions = 'create'
            break;
        case 'PUT':
            actions = 'update'
            break;
        case 'DELETE':
            actions = 'delete'
            break;

        default:
            break;
    }

    return actions;
}

/**
 * Get a range of dates in an array, the array contains dates from the current 
 * date to ${time} times the same date in the past.
 * 
 * @example getDateFromToday('Month', 3)
 * returns -> [
 *      2020-04-01T00:00:0000Z,
 *      2020-03-01T00:00:0000Z,
 *      2020-02-01T00:00:0000Z,
 * ]
 * 
 * @param {string} property The period of time you want to get, it can be 'Month',
 *      'Date' or 'Hours'.
 * @param {number} time The number of ${property} you wan't to get back.
 * 
 * @return {Array} An array of dates.
 */
function getDateFromToday(property, time) {
    const curDate = new Date();
    var dateSorted = [];

    for (let i = 0; i < time; i++) {
        var newDate = new Date(new Date()[`set${property}`](curDate[
            `get${property}`]() - i));

        if (property == 'Hours') {
            dateSorted.push(newDate.toISOString().split(':')[0]);
            continue;
        }

        dateSorted.push(newDate.toISOString().split('T')[0])

    }

    return dateSorted;
}

function getCurrentDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); 
  let yyyy = today.getFullYear();
  let seconds = today.getSeconds();
  let minutes = today.getMinutes();
  let hour = today.getHours();

  let Hour = `${hour}:${minutes}:${seconds}`;
  let Day = mm + "/" + dd + "/" + yyyy;

  return {Hour, Day}
}

module.exports.isEmail = isEmail;
module.exports.getAvailableRoles = getAvailableRoles;
module.exports.getAverage = getAverage;
module.exports.getFirebaseCredentials = getFirebaseCredentials;
module.exports.isInhouseValid = isInhouseValid;
module.exports.isClientValid = isClientValid;
module.exports.stringToDate = stringToDate;
module.exports.queryTransformation = queryTransformation;
module.exports.getDateFromToday = getDateFromToday;
module.exports.getCurrentDate = getCurrentDate;