import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import { useDispatch } from "react-redux";
import mapboxgl from "mapbox-gl";
import { ThunkDispatch } from "Store";
import { mutateUser } from "Store/users/thinks";
import ExteriorClickWrapper from "Components/Util/ExteriorClickWrapper";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWRhbS16aHUiLCJhIjoiY2tjZHNzcGwyMDFuNzJ3cnFkNmRlMWc1ZyJ9.ouRBRpNS2ThQW6kuWgQb0w";

const UserDetailModal = ({
  user,
  closeHandler,
}: {
  user: any;
  closeHandler: any;
}) => {
  const [isModalShown, setShowModal] = useState(true);
  const transitions = useTransition(isModalShown, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const handleClose = () => {
    setShowModal(false);
    setTimeout(closeHandler, 400);
  };

  return (
    <div className="modal-background">
      <ExteriorClickWrapper exterior_click_handler={handleClose}>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <ModalContent user={user} closeHandler={handleClose} />
              </animated.div>
            )
        )}
      </ExteriorClickWrapper>
    </div>
  );
};

const ModalContent = ({
  user,
  closeHandler,
}: {
  user: any;
  closeHandler: any;
}) => {
  const { name, address, description, geolocation } = user;
  const [formState, setFormState] = useState({ name, address, description });
  const dispatch: ThunkDispatch = useDispatch();
  const handleFormFieldChange = (key: string) => (e: any) => {
    const { value } = e.target;

    setFormState((state) => ({ ...state, [key]: value }));
  };
  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      mutateUser({ user, updatedData: formState, callback: closeHandler })
    );
  };
  const mapContainerRef = useCallback(
    (node) => {
      if (node) {
        const map = new mapboxgl.Map({
          container: node,
          style: "mapbox://styles/mapbox/streets-v11",
          center: geolocation,
          zoom: 12,
        });
      }
    },
    [geolocation]
  );

  return (
    <div className="modal">
      <h1>Edit user</h1>

      <div className="content">
        <div className="map-container" ref={mapContainerRef} />

        <form onSubmit={formSubmitHandler}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name..."
              value={formState.name}
              onChange={handleFormFieldChange("name")}
            />
          </div>

          <div className="field">
            <label>Location</label>
            <input
              type="text"
              placeholder="Address..."
              value={formState.address}
              onChange={handleFormFieldChange("address")}
            />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              placeholder="Description..."
              value={formState.description}
              onChange={handleFormFieldChange("description")}
            />
          </div>

          <div className="buttons">
            <button type="submit">
              <span>SAVE</span>
            </button>
            <button onClick={closeHandler} className="secondary">
              <span>CANCEL</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailModal;
