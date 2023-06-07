import React from 'react';
import { Slide, Fade } from 'react-slideshow-image';
import '../styles/Home.css'; // Import your custom CSS file for styling
import 'react-slideshow-image/dist/styles.css';

const slideImages = [
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Slide 1'
  },
  {
    url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
    caption: 'Slide 2'
  },
  {
    url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    caption: 'Slide 3'
  },
];

const spanStyle = {
  fontSize: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '800px',
  backgroundSize: 'cover',
}

const Home = () => {
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
              <div style={{ ...divStyle, backgroundImage:`url(${image.url})` }}></div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
}

export default Home;
