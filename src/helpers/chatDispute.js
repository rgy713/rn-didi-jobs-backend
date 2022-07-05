const badWordsList = [
  "Fuck",
  "Shit",
  "Asshole",
  "Cunt",
  "Motherfucker",
  "Nigger",
  "Nigga",
  "Faggot",
  "Slut",
  "Whore",
  "Kike",
  "Chunk",
  "Spic",
];
module.exports = {
  chatDisputeCount: 3,

  checkBadWord: (message) => {
    let status = false;
    badWordsList.forEach((badWord) => {
      if (message.toLowerCase().includes(badWord.toLowerCase())) {
        status = true;
        return status;
      }
    });
    return status;
  },
};
