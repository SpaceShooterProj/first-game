module.exports = function(app){
  //Controllers
  require('./controllers/style_controller')(app);
  require('./controllers/game_controller')(app);
}
