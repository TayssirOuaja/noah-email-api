export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { to_email, subject, schedule_body, week_title, age, stage, generated_date } = req.body;

  try {
    const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_vi44sxn',
        template_id: 'template_m2v1g1n',
        user_id: '-jmsyEaVXl0s4V1Jg',
        template_params: { to_email, subject, schedule_body, week_title, age, stage, generated_date }
      })
    });
    const text = await r.text();
    return res.status(r.ok ? 200 : 400).json({ ok: r.ok, message: text });
  } catch(e) {
    return res.status(500).json({ ok: false, message: e.message });
  }
}
