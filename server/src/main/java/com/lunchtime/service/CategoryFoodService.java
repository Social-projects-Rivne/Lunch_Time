package com.lunchtime.service;

import com.lunchtime.repository.CategoryFoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CategoryFoodService {

    @Autowired
  private CategoryFoodRepository categoryFoodRepos;
     

}
