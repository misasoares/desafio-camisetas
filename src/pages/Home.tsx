/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { create } from "../config/services/camiseta.service";
import "../style.css";
import frente from "../assets/camisetabrancafrente.png";

function Home() {
  const [camiseta, setCamiseta] = useState({
    nome: "",
    cor: "",
    modelo: "",
    estampaCostas: "",
    estampaFrontal: "",
    tags: "",
  });

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
          <div style={{position:"absolute"}}>
            <img className="estampa-frente" src={camiseta.estampaFrontal} alt="" />
          </div>
          <div style={{position:"absolute"}}>
            <img className="estampa-costas" src={camiseta.estampaCostas} alt="" />
          </div>
          <div className="tshirt-container2">
            <img className="tshirt-image" src={frente} alt="Descrição da imagem" style={{ maxWidth: "300px" }} />
            <img
              className="tshirt-image"
              src="https://cdn.discordapp.com/attachments/1073355866000085042/1163977934885892167/camisetabrancacostas.png?ex=654189ed&is=652f14ed&hm=b85eed856a95adf6e48190420d8bd10762c9c2be08e9ba57c9062bb72cc0a3b5&"
              alt="Descrição da imagem"
              style={{ maxWidth: "300px" }}
            />
          </div>
        </Box>

        <form>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"} paddingTop={"1rem"}>
            <TextField onChange={(e) => setCamiseta({ ...camiseta, nome: e.target.value })} id="nome" label="Nome" variant="outlined" />
            <TextField onChange={(e) => setCamiseta({ ...camiseta, cor: e.target.value })} id="cor" label="Cor" variant="outlined" type="color" />
            <TextField onChange={(e) => setCamiseta({ ...camiseta, modelo: e.target.value })} id="modelo" label="Modelo" variant="outlined"  />
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
