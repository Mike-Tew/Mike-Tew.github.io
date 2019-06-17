$(function () {
  $("#navbar").load("navbar.html");
});

document.getElementById('submit').addEventListener('click', () => {
  let node = document.createElement('li');
  node.appendChild(document.createElement('label'));
  node.appendChild(document.createElement('input')).type = 'checkbox';
  let item = document.getElementById('add-item').value;
  item = document.createTextNode(item);
  node.appendChild(item);
  document.getElementById('todo-list').appendChild(node);
  console.log(item);
})