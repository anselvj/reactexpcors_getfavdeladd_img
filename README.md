## Image Library Web App

This project is a web application built using React for the front end and a simple Node.js backend. The main purpose of this application is to serve as an image library where users can upload images and perform various actions on them.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/anselvj/reactexpcors_getfavdeladd_img.git
   ```

2. Navigate to the project directory:
   ```
   cd reactexpcors_getfavdeladd_img
   ```

3. Initialize the existing project:
   ```
   npm init -y
   ```

4. Install dependencies for the server:
   ```
   npm install
   ```

5. Navigate to the client directory:
   ```
   cd reactfrontend
   ```

6. Install dependencies for the client:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Open a web browser and navigate to http://localhost:3000 to view the client application.

3. Make changes to the code as needed.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```
   git checkout -b feature-branch
   ```
3. Make your changes and commit them:
   ```
   git add .
   git commit -m "Description of changes"
   ```
4. Push your changes to your fork:
   ```
   git push origin feature-branch
   ```
5. Create a pull request on the original repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Browser-Specific JSON Data after input action changes:

1. Images Collection URL:
   - [https://www.shutterstock.com/image-vector/vector-i…ation-cartoon-flying-american-600w-1136987882.jpg](https://www.shutterstock.com/image-vector/vector-i…ation-cartoon-flying-american-600w-1136987882.jpg)
   - [https://www.shutterstock.com/image-vector/vector-i…ustration-cartoon-flying-robin-600w-375517903.jpg](https://www.shutterstock.com/image-vector/vector-i…ustration-cartoon-flying-robin-600w-375517903.jpg)
   - [https://www.shutterstock.com/image-vector/circuit-…technology-background-central-600w-2259724309.jpg](https://www.shutterstock.com/image-vector/circuit-…technology-background-central-600w-2259724309.jpg)
   - [https://www.shutterstock.com/image-vector/flower-c…ection-leaves-floral-bouquets-600w-1933176458.jpg](https://www.shutterstock.com/image-vector/flower-c…ection-leaves-floral-bouquets-600w-1933176458.jpg)

2. Image After Addition and Favorite Status (Off/On):
   ```json
   [
     {"id":1,"url":"https://www.shutterstock.com/image-vector/vector-i…ation-cartoon-flying-american-600w-1136987882.jpg","favorite":true},
     {"id":2,"url":"https://www.shutterstock.com/image-vector/vector-i…ustration-cartoon-flying-robin-600w-375517903.jpg","favorite":false},
     {"id":3,"url":"https://www.shutterstock.com/image-vector/circuit-…technology-background-central-600w-2259724309.jpg","favorite":false},
     {"id":4,"url":"https://www.shutterstock.com/image-vector/flower-c…ection-leaves-floral-bouquets-600w-1933176458.jpg","favorite":false}
   ]
   ```

3. Images After Deletion:
   ```json
   [
     {"id":1,"url":"https://www.shutterstock.com/image-vector/flower-c…ection-leaves-floral-bouquets-600w-1933176458.jpg"},
     {"id":2,"url":"https://www.shutterstock.com/image-vector/vector-i…ation-cartoon-flying-american-600w-1136987882.jpg"},
     {"id":3,"url":"https://www.shutterstock.com/image-vector/vector-i…ustration-cartoon-flying-robin-600w-375517903.jpg"}
   ]
   ```
