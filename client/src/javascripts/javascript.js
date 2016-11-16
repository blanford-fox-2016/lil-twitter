$(document).ready(function() {
    loadTwit()
    $('#nav-create').on('click', formNewTwit)
})

function loadTwit() {
    $('#main-container').empty()

    $.ajax({
        url: `http://localhost:3000/api/twit/recent`,
        method: "get",
        success: function(data) {
            html = ''
            html += `<div class="page-header"><h1>Recent Tweet</h1></div>`
            for (var i = 0; i < data.length; i++) {
                html += `
        <div class="panel panel-info">
            <div class="panel-heading"><img src='${data[i].avatar_url}' class="avatar img-circle pull-left">
                <span><h3> ${data[i].name} - @${data[i].username} </h3></span>
                <button class="btn btn-danger close" onclick="deleteTwit(${data[i].twitId})"><span class="glyphicon glyphicon-trash"></span></button>
                <div class="clearfix"></div>
            </div>
            <div class="panel-body">
                <p id=tweets>${data[i].content}</p>
            </div>
        </div>
        `
            }
            $('#main-container').append(html)
        }
    })
}

function formNewTwit() {
    $('#formForCreate').remove()

    let html = ''
    html += `
    <form id='formForCreate'>
        <div class="form-group">
            <label for="form-create-task">Post new twit :</label>
            <input type="text" class="form-control" id="form-new-twit" placeholder="What's in your mind?">
        </div>
        <div class="form-group">
        <button type="button" class="btn btn-primary" onclick="postTwit()"> Twit <span class="glyphicon glyphicon-send"></span></button>
        </div>
    </form>
`
    $('#main-container').prepend(html)

}

function postTwit() {
    let newTwit = $('#form-new-twit').val()
        // let arrHash = newTwit.split(' ')
        // let storage = []
        // for (var i = 0; i < arrHash.length; i++) {
        //     if (arrHash[i][0] == '#') {
        //         storage.push(arrHash[i].slice(1, arrHash.length))
        //     } else {}

}

$.ajax({
    url: `http://localhost:3000/api/twit`,
    method: 'post',
    data: {
        content: newTwit,
        hashtag: 'dummyhashtag'
    },
    success: function(data) {
        $('#main-container').empty()
        loadTwit()
        formNewTwit()
    }
})
}

function deleteTwit(parameter) {
    $.ajax({
        url: `http://localhost:3000/api/twit/${parameter}`,
        method: 'delete',
        success: function() {
            $('#main-container').empty()
            loadTwit()
            alert('Twit deleted')
        }
    })
}
