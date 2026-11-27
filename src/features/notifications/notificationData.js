export const notifications = [
  { id: "call-due-01", title: "Call due today", description: "Call customer Ramesh Kumar about the chit application follow-up.", time: "Today 10:00 AM", type: "Follow-up", customer: "Ramesh Kumar", due: "Today, 10:00 AM", details: "A follow-up call is scheduled to discuss the pending chit application documents. Review the customer record before calling." },
  { id: "visit-02", title: "Upcoming visit", description: "Visit customer Anitha Selvan to collect the application documents.", time: "Today 11:30 AM", type: "Visit", customer: "Anitha Selvan", due: "Today, 11:30 AM", details: "Customer requested an in-person visit to hand over the remaining application documents." },
  { id: "overdue-03", title: "Overdue follow-up", description: "Follow up with Sumathi about the installment due.", time: "Today 12:00 PM", type: "Payment reminder", customer: "S. Sumathi", due: "Today, 12:00 PM", details: "The customer account has a pending installment. Confirm the payment status and record the outcome." },
  { id: "call-due-04", title: "Call due today", description: "Call customer Kumar about the renewal option.", time: "Today 02:00 PM", type: "Renewal", customer: "K. Kumar", due: "Today, 02:00 PM", details: "Discuss renewal options and confirm whether the customer wants a callback from the branch." },
  { id: "complaint-05", title: "Complaint status updated", description: "Ticket 01112 has been assigned to your branch.", time: "Today 02:30 PM", type: "Complaint", customer: "S. Sumathi", due: "Today", details: "A customer service complaint was assigned to the Salem branch. Review the ticket and follow the service workflow." },
  { id: "visit-06", title: "Upcoming visit", description: "Visit customer Devi for a payment receipt query.", time: "Tomorrow 09:00 AM", type: "Visit", customer: "R. Devi", due: "Tomorrow, 09:00 AM", details: "Please bring the customer payment ledger and verify the receipt details during the visit." },
];

const READ_KEY = "crm-notifications-read-v1";
export function getReadNotificationIds() {
  try { return new Set(JSON.parse(sessionStorage.getItem(READ_KEY) ?? "[]")); }
  catch { return new Set(); }
}
export function markNotificationRead(id) {
  const ids = getReadNotificationIds();
  ids.add(id);
  try { sessionStorage.setItem(READ_KEY, JSON.stringify([...ids])); } catch { /* Storage can be unavailable in private contexts. */ }
}
