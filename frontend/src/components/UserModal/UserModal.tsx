import React, { useCallback, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import mapboxgl from 'mapbox-gl';
import { gql, useLazyQuery } from '@apollo/client';
import { debounce } from 'lodash';

import styles from './UserModal.module.scss';
import { User } from '../../types';
import Button from '../Button/Button';
import Input from '../Input/Input';

const GET_LOCATION = gql`
  query GetLocation($address: String!) {
    getLocation(address: $address) {
      coordinates
    }
  }
`;

type Props = {
  user?: User;
  onClose: () => void;
  onSave: (user: User) => void;
};

type LocationResponse = {
  getLocation: {
    coordinates?: [number, number];
  };
};

const GET_LOCATION_DEBOUNCE_TIME = 500;

const UserModal: React.FC<Props> = ({ user, onClose, onSave }) => {
  const [userInModal, setUserInModal] = useState<User>({
    id: '',
    name: '',
  });
  const mapRef = useRef<HTMLDivElement>(null);
  const [getLocation, { data: location }] = useLazyQuery<LocationResponse>(
    GET_LOCATION,
  );

  const handleUserPropertyUpdate = (property: string, newValue: string) => {
    setUserInModal({
      ...userInModal,
      [property]: newValue,
    });
  };

  const addressChangeHandler = useCallback(
    debounce((address?: string) => {
      if (address) {
        getLocation({ variables: { address } });
      }
    }, GET_LOCATION_DEBOUNCE_TIME),
    [],
  );

  useEffect(() => {
    const newUser = user || userInModal;
    setUserInModal(newUser);
    addressChangeHandler(newUser.address);
  }, [JSON.stringify(user)]);

  useEffect(() => {
    const { coordinates } = location?.getLocation || { coordinates: null };
    if (coordinates) {
      const map = new mapboxgl.Map({
        container: mapRef.current || '',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 10,
      });
      new mapboxgl.Marker().setLngLat(coordinates).addTo(map);
    }
  }, [JSON.stringify(location)]);

  return (
    <div
      className={classnames({
        [styles.modal]: true,
        [styles['modal--in']]: user,
        [styles['modal--out']]: userInModal.id && !user,
      })}
    >
      <div
        className={styles.backdrop}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
          event.target === event.currentTarget && onClose()
        }
      >
        <div className={styles.content}>
          <div className={styles.header}>Edit user</div>
          <form
            className={styles.form}
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              onSave(userInModal);
            }}
          >
            <div className={styles.map} ref={mapRef}>
              {!userInModal.address && (
                <div className={styles.emptyMap}>No Location Entered</div>
              )}
            </div>
            <div className={styles.rightPanel}>
              <Input
                id="name"
                label="Name"
                value={userInModal.name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleUserPropertyUpdate('name', event.target.value)
                }
              />
              <Input
                id="address"
                label="Address"
                value={userInModal.address}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleUserPropertyUpdate('address', event.target.value);
                  addressChangeHandler(event.target.value);
                }}
              />
              <Input
                id="description"
                label="Description"
                value={userInModal.description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleUserPropertyUpdate('description', event.target.value)
                }
              />
              <div className={styles.buttons}>
                <Button type="submit" variant="primary">
                  Save
                </Button>
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
