import { useState, useEffect } from "react";
import CardResumo from "./components/CardResumo";
import GraficoAlocacao from "./components/GraficoAlocacao";
import FormTransacao from "./components/FormTransacao";
import TabelaTransacoes from "./components/TabelaTransacoes";
import { api } from "./services/api";

export default function App() {
  const [transacoes, setTransacoes] = useState([]);
  const [resumo, setResumo] = useState({
    saldo_caixa: 0,
    investimentos_brl: 0,
    investimentos_usd: 0,
    investimentos_usd_em_brl: 0,
    patrimonio_liquido: 0,
    cotacao_usd: 0,
  });
  const [transacaoEmEdicao, setTransacaoEmEdicao] = useState(null);

  const carregarDados = async () => {
    try {
      const res = await api.get("/transacoes");
      setTransacoes(res.data.transacoes);
      setResumo(res.data.resumo);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Painel Financeiro
          </h1>
          <p className="text-sm text-slate-400">
            Gestão patrimonial integrada com cotação em tempo real
          </p>
        </header>

        <CardResumo resumo={resumo} />

        <GraficoAlocacao resumo={resumo} />

        <FormTransacao
          onTransacaoAdicionada={carregarDados}
          transacaoEmEdicao={transacaoEmEdicao}
          onCancelarEdicao={() => setTransacaoEmEdicao(null)}
        />

        <TabelaTransacoes
          transacoes={transacoes}
          onTransacaoRemovida={carregarDados}
          onEditarTransacao={(item) => {
            setTransacaoEmEdicao(item);
            window.scrollTo({ top: 350, behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
}
