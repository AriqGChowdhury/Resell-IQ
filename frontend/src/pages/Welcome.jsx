import { Button } from 'react-bootstrap';
import '../styles/Welcome.css';
import human from '../assets/human.png';
import cash from '../assets/cash.png';
import comp from '../assets/comp.png';

function Welcome() {
    return (
        <div className="">
            <div className="description">
                <p>Welcome to <strong>Resell IQ</strong>, your smart assistant for laptop purchase or resale.</p>
                <p>Simply upload your laptop and its specs, and we’ll instantly generate an estimated resale value and bidding price.</p>
                <p>Our pricing engine is powered by a machine learning model trained on real-world laptop data, so you can sell/buy with confidence.</p>
            
                <Button variant='light' href='/register'>Generate Price →</Button>
            </div>
            <div className="instructions">
                <div className="in1">
                    <p ><a id='n1'>1.</a> <strong>Register</strong></p>
                    <img src={human} width={'150px'} alt='img'></img>
                    <p><strong>Sign up for an account, only a username and password is needed!</strong></p>
                </div>
                <div className="in2">
                    <p> <a id='n2'>2.</a> <strong>Upload</strong></p>
                    <img src={comp} width={'150px'} alt='img'></img>
                    <p><strong>Upload the specs of chosen laptop</strong></p>
                </div>
                <div className="in3">
                    <p><a id='n3'>3.</a> <strong>Generate</strong></p>
                    <img src={cash} width={'150px'} alt='img'></img>
                    <p><strong>Get Resell and Bid price instantly!</strong></p>
                </div>
            </div>
        </div>
    )
}

export default Welcome;