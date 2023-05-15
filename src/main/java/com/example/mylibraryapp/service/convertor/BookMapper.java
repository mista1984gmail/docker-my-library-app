package com.example.mylibraryapp.service.convertor;


import com.example.mylibraryapp.models.Book;
import com.example.mylibraryapp.service.dto.BookDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookMapper {
    Book dtoToModel(BookDto bookDto);

    BookDto modelToDto(Book book);

    List<BookDto> toListDto(List<Book> books);
}
