import { useRef } from "react";
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

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
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
                <label htmlFor="">Title</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                placeholder={`e.g. I will do something I'm really good at`}
              />

              <div className="item">
                <label htmlFor="">Category</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <select name="cats" id="cats">
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
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
                name=""
                id=""
                placeholder="Brief descriptions to introduce your service to customers"
                cols="0"
                rows="16"
              ></textarea>

              <div className="button-container">
                <button>Create</button>
              </div>
            </div>

            <div className="details">
              <div className="item">
                <label htmlFor="">Service Title</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                placeholder={`e.g. ${
                  userIsMusician
                    ? "1 hour canto with background band"
                    : "Your event title"
                }`}
              />

              <div className="item">
                <label htmlFor="">Short Description</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <textarea
                name=""
                id=""
                placeholder="Short description of your service"
                cols="30"
                rows="10"
              ></textarea>

              <div className="item">
                <label htmlFor="">Add Features</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="text" placeholder="e.g. song-writing" />
              <input type="text" placeholder="e.g. other genres" />
              <input type="text" placeholder="e.g. band" />

              {userIsMusician && (
                <>
                  <div className="item">
                    <label htmlFor="">Price</label>
                    <img src="/img/icons/Edit.png" alt="" />
                  </div>
                  <hr />
                  <input type="number" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
