$(function(){
  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class='chat-body' data-id="${message.id}">
                    <div class='chat-body--name'>
                      ${message.user_name}
                    </div>
                    <div class='chat-body--time'>
                      ${message.date}
                    </div>
                    <div class='chat-body--message'>
                      ${message.content}
                    </div>
                      ${imagehtml}
                    </div>
                  </div>`;
      return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.main-content__chat-contents').append(html);
      $('.main-content__footer__center__message').val('');
      $(".main-content__footer__center__submit-messages").prop( "disabled", false );
      $('.main-content__chat-contents').animate({scrollTop: $('.main-content__chat-contents')[0].scrollHeight}, 'fast');
      // $('.main-content__footer__center')[0].reset();
    })

   .fail(function(){
    alert('自動更新に失敗しました');
    })

  })
});