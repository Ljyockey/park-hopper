var mockData = [{
  park: 'Disneyland',
  date: '06-17-2017',
  crowdIndex: 5,
  rides: 'Space Mountain, Matterhorn, Splash Mountain',
  shows: 'Fantasmic',
  shoppingDining: 'French Market',
  other: 'Tomorrowland was much slower at the end of the day because of Fantasmic and fireworks',
  isAForm: false
},
{
  park: 'Disney\'s California Adventure',
  date: '06-18-2017',
  crowdIndex: 4,
  rides: 'Soarin, Guardians, Midway Mania',
  shows: 'World of Color',
  shoppingDining: 'Sonoma Terrace, Five and Dime',
  other: 'fastpasses went quickly for Guardians. Need to get there sooner',
  isAForm: false
},
{
  park: 'Park Hopper',
  date: '06-19-2017',
  crowdIndex: 6,
  rides: 'Space Mountain, Matterhorn, Splash Mountain, Soarin, Midway Mania',
  shows: 'Fantasmic, World of Color',
  shoppingDining: 'French Market, Sonoma Terrace',
  other: 'best to do as much as possible in one park before hopping to other',
  isAForm: false
}];

function displayEntries(data) {
  const entriesHtml = data.map(function(item, index) {
    return `<div class="trip" data-index="${index}">
                    <h3>${item.park}: ${item.date}</h3>
                    <p>Crowd index: ${item.crowdIndex}</p>
                    <h4>Rides</h4>
                    <p>${item.rides}</p>
                    <h4>Shows/Attractions</h4>
                    <p>${item.shows}</p>
                    <h4>Shopping/Dining</h4>
                    <p>${item.shoppingDining}</p>
                    <h4>Other Notes</h4>
                    <p>${item.other}</p>
                    <button class="edit">Edit</button>
					<button class="delete">Delete</button>
                </div>`;
  });

  $('.trips-container').html(entriesHtml);
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
  deleteClicked();
});