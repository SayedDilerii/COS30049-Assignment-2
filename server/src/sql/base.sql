-- Users table
CREATE TABLE
    users (
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        middle_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        access_pin VARCHAR(255) NOT NULL,
        date_of_birth DATE,
        gender VARCHAR(20),
        country VARCHAR(100) NOT NULL,
        time_zone VARCHAR(50),
        created_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

-- Medications table
CREATE TABLE
    user_medications (
        user_medication_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (user_id),
        name VARCHAR(100) NOT NULL,
        dosage VARCHAR(50),
        form VARCHAR(50),
        instructions TEXT,
        start_date DATE,
        end_date DATE,
        expiry DATE
    );

-- Medication Schedules table
CREATE TABLE
    medication_schedules (
        schedule_id SERIAL PRIMARY KEY,
        user_medication_id INTEGER REFERENCES user_medications (user_medication_id),
        frequency_type VARCHAR(20) NOT NULL,
        times_of_day JSONB,
        days_of_week JSONB,
        specific_dates JSONB,
        dosage_amount VARCHAR(50),
        instructions TEXT
    );

-- Dose Logs table
CREATE TABLE
    dose_logs (
        log_id SERIAL PRIMARY KEY,
        user_medication_id INTEGER REFERENCES user_medications (user_medication_id),
        timestamp TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(20) NOT NULL,
            notes TEXT
    );

-- Reminders table
CREATE TABLE
    reminders (
        reminder_id SERIAL PRIMARY KEY,
        user_medication_id INTEGER REFERENCES user_medications (user_medication_id),
        reminder_type VARCHAR(20) NOT NULL,
        time_before_dose INTERVAL,
        repeat_interval INTERVAL
    );

-- Side Effects table
CREATE TABLE
    side_effects (
        side_effect_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        severity VARCHAR(20)
    );

-- User Side Effect Logs table
CREATE TABLE
    user_side_effect_logs (
        log_id SERIAL PRIMARY KEY,
        user_medication_id INTEGER REFERENCES user_medications (user_medication_id),
        side_effect_id INTEGER REFERENCES side_effects (side_effect_id),
        timestamp TIMESTAMP
        WITH
            TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            severity VARCHAR(20),
            duration INTERVAL,
            notes TEXT
    );

-- Emergency Contacts table
CREATE TABLE
    emergency_contacts (
        contact_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (user_id),
        name VARCHAR(100) NOT NULL,
        relationship VARCHAR(50),
        phone_number VARCHAR(20),
        home_phone VARCHAR(20),
        email VARCHAR(100),
        residence_area TEXT
    );

-- Medication Inventory table
CREATE TABLE
    medication_inventory (
        inventory_id SERIAL PRIMARY KEY,
        user_medication_id INTEGER REFERENCES user_medications (user_medication_id),
        current_quantity JSONB,
        last_refill_date DATE,
        next_refill_date DATE
    );

-- User Preferences table
CREATE TABLE
    user_preferences (
        preference_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users (user_id),
        language VARCHAR(20),
        notification_preferences JSONB,
        display_settings JSONB
    );

-- Medication Costs table
CREATE TABLE
    medication_costs (
        cost_id SERIAL PRIMARY KEY,
        user_medication_id INTEGER REFERENCES user_medications (user_medication_id),
        price_per_unit NUMERIC(10, 2),
        insurance_coverage NUMERIC(10, 2),
        out_of_pocket_cost NUMERIC(10, 2)
    );

-- Refill Reminders table
CREATE TABLE
    refill_reminders (
        refill_reminder_id SERIAL PRIMARY KEY,
        user_medication_id INTEGER REFERENCES user_medications (user_medication_id),
        reminder_date DATE,
        status VARCHAR(20)
    );