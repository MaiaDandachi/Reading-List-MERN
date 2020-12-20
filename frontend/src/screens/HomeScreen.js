import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Row, Col, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listBooks, addBooks, removeBooks } from '../actions/userActions';
import { USER_ADD_BOOK_RESET } from '../constants/userConstants';

const HomeScreen = ({ history }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userBookList = useSelector((state) => state.userBookList);
  const { loading, error, books } = userBookList;

  const userAddBook = useSelector((state) => state.userAddBook);
  const {
    loading: loadingAdd,
    error: errorAdd,
    success: successAdd,
  } = userAddBook;

  const userRemoveBook = useSelector((state) => state.userRemoveBook);
  const { success: successRemove } = userRemoveBook;

  useEffect(() => {
    if (userInfo || successAdd || successRemove) {
      dispatch({ type: USER_ADD_BOOK_RESET });
      dispatch(listBooks());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successAdd, successRemove]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addBooks(title, author));
    setTitle('');
    setAuthor('');
  };

  const deleteHandler = (bookId) => {
    dispatch(removeBooks(bookId));
  };

  return (
    <>
      <Row>
        {loadingAdd && <Loader />}
        {errorAdd && <Message variant='danger'>{errorAdd}</Message>}
        <Col md={6}>
          <h1>Add Books You Want To Read!</h1>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='booktitle'>
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Book Title'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='bookauthor'>
                <Form.Label>Book Author</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Enter Book Author'
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Add
              </Button>
            </Form>
          </FormContainer>
        </Col>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Col md={4} className='order-md-2'>
            <h1>Your Books</h1>
            <h5>"Press the title to delete a book"</h5>
            <ListGroup>
              {books &&
                books.map((book) => (
                  <ListGroup.Item
                    key={book._id}
                    onClick={() => {
                      deleteHandler(book._id);
                    }}
                  >
                    <p>
                      <strong>{book.title}</strong>
                    </p>
                    <p>{book.author}</p>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        )}
      </Row>
    </>
  );
};

export default HomeScreen;
