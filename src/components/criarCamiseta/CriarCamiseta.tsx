import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import "../../style.css";

import Camiseta from "../camiseta/Camiseta";

function CriarCamiseta() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const [camiseta, setCamiseta] = useState({
    nome: "",
    cor: "",
    modelo: "",
    estampaCostas: "",
    estampaFrontal: "",
    tags: "",
  });

  const handleSubmit = async () => {
    const savedCamisetas = localStorage.getItem("camisetas");
    const camisetasArray = savedCamisetas ? JSON.parse(savedCamisetas) : [];
    camisetasArray.push(camiseta);
    localStorage.setItem("camisetas", JSON.stringify(camisetasArray));
    console.log("Camiseta salva:", camiseta);
  };

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: "1rem" }}
    >
      <Grid item xs={12} sm={10} md={8}>
        <Box
          sx={{
            border: "1px solid gray",
            borderRadius: "10px",
            p: 3,
            width: "100%",
            maxWidth: "900px",
            mx: "auto",
          }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <Camiseta
                cor={backgroundColor}
                estampa={camiseta.estampaFrontal}
                tipo="frontal"
                isCreating
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Camiseta
                cor={backgroundColor}
                estampa={camiseta.estampaCostas}
                tipo="costas"
                isCreating
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid item xs={12} sm={10} md={8}>
        <Box component="form" noValidate autoComplete="off">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  setCamiseta({ ...camiseta, nome: e.target.value })
                }
                id="nome"
                label="Name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => {
                  setCamiseta({ ...camiseta, cor: e.target.value });
                  setBackgroundColor(e.target.value);
                }}
                id="cor"
                label="Color"
                variant="outlined"
                type="color"
                fullWidth
                defaultValue="#ffffff"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  setCamiseta({ ...camiseta, modelo: e.target.value })
                }
                id="modelo"
                label="Model"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  setCamiseta({ ...camiseta, estampaFrontal: e.target.value })
                }
                id="estampaFrontal"
                label="Front Print"
                placeholder="URL"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  setCamiseta({ ...camiseta, estampaCostas: e.target.value })
                }
                id="estampaCostas"
                label="Back Print"
                placeholder="URL"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) =>
                  setCamiseta({ ...camiseta, tags: e.target.value })
                }
                id="tags"
                label="Tags"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ textAlign: "center", marginTop: "1rem" }}
            >
              <Button
                onClick={handleSubmit}
                variant="contained"
                endIcon={<SaveAltIcon />}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CriarCamiseta;
