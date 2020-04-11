package com.lunchtime.repository;

import com.lunchtime.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    /**
     * Returns the list of events which date of creation is greater than it comes in params.
     * It also returns all records that are NOT marked as deleted.
     * The list is ordered by column date in ascending direction.
     *
     * @param date all events needs to be newer than this date
     * @return the number of elements in this list
     */
    @Query("select e from Event e " +
        "where e.date > :date " +
        "and e.isDeleted = false " +
        "order by e.date asc")
    List<Event> findAll(Date date);

    /**
     * Returns the list of events which date of creation is greater than it comes in params,
     * and which belong to category that comes in params.
     * It also returns all records that are NOT marked as deleted.
     *
     * @param date     all events needs to be newer than this date
     * @param category the name of category that events should belong
     * @return the number of elements in this list
     */
    @Query("select e from Event e " +
        "where e.date > :date " +
        "and e.category in :category " +
        "and e.isDeleted = false")
    List<Event> findAllByCategory(Date date, String[] category);

    /**
     * Returns the list of events which date of creation is between dates that comes in params.
     * It also returns all records that are NOT marked as deleted.
     * The list is ordered by column date in ascending direction.
     *
     * @param startDate all events needs to be newer than this date
     * @param endDate   all events should NOT be newer than this date
     * @return the number of elements in this list
     */
    @Query("select e from Event e " +
        "where (e.date > :startDate and e.date < :endDate) " +
        "and e.isDeleted = false " +
        "order by e.date asc")
    List<Event> findAllByDateBetween(Date startDate, Date endDate);
}
