import React, {useState} from "react";
import "../styles/ModalStyles.css";

export default function ModalNewAuthor({ closeModalNewAuthor }) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const createAuthor = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        const formData = new FormData(event.currentTarget);
        const author = {
        firstName: formData.get("firstname"),
        lastName: formData.get("lastname"),
        };

        try{
            const response = await fetch("http://localhost:8080/api/v1/author/insertAuthor", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(author)
            });
            if(response.ok){
                setSuccess("✅ Author created");
                //Timeout so the user has time to see the ok message
                setTimeout(() => {
                    //reload the page so the author's list is updated
                    window.location.reload();
                }, 1500);
            }
            else{
                const errorText = await response.text();
                if(errorText.length > 0){
                    setError("❌ Error creating author: " + errorText);
                }
                else{
                    setError("❌ Error creating author");
                }
            }
        }catch(error){
            setError("❌ Error creating author: " + error);
        }
    };
    return(

        <div className="modalBackground modal-backdrop position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
            <div className="modalContainer bg-white p-3 rounded shadow-lg">
                <div className="d-flex justify-content-between mb-3">
                    <div></div>
                    <h2>Add a new author</h2>
                    <button type="button" className="btn btn-danger d-flex justify-content-center align-items-center" id="exit" onClick={closeModalNewAuthor}>x</button>
                </div>
                
                <div>
                    <form onSubmit={createAuthor}>
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="firstname">First name</label>
                            <input className="textField form-control" id="firstname" name='firstname' type="text" minLength={1} required></input>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <label htmlFor="lastname">Last name</label>
                            <input className="textField" id="lastname" name="lastname" type="text" minLength={1} required></input>
                        </div>
                        
                        {error && <div className="text-danger mt-2">{error}</div>}
                        {success && <div className="text-success mt-2">{success}</div>}
                        <button className="btn btn-primary m-4" type="submit">Add author</button>
                    </form>
                </div>
                <div className="footer"></div>
            </div>
        </div>
    );
}
