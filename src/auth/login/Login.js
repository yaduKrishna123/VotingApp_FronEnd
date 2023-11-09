import React, { useState } from 'react'
import '../register/register.css'
import { Button, Card, Form } from 'react-bootstrap'
import Loader from '../../loaders/Loader'
import { userLogin } from '../../api/allApi'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const [loader,setloader]=useState(false)
  const nav=useNavigate()
  const [inputdata,setinputdata]=useState({
    
    email:"",
    password:""
})
const setinputvalue=(e)=>{
  const {name,value}=e.target
  setinputdata({...inputdata,[name]:value})
}
console.log(inputdata);


const LoginData=async()=>{
  const {email,password}=inputdata

  if(email==="" || password===""){
    toast.error("All fields are required")
  }
  const Data=new FormData()
  Data.append("email",email)
  Data.append("password",password)

  try{
    
    const response=await userLogin(Data)
    console.log(response);

    if(response.status===200){
      toast.success("Login Success")
      localStorage.setItem("token",response.data['token'])
      setloader(true)
      setTimeout(() => {
        setloader(false)
        nav('/dashboard')
        
      }, 3000);
    }
    else{
      toast.error("username/password incorrect")
    }



  }
  catch(err){
    console.log(err);
  }
}


  return (
    <>
    <div className="data">
    <div className="row" style={{overflow:'hidden'}}>


  <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
  <div className="bubble-container">
    <div className="bubble"></div>
    <div className="bubble"></div>
    <div className="bubble"></div>


  </div>
  <div className="bubble-container1">
    <div className="bubble1"></div>
    <div className="bubble1"></div>
    <div className="bubble1"></div>
    </div>

    <div className="bubble-container2">
    <div className="bubble2"></div>
    <div className="bubble2"></div>
    <div className="bubble2"></div>
    </div>
    <div className="bubble-container3">
    <div className="bubble3"></div>
    <div className="bubble3"></div>
    <div className="bubble"></div>
    </div>
    <div className="wallet-container">
    <div className="wallet"></div>


    </div>
  </div>
  <div className="col-lg-6" style={{width:'100%'}}>
        <Card className='shadow-lg p-3 mb-5 bg-white rounded' style={{ width: '100%;' }}>
      <Card.Body>
        <Card.Title className='center-text'>Login Here</Card.Title>
   {loader===false?     <Form>
     
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email'
            value={inputdata.email}
            onChange={setinputvalue} placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='password'
            value={inputdata.password}
            onChange={setinputvalue} placeholder="Password" />
      </Form.Group>
  
      <Button variant="info" onClick={LoginData}>
      Login
      </Button>
     
    </Form>:<Loader/>}
 { loader===false?   <Form.Text className="text-muted">
          Not have an account
        </Form.Text>:<Form.Text className="text-muted">
          Loding please wait.........
        </Form.Text>}
       &nbsp;&nbsp;&nbsp; {loader===false?<a href='/' className='btn btn-success'>Register</a>:''}
      </Card.Body>
    </Card>
        </div>
        {/* <div className="col-lg-8 reg_background">
            
        </div> */}
        
    </div>

</div>
<ToastContainer position='top-center'/>

    
    
    </>
  )
}

export default Login