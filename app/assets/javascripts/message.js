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
      $('.main-content__footer__center__message').val('')
      $(".main-content__footer__center__submit-messages").prop( "disabled", false );
      $('.chat-body').animate({scrollTop: $('.chat-body')[0].scrollHeight}, 'fast');
    })

   .fail(function(){
    alert('自動更新に失敗しました');
    })

  })
});