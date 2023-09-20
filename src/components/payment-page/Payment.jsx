// PaymentPage.js
import React, { useState, useEffect } from "react";
import { Image, Form, Button, Spinner, Alert } from "react-bootstrap";
import "./payment.css";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { BASE_URL, PAYMENTS } from "../../utils/constants";

const PaymentPage = () => {
  let { id } = useParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [paymentComplete, setPaymentComplete] = useState(false);

  const { projectName, projectDescription, targetAmount, thumbnailUrl } =
    useSelector((state) => state.project);

  const handleAmountChange = (e) => {
    // Ensure that only numbers are allowed in the input
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPaymentAmount(value);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError('');

      // Create a payload to send to the API
      const payload = {
        userName,
        userEmail,
        userPhoneNumber,
        amount: paymentAmount,
        projectId: id,
        status: 'DONE',
        stripeTxnId: generateRandomString(10)
      };

      // Make an API call using Axios
      const response = await axios.post(`${BASE_URL}${PAYMENTS}`, payload);

      // Handle the API response as needed
      console.log('API Response:', response.data);

      // Set paymentDone to true to display the success message
      setPaymentComplete(true);
      setUserPhoneNumber('')
      setPaymentAmount(0)
      setUserEmail('')
      setUserName('')
    } catch (err) {
      // Handle API call errors
      console.error('API Error:', err);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

  return (
    <div className="text-center">
      <Image
        src={thumbnailUrl}
        alt="Project Thumbnail"
        rounded
        className="my-3"
        style={{ width: "100px", height: "100px" }}
      />
      <h2>{projectName}</h2>
      <p>{projectDescription}</p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
        dolores eum voluptate facilis dolorum tempore reiciendis itaque sunt
        ipsa tenetur in saepe animi aperiam natus ab, sit, atque voluptatum at
        eligendi? Optio accusantium, ad perferendis nemo dignissimos doloribus
        rem neque pariatur voluptates assumenda qui nobis ipsa atque tenetur
        perspiciatis. Tenetur!
      </p>

      <Form>
      <Form.Group controlId="userEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="userEmail">
          <Form.Label>User Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="userPhoneNumber">
          <Form.Label>User Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={userPhoneNumber}
            onChange={(e) =>
              setUserPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
            }
            required
          />
        </Form.Group>
        <Form.Group controlId="amountInput">
          <Form.Control
            type="text"
            placeholder="Enter Amount"
            value={paymentAmount}
            onChange={handleAmountChange}
            disabled={paymentComplete}
          />
        </Form.Group>
        <Button
          variant={paymentComplete ? 'success' : 'primary'}
          onClick={handlePayment}
          disabled={paymentComplete}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Processing...
            </>
          ) : paymentComplete ? (
            "Payment Done"
          ) : (
            "Pay"
          )}
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
};

export default PaymentPage;
