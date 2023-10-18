/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { create } from "../config/services/camiseta.service";
import "../style.css";
import styled from "styled-components";

function Home() {
  const [backgroundColor, setBackgroundColor] = useState("#fffffff");
console.log(backgroundColor)

  const [camiseta, setCamiseta] = useState({
    nome: "",
    cor: "",
    modelo: "",
    estampaCostas: "",
    estampaFrontal: "",
    tags: "",
  });

  const ChangeColorStyled = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${backgroundColor}; 
    mix-blend-mode: multiply;
  `;

  const handleSubmit = async () => {
    {
      JSON.stringify(camiseta);
    }

    const resposta = await create(camiseta);

    console.log(resposta);
  };

  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"}>
      {JSON.stringify(camiseta)}
      <h1 style={{ fontFamily: "sans-serif" }}>Criando camiseta</h1>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Box style={{ border: "solid 1px gray", borderRadius: "10px" }} display={"flex"} justifyContent={"center"} alignItems={"center"} padding={"3rem"} gap={5}>
          <div style={{ position: "absolute" }}>
            <img className="estampa-frente" src={camiseta.estampaFrontal} alt="" />
          </div>
          <div style={{ position: "absolute" }}>
            <img className="estampa-costas" src={camiseta.estampaCostas} alt="" />
          </div>

          <div className="tshirt-container">
            <ChangeColorStyled className="color-overlay"></ChangeColorStyled>
          </div>

          <div className="tshirt-container costas">
            <ChangeColorStyled className="color-overlay"></ChangeColorStyled>
          </div>
        </Box>

        <form>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"} paddingTop={"1rem"}>
            <TextField onChange={(e) => setCamiseta({ ...camiseta, nome: e.target.value })} id="nome" label="Nome" variant="outlined" />
            <TextField
              onChange={(e) => {
                setCamiseta({ ...camiseta, cor: e.target.value });
                setBackgroundColor(e.target.value);
              }}
              id="cor"
              label="Cor"
              variant="outlined"
              type="color"
            />

            <TextField onChange={(e) => setCamiseta({ ...camiseta, modelo: e.target.value })} id="modelo" label="Modelo" variant="outlined" />
            <TextField onChange={(e) => setCamiseta({ ...camiseta, estampaFrontal: e.target.value })} id="estampaFrontal" label="Estampa frontal" variant="outlined" />
            <TextField onChange={(e) => setCamiseta({ ...camiseta, estampaCostas: e.target.value })} id="estampaCostas" label="Estampa costas" variant="outlined" />
            <TextField onChange={(e) => setCamiseta({ ...camiseta, tags: e.target.value })} id="tags" label="Tags" variant="outlined" />
            <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>
              Enviar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Home;
