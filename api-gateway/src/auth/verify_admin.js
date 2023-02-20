/* eslint-disable */
const axios = require('axios');
const settings = require('../conf/config');

async function verifyAdminEmail(email){
    console.log("VERIFICO EMAIL ADMIN");
    const adminsURI = `${settings.serviceUsersURL()}/admins/${email}`;
    let adminFullResponse;
    try {
        adminFullResponse = await axios.get(adminsURI);
        console.log(email);
        return true;
    } catch (error) {
        if (!error.response || error.response.status >= 500) {
        console.log("ERROR SERIVICIO");
        return false;
        }
        if (error.response && error.response.status === 404) {
        console.log("NO SE ENCONTRO ADMIN");
        return false;
        }
    }
}

module.exports = verifyAdminEmail;