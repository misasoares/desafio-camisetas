/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { CamisetaDto, listAll } from "../config/services/camiseta.service";
import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import CamisetaFrontal from "../components/camiseta/CamisetaFrontal";
import CamisetaCostas from "../components/camiseta/CamisetaCostas";
import SendIcon from "@mui/icons-material/Send";


function List() {
  const [expanded, setExpanded] = useState<{ [index: number]: boolean }>({});
  const [camisetas, setCamisetas] = useState<CamisetaDto[]>([]);
  const [showCamisetaCostas, setShowCamisetaCostas] = useState<{ [index: number]: boolean }>({});
  const [search, setSearch] = useState<string>('');
  const [filteredCamisetas, setFilteredCamisetas] = useState<CamisetaDto[]>([]);

  useEffect(() => {
    async function buscaDados() {
      const resposta = await listAll();
      setCamisetas(resposta);
    }
console.log('-----')
    buscaDados();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  
    const searching = camisetas.filter(camiseta => {
      // Verifique se a string de pesquisa está incluída no nome, modelo ou tags.
      return (
        camiseta.nome.includes(search) ||
        camiseta.modelo.includes(search) ||
        camiseta.tags.includes(search)
      );
    });
    console.log(searching)
  if(searching.length === 0){
    alert("Não temos nenhuma camiseta com essa referencia.")
    setFilteredCamisetas(searching)
  }
    setFilteredCamisetas(searching);
  };
  
  function show(index: any) {
    setShowCamisetaCostas((prevCamiseta: any) => {
      console.log(prevCamiseta, [index]);
      return {
        ...prevCamiseta,
        [index]: !prevCamiseta[index],
      };
    });
  }

  const handleExpandClick = (index: any) => {
    setExpanded((prevExpanded: any) => {
      return {
        ...prevExpanded,
        [index]: !prevExpanded[index],
      };
    });
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} width={"100vw"}>
      <form>
        
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} padding={"1rem"}>
            <div >
              
            <TextField onChange={(e) => setSearch(e.target.value)} size="small"  id="modelo" label="Search" variant="outlined" />
            </div>
            <div style={{paddingLeft:'10px'}} >
            <Button onClick={handleSubmit} size="medium" variant="contained" endIcon={<SendIcon />}>
              Search
            </Button>
            
            </div>
          </Box>


      </form>
      {/* se filteredCamisetas for maior que zero, else: */}
      <Box display={"flex"} flexWrap={"wrap"} gap={5} alignItems={"center"} justifyContent={"center"}>
        {filteredCamisetas.length > 0 ?   filteredCamisetas.map((camiseta, index) => (
          <Card onMouseEnter={() => show(index)} onMouseLeave={() => show(index)} onClick={() => handleExpandClick(index)} aria-expanded={expanded[index]} key={index} sx={{ width: 610 }}>
            <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
              <CamisetaFrontal cor={camiseta.cor} estampaFrontal={camiseta.estampaFrontal}></CamisetaFrontal>
              {showCamisetaCostas[index] && <CamisetaCostas cor={camiseta.cor} estampaFrontal={camiseta.estampaCostas} />}
            </div>

            <CardHeader title={camiseta.nome} subheader={camiseta.modelo} />

            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Detalhes:</Typography>
                <Typography paragraph>{camiseta.cor}</Typography>
                <Typography paragraph>{camiseta.estampaFrontal}</Typography>
                <Typography paragraph>{camiseta.estampaCostas}</Typography>
                <Typography>{camiseta.tags}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))  : camisetas.map((camiseta, index) => (
          <Card onMouseEnter={() => show(index)} onMouseLeave={() => show(index)} onClick={() => handleExpandClick(index)} aria-expanded={expanded[index]} key={index} sx={{ width: 610 }}>
            <div style={{ display: "flex", justifyContent: "center", padding: "60px" }}>
              <CamisetaFrontal cor={camiseta.cor} estampaFrontal={camiseta.estampaFrontal}></CamisetaFrontal>
              {showCamisetaCostas[index] && <CamisetaCostas cor={camiseta.cor} estampaFrontal={camiseta.estampaCostas} />}
            </div>

            <CardHeader title={camiseta.nome} subheader={camiseta.modelo} />

            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Detalhes:</Typography>
                <Typography paragraph>{camiseta.cor}</Typography>
                <Typography paragraph>{camiseta.estampaFrontal}</Typography>
                <Typography paragraph>{camiseta.estampaCostas}</Typography>
                <Typography>{camiseta.tags}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        )) }
      </Box>
    </Box>
  );
}


export default List;
