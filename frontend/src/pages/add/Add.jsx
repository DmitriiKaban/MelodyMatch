import { useRef, useState } from "react";
import { sanitizeInput } from "../../utils/sanitize";
import "./Add.scss";
import { Banner } from "../../components";

const currentUser = {
  id: 1,
  username: "Matei Basarab",
  isMusician: true,
};

const Add = () => {
  const formRef = useRef(null);
  const userIsMusician = currentUser.isMusician;
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    serviceTitle: "",
    extraFeatures: "",
    price: "",
  });

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: sanitizeInput(value),
    });
  };

  return (
    <>
      <div className="banner">
        <Banner
          title={`Welcome back. Hop on creating your new ${
            userIsMusician ? "Gig" : "Event"
          }`}
          subtitle1="This is your General Information."
          subtitle2={`Complete the form below:`}
          scrollToForm={scrollToForm}
        />
      </div>
      <div className="add" ref={formRef}>
        <div className="container">
          <h1>{userIsMusician ? "Add New Gig" : "Add New Event"}</h1>
          <div className="sections">
            <div className="info">
              <div className="item">
                <label htmlFor="">Post Title</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                name="title"
                placeholder={`e.g. I will do something I'm really good at`}
                value={formData.title}
                onChange={handleInputChange}
              />

              <div className="item">
                <label htmlFor="">Category</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="design">See all</option>
                <option value="web">Rock</option>
                <option value="animation">Traditional</option>
                <option value="music">Classical</option>
              </select>

              <div className="item">
                <label htmlFor="">Cover Image</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="file" />

              <div className="item">
                <label htmlFor="">Upload Images</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="file" multiple />

              <div className="item">
                <label htmlFor="">Description</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <textarea
                name="description"
                placeholder={
                  userIsMusician
                    ? "Brief description of your services to your customers"
                    : "Brief description of your event"
                }
                value={formData.description}
                onChange={handleInputChange}
                cols="0"
                rows="16"
              ></textarea>

              <div className="button-container">
                <button>Create</button>
              </div>
            </div>

            <div className="details">
              <div className="item">
                <label htmlFor="">
                  {userIsMusician ? "Service title" : "Event title"}
                </label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                name="serviceTitle"
                placeholder={`e.g. ${
                  userIsMusician
                    ? "1 hour canto with background band"
                    : "in need of a wedding singer"
                }`}
                value={formData.serviceTitle}
                onChange={handleInputChange}
              />

              <div className="item">
                <label htmlFor="">
                  {userIsMusician ? "Add extra features" : "Add extra rules"}
                </label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                name="extraFeatures"
                placeholder={
                  userIsMusician
                    ? "e.g. song writing"
                    : "e.g. artist needs to know spanish"
                }
                value={formData.extraFeatures}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="extraFeatures"
                placeholder={
                  userIsMusician
                    ? "e.g. other genres"
                    : "e.g. experience with big crowds"
                }
                value={formData.extraFeatures}
                onChange={handleInputChange} // Handle input change with sanitization
              />

              <div className="item">
                <label htmlFor="">{userIsMusician ? "Price" : "Budget"}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
