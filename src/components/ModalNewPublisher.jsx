import React, {useState} from "react";
import "../styles/ModalStyles.css";

export default function ModalNewPublisher({ closeModalNewPublisher }) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    const createPublisher = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
    
        const formData = new FormData(event.currentTarget);
        const publisher = {
            name: formData.get("name")
        };
    
        try{
            const response = await fetch("http://localhost:8080/api/v1/publisher/insertPublisher", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(publisher)
            });
            if(response.ok){
                setSuccess("✅ Publisher created");
                //Timeout so the user has time to see the ok message
                setTimeout(() => {
                    //reload the page so the publishers' list is updated
                    window.location.reload();
                }, 1500);
            }
            else{
                const errorText = await response.text();
                if(errorText.length > 0){
                    setError("❌ Error creating publisher: " + errorText);
                }
                else{
                    setError("❌ Error creating publisher");
                }
            }
        }catch(error){
            setError("❌ Error creating publisher: " + error);
        }
    };
    return(

        <div className="modalBackground modal-backdrop position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
            <div className="modalContainer bg-white p-3 rounded shadow-lg">
                <div className="d-flex justify-content-between mb-3">
                    <div></div>
                    <h2>Add a new publisher</h2>
                    <button type="button" className="btn btn-danger d-flex justify-content-center align-items-center" id="exit" onClick={closeModalNewPublisher}>x</button>
                </div>
                
                <div>
                    <form onSubmit={createPublisher}>
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="name">Name</label>
                            <input className="textField form-control" id="name" name='name' type="text" minLength={1} required></input>
                        </div>                        
                        {error && <div className="text-danger mt-2">{error}</div>}
                        {success && <div className="text-success mt-2">{success}</div>}
                        <button className="btn btn-primary m-4" type="submit">Add publisher</button>
                    </form>
                </div>
                <div className="footer"></div>
            </div>
        </div>
    );
}
