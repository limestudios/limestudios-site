$(document).ready(function(){

  // GET DOING

  $.getJSON("https://api.trello.com/1/list/540610612fd06fe2a9e8c819/cards/?&callback=?", {
    key: 'f0eb9bda36de7506805401cd7cd23dde'
  })
  .success(function(responseObj) {
    $(".loader.status-in-progress").remove();
    for(var i = 0; i < responseObj.length; i++) {
      $(".status-in-progress").append(
        '<article class="col col-p-12 col-wp-12 col-t-12 col-wt-4 col-c-3">'+
        '<div class="padding">'+
          responseObj[i].name+
          '<p>'+
            jQuery.timeago(responseObj[i].dateLastActivity)+
          '</p>'+
        '</div>'+
        '<div class="labels row">'+
          getLabels(responseObj[i])+
        '</div>'+
        '</article>'
      );
    }
  });

  // GET PLANNED

  $.getJSON("https://api.trello.com/1/list/540610612fd06fe2a9e8c818/cards/?&callback=?", {
    key: 'f0eb9bda36de7506805401cd7cd23dde'
  })
  .success(function(responseObj) {
    $(".loader.status-planned").remove();
    for(var i = 0; i < responseObj.length; i++) {
      $(".status-planned").append(
        '<article class="col col-p-12 col-wp-12 col-t-12 col-wt-4 col-c-3">'+
        '<div class="padding">'+
          responseObj[i].name+
          '<p>'+
            jQuery.timeago(responseObj[i].dateLastActivity)+
          '</p>'+
        '</div>'+
        '<div class="labels row">'+
          getLabels(responseObj[i])+
        '</div>'+
        '</article>'
      );
    }
  });

  // GET BUGS

  $.getJSON("https://api.trello.com/1/list/5406109321ab80964951f521/cards/?&callback=?", {
    key: 'f0eb9bda36de7506805401cd7cd23dde'
  })
  .success(function(responseObj) {
    $(".loader.status-bugs").remove();
    for(var i = 0; i < responseObj.length; i++) {
      $(".status-bugs").append(
        '<article class="col col-p-12 col-wp-12 col-t-12 col-wt-4 col-c-3">'+
        '<div class="padding">'+
          responseObj[i].name+
          '<p>'+
            jQuery.timeago(responseObj[i].dateLastActivity)+
          '</p>'+
        '</div>'+
        '<div class="labels row">'+
          getLabels(responseObj[i])+
        '</div>'+
        '</article>'
      );
    }
  });

  function getLabels(json) {
    if (typeof json.labels[0] === 'undefined') {
      return "";
    } else {
      var returnString = "";
      for(var i = 0; i < json.labels.length; i++) {
        var color = "";
        switch(json.labels[i].name) {
          case "THIS NEEDS TO HAPPEN ASAP":
              color = "#f44336";
            break;
          case "A problem that really needs to be addressed":
              color = "#FF9800";
            break;
          case "A problem that can wait":
              color = "#FFEB3B";
            break;
          case "Feature":
              color = "#4CAF50";
            break;
          default:
              color = "#9E9E9E";
            break;
        }

        returnString += '<div class="label col-p-2 col-wp-2 col-t-2 col-wt-2 col-c-2" style="background-color: '+color+';"></div>';
      }
      return returnString;
    }
  }
});
