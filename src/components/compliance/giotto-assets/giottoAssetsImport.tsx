import { Box, Button, Chip, Divider, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import DashboardCard from "src/components/shared/DashboardCard";
import { uploadAssets } from "src/store/sections/compliance/giotoAssetsSlice";
import { useDispatch, useSelector } from "src/store/Store";

const GiottoAssetsImport: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error } = useSelector((state: any) => state.GiottoAssetsReducer);
  const dispatch = useDispatch();
  const [myFiles, setMyFiles] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }
    , [error]);

  const onDrop = useCallback(acceptedFiles => {
    setMyFiles([...acceptedFiles])
  }, [myFiles])

  const uploadFile = (files: FileList) => {
    dispatch(uploadAssets(files));
    navigate('/compliance/assets');
  }

  const { getRootProps, getInputProps } = useDropzone(
    {
      onDrop,
      accept: {
        "text/plain": [".csv"],
        "application/vnd.ms-excel": [".csv"],
      },
      maxFiles: 1
    });

  const removeFile = () => {
    setMyFiles([]);
  }

  const files = myFiles.map((file: File, i) => (
    <Box
      key={i}
      display="flex"
      alignItems="center"
      py={1}
      mt={2}
      sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
      justifyContent="space-between"
    >

      <Typography variant="body1" fontWeight="500">
        {file.name}{" "}
      </Typography>
      <Chip color="primary" label={`${file.size} Bytes`} />
      {/*remove file*/}
      <Chip
        label="Remove"
        color="error"
        onClick={() => removeFile()} />
    </Box>
  ));

  return (
    <Box sx={{ p: 3 }}>
      <DashboardCard title="Import Giotto Assets">

        {/*file drop zone*/}
        <Box >
          <Box sx={{ p: 3 }}>

            <Box
              mt={3}
              fontSize="12px"
              sx={{
                backgroundColor: "white",
                color: "primary.main",
                padding: "30px",
                textAlign: "center",
                border: `1px dashed`,
                borderColor: "primary.main",
              }}
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} />
              <p>{"Select File"}</p>
            </Box>
            <Box mt={2}>
              <Typography variant="h6" fontSize="15px">
                {"Selected File"}
              </Typography>
              <Typography variant="body1">{files}</Typography>
            </Box>
          </Box>
          {
            myFiles.length > 0 && <Divider />
          }
          {
            myFiles.length > 0 && <Box sx={{ p: 3, display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => uploadFile(myFiles)}
              >
                {"Upload"}
              </Button>
            </Box>
          }

        </Box>

      </DashboardCard>
    </Box>
  );
};

export default GiottoAssetsImport;