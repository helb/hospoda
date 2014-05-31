Router.map(function() {
  this.route('hospoda', {path: '/hospoda', onAfterAction: function(){document.title = 'hospoda'}})
  this.route('kuchyne', {path: '/kuchyne', onAfterAction: function(){document.title = 'kuchyně'}})
  this.route('report', {path: '/report', onAfterAction: function(){document.title = 'tabulka'}})
});