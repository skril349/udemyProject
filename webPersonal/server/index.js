const mongoose = require("mongoose");
const app = require("./app");
const PORT_SERVER = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

//mongoose.set("useFindAndModify",false);

mongoose.connect(
  //localhost
  //`mongodb://${IP_SERVER}:${PORT_DB}/tonivivescabaleiro`,
  `mongodb+srv://aabbcc:MERN1234@cluster0.oz8cs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("la conexion a la base de datos es correcta");

      app.listen(PORT_SERVER, () => {
        console.log("##########################");
        console.log("####### API REST #########");
        console.log("##########################");
        console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}/`);
      });
    }
  }
);
