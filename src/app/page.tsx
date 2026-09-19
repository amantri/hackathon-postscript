import { Header } from "@/components/Header";
import { getPatient, getConditions, getMedications, getVitals, getRecommendations, getAppointments, SAMPLE_PATIENTS } from "@/lib/fhir";
import { Section, CollapsibleSection, ActionItem, AppointmentCard } from "@/components/AvsComponents";
import { LearnMoreButton } from "@/components/InteractiveWrappers";
import { Pill, Activity, Thermometer, HeartPulse, Droplets, Scale, Stethoscope, Gauge } from "lucide-react";

function getVitalIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('blood pressure')) return <Gauge className="w-8 h-8 text-gray-800" strokeWidth={1.5} />;
  if (lower.includes('heart rate') || lower.includes('pulse')) return <HeartPulse className="w-8 h-8 text-gray-800" strokeWidth={1.5} />;
  if (lower.includes('oxygen')) return <Droplets className="w-8 h-8 text-gray-800" strokeWidth={1.5} />;
  if (lower.includes('temp')) return <Thermometer className="w-8 h-8 text-gray-800" strokeWidth={1.5} />;
  if (lower.includes('weight') || lower.includes('bmi')) return <Scale className="w-8 h-8 text-gray-800" strokeWidth={1.5} />;
  if (lower.includes('hba1c') || lower.includes('blood')) return <Activity className="w-8 h-8 text-gray-800" strokeWidth={1.5} />;
  return <Stethoscope className="w-8 h-8 text-gray-800" strokeWidth={1.5} />;
}

export default async function AVSPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const patientId = (params.patient as string) || SAMPLE_PATIENTS[0].id;
  const patient = await getPatient(patientId);
  const conditions = await getConditions(patientId);
  const medications = await getMedications(patientId);
  const vitals = await getVitals(patientId);
  const recommendations = await getRecommendations(patientId);
  const appointments = await getAppointments(patientId);

  // Use the first condition as the primary diagnosis if available
  const primaryCondition = conditions.length > 0 ? conditions[0] : null;
  const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen flex flex-col pb-12">
      <Header userName={patient?.name} />
      
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 mt-6 space-y-6">
        
        {/* Title Section */}
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Office Visit - {todayStr}</h1>
          <p className="text-sm text-gray-500 mt-1">with Dr. Gregory House at Apex Medicine</p>
          {patient && (
            <p className="text-xs text-gray-400 mt-1">Viewing Patient: {patient.name} (DOB: {patient.dob})</p>
          )}
        </div>

        {/* Issue */}
        <Section title="Issue">
          <p className="text-sm text-gray-800">
            Routine Follow-up and Medical Management
          </p>
        </Section>

        {/* Diagnosis and Results */}
        <Section title="Diagnosis and Results">
          {primaryCondition ? (
            <>
              <p className="text-sm font-semibold text-gray-900">{primaryCondition.name}</p>
              <div className="mt-2 text-sm text-gray-600">
                <p>Based on your recent lab results and clinical history.</p>
              </div>
              <div className="mt-4">
                <LearnMoreButton topic={primaryCondition.name} />
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500 italic">No primary diagnoses found on problem list.</p>
          )}
        </Section>

        {/* Collapsibles */}
        <div>
          <CollapsibleSection title="Problem List">
            {conditions.length > 0 ? (
              <ul className="list-disc ml-5 space-y-1 text-sm text-gray-600">
                {conditions.map(c => (
                  <li key={c.id}>{c.name} {c.date ? `(Recorded: ${c.date})` : ""}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No active problems listed.</p>
            )}
          </CollapsibleSection>
          <CollapsibleSection title="Vitals">
            {vitals.length > 0 ? (
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 py-2">
                {vitals.map(v => (
                  <div key={v.id} className="flex items-start gap-3">
                    <div className="mt-1 shrink-0">
                      {getVitalIcon(v.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500 leading-tight">{v.name}</span>
                      <span className="text-base font-medium text-gray-900 mt-0.5">{v.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">No recent vitals found.</p>
            )}
          </CollapsibleSection>
        </div>

        {/* Next Steps */}
        <div className="pt-2">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">Next Steps</h2>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Pill className="w-4 h-4 text-gray-500" />
              <h3 className="text-sm font-medium text-gray-900">Prescriptions</h3>
            </div>
            
            {medications.length > 0 ? (
              medications.map(med => (
                <ActionItem 
                  key={med.id}
                  title={med.name} 
                  subtitle={med.instructions} 
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 italic mb-4">No active prescriptions found.</p>
            )}
            
            <div className="mt-3">
              <a href="#" className="text-xs font-semibold text-gray-900 underline hover:text-primary transition-colors">
                View all current medications →
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Recommendations</h3>
            {recommendations.length > 0 ? (
              recommendations.map(rec => (
                <ActionItem 
                  key={rec.id}
                  type="recommendation"
                  title={rec.title} 
                  checked={rec.checked}
                />
              ))
            ) : (
              <p className="text-sm text-gray-500 italic mb-4">No recommendations at this time.</p>
            )}
          </div>
        </div>

        {/* What's Next */}
        <div className="pt-4">
          <h2 className="text-sm font-semibold text-gray-600 mb-3">What&apos;s Next</h2>
          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {appointments.map(apt => (
                <AppointmentCard 
                  key={apt.id}
                  date={apt.date}
                  title={apt.title}
                  doctor={apt.doctor}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No upcoming appointments scheduled.</p>
          )}
        </div>

      </main>
    </div>
  );
}
