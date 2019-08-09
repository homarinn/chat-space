$(function(){
  let buildHTML = (message) => {
    let messageInfo = `<div class="message__info">
                         <p class="message__info__user-name">${message.user_name}<p>
                         <p class="message__info__daytime">${message.created_at}<p>
                       </div>`
    let messageText = message.content ? `<p class="message__text">${message.content}</p>` : ""
    let messageImage = message.image.url ? `<img src="${message.image.url}" width="200" height="200">` : ""
    let html = `<div class="message" data-group-id="${message.group_id}" data-message-id="${message.id}">
                  ${messageInfo}
                  ${messageText}
                  ${messageImage}
                </div>`
    return html;
    };

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      let html = buildHTML(message);
      $(".messages").append(html).animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
      let last_message = $("#lastmessage_" + message.group_id);
      if (message.content) {
        last_message.text(message.content);
      } else {
        last_message.text("画像が投稿されています。");
      }
      $(".form__input-box__input-text").val("");
      $("#message_image").val("");
      $(".form__submit").prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    });
  });

  let reloadMessages = () => {
    let last_message = $(".message:last-child").data();
    let url = `/groups/${last_message.groupId}/api/messages`;
    let last_message_id = last_message.messageId;

    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: {message_id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
        let insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message);
          let last_message = $("#lastmessage_" + message.group_id);
          if (message.content) {
            last_message.text(message.content);
          } else {
            last_message.text("画像が投稿されています。");
          } 
        });
        $(".messages").append(insertHTML).animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if(document.URL.match(/messages/)){
    setInterval(reloadMessages, 3000);
  }
});