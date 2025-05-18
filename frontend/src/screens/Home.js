import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      let response = await fetch("https://hungry-hound-4.onrender.com/api/users/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();

      console.log(response); // Check the structure of response to correctly set state

      if (response.foodCategory && response.foodCategory.length > 0) {
        setFoodCat(response.foodCategory[0].categories);
      } else {
        console.error('Invalid or empty response format for food categories:', response);
      }

      if (response.food_items && response.food_items.length > 0) {
        setFoodItem(response.food_items[0].menuItems);
      } else {
        console.error('Invalid response format for food items:', response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div className='m-3'>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://wallpaperaccess.com/full/767407.jpg" className="d-block w-100" style={{ filter: "brightness(75%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://img.freepik.com/free-photo/top-view-eid-al-fitr-celebration-with-delicious-food_23-2151205122.jpg?t=st=1720202904~exp=1720206504~hmac=309543f0cd4310735b83e59493c028b09a90fa28bf97a95d38cc05a70d425c76&w=1380" className="d-block w-100" style={{ filter: "brightness(75%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg?t=st=1720202792~exp=1720206392~hmac=60f53a0c817711e800f0814dd7bb52b493d0e4faaa47b33a15627153649f0574&w=1060" className="d-block w-100" style={{ filter: "brightness(75%)" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className='container'>
        {
          foodCat !== null
            ? foodCat.map((data) => (
              <div className='row mb-3' key={data._id}>
                <div className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {
                  foodItem !== 0 ?
                    foodItem.filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map(filterItems => (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options && filterItems.options.length > 0 ? filterItems.options[0] : 'Default Option'}
                           
                          />
                        </div>
                      ))
                    : <div>no such data found</div>
                }
              </div>
            ))
            : <div>hi</div>
        }
      </div>

      <Footer />
    </>
  );
}
