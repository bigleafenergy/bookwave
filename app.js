const express = require("express")
const app = express();

app.get("/", function (req,res){

  res.sendFile(__dirname + "/home.html");
});


app.use(express.static(__dirname + '/public'));


app.listen(3000,function(){
  console.log("running on 3000");
});
