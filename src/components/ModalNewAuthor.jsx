import React from "react";
import "../styles/ModalStyles.css";

function ModalNewAuthor({closeModalNewAuthor}) {
    return(

        <div className="modalBackground modal-backdrop position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
            <div className="modalContainer bg-white p-3 rounded shadow-lg">
                <div className="d-flex justify-content-between mb-3">
                    <div></div>
                    <h2>Add a new author</h2>
                    <button type="button" className="btn btn-danger d-flex justify-content-center align-items-center" id="exit" onClick={() => closeModalNewAuthor(false)}>x</button>
                </div>
                
                <div className="body">
                    <form>
                        <div className="d-flex justify-content-between">
                            <label htmlFor="firstname">First name</label>
                            <input className="textField" id="firstname" name='firstname' type="text" minLength={1} required></input>
                        </div>
                        <div className="d-flex justify-content-between mt-1">
                            <label htmlFor="lastname">Last name</label>
                            <input className="textField" id="lastname" name="lastname" type="text" minLength={1} required></input>
                        </div>
                        
                        <button className="btn btn-primary m-4">Add author</button>
                    </form>
                </div>
                <div className="footer"></div>
            </div>
        </div>
    );
}

export default ModalNewAuthor;