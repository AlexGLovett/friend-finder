var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var match = {
      name: "",
      photo: ""
    };

    var userResps = req.body.scores;
    var differences = [];
    var diff = 1000;

    function getSum(total, num) {
      return total + num;
    }

    friends.forEach(function(friend) {
      differences = [];

      for (var i = 0; i < 10; i++) {
        differences.push(Math.abs(parseInt(userResps[i]) - parseInt(friend.scores[i])));
      }

      totalDif = differences.reduce(getSum);

      if (totalDif < diff) {
        match.name = friend.name;
        match.photo = friend.photo;
        diff = totalDif;
      }
    });
    friends.push(req.body);
    res.json(match);
  });
};
