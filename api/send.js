export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Support both GET (query params) and POST (body)
    let to_email, subject, schedule_body, week_title, age, stage, generated_date;

    if (req.method === 'GET') {
      to_email       = req.query.to;
      subject        = req.query.subject;
      schedule_body  = req.query.body;
      week_title     = req.query.title;
      age            = req.query.age;
      stage          = req.query.stage;
      generated_date = req.query.date;
    } else {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);
      if (!body) return res.status(400).json({ ok: false, message: 'Empty body' });
      ({ to_email, subject, schedule_body, week_title, age, stage, generated_date } = body);
    }

    if (!to_email) return res.status(400).json({ ok: false, message: 'Missing to_email' });

    const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_vi44sxn',
        template_id: 'template_m2v1g1n',
        user_id: '-jmsyEaVXl0s4V1Jg',
        template_params: {
          to_email, subject, schedule_body,
          week_title, age, stage, generated_date
        }
      })
    });

    const text = await r.text();
    return res.status(r.ok ? 200 : 400).json({ ok: r.ok, message: text });

  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message });
  }
}
