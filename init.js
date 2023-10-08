    const myModel = new Model();
    const myView = new View('app');
    const myController = new Controller(myModel, myView);
    const myRouter = new Router(myController);

    myRouter.addRoute('/', 'home.html');
    myRouter.addRoute('/about', 'about.html');
    myRouter.addRoute('/services', 'services.html');
    myRouter.addRoute('/contact', 'contact.html'); 
    myRouter.addRoute('/login', 'login.html'); 
    myRouter.addRoute('/register', 'register.html');   

    function navigateTo(route) {
      myRouter.navigate(route);
    }