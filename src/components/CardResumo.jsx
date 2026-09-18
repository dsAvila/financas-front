import { DollarSign, TrendingUp, Wallet, Globe } from "lucide-react";

export default function CardResumo({ resumo }) {
  const formatarMoeda = (valor, moeda = "BRL") => {
    return new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: moeda,
    }).format(valor || 0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Saldo em Caixa */}
      <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-sm font-medium">Saldo em Caixa</span>
          <Wallet className="w-5 h-5 text-blue-400" />
        </div>
        <p
          className={`text-2xl font-bold ${resumo.saldo_caixa >= 0 ? "text-emerald-400" : "text-rose-400"}`}
        >
          {formatarMoeda(resumo.saldo_caixa)}
        </p>
      </div>

      {/* Investimentos em BRL */}
      <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-sm font-medium">Investimentos (BRL)</span>
          <TrendingUp className="w-5 h-5 text-indigo-400" />
        </div>
        <p className="text-2xl font-bold text-white">
          {formatarMoeda(resumo.investimentos_brl)}
        </p>
      </div>

      {/* Investimentos USD */}
      <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-sm font-medium">Investimentos (USD)</span>
          <Globe className="w-5 h-5 text-amber-400" />
        </div>
        <p className="text-2xl font-bold text-white">
          {formatarMoeda(resumo.investimentos_usd, "USD")}
        </p>
        <span className="text-xs text-slate-400 mt-1 block">
          ≈ {formatarMoeda(resumo.investimentos_usd_em_brl)} (US$ 1 = R${" "}
          {resumo.cotacao_usd?.toFixed(2)})
        </span>
      </div>

      {/* Patrimônio Líquido Total */}
      <div className="bg-slate-800 border-emeral-500/30 p-5 rounded-xl">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-sm font-medium">Patrimônio Líquido</span>
          <DollarSign className="w-5 h-5 text-emerald-400" />
        </div>
        <p className="text-2xl font-bold text-emerald-400">
          {formatarMoeda(resumo.patrimonio_liquido_total)}
        </p>
      </div>
    </div>
  );
}
