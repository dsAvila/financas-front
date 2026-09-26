import { useState, useEffect } from "react";
import { PlusCircle, Check } from "lucide-react";
import { api } from "../services/api";

export default function FormTransacao({
  onTransacaoAdicionada,
  transacaoEmEdicao,
  onCancelarEdicao,
}) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("despesa");
  const [moeda, setMoeda] = useState("BRL");
  const [categoria, setCategoria] = useState("");

  const limparFormulario = () => {
    setDescricao("");
    setValor("");
    setTipo("despesa");
    setMoeda("BRL");
    setCategoria("");
  };

  useEffect(() => {
    if (transacaoEmEdicao) {
      setDescricao(transacaoEmEdicao.descricao || "");
      setValor(transacaoEmEdicao.valor || "");
      setTipo(transacaoEmEdicao.tipo || "despesa");
      setMoeda(transacaoEmEdicao.moeda || "BRL");
      setCategoria(transacaoEmEdicao.categoria || "");
    } else {
      limparFormulario();
    }
  }, [transacaoEmEdicao]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descricao || !valor || !categoria) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const payload = {
      descricao,
      valor: parseFloat(valor),
      tipo,
      moeda,
      categoria,
    };

    try {
      if (transacaoEmEdicao) {
        await api.put(`/transacoes/${transacaoEmEdicao.id}`, payload);
        if (onCancelarEdicao) onCancelarEdicao();
      } else {
        await api.post("/transacoes", payload);
      }

      limparFormulario();

      if (onTransacaoAdicionada) {
        onTransacaoAdicionada();
      }
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
      alert("Erro ao comunicar com a API.");
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">
          {transacaoEmEdicao ? "Editar Transação" : "Nova Transação"}
        </h2>
        {transacaoEmEdicao && (
          <span className="text-xs text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2.5 py-0.5 rounded-full font-mono">
            Modo Edição (ID: {transacaoEmEdicao.id})
          </span>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end"
      >
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Descrição
          </label>
          <input
            type="text"
            placeholder="Ex: Salário, Aluguel, Ações..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Valor
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Tipo
          </label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
            <option value="investimento">Investimento</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Moeda
          </label>
          <select
            value={moeda}
            onChange={(e) => setMoeda(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="BRL">BRL (R$)</option>
            <option value="USD">USD ($)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Categoria
          </label>
          <input
            type="text"
            placeholder="Ex: Moradia, Salário..."
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="md:col-span-6 flex justify-end gap-3 mt-2">
          {transacaoEmEdicao && (
            <button
              type="button"
              onClick={onCancelarEdicao}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors cursor-pointer ${
              transacaoEmEdicao
                ? "bg-amber-600 hover:bg-amber-500"
                : "bg-emerald-600 hover:bg-emerald-500"
            }`}
          >
            {transacaoEmEdicao ? (
              <>
                <Check className="w-4 h-4" />
                Salvar Alterações
              </>
            ) : (
              <>
                <PlusCircle className="w-4 h-4" />
                Adicionar Transação
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
