import './app.scss';

export class AppComponent implements ng.IComponentOptions {
  public template: string =  require('./app.html').toString();
  public controller: Function = AppController;
  public controllerAs: string = 'vm';
}

export class AppController {
  
  public static $inject = ['$mdSidenav'];
  constructor(private $mdSidenav: any) {}

  toggleMenu() {
    this.$mdSidenav('left-sidenav').toggle();
  }
}
