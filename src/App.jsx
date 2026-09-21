import { useState, useEffect, useCallback } from "react";
import CardResumo from "./components/CardResumo";
import TabelaTransacoes from "./components/TabelaTransacoes";
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

  const carregarDados = useCallback(async () => {
    try {
      const res = await api.get("/transacoes");
      if (res.data) {
        setTransacoes(res.data.transacoes || []);
        setResumo(res.data.resumo || {});
      }
    } catch (error) {
      console.error("Erro ao carregar dados da API:", error);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

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
          <div className="space-y-8">
            <CardResumo resumo={resumo} />
            <TabelaTransacoes
              transacoes={transacoes}
              onTransacaoRemovida={carregarDados}
            />
          </div>
        )}
      </div>
    </div>
  );
}
