import React from "react";

function Create() {
  return (
    <div className="create">
      <h1>Create new activity</h1>
      <form>
        <div className="input-group">
          <label>
            <select className="input-form" name="category" id="category" >
              <option value="" disabled selected>Choose activity category...</option>
              <option value="sports">Sports</option>
              <option value="cooking">Cooking</option>
            </select>
          </label>
        </div>
        <div className="input-group">
          <label>
            Activity Title
            <input
              type="text"
              className="input-form"
              name="title"
              id="title"
              maxLength="60"
              placeholder="Type Title..."
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Activity Description
            <textarea
              className="input-form"
              name="description"
              id="description"
              maxLength="5"
              placeholder="Type Description..."
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Select Date
            <input type="date" name="date" id="date" />
          </label>
        </div>
        <div className="input-group">
          <label>
            Select Time
            <input type="time" name="time" id="time" min="04:00" max="23:00" />
          </label>
        </div>
        <div className="input-group">
          <label>
            Number of People
            <input type="number" name="people" id="people" />
          </label>
        </div>
        <input type="submit" value="create" />
      </form>
    </div>
  );
}

export default Create;
