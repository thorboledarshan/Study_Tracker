# Study Tracker

A full-stack web application for recording, managing, and analyzing study sessions.

Study Tracker allows users to maintain daily study logs, monitor total study time, analyze study patterns by subject and date, visualize progress through charts, and import/export study data using CSV files.

The application is built using **React** for the frontend and **Spring Boot** for the backend. It uses **file-based persistence with CSV storage**, so no external database is required.

---

## Features

### Dashboard

- Total number of study logs
- Total study hours
- Total number of subjects
- Most studied subject
- Latest study date
- Subject-wise study progress
- Study insights
- Summary by Subject chart
- Summary by Date chart
- Quick access to add a new study log

### Study Log Management

- Add study logs
- View all study logs
- Delete study logs
- Automatic dashboard refresh after data changes

Each study log contains:

- Date
- Subject
- Duration
- Description

### Study Analysis

#### Summary by Subject

Displays the total study duration for each subject.

#### Summary by Date

Displays the total study duration for each study date.

### CSV Operations

- Import study logs from CSV files
- Export study logs to CSV files
- Prevent duplicate records during CSV import

### Automatic Data Persistence

Study data is automatically stored locally in:

```text
study_tracker_data.csv