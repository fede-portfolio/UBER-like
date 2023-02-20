/* eslint-disable */
const fastifyPlugin = require('fastify-plugin');
const firebaseApp = require('./firebase_app');
const { getAuth } = require('firebase-admin/auth');
const axios = require('axios');
const settings = require('../conf/config');
const verifyAdminEmail = require('./verify_admin');

async function verifyDriver(token, username){
    let emailUser;
    let goodDriver = true;
    try {
      await getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          console.log('EL TOKEN ES CORRECTO');
          console.log('SOY RIDER');
          const { uid } = decodedToken;
          const { email } = decodedToken;
          emailUser = email;
          console.log(emailUser);
          console.log(uid);

        })
        .catch((error) => {
          console.log('ERROR EN EL TOKEN');
          console.log(error);
          reply.status(401).send(error);
          return reply;
        });
      const verifyAdmin = await verifyAdminEmail(emailUser);
      if (verifyAdmin === true){
        return true;
      }
      let driverResponse;
      console.log("CHEQUEO DRIVER");
        try {
            console.log(emailUser);
            driverResponse = await axios.get(
              `${settings.serviceUsersURL()}/drivers/${emailUser}`
            );          
            console.log("DRIER RESPONSE ES:");
            console.log(driverResponse.data.username);
            console.log("DRIVER USERNAME ES:");
            console.log(username);
            if(driverResponse.status === 200 && driverResponse.data.username  != username){
              console.log("SOY FALSO")
              goodDriver = false;
            }
        } catch (error) {
            console.log("DRIVER NOT FOUND")
            if (!error.response || error.response.status >= 500) {
              goodDriver = false;
            }
            if (error.response && error.response.status === 404) {
              goodDriver = false;
            }
      }
      
    } catch (error) {
      return false
    }
    return goodDriver;
  };

async function verifyDriverEmail(token, driver_email){
    let emailToken;
    try {
      await getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          console.log('EL TOKEN ES CORRECTO');
          console.log('SOY RIDER');
          const { uid } = decodedToken;
          const { email } = decodedToken;
          emailToken = email;
          console.log(emailToken);
          console.log(uid);

        })
        .catch((error) => {
          console.log('ERROR EN EL TOKEN');
          console.log(error);
          reply.status(401).send(error);
          return reply;
        });
      
    } catch (error) {
      return false
    }
    return emailToken === driver_email;
};

exports.verifyDriver = verifyDriver;
exports.verifyDriverEmail = verifyDriverEmail;
