import React, { useState } from 'react'
import axios from "axios";
const Add = () => {
    const [ email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const handleSubmit = async() =>{
        const newUser = {email,password};
        try {
            await axios.post("http://localhost:8800/user/add",newUser);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <input value={email} onChange={(e) =>  setEmail(e.target.value) }type='email' placeholder='Enter Your Email' />
            <input value={password} onChange={(e) => setPassword(e.target.value) } type='password' placeholder='Enter Your Password' />
            <button  onClick={handleSubmit} >Send</button>
        </div>
    )
}

export default Add
