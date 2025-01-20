# Vest

Simplifying stock trading for everyone

## Demo

🎥 Video Demo : https://youtu.be/7SEhi-6lGt0 

## Screenshots

![S1](/frontend/public/images/holdings.png)
![S4](/frontend/public/images/chart.png)
![S3](/frontend/public/images/profile.png)

## Deployment

- **Frontend** - [https://vest-two.vercel.app/](https://vest-two.vercel.app/)
- **Backend** - [https://vest-jhuk.onrender.com/](https://vest-jhuk.onrender.com/)

## Features

- Real-time stock data
- Buy and sell stocks
- View transaction history
- View portfolio

## Installation

### Prerequisites

- Python
- NPM

### Steps

- Clone the repository

  ```bash
  git clone https://github.com/OmAvhad/vest.git
  cd vest
  ```

- Setup Backend

  1. Go to the backend directory
     ```bash
     cd backend
     ```
  2. Create virtual environment and install dependencies
     ```bash
     python3 -m venv env
     source env/bin/activate
     pip3 install -r requirements.txt
     ```
  3. Create a `.env` file in the frontend directory by referring to the `.env.sample` file
  4. Run the migrations
     ```bash
     flask db upgrade
     ```
  5. Run the backend server
     ```bash
     python run.py
     ```
     or
     ```bash
     gunicorn --worker-class eventlet -w 1 -b :5000 run:app
     ```

- Setup Frontend

  1. Go to the frontend directory
     ```bash
     cd frontend
     ```
  2. Install dependencies
     ```bash
     npm install
     ```
  3. Create a `.env` file in the frontend directory by referring to the `.env.sample` file
  4. Run the frontend server
     ```bash
     npm start
     ```

## API Documentation

Explore the full API documentation on Postman:
[https://documenter.getpostman.com/view/19388406/2sAYQamrN4](https://documenter.getpostman.com/view/19388406/2sAYQamrN4)
