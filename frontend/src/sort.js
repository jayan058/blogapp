import React from "react";
function Sort(){
    return(
        <div className="sort">
        <label htmlFor="sortoptions">Filter By:</label>
        <select name="sortoptions" id="sortoptions" className="options">
        <option value="Author" className="options">Authors</option>
        <option value="Category" className="options">Category</option>
        </select>
        </div>
    )
}
export default Sort;