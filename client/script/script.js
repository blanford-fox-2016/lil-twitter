const URL = 'http://localhost:3000/api/tweets'
$(document).ready(function(){
  // process new tweet
  $('#btn_add').on('click', function(e){
    e.preventDefault()
    ajaxPOST()
  })
})
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
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
          <div class="panel panel-default">
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
    }
  })
}
