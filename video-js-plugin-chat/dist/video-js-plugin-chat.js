import { storageGetter } from '../src/helpers/localstorage.js';
import { readyComments } from '../src/utils/fakeDB.comments.js';
import { templateRecorder } from '../src/helpers/template-workers.js';
import { button, input, messages, template, video } from '../src/utils/global-vars.js';
import { KEY } from '../src/utils/consts.js';
import { handleClickVideo } from '../src/helpers/player-click.js';

export function chatPlugin(options) {
  const storageParser = () => {
    let data = false;

    if (localStorage.getItem(KEY)) {
      data = JSON.parse(localStorage.getItem(KEY));
    }

    if (!data) {
      localStorage.setItem(KEY, JSON.stringify(readyComments));
      data = JSON.parse(localStorage.getItem(KEY));
    }
    console.log(template, messages, data);
    storageGetter(template, messages, data);
  };

  const handleClickSend = (event) => {
    event.preventDefault();
    const commentText = input.value;
    templateRecorder(messages, template, commentText);

    input.value = '';
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  storageParser();

  button.addEventListener('click', handleClickSend);

  document.querySelectorAll('textarea').forEach(el => {
    el.classList.add('auto');
    el.addEventListener('input', e => {
      el.style.height = 'auto';
      el.style.height = (el.scrollHeight) + 'px';
    });
  });


  video.addEventListener('click', handleClickVideo);
}

videojs.registerPlugin('chatPlugin', chatPlugin);