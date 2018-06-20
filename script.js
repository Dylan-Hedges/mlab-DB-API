$(document).ready(function(){
  console.log(url);
  //Executes a function when the submit button is clicked
  $('#add-book').on('submit', function(e){
    e.preventDefault();
    //Stores form values in variables (linked by id '#'')
    var title = $('#title').val();
    var category = $('#category').val();
    var excerpt = $('#excerpt').val();

    $.ajax({ url: url,
      data: JSON.stringify({
        "title": title,
        "category": category,
        "excerpt": excerpt
      }),
      type: "POST",
    	contentType: "application/json",
      success: function(data){
        window.location.href="index.html"
      },
      error: function(xhr, status, err){
        console.log(err);
      }
     });
  });
});
