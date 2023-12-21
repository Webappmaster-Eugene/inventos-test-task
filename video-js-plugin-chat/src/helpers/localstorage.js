import { KEY } from '../utils/consts.js';

const commentWriter = (template, commentInfo) => {

  const comment = template.content.cloneNode(true);

  if (commentInfo.author_nickname === 'Vasya') {
    comment.querySelector('.message').classList.add('message_mine');
    comment.querySelector('.message-container').classList.add('message-container_mine');
    comment.querySelector('.message__author').textContent = 'Вы';
  } else {
    comment.querySelector('.message__author').textContent = commentInfo.author_nickname;
  }

  comment.querySelector('.message__date').textContent = commentInfo.date;
  comment.querySelector('.message__text').textContent = commentInfo.text;
  return comment;
};

export const storageGetter = (template, messages, info) => {
  Array.from(info).sort((a, b) => b.id - a.id).forEach((elem) => {
    const comment = commentWriter(template, elem);
    messages.appendChild(comment);
  });
};


export const storageSaver = (newComment) => {
  const messagesFromLS = JSON.parse(localStorage.getItem(KEY));

  if (messagesFromLS.length !== 0) {
    newComment.id = +messagesFromLS[messagesFromLS.length - 1].id + 1;
  } else {
    newComment.id = 1;
  }
  messagesFromLS.push(newComment);
  localStorage.setItem(KEY, JSON.stringify(messagesFromLS));
};