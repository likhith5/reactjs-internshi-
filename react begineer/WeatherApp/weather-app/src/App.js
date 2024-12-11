import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Spinner, Alert } from 'react-bootstrap';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = '15f2b25ab3203e44eed0c3a9be5ac017';

    const getWeather = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeather(response.data);
        } catch (error) {
            setError('City not found. Please enter a valid city.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="container mt-5"
            style={{
                backgroundColor: '#e0f7fa',
                backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')`, // Texture image URL
                backgroundSize: 'cover',
                backgroundBlendMode: 'overlay',
                fontFamily: "'Roboto', sans-serif",
                minHeight: '100vh',
                padding: '20px',
                borderRadius: '8px',
                color: '#333'
            }}
        >
            <h1 className="text-center" style={{ fontWeight: '700', fontSize: '2.5rem' }}>Weather App</h1>

            <Form onSubmit={getWeather} className="mb-4">
                <Form.Group controlId="formCityName">
                    <Form.Label style={{ fontSize: '1.2rem' }}>Enter City Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    Get Weather
                </Button>
            </Form>

            {loading && <Spinner animation="border" role="status" />}

            {error && <Alert variant="danger">{error}</Alert>}

            {weather && (
                <Card className="mt-3" style={{ borderRadius: '10px', fontSize: '1.1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{weather.name}</Card.Title>
                        <Card.Text>
                            <strong>Temperature:</strong> {weather.main.temp}°C <br />
                            <strong>Weather:</strong> {weather.weather[0].description} <br />
                            <strong>Humidity:</strong> {weather.main.humidity}% <br />
                            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default WeatherApp;
