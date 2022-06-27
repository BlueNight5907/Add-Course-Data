import React from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Collapse,
  Container,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Module from "./Module";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const tags = [
  {
    name: "ReactJS",
  },
  {
    name: "ExpressJS",
  },
  {
    name: "NestJS",
  },
  {
    name: "VueJS",
  },
  {
    name: "Angular",
  },
  {
    name: "OOP",
  },
  {
    name: "Python",
  },
  {
    name: "Java",
  },
  {
    name: "JavaScript",
  },
  {
    name: "C#",
  },
  {
    name: ".Net Core",
  },
  {
    name: "Golang",
  },
  {
    name: "Web",
  },
  {
    name: "WebAPI",
  },
  {
    name: "Web Service",
  },
  {
    name: "AI",
  },
  {
    name: "Data",
  },
  {
    name: "Xử lý ảnh",
  },
  {
    name: "PHP",
  },
  {
    name: "Unreal Engine 4",
  },
  {
    name: "Unity",
  },
  {
    name: "Design",
  },
  {
    name: "Android",
  },
  {
    name: "React Native",
  },
  {
    name: "Flutter",
  },
];
const levels = ["Mới bắt đầu", "Cơ bản", "Nâng cao"];
const categories = [
  {
    name: "Front-end",
    urlPath: "frontend",
  },
  {
    name: "Back-end",
    urlPath: "backend",
  },
  {
    name: "Lập trình cơ bản",
    urlPath: "common-course",
  },
  {
    name: "UX/UI",
    urlPath: "ux-ui",
  },
  {
    name: "Cơ sở dữ liệu",
    urlPath: "database",
  },
  {
    name: "Cấu trúc dữ liệu",
    urlPath: "data-structure",
  },
  {
    name: "Trí tuệ nhân tạo",
    urlPath: "ai",
  },
  {
    name: "Khoa học dữ liệu",
    urlPath: "data-science",
  },
  {
    name: "Quản trị hệ thống",
    urlPath: "system-managenent",
  },
  {
    name: "Bảo mật",
    urlPath: "security",
  },
  {
    name: "Game",
    urlPath: "game",
  },
  {
    name: "Mobile",
    urlPath: "mobile",
  },
];
const Page = () => {
  const [tag, setTag] = React.useState([]);
  const [data, setData] = React.useState({
    title: "",
    shortDesc: "",
    content: "",
    background: "",
    categoryPath: "frontend",
    level: "Mới bắt đầu",
  });
  const [gains, setGains] = React.useState([]);
  const [modules, setModules] = React.useState([]);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isFetch, setIsFetch] = React.useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const deleteModule = (index) => () => {
    modules.splice(index, 1);
    setModules([...modules]);
  };

  const updateModule = (index) => (data) => {
    modules[index] = data;
    setModules([...modules]);
  };

  const submit = () => {
    const course = { ...data, tags: tag, gains, modules };
    setIsFetch(true);
    axios
      .post("http://localhost:8080/add-data", course)
      .then(({ data }) => {
        if (data.result) {
          setSuccess(true);
          setError(null);
          setTimeout(() => setSuccess(false), 3000);
        }
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsFetch(false);
      });
  };

  const clearData = () => {
    setData({
      title: "",
      shortDesc: "",
      content: "",
      background: "",
      categoryPath: "frontend",
      level: "Mới bắt đầu",
    });
    setTag([]);
    setGains([]);
    setModules([]);
  };

  return (
    <Box p={2}>
      <Container>
        <form>
          <Typography variant="h5" gutterBottom>
            Thông tin khóa học
          </Typography>
          <Stack my={3} gap={2} textAlign="left">
            <TextField
              required
              label="Tiêu đề*"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <TextField
              required
              label="Background URL*"
              value={data.background}
              onChange={(e) => setData({ ...data, background: e.target.value })}
            />
            <TextField
              required
              label="Mô tả ngắn về khóa học*"
              value={data.shortDesc}
              onChange={(e) => setData({ ...data, shortDesc: e.target.value })}
            />
            <TextField
              required
              multiline
              minRows={4}
              label="Nội dung*"
              value={data.content}
              onChange={(e) => setData({ ...data, content: e.target.value })}
            />
            <Stack direction="row" gap={2}>
              <TextField
                sx={{ flexGrow: 1 }}
                required
                select
                label="Level*"
                value={data.level}
                onChange={(e) => setData({ ...data, level: e.target.value })}
              >
                {levels.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                sx={{ flexGrow: 1 }}
                required
                select
                label="Category*"
                value={data.categoryPath}
                onChange={(e) =>
                  setData({ ...data, categoryPath: e.target.value })
                }
              >
                {categories.map((item, index) => (
                  <MenuItem value={item.urlPath} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>

              <FormControl sx={{ flexGrow: 1 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tags</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={tag}
                  onChange={handleChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  {tags.map(({ name }) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={tag.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack gap={2}>
              <Stack
                direction="row"
                textAlign="left"
                gap={2}
                alignItems="center"
              >
                <Typography variant="body1">Kết quả đạt được</Typography>
                <Button
                  variant="contained"
                  onClick={() => setGains([...gains, ""])}
                >
                  Thêm
                </Button>
              </Stack>
              {gains.map((item, index) => (
                <Stack direction="row" gap={2}>
                  <OutlinedInput
                    key={index}
                    sx={{ flexGrow: 1 }}
                    value={item}
                    onChange={(e) => {
                      gains[index] = e.target.value;
                      setGains([...gains]);
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      gains.splice(index, 1);
                      setGains([...gains]);
                    }}
                  >
                    Xóa
                  </Button>
                </Stack>
              ))}
            </Stack>

            <Stack gap={2}>
              <Stack
                direction="row"
                textAlign="left"
                gap={2}
                alignItems="center"
              >
                <Typography variant="body1">Modules</Typography>
              </Stack>
              {modules.map((item, index) => (
                <Module
                  key={index}
                  index={index}
                  data={item}
                  deleteModule={deleteModule(index)}
                  updateModule={updateModule(index)}
                />
              ))}
              <Stack
                direction="row"
                textAlign="left"
                gap={2}
                alignItems="center"
              >
                <Button
                  variant="contained"
                  onClick={() =>
                    setModules([
                      ...modules,
                      {
                        title: "",
                        steps: [],
                      },
                    ])
                  }
                >
                  Thêm Modules
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
        <Collapse in={success}>
          <Alert severity="success" sx={{ my: 3 }} variant="filled">
            Thêm dữ liệu khóa học thành công
          </Alert>
        </Collapse>
        <Collapse in={!!error}>
          <Alert severity="error" sx={{ my: 3 }} variant="filled">
            {error?.message}
          </Alert>
        </Collapse>
        <Stack direction="row" justifyContent="center" gap={2}>
          <Button onClick={clearData} disabled={isFetch}>
            Clear Data
          </Button>
          <Button variant="contained" onClick={submit} disabled={isFetch}>
            Submit Data
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Page;
