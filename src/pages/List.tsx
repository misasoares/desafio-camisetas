/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CamisetaDto, listAll } from "../config/services/camiseta.service";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";

function List() {
  const [backgroundColor, setBackgroundColor] = useState("#fffffff");
  const [expanded, setExpanded] = useState(false);
  const [camisetas, setCamisetas] = useState<CamisetaDto[]>([]);

  const ChangeColorStyled = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${backgroundColor};
    mix-blend-mode: multiply;
  `;

  useEffect(() => {
    async function buscaDados() {
      const resposta = await listAll();
      setCamisetas(resposta);
    }

    buscaDados();
  }, []);

  const handleExpandClick = (index: any) => {
    setExpanded((prevExpanded: any) => {
      console.log(prevExpanded);
      return {
        ...prevExpanded,
        [index]: !prevExpanded[index],
      };
    });
  };


  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} width={"100vw"}>
      <h1>lista das camisetas</h1>

      <Box display={"flex"} flexWrap={"wrap"} gap={5} alignItems={"center"} justifyContent={"center"}>
        {camisetas.map((camiseta, index) => (
          <Card key={index} sx={{ width: 345 }}>
            <CardMedia onClick={() => handleExpandClick(index)} aria-expanded={expanded[index]} aria-label="show more" component="img" height="194" image={camisetas[index].estampaFrontal} alt="CardImage"></CardMedia> 

            <CardHeader title={camiseta.nome} subheader={camiseta.modelo} />

            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>

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
        ))}
      </Box>
    </Box>
  );
}

export default List;
