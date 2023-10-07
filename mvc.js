// mvc.js
class Model {
  constructor() {
    this.data = [];
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.update());
  }
}

class View {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
  }

  update(data) {
    this.element.innerHTML = data;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.addObserver(this);
  }

  update() {
    this.view.update(this.model.data);
  }
}


const baseUrl = window.location.origin;

// Use a specific URL for development
if (window.location.hostname === 'localhost') {
  baseUrl = 'http://localhost:8080';
}


class Router 
{
  constructor(controller) {
    this.routes = {};
    this.controller = controller;
  }

  addRoute(route, page) {
    this.routes[route] = page;
  }

  navigate(route) {
    if (this.routes[route]) {
        fetch(`${baseUrl}/${this.routes[route]}`)
        //fetch(`http://127.0.0.1:8080/${this.routes[route]}`)
        .then(response => response.text())
        .then(data => {
          document.getElementById('app').innerHTML = data;
        })
        .catch(error => console.error('Error loading page:', error));
    }
  }
}
