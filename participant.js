var app = new window.Webex.Application();

app.onReady().then(() => {
  log('onReady()', { message: 'participant app is ready' })
  app.listen().then(() => {
    app.on('application:displayContextChanged', (payload) => log('application:displayContextChanged', payload));
    app.on('application:shareStateChanged', (payload) => log('application:shareStateChanged', payload));
    app.on('application:themeChanged', (payload) => log('application:themeChanged', payload));
    app.on('meeting:infoChanged', (payload) => log('meeting:infoChanged', payload));
    app.on('meeting:roleChanged', (payload) => log('meeting:roleChanged', payload));
    app.on('space:infoChanged', (payload) => log('space:infoChanged', payload));
  })
});

function getInputValue() {
  let myValue = document.getElementById("userField").value;
  return myValue;
}

function getUserVaule(keyName){
  const myStorage = window.localStorage.getItem(keyName);
  return myStorage;
}

function setUserVaule(key, value){
  window.localStorage.setItem(key,value);
}

function handleGetUser() {
  app.context.getUser().then((u) => {
    log('getUser()', u);

    var input = getInputValue();
    setUserVaule(u.id, input)

  }).catch((error) => {
    log('getUser() promise failed with error', Webex.Application.ErrorCodes[error]);
  })
}


function log(type, data) {
  var ul = document.getElementById("console");
  var li = document.createElement("li");
  var payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
  li.appendChild(payload)
  ul.prepend(li);
}
