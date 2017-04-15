$(document).ready(function(){
    
    
    var drinks = ["Michelob Ultra", "Tequila", "Jagermeister"];

    // Function for displaying data from drink array
      function createButtons() {

        // (this is necessary otherwise we will have repeat buttons)
        $("#button-dump").empty();

        // Looping through drink array
        for (var i = 0; i < drinks.length; i++) {

          // Then dynamicaly generating buttons for each item in the array.
          var a = $("<button>");
          // Adding a class
          a.addClass("drink");
          // Adding a data-attribute with a value of the item at index i
          a.attr("data-name", drinks[i]);
          // Providing the button's text with a value 
          a.text(drinks[i]);
          // Adding the button to the HTML
          $("#button-dump").append(a);
        }
      }

      // This function handles the addition of new buttons
      $("#add-drink").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var drink = $("#drink-input").val().trim();
        // The data from the textbox is then added to our array
        drinks.push(drink);

        // calling createButtons which handles the processing of our movie array
        createButtons();
        //clears out the form
        $("#drink-input").val("");

         });
        //call the function to display buttons from the array
        createButtons();
    
		//event listeners for buttons
		$(document.body).on("click", displayGifs);
    	//$(document.body).on('click','.giphy', runGiphy)

        //this function grabs the data from the api
		function displayGifs() {

		var gifData = $(this).attr("#data-name");
        //the URL to search the site and grab 10 results
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifData + "&api_key=dc6zaTOxFJmzC&limit=10";

            //ajax function that gets a reponse from the site
    	$.ajax({
    		url: queryURL,
    		method:"GET",
    			}).done(function(response) {
    				console.log(response);
                        //loops through the 10 objects returned
    					for (var i = 0; i < response.data.length; i++) {

						var rating = response.data[i].rating;
    					var stillGif = response.data[i].images.original_still.url;
                        //displays the ratings and gifs on the page    
    					$("#gif-dump").prepend("<p> " + rating + "</p>");
    					$("#gif-dump").prepend("<img src='" + stillGif + " '>");
    					
    					}
    				})
        };

});