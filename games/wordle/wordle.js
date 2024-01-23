const keyboard = document.getElementById('keyboard')
LETTERS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']

// keyboard.appendChild(keyEl)
const createEle = () => {
  console.log('object');
  const keyEl = document.createElement('p')
  // keyEl.innerText = 'sdlfkj'
  const txt = document.createTextNode('123')
  // keyboard.appendChild(txt)
  document.getElementById('keyboard').appendChild(txt)

}

document.body.onload = createEle