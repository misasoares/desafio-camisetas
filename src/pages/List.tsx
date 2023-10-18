import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";

function List() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <h1>lista das camisetas</h1>

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" component="img" height="194" image="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-skull-wearing-cap-vector-hand-drawing-png-image_1538851.jpg" alt="CardImage" />

        <CardHeader title="Aqui vai o nome da camiseta" subheader="Aqui vai o modelo da camiseta" />

        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Detalhes</Typography>
            <Typography paragraph>Aqui vai a cor e alguma descrição</Typography>
            <Typography paragraph>Estampa frontal e alguma descrição</Typography>
            <Typography paragraph>Estampa costas e alguma descrição</Typography>
            <Typography>Tags</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default List;
