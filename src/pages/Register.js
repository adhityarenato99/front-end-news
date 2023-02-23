import React, { useState } from 'react';

// import hook useHistory from react router dom;
import { useHistory } from 'react-router';

// import axios
import axios from 'axios';

const Register = () => {
    // return (
    //     <>
    //     <h1>Register page</h1>
    //     </>
    // )

    // define state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    // define state validation
    const [validation, setValidation] = useState([]);

    // define history
    const history = useHistory();

    // function "registerHandler" 
    const registerHandler = async (e) => {
        e.preventDefault();

        // initialize formData
        const formData = new FormData();

        // append data to formData
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        // send data to server
        await axios.post('http://localhost:8000/api/register', formData)
            .then(() => {
                // redirect to login page
                history.push('/')    
            })
            .catch((error) => {
                // assign error to state "validation"
                setValidation(error.response.data);
            })
    }


    // return (
    //     <div className="container" style={{ marginTop: '120px'}}>
    //         <div className="row justify-content-center">
    //             <div className="col-md-6">
    //                 <div className="card border-0 rounded shadow-sm">
    //                     <div className="card-body">
    //                         Register Page
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // )

    return (
        <div className="container" style={{ marginTop: '120px' }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">Register Page</h4>
                            <hr />
                            <form onSubmit={registerHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Full name</label>
                                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name..." />
                                        </div>
                                        {
                                            validation.name && (
                                                <div className="alert alert-danger">
                                                    {validation.name[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email..." />
                                        </div>
                                        {
                                            validation.email && (
                                                <div className="alert alert-danger">
                                                    {
                                                        validation.email[0]
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Password
                                            </label>
                                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
                                        </div>
                                        {
                                            validation.password && (
                                                <div className="alert alert-danger">
                                                    {validation.password[0]}
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Password Confirmation</label>
                                            <input type="password" className="form-control" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Password Confirmation..." />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">REGISTER</button>
                            </form>

                            <div style={{ marginTop: '10px' }}>Already have an account? <a href="/">Login</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Register;