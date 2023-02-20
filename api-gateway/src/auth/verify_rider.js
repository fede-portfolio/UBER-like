/* eslint-disable */
const fastifyPlugin = require('fastify-plugin');
const firebaseApp = require('./firebase_app');
const { getAuth } = require('firebase-admin/auth');
const axios = require('axios');
const settings = require('../conf/config');
const verifyAdminEmail = require('./verify_admin');

async function verifyRider(token, rider_username){
    let emailRider;
    try {
      await getAuth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          console.log('EL TOKEN ES CORRECTO');
          console.log('SOY RIDER');
          const { uid } = decodedToken;
          const { email } = decodedToken;
          emailRider = email;
          console.log(emailRider);
          console.log(uid);

        })
        .catch((error) => {
          console.log('ERROR EN EL TOKEN');
          console.log(error);
          reply.status(401).send(error);
          return reply;
        });
        const verifyAdmin = await verifyAdminEmail(emailRider);
        if (verifyAdmin === true){
          return true;
        }
        let riderResponse;
        console.log("CHEQUEO RIDER");
        try {
            console.log(emailRider);
            riderResponse = await axios.get(
                `${settings.serviceUsersURL()}/riders/${emailRider}`
              );
            console.log("RIDER RESPONSE ES:");
            console.log(riderResponse.data.username);
            console.log("RIDER USERNAME ES:");
            console.log(rider_username);
            if(riderResponse.status === 200 && riderResponse.data.username  != rider_username){
              console.log("SOY FALSO")
              return false;
            }
        } catch (error) {
            console.log("ERROR FIRE TEST NOT FOUND")
            if (!error.response || error.response.status >= 500) {
            return false;
            }
            if (error.response && error.response.status === 404) {
            return false;
            }
      }
      
    } catch (error) {
      return false
    }
    return true;
  };
  
async function verifyRiderEmail(token, rider_email){
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
    return emailToken === rider_email;
};

exports.verifyRider = verifyRider;
exports.verifyRiderEmail = verifyRiderEmail;
