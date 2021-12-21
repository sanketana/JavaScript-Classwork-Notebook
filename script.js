function clickAction(event) {
  event.target.classList.toggle('complete');
}

choresList.onclick = clickAction;