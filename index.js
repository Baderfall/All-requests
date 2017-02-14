const field = document.querySelector('#search-field');
const btn = document.querySelector('#search-button');

btn.addEventListener('click', () => {
  const value = field.value;
  drawPhoto(value);
});

field.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    btn.click();
  }
});

function getSrc(response) {
  const JSONresponse = JSON.parse(response);
  const src = JSONresponse.items[0].snippet.thumbnails.high.url;
  return src;
}

function getImg(src) {
  const img = document.createElement('img');
  img.src = src;
  return img;
}

function drawImg(img) {
  const wrapper = document.querySelector('.img-wrapper');
  wrapper.innerHTML = '';
  wrapper.appendChild(img);
}

/******CLASSIC AJAX / COMET*******/

function drawPhoto(value) {
  const xhr = new XMLHttpRequest();
  const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyB9COzxg7qOvThJlJcRb523mybrL9MSU84&type=video&part=snippet&maxResults=1&q=${value}`;
  
  xhr.open('GET', url);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return;
    }
  
    if (xhr.status === 200) {
      const response = xhr.responseText;
      const src = getSrc(response);
      const img = getImg(src);
      
      drawImg(img);
    }
  };
}

/*******AJAX / COMET onload onerror*******/

function drawPhoto(value) {
  const xhr = new XMLHttpRequest();
  const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyB9COzxg7qOvThJlJcRb523mybrL9MSU84&type=video&part=snippet&maxResults=1&q=${value}`;
  
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = function() {
    const response = xhr.responseText;
    const src = getSrc(response);
    const img = getImg(src);
    
    drawImg(img);
  };

  xhr.onerror = function() {
    console.log(xhr.statusText);
  };
}

/******WEBSOCKET*****/

/*const ws = new WebSocket('ws://echo.websocket.org');

ws.onopen = function() {
  console.log('Соединение установлено.');
  this.send('ALO');
};

ws.onclose = function(e) {
  if (e.wasClean) {
    console.log('Соединение закрыто.');
  } else {
    console.log('Соединение разорвано.');
  }
  console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

ws.onmessage = function(e) {
  console.log('Получены данные: ' + e.data);
};

ws.onerror = function(error) {
  console.log('Ошибка: ' + error.message);
};

setTimeout(function() {
  ws.close();
}, 3000);*/

/*********PROMISE********/

function drawPhoto(value) {
  const promise = new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyB9COzxg7qOvThJlJcRb523mybrL9MSU84&type=video&part=snippet&maxResults=1&q=${value}`;
    
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = function() {
      resolve(this.responseText);
    };
  });
  
  promise.then(response => {
    return getSrc(response);
  })
  .then(src => {
    return getImg(src);
  })
  .then(img => {
    drawImg(img);
  });
}

/*********FETCH*********/

function drawPhoto(value) {
  fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyB9COzxg7qOvThJlJcRb523mybrL9MSU84&type=video&part=snippet&maxResults=1&q=${value}`)
    .then(response => {
      // could return in .json() || .blob() || .arrayBuffer()
      return response.text();
    })
    .then(response => {
      return getSrc(response);
    })
    .then(src => {
      return getImg(src);
    })
    .then(img => {
      drawImg(img);
    });
}
