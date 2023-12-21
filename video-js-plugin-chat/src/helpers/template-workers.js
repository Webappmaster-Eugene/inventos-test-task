import { storageSaver } from './localstorage.js';

export const templateRecorder = (messages, template, commentText) => {
  const comment = template.content.cloneNode(true);
  comment.querySelector('.message').classList.add('message_mine');
  comment.querySelector('.message-container').classList.add('message-container_mine');
  comment.querySelector('.message__date').textContent = 'сейчас';
  comment.querySelector('.message__text').textContent = commentText;

  storageSaver({
    author_nickname: 'Vasya',
    text: commentText,
    date: 'сейчас',
  });

  messages.prepend(comment);
};