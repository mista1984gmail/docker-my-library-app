import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const BookList = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('/api/v1/books')
            .then(response => response.json())
            .then(data => {
                setBooks(data);
                setLoading(false);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`/api/v1/book/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedBooks = [...books].filter(i => i.id !== id);
            setBooks(updatedBooks);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const bookList = books.map(book => {
        return <tr key={book.id}>
            <td style={{whiteSpace: 'nowrap'}}>{book.title}</td>
            <td> {book.author || ''} </td>
            <td> {book.year || ''} </td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/books/" + book.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(book.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavbar/>
            <tr></tr>
            <Container fluid>
                <div className="float-end" >
                    <Button color="success" tag={Link} to="/books/new">Add Book</Button>
                </div>
                <h3>My Books</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Title</th>
                        <th width="20%">Author</th>
                        <th width="20%">Year</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default BookList;