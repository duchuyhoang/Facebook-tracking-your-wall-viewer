const request = require("request");
const url = "https://624912aa831c69c687c9e40e.mockapi.io/tracking/users/:id";
const standerlizedRequestOption = (data) => ({
  body: JSON.stringify(data),
  headers: {
    "Content-type": "application/json",
  },
});
exports.addUser = (data, options = {}) => {
  request.get(url.replace(":id", ""), options, (error, res, body) => {
    if (error) {
      console.error(error);
    } else {
      const results = JSON.parse(body);
      let selectedId = null;
      for (let i = 0; i < results.length; i++) {
        if (results[i].idUser === data.idUser) {
          selectedId = results[i].id;
          break;
        }
      }
      if (!selectedId) {
        request.post(
          url.replace(":id", ""),
          standerlizedRequestOption(data),
          (err, res, body) => {
            if (err) console.error(err);
            else
              console.log(
                "Add new user",
                res.statusCode,
                data.idUser,
                data.name
              );
          }
        );
      } else {
        request.put(
          url.replace(":id", selectedId),
          standerlizedRequestOption(data),
          (err, res, body) => {
            if (err) console.error(err);
            else
              console.log("Edit user", res.statusCode, data.idUser, data.name);
          }
        );
      }
    }
  });
};
