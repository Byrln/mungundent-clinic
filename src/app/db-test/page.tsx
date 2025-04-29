"use client";

import { useState, useEffect } from "react";

export default function DbTestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/db-test');
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      
      <div className="mb-4">
        <button 
          onClick={testConnection}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>
      </div>
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <h2 className="font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className={`p-4 mb-4 rounded ${result.success ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'}`}>
          <h2 className="font-bold">{result.success ? 'Success!' : 'Failed!'}</h2>
          <p className="mb-2">{result.message}</p>
          
          {result.success && (
            <p>Product count: {result.productCount}</p>
          )}
          
          {!result.success && result.error && (
            <div className="mt-2">
              <h3 className="font-bold">Error details:</h3>
              <p className="whitespace-pre-wrap">{result.error}</p>
              {result.stack && (
                <details className="mt-2">
                  <summary className="cursor-pointer">Stack trace</summary>
                  <pre className="mt-2 p-2 bg-gray-100 overflow-x-auto text-xs">{result.stack}</pre>
                </details>
              )}
            </div>
          )}
          
          <p className="text-xs mt-4">Timestamp: {result.timestamp}</p>
        </div>
      )}
    </div>
  );
}