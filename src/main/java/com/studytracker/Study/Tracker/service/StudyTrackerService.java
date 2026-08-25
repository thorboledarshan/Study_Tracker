package com.studytracker.Study.Tracker.service;

import com.studytracker.Study.Tracker.model.StudyLog;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.io.*;


@Service
public class StudyTrackerService
{
    public ArrayList<StudyLog> database;
    private int nextId = 1;
    private static final String DATA_FILE = "study_tracker_data.csv";

    public StudyTrackerService()
    {
        database = new ArrayList<>();
        loadData();
    }

    public ArrayList<StudyLog> getAllLogs()
    {
        return database;
    }

    private void saveData()
    {
        try
        {
            File file = new File(DATA_FILE);

            try(FileWriter writer = new FileWriter(file))
            {
                writer.write("Date,Subject,Duration of study,Description of study\n");

                for(StudyLog log : database)
                {
                    writer.write(
                            log.getDate() + "," +
                                    log.getSubject() + "," +
                                    log.getDuration() + "," +
                                    log.getDescription() + "\n"
                    );
                }
            }

            System.out.println("Data saved successfully.");
        }
        catch(IOException e)
        {
            System.out.println("Error while saving study data:");
            e.printStackTrace();
        }
    }

    private void loadData()
    {
        File file = new File(DATA_FILE);

        if(!file.exists())
        {
            System.out.println("Data file does not exist.");
            return;
        }

        try(BufferedReader reader =
                    new BufferedReader(new FileReader(file)))
        {
            // Skip header
            reader.readLine();

            String line;

            while((line = reader.readLine()) != null)
            {
                if(line.trim().isEmpty())
                {
                    continue;
                }

                String[] data = line.split(",", -1);

                if(data.length != 4)
                {
                    continue;
                }

                LocalDate date =
                        LocalDate.parse(data[0].trim());

                String subject =
                        data[1].trim();

                double duration =
                        Double.parseDouble(data[2].trim());

                String description =
                        data[3].trim();

                StudyLog log = new StudyLog(
                        nextId,
                        date,
                        subject,
                        duration,
                        description
                );

                database.add(log);

                nextId++;
            }

            System.out.println(
                    "Loaded " + database.size() + " study logs."
            );
        }
        catch(Exception e)
        {
            System.out.println("Error while loading study data:");
            e.printStackTrace();
        }
    }

    public StudyLog addLog(StudyLog log)
    {
        log.setId(nextId);
        nextId++;

        if(log.getDate() == null)
        {
            log.setDate(LocalDate.now());
        }

        database.add(log);
        saveData();

        return log;
    }

    public boolean deleteLog(Integer id)
    {
        for(StudyLog log : database)
        {
            if(log.getId() == id)
            {
                database.remove(log);
                return true;
            }
        }

        return false;
    }

    public String exportToCSV()
    {
        String fileName = "study_logs.csv";

        try(FileWriter writer = new FileWriter(fileName))
        {
            writer.write("Date,Subject,Duration of study,Description of study\n");

            for(StudyLog log : database)
            {
                writer.write(
                        log.getDate() + "," +
                                log.getSubject() + "," +
                                log.getDuration() + "," +
                                log.getDescription() + "\n"
                );
            }

            return "Study logs exported successfully to " + fileName;
        }
        catch(IOException e)
        {
            return "Error while exporting study logs";
        }
    }

    public int importFromCSV(String fileName)
    {
        int count = 0;

        try(BufferedReader reader =
                    new BufferedReader(new FileReader(fileName)))
        {
            // Skip header
            reader.readLine();

            String line;

            while((line = reader.readLine()) != null)
            {
                if(line.trim().isEmpty())
                {
                    continue;
                }

                String[] data = line.split(",", -1);

                if(data.length != 4)
                {
                    continue;
                }

                LocalDate date =
                        LocalDate.parse(data[0].trim());

                String subject =
                        data[1].trim();

                double duration =
                        Double.parseDouble(data[2].trim());

                String description =
                        data[3].trim();


                // =========================================
                // Check for duplicate study log
                // =========================================

                boolean duplicate = false;

                for(StudyLog existingLog : database)
                {
                    if(
                            existingLog.getDate().equals(date) &&
                                    existingLog.getSubject().equals(subject) &&
                                    existingLog.getDuration() == duration &&
                                    existingLog.getDescription().equals(description)
                    )
                    {
                        duplicate = true;
                        break;
                    }
                }


                // =========================================
                // Skip duplicate
                // =========================================

                if(duplicate)
                {
                    continue;
                }


                // =========================================
                // Add new study log
                // =========================================

                StudyLog log = new StudyLog(
                        nextId,
                        date,
                        subject,
                        duration,
                        description
                );

                nextId++;

                database.add(log);

                count++;
            }
        }
        catch(IOException e)
        {
            return -1;
        }
        catch(Exception eobj)
        {
            return -1;
        }

        return count;
    }

    public TreeMap<LocalDate, Double> summaryByDate()
    {
        TreeMap<LocalDate, Double> summary =
                new TreeMap<LocalDate, Double>();

        for(StudyLog log : database)
        {
            LocalDate date = log.getDate();

            double duration = log.getDuration();

            if(summary.containsKey(date))
            {
                double old = summary.get(date);

                summary.put(date, old + duration);
            }
            else
            {
                summary.put(date, duration);
            }
        }

        return summary;
    }

    public TreeMap<String, Double> summaryBySubject()
    {
        TreeMap<String, Double> summary =
                new TreeMap<String, Double>();

        for(StudyLog log : database)
        {
            String subject = log.getSubject();

            double duration = log.getDuration();

            if(summary.containsKey(subject))
            {
                double old = summary.get(subject);

                summary.put(subject, old + duration);
            }
            else
            {
                summary.put(subject, duration);
            }
        }

        return summary;
    }
} //End of main