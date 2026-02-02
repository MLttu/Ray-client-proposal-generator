import Link from 'next/link';
import { FileText, Zap, Download, Clock } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white">Ray</span>
          </div>
          <Link
            href="/create"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Create Proposal
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
          Win More Clients with
          <br />
          <span className="text-blue-500">AI-Powered Proposals</span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Create professional, persuasive proposals in minutes—not hours.
          Let AI write the compelling copy while you focus on the work.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/create"
            className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Create Your First Proposal
          </Link>
          <a
            href="#how-it-works"
            className="rounded-lg border border-slate-600 px-8 py-4 text-lg font-medium text-white hover:bg-slate-800 transition-colors"
          >
            See How It Works
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800 rounded-xl p-8">
            <Zap className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">AI-Powered Writing</h3>
            <p className="text-slate-400">
              Claude AI generates compelling, professional proposal copy tailored to your client and project.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-8">
            <Clock className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ready in Minutes</h3>
            <p className="text-slate-400">
              What used to take hours now takes minutes. Fill in the details, let AI do the heavy lifting.
            </p>
          </div>
          <div className="bg-slate-800 rounded-xl p-8">
            <Download className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">PDF Export</h3>
            <p className="text-slate-400">
              Download beautifully formatted PDF proposals ready to send to your clients.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Enter Project Details</h3>
            <p className="text-slate-400">
              Fill in your client info, project scope, timeline, and pricing.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI Generates Copy</h3>
            <p className="text-slate-400">
              Our AI writes compelling proposal sections tailored to your project.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Download & Send</h3>
            <p className="text-slate-400">
              Review, customize if needed, and download your professional PDF.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Simple Pricing
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-2">Pay Per Proposal</h3>
            <div className="text-4xl font-bold text-white mb-4">
              $5<span className="text-lg text-slate-400">/proposal</span>
            </div>
            <ul className="text-slate-400 space-y-2 mb-6">
              <li>✓ Full AI-generated proposal</li>
              <li>✓ PDF download</li>
              <li>✓ Unlimited revisions</li>
              <li>✓ No subscription needed</li>
            </ul>
            <Link
              href="/create"
              className="block text-center rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-500 hover:bg-blue-600 hover:text-white transition-colors"
            >
              Get Started
            </Link>
          </div>
          <div className="bg-slate-800 rounded-xl p-8 border-2 border-blue-600">
            <div className="text-blue-500 text-sm font-medium mb-2">BEST VALUE</div>
            <h3 className="text-xl font-bold text-white mb-2">Unlimited</h3>
            <div className="text-4xl font-bold text-white mb-4">
              $29<span className="text-lg text-slate-400">/month</span>
            </div>
            <ul className="text-slate-400 space-y-2 mb-6">
              <li>✓ Unlimited proposals</li>
              <li>✓ All templates</li>
              <li>✓ Client database</li>
              <li>✓ Priority support</li>
            </ul>
            <Link
              href="/create"
              className="block text-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Win More Clients?
        </h2>
        <p className="text-xl text-slate-300 mb-8">
          Create your first proposal in minutes.
        </p>
        <Link
          href="/create"
          className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Create Your First Proposal
        </Link>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-slate-800">
        <div className="flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <span>Ray Proposal Generator</span>
          </div>
          <div>
            Built by{' '}
            <a href="https://mlujandesign.com" className="text-blue-500 hover:underline">
              Mark Lujan
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
