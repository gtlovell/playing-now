var mainContainer = document.getElementById('js-main-container'),
  loginContainer = document.getElementById('js-login-container'),
  loginButton = document.getElementById('js-btn-login'),
  background = document.getElementById('js-background');

var spotifyPlayer = new SpotifyPlayer();

var template = function(data) {
  return `
    <div class="main-wrapper">
      <div class="now-playing__img">
        <img src="${data.item.album.images[0].url}">
      </div>
      <div class="now-playing__side">
        <div class="progress">
          <div class="progress__bar" style="width:${(data.progress_ms * 100) /
            data.item.duration_ms}%"></div>
        </div>
      </div>
    </div>
    <div class="background" style="background-image:url(${
      data.item.album.images[0].url
    })"></div>
  `;
};

spotifyPlayer.on('update', response => {
  mainContainer.innerHTML = template(response);
});

spotifyPlayer.on('login', user => {
  if (user === null) {
    loginContainer.style.display = 'block';
    mainContainer.style.display = 'none';
  } else {
    loginContainer.style.display = 'none';
    mainContainer.style.display = 'block';
  }
});

loginButton.addEventListener('click', () => {
  spotifyPlayer.login();
});

spotifyPlayer.init();
