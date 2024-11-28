import { useRef } from "react";
import "./Add.scss";
import { Banner } from "../../components";
import { sanitizeInput } from "../../utils/sanitize";

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
          title={sanitizeInput(
            `Welcome back. Hop on creating your new ${
              userIsMusician ? "Gig" : "Event"
            }`
          )}
          subtitle1={sanitizeInput("This is your General Information.")}
          subtitle2={sanitizeInput(`Complete the form below:`)}
          scrollToForm={scrollToForm}
        />
      </div>
      <div className="add" ref={formRef}>
        <div className="container">
          <h1>
            {sanitizeInput(userIsMusician ? "Add New Gig" : "Add New Event")}
          </h1>
          <div className="sections">
            <div className="info">
              <div className="item">
                <label htmlFor="">{sanitizeInput("Post Title")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                placeholder={sanitizeInput(
                  `e.g. I will do something I'm really good at`
                )}
              />

              <div className="item">
                <label htmlFor="">{sanitizeInput("Category")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <select name="cats" id="cats">
                <option value="design">{sanitizeInput("See all")}</option>
                <option value="web">{sanitizeInput("Rock")}</option>
                <option value="animation">
                  {sanitizeInput("Traditional")}
                </option>
                <option value="music">{sanitizeInput("Classical")}</option>
              </select>

              <div className="item">
                <label htmlFor="">{sanitizeInput("Cover Image")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="file" />

              <div className="item">
                <label htmlFor="">{sanitizeInput("Upload Images")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="file" multiple />

              <div className="item">
                <label htmlFor="">{sanitizeInput("Description")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <textarea
                placeholder={sanitizeInput(
                  userIsMusician
                    ? "Brief description of your services to your customers"
                    : "Brief description of your event"
                )}
                cols="0"
                rows="16"
              ></textarea>

              <div className="button-container">
                <button>{sanitizeInput("Create")}</button>
              </div>
            </div>

            <div className="details">
              <div className="item">
                <label htmlFor="">
                  {sanitizeInput(
                    userIsMusician ? "Service title" : "Event title"
                  )}
                </label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                placeholder={sanitizeInput(
                  `e.g. ${
                    userIsMusician
                      ? "1 hour canto with background band"
                      : "in need of a wedding singer"
                  }`
                )}
              />

              <div className="item">
                <label htmlFor="">
                  {sanitizeInput(
                    userIsMusician ? "Add extra features" : "Add extra rules"
                  )}
                </label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                placeholder={sanitizeInput(
                  userIsMusician
                    ? "e.g. song writing"
                    : "e.g. artist needs to know spanish"
                )}
              />
              <input
                type="text"
                placeholder={sanitizeInput(
                  userIsMusician
                    ? "e.g. other genres"
                    : "e.g. experience with big crowds"
                )}
              />

              <div className="item">
                <label htmlFor="">
                  {sanitizeInput(userIsMusician ? "Price" : "Budget")}
                </label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input type="number" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
