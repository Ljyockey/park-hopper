function displayTrips(data) {
  const entriesHtml = data.trips.map(function(item) {
    return         `<h3 class="js-accordion__header trip-header" id="${item.id}">${item.park}: ${item.dateOfVisit}</h3>
                    <div class="js-accordion__panel content trip" data-index="${item.id}">
                      <p>Crowd index: ${item.crowdIndex}</p>
                      <form class="put-form">
                          <label for="rides"><h4>Rides</h4></label>
                          <p class="rides no-form">${item.rides}</p>
                          <textarea class="edit-form large-box" name="rides">${item.rides}</textarea>

                          <label for="shows"><h4>Shows/Attractions</h4></label>
                          <p class="shows no-form">${item.shows}</p>
                          <textarea class="edit-form large-box" name="shows">${item.shows}</textarea>

                          <label for="shopping-dining"><h4>Shopping/Dining</h4></label>
                          <p class="shopping-dining no-form">${item.shoppingDining}</p>
                          <textarea class="edit-form large-box" name="shopping-dining">${item.shoppingDining}</textarea>

                          <label for="other"><h4>Other Notes</h4></label>
                          <p class="other no-form">${item.other}</p>
                          <textarea id="bottom" class="edit-form large-box" name="other">${item.other}</textarea><br>

                          <input type="submit" class="edit-form submit form-button" value="Submit All Changes">
                          <button class="cancel edit-form form-button">Cancel</button>
                          <button class="edit no-form form-button">Edit</button>
                          </form>
                          <button class="delete form-button">Delete Trip</button>
                    </div>`;
  });

  if ($('.trips-container').is(':empty')) { 
    $('.trips-container').html(entriesHtml);
    $('.trips-container').accordion({collapsible: true, active: 'none', heightStyle: 'content'}); 
  } else {
    $('.trips-container').append(entriesHtml);
    $('.trips-container').accordion('refresh');
  }
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
    const rides = ($(this).children('textarea[name=rides]').val());
    const shows = ($(this).children('textarea[name=shows]').val());
    const shoppingDining = ($(this).children('textarea[name=shopping-dining]').val());
    const other = ($(this).children('textarea[name=other]').val());
    const newValues = {
      rides,
      shows,
      shoppingDining,
      other
    };
    $(this).children('.rides').text(rides);
    $(this).children('.shows').text(shows);
    $(this).children('.shopping-dining').text(shoppingDining);
    $(this).children('.other').text(other);
    //PUT route
    $.ajax({
      url: (`/trips/${index}`),
      type: 'PUT',
      data: JSON.stringify(newValues),
      dataType: 'json', 
      contentType: 'application/json'
    });
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
    var query = {
      url: `/trips/${index}`,
      type: 'DELETE'
    };
    $.ajax(query);
    const header = $(this).parents().siblings(`#${index}`);
    const item = ($(this).parents('.trip'));
    header.remove();
    item.remove();
  });
}

function newTrip() {
  $('.new-trip').submit(function(e) {
    e.preventDefault();
    const c = '';
    const newTrip = {
      park: ($('input[name=park]:checked').next('label').text()),
      dateOfVisit: ($('input[name=date]').val()),
      crowdIndex: ($('input[name=index]').val()),
      rides: ($('.post[name=rides]').val()),
      shows: ($('.post[name=shows]').val()),
      shoppingDining: ($('.post[name=shopping-dining]').val()),
      other: ($('.post[name=other]').val())
    };
    $('input[name=date]').val(c);
    $('input[name=index]').val(c);
    $('.post[name=rides]').val(c);
    $('.post[name=shows]').val(c);
    $('.post[name=shopping-dining]').val(c);
    $('.post[name=other]').val(c);
    $.ajax({
      url: ('/trips'),
      type: 'POST',
      data: JSON.stringify(newTrip),
      success: function(data) {
        //update DOM with new item
        var newPost = {
          trips: [data]
        };
        displayTrips(newPost);
        $('html, body').animate({
          scrollTop: $(`#${data.id}`).offset().top-50}, 800);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });
}

function getTrips(callback) {
  var query = {
    url: '/trips',
    type: 'GET',
    success: callback
  };
  $.ajax(query);
}

$(function() {  
  getTrips(displayTrips);
  $('#date').datepicker();
  newTrip();
  editClicked();
  putRequest();
  cancelClicked();
  deleteClicked();
});