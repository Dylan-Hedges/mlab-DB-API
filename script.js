$(document).ready(function(){
  //Clears the current session variable when the page loads
  sessionStorage.removeItem('currentBookId');
  //Executes a function when the submit button is clicked
  $('#add-book').on('submit', function(e){
    e.preventDefault();

    //Stores form values in variables (linked by id '#'')
    var title = $('#title').val();
    var category = $('#category').val();
    var excerpt = $('#excerpt').val();

    if(sessionStorage.getItem('currentBookId') != null){
      var url = urlUpdate;
      //Needs to be PUT for updates (error 405 otherwise)
      var type = 'PUT';
    }else{
      var url = urlPost;
      var type = 'POST';
    }

    //Submits posts to the mLab API
    $.ajax({ url: url,
      data: JSON.stringify({
        "title": title,
        "category": category,
        "excerpt": excerpt
      }),
      type: type,
    	contentType: "application/json",
      success: function(data){
        window.location.href="index.html"
      },
      error: function(xhr, status, err){
        console.log(err);
      }
     });
  });

  //Puts data back into the input fields - event handler on click
  $('body').on('click', '#setBook', function(e){
     e.preventDefault();
     sessionStorage.setItem('currentBookId', $(this).data('id'));
     //Takes value and passes it into the input field
     $('#title').val($(this).data('title'));
     $('#category').val($(this).data('category'));
     $('#excerpt').val($(this).data('excerpt'));
  });
});

//Renders posts to screen (once Ajax request completes ".done" -> recieves JS object -> uses HTML to render on screen)
function getBooks(){
  $.ajax({ url: urlGet })
  .done(function(data){
    var output = '<div>';
      $.each(data, function(key, data){
        output += '<div class="bg-light">';
        output += '<h3>' + data.title + '</h3>';
        output += '<p> Category: ' + data.category + '</p>';
        output += '<p>' + data.excerpt + '</p>';
        //html data attribute (oid is the object id generated in mlab)
        output += '<a id="setBook" href="/" data-id="'+data._id.$oid+'" data-title="'+data.title+'" data-category="'+data.category+'" data-excerpt="'+data.excerpt+'">Edit</a>';
        output += '</div>';
      });
    output += '</div>';
    $('#books').html(output);
  });
}
