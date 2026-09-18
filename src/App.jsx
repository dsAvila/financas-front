import { useState, useEffect } from "react";
import CardResumo from "./components/CardResumo";
import { api } from "./services/api";

export default function App() {
  const [resumo, setResumo] = useState({
    saldo_caixa: 0,
    investimentos_brl: 0,
    investimentos_usd: 0,
    investimentos_usd_em_brl: 0,
    patrimonio_liquido_total: 0,
    cotacao_usd: 0,
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await api.get("/transacoes");
        if (response.data?.resumo) {
          setResumo(response.data.resumo);
        }
      } catch (error) {
        console.error("Erro ao procurar dados da API:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

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
            A carregar dados da API...
          </div>
        ) : (
          <CardResumo resumo={resumo} />
        )}
      </div>
    </div>
  );
}
