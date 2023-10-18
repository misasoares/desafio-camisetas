import apiService from "./api.service";

interface CamisetaDto {
  nome: string;
  cor: string;
  modelo: string;
  estampaCostas: string;
  estampaFrontal: string;
  tags: string;
}

export async function create(objCamiseta: CamisetaDto) {
  try {

    const resposta = await apiService.post("/", {
        ...objCamiseta,
        tags: objCamiseta.tags.split(', ')
    });

    return resposta.data;
  } catch (error) {
    throw new Error();
  }
}
