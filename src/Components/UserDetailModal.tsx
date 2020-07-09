import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTransition, animated } from "react-spring";
import { useDispatch } from "react-redux";
import mapboxgl from "mapbox-gl";
import { State, ThunkDispatch } from "Store";
import { User } from "Store/users/reducer";
import { mutateUser } from "Store/users/thinks";
import ExteriorClickWrapper from "Components/Util/ExteriorClickWrapper";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWRhbS16aHUiLCJhIjoiY2tjZHNzcGwyMDFuNzJ3cnFkNmRlMWc1ZyJ9.ouRBRpNS2ThQW6kuWgQb0w";

const UserDetailModal = ({
  user,
  busy,
  closeHandler,
}: {
  user: User;
  busy: boolean;
  closeHandler: (event: React.MouseEvent<HTMLElement>) => void;
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
                <ModalContent
                  user={user}
                  closeHandler={handleClose}
                  busy={busy}
                />
              </animated.div>
            )
        )}
      </ExteriorClickWrapper>
    </div>
  );
};

const ModalContent = ({
  user,
  busy,
  closeHandler,
}: {
  user: User;
  busy: boolean;
  closeHandler: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  const { name, address, description, geolocation } = user;
  const [mapObj, setMapObj] = useState(undefined);
  const [formState, setFormState] = useState({ name, address, description });
  const dispatch: ThunkDispatch = useDispatch();
  const handleFormFieldChange = (key: string) => (e: any) => {
    const { value } = e.target;

    setFormState((state) => ({ ...state, [key]: value }));
  };
  const formSubmitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      mutateUser({
        user,
        updatedData: formState,
      })
    );
  };
  const mapContainerRef = useCallback(
    (node) => {
      if (node) {
        if (!mapObj) {
          const map = new mapboxgl.Map({
            container: node,
            style: "mapbox://styles/mapbox/streets-v11",
            center: geolocation,
            zoom: 12,
            interactive: false,
          });
          // @ts-ignore
          setMapObj(map);
        } else {
          // @ts-ignore
          mapObj.on("moveend", closeHandler);
          // @ts-ignore
          mapObj.flyTo({ center: geolocation, essential: true });
        }
      }
    },
    [geolocation]
  );

  return (
    <div className="modal">
      <h1>Edit user</h1>

      <div className="content">
        <div className="map-container" ref={mapContainerRef} />

        <form onSubmit={busy ? () => {} : formSubmitHandler}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name..."
              value={formState.name}
              onChange={handleFormFieldChange("name")}
              disabled={busy}
            />
          </div>

          <div className="field">
            <label>Location</label>
            <input
              type="text"
              placeholder="Address..."
              value={formState.address}
              onChange={handleFormFieldChange("address")}
              disabled={busy}
            />
          </div>

          <div className="field">
            <label>Description</label>
            <textarea
              placeholder="Description..."
              value={formState.description}
              onChange={handleFormFieldChange("description")}
              disabled={busy}
            />
          </div>

          <div className="buttons">
            <button type="submit" disabled={busy}>
              <span>SAVE</span>
            </button>
            <button
              onClick={closeHandler}
              className="secondary"
              disabled={busy}
            >
              <span>CANCEL</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailModal;
