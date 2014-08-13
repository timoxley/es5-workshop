function getLoggedInUserIds(users) {
  return users.filter(function(user) {
    return user.loggedIn
  }).map(function(user) {
    return user.id
  })
}

module.exports = getLoggedInUserIds
