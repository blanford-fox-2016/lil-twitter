const URL = 'http://localhost:3000/api/tweets/'
$(document).ready(function(){
  // process new tweet
  $('#btn_add').on('click', function(e){
    e.preventDefault()
    ajaxPOST()
  })

  showRecents()
})

function deleteData(id){
  $.ajax({
    url: URL+id,
    method: "DELETE",
    success: function(deleted_data){
      $(`#${deleted_data._id}`).remove()
    }
  })
}

// show recents tweets
function showRecents(){
  $.ajax({
    url: URL,
    success: function(all_data_server){
      console.log(all_data_server);
      var all_data_HTML = ''

      for (var i = 0; i < all_data_server.length; i++) {
        all_data_HTML += `
        <div class="row" id="${all_data_server[i]._id}">
          <div class="col-sm-10 col-sm-offset-1">
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
                  tweet:
                  ${all_data_server[i].content}
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
  $.post({
    url: URL,
    data: new_data,
    success: function(new_data_server){
      // console.log(new_data);
      var new_HTML = `
      <div class="row" id="${new_data_server._id}">
        <div class="col-sm-10 col-sm-offset-1">
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
                tweet:
                ${new_data_server.content}
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
