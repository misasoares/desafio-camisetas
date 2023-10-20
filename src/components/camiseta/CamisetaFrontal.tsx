import React from "react";
import styled from "styled-components";

interface CamisetaFrontalProps {
  cor?: string;
  estampaFrontal?: string;
}

const CamisetaFrontal: React.FC<CamisetaFrontalProps> = ({ cor, estampaFrontal }) => {
  const ChangeColorStyled = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${cor};
    mix-blend-mode: multiply;
  `;
  return (
    <div style={{position:'relative'}}>
      
      <div className="tshirt-container" >
        <ChangeColorStyled className="color-overlay"></ChangeColorStyled>
      </div>
      <div style={{ position: "absolute", left:'30%',top:'61%', transform:'translate(-50%, -50%)'}}>
        <img className="estampa-frente" src={estampaFrontal} alt="" />
      </div>
    </div>
  );
};

export default CamisetaFrontal;
