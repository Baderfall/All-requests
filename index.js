const field = document.querySelector('#search-field');
const btn = document.querySelector('#search-button');

btn.addEventListener('click', () => {
  const value = field.value;
  getPhotoSrc(value);
});

function getSrc(response) {
  const JSONresponse = JSON.parse(response);
  const src = JSONresponse.items[0].snippet.thumbnails.high.url;
  return src;
}

function getImage(src) {
  var img = document.createElement('img');
  img.src = src;
  return img;
}

function drawImage(img) {
  const wrapper = document.querySelector('.img-wrapper');
  wrapper.innerHTML = '';
  wrapper.appendChild(img);
}

/******CLASSIC AJAX / COMET*******/

function getPhotoSrc(value) {
  const xhr = new XMLHttpRequest();
  const url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyB9COzxg7qOvThJlJcRb523mybrL9MSU84&type=video&part=snippet&maxResults=15&q=${value}`;
  xhr.open('GET', url);
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.send();

  xhr.onreadystatechange = function() { // (3)
    if (xhr.readyState !== 4) {
      return;
    }
  
    if (xhr.status !== 200) {
    } else {
      console.log(xhr.getAllResponseHeaders());
      const response = xhr.responseText;
      const src = getSrc(response);
      const img = getImage(src);
      drawImage(img);
    }
  };
}

