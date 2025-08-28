import React from "react";
import "../styles/ModalStyles.css";

export default function ModalNewGenre({ closeModalNewGenre }) {
    return(

        <div className="modalBackground modal-backdrop position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
            <div className="modalContainer bg-white p-3 rounded shadow-lg">
                <div className="d-flex justify-content-between mb-3">
                    <div></div>
                    <h2>Add a new genre</h2>
                    <button type="button" className="btn btn-danger d-flex justify-content-center align-items-center" id="exit" onClick={closeModalNewGenre}>x</button>
                </div>
                
                <div>
                    <form>
                        <div className="d-flex align-items-center gap-2">
                            <label htmlFor="firstname">Name</label>
                            <input className="textField form-control" id="firstname" name='firstname' type="text" minLength={1} required></input>
                        </div>                        
                        <button className="btn btn-primary m-4">Add genre</button>
                    </form>
                </div>
                <div className="footer"></div>
            </div>
        </div>
    );
}
