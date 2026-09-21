import { Trash2 } from "lucide-react";
import { api } from "../services/api";

export default function TabelaTransacoes({ transacoes, onTransacaoRemovida }) {
  const removerTransacao = async (id) => {
    if (!confirm("Deseja realmente excluir esta transação?")) return;

    try {
      await api.delete(`/transacoes/${id}`);
      onTransacaoRemovida();
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
      alert("Não foi possível excluir a transação.");
    }
  };

  const badgeTipo = (tipo) => {
    switch (tipo) {
      case "receita":
        return "bg-emerald-950/60 text-emerald-400 border border-emerald-800";
      case "despesa":
        return "bg-rose-950/60 text-rose-400 border border-rose-800";
      case "investimento":
        return "bg-indigo-950/60 text-indigo-400 border border-indigo-800";
      default:
        return "bg-slate-800 text-slate-300";
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-white">
          Histórico de Transações
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/60 text-xs uppercase text-slate-400">
            <tr>
              <th className="px-6 py-3">Descrição</th>
              <th className="px-6 py-3">Categoria</th>
              <th className="px-6 py-3">Tipo</th>
              <th className="px-6 py-3">Valor</th>
              <th className="px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {transacoes.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-8 text-center text-slate-500"
                >
                  Nenhuma transação encontrada no banco de dados.
                </td>
              </tr>
            ) : (
              transacoes.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {item.descricao}
                  </td>
                  <td className="px-6 py-4">{item.categoria}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${badgeTipo(item.tipo)}`}
                    >
                      {item.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-medium text-white">
                    {item.moeda === "USD" ? "$" : "R$"}{" "}
                    {Number(item.valor).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => removerTransacao(item.id)}
                      className="text-slate-400 hover:text-rose-400 p-1 rounded transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
