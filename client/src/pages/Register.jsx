import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/Register.css"; // Import the CSS file
import { useAuth } from "../store/auth";

export const Register = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      // navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    position: "",
    department: "",
    password: "",
  });

  // const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          age: "",
          address: "",
          position: "",
          department: "",
          password: "",
        });
        navigate("/");
      }

      console.log(response);
    } catch (error) {
      console.log("Resgistration failed", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="Registration page picture"
                  width="400"
                  height="500"
                />
              </div>

              <div className="registration-form" style={{ marginTop: 75 }}>
                <h1 className="main-heading mb-3">Registration</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="Enter Username"
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Enter Email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
                      placeholder="Enter Phone No."
                    />
                  </div>
                  <div>
                    <label htmlFor="age">Age:</label>
                    <input
                      type="number"
                      name="age"
                      value={user.age}
                      onChange={handleInput}
                      placeholder="Enter Age"
                    />
                  </div>
                  <div>
                    <label htmlFor="address">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={user.address}
                      onChange={handleInput}
                      placeholder="Enter Address"
                    />
                  </div>
                  {/* <div>
                    <label htmlFor="position">Position:</label>
                    <input
                      type="text"
                      name="position"
                      value={user.position}
                      onChange={handleInput}
                      placeholder="Enter Position"
                    />
                  </div> */}
                  <div>
                    <label htmlFor="position">Position:</label>
                    <select
                      name="position"
                      value={user.position}
                      onChange={handleInput}
                    >
                      <option value="">Select Position</option>
                      <option value="associate">Associate</option>
                      <option value="manager">Manager</option>
                      <option value="seniorManager">Senior Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="department">Department:</label>
                    <select
                      name="department"
                      value={user.department}
                      onChange={handleInput}
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT</option>
                      <option value="accounting">Accounting</option>
                      <option value="sales">Sales</option>
                      <option value="HR">Human Resources</option>
                      <option value="RnD">Research and Development</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
