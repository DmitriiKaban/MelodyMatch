import { Link } from "react-router-dom";
import { ordersData } from "../../data/orders";
import "./Orders.scss";

const Orders = () => {
  const currentUser = {
    id: 1,
    username: "Matei",
    isMusician: true,
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isMusician ? "Orders" : "My orders"}</h1>
        </div>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>{currentUser.isMusician ? "Buyer" : "Seller"}</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id}>
                <td>
                  <img
                    className="image"
                    src={order.gig.img}
                    alt={order.gig.title}
                  />
                </td>
                <td>{order.gig.title}</td>
                <td>
                  {order.gig.price.toFixed(2)}
                  <sup>99</sup>
                </td>
                <td>{order.buyer}</td>
                <td>
                  <Link to="/message/:id">
                    <img
                      className="message"
                      src="./img/icons/message.png"
                      alt="message"
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
