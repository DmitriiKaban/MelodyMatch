import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";

function MyGigs() {
  const [currentUser, setCurrentUser] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setCurrentUser(storedUser);
    setEvents(storedEvents);

    // localStorage.removeItem("events")
  }, []);

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isMusician ? "My Gigs" : "My Events"}</h1>
          <Link to="/add">
            <button>Add New</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              {currentUser.isMusician && <th>Sales</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Render the latest event as the first row */}
            {events.length > 0 && (
              <tr>
                <Link to={`/gig/${events[events.length - 1].id}`}>
                  <td>
                    <img
                      className="image"
                      src="/img/account2.png"
                      alt=""
                    />
                  </td>
                </Link>
                <td>{events[events.length - 1].title}</td>
                <td>
                  {events[events.length - 1].budget}.
                  <sup>99</sup>
                </td>
                {currentUser.isMusician && <td>{events[events.length - 1].sales || 0}</td>}
                <td>
                  <img className="delete" src="./img/icons/delete.png" alt="" />
                </td>
              </tr>
            )}

            {/* Render the rest of the events */}
            {events.slice(0, -1).map((event) => (
              <tr key={event.id}>
                <Link to={`/gig/${event.id}`}>
                  <td>
                    <img className="image" src={event.img} alt="" />
                  </td>
                </Link>
                <td>{event.title}</td>
                <td>
                  {event.budget}.
                  <sup>99</sup>
                </td>
                {currentUser.isMusician && <td>{event.sales || 0}</td>}
                <td>
                  <img className="delete" src="./img/icons/delete.png" alt="" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyGigs;
