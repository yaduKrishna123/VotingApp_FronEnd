import React, { useEffect, useState } from 'react'
import Headers from './Headers'
import './dashboard.css'
import Modalcenter from './components/Modalcenter'
import { Badge, Button, Card, ListGroup } from 'react-bootstrap'
import { AddPolls, Allpolls } from '../api/allApi'
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom'
const socket = io('http://localhost:4000'); // Use the correct server URL


function Dashboard() {
  const [data,setdata]=useState([])
const nav=useNavigate()
  useEffect(()=>{

    if(!localStorage.getItem("token")){
      alert("login required")
      nav('/login')
    }
    AllPoolsData()

    socket.on('connect',()=>{
      socket.on("welcome",(data)=>{
        console.log("msg from server",data);
      })
      socket.emit("msg","thanks to connecting")
    });
    // socket.on('chatMessage', handleChatMessage);
    console.log(addpoll);

    return () => {
      // Clean up event listeners when the component unmounts
      socket.off("connect");
      // socket.off('chatMessage', handleChatMessage);
      socket.disconnect();
    };

    
  },[data])

  useEffect(()=>{
    //  const socket = io('http://localhost:4000'); 

    //  // Handle socket events, e.g., receiving poll updates
    //  socket.on('pollUpdate', (pollId, optionIndex) => {
    //    console.log('Poll updated:', pollId, optionIndex);
    //  });
 
    //  return () => {
    //    socket.disconnect();
    //  };

  },[])

  const AllPoolsData=async()=>{
    try{
      const response=await Allpolls()
      
      setdata(response.data)
      console.log(data);


    }
    catch(err){
      console.log(err);
    }
  }

  const addpoll=async(id,i)=>{
    try{

      const response=await AddPolls(id,i)
      console.log(response);
      if(response.status===200){
        console.log('Poll updated:', id, i);
        

        AllPoolsData()
      }

    }
    catch(err){
      console.log(err);
   
    }

  }
  return (
    <>
    <Headers/>
    <div className="rgb">
   
<div className="container">
  <div className="row">
  {data.map((d,index)=>(
    <div className="col-lg-4 mt-3" >
  <Card style={{ width: '20rem' }} className='bg-dark'>
      <Card.Body>
        {/* <Card.Title className='text-danger'>Card Title</Card.Title> */}
        <Card.Text className='text-success'>
          {d.question}
        </Card.Text>

        <ListGroup variant="flush">
        {d.options.map((v,index)=>(
          <ListGroup.Item className=''>{v.text} <Button onClick={()=>addpoll(d._id,index)} className='btn btn-primary'> {v.votes} </Button></ListGroup.Item>
        )) }
        {/* <ListGroup.Item className=''>Dapibus ac facilisis in <Button className='btn btn-primary'>1</Button></ListGroup.Item>
        <ListGroup.Item className=''>Vestibulum at eros <Button className='btn btn-primary'>1</Button></ListGroup.Item> */}
      </ListGroup>
        
      </Card.Body>
    </Card>
  </div>
  )) }
  </div>
</div>
  
    </div>
    </>
  )
}

export default Dashboard