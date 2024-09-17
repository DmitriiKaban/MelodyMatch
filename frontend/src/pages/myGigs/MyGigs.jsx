import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";

function MyGigs() {
  const currentUser = {
    id: 1,
    username: "Matei",
    isMusician: true,
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isMusician ? " My Gigs" : "My Events"}</h1>
          {currentUser.isMusician && (
            <Link to="/add">
              <button>Add New Gig</button>
            </Link>
          )}
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            {currentUser?.isMusician && (
            <th>Sales</th>
          )}
            <th>Action</th>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="/img/account4.png"
                alt=""
              />
            </td>
            <td>Open for events</td>
            <td>59.<sup>99</sup></td>
            <td>13</td>
            <td>
              <img className="delete" src="./img/icons/delete.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="/img/account5.png"
                alt=""
              />
            </td>
            <td>Open for events</td>
            <td>120.<sup>99</sup></td>
            <td>41</td>
            <td>
              <img className="delete" src="./img/icons/delete.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="/img/account6.png"
                alt=""
              />
            </td>
            <td>High quality electro musical pieces</td>
            <td>79.<sup>99</sup></td>
            <td>55</td>
            <td>
              <img className="delete" src="./img/icons/delete.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="/img/account7.png"
                alt=""
              />
            </td>
            <td>Open for events</td>
            <td>119.<sup>99</sup></td>
            <td>29</td>
            <td>
              <img className="delete" src="./img/icons/delete.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="/img/account8.png"
                alt=""
              />
            </td>
            <td>Song writing for other artists, dedications</td>
            <td>59.<sup>99</sup></td>
            <td>34</td>
            <td>
              <img className="delete" src="./img/icons/delete.png" alt="" />
            </td>
          </tr>
          <tr>
            <td>
              <img
                className="image"
                src="/img/account2.png"
                alt=""
              />
            </td>
            <td>Song writing for other artists, dedications</td>
            <td>110.<sup>99</sup></td>
            <td>16</td>
            <td>
              <img className="delete" src="./img/icons/delete.png" alt="" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default MyGigs;