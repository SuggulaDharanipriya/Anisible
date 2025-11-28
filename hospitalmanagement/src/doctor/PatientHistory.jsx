import '../admin/admincss/PatientHistory.css'

export default function PatientHistory() {
	return (
		<div className="patient-history">
			<h2>Patient History</h2>
			<div className="filters">
				<input placeholder="Patient ID or Name" />
				<button>Search</button>
			</div>
			<div className="list">
				<div className="row">#1001 | Jane Smith | 2025-08-01 | Prescription: Paracetamol</div>
			</div>
		</div>
	)
}




