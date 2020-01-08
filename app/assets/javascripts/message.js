$(function(){ 
     function buildHTML(message){
        var content = message.content ? `${ message.content }` : "";
        var img = message.image ? `<img src= ${message.image} >` : "";
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
                  ${content}
                </p>            
              ${img}
            </div>
          </div>`
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
       $('.main-messages').append(html); 
       $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});     
       $('form')[0].reset();
       
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  })
    
  var reloadMessages = function () {
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      last_message_id = $('.main-messages__box1:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id} 
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.main-messages').append(insertHTML);
          $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});
          $("#new_message")[0].reset();
          $(".submit-btn").prop("disabled", false);
        }
      })
      .fail(function() {
        alert('error');
      });
   }
  }
    setInterval(reloadMessages, 7000);

});