//get datas
function getAllDatas() {
    var searchedTweet = $('#search-tweet input[name=tweet]').val()

    $.ajax({
        url: "http://localhost:3000/api/tweets",
        type: "GET",
        dataType: "json",
        data: {tweet: searchedTweet},
        success: function(datas) {
            $('#tweet-list').empty()
            for (let j in datas) {
                $('#tweet-list').append('\
                    <div data-id="' + datas[j]._id + '" class="col-xs-10 col-xs-offset-1" style="padding: 10px 0 30px 0; background: rgba(0,0,0,0.1); margin-top: 30px;">\
                        <h3 class="tweet-tweet"><i class="tweet-user">'+ datas[j].user +'</i> '+ datas[j].tweet +'</h3>\
                        <button type="submit" class="btn btn-md btn-default" data-id="' + datas[j]._id + '" onclick="deleteData(this)"><span class="fa fa-trash"></span> Delete</button>\
                    </div>\
                ')
            }
        }
    })
}

//post data
function addData() {
    $('#add-tweet-form').submit(function(e) {
        var data = {
            tweet: $("#add-tweet-form textarea[name=tweet]").val()
        }

        $.ajax({
                url: "http://localhost:3000/api/tweets",
                type: "POST",
                dataType: "json",
                data: data
            })
            .done(function() {
                $('#add-tweet-form').each(function() {
                    this.reset()
                })
                getAllDatas()
                $('#alert-message').empty()
                $('#alert-message').append('\
                    <div class="alert alert-success">\
                        Data is added.\
                    </div>\
                ')
                window.scrollTo(0, 0);
            })

        e.preventDefault()
    })
}

//delete data
function deleteData(pointer) {
    var id = $(pointer).attr('data-id')

    $.ajax({
            url: `http://localhost:3000/api/tweets/${id}`,
            type: "DELETE"
        })
        .done(function(data) {
            getAllDatas()
            $('#alert-message').empty()
            $('#alert-message').append('\
            <div class="alert alert-danger">\
                Data is deleted.\
            </div>\
        ')
            //window.scrollTo(0, 0);
        })
}

//search data
function searchData(){
    $('#search-tweet input[name=tweet]').keyup(function(e){
        getAllDatas()
    })
}

$(function() {
    getAllDatas()
    addData()
    searchData()
})
