'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, Download, Edit, Send } from 'lucide-react';
import { GeneratedProposal } from '@/types/proposal';

export default function PreviewProposal() {
  const [proposal, setProposal] = useState<GeneratedProposal | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('currentProposal');
    if (stored) {
      setProposal(JSON.parse(stored));
    }
  }, []);

  if (!proposal) {
    return (
      <main className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">No proposal found</p>
          <Link href="/create" className="text-blue-500 hover:underline">
            Create a new proposal
          </Link>
        </div>
      </main>
    );
  }

  const { input } = proposal;

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/create" className="flex items-center gap-2 text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Edit
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-white">Preview Proposal</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800">
                <Download className="h-4 w-4" />
                PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700">
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Proposal Preview */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Proposal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-12 py-16 text-white">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 uppercase tracking-wide text-sm mb-2">Proposal</p>
                <h1 className="text-4xl font-bold mb-4">{input.projectName}</h1>
                <p className="text-blue-100">
                  Prepared for {input.clientName} at {input.clientCompany}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl">{input.yourCompany || input.yourName}</p>
                <p className="text-blue-200">{input.yourEmail}</p>
                {input.yourPhone && <p className="text-blue-200">{input.yourPhone}</p>}
              </div>
            </div>
          </div>

          {/* Proposal Content */}
          <div className="px-12 py-12 space-y-12">
            {/* Executive Summary */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Executive Summary
              </h2>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                {proposal.executiveSummary}
              </div>
            </section>

            {/* Scope of Work */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Scope of Work
              </h2>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                {proposal.scopeOfWork}
              </div>
            </section>

            {/* Deliverables */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Deliverables
              </h2>
              <ul className="space-y-3">
                {proposal.deliverablesList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* Timeline */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Timeline
              </h2>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                {proposal.timeline}
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500">Estimated Duration</p>
                  <p className="text-lg font-semibold text-slate-900">{input.estimatedDuration}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-500">Proposed Start</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {input.startDate ? new Date(input.startDate).toLocaleDateString() : 'Upon agreement'}
                  </p>
                </div>
              </div>
            </section>

            {/* Investment */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Investment
              </h2>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line mb-6">
                {proposal.investmentSection}
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600">Total Investment</span>
                  <span className="text-3xl font-bold text-blue-600">
                    ${input.totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Deposit to Begin</span>
                  <span className="font-medium text-slate-700">
                    ${input.depositRequired.toLocaleString()}
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-600">{input.paymentTerms}</p>
              </div>
            </section>

            {/* Terms */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Terms & Conditions
              </h2>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line text-sm">
                {proposal.termsAndConditions}
              </div>
            </section>

            {/* Next Steps */}
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                Next Steps
              </h2>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                {proposal.nextSteps}
              </div>
            </section>

            {/* Signature Area */}
            <section className="border-t border-slate-200 pt-8">
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <p className="text-sm text-slate-500 mb-8">Accepted by:</p>
                  <div className="border-b border-slate-300 mb-2 h-12"></div>
                  <p className="text-slate-700">{input.clientName}</p>
                  <p className="text-sm text-slate-500">{input.clientCompany}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-8">Submitted by:</p>
                  <div className="border-b border-slate-300 mb-2 h-12"></div>
                  <p className="text-slate-700">{input.yourName}</p>
                  <p className="text-sm text-slate-500">{input.yourCompany}</p>
                </div>
              </div>
            </section>
          </div>

          {/* Proposal Footer */}
          <div className="bg-slate-50 px-12 py-6 text-center">
            <p className="text-slate-500 text-sm">
              This proposal is valid for 30 days from the date of issue.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
