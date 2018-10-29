import _ from 'lodash';
import printMe from './print';

function component() {
  const element = document.createElement('div');
  const button = document.createElement('button');
  button.innerHTML = 'Click me and check the console!';
  button.onclick = printMe;

  element.appendChild(button);
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}

document.body.appendChild(component());