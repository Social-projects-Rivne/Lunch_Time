package com.lunchtime.repository;

import com.lunchtime.models.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

//TODO remove redundant empty lines
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByRestId_Id(Long id);
}
