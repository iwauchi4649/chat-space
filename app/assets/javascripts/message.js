$(function() {
  function buildHTML(message){
    var imagehtml = message.image ? `<img class= "lower-message__image" src="${message.image}" >` : "";
    var html = `<div class='chat-body' data-id="${message.id}">
                  <div class='chat-body--name'>
                    ${message.user_name}
                  </div>
                  <div class='chat-body--time'>
                    ${message.date}
                  </div>
                  <div class='chat-body--message'>
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
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
      // $('.main-content__footer')[0].reset();
    })

   .fail(function(){
    alert('メッセージを入力してください');
    })
  })

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.chat-body:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      // var group_id = $(".group").data("group-id");

      $.ajax({ //ajax通信で以下のことを行う
        url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {last_id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        var insertHTML = '';//追加するHTMLの入れ物を作る
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
          $('.main-content__chat-contents').append(insertHTML);//メッセージを追加
        })
        $('.main-content__chat-contents').animate({scrollTop: $('.main-content__chat-contents')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function () {
        alert('メッセージを入力してください');//ダメだったらアラートを出す
      })
      .always(() => {
        $(".main-content__footer__center__submit-messages").removeAttr("disabled");
      })
    }};
setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
});