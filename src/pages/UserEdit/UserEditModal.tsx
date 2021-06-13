import { memo } from 'react';
import classes from './UserEditModal.module.scss';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/Button';
import { User } from '../../generated/graphql';

interface UserEditModalProps {
  user: User;
  onCancelCLick: () => void;
}
function UserEditModalComponent(props: UserEditModalProps) {
  return (
    <div className={classes.element}>
      <h1>Edit user</h1>

      <div className={classes.content}>
        <div>MAP</div>
        <form>
          <Input name={'name'} label={'Name'} />
          <Input name={'address'} label={'Address'} />
          <Input name={'description'} label={'Description'} />
        </form>
      </div>

      <div className={classes.footer}>
        <Button>Save</Button>
        <Button secondary onClick={props.onCancelCLick}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export const UserEditModal = memo(UserEditModalComponent);
