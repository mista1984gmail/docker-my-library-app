package com.example.mylibraryapp.service;


import com.example.mylibraryapp.service.dto.BookDto;

import java.util.List;

public interface BookService {
    List<BookDto> findAll ();
    BookDto findById( Long id);
    BookDto save (BookDto book);
    void deleteById (Long id);
}
