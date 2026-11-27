import { useMemo, useState } from "react";
import { Alert, Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";

const starterFaqs = [
  { id: "faq-1", question: "How do I add a new customer or enquiry?", category: "Chit", answer: "Open Lead & Enquiry Management and choose Add New Enquiry. Fill in the contact details and chit interest, then save. Once the documents are verified, convert the lead to an active customer and assign a chit." },
  { id: "faq-2", question: "What does the Customer 360° View show?", category: "Chit", answer: "It brings everything about one customer into a single page: profile, chits held, payment history, follow-ups and complaints. Use it before a call so you have the full picture." },
  { id: "faq-3", question: "How can I record a canvasser follow-up?", category: "Sales", answer: "Open Sales & Follow-up, select Canvasser Follow-up, complete the visit or call details, and submit the form." },
  { id: "faq-4", question: "Where can I see my notifications?", category: "Account", answer: "Select the bell in the page header to open your notifications. Choose an item to see its full details." },
  { id: "faq-5", question: "How do I check collection arrears?", category: "Collections", answer: "Open Collection & Arrears and use the date, branch and status filters to review dues and follow-up assignments." },
  { id: "faq-6", question: "Who can update customer information?", category: "Account", answer: "Your access depends on your CRM role. Contact your company administrator if you need an update permission." },
  { id: "faq-7", question: "How do I report a customer complaint?", category: "Support", answer: "Open Customer Service & Complaints to review the ticket queue and follow the company process for creating a complaint ticket." },
];

export default function FaqPage() {
  const [faqs, setFaqs] = useState(starterFaqs);
  const [search, setSearch] = useState("");
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => faqs.filter((faq) => `${faq.question} ${faq.answer} ${faq.category}`.toLowerCase().includes(search.toLowerCase())), [faqs, search]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setError("Attachments must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }
    setError("");
    setAttachment(file ?? null);
  };

  const submitQuestion = (event) => {
    event.preventDefault();
    const cleanQuestion = question.trim();
    if (cleanQuestion.length < 8) {
      setError("Please enter a question with at least 8 characters.");
      return;
    }
    setFaqs((current) => [{ id: `local-${Date.now()}`, question: cleanQuestion, category: "My questions", answer: "This question is saved in this session preview. Connect the FAQ API to send it to your support team." }, ...current]);
    setSearch("");
    setQuestion("");
    setAttachment(null);
    setError("");
    setAskOpen(false);
    setNotice("Question added to this session preview. The FAQ submission API is not configured.");
  };

  return <>
    <PageHeader title="FAQs" action={<><Button component={Link} to="/" startIcon={<ArrowBackRoundedIcon />} color="inherit">Back</Button><Button variant="contained" onClick={() => setAskOpen(true)} startIcon={<AddRoundedIcon />}>Ask a Question</Button></>} showHeaderActions />
    <Box className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <Box className="mb-4 flex flex-wrap items-center justify-between gap-2"><Typography variant="subtitle1" fontWeight={700}>Frequently asked questions</Typography><TextField size="small" placeholder="Search FAQs" value={search} onChange={(event) => setSearch(event.target.value)} inputProps={{ maxLength: 100 }} /></Box>
      {notice && <Alert severity="info" onClose={() => setNotice("")} className="mb-3">{notice}</Alert>}
      {filtered.map((faq) => <Accordion key={faq.id} disableGutters elevation={0} sx={{ borderBottom: "1px solid #edf0f5", "&:before": { display: "none" } }}>
        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />} aria-controls={`${faq.id}-content`} id={`${faq.id}-header`}><Box><Typography variant="body2" fontWeight={700} color="#07124e">{faq.question}</Typography><Typography variant="caption" color="text.secondary">{faq.category}</Typography></Box></AccordionSummary>
        <AccordionDetails><Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{faq.answer}</Typography></AccordionDetails>
      </Accordion>)}
      {filtered.length === 0 && <Typography className="py-8 text-center" color="text.secondary">No FAQs match your search.</Typography>}
    </Box>
    <Dialog open={askOpen} onClose={() => setAskOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Ask a Question</DialogTitle>
      <Box component="form" onSubmit={submitQuestion}>
        <DialogContent><Typography variant="caption" color="text.secondary">Submit your question and our admin team will help you.</Typography>
          <TextField autoFocus required fullWidth multiline minRows={2} maxRows={5} label="Question title" value={question} onChange={(event) => { setQuestion(event.target.value); setError(""); }} inputProps={{ maxLength: 500 }} className="mt-4" />
          <Button component="label" variant="outlined" fullWidth startIcon={<AttachFileRoundedIcon />} className="mt-4">{attachment ? attachment.name : "Attach a file (optional)"}<input hidden type="file" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={handleFile} /></Button>
          <Typography display="block" variant="caption" color="text.secondary" className="mt-1">PDF, image or document · up to 5 MB</Typography>
          {error && <Alert severity="error" className="mt-3">{error}</Alert>}
        </DialogContent>
        <DialogActions className="px-3 pb-3"><Button onClick={() => setAskOpen(false)}>Cancel</Button><Button type="submit" variant="contained">Submit question</Button></DialogActions>
      </Box>
    </Dialog>
  </>;
}
