import React from "react";
import { getApiBase } from "../lib/env";
import { Button } from "../components/ui/button";

type HealthDto = {
  status: string;
  app: string;
  version: string;
  time: string;
};

export const HealthPage: React.FC = () => {
  const [data, setData] = React.useState<HealthDto | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function fetchHealth(): Promise<void> {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`${getApiBase()}/health`, {
        headers: { "X-Request-ID": crypto.randomUUID() }
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = (await r.json()) as HealthDto;
      setData(j);
    } catch (e) {
      setError((e as Error).message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    void fetchHealth();
  }, []);

  return (
    <div className="min-h-full p-6 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Orga.com - Health</h1>
          <Button onClick={fetchHealth} variant="outline" size="sm">
            Rafraichir
          </Button>
        </header>

        <section className="rounded-2xl border bg-white p-4">
          <div className="text-sm text-gray-600 mb-2">Backend: {getApiBase()}</div>
          {loading && <div>Chargement...</div>}
          {error && <div className="text-red-600">Erreur: {error}</div>}
          {data && (
            <pre className="text-sm overflow-auto">{JSON.stringify(data, null, 2)}</pre>
          )}
        </section>
      </div>
    </div>
  );
};
