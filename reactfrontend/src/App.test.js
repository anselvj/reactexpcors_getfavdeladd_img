import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axiosMock from 'axios'; // Import axiosMock
import App from './App';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});


afterEach(() => {
  document.body.removeChild(container);
  container = null;
});


jest.mock('axios');


describe('App Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
      console.error.mockRestore();
  });

  afterEach(() => {
      console.error.mockClear();
  });

  it('should take a snapshot', () => {
    const { asFragment } = render(<App />);
    
    expect(asFragment(<App />)).toMatchSnapshot();
  });

  it('renders image library header', () => {
    act(() => {
      ReactDOM.createRoot(container).render(<App />);
    });
    //render(<App />);
    const headerElement = screen.getByText('Image Library');
    expect(headerElement).toBeInTheDocument();
  });

  

  it('fetches and renders images on mount', async () => {
    act(() => {
      ReactDOM.createRoot(container).render(<App />);
    });

    const textbox = container.querySelector('input');
    act(() => {
      fireEvent.change(textbox, { target: { value: 'https://example.com/image.jpg' } });
    });
    expect(textbox.value).toBe('https://example.com/image.jpg');
    const mockImages = [
      { id: 1, url: 'https://example.com/image1.jpg' },
      { id: 2, url: 'https://example.com/image2.jpg' },
    ];
    axiosMock.get.mockResolvedValueOnce({ data: mockImages }); // Use axiosMock instead of axios

    const image = {
      id: 1,
      url: 'https://example.com/image1.jpg',
    };
    
    // Wait for the images to be fetched and rendered
    await waitFor(() => {
      //expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axiosMock.get).toHaveBeenCalledTimes(1);
    });
    
    const inputElement = container.querySelector('input[type="text"]');
    const imgValue  = 'https://media.istockphoto.com/id/1198271727/photo/abstract-wavy-object.jpg?s=612x612&w=0&k=20&c=CuuC79GvcO06K5EpBeQ2AMO68TkZS8mw9ZydJ2BMfeo=';
    act(() => {
      fireEvent.change(inputElement, { target: { value: imgValue } });
    });
    expect(inputElement.value).toBe(imgValue);

    // Render your component and get the UL element
    const ulElement = screen.getByRole('list');

    // Get the list items within the UL
    const listItems = ulElement.querySelectorAll('li');

    // Loop through each list item and simulate user interactions
    listItems.forEach((listItem, index) => {
      // Get the image element within the list item
      const imgElement = listItem.querySelector('img');

      // Get the "Favorite Image" button within the list item
      const favoriteButton = listItem.querySelector('button:nth-of-type(1)');

      // Get the "Delete Image" button within the list item
      const deleteButton = listItem.querySelector('button:nth-of-type(2)');

      // Simulate click on the "Favorite Image" button
      act(() => {
        fireEvent.click(favoriteButton);
      });

      // Simulate click on the "Delete Image" button
      act(() => {
        fireEvent.click(deleteButton);
      });
    });
    
  });

  it('should delete an image on button click', async () => {

    axiosMock.delete.mockResolvedValueOnce({ data: {} });

    act(() => {
      ReactDOM.createRoot(container).render(<App />);
    });

    // Render your component and get the UL element
    const ulElement = screen.getByRole('list');

    // Get the list items within the UL
    const listItems = ulElement.querySelectorAll('li');

    // Loop through each list item and simulate user interactions
    listItems.forEach(async (listItem, index) => {
      // Get the image element within the list item
      const imgElement = listItem.querySelector('img');
      const button = listItem.querySelector('button');
      expect(button.getByText).toBe('Delete Image');
      
      // Get the "Delete Image" button within the list item
      const deleteButton = listItem.querySelector('button:nth-of-type(2)');
      // Use waitFor to wait for the img element to appear
      await waitFor(() => {
        // Fire a change event on the input element
        fireEvent.change(inputElement, { target: { value: 'http://localhost:5000/images/1' } });
        expect(imgElement.src).toBe('http://localhost:5000/images/1');
        // Ensure that the img element exists
        expect(imgElement).toBeInTheDocument();

        // Check the alt attribute value
        expect(imgElement.alt).toBe('Uploaded');
        
        act(() => {  
          fireEvent.click(deleteButton);
        });
        expect(axiosMock.delete).toHaveBeenCalledWith('http://localhost:5000/images/1');
        expect(imgElement.alt).toBeNull();
     });

    });  
  });

  it('should mark an image as favorite on button click', async () => {
    act(() => {
      ReactDOM.createRoot(container).render(<App />);
    });
    const mockImages = [
      { id: 1, url: 'https://example.com/image1.jpg' },
      { id: 2, url: 'https://example.com/image2.jpg' },
    ];
    // Mock the response of the patch request
    axiosMock.patch.mockResolvedValueOnce({ data: mockImages });

    // Render your component and get the UL element
    const ulElement = screen.getByRole('list');

    // Get the list items within the UL
    const listItems = ulElement.querySelectorAll('li');

    // Loop through each list item and simulate user interactions
    listItems.forEach(async (listItem, index) => {
      // Get the image element within the list item
      const imgElement = listItem.querySelector('img');
      const button = listItem.querySelector('button');
      expect(button.getByText).toBe('Favorite Image');
      
      // Get the "Favorite Image" button within the list item
      const favoriteButton = listItem.querySelector('button:nth-of-type(1)');
      // Use waitFor to wait for the img element to appear
      await waitFor(() => {
        // Fire a change event on the input element
        fireEvent.change(inputElement, { target: { value: 'http://localhost:5000/images/1/favorite' } });
        expect(imgElement.src).toBe('http://localhost:5000/images/1/favorite');
        // Ensure that the img element exists
        expect(imgElement).toBeInTheDocument();

        // Check the alt attribute value
        expect(imgElement.alt).toBe('Uploaded');
        
        act(() => {
          fireEvent.click(favoriteButton);
        });

        // Check if the favorite request is sent with the correct ID
        expect(axiosMock.patch).toHaveBeenCalledWith('http://localhost:5000/images/1/favorite');
        expect(imgElement.alt).toBeNull('Uploaded');
     });

    });

  });
  

});
