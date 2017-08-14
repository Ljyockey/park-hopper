BEGIN;

INSERT INTO trips (park, date_of_visit, crowd_index, rides, shows, shopping_dining, other) VALUES
('Disneyland', '06/11/2017', 5, 'Space Mountain, Matterhorn, Splash Mountain', 'Fantasmic', 'Fench Market',
'Tomorrowland was less crowded at the end of the day because of Fantasmic and fireworks'),
('Disney''s California Adventure', '07/11/2017', 4, 'Soarin, Guardians, Midway Mania', 'World of Color', 'Sonoma Terrace, Five and Dime',
'fastpasses went quickly for Guardians. Need to get there sooner'),
('Park Hopper', '08/11/2017', 6, 'Space Mountain, Matterhorn, Splash Mountain, Soarin, Midway Mania', 'Fantasmic, World of Color',
'French Market, Sonoma Terrace', 'Went with Valerie. Had a blast! MaxPass made for smoother planning');

COMMIT;