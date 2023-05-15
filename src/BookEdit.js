import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const BookEdit = () => {
    const initialFormState = {
        title: '',
        author: '',
        year: ''
    };
    const [book, setBook] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/api/v1/book/${id}`)
                .then(response => response.json())
                .then(data => setBook(data));
        }
    }, [id, setBook]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setBook({ ...book, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/api/v1/book${book.id ? `/${book.id}` : ''}`, {
            method: (book.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        setBook(initialFormState);
        navigate('/books');
    }

    const title = <h2>{book.id ? 'Edit Book' : 'Add Book'}</h2>;

    return (<div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" value={book.title || ''}
                               onChange={handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Author</Label>
                        <Input type="text" name="author" id="author" value={book.author || ''}
                               onChange={handleChange} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="author">Year</Label>
                        <Input type="text" name="year" id="year" value={book.year || ''}
                               onChange={handleChange} autoComplete="address-level1"/>
                    </FormGroup>

                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/books">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
};

export default BookEdit;