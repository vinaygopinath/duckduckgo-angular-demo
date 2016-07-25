import 'angular-route';
routes.$inject = ['$routeProvider'];
export function routes($routeProvider: ng.route.IRouteProvider): void {
  $routeProvider.when('/search', {
    template: '<search></search>'
  }).when('/history', {
    template: '<history></history>'
  })
  .otherwise({
    redirectTo: '/search'
  });
}
