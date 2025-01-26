import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Add.scss";
import { Banner } from "../../components";
import { sanitizeInput } from "../../utils/sanitize";
import { events as defaultEvents } from "../../data/events"; // Import the default events array

const Add = () => {
  const formRef = useRef(null);
  const [userIsMusician, setUserIsMusician] = useState(false);
  const [events, setEvents] = useState([]); // Manage events locally
  const [eventData, setEventData] = useState({
    id: "", // Auto-increment ID
    img: "", // Cover image
    pp: "/img/account2.png", // Default profile picture
    title: "",
    desc: "",
    date: "",
    address: "",
    budget: "",
    genre: "",
    star: 0,
    reviews: 0,
    username: "",
  });
  const navigate = useNavigate();

  // Load events from local storage or default
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || defaultEvents;
    setEvents(storedEvents);

    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserIsMusician(parsedUser?.isMusician || false);
      setEventData((prev) => ({
        ...prev,
        username: parsedUser?.username || "Anonymous", // Set default username
      }));
    } else {
      navigate("/auth/login"); // Redirect if user is not authenticated
    }
  }, [navigate]);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // Save the event locally
  const createEvent = () => {
    try {
      const newEvent = {
        ...eventData,
        id: events.length + 1, // Auto-increment ID
      };

      // Update the events array and save to local storage
      const updatedEvents = [...events, newEvent];
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));

      alert("Event created successfully!");
      navigate("/myGigs"); // Redirect to the dashboard or another page
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <>
      <div className="banner">
        <Banner
          title={sanitizeInput(
            `Welcome back. Hop on creating your new ${userIsMusician ? "Gig" : "Event"
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
                <label htmlFor="title">
                  {sanitizeInput(userIsMusician ? "Post Title" : "Event Title")}
                </label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                name="title"
                placeholder={sanitizeInput(
                  `e.g. ${userIsMusician
                    ? "1 hour canto with background band"
                    : "Wedding Event"
                  }`
                )}
                value={eventData.title}
                onChange={handleInputChange}
              />

              <div className="item">
                <label htmlFor="desc">{sanitizeInput("Description")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <textarea
                name="desc"
                placeholder={sanitizeInput(
                  userIsMusician
                    ? "Brief description of your services"
                    : "Brief description of your event"
                )}
                cols="30"
                rows="5"
                value={eventData.desc}
                onChange={handleInputChange}
              ></textarea>

              <div className="item">
                <label htmlFor="date">{sanitizeInput("Event Date")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="datetime-local"
                name="date"
                value={eventData.date}
                onChange={handleInputChange}
              />

              <div className="item">
                <label htmlFor="address">{sanitizeInput("Event Address")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="text"
                name="address"
                placeholder={sanitizeInput("Enter the event address")}
                value={eventData.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="details">
              <div className="item">
                <label htmlFor="category">{sanitizeInput("Category")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <select
                name="genre"
                value={eventData.genre}
                onChange={handleInputChange}
              >
                <option value="">{sanitizeInput("Select a category")}</option>
                <option value="rock">{sanitizeInput("Rock")}</option>
                <option value="classical">{sanitizeInput("Classical")}</option>
                <option value="jazz">{sanitizeInput("Jazz")}</option>
              </select>

              <div className="item">
                <label htmlFor="budget">{sanitizeInput("Budget")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="number"
                name="budget"
                placeholder="Enter the budget"
                value={eventData.budget}
                onChange={handleInputChange}
              />

              <div className="item">
                <label htmlFor="cover">{sanitizeInput("Cover Image")}</label>
                <img src="/img/icons/Edit.png" alt="" />
              </div>
              <hr />
              <input
                type="file"
                name="img"
                onChange={(e) =>
                  setEventData((prev) => ({
                    ...prev,
                    img: URL.createObjectURL(e.target.files[0]),
                  }))
                }
              />
            </div>
          </div>

          <div className="button-container">
            <button onClick={createEvent}>
              {sanitizeInput(userIsMusician ? "Create Gig" : "Create Event")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;
