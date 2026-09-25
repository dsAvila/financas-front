import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { api } from "../services/api";

export default function FormTransacao({ onTransacaoAdicionada }) {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("despesa");
  const [categoria, setCategoria] = useState("");
  const [moeda, setMoeda] = useState("BRL");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    if (!descricao.trim() || !valor || !categoria.trim()) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setSalvando(true);
      await api.post("/transacoes", {
        descricao: descricao.trim(),
        valor: parseFloat(valor),
        tipo,
        categoria: categoria.trim(),
        moeda,
      });

      // Limpa os campos após o cadastro
      setDescricao("");
      setValor("");
      setCategoria("");
      setTipo("despesa");
      setMoeda("BRL");

      if (onTransacaoAdicionada) {
        onTransacaoAdicionada();
      }
    } catch (err) {
      setErro(err.res?.data?.erro || "Erro ao registrar a transação.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-sm mb-8">
      <h2 className="text-lg font-semibold text-white mb-4">Nova Transação</h2>

      {erro && (
        <div className="p-3 mb-4 text-sm text-rose-300 bg-rose-950/50 border border-rose-800 rounded-lg">
          {erro}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
      >
        <div className="lg:col-span-2">
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Descrição
          </label>
          <input
            type="text"
            placeholder="Ex: Salário, Aluguel, Ações..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounde-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Valor
          </label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Tipo
          </label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm"
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
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm"
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
            placeholder="Ex: Moradia, Renda Fixa..."
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>

        <div className="lg:col-span-6 flex justify-end mt-1">
          <button
            type="submit"
            disabled={salvando}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-50 text-sm cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            {salvando ? 'Salvando...' : 'Adicionar Transação'}
          </button>
        </div>
      </form>
    </div>
  );
}
