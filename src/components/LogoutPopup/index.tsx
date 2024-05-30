import React, { ReactElement } from "react";
import Popup from "reactjs-popup";

const MyComponent: React.FC = (): ReactElement => {
  // Define the content of the modal as a ReactNode
  const modalContent = (
    <div className="modal">
      <button className="close" onClick={close}>
        &times;
      </button>
      <div className="header"> Modal Title </div>
      <div className="content">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
        nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam
        voluptates delectus doloremque, explicabo tempore dicta adipisci fugit
        amet dignissimos?
        <br />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
        sit commodi beatae optio voluptatum sed eius cumque, delectus saepe
        repudiandae explicabo nemo nam libero ad, doloribus, voluptas rem alias.
        Vitae?
      </div>
      <div className="actions">
        <Popup
          trigger={<button className="button"> Trigger </button>}
          position="top center"
          nested
        >
          <span>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            magni omnis delectus nemo, maxime molestiae dolorem numquam
            mollitia, voluptate ea, accusamus excepturi deleniti ratione
            sapiente! Laudantium, aperiam doloribus. Odit, aut.
          </span>
        </Popup>
        <button
          className="button"
          onClick={(): void => {
            console.log("modal closed ");
            // close();
          }}
        >
          close modal
        </button>
      </div>
    </div>
  );

  return (
    <Popup
      trigger={<button className="button"> Open Modal </button>}
      modal
      nested
    >
      {modalContent} {/* Use the modal content as children of the Popup */}
    </Popup>
  );
};

export default MyComponent;
