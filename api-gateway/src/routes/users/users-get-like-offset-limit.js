const axios = require('axios');
const settings = require('../../conf/config');

const { fetchUserData } = require('./users-common');

async function getLikeOffsetLimit(req, reply) {
  const uri = `${settings.serviceUsersURL()}/users/`;
  const foundUsersResponse = await axios.get(uri, { params: req.query });
  const foundUsers = [];
  foundUsersResponse.data.users.forEach((element) => {
    foundUsers.push(fetchUserData(element));
  });
  const resolvedFoundUsers = await Promise.all(foundUsers);
  const response = {
    actual_page: foundUsersResponse.data.actual_page,
    total_pages: foundUsersResponse.data.total_pages,
    users: resolvedFoundUsers,
  };
  return reply.status(200).send(response);
}

module.exports = getLikeOffsetLimit;
