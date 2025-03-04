# Simple Ciphers

Welcome to **Simple Ciphers**!

This web application allows users to quickly encrypt and decrypt messages using a variety of classic and modern cryptographic ciphers. It is designed primarily for fun, allowing users to generate encrypted messages to send to friends, giving them a "spy-like" experience. While this app can be used for educational purposes, it does not provide in-depth explanations of the cryptosystems.

## 🚀 Features

### **Classical Ciphers**

- **Caesar Cipher** – A simple shift cipher that replaces each letter with one a fixed number of places away.
- **Substitution Cipher** – A more advanced cipher that substitutes letters based on a predefined key.
- **One-Time Pad** – A theoretically unbreakable cipher that uses a random key the same length as the message.
- **Vigenère Cipher** – A polyalphabetic cipher that extends the Caesar Cipher with a keyword.

### **Stream Ciphers**

- **A5/1 Cipher** – A stream cipher used in GSM encryption.
- **RC4 Cipher** – A widely used stream cipher known for its simplicity and speed.

### **Block Ciphers**

- **DES (Data Encryption Standard)** – A widely studied block cipher with 56-bit keys.
- **AES (Advanced Encryption Standard)** – A secure modern cipher used worldwide.
- **TEA (Tiny Encryption Algorithm)** – A lightweight block cipher with simple structure.

## 🛠 Setup

### **Requirements**

Ensure you have the following installed before running the project:

- **[Node.js](https://nodejs.org/) (latest stable version recommended)**
- **npm** (included with Node.js, or install separately via `npm install -g npm`)
- **[Docker](https://www.docker.com/get-started)** (latest stable version recommended)
  - Ensure Docker Desktop is running
  - Verify installation with `docker --version`
- **[Docker Compose](https://docs.docker.com/compose/)** (included with Docker Desktop or install separately)
  - Verify installation with `docker-compose --version`

### **Installation**

1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/simple-ciphers.git
   cd simple-ciphers
   ```
2. Install dependencies in frontend and backend with:
   ```sh
   npm i
   ```
3. Start the development server in frontend and backend folders:
   ```sh
   npm run dev
   ```
   This will launch the application on a local development server.

### **Docker Setup**

1. Ensure Docker is running
2. Build and start the application using Docker Compose.
   ```
   docker-compose up --build
   ```
3. To stop containers, run:
   ```
   docker-compose down
   ```

## 🎮 Usage

1. Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).
2. Select a cipher from the list.
3. Enter your message and key, then encrypt or decrypt.
4. Share the ciphertext with friends to decode!

## 🛠 Contributing

Contributions are welcome! If you'd like to improve the project, please:

- Fork the repository
- Create a new branch (`git checkout -b feature-name`)
- Make your changes
- Open a pull request

## 🐝 License

This project is licensed under the **MIT License**.

## 📩 Contact

For questions or suggestions, feel free to reach out via:

- GitHub Issues
- Your email (optional)

Happy encrypting! 🔐
