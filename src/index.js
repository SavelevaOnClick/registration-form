const styl = document.head.appendChild(document.createElement("style"));
styl.innerHTML = `
  image {
    width: 200px;
  }
  #form {
    width: 500px;
    margin: 0 auto;
    display: flex;
    padding-top: 50px;
  }
`;
const form = document.getElementById("form");
function forma() {
  const temple = `
  <div id="wrap">
    <input name="login" id="userId" placeholder="login">
    <button id="btn">отправить</button>
  </div>
  `;
  form.innerHTML = temple;
  const wrap = document.getElementById("wrap");
  const userLogin = document.getElementById("userId");
  const btn = document.getElementById("btn");

  btn.onclick = function (event) {
    wrap.remove();
    forma2(this.value);
  }.bind(userLogin);
}

function forma2(log) {
  const temple = `
  <div id="wrap">
    <input type="password" id="userPas" placeholder="password">
    <button id="btn">отправить</button>
  </div>
  `;
  form.innerHTML = temple;
  const wrap = document.getElementById("wrap");
  const userPas = document.getElementById("userPas");
  const btn = document.getElementById("btn");

  btn.onclick = function (event) {
    console.log(log);
    wrap.remove();
    forma3(log, this.value);
  }.bind(userPas);
}

forma();

function forma3(log, pas) {
  const temple = `
  <div id="wrap">
    <input type="file" id="userAva">
    <button id="btn">отправить</button>
    <img id="ava" />
  </div>
  `;
  form.innerHTML = temple;
  const wrap = document.getElementById("wrap");
  const userAva = document.getElementById("userAva");
  const btn = document.getElementById("btn");
  const avatar = document.getElementById("ava");
  userAva.onchange = function (event) {
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = function (event) {
      avatar.src = event.target.result;
    };
  };
  btn.onclick = function (event) {
    wrap.remove();
    forma4(log, pas, avatar.src);
  };
}

function forma4(log, pas, avatar) {
  const temple = `
  <div id="wrap">
    <input  id="userAge" placeholder="возраст">
    <button id="btn">отправить</button>
  </div>
  `;
  form.innerHTML = temple;
  const wrap = document.getElementById("wrap");
  const userAge = document.getElementById("userAge");
  const btn = document.getElementById("btn");

  btn.onclick = function (event) {
    wrap.remove();
    sendData(log, pas, avatar, this.value);
  }.bind(userAge);
}

async function sendData(login, pass, avatar, age_) {
  await (
    await fetch(`https://garevna-rest-api.glitch.me/user/${login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: pass,
        avatarSrc: avatar,
        age: age_,
      }),
    })
  ).json();
  form.innerText = `well done`;
}
