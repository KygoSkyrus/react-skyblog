import React, { useEffect,useState } from 'react'

const Messages = () => {

    const [messages,setMessages]=useState()

    useEffect(()=>{
        getMessages();
    },[])


    async function getMessages(){
        
        const res = await fetch("/showMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
        });
    
        const data = await res.json();
        setMessages(data)
        console.log("messages", data);
    }

    async function deleteMessage(id) {
        console.log('deletemesg', id);
        const res = await fetch("/deleteMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id,
            }),
        });

        const data = await res.json();
        console.log(data);
    }

  return (
    <>
     <div class="body-content">

<div class="card mb-4">
    <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h6 class="fs-17 font-weight-600 mb-0">Messages</h6>
            </div>
            <div class="text-right">
                <div class="actions">
                    <a href="" class="action-item"><i class="ti-reload"></i></a>
                </div>
            </div>
        </div>
    </div>


    <div class="card-body">
        <div class="table-responsive">
            <table class="table display table-bordered table-striped table-hover column-rendering">
                <thead>
                    <tr>
                        <th>S. No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    {
                    messages?.map((x,index)=>{
                        return(
                            <tr key={x._id}>
                                <td>{index + 1}</td>
                                <td>{x.name}</td>
                                <td>{x.email}</td>
                                <td>{x.phone}</td>
                                <td>{x.note}</td>
                                <td style={{display: "flex",border: "none",justifyContent: "center"}}><button onClick={e=>deleteMessage(x._id,e)} style={{background: "#d50606"}}><i class="fa fa-trash" ></i></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
</div>
{/* <!--Page length options--> */}
</div>
    </>
  )
}

export default Messages