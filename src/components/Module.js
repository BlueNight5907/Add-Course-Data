import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import Step from "./Step";

const Module = (props) => {
  const { data, deleteModule, updateModule } = props;
  const [view, setView] = React.useState(true);
  const addStep = () => {
    data.steps.push({
      title: "",
      type: "lesson",
      resourceType: "youtube",
      time: 480000,
      url: "",
      content: "",
    });
    updateModule(data);
  };

  const updateStep = (stepIndex) => (step) => {
    data.steps[stepIndex] = step;
    updateModule(data);
  };

  const deleteStep = (stepIndex) => () => {
    data.steps.splice(stepIndex, 1);
    updateModule(data);
  };

  return (
    <Paper sx={{ p: 1 }} elevation={5}>
      <Stack direction="row" gap={4}>
        <Button
          variant="contained"
          color="error"
          sx={{ mb: 2 }}
          onClick={deleteModule}
        >
          Xóa
        </Button>

        <Button
          variant={view ? "contained" : "outlined"}
          color="success"
          sx={{ mb: 2 }}
          onClick={() => setView((s) => !s)}
        >
          Xem chi tiết
        </Button>
      </Stack>
      <Stack gap={2}>
        <TextField
          required
          label="Tiêu đề*"
          value={data.title}
          onChange={(e) => {
            data.title = e.target.value;
            updateModule(data);
          }}
        />
        <Stack direction="row" textAlign="left" gap={2} alignItems="center">
          <Typography variant="body1">
            Số lượng bài học: {data.steps.length}
          </Typography>
          {view && (
            <Button variant="outlined" onClick={addStep}>
              Thêm step
            </Button>
          )}
        </Stack>
        {view && (
          <Stack gap={4}>
            {data.steps.map((item, stepIndex) => (
              <Step
                key={stepIndex}
                index={stepIndex}
                data={item}
                updateStep={updateStep(stepIndex)}
                deleteStep={deleteStep(stepIndex)}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default Module;
