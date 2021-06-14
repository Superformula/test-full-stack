import { ChangeEventHandler, memo } from 'react';

import { MapBoxStaticMap } from '../../components/MapBoxStaticMap';
import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/input';
import classes from './UserEditModal.module.scss';

interface UserEditModalProps {
  form: any;
  errorMessage?: string;
  loading: boolean;
  onCancelCLick: () => void;
  onSubmit: () => void;
  latitude?: number;
  longitude?: number;
  onInputChange: (name: string) => ChangeEventHandler;
}

function UserEditModalComponent(props: UserEditModalProps) {
  return (
    <div className={classes.userEditModal}>
      <h1>Edit user</h1>

      <div className={classes.userEditModal__content}>
        <MapBoxStaticMap
          latitude={props.latitude}
          longitude={props.longitude}
        />
        <form>
          <Input
            value={props.form.name}
            className={classes.userEditModal__content__input}
            onChange={props.onInputChange('name')}
            name={'name'}
            label={'Name'}
          />
          <Input
            value={props.form.address}
            className={classes.userEditModal__content__input}
            onChange={props.onInputChange('address')}
            name={'address'}
            label={'Address'}
          />
          <Input
            value={props.form.description}
            className={classes.userEditModal__content__input}
            onChange={props.onInputChange('description')}
            name={'description'}
            label={'Description'}
          />
        </form>
      </div>
      <div className={classes.userEditModal__errorMessage}>
        {props.errorMessage}
      </div>
      <div className={classes.userEditModal__footer}>
        <Button
          type={'submit'}
          onClick={props.onSubmit}
          disabled={props.loading}
        >
          {props.loading ? 'Saving ...' : 'Save'}
        </Button>
        <Button secondary type={'button'} onClick={props.onCancelCLick}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export const UserEditModal = memo(UserEditModalComponent);
