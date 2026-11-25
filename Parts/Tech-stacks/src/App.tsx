/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    window.location.replace('/stack.html');
  }, []);

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent mx-auto"></div>
        <p className="text-xs uppercase tracking-widest">Routing to The Kernel Dashboard...</p>
        <a
          href="/stack.html"
          className="inline-block px-4 py-2 border border-cyan-500 text-xs text-white hover:bg-cyan-950 transition-colors"
        >
          Open /stack.html &rarr;
        </a>
      </div>
    </div>
  );
}
