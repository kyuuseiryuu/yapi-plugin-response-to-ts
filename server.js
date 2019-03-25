const controller = require('./controller/TranslateController');

module.exports = function () {
  this.bindHook('add_router', function(addRouter) {
    addRouter({
      controller: controller,
      method: 'post',
      path: 'response-to-ts/test',
      action: 'translate',
    })
  });
};