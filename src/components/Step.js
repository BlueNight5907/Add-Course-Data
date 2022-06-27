import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const Step = ({ data, index, deleteStep, updateStep }) => {
  return (
    <Stack gap={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">Step {index + 1}</Typography>
        <Button variant="outlined" color="error" onClick={deleteStep}>
          Xoá
        </Button>
      </Stack>
      <TextField
        required
        label="Tiêu đề*"
        value={data.title}
        onChange={(e) => {
          data.title = e.target.value;
          updateStep(data);
        }}
      />
      <TextField
        required
        multiline
        minRows={4}
        label="Nội dung*"
        value={data.content}
        onChange={(e) => {
          data.content = e.target.value;
          updateStep(data);
        }}
      />
      <TextField
        required
        label="Thời gian*"
        value={data.time}
        onChange={(e) => {
          data.time = e.target.value;
          updateStep(data);
        }}
        type="number"
      />
      <TextField
        required
        label="YoutubeURL*"
        value={data.url}
        onChange={(e) => {
          data.url = e.target.value;
          updateStep(data);
        }}
      />
    </Stack>
  );
};

export default Step;
