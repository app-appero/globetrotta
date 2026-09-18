export default function ProblemCard({ question, answer }) {
  return (
    <div className="rounded-2xl border border-ink-800/10 bg-paper-50 p-6 shadow-card transition-shadow duration-200 ease-smooth hover:shadow-card-hover sm:p-7">
      <h3 className="text-fluid-lg font-semibold text-ink-950">{question}</h3>
      <p className="mt-2 text-fluid-base text-ink-600">{answer}</p>
    </div>
  )
}
