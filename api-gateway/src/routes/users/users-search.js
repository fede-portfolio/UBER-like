const axios = require('axios');
const settings = require('../../conf/config');

// TODO: Handlear 404 y 500 para decidir si se sigue contestando
// o NO.

const { fetchUserData, fetchRiderData, fetchDriverData } = require('./users-common');

async function findByUsernameLike(like) {
  const uri = `${settings.serviceUsersURL()}/users/search/${like}`;
  const foundUsersResponse = await axios.get(uri);
  const foundUsers = [];
  foundUsersResponse.data.forEach((element) => {
    foundUsers.push(fetchUserData(element));
  });
  const resolvedFoundUsers = await Promise.all(foundUsers);
  return resolvedFoundUsers;
}

async function findByEmail(email) {
  const foundUser = await axios.get(`${settings.serviceUsersURL()}/users/${email}`);
  const userResponse = foundUser.data;
  userResponse.rider_information = await fetchRiderData(userResponse.email);
  userResponse.driver_information = await fetchDriverData(userResponse.email);
  return [userResponse];
}

async function usersSearch(req, reply) {
  const { email } = req.query;
  const { like } = req.query;

  // TODO: Chequear mejor?

  if (like !== undefined) {
    const found = await findByUsernameLike(like);
    return reply.status(200).send(found);
  }
  if (email !== undefined) {
    const found = await findByEmail(email);
    return reply.status(200).send(found);
  }
  return reply.status(404).send(
    {
      message: 'User not found',
    },
  );
}

module.exports = usersSearch;
