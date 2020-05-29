import React, { useEffect, useState } from 'react'
import './main.css'
import api from '../services/api'
import {Link} from 'react-router-dom'

import Logo from '../assets/logo.png'
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'


export default function Main({match}) {
    
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function loadusers(){
            const response = await api.get('/devs', {
                headers: { 
                    user: match.params.id, 
                }
            })
            setUsers(response.data)
        }
        loadusers();
    }, [match.params.id]);

    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDisLike(id){
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        })
        setUsers(users.filter(user => user._id !== id));
    }


    return (
        <div className="main-container">
            <Link to="/">
                <img src={Logo} alt="Tindev" />
            </Link>
            <ul>
                {users.map(user => (
                    <li key={user._id} >
                        <img src={user.avatar} alt="Avatar" />
                        <footer>
                            <strong> {user.name} </strong>
                            <p> {user.bio} </p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={() => handleDisLike(user._id)}>
                                <img src={dislike} alt="dislike" />
                            </button>
                            <button type="button" onClick={() => handleLike(user._id)}>
                                <img src={like} alt="Like" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
