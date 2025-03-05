/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, TextField, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Camiseta from "../components/camiseta/Camiseta";
import DeleteIcon from "@mui/icons-material/Delete";

interface CamisetaDto {
  nome: string;
  cor: string;
  modelo: string;
  estampaCostas: string;
  estampaFrontal: string;
  tags: string;
}

function List() {
  const [expanded, setExpanded] = useState<{ [index: number]: boolean }>({});
  const [camisetas, setCamisetas] = useState<CamisetaDto[]>([]);
  const [showCamisetaCostas, setShowCamisetaCostas] = useState<{
    [index: number]: boolean;
  }>({});
  const [search, setSearch] = useState<string>("");
  const [filteredCamisetas, setFilteredCamisetas] = useState<CamisetaDto[]>([]);

  // Alterna a exibição da parte das costas
  function show(index: any) {
    setShowCamisetaCostas((prev: any) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  const handleExpandClick = (index: any) => {
    setExpanded((prev: any) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Remove o item da lista e atualiza o localStorage
  const removeCamiseta = (index: number) => {
    const updatedCamisetas = [...camisetas];
    updatedCamisetas.splice(index, 1);
    localStorage.setItem("camisetas", JSON.stringify(updatedCamisetas));
    setCamisetas(updatedCamisetas);

    // Atualiza também a lista filtrada conforme o search atual
    const updatedFiltered = updatedCamisetas.filter(
      (camiseta) =>
        camiseta.nome.toLowerCase().includes(search.toLowerCase()) ||
        camiseta.modelo.toLowerCase().includes(search.toLowerCase()) ||
        camiseta.tags.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCamisetas(updatedFiltered);
  };

  // Se houver resultados filtrados, exibe-os; caso contrário, exibe todas as camisetas.
  const listaExibida =
    filteredCamisetas.length > 0 ? filteredCamisetas : camisetas;

  useEffect(() => {
    const savedCamisetas = localStorage.getItem("camisetas");
    if (savedCamisetas) {
      setCamisetas(JSON.parse(savedCamisetas));
    }
  }, []);

  useEffect(() => {
    const searching = camisetas.filter((camiseta) => {
      return (
        camiseta.nome.toLowerCase().includes(search.toLowerCase()) ||
        camiseta.modelo.toLowerCase().includes(search.toLowerCase()) ||
        camiseta.tags.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredCamisetas(searching);
  }, [search, camisetas]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100vw"
    >
      <form>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="1rem"
        >
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            id="modelo"
            label="Search"
            variant="outlined"
          />
        </Box>
      </form>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={5}
        alignItems="center"
        justifyContent="center"
      >
        {listaExibida.map((camiseta, index) => (
          <Card
            key={index}
            onMouseEnter={() => show(index)}
            onMouseLeave={() => show(index)}
            onClick={() => handleExpandClick(index)}
            aria-expanded={expanded[index]}
            sx={{ width: 610 }}
          >
            <CardHeader
              title={camiseta.nome}
              subheader={camiseta.modelo}
              action={
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCamiseta(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
            <Box display="flex" justifyContent="center" padding="60px">
              <Camiseta
                cor={camiseta.cor}
                estampa={camiseta.estampaFrontal}
                tipo="frontal"
              />
              {showCamisetaCostas[index] && (
                <Camiseta
                  cor={camiseta.cor}
                  estampa={camiseta.estampaCostas}
                  tipo="costas"
                />
              )}
            </Box>
            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Color: {camiseta.cor}</Typography>
                <Typography paragraph>
                  Front Print: {camiseta.estampaFrontal}
                </Typography>
                <Typography paragraph>
                  Back Print: {camiseta.estampaCostas}
                </Typography>
                <Typography>Tags: {camiseta.tags}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default List;
