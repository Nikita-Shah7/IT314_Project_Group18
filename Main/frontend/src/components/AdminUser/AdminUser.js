import React,{ useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './AdminUser.css'
import Users from './Users';
import data from './data';


export default function AdminCategory() {

    // // console.log("nik in admin menu");
    // const navigate = useNavigate();

    // if(!localStorage.getItem("isAdminAuth")) {
    //     navigate('/adminlogin');
    // }



    const allitem = data.map((users)=>{
        return (
            <Users
            id = {users.id}
            username = {users.UserName}
            email = {users.email}
            coins = {users.coins}
            />
        )
    })
    return(
    <div className='adm-use'>
        <div className="addi-use">
            <div className='w-use'>
                <h2 className='ti-use'>Users</h2>
            </div>
        </div>
        <section className="item-list-use">
        {allitem}
        </section>
        </div>
    )
}