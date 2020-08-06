import { PrimaryButton } from 'components/button';
import {
  ButtonContainer,
  ContentContainer,
  EditUserContainer,
  EditUserContent,
  EditUserLabel,
  EditUserLabelContainer,
  InputContainer,
  MapContainer,
} from 'components/edit-user/styles';
import { ErrorDialog } from 'components/error-dialog';
import { Input } from 'components/input';
import { Loading } from 'components/loading';
import { Modal } from 'components/modal';
import { PinIcon } from 'components/pin-icon';
import { toErrorStr } from 'graphql/apollo-util';
import { User } from 'graphql/user-api/@types';
import { useUpdateUserMutation } from 'graphql/user-api/mutations/generated/userapi-mutations';
import { useDebounce } from 'hooks/use-debounce';
import { UseGeocodeResult, useGeolocation } from 'hooks/use-geolocation';
import { InteractiveMap, Marker } from 'react-map-gl';
import React, { useEffect, useState } from 'react';
import { Optional } from 'types';

// Mapbox token scoped to read map access
// TODO: Secure this
const READ_MAP_TOKEN =
  'pk.eyJ1IjoiYnNhbnRhcmUiLCJhIjoiY2tkOWllajAyMGwwbDJycG1vN3Fhd3JpcSJ9.WeBLLO7rUOghhyQO2fqUXA';

export interface EditUserProps {
  user: User;
  visible: boolean;
  onClose: (updatedUser?: User) => void;
}

const EditUserComponent: React.FC<EditUserProps> = ({
  user,
  visible,
  onClose,
}) => {
  const { geocodeAddress } = useGeolocation();

  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<Optional<string>>(undefined);
  const [newInputState, setNewInputState] = useState<User>({ ...user });
  const [geocoded, setGeocoded] = useState<Optional<UseGeocodeResult>>();

  const debouncedInputState = useDebounce(newInputState, 1000);

  const [updateUserMutation] = useUpdateUserMutation();

  const mutateState = async () => {
    setSaving(true);
    try {
      const res = await updateUserMutation({
        variables: {
          updateUserInput: {
            id: newInputState.id,
            name: newInputState?.name.trim(),
            dob: newInputState.dob,
            address: newInputState?.address.trim(),
            description: newInputState?.description.trim(),
          },
        },
      });

      // Verify result
      const updatedUser = res?.data?.updateUser;
      if (!updatedUser) {
        console.error('Error - updateUserMutation result is undefined');
        setErrorMessage('Error updating user');
      } else {
        //Success
        onClose(updatedUser);
      }
    } catch (e) {
      console.error(toErrorStr(e));
      setErrorMessage('Error updating user');
    } finally {
      setSaving(false);
    }
  };

  const handleNameChange = (newName: Optional<string>) => {
    if (newName) {
      setNewInputState({
        ...newInputState,
        name: newName,
      });
    }
  };

  const handleAddressChange = (newAddress: Optional<string>) => {
    if (newAddress) {
      setNewInputState({
        ...newInputState,
        address: newAddress,
      });
    }
  };

  const handleDescriptionChange = (newDescription: Optional<string>) => {
    if (newDescription) {
      setNewInputState({
        ...newInputState,
        description: newDescription,
      });
    }
  };

  /**
   * Geocode the address when input state changes
   */
  useEffect(() => {
    const asyncFn = async () => {
      try {
        return await geocodeAddress(debouncedInputState.address);
      } catch (e) {
        console.error(toErrorStr(e));
        setErrorMessage('Error geocoding address');
      }
    };
    asyncFn().then((res) => {
      if (res?.error) {
        setErrorMessage('Error geocoding address');
      }
      setGeocoded({
        latitude: res?.latitude && Number(res.latitude),
        longitude: res?.longitude && Number(res.longitude),
        error: res?.error,
      });
    });
    // eslint-disable-next-line
  }, [debouncedInputState.address]);

  // Determine if the input form is dirty
  const dirtyForm =
    user &&
    (newInputState?.name.trim() !== user.name ||
      newInputState?.address.trim() !== user.address ||
      newInputState?.description.trim() !== user.description);

  return (
    <>
      {/* Error dialog */}
      {errorMessage && (
        <ErrorDialog
          errorMessage={errorMessage}
          onDismiss={() => setErrorMessage(undefined)}
        />
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        {!errorMessage && (
          <EditUserContainer>
            <Modal width="1328px" height="725px" visible={visible}>
              <EditUserContent>
                <EditUserLabelContainer>
                  <EditUserLabel>Edit user</EditUserLabel>
                </EditUserLabelContainer>

                {/* Saving indicator */}
                <Loading visible={saving} message="Saving user..." />

                <ContentContainer>
                  <MapContainer>
                    {geocoded?.longitude && geocoded?.latitude && (
                      <InteractiveMap
                        mapStyle={'mapbox://styles/mapbox/streets-v11'}
                        width="518px"
                        height="336px"
                        mapboxApiAccessToken={READ_MAP_TOKEN}
                        zoom={6}
                        latitude={geocoded?.latitude}
                        longitude={geocoded?.longitude}
                        maxZoom={15}
                        minZoom={4}
                        style={{ zIndex: 1 }}
                      >
                        <Marker
                          latitude={geocoded?.latitude}
                          longitude={geocoded?.longitude}
                          offsetTop={-20}
                          offsetLeft={-10}
                        >
                          <PinIcon />
                        </Marker>
                      </InteractiveMap>
                    )}
                  </MapContainer>
                  <InputContainer>
                    <Input
                      name="name"
                      label="Name"
                      value={newInputState.name}
                      placeholder="Name..."
                      onChange={(newValue: Optional<string>) =>
                        handleNameChange(newValue)
                      }
                      width="611.5px"
                    />
                    <Input
                      name="address"
                      label="Address"
                      value={newInputState.address}
                      placeholder="Address..."
                      onChange={(newValue: Optional<string>) =>
                        handleAddressChange(newValue)
                      }
                      width="611.5px"
                    />
                    <Input
                      name="description"
                      label="Description"
                      value={newInputState.description}
                      placeholder="Description..."
                      onChange={(newValue: Optional<string>) =>
                        handleDescriptionChange(newValue)
                      }
                      width="611.5px"
                    />
                  </InputContainer>
                </ContentContainer>
                <ButtonContainer>
                  <PrimaryButton
                    disabled={!dirtyForm}
                    onClick={() => mutateState()}
                  >
                    Save
                  </PrimaryButton>
                  <PrimaryButton onClick={() => onClose()}>
                    Cancel
                  </PrimaryButton>
                </ButtonContainer>
              </EditUserContent>
            </Modal>
          </EditUserContainer>
        )}
      </form>
    </>
  );
};

export const EditUser = EditUserComponent;
