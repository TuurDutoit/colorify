import {decToHex} from "./converter";

export const getColors = (str, prefix) => {
  let decimal = "";

  for(let i = 0, len = str.length; i < len; i++) {
    decimal += str.charCodeAt(i);
  }

  let hex = decToHex(decimal);
  let colors = [];

  for(var i = 0, len = hex.length - 6; i <= len; i+=6) {
    colors.push( (prefix ? "#" : "") + hex.substr(i, 6) );
  }

  colors.rest = hex.slice(i);

  return colors;
}

export const getPrimes = function*() {
  let primes = [];
  let num = 2;
  let isPrime;

  while(true) {
    isPrime = true;
    for(let i = 0, len = primes.length; i < len; i++) {
      if(num % primes[i] === 0) {
        isPrime = false;
        break;
      }
    }

    if(isPrime) {
      primes.push(num);
      yield num;
    }

    num++;
  }
}

export const getDividers = (num) => {
  let primes = getPrimes();
  let i = primes.next().value;
  let dividers = [];

  while(num > 1) {
    if(num % i === 0) {
      dividers.push(i);
      num /= i;
    }
    else {
      i = primes.next().value;
    }
  }

  return dividers;
}

export const divideSpace = (parts, ratio) => {
  let dividers = getDividers(parts);
  let acc1 = 1;
  let acc2 = 1;

  for(let i = dividers.length - 1; i >= 0; i--) {
    let divider = dividers[i];
    let test1 = acc1 * divider / acc2;
    let test2 = acc1 / (acc2 * divider);

    if(Math.abs(1 - (ratio / test1)) < Math.abs(1 - (ratio / test2))) {
      // test1 is closest, add to acc1
      acc1 *= divider;
    }
    else {
      acc2 *= divider;
    }
  }

  return [acc1, acc2];
}

export const parse = colors => {
  let html = "";

  if(colors.length) {
    let distribution = divideSpace(colors.length, window.innerWidth / window.innerHeight);
    let cols = distribution[0];
    let rows = distribution[1];

    for(let i = 0; i < rows; i++) {
      html += '<tr>';
      for(let j = 0; j < cols; j++) {
        let color = colors[(i*cols)+j];
        html += `<td style="background-color:${color}" data-color="${color}"></td>`;
      }
      html += '</tr>';
    }
  }
  else {
    html = '<tr><td style="background-color:#ffffff" data-color=""></td></tr>';
  }

  return html;
}
