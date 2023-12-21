import { chatPlugin } from './video-js-plugin-chat/dist/video-js-plugin-chat.js';

const player = videojs('videoPlayer', {
  loop: true,
  fluid: true,
  aspectRatio: '4:3',
  playbackRates: [0.5, 1, 2, 3, 4, 5],
  userActions: {
    hotkeys: {
      enableModifiersForNumber: false,
      seekStep: 30,
    },
  },
});

player.dynamicWatermark({
  elementId: 'unique_id',
  watermarkText: '<img height=\'20\' width=\'20\' src=\'https://i.pravatar.cc\' />',
  changeDuration: 1000,
  cssText:
    'display: inline-block; color: grey; background-color: transparent; font-size: 1rem; z-index: 9999; position: absolute; @media only screen and (max-width: 992px){font-size: 0.8rem;}',
});

player.on('playing', function() {
  player.log('playback began!');
});

videojs.registerPlugin('chatPlugin', chatPlugin);

player.chatPlugin();