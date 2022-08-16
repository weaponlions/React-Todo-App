import React from "react";


export default function NotesItem(props) {
  return (
    <div>
      <div className="card m-3" style={{ 'width': '70rem', 'backgroundColor': 'hsl(0deg 0% 96%)' }}>
        <div className="card-body">
          <div className="d-flex justify-content-between border-bottom pb-2">
            <div className="title">
              <h5 className="card-title ">{props.title}</h5>
            </div>
            <div className="opt">
              <div
                className="btn m-2 btn-primary"
                onClick={() => props.handleEdit(props.note)}
              >
                Edit
              </div>
              <div
                onClick={() => {
                  props.handleClickDelete(props.id);
                }}
                className="btn m-2 btn-primary"
              >
                Delete
              </div>
            </div>
          </div>
          <div className="tag">Tag : {props.tag}</div>
          <br />
          <pre className="card-text">{props.description}</pre>
        </div>
      </div>
    </div>
  );
}
