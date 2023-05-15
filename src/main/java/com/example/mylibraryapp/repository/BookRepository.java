package com.example.mylibraryapp.repository;

import com.example.mylibraryapp.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
