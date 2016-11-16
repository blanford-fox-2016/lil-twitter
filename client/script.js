const SERVER_URL = 'http://localhost:3000/api/twit'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'
const rowOfTwits = $('#rowOfTwits')

$(document).ready(function () {

    $.ajax({
        url: `${SERVER_URL}/recent`,
        success: function (data) {
            let twit = []
            for (let i = 0; i < data.length; i++) {
                twit.push(`
                <div class="row" id="rowTwit${data[i]._id}">
                    <div class="col-sm-6 col-sm-offset-3">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <a class="btn btn-danger" name="deleteTwit" data-id="${data[i]._id}">Delete</a>
                            </div>
                            <div class="panel-body">
                                <div class="col-sm-2">
                                    <img class="img-responsive" src="${data[i].avatar_url}" alt="">
                                </div>
                                <div class="col-sm-10">
                                    <h5>${data[i].username}</h5>
                                    <p>${data[i].content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `)
            }

            rowOfTwits.append(twit.join(""))
        }
    })
})

$(document).on('click', 'button[id="buttonCreateTwit"]', function (e) {
    e.preventDefault()
    createTwit()
})

function createTwit() {
    let username = 'dharmadi93'
    let content = $('textarea[name="twit"]').val()
    let hashtag = ['apa', 'aja']

    $.ajax({
        url: `${SERVER_URL}`,
        method: 'post',
        contentType: `${CONTENT_TYPE}`,
        data: {
            username: username,
            content: content,
            hashtag: hashtag
        },
        success: function (data) {
            updateViewAfterCreate(data)
        }
    })
}

function updateViewAfterCreate(data) {
    let html = `
        <div class="row" id="rowTwit${data._id}">
            <div class="col-sm-6 col-sm-offset-3">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="col-sm-2">
                            <img class="img-responsive" src="${data.avatar_url}" alt="">
                        </div>
                        <div class="col-sm-10">
                            <h5>${data.username}</h5>
                            <p>${data.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    $('textarea[name="twit"]').val("")
    rowOfTwits.prepend(html)
}

$(document).on('click', 'a[name="deleteTwit"]', function () {
    let id = this.getAttribute('data-id')
    deleteTwit(id)
})

function deleteTwit(id) {
    let tempId = id
    $.ajax({
        url: `${SERVER_URL}/${id}`,
        method: 'delete',
        success: function () {
            updateViewAfterDelete(tempId)
        }
    })
}

function updateViewAfterDelete(id) {
    $(`#rowTwit${id}`).remove()
}