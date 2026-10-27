CREATE TABLE quiz_rooms (
 code TEXT PRIMARY KEY NOT NULL,
 host_hash TEXT NOT NULL,
 phase TEXT NOT NULL,
 question_index INTEGER NOT NULL DEFAULT -1,
 duration INTEGER NOT NULL DEFAULT 45,
 deadline INTEGER NOT NULL DEFAULT 0,
 created_at INTEGER NOT NULL,
 expires_at INTEGER NOT NULL,
 version INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE quiz_players (
 id TEXT PRIMARY KEY NOT NULL,
 room_code TEXT NOT NULL REFERENCES quiz_rooms(code) ON DELETE CASCADE,
 name TEXT NOT NULL,
 name_key TEXT NOT NULL,
 token_hash TEXT NOT NULL,
 joined_at INTEGER NOT NULL,
 UNIQUE(room_code, name_key),
 UNIQUE(room_code, token_hash)
);
CREATE TABLE quiz_answers (
 room_code TEXT NOT NULL REFERENCES quiz_rooms(code) ON DELETE CASCADE,
 player_id TEXT NOT NULL REFERENCES quiz_players(id) ON DELETE CASCADE,
 question_index INTEGER NOT NULL,
 choice INTEGER NOT NULL,
 points INTEGER NOT NULL,
 answered_at INTEGER NOT NULL,
 PRIMARY KEY(room_code, player_id, question_index)
);
CREATE INDEX quiz_players_room ON quiz_players(room_code);
CREATE INDEX quiz_answers_round ON quiz_answers(room_code, question_index);
CREATE INDEX quiz_rooms_expiry ON quiz_rooms(expires_at);
