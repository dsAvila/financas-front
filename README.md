# MVP Painel Financeiro - Arquitetura de Software (Front-end SPA)

Este repositório contém o código-fonte e a documentação técnica da interface do **Painel Financeiro**, desenvolvida como MVP para a sprint de **Arquitetura de Software** da pós-graduação da PUC-Rio. Trata-se de uma Single Page Application (SPA) moderna, reativa e intuitiva voltada para a gestão de fluxo de caixa pessoal e consolidação patrimonial multimoeda (Real e Dólar comercial).

A aplicação foi projetada para operar de forma desacoplada, consumindo assincronamente os serviços da API REST desenvolvida em Python/Flask, com foco em usabilidade, _feedback_ visual imediato e integridade de dados.

> 🔗 **Repositório Back-end (API Flask/SQLite):** [https://github.com/dsAvila/financas-api.git](https://github.com/dsAvila/financas-api.git)

---

## 🏛️ Arquitetura e Decisões de Projeto

A concepção da camada cliente priorizou modularidade, performance de renderização e separação de responsabilidades:

- **Single Page Application (SPA) com React 18 e Vite:** Utilização do ecossistema React aliado ao Vite como _bundler_ de alta performance, proporcionando inicialização instantânea, otimização de módulos ES e recarregamento a quente (_HMR_).
- **Estilização Moderna com Tailwind CSS:** Abordagem utilitária (_utility-first_) para construção de uma interface em modo escuro (_Dark Mode_ nativo), responsiva e com hierarquia visual clara através de tipografia e contrastes calculados.
- **Visualização de Dados com Recharts:** Integração de gráfico de rosca interativo com animações suaves, proporções calculadas dinamicamente e _tooltips_ customizados para leitura rápida da composição patrimonial.
- **Comunicação Cliente-Servidor com Axios:** Centralização das chamadas HTTP assíncronas em uma instância configurada do Axios, comunicando-se com a API Flask com suporte a CORS.
- **Conteinerização Multi-Stage com Nginx:** Empacotamento de produção em dois estágios no Docker: o primeiro utiliza Node.js 20 para compilar os artefatos otimizados (`dist`), e o segundo utiliza uma imagem ultraleve do servidor web Nginx para servir os arquivos estáticos na porta 80 (mapeada para a 5173).

---

## ✨ Funcionalidades e Experiência do Usuário (UX)

- **Ciclo Completo de Vida dos Dados (CRUD Integrado):**
  - **Criação (`POST`):** Cadastro ágil de receitas, despesas e investimentos em BRL ou USD, com atribuição automática da data da operação pelo servidor.
  - **Listagem (`GET`):** Sincronização automática no carregamento inicial da página e após cada alteração, atualizando a tabela e os indicadores consolidados.
  - **Edição (`PUT`):** Ao acionar o ícone de edição (lápis), o formulário é preenchido com os dados da transação selecionada, permitindo retificar descrições, valores ou categorias com retorno de foco na tela.
  - **Exclusão (`DELETE`):** Diálogo de confirmação de exclusão para prevenir perdas acidentais de registros, atualizando o saldo e o gráfico imediatamente após a remoção.
- **Painel de Indicadores Financeiros:** Quatro cartões de destaque no topo exibindo em tempo real: Saldo em Caixa, Investimentos em Reais, Ativos em Dólar e o Patrimônio Líquido Total consolidado.
- **Gráfico de Rosca Dinâmico:** Distribuição percentual dos ativos (Caixa vs. Renda Fixa/Ações BRL vs. Ativos USD convertidos) calculada automaticamente pelo back-end a partir da cotação comercial da AwesomeAPI.
- **Tabela Histórica com Badges:** Formatação visual contextual para tipos de movimentação (verde para receitas, vermelho para despesas e azul/índigo para aportes) e datas exibidas no padrão compacto `DD/MM`.

---

## 🧩 Estrutura de Componentes

O código-fonte está estruturado de forma atômica dentro de `src/`:

```text
src/
├── services/
│   └── api.js              # Configuração base do Axios (baseURL: http://localhost:5000/api)
├── components/
│   ├── CardResumo.jsx      # Indicadores de Saldo em Caixa, Investimentos e Patrimônio Líquido
│   ├── GraficoAlocacao.jsx # Componente Recharts para exibição da rosca de alocação patrimonial
│   ├── FormTransacao.jsx   # Formulário dual (Criação via POST e Edição via PUT)
│   └── TabelaTransacoes.jsx# Tabela de listagem com ações de editar e excluir registros
├── App.jsx                 # Estado global do resumo e orquestração de recarregamento
├── main.jsx                # Ponto de entrada da aplicação React
└── index.css               # Diretivas do Tailwind CSS e estilos globais
```

---

## 🐳 Como Executar via Docker (Recomendado)

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado e em execução na máquina.
- Container da API (`api-financas`) em execução na porta `5000`.

### 1. Construir a Imagem Docker

Na raiz da pasta do front-end, execute:

```bash
docker build -t front-financas .
```

### 2. Iniciar o Container

Execute o container mapeando a porta local 5173 para a porta 80 do Nginx:

```bash
docker run -d -p 5173:80 --name front-financas front-financas
```

### 3. Acessar a Aplicação

Abra o navegador e acerte o endereço:
👉 **`http://localhost:5173`**

---

## 💻 Execução Local sem Docker (Ambiente de Desenvolvimento)

Caso deseje executar com suporte a _Hot Reload_ utilizando o Node.js da máquina hospedeira:

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 20 LTS ou superior instalada.
- Gerenciador de pacotes `npm`.

### Passos:

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Iniciar o servidor de desenvolvimento Vite
npm run dev
```

A aplicação estará acessível em: **`http://localhost:5173`**.
