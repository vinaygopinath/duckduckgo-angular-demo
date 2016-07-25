otherConfig.$inject = ['$mdIconProvider', '$locationProvider'];
export function otherConfig($mdIconProvider: any, $locationProvider: any): void {
  $mdIconProvider.defaultFontSet('Material Icons');
  $locationProvider.html5Mode(false);
}
