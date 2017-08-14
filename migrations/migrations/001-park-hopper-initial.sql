BEGIN;

CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    park TEXT NOT NULL,
    date_of_visit TEXT NOT NULL,
    crowd_index INTEGER NOT NULL,
    rides TEXT,
    shows TEXT,
    shopping_dining TEXT,
    other TEXT
);

COMMIT;