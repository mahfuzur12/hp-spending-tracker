import { render, screen } from "@testing-library/react";
import React, { useState } from 'react';
import "@testing-library/jest-dom/extend-expect";
import Transactions from "../pages/Transactions";
import { AuthContext } from "../context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";

describe("Transactions", () => {

  test("renders Transactions component", () => {
    render(
      <AuthContext.Provider value={{ user: { id: 1 } }}>
        <Router>
          <Transactions />
        </Router>
      </AuthContext.Provider>
    );
    expect(screen.getByText("NAME")).toBeInTheDocument();
  });

  test("renders Transactions table", () => {
    render(
      <AuthContext.Provider value={{ user: { id: 1 } }}>
        <Router>
          <Transactions />
        </Router>
      </AuthContext.Provider>
    );
    expect(screen.getByText("DATE")).toBeInTheDocument();
    expect(screen.getByText("CATEGORY")).toBeInTheDocument();
  });

  test("renders filter button", () => {
    render(
      <AuthContext.Provider value={{ user: { id: 1 } }}>
        <Router>
          <Transactions />
        </Router>
      </AuthContext.Provider>
    );
    expect(screen.getByText("Filter by Category")).toBeInTheDocument();
  });
});

describe('handleSubmit', () => {
  beforeEach(() => {
    jest.resetModules();
  })

  it('should edit transaction successfully', async () => {
    jest.doMock('axios', () => ({
      patch: jest.fn(() => Promise.resolve({ data: 'Transaction updated successfully' })),
      get: jest.fn(() => Promise.resolve({ data: [] })),
    }));

    // mock transaction data
    const transaction = {
      id: '123',
      description: 'Groceries',
      category: 'Food',
      amount: 50,
      date: '2021-01-01',
    };
    const axios = require('axios');

    function TestComponent() {
      const [transactions, setTransactions] = useState([transaction]);
      const [description, setDescription] = useState('');
      const [category, setCategory] = useState('');

      // Handle form submit to update a transaction
      function handleSubmit(event) {
        event.preventDefault();
        const transactionId = event.currentTarget.dataset.transactionId;
        axios.patch(`http://localhost:8000/api/transactions/${transactionId}`, {
          description,
          category,
        })
          .then((res) => {
            setShowPopup(false);
            setSelectedTransactionId(null);
            axios.get('http://localhost:8000/api/transactions') // Refresh transactions data
              .then((res) => setTransactions(res.data))
              .catch((err) => console.log(err));
          })
          .catch((err) => {

            console.log(err);
          });
      }
    
    
    // simulate form submission with updated data
    const event = { preventDefault: jest.fn(), currentTarget: { dataset: { transactionId: transaction.id } } };
    setDescription('New description');
    setCategory('New category');
    handleSubmit(event);

    // check that transaction data was updated correctly
    it('should edit transaction', async () => {
    expect(axios.patch).toHaveBeenCalledWith(`http://localhost:8000/api/transactions/${transaction.id}`, {
      description: 'New description',
      category: 'New category',
    });
    });
    expect(axios.get).toHaveBeenCalledWith('http://localhost:8000/api/transactions');
    expect(setTransactions).toHaveBeenCalledWith([]);
    expect(description).toBe('New Description');
    expect(category).toBe('New category');
    }
 
    });
  
    


});





