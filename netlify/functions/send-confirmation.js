/**
 * Netlify Function: send-confirmation
 * Envía email de confirmación de compra vía Resend.
 * Requiere variable de entorno: RESEND_API_KEY
 */

const https = require('https');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Email service not configured.' }) };
  }

  let name, email, paymentId;
  try {
    const body = JSON.parse(event.body);
    name      = String(body.name  || '').slice(0, 100);
    email     = String(body.email || '').slice(0, 200);
    paymentId = String(body.paymentId || '').slice(0, 50);
  } catch (_) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Datos inválidos.' }) };
  }

  if (!email || !email.includes('@')) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Email inválido.' }) };
  }

  const firstName = name.split(' ')[0] || 'Imparable';

  const htmlBody = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Tu boleta está confirmada!</title>
</head>
<body style="margin:0;padding:0;background:#131313;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#131313;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:linear-gradient(145deg,#180f28,#120a1e,#131313);border:1px solid rgba(168,85,247,0.3);border-radius:20px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#7C3AED,#A855F7);padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.8);">Confirmación de boleta</p>
              <h1 style="margin:10px 0 0;font-size:28px;font-weight:900;color:#fff;line-height:1.2;">El Futuro<br>Es Ahora</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.1em;">Hola,</p>
              <h2 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#fff;">${firstName} 🎉</h2>

              <p style="margin:0 0 24px;font-size:15px;color:rgba(255,255,255,0.75);line-height:1.7;">
                Tu boleta para <strong style="color:#fff;">El Futuro Es Ahora</strong> está confirmada. Tomaste la decisión que va a cambiar tu relación con el dinero para siempre.
              </p>

              <!-- Info box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.2);border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                          <span style="font-size:13px;color:rgba(255,255,255,0.5);">📅 Fechas</span><br>
                          <span style="font-size:14px;font-weight:600;color:#fff;">11 y 12 de Abril, 2026</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                          <span style="font-size:13px;color:rgba(255,255,255,0.5);">📍 Lugar</span><br>
                          <span style="font-size:14px;font-weight:600;color:#fff;">Ágora Convention Center · Bogotá, Colombia</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;">
                          <span style="font-size:13px;color:rgba(255,255,255,0.5);">🎟 Boleta</span><br>
                          <span style="font-size:14px;font-weight:600;color:#fff;">General — Acceso 2 días completos</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Pasos -->
              <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);">Próximos pasos</p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;height:28px;background:linear-gradient(135deg,#7C3AED,#A855F7);border-radius:50%;text-align:center;vertical-align:middle;font-size:12px;font-weight:700;color:#fff;">1</td>
                        <td style="padding-left:12px;font-size:14px;color:rgba(255,255,255,0.8);line-height:1.5;">Guarda este email como comprobante de tu compra.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;height:28px;background:linear-gradient(135deg,#7C3AED,#A855F7);border-radius:50%;text-align:center;vertical-align:middle;font-size:12px;font-weight:700;color:#fff;">2</td>
                        <td style="padding-left:12px;font-size:14px;color:rgba(255,255,255,0.8);line-height:1.5;">Únete al grupo exclusivo de WhatsApp para recibir toda la info del evento.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:28px;height:28px;background:linear-gradient(135deg,#7C3AED,#A855F7);border-radius:50%;text-align:center;vertical-align:middle;font-size:12px;font-weight:700;color:#fff;">3</td>
                        <td style="padding-left:12px;font-size:14px;color:rgba(255,255,255,0.8);line-height:1.5;">Agenda las fechas: <strong style="color:#fff;">11 y 12 de Abril 2026</strong> en Bogotá.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA WhatsApp -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td align="center">
                    <a href="https://wa.link/etlgch" style="display:inline-block;background:#25D366;color:#fff;font-size:14px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:50px;letter-spacing:0.06em;text-transform:uppercase;">
                      📲 Unirse al grupo de WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

              ${paymentId ? `<p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);text-align:center;">ID de pago: ${paymentId}</p>` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.3);">© 2026 Laura Cortes · El Futuro Es Ahora</p>
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);">lauramcortes.com</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const payload = JSON.stringify({
    from: 'El Futuro Es Ahora <noreply@lauramcortes.com>',
    to: [email],
    subject: '🎟 ¡Tu boleta está confirmada! — El Futuro Es Ahora · Bogotá 2026',
    html: htmlBody
  });

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.resend.com',
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve({ statusCode: 200, body: JSON.stringify({ ok: true }) });
        } else {
          console.error('Resend error:', body);
          resolve({ statusCode: 500, body: JSON.stringify({ error: 'Error enviando email.' }) });
        }
      });
    });

    req.on('error', (e) => {
      console.error('Email request error:', e);
      resolve({ statusCode: 500, body: JSON.stringify({ error: 'Error de conexión.' }) });
    });

    req.write(payload);
    req.end();
  });
};
