import React, { useState, useEffect } from 'react';
import { Image } from './image';
import './gallery.css';

export const Gallery = (props) => {
    const [hotels, setHotels] = useState([]);
    const [filters, setFilters] = useState({ rating: '', province: '' });

    useEffect(() => {
        const fetchHotels = async () => {
            const queryString = new URLSearchParams(filters).toString();
            try {
                const response = await fetch(`http://localhost:3001/api/filteredhotels?${queryString}`);
                const data = await response.json();
                const combinedData = data.map((hotel, index) => {
                  const imageData = props.data[index % props.data.length];
                  return {
                    ...hotel,
                    title: hotel.name, 
                    largeImage: imageData.largeImage, 
                    smallImage: imageData.smallImage, 
                  };
                });
                setHotels(combinedData);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, [filters, props.data]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div id="gallery" className="text-center">
            <div className="container">
                <div className="section-title">
                    <h2>Gallery</h2>
                    <p>Explore our collection of stunning hotels across North America.</p>
                </div>
                <div className="filters">
                  <select name="rating" onChange={handleFilterChange} value={filters.rating}>
                          <option value="">Rating</option>
                          {[1, 2, 3, 4, 5].map((rating) => (
                              <option key={rating} value={rating}>{rating}</option>
                          ))}
                      </select>
                      <select name="province" onChange={handleFilterChange} value={filters.province}>
                          <option value="">Province</option>
                          {['Ontario', 'Alberta', 'British Columbia'].map((province) => (
                              <option key={province} value={province}>{province}</option>
                          ))}
                      </select>
                </div>
                <div className="row">
                    <div className="portfolio-items">
                        {hotels.length > 0 ? hotels.map((hotel, i) => (
                            <div key={`${hotel.title}-${i}`} className="col-sm-6 col-md-4 col-lg-4">
                                <Image
                                    title={hotel.title}
                                    largeImage={hotel.largeImage}
                                    smallImage={hotel.smallImage}
                                />
                            </div>
                        )) : "No available hotels. Please try again later."}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
