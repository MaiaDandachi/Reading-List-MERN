import React from "react";
import { ListGroup } from "react-bootstrap";

const Book = () => {
  const books = [
    { title: "book1", author: "Maia" },
    { title: "book2", author: "Amjad" },
  ];
  return (
    <>
      <h1>Your Books</h1>
      <ListGroup className="List-Group">
        {books.map((book, index) => (
          <ListGroup.Item key={index}>
            <p>
              <strong>{book.title}</strong>
            </p>
            <p>{book.author}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Book;
