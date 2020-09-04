import URL_Service from '../URL_Service'

const SendMessageService = {

  sendSimpleMessageToDiscord(username, avatarURL, message) {
    const URL = URL_Service.getURL()
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        avatar_url: avatarURL,
        content: message
      })
    })
  },

  sendEmbedMessageToDiscord(username, avatarURL, EmbedTitle, EmbedImageURL, message, color) {
    const URL = URL_Service.getURL()
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        avatar_url: avatarURL,
        embeds: [{
          "title": EmbedTitle,
          "image": {
            "url": EmbedImageURL
          },
          "description": message,
          "color": color
        }]
      })
    })
  }
  
}

export default SendMessageService;
