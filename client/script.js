const SERVER_URL = 'http://localhost:3000/api/twit'
const SERVER_URL_USER = 'http://localhost:3000/api/user'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'
const rowOfTwits = $('#rowOfTwits')
// const userNav = $('#userNav')

$(document).ready(function () {

    if (Auth.getToken()) {
        changeUserNav()
        formPage()
        getAllTwit()
    }
    else {
        notLoginNav()
    }
})

function formPage() {
    let html = `
        <div class="col-sm-6 col-sm-offset-3">
            <form id="formCreateTwit" class="form-inline">
                <div class="form-group">
                    <img class="img-responsive col-sm-2" src="http://www.littlestarsplayschool.com/images/1466407606547378dummy.png" alt="">
                    <textarea name="twit" id="inputTwit" rows="3" class="col-sm-10" placeholder="What's going on?"></textarea>
                    <button id="buttonCreateTwit" class="btn btn-success">Create</button>
                </div>
            </form>
        </div>
`
    $('#formPage').append(html)
}

function notLoginNav() {
    let nav = `
            <ul id="userNav" class="nav navbar-nav navbar-right">
                <li><a data-toggle="modal" data-target="#modalRegister"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
                <li><a data-toggle="modal" data-target="#modalLogin"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul>
`
    $('#userNav').replaceWith(nav)
}

function getTwit(data) {
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
                                    <p>
                                    `)
        for (let j = 0; j < data[i].hashtag_names.length; j++) {
            twit.push(`
                ${data[i].hashtag_names[j]},
`)
        }


        twit.push(`
                        </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `)
    }

    rowOfTwits.html(twit.join(""))
}

function getAllTwit() {
    $.ajax({
        url: `${SERVER_URL}/recent`,
        success: function (data) {
            getTwit(data)
        }
    })
}

$(document).on('click', 'button[id="buttonCreateTwit"]', function (e) {
    e.preventDefault()
    createTwit()
})

function createTwit() {
    let username = Auth.getUser().username
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
                    <div class="panel-heading">
                        <a class="btn btn-danger" name="deleteTwit" data-id="${data._id}">Delete</a>
                    </div>
                    <div class="panel-body">
                        <div class="col-sm-2">
                            <img class="img-responsive" src="${data.avatar_url}" alt="">
                        </div>
                        <div class="col-sm-10">
                            <h5>${data.username}</h5>
                            <p>${data.content}</p>
                            <p>
                            `
                            for (let i = 0; i < data.hashtag_names.length; i++) {
                                html += `${data.hashtag_names[i]}, `

                            }
    html +=             `</p>
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



//Login User
$('#formLogin').submit(function (e) {
    e.preventDefault()
    let username = $('input[name="usernameLogin"]').val()
    let password = $('input[name="passwordLogin"]').val()
    loginUser(username, password)
})

function loginUser(username, password) {

    $.ajax({
        url: `${SERVER_URL_USER}/login`,
        method: 'post',
        contentType: `${CONTENT_TYPE}`,
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            Auth.authenticateUser(data)
            $('input[name="usernameLogin"]').val("")
            $('input[name="passwordLogin"]').val("")
            $('#modalLogin').modal('hide')
            changeUserNav()
            formPage()
        },
        error: function (data) {
            alert('Wrong username or password')
        }
    })
}

function changeUserNav() {
    let html = `
    <ul id="userNav" class="nav navbar-nav navbar-right">
        <li><a>${Auth.getUser().username}</a></li>
        <li><a name="logoutUser"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
    </ul>
`
    $('#userNav').replaceWith(html)
}

$(document).on('click', 'a[name="logoutUser"]', function () {
    Auth.deauthenticateUser()
    notLoginNav()
})


$(document).on('click', 'button[name=buttonSearch]', function (e) {
    e.preventDefault()
    let search = $('input[name="search"]').val()
    getSearch(search)
})

function getSearch(search) {
    $.ajax({
        url: `${SERVER_URL}/search?q=${search}`,
        method: 'get',
        success: function (data) {
            updateViewAfterSearch(data)
        }
    })
}

function updateViewAfterSearch(data) {
    getTwit(data)
}