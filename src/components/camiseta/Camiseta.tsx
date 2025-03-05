import React, { useState } from "react";
import styled from "styled-components";
import { Box, IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface CamisetaProps {
  cor?: string;
  estampa?: string;
  tipo?: "frontal" | "costas";
  isCreating?: boolean;
}

const ChangeColorStyled = styled.div<{ cor?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ cor }) => cor || "#ffffff"};
  mix-blend-mode: multiply;
`;

const Camiseta: React.FC<CamisetaProps> = ({
  cor,
  estampa,
  tipo = "frontal",
  isCreating,
}) => {
  const containerClass =
    tipo === "costas" ? "tshirt-container costas" : "tshirt-container";

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [scale, setScale] = useState(1);

  const moveUp = () => setOffsetY((prev) => prev - 10);
  const moveDown = () => setOffsetY((prev) => prev + 10);
  const moveLeft = () => setOffsetX((prev) => prev - 10);
  const moveRight = () => setOffsetX((prev) => prev + 10);

  const zoomIn = () => setScale((prev) => prev + 0.1);
  const zoomOut = () => setScale((prev) => Math.max(0.1, prev - 0.1));

  return (
    <div style={{ position: "relative" }}>
      <div className={containerClass} style={{ position: "relative" }}>
        <ChangeColorStyled cor={cor} />
        {estampa && (
          <img
            src={estampa}
            alt={`Estampa ${tipo}`}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",

              transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(${scale})`,
              maxWidth: "50%",
            }}
          />
        )}
      </div>

      {isCreating && (
        <Box
          display="flex"
          position="relative"
          flexDirection="column"
          alignItems="start"
          marginLeft={8.5}
          mt={1}
        >
          <Box display="flex" alignItems="center" flexDirection="column">
            <Box>
              <IconButton onClick={moveUp}>
                <ArrowUpwardIcon />
              </IconButton>
            </Box>
            <Box display="flex">
              <IconButton onClick={moveLeft}>
                <ArrowLeftIcon />
              </IconButton>
              <IconButton onClick={zoomOut}>
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={zoomIn}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={moveRight}>
                <ArrowRightIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={moveDown}>
                <ArrowDownwardIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Camiseta;
