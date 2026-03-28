const hidifyMessages = (messages) => {
  let counter = 1;
  const users = {};
  return messages.map((message) => {
    users[message.username] = users[message.username] || counter++;
    const hiddenUsername = "User " + users[message.username];
    return { ...message, timestamp: "???", username: hiddenUsername };
  });
};

module.exports = { hidifyMessages };
