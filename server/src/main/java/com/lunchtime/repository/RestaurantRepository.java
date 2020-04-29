package com.lunchtime.repository;

import com.lunchtime.models.Restaurant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Page<Restaurant> findByIsDeletedFalse(Pageable pageable);

    Optional<Restaurant> findByIdAndIsDeletedFalse(Long id);

    /**
     * Returns the list of restaurants that belong to concrete user (owner).
     * It also returns all records that are NOT marked as deleted.
     *
     * @param id       user (owner) whose restaurants needs to be return
     * @param pageable identifies what page needs to be returned and with what size
     * @return the restaurant list of concrete user (owner)
     */
    @Query("select r from Restaurant r "
        + "where r.personId in :id "
        + "and r.isDeleted = false")
    Page<Restaurant> findByOwnerRestList(Long id, Pageable pageable);
}
