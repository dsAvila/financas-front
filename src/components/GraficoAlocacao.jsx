import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload, totalAtivos }) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    const percentagem =
      totalAtivos > 0 ? ((item.value / totalAtivos) * 100).toFixed(1) : 0;

    return (
      <div className="bg-slate-900 border border-slate-700 px-3 py-2 rounded-lg shadow-lg">
        <p className="text-xs font-medium text-slate-300 mb-1">{item.name}</p>
        <p className="text-sm font-semibold text-white font-mono">
          R${" "}
          {Number(item.value).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
          <span className="text-xs font-normal text-slate-400 ml-1.5">
            ({percentagem}%)
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function GraficoAlocacao({ resumo }) {
  const dados = [
    {
      nome: "Saldo em Caixa",
      valor: Math.max(0, resumo?.saldo_caixa || 0),
      fill: "#10b981", // emerald-500
    },
    {
      nome: "Investimentos (BRL)",
      valor: resumo?.investimentos_brl || 0,
      fill: "#6366f1", // indigo-500
    },
    {
      nome: "Investimentos (USD)",
      valor: resumo?.investimentos_usd_em_brl || 0,
      fill: "#eab308", // yellow-500
    },
  ].filter((item) => item.valor > 0);

  const totalAtivos = dados.reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-sm mb-8">
      <div className="border-b border-slate-700 pb-4 mb-4">
        <h2 className="text-lg font-semibold text-white">
          Alocação de Patrimônio
        </h2>
        <p className="text-xs text-slate-400">
          Distribuição percentual dos ativos em carteira
        </p>
      </div>

      {dados.length === 0 ? (
        <div className="h-56 flex items-center justify-center text-slate-500 text-sm">
          Nenhum ativo disponível para exibir no gráfico.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
          {/* Gráfico de Rosca */}
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dados}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={88}
                  paddingAngle={5}
                  dataKey="valor"
                  nameKey="nome"
                  stroke="#1e293b"
                  strokeWidth={2}
                />
                <Tooltip
                  content={<CustomTooltip totalAtivos={totalAtivos} />}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legenda Customizada */}
          <div className="flex flex-col gap-3">
            {dados.map((item) => {
              const pct =
                totalAtivos > 0
                  ? ((item.valor / totalAtivos) * 100).toFixed(1)
                  : 0;
              return (
                <div
                  key={item.nome}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50 border border-slate-800"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-xs text-slate-300 font-medium">
                      {item.nome}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-white">
                      R${" "}
                      {Number(item.valor).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-2 font-mono">
                      ({pct}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
