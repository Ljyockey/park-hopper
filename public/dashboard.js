var mockData = [{
  park: 'Disneyland',
  date: '06-17-2017',
  crowdIndex: 5,
  rides: 'Space Mountain, Matterhorn, Splash Mountain',
  shows: 'Fantasmic',
  shoppingDining: 'French Market',
  other: 'Tomorrowland was much slower at the end of the day because of Fantasmic and fireworks'
},
{
  park: 'Disney\'s California Adventure',
  date: '06-18-2017',
  crowdIndex: 4,
  rides: 'Soarin, Guardians, Midway Mania',
  shows: 'World of Color',
  shoppingDining: 'Sonoma Terrace, Five and Dime',
  other: 'fastpasses went quickly for Guardians. Need to get there sooner'
},
{
  park: 'Park Hopper',
  date: '06-19-2017',
  crowdIndex: 6,
  rides: 'Space Mountain, Matterhorn, Splash Mountain, Soarin, Midway Mania',
  shows: 'Fantasmic, World of Color',
  shoppingDining: 'French Market, Sonoma Terrace',
  other: 'best to do as much as possible in one park before hopping to other'
}];

function displayEntries(data) {
  const entriesHtml = data.map(function(item, index) {
    return `<div class="trip" data-index="${index}">
                    <h3>${item.park}: ${item.date}</h3>

                    <p>Crowd index: ${item.crowdIndex}</p>
                    <form class="put-form">
                        <label for="rides"><h4>Rides</h4></label>
                        <p class="no-form">${item.rides}</p>
                        <input class="edit-form" type="text" name="rides" value="${item.rides}">

                        <label for="shows"><h4>Shows/Attractions</h4></label>
                        <p class="no-form">${item.shows}</p>
                        <input class="edit-form" type="text" name="shows" value="${item.shows}">

                        <label for="shopping-dining"><h4>Shopping/Dining</h4></label>
                        <p class="no-form">${item.shoppingDining}</p>
                        <input class="edit-form" type="text" name="shopping-dining" value="${item.shoppingDining}">

                        <label for="other"><h4>Other Notes</h4></label>
                        <p class="no-form">${item.other}</p>
                        <input class="edit-form" type="text" name="other" value="${item.other}"><br>

                        <input type="submit" class="edit-form submit" value="Submit All Changes">
                        <button class="cancel edit-form">Cancel</button>
                        <button class="edit no-form">Edit</button>
                        </form>
                        <button class="delete">Delete</button>
                    
                </div>`;
  });

  $('.trips-container').html(entriesHtml);
}

function editClicked() {
  $('.trips-container').on('click', '.edit', function(e) {
    e.preventDefault();
    $(this).siblings('.edit-form').show();
    $(this).siblings('.no-form').hide();
    $(this).hide();
  });
}

function putRequest() {
  $('.trips-container').on('submit', '.put-form', function(e) {
    e.preventDefault();
    const button = $(this).children('.submit');
    const index = $(this).parents('.trip').attr('data-index');
    const rides = ($('input[name=rides]').val());
    const shows = ($('input[name=shows]').val());
    const shoppingDining = ($('input[name=shopping-dining]').val());
    const other = ($('input[name=other]').val());
    mockData[index].rides = rides;
    mockData[index].shows = shows;
    mockData[index].shoppingDining = shoppingDining;
    mockData[index].other = other;
    const newValues = {
      rides,
      shows,
      shoppingDining,
      other
    };
    displayEntries(mockData);
    //PUT route
    removeForm(button);
  });
}

function removeForm(element) {
  element.siblings('.no-form').show();
  element.siblings('.edit-form').hide();
  element.hide();
}

function cancelClicked() {
  $('.trips-container').on('click', '.cancel', function(e) {
    e.preventDefault();
    removeForm($(this));
  });
}

function deleteClicked() {
  $('.trips-container').on('click', '.delete', function() {
    const index = ($(this).parents('.trip').attr('data-index'));
    // add delete route using index
    const item = ($(this).parents('.trip'));
    item.remove();
  });
}

function newTrip() {
  $('.new-trip').submit(function(e) {
    e.preventDefault();
    const newTrip = {
      park: ($('input[name=park]:checked').next('label').text()),
      date: ($('input[name=date]').val()),
      crowdIndex: ($('input[name=index]').val()),
      rides: ($('input[name=rides]').val()),
      shows: ($('input[name=shows]').val()),
      shoppingDining: ($('input[name=shopping-dining]').val()),
      other: ($('input[name=other]').val())
    };
    mockData.push(newTrip);
    displayEntries(mockData);
  });
}

$(function() {  
  displayEntries(mockData);
  $('#date').datepicker();
  newTrip();
  editClicked();
  putRequest();
  cancelClicked();
  deleteClicked();
});