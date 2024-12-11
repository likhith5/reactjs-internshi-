import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  // Initial data for the grid
  const initialData = [
    { id: 1, name: 'likhith',   age: 22, email: 'likhith45@gmail.com' },
    { id: 2, name: 'paruljain ',   age: 21, email: 'parul678@gmail.com' },
    { id: 3, name: 'preetham', age: 22, email: 'preetham6@gmail.com' },
    { id: 4, name: 'bhuvana', age: 20, email: 'bhuvana86@gmail.com' },
    { id: 5, name: 'mohith   ', age: 22, email: 'mohith87@gmail.com' },
    { id: 6, name: 'lakshmi', age: 21, email: 'lakshmi89@gmail.com' },
    { id: 7, name: 'sheryas', age: 22, email:'sheryas234@gmail.com' },
  ];

  const [rowData, setRowData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [formData, setFormData] = useState({ name: '', age: '', email: '' });

  // Column definitions for AG-Grid
  const columnDefs = [
    { headerName: 'Name', field: 'name', editable: true },
    { headerName: 'Age', field: 'age', editable: true },
    { headerName: 'Email', field: 'email', editable: true },
    {
      headerName: 'Actions',
      cellRendererFramework: (params) => (
        <div>
          <Button variant="info" size="sm" onClick={() => handleEdit(params.data)}>Edit</Button>{' '}
          <Button variant="danger" size="sm" onClick={() => handleDelete(params.data.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  
  const handleEdit = (data) => {
    setCurrentRow(data);
    setFormData(data);
    handleShowModal();
  };

  const handleDelete = (id) => {
    setRowData(rowData.filter(row => row.id !== id));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentRow) {
      setRowData(rowData.map(row => (row.id === currentRow.id ? formData : row)));
    } else {
      setRowData([...rowData, { id: rowData.length + 1, ...formData }]);
    }
    handleCloseModal();
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="app-container" style={styles.appContainer}>
      <h3 style={styles.header}>AG-Grid CRUD Operations</h3>
      <Button variant="primary" onClick={() => { setCurrentRow(null); handleShowModal(); }}>Add New</Button>

      {/* AG-Grid Table */}
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%', marginTop: '20px' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onCellValueChanged={(event) => setRowData([...rowData])} // Inline update
        />
      </div>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentRow ? 'Edit Entry' : 'Add New Entry'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button type="submit" variant="primary">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

const styles = {
  appContainer: {
    backgroundColor: '#0bffc', // Background color
    fontFamily: 'Arial, sans-serif', // Font family
    padding: '20px',
    backgroundImage: 'url(""D:/stock-vector-modern-banner-background-full-color-bright-blue-green-gradation-wave-eps-2247607203.jpg"")', // Optional background image
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
};

export default App;





















































