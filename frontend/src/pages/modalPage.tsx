import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: string) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(task);
    onClose(); // Close the modal after submitting
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Task"
            type="text"
            fullWidth
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type='submit'>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
