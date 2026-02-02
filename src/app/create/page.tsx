'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, ArrowLeft, Loader2, Plus, X } from 'lucide-react';
import { ProposalInput, PROJECT_TYPES, DEFAULT_DELIVERABLES } from '@/types/proposal';

export default function CreateProposal() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [customDeliverable, setCustomDeliverable] = useState('');
  
  const [formData, setFormData] = useState<ProposalInput>({
    // Client
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    // Project
    projectName: '',
    projectType: 'website',
    projectDescription: '',
    deliverables: [...DEFAULT_DELIVERABLES.slice(0, 5)],
    // Timeline
    estimatedDuration: '2-3 weeks',
    startDate: '',
    // Pricing
    pricingType: 'fixed',
    totalPrice: 1500,
    depositRequired: 500,
    paymentTerms: '50% deposit to begin, 50% upon completion',
    // Your Info
    yourName: '',
    yourCompany: '',
    yourEmail: '',
    yourPhone: '',
  });

  const updateField = (field: keyof ProposalInput, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addDeliverable = () => {
    if (customDeliverable.trim()) {
      updateField('deliverables', [...formData.deliverables, customDeliverable.trim()]);
      setCustomDeliverable('');
    }
  };

  const removeDeliverable = (index: number) => {
    updateField('deliverables', formData.deliverables.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Store proposal in localStorage for now (would be database in production)
        localStorage.setItem('currentProposal', JSON.stringify(data.proposal));
        router.push('/preview');
      } else {
        alert('Failed to generate proposal. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const steps = [
    { number: 1, title: 'Client Info' },
    { number: 2, title: 'Project Details' },
    { number: 3, title: 'Pricing & Timeline' },
    { number: 4, title: 'Your Info' },
  ];

  return (
    <main className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-white">Create Proposal</span>
            </div>
            <div className="w-16" />
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center gap-8">
            {steps.map((step) => (
              <button
                key={step.number}
                onClick={() => setCurrentStep(step.number)}
                className={`flex items-center gap-2 ${
                  currentStep === step.number
                    ? 'text-blue-500'
                    : currentStep > step.number
                    ? 'text-green-500'
                    : 'text-slate-500'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step.number
                      ? 'bg-blue-600 text-white'
                      : currentStep > step.number
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {step.number}
                </div>
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Step 1: Client Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Client Information</h2>
            <p className="text-slate-400">Who is this proposal for?</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => updateField('clientName', e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={formData.clientCompany}
                  onChange={(e) => updateField('clientCompany', e.target.value)}
                  placeholder="Acme Inc."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Client Email
                </label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => updateField('clientEmail', e.target.value)}
                  placeholder="john@acme.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Project Details</h2>
            <p className="text-slate-400">What are you proposing?</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => updateField('projectName', e.target.value)}
                  placeholder="Website Redesign"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Type *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => updateField('projectType', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  {PROJECT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Project Description *
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => updateField('projectDescription', e.target.value)}
                  placeholder="Describe the project goals, requirements, and any specific needs..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Deliverables
                </label>
                <div className="space-y-2">
                  {formData.deliverables.map((deliverable, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg"
                    >
                      <span className="text-white">{deliverable}</span>
                      <button
                        onClick={() => removeDeliverable(index)}
                        className="text-slate-500 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customDeliverable}
                      onChange={(e) => setCustomDeliverable(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addDeliverable()}
                      placeholder="Add a deliverable..."
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={addDeliverable}
                      className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Pricing & Timeline */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Pricing & Timeline</h2>
            <p className="text-slate-400">Set your terms</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Pricing Type
                </label>
                <select
                  value={formData.pricingType}
                  onChange={(e) => updateField('pricingType', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly Rate</option>
                  <option value="retainer">Monthly Retainer</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Total Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-500">$</span>
                    <input
                      type="number"
                      value={formData.totalPrice}
                      onChange={(e) => updateField('totalPrice', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Deposit Required
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-500">$</span>
                    <input
                      type="number"
                      value={formData.depositRequired}
                      onChange={(e) => updateField('depositRequired', Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Payment Terms
                </label>
                <input
                  type="text"
                  value={formData.paymentTerms}
                  onChange={(e) => updateField('paymentTerms', e.target.value)}
                  placeholder="50% deposit to begin, 50% upon completion"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedDuration}
                    onChange={(e) => updateField('estimatedDuration', e.target.value)}
                    placeholder="2-3 weeks"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Proposed Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => updateField('startDate', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Your Info */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Your Information</h2>
            <p className="text-slate-400">How should the client contact you?</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.yourName}
                  onChange={(e) => updateField('yourName', e.target.value)}
                  placeholder="Mark Lujan"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Company
                </label>
                <input
                  type="text"
                  value={formData.yourCompany}
                  onChange={(e) => updateField('yourCompany', e.target.value)}
                  placeholder="MLujan Design"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  value={formData.yourEmail}
                  onChange={(e) => updateField('yourEmail', e.target.value)}
                  placeholder="mark@mlujandesign.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.yourPhone}
                  onChange={(e) => updateField('yourPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-8 border-t border-slate-800">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-3 text-slate-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isGenerating}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate Proposal'
              )}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
