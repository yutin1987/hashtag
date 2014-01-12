$(function(){
  setTimeout(function(){
    $('#hashtag_permalink_feed .genericStreamStory').each(function(i,item){
      var fbid = /posts\/([0-9]+)/.exec($(item).html());
      $.post('http://localhost:8080/api/push', {
        name: $('.actorName', item).text(),
        message: $('.userContent', item).text(),
        link: 'https://www.facebook.com/'+fbid[1]
      });
    });
    setTimeout(function(){
      location.reload();
    }, 1000);
  }, 2000);
});