package com.example.mylibraryapp.controller;

import com.example.mylibraryapp.service.BookService;
import com.example.mylibraryapp.service.dto.BookDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class BooksController {
    private final BookService bookService;

    @GetMapping("/books")
    public List<BookDto> allBooks() {
        return bookService.findAll();
    }

    @GetMapping("/book/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BookDto> getBook(@PathVariable Long id) {
        return ResponseEntity.ok().body(bookService.findById(id));
    }

    @PostMapping("/book")
    public ResponseEntity<BookDto> createBook( @RequestBody BookDto book) throws URISyntaxException {
        BookDto result = bookService.save(book);
        return ResponseEntity.created(new URI("/api/v1/books/" + result.getId()))
                .body(result);
    }

    @PutMapping("/book/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<BookDto> updateBook( @PathVariable Long id, @RequestBody BookDto book) {
        return ResponseEntity.ok().body(bookService.save(book));
    }

    @DeleteMapping("/book/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        bookService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
