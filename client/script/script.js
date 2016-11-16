const URL_Tweets = 'http://localhost:3000/api/tweets/'

$(document).ready(function(){
  // process new tweet
  $('#btn_add').on('click', function(e){
    e.preventDefault()
    ajaxPOST()
  })

  showRecents()

  // process search
  $('#btn_search').on('click', function(e){
    e.preventDefault()
    processSearch()
  })

  //process register
  $('#btn_register').on('click', function(e){
    e.preventDefault()
    processRegister()
  })
})

function processRegister(){
  var data_new_user = {
    username: $('#username').val(),
    password: $('#password').val()
  }
  $.post({
    url: $('#form_register').attr('action'),
    data: data_new_user,
    success: function(new_user){
      console.log(new_user);
      localStorage.setItem('token', new_user.token)
      console.log(localStorage.getItem('token'));
      window.location = 'index.html'
    }
  })
}

function closeSearch(id){
  $(`#search_${id}`).remove()
}

function processSearch(){
  var hashtag = $('#hashtag').val()
  $.ajax({
    url: URL_Tweets+'/search?hashtag='+hashtag,
    success: function(searched_data){
      console.log(searched_data);
      var search_HTML = ''
      for (var i = 0; i < searched_data.length; i++) {
        search_HTML += `
        <div class="row" id="search_${searched_data[i]._id}">
          <div class="col-sm-6 col-sm-offset-3">
            <div class="panel panel-default">
              <div class="panel-heading pull-right">
                <button type="button" onclick="closeSearch('${searched_data[i]._id}')">x</button>
              </div>
              <div class="panel-body">
                <div class="col-sm-4">
                  <img src="${searched_data[i].avatar_url}" class="img-responsive">
                  <p>@${searched_data[i].username}</p>
                </div>
                <div class="col-sm-8">
                  <h3>tweet's content:</h3>
                  <br>
                  <h4>${searched_data[i].content}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
      }
      $('#search').prepend(search_HTML)
      $('#hashtag').val('')
    }
  })
}

function deleteData(id){
  $.ajax({
    url: URL_Tweets+id,
    method: "DELETE",
    success: function(deleted_data){
      $(`#${deleted_data._id}`).remove()
    }
  })
}

// show recents tweets
function showRecents(){
  $.ajax({
    url: URL_Tweets,
    success: function(all_data_server){
      console.log(all_data_server);
      var all_data_HTML = ''

      for (var i = 0; i < all_data_server.length; i++) {
        all_data_HTML += `
        <div class="row" id="${all_data_server[i]._id}">
          <div class="col-sm-8 col-sm-offset-2">
            <div class="panel panel-default">
              <div class="panel-heading pull-right">
                <button type="button" onclick="deleteData('${all_data_server[i]._id}')">x</button>
              </div>
              <div class="panel-body">
                <div class="col-sm-4">
                  <img src="${all_data_server[i].avatar_url}" class="img-responsive">
                  <p>@${all_data_server[i].username}</p>
                </div>
                <div class="col-sm-8">
                  <h3>tweet's content:</h3>
                  <br>
                  <h4>${all_data_server[i].content}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        `
      }
      $('#recent').append(all_data_HTML)
    }
  })
}

// process new tweet
function ajaxPOST(){

  var new_data = {
    //avatar_url: dari localstorage
    //username: dari localstorage
    content: $('#content').val()
    //todo: hastag
  }
  console.log(new_data);

  $.ajax({
    url: URL_Tweets,
    method: 'POST',
    data: new_data,
    success: function(new_data_server){
      // console.log(new_data);
      var new_HTML = `
      <div class="row" id="${new_data_server._id}">
        <div class="col-sm-8 col-sm-offset-2">
          <div class="panel panel-default">
            <div class="panel-heading pull-right">
              <button type="button" onclick="deleteData('${new_data_server._id}')">x</button>
            </div>
            <div class="panel-body">
              <div class="col-sm-4">
                <img src="${new_data_server.avatar_url}" class="img-responsive">
                <p>@${new_data_server.username}</p>
              </div>
              <div class="col-sm-8">
                <h3>tweet's content:</h3>
                <br>
                <h4>${new_data_server.content}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      `
      $('#recent').prepend(new_HTML)
      $('#content').val('')
    }
  })
}
