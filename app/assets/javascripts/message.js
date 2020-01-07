$(function(){ 
     function buildHTML(message){
      if ( message.image ) {
        var html =
         `<div class="main-messages__box1" data-message-id=${message.id}>
            <div class="main-messages__box1__box">
              <div class="main-messages__box1__box__name">
                ${message.user_name}
              </div>
              <div class="main-messages__box1__box__time">
                ${message.created_at}
              </div>
            </div>
            <div class="main-messages__box1__message">
                <p class="lower-message__content">
                  ${message.content}
                </p>            
              <img src=${message.image} >
            </div>
          </div>`
        return html;
      } else {
        var html =
         `<div class="message" data-message-id=${message.id}>
            <div class="main-messages__box1__box">
              <div class="main-messages__box1__box__name">
                ${message.user_name}
              </div>
              <div class="main-messages__box1__box__time">
                ${message.created_at}
              </div>
            </div>
            <div class="main-messages__box1__message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
            </div>
          </div>`
        return html;
      };
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
       $('.main-messages').append(html); 
       $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});     
       $('form')[0].reset();
       
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  return false;
})
});