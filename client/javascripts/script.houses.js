//get datas
function getAllDatas() {
    $.ajax({
        url: "http://localhost:3000/api/houses",
        type: "GET",
        dataType: "json",
        success: function(datas) {
            $('#house-list').empty()
            for (let j in datas) {
                $('#house-list').append('\
                    <div data-id="' + datas[j]._id + '" class="col-md-3 col-sm-4 col-xs-6" style="padding: 15px;">\
                        <div class="circle-avatar house-image" style="background-image:url(' + datas[j].image + ')"></div>\
                        <h3 class="house-name text-capitalize">' + datas[j].name + '</h3>\
                        <p class="house-price">Rp. ' + addcommas(datas[j].price) + '</p>\
                        <h5 class="house-rooms">' + datas[j].rooms + ' rooms</h5>\
                        <h5 class="house-address">' + datas[j].address + '</h5>\
                        <button type="submit" class="btn btn-sm btn-default" data-toggle="modal" data-target="#myModal" data-id="' + datas[j]._id + '" onclick="showEditData(this)"><span class="fa fa-pencil"></span></button>\
                        <button type="submit" class="btn btn-sm btn-default" data-id="' + datas[j]._id + '" onclick="deleteData(this)"><span class="fa fa-trash"></span></button>\
                    </div>\
                ')
            }
        }
    })
}

//post data
function addData() {
    $('#add-house-form').submit(function(e) {
        var data = {
            name: $("#add-house-form input[name=name]").val(),
            price: $("#add-house-form input[name=price]").val(),
            rooms: $("#add-house-form input[name=rooms]").val(),
            address: $("#add-house-form input[name=address]").val(),
            image: $("#add-house-form input[name=image]").val()
        }

        $.ajax({
                url: "http://localhost:3000/api/houses",
                type: "POST",
                dataType: "json",
                data: data
            })
            .done(function() {
                $('#add-house-form').each(function() {
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
            url: `http://localhost:3000/api/houses/${id}`,
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
            window.scrollTo(0, 0);
        })
}

var initFlagMap2 = false

//show edit data form
function showEditData(pointer) {
    $("#process-edit-house").attr('data-id', '')
    var id = $(pointer).attr('data-id')

    $.ajax({
            url: `http://localhost:3000/api/houses/${id}`,
            type: "GET",
            dataType: "json"
        })
        .done(function(data) {
            $("#edit-house-form input[name=name]").attr('value', data.name)
            $("#edit-house-form input[name=price]").attr('value', data.price)
            $("#edit-house-form input[name=rooms]").attr('value', data.rooms)
            $("#edit-house-form input[name=address]").attr('value', data.address)
            $("#edit-house-form input[name=image]").attr('value', data.image)
            $("#process-edit-house").attr('data-id', data._id)
        })

    setTimeout(function(){
        if(!initFlagMap2){
            initFlagMap2 = true
            mapOnEdit()    
        }
    }, 1000)
}

//edit data
function processEditData(pointer, e) {
    e.preventDefault()
    var id = $(pointer).attr('data-id')

    var data = {
        name: $("#edit-house-form input[name=name]").val(),
        price: $("#edit-house-form input[name=price]").val(),
        rooms: $("#edit-house-form input[name=rooms]").val(),
        address: $("#edit-house-form input[name=address]").val(),
        image: $("#edit-house-form input[name=image]").val()
    }

    $.ajax({
            url: `http://localhost:3000/api/houses/${id}`,
            type: "PUT",
            dataType: "json",
            data: data
        })
        .done(function() {
            $('#edit-house-form').each(function() {
                this.reset()
            })
            $('#myModal').modal('toggle')
            getAllDatas()
            $('#alert-message').empty()
            $('#alert-message').append('\
                    <div class="alert alert-warning">\
                        Data is edited.\
                    </div>\
                ')
            window.scrollTo(0, 0);
        })
}

function disableEnter() {
    $("#add-house-form").bind("keypress", function(e) {
        if (e.keyCode == 13) {
            return false;
        }
    })

    $("#edit-house-form").bind("keypress", function(e) {
        if (e.keyCode == 13) {
            return false;
        }
    })
}

function addcommas(input){
    var text = input.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
    return text
  }

$(function() {
    getAllDatas()
    addData()
    disableEnter()
})
