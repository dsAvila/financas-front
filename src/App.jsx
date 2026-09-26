import { useState, useEffect } from "react";
import CardResumo from "./components/CardResumo";
import FormTransacao from "./components/FormTransacao";
import TabelaTransacoes from "./components/TabelaTransacoes";
import GraficoAlocacao from "./components/GraficoAlocacao";
import { api } from "./services/api";

export default function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [resumo, setResumo] = useState({
    saldo_caixa: 0,
    investimentos_brl: 0,
    investimentos_usd: 0,
    investimentos_usd_em_brl: 0,
    patrimonio_liquido_total: 0,
    cotacao_usd: 0,
  });
  const [carregando, setCarregando] = useState(true);
  const [gatilhoAtualizacao, setGatilhoAtualizacao] = useState(0);

  const recarregarDados = () => {
    setGatilhoAtualizacao((prev) => prev + 1);
  };

  useEffect(() => {
    let ativo = true;

    api
      .get("/transacoes")
      .then((response) => {
        if (ativo && response.data) {
          setTransacoes(response.data.transacoes || []);
          setResumo(response.data.resumo || {});
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar dados da API:", error);
      })
      .finally(() => {
        if (ativo) {
          setCarregando(false);
        }
      });

    return () => {
      ativo = false;
    };
  }, [gatilhoAtualizacao]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Painel Financeiro
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Gestão patrimonial integrada com cotação em tempo real
          </p>
        </header>

        {carregando ? (
          <div className="text-center py-16 text-slate-400">
            Carregando dados da API...
          </div>
        ) : (
          <>
            <CardResumo resumo={resumo} />
            <GraficoAlocacao resumo={resumo} />
            <FormTransacao onTransacaoAdicionada={recarregarDados} />
            <TabelaTransacoes
              transacoes={transacoes}
              onTransacaoRemovida={recarregarDados}
            />
          </>
        )}
      </div>
    </div>
  );
}
