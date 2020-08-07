<template>
  <v-navigation-drawer absolute permanent right width="500px">
    <div class="historias-usuario">
      <div class="cabecalho">
        HISTÓRIAS DE USUÁRIO
      </div>
      <div class="historia">
        <div class="nome">CA01 - SALVAR NOVO BEM MATERIAL</div>
        <div><b>DADO QUE</b> esteja na tela de cadastro de bem material</div>
        <div><b>E</b> preencher todos os campos obrigatórios</div>
        <div><b>E</b> acionar a opção Salvar</div>
        <div><b>ENTÃO</b> o sistema adiciona o bem consumo à listagem de bens adicionados</div>
        <div><b>E</b> a exibe a mensagem "Bem material adicionado com sucesso"</div>
        <div><b>E</b> limpa dos dados do formulário.</div>
      </div>
      <div class="historia">
        <div class="nome">CA02 - CALCULAR O VALOR TOTAL DE REFERÊNCIA</div>
        <div><b>DADO QUE</b> esteja na tela de cadastro de bem material</div>
        <div><b>E</b> seleciono uma unidade de aquisição</div>
        <div><b>E</b> informo um valor numérico para o campo Valor de referência</div>
        <div><b>ENTÃO</b> o sistema apresenta apresenta no campo Valor Total de acordo com a formula (Valor Total =
          Quantidade da unidade de aquisição X Valor de referência)
        </div>
      </div>
      <div class="historia">
        <div class="nome">CA03 - CAMPOS OBRIGATÓRIOS</div>
        <div><b>DADO QUE</b> esteja na tela de cadastro de bem material</div>
        <div><b>ENTÃO</b> o sistema apresenta como obrigatórios (campos marcados com *) os campos Descrição resumida,
          Unidade de aquisição e Valor de referência
        </div>
      </div>
      <div class="historia">
        <div class="nome">CA04 - CAMPOS NÂO OBRIGATÓRIOS</div>
        <div><b>DADO QUE</b> esteja na tela de cadastro de bem material</div>
        <div><b>ENTÃO</b> o sistema apresenta como não obrigatórios os campos Valor total de referência, Corredor,
          Prateleira e Andar.
        </div>
      </div>
      <div class="historia">
        <div class="nome">CA05 - LISTAGEM DE BEM MATERIAIS ADICIONADOS</div>
        <div><b>DADO QUE</b> esteja na tela de cadastro de bem material</div>
        <div><b>ENTÃO</b> o sistema apresenta a listagem de bens materiais adicionados com as colunas Descrição
          Resumida, Un. Aquisição, Vlr. Referência, Vlr Total Referência, Estoque e Ações (Editar e Excluir)
        </div>
      </div>
      <div class="historia">
        <div class="nome">CA06 - IDENTIFICAÇÂO DO ESTOQUE NA LISTAGEM</div>
        <div><b>DADO QUE</b> esteja na tela de cadastro de bem material</div>
        <div><b>E</b> tenha bens cadastrados com informações para os dados de estoque informados</div>
        <div><b>ENTÃO</b> o sistema apresenta a listagem de bens materiais adicionados</div>
        <div><b>E</b> na coluna Estoque concatena os dados Corredor, Prateleira e Andar separados pelo caractere "-" (ex
          A1-B1-C1)
        </div>
      </div>
      <div class="historia">
        <div class="nome">CA07 - EDITAR BEM MATERIAL</div>
        <div><b>DADO QUE</b> esteja na tela de cadastro de bem material</div>
        <div><b>E</b> possua ao menos um bem material adicionados</div>
        <div><b>E</b> acionar a opção editar de um dos bens exibidos na listagem de bens adicionados</div>
        <div><b>ENTÃO</b> o sistema carrega as informações do bem nos respectivos campos do cadastro de bem material
        </div>
      </div>
      <div class="historia">
        <div class="nome">CA08 - EXCLUIR BEM MATERIAL</div>
        <div><b>DADO QUE</b> esteja na tela de cadastro de bem material</div>
        <div><b>E</b> possua ao menos um bem material adicionados</div>
        <div><b>E</b> acionar a opção excluir de um dos bens exibidos na listagem de bens adicionados</div>
        <div><b>ENTÃO</b> o sistema exclui a linha selecionada da listagem de bens adicionados e exibe a mensagem "Bem
          excluído com sucesso."
        </div>
      </div>
      <div class="historia">
        <div class="nome">CA09 - LISTAGEM DE BENS MATERIAIS ADICIONADOS VAZIA</div>
        <div><b>DADO QUE</b> esteja na tela de cadastro de bem material</div>
        <div><b>E</b> não possua bens materiais adicionados</div>
        <div><b>ENTÃO</b> o sistema exibe a listagem com a mensagem "No data avaliable".</div>
      </div>
      <div class="historia">
        <div class="nome">CA10 - MENSAGEM DE CAMPOS OBRIGATÓRIOS</div>
        <div><b>DADO QUE</b> esteja na tela de cadastro de bem material</div>
        <div><b>E</b> acione a opção salvar sem informar os dados dos campos obrigatórios</div>
        <div><b>ENTÃO</b> o sistema a mensagem "Informe os campos obrigatórios".</div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'HistoriasUsuarios'
}
</script>
