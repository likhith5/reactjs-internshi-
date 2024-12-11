
import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Card, Container } from 'react-bootstrap';
import './countdown.css'; 

const Countdown = () => {
    const [targetDate, setTargetDate] = useState('');
    const [timeLeft, setTimeLeft] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [audio] = useState(new Audio('D:/assignments/counterapplication react/counter-app/public/.mp3'));

    useEffect(() => {
        let timer;
        if (targetDate) {
            timer = setInterval(() => {
                const difference = new Date(targetDate) - new Date();
                if (difference > 0) {
                    setTimeLeft({
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                        seconds: Math.floor((difference % (1000 * 60)) / 1000),
                    });
                } else {
                    clearInterval(timer);
                    setIsCompleted(true);
                    audio.play();
                }
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [targetDate, audio]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTargetDate(e.target.elements.targetDate.value);
        setIsCompleted(false);
        audio.pause();
        audio.currentTime = 0;
    };

    const handleStopSound = () => {
        audio.pause();
        audio.currentTime = 0;
    };

    return (
        <Container className="countdown-container">
            <Row>
                <Col md={12} className="mx-auto">
                    <Card className="custom-card">
                        <Card.Body className="text-center">
                            <Card.Title>Countdown Timer</Card.Title>
                            <Form onSubmit={handleSubmit} className="mb-4">
                                <Form.Group controlId="formTargetDate">
                                    <Form.Label>Target Date</Form.Label>
                                    <Form.Control type="datetime-local" name="targetDate" required />
                                </Form.Group>
                                <br/><br/>
                                <Button variant="primary" type="submit">Start Countdown</Button>
                            </Form>
                            {timeLeft.days !== undefined ? (
                                <div className="time-display">
                                    <div>
                                        {String(timeLeft.days).padStart(2, '0')} :
                                        {String(timeLeft.hours).padStart(2, '0')} :
                                        {String(timeLeft.minutes).padStart(2, '0')} :
                                        {String(timeLeft.seconds).padStart(2, '0')}
                                    </div>
                                    <div className="time-labels">Days : Hours : Minutes : Seconds</div>
                                </div>
                            ) : (
                                <p>No countdown set.</p>
                            )}
                            {isCompleted && (
                                <div className="mt-4">
                                    <h3>Time's Up!</h3>
                                    <Button variant="danger" onClick={handleStopSound}>
                                        Stop Sound
                                    </Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Countdown;
