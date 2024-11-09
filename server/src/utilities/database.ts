// src/database/Database.ts
import sqlite3, { Database as SQLiteDatabase } from "sqlite3";

export class Database {
  private static instance: Database;
  private db: SQLiteDatabase;

  private constructor() {
    this.db = new sqlite3.Database("database.sqlite", (err) => {
      if (err) {
        console.error("Error connecting to database:", err);
      } else {
        console.log("Connected to SQLite database");
        this.setupTables();
      }
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private setupTables(): void {
    this.db.run(
      `
      CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        feedback TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (error) => {
        if (error) {
          console.error("Error while creating feedback table: ", error);
        }
      }
    );

    this.db.run(
      `
      CREATE TABLE IF NOT EXISTS report (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name VARCHAR(50) NOT NULL,
        contact_number VARCHAR(30) NOT NULL,
        state VARCHAR(50) NOT NULL,
        nearest_town VARCHAR(60) NOT NULL,
        discovery_date VARCHAR(12) NOT NULL,
        discovery_time VARCHAR(12) NOT NULL,
        severity VARCHAR(12) NOT NULL,
        cause VARCHAR(12) NOT NULL,
        estimated_size VARCHAR(30) NOT NULL,
        status VARCHAR(12) NOT NULL,
        evacuation_status VARCHAR(12) NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (error) => {
        if (error) {
          console.error("Error while creating reports table: ", error);
        }
      }
    );
  }

  // Create
  public async create(table: string, data: Record<string, any>): Promise<number> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(",");

    const query = `INSERT INTO ${table} (${keys.join(",")}) VALUES (${placeholders})`;

    return new Promise((resolve, reject) => {
      this.db.run(query, values, function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  // Read All
  public async findAll<T>(table: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM ${table}`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }

  // Read One
  public async findById<T>(table: string, id: number): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve((row as T) || null);
      });
    });
  }

  // Read One
  public async findByEmail<T>(table: string, email_address: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM ${table} WHERE email = ?`, [email_address], (err, row) => {
        if (err) reject(err);
        else resolve((row as T) || null);
      });
    });
  }

  // Update
  public async update(table: string, id: number, data: Record<string, any>): Promise<boolean> {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key) => `${key} = ?`).join(",");

    return new Promise((resolve, reject) => {
      this.db.run(`UPDATE ${table} SET ${setClause} WHERE id = ?`, [...values, id], function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }

  // Delete
  public async delete(table: string, id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM ${table} WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }

  // Custom query
  public async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as T[]);
      });
    });
  }
}
