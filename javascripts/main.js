
let itemArray = [];

let ItemObject = function (pTitle,pPicture, pType, pCost, pDescription, pURL) {
    this.ID = Math.random().toString(16).slice(5);
    this.Title = pTitle;
    this.Picture = pPicture;
    this.Type = pType;
    this.Cost = pCost;
    this.Description = pDescription;
    this.URL = pURL;
}

itemArray.push(new ItemObject("testitem", "<img src='image/hiyoko.jpg' alt='Hiyoko'>", "Hobby", "2", "testtest", "https://www.google.com"));


// Function to update the item list
function itemList() {
    let ul = document.getElementById("myul");
    ul.innerHTML = "";
    for (let i = 0; i < itemArray.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = "<a href='#details' data-transition='slide' data-itemid='" + i + "'><h3>" + itemArray[i].Title + "</h3></a>";

        ul.appendChild(li);
    }
    $("#myul").listview("refresh");
}

document.addEventListener("DOMContentLoaded", function () {

    itemList()
        
    // Select type button
    let Types = ["Home", "Hobby", "Kitchin", "Other"]; // we could add the other types if we need
    for (let i = 0; i < Types.length; i++) {
        let option = document.createElement("option");
        option.value = Types[i];
        option.text = Types[i];
        document.getElementById("select-type").appendChild(option);
    }

    // add button 
    document.getElementById("buttonAdd").addEventListener("click", function () {
        itemArray.push(new ItemObject(
            document.getElementById("title").value, 
            selectedType,
            document.getElementById("cost").value, 
            document.getElementById("description").value, 
            document.getElementById("URL").value));
        itemList();
        clear();
    });

    // clear button
    function clear() {
        document.getElementById("title").value = "";
        document.getElementById("cost").value = "";
        document.getElementById("description").value = "";
        document.getElementById("URL").value = "";
      }
      
    // clear button
    document.getElementById("buttonClear").addEventListener("click", clear);


    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#AllItems", function (event) {   // have to use jQuery 
        itemList()
    });


    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   
    let localID = localStorage.getItem('parm');  // get the unique key back from the dictionairy
  
    // next step to avoid bug in jQuery Mobile,  force the item array to be current
    itemArray = JSON.parse(localStorage.getItem('itemArray'));  
   
    // let item;

    for (let i = 0; i < itemArray.length; i++) {
        if (itemArray[i].ID === localID) {
            item = itemArray[i];
        }
    }


    document.getElementById("oneTitle").textContent = "TITLE: " + item.Title;
    document.getElementById("oneType").textContent = "TYPE: " + item.Type;
    document.getElementById("oneCost").textContent = "COST: $" + item.Cost;
    document.getElementById("oneDescription").textContent = "DESCRIPTION: " + item.Description;
    document.getElementById("oneURL").textContent = "Shop From Here: " + item.URL;
    });
 
// end of page before show code *************************************************************************

function itemList() {
    // clear prior data
   let ul =document.getElementById("myul");
   ul.innerHTML = "";
   

    itemArray.forEach(function (oneItem,) {   // use handy array forEach method
        var myLi = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        myLi.classList.add('oneItem'); 
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        myLi.setAttribute("data-parm", oneItem.ID);
        myLi.innerHTML = oneItem.Picture + "<br />" + oneItem.Title + "  " + oneItem.Type;
        ul.appendChild(myLi);
    });
   

    // set up an event for each new li item, 
    var liList = document.getElementsByClassName("oneItem");
    let newItemArray = Array.from(liList);
    newItemArray.forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and save THIS ID value in the localStorage "dictionairy"
            localStorage.setItem('parm', parm);
       
       
       
        // but also, to get around a "bug" in jQuery Mobile, take a snapshot of the
        // current movie array and save it to localStorage as well.
        let stringItemArray = JSON.stringify(itemArray); // convert array to "string"
        localStorage.setItem('itemArray', stringItemArray);
        
        
        // now jump to our page that will use that one item
        document.location.href = "index.html#details";
        });
    });

};

//   // Add event listener for clicking edit note
// document.getElementById("buttonEdit").addEventListener("click", function () {
//     // Get the ID of the selected note
//     let ID = document.getElementById("noteDetails").getAttribute("data-noteid");
    
//     // Get the note object from the noteArray using the noteID
//     let noteObj = noteArray[noteID];
    
//     // Fill the input fields with the note data
//     document.getElementById("title").value = noteObj.Title;
//     document.getElementById("note").value = noteObj.Note;
//     document.getElementById("URL").value = noteObj.URL;
//     document.getElementById("select-priority").value = noteObj.Priority.toLowerCase();
//     document.getElementById("select-type").value = noteObj.Type;

//     // Redirect the user to the add new note page
//     location.href = "#addNotePage";
// });

  
    $(document).bind("change", "#select-type", function (event, ui) {
        selectedType = $('#select-type').val();
    });

    // updateItemList(); // Update the note list on page load
}); 

console.log(itemArray); // test we can delete
