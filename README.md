# Resell-IQ

ResellIQ is an AI-powered full-stack web application designed to help resellers maximize profits on electronics. The app provides intelligent bidding recommendations, resale value predictions, and historical tracking to streamline the resale process. By leveraging machine learning and real-time market data, ResellIQ makes smarter reselling decisions accessible to everyone.

## Technology Stack
This project was created using: React, Bootstrap, Django REST Framework, FastAI, PyTorch and Python

- User Authentication

   → Secure login system with token-based authentication and session persistence.

- Smart Resell Predictions
  
  → AI-driven price predictions for electronics using a trained FastAI tabular model.

- Bidding Evaluations
  
  → Maximum bid recommendations calculated excluding shipping and taxes, assuming charger included by default.

- Resell & Bid History Tracking
  
  → Maximum bid recommendations calculated excluding shipping and taxes, assuming charger included by default.

- Performance Dashboard
  
  → Clean UI for reviewing predictions and past sales.

## Installation

Clone
```bash
git clone https://github.com/AriqGChowdhury/ResellIQ.git

```
Install Requirements
```bash
cd ResellIQ
pip install -r requirements.txt
```
Run Program (Django server) & (React Frontend) respectively
```bash 
python manage.py runserver
```
```bash 
npm install
npm start
```

## Support

Contact me at ariq922@hotmail.com

## Check out the site
http://reselliq-frontend.s3-website-us-east-1.amazonaws.com/login

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
