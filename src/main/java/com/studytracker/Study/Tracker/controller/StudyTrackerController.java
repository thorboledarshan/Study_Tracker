package com.studytracker.Study.Tracker.controller;

import com.studytracker.Study.Tracker.model.StudyLog;
import com.studytracker.Study.Tracker.service.StudyTrackerService;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

import java.time.LocalDate;
import java.util.TreeMap;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin(origins = "http://localhost:5173")
public class StudyTrackerController
{
    public StudyTrackerService service;

    public StudyTrackerController(StudyTrackerService service)
    {
        this.service = service;
    }

    @GetMapping
    public ArrayList<StudyLog> getAllLogs()
    {
        return service.getAllLogs();
    }

    @GetMapping("/export")
    public String exportToCSV()
    {
        return service.exportToCSV();
    }

    @PostMapping
    public StudyLog addLog(@RequestBody StudyLog log)
    {
        return service.addLog(log);
    }

    @DeleteMapping("/{id}")
    public String deleteLog(@PathVariable Integer id)
    {
        boolean deleted = service.deleteLog(id);

        if(deleted)
        {
            return "Study log deleted successfully";
        }

        return "Study log not found";
    }

    @PostMapping("/import")
    public String importFromCSV(@RequestParam String fileName)
    {
        int count = service.importFromCSV(fileName);

        if(count == -1)
        {
            return "Error while importing CSV file";
        }

        return count + " study logs imported successfully";
    }

    @GetMapping("/summary/date")
    public TreeMap<LocalDate, Double> summaryByDate()
    {
        return service.summaryByDate();
    }

    @GetMapping("/summary/subject")
    public TreeMap<String, Double> summaryBySubject()
    {
        return service.summaryBySubject();
    }


}