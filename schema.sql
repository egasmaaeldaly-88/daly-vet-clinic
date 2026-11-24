CREATE TABLE IF NOT EXISTS pets (
  id TEXT PRIMARY KEY,
  passport_uuid TEXT NOT NULL UNIQUE,
  pet_name TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT,
  weight_kg REAL,
  allergies TEXT,
  owner_name TEXT NOT NULL,
  owner_phone_sa TEXT NOT NULL,
  boarding_status TEXT DEFAULT 'none',
  boarding_notes TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vaccinations (
  id TEXT PRIMARY KEY,
  pet_id TEXT NOT NULL,
  vaccine_name TEXT NOT NULL,
  administered_date TEXT NOT NULL,
  next_due_date TEXT NOT NULL,
  reminder_sent INTEGER DEFAULT 0,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS medical_records (
  id TEXT PRIMARY KEY,
  pet_id TEXT NOT NULL,
  record_type TEXT NOT NULL, -- 'visit', 'xray_summary', 'lab_summary', 'prescription'
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  prescription_notes TEXT,
  show_in_passport INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);