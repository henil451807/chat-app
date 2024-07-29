// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Form, Button, Spinner, Alert, Row, Col, Card, ListGroup, Table } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const [question, setQuestion] = useState('');
//   const [responseHistory, setResponseHistory] = useState([]);
//   const [latestResponse, setLatestResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [file, setFile] = useState(null);   
//   const [uploadLoading, setUploadLoading] = useState(false); 
//   const [showAfterFileUpload,setShowAfterFileUpload] = useState(false)
  
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       const res = await axios.post('http://127.0.0.1:5000/query', { question });
//       const newResponse = { question, response: res.data.response };
//       setResponseHistory([newResponse, ...responseHistory]);
//       setLatestResponse(newResponse);
//       setQuestion(''); // Clear the question input field
//     } catch (error) {
//       console.error(error);
//       setError('An error occurred while processing your request.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError('Please select a file to upload.');
//       return;
//     }
//     setUploadLoading(true);
//     setError('');
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post('http://127.0.0.1:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setFile(null);
//       setShowAfterFileUpload(true)
//     } catch (error) {
//       console.error(error);
//       setError('An error occurred while uploading the file.');
//     } finally {
//       setUploadLoading(false);
//     }
//   };


//   const parseResponseToTable = (response) => {
//     const lines = response.split('\n');
//     const data = lines.map(line => {
//       const [key, value] = line.split(':').map(part => part.trim());
//       return { key, value };
//     });
//     return data.filter(item => item.key && item.value);
//   };

//   const renderTable = (data) => (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Field</th>
//           <th>Value</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((item, index) => (
//           <tr key={index}>
//             <td>{item.key}</td>
//             <td>{item.value}</td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );

//   return (

//     <Container className="mt-5">
//       {!showAfterFileUpload && (
//         <>
//                 <h3>Upload CSV File</h3>
//       <Form.Group controlId="formFile" className="mb-3">
//         <Form.Control type="file" onChange={handleFileChange}  accept=".csv" />
//       </Form.Group>
//       <Button variant="success" onClick={handleUpload} disabled={uploadLoading}>
//         {uploadLoading ? (
//           <Spinner
//             as="span"
//             animation="border"
//             size="sm"
//             role="status"
//             aria-hidden="true"
//           />
//         ) : (
//           "Upload"
//         )}
//       </Button>
//         </>
//       ) }


//         {showAfterFileUpload && (
//                 <Row style={{marginTop:"20px"}}>
//                 <Col md="4">
//                   <Card>
//                     <Card.Header>
//                       <h2>Response History</h2>
//                     </Card.Header>
//                     <Card.Body>
//                       <ListGroup variant="flush">
//                         {responseHistory.map((res, index) => (
//                           <ListGroup.Item key={index}>
//                             <strong>Q:</strong> {res.question}
//                             <br />
//                             <strong>A:</strong> {res.response}
//                           </ListGroup.Item>
//                         ))}
//                       </ListGroup>
//                     </Card.Body>
//                   </Card>
//                 </Col>
        
//                 <Col md="8">
//                   <Card>
//                     <Card.Header>
//                       <h1>Hospital Patient Query</h1>
//                     </Card.Header>
//                     <Card.Body>
//                       <Form onSubmit={handleSubmit}>
//                         <Form.Group className="mb-3" controlId="formQuestion">
//                           <Form.Label>Enter your question:</Form.Label>
//                           <Form.Control
//                             type="text"
//                             placeholder="Type your question here"
//                             value={question}
//                             onChange={(e) => setQuestion(e.target.value)}
//                             required
//                           />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" disabled={loading}>
//                           {loading ? (
//                             <Spinner
//                               as="span"
//                               animation="border"
//                               size="sm"
//                               role="status"
//                               aria-hidden="true"
//                             />
//                           ) : (
//                             "Submit"
//                           )}
//                         </Button>
//                       </Form>
//                       <hr />
//                       {error && (
//                         <Alert className="mt-3" variant="danger">
//                           {error}
//                         </Alert>
//                       )}
//                       {!loading && latestResponse && (
//                         <Alert className="mt-3" variant="success">
//                           <Alert.Heading>Latest Response:</Alert.Heading>
//                           {latestResponse.response.includes("\n") ? (
//                             renderTable(parseResponseToTable(latestResponse.response))
//                           ) : (
//                             <p>{latestResponse.response}</p>
//                           )}
//                         </Alert>
//                       )}
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>
//         )}

//     </Container>
//   );
// }

// export default App;


import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
  ListGroup,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [question, setQuestion] = useState("");
  const [responseHistory, setResponseHistory] = useState([]);
  const [latestResponse, setLatestResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showAfterFileUpload, setShowAfterFileUpload] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // const res = await axios.post("http://127.0.0.1:5000/query", { question });
      const res = await axios.post("https://medibot1.onrender.com/query", { question });
      const newResponse = { question, response: res.data.response };
      setResponseHistory([newResponse, ...responseHistory]);
      setLatestResponse(newResponse);
      setQuestion(""); // Clear the question input field
    } catch (error) {
      console.error(error);
      setError("An error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setUploadLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("https://medibot1.onrender.com/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFile(null);
      setShowAfterFileUpload(true);
      setError(""); // Clear previous error messages
    } catch (error) {
      console.error(error);
      setError("An error occurred while uploading the file.");
    } finally {
      setUploadLoading(false);
    }
  };

  const parseResponseToTable = (response) => {
    const lines = response.split("\n");
    const data = lines.map((line) => {
      const [key, value] = line.split(":").map((part) => part.trim());
      return { key, value };
    });
    return data.filter((item) => item.key && item.value);
  };

  const renderTable = (data) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.key}</td>
            <td>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Container className="mt-5">
      {!showAfterFileUpload && (
        <>
          <h3>Upload CSV File</h3>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={handleFileChange} accept=".csv" />
          </Form.Group>
          <Button variant="success" onClick={handleUpload} disabled={uploadLoading}>
            {uploadLoading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Upload"
            )}
          </Button>
        </>
      )}

      {showAfterFileUpload && (
        <Row style={{ marginTop: "20px" }}>
          <Col md="4">
            <Card>
              <Card.Header>
                <h2>Response History</h2>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {responseHistory.map((res, index) => (
                    <ListGroup.Item key={index}>
                      <strong>Q:</strong> {res.question}
                      <br />
                      <strong>A:</strong> {res.response}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col md="8">
            <Card>
              <Card.Header>
                <h1>Hospital Patient Query</h1>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formQuestion">
                    <Form.Label>Enter your question:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Type your question here"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Form>
                <hr />
                {error && (
                  <Alert className="mt-3" variant="danger">
                    {error}
                  </Alert>
                )}
                {!loading && latestResponse && (
                  <Alert className="mt-3" variant="success">
                    <Alert.Heading>Latest Response:</Alert.Heading>
                    {latestResponse.response.includes("\n") ? (
                      renderTable(parseResponseToTable(latestResponse.response))
                    ) : (
                      <p>{latestResponse.response}</p>
                    )}
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
