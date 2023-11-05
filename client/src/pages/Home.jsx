import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import '../styles/Home.css'; // Import your custom CSS file for styling
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlyZXdvcmtzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    caption: 'Slide 1'
  },
  {
    url: 'https://images.unsplash.com/photo-1548386135-b47fa5a79ae6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZpcmV3b3Jrc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    caption: 'Slide 2'
  },
  {
    url: 'https://images.unsplash.com/photo-1567351344506-b2e8a94e273b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZpcmV3b3Jrc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    caption: 'Slide 3'
  },
];

// const divStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: '775px',
//   backgroundSize: 'cover'
// }

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check the screen width and set the isSmallScreen state
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: isSmallScreen ? '200px' : '775px', // Change height for small screens
    width: isSmallScreen ? '100%' : 'auto', // Change width for small screens
    backgroundSize: 'cover'
  }

  return (
    <div className="homepage-container">
      <div className="text-container">
        <h1 className='title'>Welcome to BigP Fireworks!</h1>
        <p className='description'>Explore our wide range of fireworks and celebrate with a bang!</p>
        <a href="/shop" className="shop-now-link">Shop Now</a>
      </div>
      <div className="slideshow-container">
        <Slide autoplay={true} duration={4000}>
          {slideImages.map((image, index) => (
            <div key={index} className="each-slide">
              <div style={{ ...divStyle, backgroundImage: `url(${image.url})` }}></div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default Home;
