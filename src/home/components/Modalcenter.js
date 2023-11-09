import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Allpolls, createpoll } from '../../api/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Modalcenter(props) {
  const [data,setdata]=useState([])

  useEffect(()=>{

  },[])
const [update,setupdate]=useState([])
    const [inputdata,setinputdata]=useState({
    
        question:'',
        options: [
            { text: '', votes: 0 },
            { text: '', votes: 0 },
            { text: '', votes: 0 }
          ]
    })
    const setinputvalue=(e)=>{
        const {name,value}=e.target
        setinputdata({...inputdata,[name]:value})
      }
      const setOptionValue = (e, index) => {
        const { value } = e.target;
        const newOptions = [...inputdata.options];
        newOptions[index].text = value;
        setinputdata({
          ...inputdata,
          options: newOptions
        });
      };
      console.log(inputdata);
      const resetForm = () => {
        setinputdata({
          question: '',
          options: [
            { text: '', votes: 0 },
            { text: '', votes: 0 },
            { text: '', votes: 0 }
          ]
        });

        // const AllPoolsData=async()=>{
        //   try{
        //     const response=await Allpolls()
            
        //     setdata(response.data)
        //     console.log(data);
      
      
        //   }
        //   catch(err){
        //     console.log(err);
        //   }
        // }
      };

      const CreatePool=async()=>{
        const {question,options}=inputdata

        // const Data=new FormData()
        // Data.append("question",question)
        // Data.append("options",options)

        try{
        const response=await createpoll(inputdata)
        console.log(response);
        if(response.status===201){
          setupdate(response.data)
            toast.success("poll created")
            props.onHide()
        }

        }
        catch(err){
            console.log(err);
        }
      }
  return (
    <div>

<ToastContainer position='top-center'/>

<Modal
      {...props}
      onExited={resetForm}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="flex-center">
          Create POll
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Type Poll Question</Form.Label>
        <Form.Control type="text" name='question'
            value={inputdata.question}
            onChange={setinputvalue} placeholder="Enter poll question" />
       
      </Form.Group>
      <div className="row">
    {inputdata.options.map((option,index)=>(
   
        <div className="col-lg-3">
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{`OPTION ${index+1}`}</Form.Label>
        <Form.Control  type="text"
            value={option.text}
            onChange={(e) => setOptionValue(e, index)} placeholder={`option ${index+1}`} />
      </Form.Group>
        
       
        
    </div>))}
    </div>
   
    
      <Button variant="primary" onClick={CreatePool}>
        Submit
      </Button>
    </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default Modalcenter